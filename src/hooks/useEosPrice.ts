import { useState } from "react";
import { useAsyncEffect } from "use-async-effect";
import { useStoreState } from "../store/store";

export const useEosPrice = () => {
  const [eosPrice, setEosPrice] = useState(0);
  const {
    refresh: { refreshDep },
  } = useStoreState((actions) => actions);
  useAsyncEffect(
    async (isMounted) => {
      if (!isMounted() || !refreshDep) return;
      const rawPriceData = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=EOS&tsyms=USD"
      );
      const jsonPriceData = await rawPriceData.json();
      setEosPrice(jsonPriceData.USD);
    },
    () => {},
    [refreshDep, eosPrice, setEosPrice]
  );
  return eosPrice;
};
