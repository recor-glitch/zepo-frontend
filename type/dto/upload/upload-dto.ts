export interface IUploadResponse {
  statusCode: number;
  urls: { URL: string; ALT: string }[];
}

export interface IUploadVariable {
  files: FormData;
}