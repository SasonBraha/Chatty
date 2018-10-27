import * as uuid from 'uuid';
import validateFile from '../../utils/Validation/validateFile';
import keys from '../keys';
import { s3 } from './s3Config'; 
import { IFile } from '../../models/File';

export async function getUploadAndFileData(file: Buffer, refrence: string) {
  try {
    if (!file) return { uploadData: null, fileData: null };
    const { fileExtension, mimeType, dimensions: { height, width } } = await validateFile(file);
    const uploadData = {
      Key: `${refrence}/${uuid()}.${fileExtension}`,
      Bucket: keys.s3Bucket,
      Body: file,
      ContentEncoding: 'base64', 
      ContentType: mimeType  
    }
    const fileData = {
      type: fileExtension,
      link: uploadData.Key,
      dimensions: {
        height,
        width
      }
    }
    return { 
      uploadData, 
      fileData: fileData
    };
  } catch (ex) {
    console.log(ex)
  }
}


export async function putObject(uploadData) { 
  try {
    return new Promise((resolve, reject) => {
      s3.putObject(uploadData, err => err ? reject(err) : resolve())
    });
  } catch (ex) {
    console.log(ex)
  }
}