import { User } from '../models';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';
import * as rp from 'request-promise';
import keys from '../config/keys';
import registerValidator from '../utils/Validation/registerValidator';
import registerDBValidator from '../utils/Validation/registerDBValidator';
import { OAuth2Client } from 'google-auth-library';
import { Router, Request, Response, NextFunction } from 'express';
import { errorObject } from '../utils';

const client = new OAuth2Client(keys.googleOAuthClientId);
const router: Router = Router();

//------------------------------------//
//  Sign Up                           //
//------------------------------------//
/**
 * Create new user
 * @method POST
 * @api public
 */
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { displayName, email, password, recaptchaResponse } = req.body;
    const captchaValidationError = errorObject(400, 'הייתה בעיה באימות האנושיות');

    // Check If { recaptchaResponse } Exsits
    if (!recaptchaResponse) return res.status(400).json(captchaValidationError);

    // Validate Registration Data
    const { errors, isValid } = registerValidator(req.body);
    if (!isValid) return res.status(400).json(errors);

    // Validate Captcha
    const captchaVildation = await rp({
      method: 'POST',
      uri: 'https://www.google.com/recaptcha/api/siteverify',
      qs: {
        secret: keys.googleRecaptchaSecretKey,
        response: recaptchaResponse
      },
      json: true
    });
    if (!captchaVildation.success) return res.status(400).json(captchaValidationError);

    await User.create({
      displayName,
      email,
      password,
      slug: `${uuid()}_${displayName}`,
      jwtId: uuid(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });
    res.json('נרשמת בהצלחה, כעת תוכל להתחבר עם הפרטים שהזנת');
  } catch (ex) {
    next(new Error(ex));
  }
});

//------------------------------------//
//  Local Sign In                     //
//------------------------------------//
/**
 * @method POST
 * @api public
 * @returns JWT with user data
 */
router.post('/signin', async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const { displayName, password } = req.body;
    const wrongCredentialsResponse = {
      error: {
        message: 'הפרטים שהזנת אינם נכונים, אנא נסה/י שנית'
      }
    };
    
    // Check If User Exist
    const user = await User.findOne({ $or: [{ displayName }, { email: displayName }] }).select('+password');
    if (!user) return res.status(401).json(wrongCredentialsResponse);

    // Check For Correct Password
    const isPasswordsMatch = await user.comparePassword(password);
    if (!isPasswordsMatch) return res.status(401).json(wrongCredentialsResponse);
    
    //! Convert { mongooseDocument<user> } To { Object<userData> } For Password Removal
    const userData = user.toObject();
    delete userData.password;
    // Create Access Token
    const accessToken = await jwt.sign(userData, keys.jwtSecret, { expiresIn: '7d' });
    res.json(`Bearer ${accessToken}`);
  } catch (ex) {
    next(new Error(ex));
  }
});


//------------------------------------//
//  Google Sign In                    // 
//------------------------------------//
/**
 * @method POST
 * @api public
 * @returns JWT with user data
 */
router.post('/google', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let userData = null;
    // Verify OAuth Token
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: keys.googleOAuthClientId
    });
    const { email, name: displayName, picture: avatar } = ticket.getPayload();

    // Check If User Exist
    const user = await User.findOne({ email });
    userData = user 
      ? user 
      : await User.create({
        displayName, 
        email, 
        avatar, 
        slug: `${displayName}_${uuid()}`, 
        jwtId: uuid(),
        ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      });

    // Create Access Token
    const accessToken = await jwt.sign(userData.toObject(), keys.jwtSecret, { expiresIn: '7d' });
    res.json(`Bearer ${accessToken}`);
  } catch (ex) {
    next(new Error(ex))
  }
});

export default router;