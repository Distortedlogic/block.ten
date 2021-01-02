import { RepeatClockIcon } from "@chakra-ui/icons";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useEosPrice } from "../hooks/useEosPrice";
import { useStoreActions, useStoreState } from "../store/store";
import { Container } from "./Container";
import { DarkModeSwitch } from "./DarkModeSwitch";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const {
    refresh: { refreshDep },
  } = useStoreState((actions) => actions);
  const {
    refresh: { triggerRefresh },
  } = useStoreActions((actions) => actions);
  const eosPrice = useEosPrice();
  return (
    <Container
      position="sticky"
      data-testid="NavBar"
      top={0}
      width="100%"
      h="6rem"
      py={2}
      mb={10}
      as="nav"
      justifyContent="space-between"
      alignItems="center"
      zIndex={1}
    >
      <Text fontSize="3xl" ml={6}>
        Block.ten
      </Text>
      <Flex justifyContent="space-between" alignItems="center">
        <Link
          mr={6}
          href="https://bittrex.com/Market/Index?MarketName=USD-EOS"
          target="_blank"
          variant="unstyled"
        >
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Text fontWeight="bold">EOS Price</Text>
            <Text>{eosPrice} USD</Text>
          </Flex>
        </Link>
        <Button isLoading={refreshDep} onClick={() => triggerRefresh(true)}>
          <RepeatClockIcon boxSize="1.5em" />
        </Button>
      </Flex>
      <DarkModeSwitch mr={6} />
    </Container>
  );
};
