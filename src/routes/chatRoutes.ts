import { Chat } from '../models';
import requireAuth from '../utils/requireAuth';
import { translate } from '../utils';
import { ObjectID } from 'bson';
import * as mongoose from 'mongoose';
import { IChat } from '../models/Chat';
import createChatValidator from '../utils/Validation/createChatValidator';
import { Request, Response, Router, NextFunction } from 'express';
const router: Router = Router();

/**
 * Get all chat rooms
 * @method GET
 * @api public
 */
router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatRooms = await Chat.find({ $or: [{ status: 'private', allowedUsers: req.user._id }, { status: 'public' }] }).sort({ updatedAt: -1 } ).lean();
    res.json(chatRooms);
  } catch (ex) {
    next(`500 ${ex}`);
  }
});

/**
 * Create new chat room
 * @method POST
 * @api public
 */
router.post('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate Form
    // const { errors, isValid } = createChatValidator(req.body);
    // if (!isValid) return res.status(400).json(errors);

    const { name, status, storeMessages } = req.body;
    // Create Chat Room
    const newChatRoom = await Chat.create({
      name,
      status,
      storeMessages,
      slug: await translate(name)
    });
    res.json(newChatRoom);
  } catch (ex) {
    // Check For Duplicate Chat Name
    if (ex.code === 11000) {
      res.status(409).json({
        error: {
          code: 409,
          message: 'שם החדר תפוס'
        }
      });
    } else {
      next(new Error(`500 ${ex}`));
    }
  }
});

/**
 * View chat room
 * @method GET
 * @api protected
 */
router.get('/:slug', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const chatRoom = await Chat.findOne({ slug }, { messages: { $slice: -20 } }).select('+messages').lean();

    // Check If Chat Exist
    if (!chatRoom) return next(new Error('404'));
    
    // Check For Permission To View Chat
    if (chatRoom.status === 'private' && !chatRoom.allowedUsers.toString().includes(req.user._id)) {
      next(new Error('403'));
    } else {
      res.json(chatRoom);
    }
  } catch (ex) {
    next(new Error(`500 ${ex}`));
  }
});

/**
 * Get old messages
 * @method GET
 * @api protected 
 */
router.get('/:chatId/:messageId', async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const { chatId, messageId } = req.params;
    // Check For Valid ObjectId  
    if (mongoose.Types.ObjectId.isValid(chatId) && mongoose.Types.ObjectId.isValid(messageId)) {
      const chatRoom: IChat = await Chat.findOne({ _id: chatId }).lean();
      // Check For Permission To View Messages
      if (chatRoom.status === 'private' && !chatRoom.allowedUsers.toString().includes(req.user._id)) return next(new Error('403'));
      // Compose Old Messages Array
      const oldMessages = await Chat.aggregate([
        { $match: { _id: new ObjectID(chatId) } },
        { $unwind: '$messages' },
        { $match: { 'messages._id': { $lt: new ObjectID(messageId) } } },
        { $sort: { 'messages.createdAt': -1 } },
        { $limit: 20 },
        { $group: { _id: '$_id', messages: { $push: '$messages' } } }
      ]);
      // Send Old Messages
      res.json(oldMessages.length ? oldMessages[0].messages.reverse() : []);
    } else {
      next(new Error('400'));
    }
  } catch (ex) {
    next(new Error(`500 ${ex}`));
  }
});

export default router;
