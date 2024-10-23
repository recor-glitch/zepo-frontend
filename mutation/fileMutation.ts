import { DeleteFiles, UploadFile } from "@/services/file-service/file-service";
import { IDefaultResponse } from "@/type/app";
import {
  IUploadDeleteVariable,
  IUploadResponse,
  IUploadVariable,
} from "@/type/dto/upload/upload-dto";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useFileUpload = (
  option?: UseMutationOptions<IUploadResponse, AxiosError, IUploadVariable>
) => {
  return useMutation<IUploadResponse, AxiosError, IUploadVariable>({
    mutationFn: (variable) => UploadFile(variable.files),
    mutationKey: ["upload-file"],
    ...option,
  });
};

export const useFileDelete = (
  option?: UseMutationOptions<
    IDefaultResponse,
    AxiosError,
    IUploadDeleteVariable
  >
) => {
  return useMutation<IDefaultResponse, AxiosError, IUploadDeleteVariable>({
    mutationFn: (variable) => DeleteFiles(variable.urls),
    mutationKey: ["upload-file"],
    ...option,
  });
};
