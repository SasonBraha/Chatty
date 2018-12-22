import io from 'socket.io-client';
import { SOCKET_URL } from './utils/config';

const accessToken = localStorage.getItem('accessToken') || null;

class Socket {
  constructor() {
    this.connection = accessToken 
      ? io(`${SOCKET_URL}`, { query: `token=${accessToken.split(' ')[1]}` })
      : null
  }
}

const socket = new Socket();
export default socket.connection;