import { Document, Schema, model } from 'mongoose';
import { io } from '../app';
import { User } from './';
import { IUser } from './User';

interface INotification extends Document {
  sender: IUser;
  receiver: IUser;
  content: string;
  isSeen: boolean;
}

const NotificationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      required: true
    },
    isSeen: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


NotificationSchema.post('find', (notifications: any) => {
  notifications.forEach(notification => !notification.isSeen && (
    notification.isSeen = true,
    notification.save()
  ));
});

NotificationSchema.post('save', async (notification: INotification) => {
  // Check If Notifications Is New (To Prevent { Schema.post('find') } From Emitting Notification)
  if (notification.isNew) {
    // Populate Receiver Credentials
    const popultedNotification = await notification
      .populate('receiver', 'slug')
      .execPopulate();

    // Emit Notification
    io.to(popultedNotification.receiver.slug).emit(
      'server:newNotification',
      popultedNotification.content
    );

    // Save Notificationn Refrence In { User<Schema> }
    await User.findOneAndUpdate(
      { _id: notification.receiver },
      { $push: { notifications: notification._id } }
    );
  }
});

export default model<INotification>('Notification', NotificationSchema);
