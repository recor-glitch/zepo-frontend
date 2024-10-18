import { FormStatus } from "@/type/app";
import { IAddressDetails } from "@/type/dto/address/address-dto";
import {
  IPropertyFormDto,
  IPropertyUpdateDto,
} from "@/type/dto/property/property-dto";

type SetPropertyInfo = {
  type: "setPropertyInfo";
  payload: IPropertyFormDto;
};

type SetAdressDetails = {
  type: "setAdressDetails";
  payload: IAddressDetails;
};

type SetActiveStep = {
  type: "setActiveStep";
  payload: IActiveStep;
};

type SetFormStatus = {
  type: "setFormStatus";
  payload: IFormStatusPayload;
};

type SetUpdatePropertyInfo = {
  type: "setUpdatePropertyInfo";
  payload: IPropertyUpdateDto;
};

type SetRemovedUrlInExtras = {
  type: "setRemovedUrlInExtras";
  payload: { urls: string[] };
};

// PAYLOADS
interface IActiveStep {
  step: number;
}

interface IFormStatusPayload {
  status: FormStatus;
}

export type Action =
  | SetPropertyInfo
  | SetAdressDetails
  | SetActiveStep
  | SetFormStatus
  | SetUpdatePropertyInfo
  | SetRemovedUrlInExtras;
