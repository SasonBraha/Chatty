import * as uuid from 'uuid';
import requireAuth from '../utils/Authentication/requireAuth';
import { s3 } from '../config/s3/s3Config';
import { Request, Response, Router, NextFunction } from 'express';
const router: Router = Router();

router.get('/getSignedUrl', requireAuth, (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, size, type } = req.query;
    const signdUrlConfig = {
      Bucket: 'chatty-bucket',
      ContentType: type,
      Key: `${name.split('.')[0]}-${uuid()}.${type.split('/')[1]}`
    };
    s3.getSignedUrl('putObject', signdUrlConfig, (err, url) => {
      if (err) {
        next(`500 ${err}`);
      } else {
        res.json({ key: signdUrlConfig.Key, url });
      }
    });
  } catch (ex) {
    next(`500 ${ex}`);
  }
});

export default router;
