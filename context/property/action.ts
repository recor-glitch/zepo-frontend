import { IAddressDetails, IBenifitsAndExtra, IPropertyInfo } from "@/type/app";

type SetPropertyInfo = {
  type: "setPropertyInfo";
  payload: IPropertyInfo;
};

type SetAdressDetails = {
  type: "setAdressDetails";
  payload: IAddressDetails;
}

type SetBenifitsAndExtras = {
  type: "setBenifitsAndExtras";
  payload: IBenifitsAndExtra;
}

export type Action = SetPropertyInfo | SetAdressDetails | SetBenifitsAndExtras;
