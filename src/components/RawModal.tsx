import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";
import React, { useState } from "react";
import { Container } from "./Container";

interface RawModalProps {
  block: GetBlockResult;
  active: number | undefined;
  idx: number;
  setActive: (idx: number | undefined) => void;
}

const blockWithoutTransactions = (block: GetBlockResult) => {
  // stringify then parse to clone json
  const newBlock = JSON.parse(JSON.stringify(block));
  delete (newBlock as any).transactions;
  return newBlock;
};

export const RawModal: React.FC<RawModalProps> = ({
  block,
  active,
  idx,
  setActive,
}) => {
  const [value] = useState(JSON.stringify(blockWithoutTransactions(block)));
  const { hasCopied, onCopy } = useClipboard(value);
  return (
    <Modal
      isCentered
      preserveScrollBarGap
      isOpen={idx === active}
      onClose={() => setActive(undefined)}
      size="6xl"
      data-testid="RawModal"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <Container flexDirection="column" p={4}>
            <Text>{"{"}</Text>
            {Object.keys(block).map((key, idx) => {
              if (key !== "transactions")
                return (
                  <Text key={idx}>{`${key}: ${(block as any)[key]}`}</Text>
                );
              else return <React.Fragment key={idx}></React.Fragment>;
            })}
            <Text>{"}"}</Text>
            <Flex justifyContent="center">
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </Flex>
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
