import { Checkbox } from "@/components/atoms/checkbox";

export interface SelectItemProps {
    id: string;
    label: string;
    checked: boolean;
    disabled?: boolean;
}

function SelectItem({ label, id, checked, disabled = false }: SelectItemProps) {
    return (
        <div className="flex w-full items-center gap-2">
            <Checkbox id={id} animation={false} checked={checked} disabled={disabled} />
            <label
                htmlFor={id}
                className="typography-regular-12 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
        </div>
    )
}

export default SelectItem;
