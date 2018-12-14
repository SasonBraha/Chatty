import * as uuid from 'uuid';
import validateFile from '../../utils/Validation/validateFile';
import keys from '../keys';
import { s3 } from './s3Config';

interface IFileData {
  type: string;
  link: string;
  dimensions: {
    height: number;
    width: number;
  }
}

export function putObject(file: Buffer, reference: string, maxFileSize: number = 5000): Promise<IFileData | null> {
  if (!file) return null;
  return new Promise(async (resolve, reject) => {
    // Validate File { type, size }
    const { fileExtension, mimeType, dimensions: { height, width } } = await validateFile(file, maxFileSize);
  
    const uploadData = {
      Key: `${reference}/${uuid()}.${fileExtension}`,
      Bucket: keys.s3Bucket,
      Body: file,
      ContentEncoding: 'base64',
      ContentType: mimeType
    };
  
    const fileData = {
      type: fileExtension,
      link: uploadData.Key,
      dimensions: {
        height,
        width
      }
    };

    s3.putObject(uploadData, err => err ? reject(err) : resolve(fileData));
  });
}

export async function getSignedUrl({ fileExtension, mimeType }) {
  const params = {
    Bucket: keys.s3Bucket,
    Key: `${uuid()}.${fileExtension}`,
    ContentType: mimeType
  };
  const postUrl = s3.getSignedUrl('putObject', params);
  return Promise.resolve({ key: params.Key, postUrl });
}