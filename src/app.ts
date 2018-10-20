import * as http from 'http';
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
import uploadRoutes from './routes/uploadRoutes';
import notificationRoutes from './routes/notificationRoutes'; 
import Trimmer from './utils/Trimmer'; 
import errorHandler from './handlers/errorHanlder'; 

const app = express();
const server = http.createServer(app);
export const io = socketIO(server); 


//------------------------------------//
//  DB Config & Connection            //
//------------------------------------//
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoUri, { useNewUrlParser: true }).catch(e => { throw Error(e) });

//------------------------------------//
//  Middlewares                       //
//------------------------------------//
app.use(morgan('dev'));

// Helmet Security 
app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
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

// Trim All <req.body>
app.use(Trimmer);

// Passport Authentication 
app.use(passport.initialize());

//------------------------------------//
//  Routes                            //
//------------------------------------//
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);  
app.use('/api/notifications', notificationRoutes);
app.all('*', (req: Request, res: Response, next: NextFunction) => next(new Error('404')));

//------------------------------------// 
//  Initalize                         //
//------------------------------------//
app.use(errorHandler);
server.listen(keys.port, () => console.log(`Server Started Successfully On Port ${keys.port}`));
io.on('connection', socket => socketController(io, socket));