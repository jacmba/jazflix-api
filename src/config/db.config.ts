export default class DbConfig {
  public static readonly TYPE = 'mongodb';
  public static readonly HOST = process.env.DB_HOST || 'localhost';
  public static readonly SYNC = false;
  public static readonly PORT = Number(process.env.DB_PORT || 27017);
  public static readonly DB = process.env.DB_DATABASE || 'jazflix';
}
