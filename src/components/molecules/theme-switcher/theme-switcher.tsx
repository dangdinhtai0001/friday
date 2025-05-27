import {
  MCDropdownMenu,
  MCDropdownMenuContent,
  MCDropdownMenuGroup,
  MCDropdownMenuItem,
  MCDropdownMenuTrigger,
} from "../dropdown-menu";
import { MCButton } from "@/components/atoms/button";
import { IconLoader } from "@/components/atoms/icon-loader";
import { useTheme } from "@/composables/hooks/use-theme";
import React from "react";
import { find as _find } from "lodash-es";
import { Theme } from "@/store";

type ThemeOption = {
  value: Theme;
  text: string;
  icon: string;
};

const options: ThemeOption[] = [
  { value: "pastel-light", text: "pastel light", icon: "sun" },
  { value: "pastel-dark", text: "pastel dark", icon: "moon" },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [currentOption, setCurrentOption] = React.useState<ThemeOption>(
    _find(options, { value: theme }) || options[0],
  );
  const handleSelect = (option: ThemeOption) => {
    setCurrentOption(option);
    setTheme(option.value);
  };

  return (
    <MCDropdownMenu>
      <MCDropdownMenuTrigger asChild>
        <MCButton
          leftIcon={
            <IconLoader name={currentOption.icon} className="size-20" />
          }
        />
      </MCDropdownMenuTrigger>

      <MCDropdownMenuContent
        className="typography-regular-12 text-black-100 w-[8rem]"
        side="bottom"
      >
        <MCDropdownMenuGroup>
          {options.map((option, index) => (
            <MCDropdownMenuItem
              key={index}
              onSelect={() => {
                handleSelect(option);
              }}
            >
              <div className="rounded-8 flex items-center justify-start gap-4">
                <IconLoader name={option.icon} />
                <div>{option.text}</div>
              </div>
            </MCDropdownMenuItem>
          ))}
        </MCDropdownMenuGroup>
      </MCDropdownMenuContent>
    </MCDropdownMenu>
  );
}

export default ThemeSwitcher;
