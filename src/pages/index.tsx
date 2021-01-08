import {
  Box,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { Fragment, useState } from "react";
import { RawModal } from "../components/RawModal";
import { useTenBlocks } from "../hooks/useTenBlocks";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();
dayjs.tz.setDefault("America/New_York");
dayjs.extend(LocalizedFormat);

interface indexProps {}

const Index: React.FC<indexProps> = () => {
  const [active, setActive] = useState<number | undefined>();
  const toggle = (idx: number) => setActive(idx === active ? undefined : idx);

  const { colorMode } = useColorMode();
  const hoverColor = { light: "gray.200", dark: "gray.800" };
  const tenBlocks = useTenBlocks();
  if (!tenBlocks) return <></>;
  else {
    const gridColSize = "1fr 4fr 15fr 3fr 3fr 3fr 3fr";
    const StackHeader = () => (
      <Grid templateColumns={gridColSize}>
        <Text textAlign="center">#</Text>
        <Text textAlign="center">Local Timestamp</Text>
        <Text mr={4}>ID</Text>
        <Text textAlign="center">Block Number</Text>
        <Text textAlign="center">Producer</Text>
        <Text textAlign="center"># Transactions</Text>
        <Text textAlign="center">Confirmed number</Text>
      </Grid>
    );
    Array.from(Array(tenBlocks.length).keys()).map(() =>
      tenBlocks.map((block, idx) => {
        if (
          !(idx === tenBlocks.length - 1) &&
          block.id < tenBlocks[idx + 1].id
        ) {
          const temp = block;
          block = tenBlocks[idx + 1];
          tenBlocks[idx + 1] = temp;
        }
      })
    );

    const stackItems =
      tenBlocks.length !== 0
        ? tenBlocks.map((block, idx) => (
            <Fragment key={idx}>
              <Tooltip
                key={idx}
                hasArrow
                label="Click to view raw JSON"
                bg="gray.300"
                color="black"
                placement="top-start"
              >
                <Box
                  _hover={{
                    backgroundColor: hoverColor[colorMode],
                    cursor: "pointer",
                  }}
                  key={idx}
                >
                  <Grid
                    onClick={() => toggle(idx)}
                    templateColumns={gridColSize}
                  >
                    <Text py={1} textAlign="center">
                      {idx + 1}
                    </Text>
                    <Text textAlign="center">
                      {dayjs.utc(block.timestamp).local().format("LTS")}
                    </Text>
                    <Text>{block.id}</Text>
                    <Text textAlign="center">{block.block_num}</Text>
                    <Text textAlign="center">{block.producer}</Text>
                    <Text textAlign="center">
                      {(block as any).transactions
                        ? (block as any).transactions.length
                        : 0}
                    </Text>
                    <Text textAlign="center">{block.confirmed}</Text>
                  </Grid>
                </Box>
              </Tooltip>
              <Divider />
              <RawModal
                block={block}
                idx={idx}
                active={active}
                setActive={setActive}
              />
            </Fragment>
          ))
        : Array.from(Array(10).keys()).map((idx) => (
            <Fragment key={idx}>
              <Grid templateColumns={gridColSize}>
                <Text py={1} textAlign="center">
                  {idx + 1}
                </Text>
                <Text textAlign="center">
                  <Skeleton />
                </Text>
                <Text>
                  <Skeleton />
                </Text>
                <Text textAlign="center">
                  <Skeleton />
                </Text>
                <Text textAlign="center">
                  <Skeleton />
                </Text>
                <Text textAlign="center">
                  <Skeleton />
                </Text>
                <Text textAlign="center">
                  <Skeleton />
                </Text>
              </Grid>
              <Divider />
            </Fragment>
          ));
    return (
      <Stack px={8} width="100%" height="auto" justifyContent="center">
        <StackHeader />
        <Divider />
        {stackItems}
      </Stack>
    );
  }
};
export default Index;
