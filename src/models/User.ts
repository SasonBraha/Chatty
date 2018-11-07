import { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import ObjectId = Schema.Types.ObjectId;

export interface IUser extends Document {
  displayName: string;
  emai: string;
  password: string;
  slug: string;
  avatar: string;
  notifications: ObjectId[];
  role: 'Admin' | 'Moderator' | 'User';
  ipAddress: string;
  lastActivity: string;
  comparePassword(password: string): boolean;
}

export const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: displayName => UserSchema.doesntExist({ displayName }),
        message: () => 'שם המשתמש שבחרת תפוס, אנא בחר/י שם אחר'
      }
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      select: false,
      validate: {
        validator: email => UserSchema.doesntExist({ email }),
        message: () => 'כתובת דואר האלקטרוני שהזנת כבר קיימת במערכת'
      }
    },
    password: {
      type: String,
      trim: true,
      select: false
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: '/images/default_profile.svg'
    },
    notifications: {
      type: [Schema.Types.ObjectId],
      ref: 'Notification',
      select: false
    },
    role: {
      type: String,
      enum: ['Admin', 'Moderator', 'User'],
      default: 'User'
    },
    ipAddress: {
      type: String,
      required: true,
      trim: true,
      select: false
    },
    lastActivity: {
      type: Date
    },
    jwtId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Hash Password Before Saving
UserSchema.pre('save', async function(next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Compare Password Method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return Promise.resolve(isMatch);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

UserSchema.statics.doesntExist = async function(options) {
  return await this.where(options).countDocuments() === 0
}

UserSchema.index({ displayName: 'text' });

export default model<IUser>('User', UserSchema);
