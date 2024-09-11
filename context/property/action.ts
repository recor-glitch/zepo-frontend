import { FormStatus, IBenifitsAndExtra } from "@/type/app";
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

type SetBenifitsAndExtras = {
  type: "setBenifitsAndExtras";
  payload: IBenifitsAndExtra;
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
  | SetBenifitsAndExtras
  | SetActiveStep
  | SetFormStatus
  | SetUpdatePropertyInfo;
