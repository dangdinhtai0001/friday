import {
  MCSelect,
  MCSelectTrigger,
  MCSelectValue,
  MCSelectContent,
  MCSelectItem,
} from "@/components/atoms/select";
import { ECThemeSwitcher } from "@/components/molecules/theme-switcher";
import React from "react";

function Page() {
  const [value, setValue] = React.useState("france");

  const handleValueChange = (value: string) => {
    setValue(value);
  }
  return (
    <div>
      <h1>System Status</h1>

      <MCSelect value={value} onValueChange={handleValueChange}>
        <MCSelectTrigger className="w-[180px]">
          <MCSelectValue placeholder="Theme" />
        </MCSelectTrigger>
        <MCSelectContent>
          <MCSelectItem value="light">Light</MCSelectItem>
          <MCSelectItem value="dark">Dark</MCSelectItem>
          <MCSelectItem value="system">System</MCSelectItem>
        </MCSelectContent>
      </MCSelect>

      <ECThemeSwitcher />
    </div>
  );
}

export default Page;
