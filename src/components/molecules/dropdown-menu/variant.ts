import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export function getMenuContentVariants(
  side: React.ComponentProps<typeof DropdownMenuPrimitive.Content>["side"],
) {
  return {
    hidden: {
      opacity: 0,
      ...(side === "left" && { x: 8 }), // Slide từ phải sang trái
      ...(side === "right" && { x: -8 }), // Slide từ trái sang phải
      ...(side === "top" && { y: 8 }), // Slide từ dưới lên
      ...(side === "bottom" && { y: -8 }), // Slide từ trên xuống
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };
}
