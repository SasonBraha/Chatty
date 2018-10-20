import * as Joi from 'joi';
import * as Validator from 'validator';
import isEmpty from './isEmpty';

interface IForm {
  displayName?: string;
  email?: string;
  password?: string;
  verifyPassword?: string;
}

export default (data: IForm) => {
  const errors: IForm = {};
  const { displayName, email, password, verifyPassword } = data;

  if (!Validator.isLength(displayName, { min: 3, max: 20 })) {
    errors.displayName = 'כמות התווים המותרת בשם המשתמש היא בין 3 ל-20';
  }

  if (!Validator.isEmail(email)) {
    errors.email = 'כתובת דואר האלקטרוני שהוכנסה אינה תקנית';
  }

  if (!Validator.isLength(password, { min: 6 })) {
    errors.password = 'הסיסמה חייבת להכיל לכל הפחות 6 תווים';
  }

  if (!Validator.equals(password, verifyPassword)) {
    errors.verifyPassword = 'הסיסמאות אינן תואמות';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}