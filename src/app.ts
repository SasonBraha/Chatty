import * as http from 'http';
import * as path from 'path';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';   
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser'; 
import * as socketioJwt from 'socketio-jwt';
import * as socketIO from 'socket.io';
import * as compression from 'compression';
import * as passport from 'passport';       
import './config/passportConfig';
import * as morgan from 'morgan';
import keys from './config/keys';
import socketController from './controllers/socketController';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes'; 
import userRoutes from './routes/userRoutes';
import notificationRoutes from './routes/notificationRoutes'; 
import trimmer from './utils/trimmer'; 
import errorHandler from './handlers/errorHanlder'; 

const app = express();
const server = http.createServer(app);
export const io = socketIO(server); 


//------------------------------------//
//  DB Config & Connection            //
//------------------------------------//
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoUri, { useNewUrlParser: true }).catch(ex => { throw Error(ex) });

//------------------------------------//
//  Middlewares                       //
//------------------------------------//
// Helmet Security 
app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
  app.use(morgan('dev'));
}

// Socket JWT Validation
io.use(socketioJwt.authorize({
  secret: keys.jwtSecret,
  handshake: true
}));

// GZIP Response
app.use(compression());

// Body Parser Middleware
app.use(bodyParser.json());

// Trim All { <req.body> }
app.use(trimmer);

// Passport Authentication 
app.use(passport.initialize());

//------------------------------------//
//  Routes                            //
//------------------------------------//
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);  
app.use('/api/notifications', notificationRoutes);

// Serve { index.html } In Production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.resolve('client/build/index.html'));
  })
}

//------------------------------------// 
//  Initalize                         //
//------------------------------------//
app.use(errorHandler);
server.listen(keys.port, () => console.log(`Server Started Successfully On Port ${keys.port}`));
io.on('connection', socket => socketController(io, socket));