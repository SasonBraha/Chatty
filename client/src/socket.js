import io from 'socket.io-client';

const accessToken = localStorage.getItem('accessToken') || null;

class Socket {
  constructor() {
    this.connection = accessToken 
      ? (
        io(`${process.env.REACT_APP_SOCKET_URL}`, {
          query: `token=${accessToken.split(' ')[1]}`
        })
      )
      : null
  }
}

const socket = new Socket();
export default socket.connection;