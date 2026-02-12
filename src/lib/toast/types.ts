import type { VNode } from 'vue';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type Position = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

export type AnimationType = 'bounce' | 'zoom' | 'slide' | 'fade';

export interface NotificationOptions {
  title: string;
  message: string;
  type?: NotificationType;
  duration?: number;
  position?: Position;
  backgroundColor?: string;
  textColor?: string;
  showIcon?: boolean;
  customIcon?: string;
  showCloseButton?: boolean;
  animation?: AnimationType;
  showProgressBar?: boolean;
  progressBarColor?: string;
  pauseOnHover?: boolean;
  container?: string;
}

export interface NotificationConfig {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  duration: number;
  position: Position;
  backgroundColor: string;
  textColor: string;
  showIcon: boolean;
  customIcon: string;
  showCloseButton: boolean;
  animation: AnimationType;
  showProgressBar: boolean;
  progressBarColor: string;
  pauseOnHover: boolean;
  container: string;
}

export interface ActiveNotification extends NotificationConfig {
  createdAt: number;
}

export interface ToastObject {
  toastVNode: VNode;
  container: HTMLDivElement;
}
