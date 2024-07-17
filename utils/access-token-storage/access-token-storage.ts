export class AccessTokenStorage {
  private static accessToken: string;

  private constructor() {}

  static setAccessToken(accessToken: string) {
    AccessTokenStorage.accessToken = accessToken;
  }

  static getAccessToken(): string {
    return AccessTokenStorage.accessToken;
  }
}
