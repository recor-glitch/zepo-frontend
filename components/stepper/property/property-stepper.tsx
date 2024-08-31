import { usePropertyFormContext } from "@/context/property/property-fom-context";

interface stepperProps {
  steps: { title: string }[];
}

const PropertyStepper = ({ steps }: stepperProps) => {
  const { dispatch, activeStep } = usePropertyFormContext();
  return (
    <div className="flex py-v items-center w-full">
      {steps.map((step, index) => (
        <div
          className="flex items-center flex-1 cursor-pointer"
          key={step.title + index}
        >
          <div
            className={`flex  w-[15rem] min-w-52 ${
              index === steps.length - 1 && "w-28"
            } gap-default justify-between items-center rounded-full p-sm ${
              activeStep === index ? `border-2 border-primary` : `border`
            }`}
          >
            <div
              className={`circle-div h-icon w-icon p-sm justify-center items-center flex ${
                activeStep === index
                  ? `border-2 border-primary text-primary`
                  : `border text-text-secondary`
              }`}
            >
              {index + 1}
            </div>
            <p
              className={` text-sm-subtitle line-clamp-2 text-ellipsis ${
                activeStep === index
                  ? `text-text-primary font-bold`
                  : `text-text-secondary font-medium`
              }`}
            >
              {step.title}
            </p>
          </div>
          {index !== steps.length - 1 && <div className="divider-h" />}
        </div>
      ))}
    </div>
  );
};

export default PropertyStepper;
