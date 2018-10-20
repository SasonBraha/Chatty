import { User } from '../models';
import { Request, Response, Router, NextFunction } from 'express';
import { IUser } from '../models/User';
const router: Router = Router();

/**
 * Get All Users
 * @method GET
 * @api public
 * @params { displayName, limit }
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  let users: IUser[];  
  try {
    const { displayName, limit } = req.query; 
    if (typeof displayName === 'string') { 
      users = await User.find({ $text: { $search: displayName } }).limit(parseInt(limit)).lean();
    } else {
      users = await User.find().limit(limit || null).lean();
    }
    res.json(users);
  } catch (ex) {
    next(new Error(`500 ${ex}`));
  }
});

/**
 * View User Profile
 * @method GET
 * @api public
 */
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await User.findOne({ slug: req.params.slug }).lean();
    if (userData) {
      res.json(userData);
    } else {
      next(new Error('404'));
    }
  } catch (ex) {
    next(new Error(`500 ${ex}`));
  }
});

export default router;
