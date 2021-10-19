import { User } from "shared/interfaces";
import { createConnectedStore, Effects, Store } from "undux";

type State = {
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: State = {
  isAuthenticated: false,
  user: null,
};

// Create a store with an initial value.
export const AuthStore = createConnectedStore(initialState);

export type StoreProps = {
  store: Store<State>;
};

export type StoreEffects = Effects<State>;
