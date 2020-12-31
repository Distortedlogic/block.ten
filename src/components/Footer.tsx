import { Link, Text } from "@chakra-ui/react";
import React from "react";
import { Container } from "./Container";

export const Footer = () => (
  <Container
    position="sticky"
    bottom="0"
    width="100%"
    py={4}
    as="footer"
    zIndex={1}
    justifyContent="center"
    data-testid="Footer"
  >
    <Link href="https://eos.io/" target="_blank">
      <Text>More info on EOS</Text>
    </Link>
  </Container>
);
