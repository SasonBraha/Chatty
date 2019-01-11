const isDevelopment = process.env.NODE_ENV === 'development';

export const API_URL = isDevelopment ? 'http://localhost:5000/api' : '/api';
export const SOCKET_URL = isDevelopment ? 'http://localhost:5000' : 'https://chatty.co.il';

// Local Storage Keys
export const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';

// Quert String
export const REDIRECTED_FROM_QS = 'redirectedFrom';

// Keys
export const S3_BUCKET_URL = 'https://s3.eu-central-1.amazonaws.com/chatty-bucket';
export const GOOGLE_RECAPTCHA_SITE_KEY = '6Lc9ZXgUAAAAAMsDauRGXcJmgkH1WPiodyWajvGM';

// Routes
export const SIGN_UP_URL = '/signup';
export const SIGN_IN_URL = '/signin';