import logger from './logHandler';
import { Request, Response, NextFunction } from 'express';

const errorMessages = {
  400: 'הבקשה אינה תקנית, אנא נסה שנית',
  401: 'לחשבונך אין מספיק הרשאות על מנת לבצע פעולה זו',
  403: 'לחשבונך אין מספיק הרשאות על מנת לבצע פעולה זו',
  404: 'התוכן שביקשת לא קיים במערכת',
  500: 'אוי! משהו השתבש'
} 
 
export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  const isErrorInt = Number.isInteger(parseInt(error.message));
  const errorCode = !isErrorInt ? 500 : parseInt(error.message);
  
  if (errorCode === 500) logger.log('error', error.stack);

  res.status(errorCode).json({
    error: {
      code: errorCode,
      message: errorMessages[errorCode]
    }
  });
}