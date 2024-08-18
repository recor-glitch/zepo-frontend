import { IAddressDetails, IBenifitsAndExtra, IPropertyInfo } from "@/type/app";
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
