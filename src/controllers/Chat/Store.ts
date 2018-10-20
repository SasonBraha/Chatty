import * as redis from 'redis';
import { promisify } from 'util';
import keys from '../../config/keys';
import { IUser } from '../../models/User';
import logger from '../../handlers/logHandler';

const client = redis.createClient(keys.redisUri);
client.flushall();

client.hset = promisify(client.hset); 
client.hget = promisify(client.hget);
client.hdel = promisify(client.hdel);

class Store {
  private async getAllActiveUsers(roomName: string) {
    const userList = await client.hget('activeUsers', roomName);
    return Array.isArray(JSON.parse(userList)) ? JSON.parse(userList) : [];
  }

  private async updatedUserList(userList, roomName) {
    await client.hset('activeUsers', roomName, JSON.stringify(userList));
  }

  public async addUser(roomName: string, userData: IUser, cb: Function) {
    try {
      const userList = await this.getAllActiveUsers(roomName);
      userList.push(userData);
      await this.updatedUserList(userList, roomName);
      cb(userList);
    } catch (ex) {
      logger.log('error', ex);
    }
  }

  public async removeUser(roomName: string, userData: IUser, cb: Function) {
    try {
      const userList = await this.getAllActiveUsers(roomName);
      const updatedUserList = userList.filter(user => user._id !== userData._id);
      await this.updatedUserList(updatedUserList, roomName);
      cb(updatedUserList);
    } catch (ex) {
      logger.log('error', ex);
    }
  }
}

export default Store;