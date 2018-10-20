import * as AWS from 'aws-sdk';
import keys from '../keys';
 
export const s3 = new AWS.S3({ 
  accessKeyId: keys.s3AccessKeyId,
  secretAccessKey: keys.s3SecretAccessKey,
  signatureVersion: 'v4',
  region: 'eu-central-1'
});