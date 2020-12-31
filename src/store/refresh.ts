import { action, Action } from "easy-peasy";

export interface refreshStore {
  refreshDep: boolean;
  triggerRefresh: Action<refreshStore, boolean>;
}

export const refresh: refreshStore = {
  refreshDep: true,

  triggerRefresh: action((state, newValue) => {
    state.refreshDep = newValue;
  }),
};
