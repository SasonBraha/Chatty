import * as uuid from 'uuid';
import { s3 } from './s3Config'; 
import keys from '../keys';
import * as fileType from 'file-type';

export function putObject(file, roomName): Promise<string> { 
  const { ext, mime } = fileType(file); 
  return new Promise((resolve, reject) => {
    const uploadData = {
      Key: `${roomName}/${uuid()}.${ext}`,
      Bucket: keys.s3Bucket,
      Body: file,
      ContentEncoding: 'base64', 
      ContentType: mime
    }
    s3.putObject(uploadData, (err, data) => {
      if (err) reject(err);
      resolve(uploadData.Key)
    });
  });
}