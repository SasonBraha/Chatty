import { Schema } from 'mongoose';

export interface IFile {
  type: string;
  link: string;
  dimensions: {
    width: number;
    height: number;
  }
}

export const FileSchema = new Schema({
  type: {
    type: String,
    enum: [
      'jpg', 'jpeg',
      'png', 'gif',
      'webp', 'bmp'
    ],
    required: true
  },
  link: {
    type: String,
    required: true
  },
  dimensions: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    }
  }
}); 