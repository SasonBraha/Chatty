import { Document, Schema, model } from 'mongoose';
import ObjectID = Schema.Types.ObjectId;
import { IFile, FileSchema } from './File';

interface IMessage {
  body: string;
  image: string;
  file: IFile;
  createdBy: {
    _id: string;
    displayName: string;
    slug: string;
  };
}

export interface IChat extends Document {
  name: string;
  slug: string;
  image: {
    link: string,
    isUploaded: boolean
  };
  isPrivate: boolean;
  storeMessages: boolean;
  moderators: ObjectID[];
  allowedUsers: ObjectID[];
  messages: IMessage[];
  createdBy: ObjectID;
  lastMessage: string;
}

const Message = new Schema({
  body: {
    type: String,
    required: true,
    trim: true 
  },
  file: {
    type: FileSchema
  },
  createdBy: {
    _id: String,
    displayName: String,
    slug: String
  }
}, { timestamps: true });


const ChatSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: async slug => await Chat.doesntExist({ slug }),
      message: () => 'שם החדר שבחרת תפוס, אנא בחר/י שם אחר'
    }
  },
  image: {
    link: {
      type: String,
      trim: true,
      default: '/images/default_chat.svg',
    },
    isUploaded: {
      type: Boolean,
      default: false
    }
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  storeMessages: {
    type: Boolean,
    default: true
  },
  moderators: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  allowedUsers: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  messages: {
    type: [Message],
    select: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  lastMessage: String
}, { timestamps: true, collection: 'chatRooms' });

ChatSchema.statics.doesntExist = async function(opts) {
  return await this.where(opts).countDocuments() === 0;
}

const Chat = model<IChat>('Chat', ChatSchema);
export default Chat;