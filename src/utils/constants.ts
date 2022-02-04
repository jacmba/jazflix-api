export default class Constants {
  public static readonly AUTH = Object.freeze({
    REQUEST_RESPONSE_TYPE: 'code',
    REQUEST_SCOPE: 'profile+email',
    REQUEST_ACCESS_TYPE: 'offline',
    TOKEN_GRANT_TYPE: 'authorization_code',
    REFRESH_GRANT_TYPE: 'refresh_token',
    REQUEST_PROMPT: 'consent',
  });
}
