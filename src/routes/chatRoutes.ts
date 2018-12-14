import { Chat } from '../models'; 
import requireAuth from '../utils/requireAuth';
import { translate, errorObject } from '../utils';
import { ObjectID } from 'bson';
import * as mongoose from 'mongoose';
import { IChat } from '../models/Chat';
import * as uuid from 'uuid';
import * as multer from 'multer';
import { putObject } from '../config/s3/s3.methods';
import { Request, Response, Router, NextFunction } from 'express';

const router: Router = Router();
const upload = multer();

/**
 * Get all chat rooms
 * @method GET
 * @api public
 */
router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatRooms = await Chat.find({ $or: [{ isPrivate: true, allowedUsers: req.user._id }, { isPrivate: false }] }).sort({ updatedAt: -1 } ).lean();
    res.json(chatRooms);
  } catch (ex) {
    next(new Error(ex));
  }
});

/**
 * @method POST
 * @api private
 * Create Chat Room
 */
router.post('/', requireAuth, upload.any(), async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract Form Data
    const { name, isPrivate, storeMessages } = req.body;
    const image: Buffer = req.files && req.files.length && req.files[0].buffer || null;

    // Upload Image To S3
    const imageUploadData = await putObject(image, `${req.user._id}/chat`, 2000);
  
    // Create New Chat Room
    const newChatRoom = await Chat.create({
      name,
      isPrivate,
      storeMessages,
      image: imageUploadData ? { link: imageUploadData.link, isUploaded: true } : null,
      slug: `${await translate(name)}-${uuid()}`,
      createdBy: req.user._id
    });
    res.json(newChatRoom);
  } catch(ex) {
    if (ex.name && ex.name === 'ValidationError') {
      return res.status(409).json(errorObject(409, ex.errors.slug.message));
    }
    next(new Error(ex));
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
    if (chatRoom.isPrivate  && !chatRoom.allowedUsers.toString().includes(req.user._id)) {
      next(new Error('403'));
    } else {
      res.json(chatRoom);
    }
  } catch (ex) {
    next(new Error(ex));
  }
});

/**
 * Get old messages
 * @method GET
 * @api protected 
 */
router.get('/:chatId/:messageId', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const { chatId, messageId } = req.params;
    // Check For Valid ObjectId  
    if (mongoose.Types.ObjectId.isValid(chatId) && mongoose.Types.ObjectId.isValid(messageId)) {
      const chatRoom: IChat = await Chat.findOne({ _id: chatId }).lean();
      // Check For Permission To View Messages
      if (chatRoom.isPrivate && !chatRoom.allowedUsers.toString().includes(req.user._id)) return next(new Error('403'));
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
    next(new Error(ex));
  }
});

export default router;
