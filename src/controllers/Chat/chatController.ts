import Store from './Store';
import { Chat } from '../../models';
import { putObject } from '../../config/s3/s3.methods'; 
import * as uuid from 'uuid';

const store = new Store();

export default (io, socket, userData) => {
  let currentChatRoom = null;
  socket
    // Handle Join Room
    .on('client:joinChatRoom', async slug => {
      currentChatRoom = await Chat.findOne(
        {
          $or: [
            { slug, isPrivate: false },
            {
              slug,
              isPrivate: true,
              allowedUsers: userData._id
            }
          ]
        }
      );
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
    .on('client:leaveChatRoom', () => {
      if (currentChatRoom) {
        const { slug } = currentChatRoom;
        store.removeUser(slug, userData, updatedUserList => {
          socket
            .leave(slug)
            .broadcast
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
        const uniqueFileId = uuid();
        let fileData = null;

        // Emit New Message
        io.to(currentChatRoom.slug).emit('server:newMessage', {
          createdBy: userData,
          body,
          file: file ? { uniqueFileId } : null,
          createdAt: new Date()
        });
        typeof cb === 'function' && cb();

        // Save File If Exsits
        if (file) {
          // Save File To S3
          fileData = await putObject(file, currentChatRoom.slug, 5000);

          // Emit File Saved
          io.to(currentChatRoom.slug).emit('server:fileUploaded', { fileData, uniqueFileId });
        }
       
        // Check If Chat Room Allows Message Storing
        await Chat.findOneAndUpdate({ slug: currentChatRoom.slug, storeMessages: true }, {
          $push: {
            messages: {
              body,
              createdBy: {
                _id: userData._id,
                displayName: userData.displayName,
                slug: userData.slug,
              }, 
              file: fileData
            }
          },
          $set: { lastMessage: body }
        });
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
