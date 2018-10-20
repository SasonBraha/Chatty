import requireAuth from '../utils/Authentication/requireAuth';
import { Notification } from '../models';
import { Router, Request, Response, NextFunction } from 'express';
const router: Router = Router();

/**
 * Get Notifications
 * @method GET
 * @api protected
 */
router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await Notification.find({ receiver: req.user._id }).limit(10).sort({ createdAt: -1 });
    res.json(notifications); 
  } catch (ex) {
    next(new Error(`500 ${ex}`));
  } 
});

/**
 * Get Unseen Notification Count
 * @method GET
 * @api protected
 */
router.get('/unseen', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const unseenNotificationsCount = await Notification.countDocuments({ isSeen: false, receiver: req.user._id });
    res.json(unseenNotificationsCount);
  } catch (ex) {
    next(new Error(`500 ${ex}`));
  }
}); 

export default router;
