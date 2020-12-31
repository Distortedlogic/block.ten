import { createStore, createTypedHooks, Store } from "easy-peasy";
import { refresh, refreshStore } from "./refresh";

export interface globalStore {
  refresh: refreshStore;
}

export const globalStore: Store<globalStore> = createStore({ refresh });

const typedHooks = createTypedHooks<globalStore>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
