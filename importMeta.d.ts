/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GIT_COMMIT?: string;
  readonly GIT_TAG?: string;
  readonly GIT_BRANCH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
