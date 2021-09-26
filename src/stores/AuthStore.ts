import { Username } from "shared/interfaces";
import { createConnectedStore, Effects, Store } from "undux";

type State = {
  isAuthenticated: boolean;
  username: Username | null;
};

let initialState: State = {
  isAuthenticated: false,
  username: null,
};

// Create a store with an initial value.
export const AuthStore = createConnectedStore(initialState);

export type StoreProps = {
  store: Store<State>;
};

export type StoreEffects = Effects<State>;
