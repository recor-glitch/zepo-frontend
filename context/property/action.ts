import { IAddressDetails, IBenifitsAndExtra, IPropertyInfo } from "@/type/app";

type SetPropertyInfo = {
  type: "setPropertyInfo";
  payload: IPropertyInfo;
};

type SetAdressDetails = {
  type: "setAdressDetails";
  payload: IAddressDetails;
};

type SetBenifitsAndExtras = {
  type: "setBenifitsAndExtras";
  payload: IBenifitsAndExtra;
};

// PAYLOADS
interface IActiveStep {
  step: number;
}

type SetActiveStep = {
  type: "setActiveStep";
  payload: IActiveStep;
};

export type Action =
  | SetPropertyInfo
  | SetAdressDetails
  | SetBenifitsAndExtras
  | SetActiveStep;
