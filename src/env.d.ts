interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_BACKEND_URL?: string;
  readonly VITE_ADMIN_ACTIVE_TOGGLE?: boolean;
  readonly VITE_NETWORK_TIMEOUT?: number;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
