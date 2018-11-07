import * as fileType from 'file-type';
import { errorObject } from '../';
import * as sizeOf from 'buffer-image-size';

interface IFileData {
  fileSizeInKB: number;
  fileExtension: string;
  mimeType: string;
  dimensions: {
    height: number;
    width: number;
    type: string;
  }
}

export default (file: Buffer, maxFileSizeInKb: number): Promise<IFileData> => {
  const maxFileSize = maxFileSizeInKb; // KB
  const allowedFileExtensions = [
    'jpg', 'jpeg',
    'png', 'gif',
    'webp', 'bmp'
  ];

  // File Size In KB
  const fileSizeInKB: number = Math.floor(Buffer.byteLength(file, 'utf8') / 1024);
  // File Type
  const { ext: fileExtension, mime: mimeType } = fileType(file);
  // File Dimensions { width, height }
  const dimensions = sizeOf(file);

  return new Promise((resolve, reject) => {
    // Validate File Type
    if (!allowedFileExtensions.includes(fileExtension)) {
      return reject(errorObject(400, 'הקובץ לא נתמך במערכת'));
    } 

    // Validate File Size
    if (fileSizeInKB > maxFileSize) {
      return reject(errorObject(400, `הקובץ שנבחר גדול מדי, הגודל המירבי הניתן להעלאה הינו ${Math.ceil(maxFileSize / 1024)}MB`));
    }

    resolve({ fileSizeInKB, fileExtension, mimeType, dimensions });
  });
}