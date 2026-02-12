import { clearToasts, createToast } from './createToast';
import type { NotificationOptions, NotificationType } from './types';

export const useToast = () => {
  const open = (options: NotificationOptions) => {
    return createToast(options);
  };

  const clear = () => {
    clearToasts();
  };

  const createTypeMethod = (type: NotificationType) => {
    return (title: string, message: string, options?: Partial<NotificationOptions>) => {
      return open({ title, message, type, ...options });
    };
  };

  return {
    open,
    clear,
    success: createTypeMethod('success'),
    error: createTypeMethod('error'),
    info: createTypeMethod('info'),
    warning: createTypeMethod('warning'),
  };
};
