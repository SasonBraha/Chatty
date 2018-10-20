import * as googleTranslate from 'google-translate';
import keys from '../config/keys';
import logger from '../handlers/logHandler';

export function translate(phrase: string) {
  return new Promise((resolve, reject) => {
    googleTranslate(keys.googleTranslateApiKey).translate(phrase, 'en', (err, translation) => {
      err 
        ? (reject(err), logger.log('error', err))
        : resolve(translation.translatedText.toLowerCase().split(' ').join('-'))
    });
  });
}

export function toBase64String(file) {
  return file ? Buffer.from(file).toString('base64') : null;
}