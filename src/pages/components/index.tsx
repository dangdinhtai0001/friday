import { IconButton, type ButtonProps } from "@/components/atoms/button";
// Define the variants for the buttons
const variants: ButtonProps["variant"][] = [
  "borderless",
  "neutral",
  "outline",
  "filled",
];

// Define the configurations for each row of buttons
const buttonConfigs = [
  { leftIcon: "command", rightIcon: "chevron-down", children: "Button" },
  { leftIcon: "command", rightIcon: null, children: "Button" },
  { leftIcon: null, rightIcon: "chevron-down", children: "Button" },
  { leftIcon: null, rightIcon: null, children: "Button" },
  { leftIcon: "command", rightIcon: "chevron-down", children: null },
  { leftIcon: "command", rightIcon: null, children: null },
];

function Page() {
  return (
    <>
      <div>Button</div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          {buttonConfigs.map((config, rowIndex) => (
            <div key={rowIndex} className="flex gap-8">
              {variants.map((variant, variantIndex) => (
                <IconButton
                  key={variantIndex}
                  variant={variant}
                  size="small"
                  leftIcon={config.leftIcon}
                  rightIcon={config.rightIcon}
                >
                  {config.children}
                </IconButton>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-8">
          {buttonConfigs.map((config, rowIndex) => (
            <div key={rowIndex} className="flex gap-8">
              {variants.map((variant, variantIndex) => (
                <IconButton
                  key={variantIndex}
                  variant={variant}
                  size="small"
                  leftIcon={config.leftIcon}
                  rightIcon={config.rightIcon}
                  disabled
                >
                  {config.children}
                </IconButton>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="h-16"></div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          {buttonConfigs.map((config, rowIndex) => (
            <div key={rowIndex} className="flex gap-8">
              {variants.map((variant, variantIndex) => (
                <IconButton
                  key={variantIndex}
                  variant={variant}
                  size="medium"
                  leftIcon={config.leftIcon}
                  rightIcon={config.rightIcon}
                >
                  {config.children}
                </IconButton>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-8">
          {buttonConfigs.map((config, rowIndex) => (
            <div key={rowIndex} className="flex gap-8">
              {variants.map((variant, variantIndex) => (
                <IconButton
                  key={variantIndex}
                  variant={variant}
                  size="medium"
                  leftIcon={config.leftIcon}
                  rightIcon={config.rightIcon}
                  disabled
                >
                  {config.children}
                </IconButton>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="h-16"></div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          {buttonConfigs.map((config, rowIndex) => (
            <div key={rowIndex} className="flex gap-16">
              {variants.map((variant, variantIndex) => (
                <IconButton
                  key={variantIndex}
                  variant={variant}
                  size="large"
                  leftIcon={config.leftIcon}
                  rightIcon={config.rightIcon}
                >
                  {config.children}
                </IconButton>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-8">
          {buttonConfigs.map((config, rowIndex) => (
            <div key={rowIndex} className="flex gap-16">
              {variants.map((variant, variantIndex) => (
                <IconButton
                  key={variantIndex}
                  variant={variant}
                  size="large"
                  leftIcon={config.leftIcon}
                  rightIcon={config.rightIcon}
                  disabled
                >
                  {config.children}
                </IconButton>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
