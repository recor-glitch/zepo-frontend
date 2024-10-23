import { IDefaultResponse } from "@/type/app";
import { IUploadResponse } from "@/type/dto/upload/upload-dto";
import axiosInstance from "@/utils/axios-instance/axios-instance";

export async function UploadFile(files: FormData): Promise<IUploadResponse> {
  const res = await axiosInstance.post<IUploadResponse>(`/upload`, files);

  return res.data;
}

export async function DeleteFiles(urls: string[]): Promise<IDefaultResponse> {
  const res = await axiosInstance.post<IDefaultResponse>(`/upload/delete`, {
    urls,
  });

  return res.data;
}
