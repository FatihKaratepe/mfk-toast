// Type declarations for window properties
declare global {
    interface Window {
        __MFK_TOAST_CONTAINER__?: HTMLDivElement;
        $mfkToast?: (options: import('./types').NotificationOptions) => void;
    }
}

export { };
