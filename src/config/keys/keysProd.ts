export default {
  jwtSecret: process.env.JWT_SECRET,
  googleTranslateApiKey: process.env.GOOGLE_TRANSLATE_API_KEY,
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY, 
  s3Bucket: process.env.S3_BUCKET,
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT,
  redisUri: process.env.REDIS_URL,
  baseUrl: process.env.BASE_URL,
  googleOAuthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  googleOAuthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
}