import { FormTriggerProps } from "../types";
import DialogTrigger from "./DialogTrigger";

function FormTrigger({ children, ...props }: FormTriggerProps) {
    return (<>
        <DialogTrigger {...props}>
            {children}
        </DialogTrigger>
    </>);
}

FormTrigger.displayName = "FormTrigger";
export default FormTrigger;


