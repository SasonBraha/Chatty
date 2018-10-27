import * as googleTranslate from 'google-translate';
import keys from '../config/keys';
import logger from '../handlers/logHandler';

// Google Translate
export const translate = (phrase: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    googleTranslate(keys.googleTranslateApiKey).translate(phrase, 'en', (err, translation) => {
      err 
        ? (reject(err), logger.log('error', err))
        : resolve(translation.translatedText.toLowerCase().split(' ').join('-'))
    });
  });
}

// Conver Buffer To Base64 String
export const toBase64String = (file: Buffer): string => {
  return file ? Buffer.from(file).toString('base64') : null;
}

// Create Universal Error Object
export const errorObject = (statusCode: number, errorMessage: string): object => {
  return {
    error: {
      code: statusCode,
      message: errorMessage
    }
  }
}

