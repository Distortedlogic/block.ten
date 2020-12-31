import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";

export const countBlockActions = (block: GetBlockResult) =>
  ((block as any).transactions as Array<any>).reduce<number>(
    (prev, current) => {
      if (current.trx.transaction?.actions)
        return prev + current.trx.transaction.actions.length;
      else return prev;
    },
    0
  );
