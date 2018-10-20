import { Document, Schema, model } from 'mongoose';
import ObjectID = Schema.Types.ObjectId;

interface IMessage {
  body: string;
  image: string;
  createdBy: {
    _id: string;
    displayName: string;
    slug: string;
    avatar: string;
  };
}

export interface IChat extends Document {
  name: string;
  slug: string;
  status: "public" | "private";
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
  image: {
    type: String,
    trim: true
  }, 
  createdBy: {
    _id: String,
    displayName: String,
    slug: String,
    avatar: String
  }
}, { timestamps: true });

export default model<IChat>('Chat', new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
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
  },
  lastMessage: String
}, { timestamps: true, collection: 'chatRooms' }));