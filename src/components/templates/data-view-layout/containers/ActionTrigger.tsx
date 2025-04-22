import { Button } from "@/components/atoms/button";
import { ActionTriggerProps } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";

function ActionTrigger({ type, label }: ActionTriggerProps) {
  const renderButton = () => {
    return <Button>{label}</Button>;
  };
  const renderModal = () => {
    return (
      <>
        <Dialog>
          <DialogTrigger asChild>{renderButton()}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{label}</DialogTitle>
              <DialogDescription>This is a description</DialogDescription>
            </DialogHeader>
            <div>This is form </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  const renderCustom = () => {
    return <div>ActionTrigger custom</div>;
  };

  switch (type) {
    case "button":
      return renderButton();
    case "dialog":
      return renderModal();
    case "custom":
      return renderCustom();
    default:
      return null;
  }
}

ActionTrigger.displayName = "ActionTrigger";
export default ActionTrigger;
