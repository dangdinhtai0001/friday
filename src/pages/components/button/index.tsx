import { DynamicButton, type ButtonProps } from "@/components/atoms/button";
// Define the variants for the buttons
const variants: ButtonProps["variant"][] = [
  "borderless",
  "neutral",
  "outline",
  "filled",
];

const states = ["idle", "disabled", "loading"];

const sizes: ButtonProps["size"][] = ["small", "medium", "large"];

// Define the configurations for each row of buttons
const buttonConfigs = [
  { leftIcon: "command", rightIcon: "chevron-down", children: "Button" },
  { leftIcon: "command", rightIcon: null, children: "Button" },
  { leftIcon: null, rightIcon: "chevron-down", children: "Button" },
  { leftIcon: null, rightIcon: null, children: "Button" },
];

const iconButtonConfigs = [
  { leftIcon: "command", rightIcon: "chevron-down", children: null },
  { leftIcon: "command", rightIcon: null, children: null },
];

function Page() {
  return (
    <>
      <div>Button nè</div>
      <div className="gap8 flex flex-col gap-8">
        {sizes.map((size  , sizeIndex) => (
          <div className="flex gap-8 " key={sizeIndex}>
            {buttonConfigs.map((button, buttonIndex) => {
              return (
                <div className="border-black-10 rounded-8 flex gap-8 border p-8" key={buttonIndex}>
                  {states.map((state, stateIndex) => {
                    const disabled = state === "disabled";
                    const isLoading = state === "loading";

                    return (
                      <div className="flex flex-col gap-8" key={stateIndex}>
                        {variants.map((variant, variantIndex) => (
                          <DynamicButton
                            key={variantIndex}
                            variant={variant}
                            size={size}
                            leftIcon={button.leftIcon}
                            rightIcon={button.rightIcon}
                            disabled={disabled}
                            isLoading={isLoading}
                          >
                            {button.children}
                          </DynamicButton>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="h-8"></div>

      <div className="gap8 flex flex-col gap-8">
        {sizes.map((size, sizeIndex) => (
          <div className="flex gap-8 " key={sizeIndex}>
            {iconButtonConfigs.map((button, buttonIndex) => {
              return (
                <div className="border-black-10 rounded-8 flex gap-8 border p-8" key={buttonIndex}>
                  {states.map((state, stateIndex) => {
                    const disabled = state === "disabled";
                    const isLoading = state === "loading";

                    return (
                      <div className="flex flex-col gap-8" key={stateIndex}>
                        {variants.map((variant, variantIndex) => (
                          <DynamicButton
                            key={variantIndex}
                            variant={variant}
                            size={size}
                            leftIcon={button.leftIcon}
                            rightIcon={button.rightIcon}
                            disabled={disabled}
                            isLoading={isLoading}
                          >
                            {button.children}
                          </DynamicButton>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      
    </>
  );
}

export default Page;
