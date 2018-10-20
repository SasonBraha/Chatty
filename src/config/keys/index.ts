import keysProd from './keysProd';
import keysDev from './keysDev';

interface IKeys {
  jwtSecret: string;
  googleTranslateApiKey: string;
  s3AccessKeyId: string;
  s3SecretAccessKey: string;
  s3Bucket: string;
  mongoUri: string;
  port: number;
  redisUri: string;
  baseUrl: string;
  googleOAuthClientId: string;
  googleOAuthClientSecret: string;
}

const keys = process.env.NODE_ENV === 'production' ? keysProd : keysDev;
export default keys as IKeys; 