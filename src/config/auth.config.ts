export default class AuthConfig {
  public static readonly REQUEST_URI =
    process.env.AUTH_REQUEST_URI ||
    'https://accounts.google.com/o/oauth2/v2/auth';

  public static readonly TOKEN_URI =
    process.env.AUTH_TOKEN_URI || 'https://oauth2.googleapis.com/token';

  public static readonly REDIRECT_URI =
    process.env.AUTH_REDIRECT_URI || 'http://localhost:3000';

  public static readonly CLIENT_ID = process.env.AUTH_CLIENT_ID || 'clientId';

  public static readonly CLIENT_SECRET =
    process.env.AUTH_CLIENT_SECRET || 'clientSecret';
}
