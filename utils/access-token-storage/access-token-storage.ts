export class TokenStorage {
  private static accessToken: string;
  private static refreshToken: string;

  private constructor() {}

  static setAccessToken(accessToken: string) {
    TokenStorage.accessToken = accessToken;
  }

  static getAccessToken(): string {
    return TokenStorage.accessToken;
  }

  static setRefreshToken(accessToken: string) {
    TokenStorage.refreshToken = this.refreshToken;
  }

  static getRefreshToken(): string {
    return TokenStorage.refreshToken;
  }
}
