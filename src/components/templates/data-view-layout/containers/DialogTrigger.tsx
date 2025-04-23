import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger as _DialogTrigger, Dialog } from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import { DialogTriggerProps } from "../types";

function DialogTrigger({ label, title, "trigger-class-name": triggerClassName }: DialogTriggerProps) {
    return (
        <>
            <Dialog>
                <_DialogTrigger asChild>
                    <Button className={triggerClassName}>{label}</Button>
                </_DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
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
}

DialogTrigger.displayName = "DialogTrigger";
export default DialogTrigger;


