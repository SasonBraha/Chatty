import { IUser } from '../models/User';
import chatController from './Chat/chatController';
import notificationsController from './notificationsController';

export default async (io, socket) => {
  const userData = socket.decoded_token as IUser;
  socket.join(userData.slug);
  
  chatController(io, socket, userData);
  notificationsController(io, socket);
}