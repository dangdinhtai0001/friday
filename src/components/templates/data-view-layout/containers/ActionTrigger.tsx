import { Button } from "@/components/atoms/button";
import { ActionTriggerProps } from "../types";

function ActionTrigger({ type }: ActionTriggerProps) {

    const renderButton = () => {
        return (
            <div data-grid={{ x: 0, y: 0, w: 12, h: 7 }}>
                <Button>Button</Button>
            </div>
        )
    }
    const renderModal = () => {
        return (
            <div data-grid={{ x: 0, y: 1, w: 12, h: 7 }}>ActionTrigger modal</div>
        )
    }
    const renderCustom = () => {
        return (
            <div data-grid={{ x: 0, y: 2, w: 12, h: 7 }}>ActionTrigger custom</div>
        )
    }

    switch (type) {
        case "button":
            return renderButton();
        case "modal":
            return renderModal();
        case "custom":
            return renderCustom();
        default:
            return null;
    }
}

ActionTrigger.displayName = "ActionTrigger";
export default ActionTrigger;

