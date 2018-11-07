import { getSignedUrl } from '../config/s3/s3.methods';
import { Request, Response, Router, NextFunction } from 'express';
import requireAuth from '../utils/requireAuth';
const router: Router = Router();

router.get('/getSignedUrl', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileType = req.query.fileType;
    const fileData = {
      fileExtension: fileType.split('/')[1],
      mimeType: fileType
    }
    const uploadData = await getSignedUrl(fileData)
    res.json(uploadData);
  } catch (ex) {
    next(new Error(ex));
  }
});

export default router;