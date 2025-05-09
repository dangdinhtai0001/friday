import { Input, type InputProps } from "@/components/atoms/input";
import { cn } from "@/composables/utils/shadcn";
import { textFieldVariants, addonVariant } from "./variant";

type AddonPosition = "before" | "after";

export type TextFieldProps = Omit<InputProps, "prefix"> & {
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode | string;
  postfix?: React.ReactNode | string;
  disabled?: boolean;
};

function TextField({
  addonBefore,
  addonAfter,
  prefix,
  postfix,
  size,
  className,
  ...props
}: TextFieldProps) {
  const renderAddon = (
    addon: React.ReactNode | undefined,
    postion: AddonPosition,
  ) => {
    if (addon) {
      return (
        <div
          className={cn(
            "addon",
            addonVariant(size),
            postion == "before" ? "border-r-none rounded-r-none" : "",
            postion == "after" ? "border-l-none rounded-l-none" : "",
          )}
        >
          {addon}
        </div>
      );
    }

    return null;
  };

  const renderAffix = (affix: React.ReactNode | undefined) => {
    if (affix) {
      return <div className="affix">{affix}</div>;
    }

    return null;
  };

  return (
    <div className={cn("group flex items-center", className)}>
      {renderAddon(addonBefore, "before")}
      {/* Input wrapper */}
      <div
        className={cn(
          "input-wrapper group-hover:border-black-40 flex items-center gap-4",
          textFieldVariants(size),
          // "border-r-0 border-l-0 rounded-l-none rounded-r-none"
          addonBefore ? "rounded-l-none border-l-0" : "",
          addonAfter ? "rounded-r-none border-r-0" : "",
        )}
      >
        {renderAffix(prefix)}
        <Input
          className="group-hover:border-black-40 w-full rounded-none border-r-0 border-l-0 focus-visible:ring-0"
          size={size}
          {...props}
        />
        {renderAffix(postfix)}
      </div>
      {/* Input wrapper */}
      {renderAddon(addonAfter, "after")}
    </div>
  );
}

export default TextField;
