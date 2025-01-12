export class TokenStorage {
  public static accessToken: string;
  public static refreshToken: string;

  static set setAccessToken(accessToken: string) {
    console.log("set access token", this.accessToken, accessToken);
    this.accessToken = accessToken;
  }

  static get getAccessToken(): string {
    console.log("get access token", this.accessToken);
    return this.accessToken;
  }

  static set setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  static get getRefreshToken(): string {
    return this.refreshToken;
  }
}
