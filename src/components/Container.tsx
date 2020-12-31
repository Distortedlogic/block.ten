import { Flex, FlexProps, useColorMode } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode | JSX.Element | (JSX.Element | JSX.Element[])[];
} & FlexProps;

export const Container = (props: ContainerProps) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };
  const color = { light: "black", dark: "white" };
  return <Flex bg={bgColor[colorMode]} color={color[colorMode]} {...props} />;
};
