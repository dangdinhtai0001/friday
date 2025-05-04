import { Button } from "@/components/atoms/button";
import { Spinner } from "@/components/atoms/loader";
import { BusyButtonProps } from "./types";

function BusyButton({ isLoading, children, ...props }: BusyButtonProps) {
  return (
    <Button {...props}>
      <div className="flex items-center gap-2">
        {isLoading ? <Spinner className={`h-12 w-12 ${isLoading ? "opacity-30" : ""}`} /> : null}
        {children}
      </div>
    </Button>
  );
}

export default BusyButton;
