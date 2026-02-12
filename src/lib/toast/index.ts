import type { App } from 'vue';
import { clearToasts, createToast } from './createToast';
import './index.scss';

export { useToast } from './api';
export { default as ToastContainer } from './components/ToastContainer.vue';
export * from './types';
export { withProps } from './util';
export { clearToasts, createToast };

export default {
  install: (app: App) => {
    app.config.globalProperties.$mfkToast = createToast;
    app.provide('mfkToast', createToast);
  },
};
