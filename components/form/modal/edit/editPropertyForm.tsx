import { UsePropertyFormContextProvider } from "@/context/property/property-fom-context";
import PropertyEditFormWrapper from "../../property-wrapper/propertyEditFormWrapper";

const PropertyEditComponent = ({ id }: { id: string }) => {
  return (
    <UsePropertyFormContextProvider>
      <div className="flex flex-col h-full w-full justify-center items-center gap-default">
        <div className="flex flex-col w-full gap-default items-center">
          <PropertyEditFormWrapper id={id} />
        </div>
      </div>
    </UsePropertyFormContextProvider>
  );
};

export default PropertyEditComponent;
