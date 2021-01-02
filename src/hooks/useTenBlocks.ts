import { JsonRpc, RpcError } from "eosjs";
import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { useStoreActions, useStoreState } from "../store/store";

const rpc = new JsonRpc("https://eos.greymass.com/");

const getBlockCustom = async (topBlockNum: number, idx: number) => {
  try {
    return await rpc.get_block(topBlockNum - idx);
  } catch (e) {
    console.log("\nCaught exception: " + e);
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
    return {} as GetBlockResult;
  }
};

export const useTenBlocks = (): GetBlockResult[] | undefined => {
  const [tenBlocks, setTenBlocks] = useState<GetBlockResult[]>([]);
  const {
    refresh: { refreshDep },
  } = useStoreState((state) => state);
  const {
    refresh: { triggerRefresh },
  } = useStoreActions((actions) => actions);
  useAsyncEffect(
    async (isMounted) => {
      if (!isMounted() || !refreshDep) return;
      const topBlockNum = (await rpc.get_info()).head_block_num;
      const blocks = Array.from(Array(13).keys()).map(
        async (idx) => await getBlockCustom(topBlockNum, idx)
      );
      setTenBlocks(
        (await Promise.all(blocks)).filter((block) => block.id).slice(0, 10)
      );
      triggerRefresh(false);
    },
    [refreshDep]
  );
  return tenBlocks;
};
