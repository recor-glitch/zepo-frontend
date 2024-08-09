import PropertyWrapper from "@/components/form/property-wrapper/PropertyFormWrapper";
import { UsePropertyFormContextProvider } from "@/context/property/property-fom-context";

const PropertyListingPage = () => {
  return (
    <UsePropertyFormContextProvider>
      <div className="flex flex-col h-full justify-center items-center gap-default">
        <div className="flex flex-col gap-default w-1/2 items-center">
          <div className="flex flex-col justify-center items-start gap-default w-full">
            <p className="text-md-title font-bold text-text-primary">
              List your Property
            </p>
            <p className="text-md-subtitle-secondary font-medium text-text-primary">
              List your Property with us, connect with potential renters
            </p>
          </div>
          <PropertyWrapper />
        </div>
      </div>
    </UsePropertyFormContextProvider>
  );
};

export default PropertyListingPage;
