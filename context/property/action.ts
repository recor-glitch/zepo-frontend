import {
  FormStatus,
  IAddressDetails,
  IBenifitsAndExtra
} from "@/type/app";
import { IPropertyDto } from "@/type/dto/property/property-dto";

type SetPropertyInfo = {
  type: "setPropertyInfo";
  payload: IPropertyDto;
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
  | SetFormStatus;
