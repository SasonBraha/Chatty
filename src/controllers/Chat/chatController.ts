import Store from './Store';
import { Chat } from '../../models';
import { putObject, getUploadAndFileData } from '../../config/s3/s3.methods'; 
import * as uuid from 'uuid';

const store = new Store();

export default async (io, socket, userData) => {
  let currentChatRoom = null;
  socket
    // Handle Join Room
    .on('client:joinChatRoom', async slug => {
      currentChatRoom = await Chat.findOne(
        {
          $or: [
            { slug, status: 'public' },
            {
              slug,
              status: 'private',
              allowedUsers: userData._id
            }
          ]
        },
        { messages: { $slice: 0 } }
      ).select('+messages');
      if (!currentChatRoom) return;
      store.addUser(slug, userData, updatedUserList => {
        socket
          .join(slug)
          .broadcast.to(slug)
          .emit('server:newUserJoined', userData);

        io.to(slug).emit('server:updateUserList', updatedUserList);
      });
    })

    // Handle Leave Room
    .on('client:leaveChatRoom', async () => {
      if (currentChatRoom) {
        const { slug } = currentChatRoom;
        store.removeUser(slug, userData, updatedUserList => {
          socket.leave(slug);
          socket.broadcast
            .to(slug)
            .emit('server:updateUserList', updatedUserList);
          currentChatRoom = null;
        });
      }
    })

    // Handle New Message
    .on('client:newMessage', async ({ body, file }, cb) => {
      if (!body.length) return;
      if (currentChatRoom) {
        // Get Pre Upload File Data //! Both { uploadData, fileData } Are Null If No File
        const uploadAndFileData = await getUploadAndFileData(file, currentChatRoom.slug);
        const uniqueFileId = uuid();

        // Emit New Message
        io.to(currentChatRoom.slug).emit('server:newMessage', {
          createdBy: userData,
          body,
          file: uploadAndFileData.fileData,
          createdAt: new Date()
        });
        typeof cb === 'function' && cb();

        // Save File If Exsits
        if (file) {
          // Save File To S3
          await putObject(uploadAndFileData.uploadData);

          // Emit To Client That File Saved
          socket.emit('server:fileUploaded', { fileData: uploadAndFileData.fileData, uniqueFileId });
        }
      
        // Check If Chat Room Allows Message Storing
        if (currentChatRoom && currentChatRoom.storeMessages) {
          currentChatRoom.lastMessage = body;
          currentChatRoom.messages.push({
            body,
            createdBy: {
              _id: userData._id,
              displayName: userData.displayName,
              slug: userData.slug
            },
            file: uploadAndFileData.fileData
          });
          await currentChatRoom.save();
        }
      }
    })

    // Handle Typing
    .on('client:userIsTyping', () => {
      socket.broadcast
        .to(currentChatRoom.slug)
        .emit('server:userIsTyping', userData.displayName);
    })
    .on('client:userStoppedTyping', () => {
      socket.broadcast
        .to(currentChatRoom.slug)
        .emit('server:userStoppedTyping', userData.displayName);
    });
};
