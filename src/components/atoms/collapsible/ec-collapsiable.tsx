import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import CollapsibleProvider from "./context/collapsible-provider";
import { CollapsibleProps } from "./types";

function Collapsible({ ...props }: CollapsibleProps) {
  return (
    <CollapsibleProvider {...props}>
      <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
    </CollapsibleProvider>
  );
}

export default Collapsible;
