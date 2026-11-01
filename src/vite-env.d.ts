/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHECKOUT_URL?: string;
  readonly VITE_PRO_CODES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
