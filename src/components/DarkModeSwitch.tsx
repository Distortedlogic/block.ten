import { Switch, SwitchProps, useColorMode } from "@chakra-ui/react";
import React from "react";

export const DarkModeSwitch: React.FC<SwitchProps> = (props: SwitchProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      color="green"
      data-testid="DarkModeSwitch"
      isChecked={isDark}
      onChange={toggleColorMode}
      {...props}
    />
  );
};
