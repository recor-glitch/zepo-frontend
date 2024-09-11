// ./components/Popover.tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IdefaultPopoverProps {
  triggerElement: React.ReactNode;
  content?: React.ReactNode;
}

const DefaultPopoverComponent = ({
  triggerElement,
  content,
}: IdefaultPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="
            -translate-x-[25%] z-50 p-0 bg-white border border-gray-200 rounded shadow-lg
            animate-fadeInUp
          "
        sideOffset={5}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default DefaultPopoverComponent;
