export {};

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
        }
      ) => string;

      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}