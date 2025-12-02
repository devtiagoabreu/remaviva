/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_FORM_URL?: string;
  readonly VITE_BACKEND_URL?: string;
  // Adicione outras variáveis aqui conforme necessário
}