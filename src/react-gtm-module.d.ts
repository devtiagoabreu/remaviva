// src/react-gtm-module.d.ts
declare module 'react-gtm-module' {
  interface TagManagerArgs {
    gtmId: string;
    auth?: string;
    preview?: string;
    dataLayer?: Record<string, any>;
    dataLayerName?: string;
  }

  const TagManager: {
    initialize: (args: TagManagerArgs) => void;
    dataLayer: (data: Record<string, any>) => void;
  };

  export default TagManager;
}