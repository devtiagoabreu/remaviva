// src/globals.d.ts
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
  
  interface ImportMeta {
    env: {
      MODE: string;
      PROD: boolean;
      DEV: boolean;
    };
  }
}

export {};