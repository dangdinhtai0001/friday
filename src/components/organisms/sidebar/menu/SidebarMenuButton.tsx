import {
  MCTooltip,
  MCTooltipContent,
  MCTooltipTrigger,
} from "@/components/molecules/tooltip";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/composables/utils/shadcn";

const sidebarMenuButtonVariants = cva("", {
  variants: {
    variant: {
      default: "",
      outline: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof MCTooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button";

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <>
      <MCTooltip>
        <MCTooltipTrigger asChild>{button}</MCTooltipTrigger>
        <MCTooltipContent
          side="right"
          align="center"
          {...tooltip}
        />
      </MCTooltip>
    </>
  );
}

export default SidebarMenuButton;
