import User from './User';
import Chat from './Chat';
import Notification from './Notification';
import * as Joi from 'joi';

const UserSchemaValidator = Joi.object().keys({
  displayName: Joi.string().alphanum().min(4).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  slug: Joi.string(),
  avatar: Joi.string(),
});

const ChatSchemaValidator = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(17).required(),
  image: Joi.string(),
  isPrivate: Joi.boolean().strict(),
  storeMessages: Joi.boolean().strict(),
});

export {
  Chat,
  ChatSchemaValidator,
  User,
  UserSchemaValidator,
  Notification 
}