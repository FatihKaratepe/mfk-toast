import { v4 as uuidv4 } from 'uuid';
import { createVNode, render } from 'vue';
import Toast from './components/Toast.vue';
import { DEFAULT_OPTIONS, TOAST_GAP } from './config';
import type { ActiveNotification, NotificationConfig, NotificationOptions, Position, ToastObject } from './types';

const toasts: Record<Position, ToastObject[]> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
  'top-center': [],
  'bottom-center': [],
};

export const createToast = (options: NotificationOptions): { close: () => void } => {
  const id = uuidv4();
  const initializedOptions = initializeOptions(options, id);

  const activeNotification: ActiveNotification = {
    ...initializedOptions,
    createdAt: Date.now(),
  };

  setupVNode(id, activeNotification);

  return {
    close: () => close(id, initializedOptions.position),
  };
};

export const setupVNode = (id: string, options: NotificationConfig): void => {
  setTimeout(() => {
    const verticalOffset = moveToastsOnAdd(options, toasts, TOAST_GAP);
    const container = document.createElement('div');
    let mountPoint: Element | null = null;

    if (options.container) {
      mountPoint = document.querySelector(options.container);
      if (!mountPoint) {
        console.warn(`Toast container "${options.container}" not found`);
      }
    }

    if (!mountPoint) {
      mountPoint = window.__MFK_TOAST_CONTAINER__ || null;
    }

    if (!mountPoint) {
      mountPoint = document.body;
    }

    mountPoint.appendChild(container);
    const toastVNode = createVNode(Toast, setupVNodeProps(options, id, verticalOffset, close));
    render(toastVNode, container);
    toasts[options.position].push({ toastVNode, container });
    if (toastVNode.component) {
      toastVNode.component.props.visible = true;
    }
  }, 1);
};

export const setupVNodeProps = (
  options: NotificationConfig,
  id: string,
  offset: number,
  closeFn: (id: string, position: Position) => void,
) => {
  return {
    ...options,
    id,
    offset,
    visible: false,
    onCloseHandler: () => {
      closeFn(id, options.position);
    },
  };
};

export const initializeOptions = (options: NotificationOptions, id: string): NotificationConfig => {
  const processedOptions: NotificationConfig = {
    ...DEFAULT_OPTIONS,
    ...options,
    id,
    type: options.type ?? DEFAULT_OPTIONS.type,
    title: options.title,
    message: options.message,
    duration: options.duration ?? DEFAULT_OPTIONS.duration,
    position: options.position ?? DEFAULT_OPTIONS.position,
    backgroundColor: options.backgroundColor ?? DEFAULT_OPTIONS.backgroundColor,
    textColor: options.textColor ?? DEFAULT_OPTIONS.textColor,
    showCloseButton: options.showCloseButton ?? DEFAULT_OPTIONS.showCloseButton,
    showProgressBar: options.showProgressBar ?? DEFAULT_OPTIONS.showProgressBar,
    showIcon: options.showIcon ?? DEFAULT_OPTIONS.showIcon,
    customIcon: options.customIcon ?? DEFAULT_OPTIONS.customIcon,
    animation: options.animation ?? DEFAULT_OPTIONS.animation,
    progressBarColor: options.progressBarColor ?? DEFAULT_OPTIONS.progressBarColor,
    pauseOnHover: options.pauseOnHover ?? DEFAULT_OPTIONS.pauseOnHover,
    container: options.container ?? DEFAULT_OPTIONS.container,
  };

  if (processedOptions.duration <= 0) {
    processedOptions.showProgressBar = false;
  } else if (options.showProgressBar !== undefined) {
    processedOptions.showProgressBar = options.showProgressBar;
  } else {
    processedOptions.showProgressBar = DEFAULT_OPTIONS.showProgressBar;
  }

  return processedOptions;
};

export const moveToastsOnAdd = (
  options: NotificationConfig,
  toasts: Record<Position, ToastObject[]>,
  toastGap: number,
): number => {
  let verticalOffset = toastGap;

  toasts[options.position].forEach(({ toastVNode }) => {
    const offsetHeight = (toastVNode.el as HTMLElement).offsetHeight + toastGap;
    verticalOffset += offsetHeight || 0;
  });
  return verticalOffset;
};

export const moveToastsOnClose = (index: number, toastArr: ToastObject[], position: Position, toastHeight: number) => {
  for (let i = index; i < toastArr.length; i++) {
    const { toastVNode } = toastArr[i] as ToastObject;

    if (!toastVNode.el) return;

    const verticalPos: string = position.split('-')[0] || 'top';
    const pos = parseInt(toastVNode.el.style[verticalPos], 10) - toastHeight - TOAST_GAP;

    if (!toastVNode.component) return;
    toastVNode.component.props.offset = pos;
  }
};

export const close = (id: string, position: Position): void => {
  const toastArr = toasts[position];

  const index = toastArr.findIndex(({ toastVNode }) => toastVNode.props && id === toastVNode.props.id);

  if (index === -1) return;
  const { container, toastVNode } = toastArr[index] as ToastObject;
  if (!toastVNode.el) return;
  const height = toastVNode.el.offsetHeight;

  toasts[position].splice(index, 1);
  moveToastsOnClose(index, toastArr, position, height);

  if (!toastVNode.component) return;
  toastVNode.component.props.visible = false;

  setTimeout(() => {
    render(null, container);
    if (container.parentElement) {
      container.parentElement.removeChild(container);
    }
  }, 1000);
};

export const clearToasts = (): void => {
  Object.entries(toasts).forEach(([key, val]) => {
    if (val.length > 0) {
      const ids = val.map((toast) => {
        return (toast.toastVNode.props as any).id;
      });
      ids.forEach((id) => {
        close(id, key as Position);
      });
    }
  });
};
