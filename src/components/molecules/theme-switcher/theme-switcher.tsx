import {
  ECDropdownMenu,
  ECDropdownMenuContent,
  ECDropdownMenuGroup,
  ECDropdownMenuItem,
  ECDropdownMenuTrigger,
} from "../dropdown-menu";
import { ECButton } from "@/components/atoms/button";
import { ECIconLoader } from "@/components/atoms/icon-loader";
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
    <ECDropdownMenu>
      <ECDropdownMenuTrigger asChild>
        <ECButton
          leftIcon={
            <ECIconLoader name={currentOption.icon} className="size-20" />
          }
        />
      </ECDropdownMenuTrigger>

      <ECDropdownMenuContent
        className="typography-regular-12 text-black-100 w-[8rem]"
        side="bottom"
      >
        <ECDropdownMenuGroup>
          {options.map((option, index) => (
            <ECDropdownMenuItem
              key={index}
              onSelect={() => {
                handleSelect(option);
              }}
            >
              <div className="rounded-8 flex items-center justify-start gap-4">
                <ECIconLoader name={option.icon} />
                <div>{option.text}</div>
              </div>
            </ECDropdownMenuItem>
          ))}
        </ECDropdownMenuGroup>
      </ECDropdownMenuContent>
    </ECDropdownMenu>
  );
}

export default ThemeSwitcher;
