import { describe, expect, it, jest } from '@jest/globals';
import { DEFAULT_OPTIONS, TOAST_GAP } from '../config';
import { initializeOptions, moveToastsOnAdd, setupVNodeProps } from '../createToast';
import type { NotificationOptions, Position, ToastObject } from '../types';

describe('createToast Functions', () => {
  describe('initializeOptions', () => {
    it('should merge user options with default options', () => {
      const userOptions: NotificationOptions = {
        title: 'Test Title',
        message: 'Test Message',
        type: 'success',
      };
      const id = 'test-id-123';

      const result = initializeOptions(userOptions, id);

      expect(result).toMatchObject({
        id,
        title: 'Test Title',
        message: 'Test Message',
        type: 'success',
        duration: DEFAULT_OPTIONS.duration,
        position: DEFAULT_OPTIONS.position,
        showCloseButton: DEFAULT_OPTIONS.showCloseButton,
        showIcon: DEFAULT_OPTIONS.showIcon,
        animation: DEFAULT_OPTIONS.animation,
      });
    });

    it('should handle all optional parameters', () => {
      const fullOptions: NotificationOptions = {
        title: 'Title',
        message: 'Message',
        type: 'error',
        duration: 3000,
        position: 'bottom-left',
        backgroundColor: '#ff0000',
        textColor: '#ffffff',
        showIcon: false,
        showCloseButton: false,
        animation: 'slide',
        showProgressBar: false,
        progressBarColor: '#00ff00',
        pauseOnHover: false,
        container: '#custom-container',
        customIcon: '',
      };
      const id = 'test-id';

      const result = initializeOptions(fullOptions, id);

      expect(result).toEqual({
        ...fullOptions,
        id,
      });
    });

    it('should use default values when options are undefined', () => {
      const minimalOptions: NotificationOptions = {
        title: 'Title',
        message: 'Message',
      };
      const id = 'test-id';

      const result = initializeOptions(minimalOptions, id);

      expect(result.type).toBe(DEFAULT_OPTIONS.type);
      expect(result.duration).toBe(DEFAULT_OPTIONS.duration);
      expect(result.position).toBe(DEFAULT_OPTIONS.position);
      expect(result.showIcon).toBe(DEFAULT_OPTIONS.showIcon);
      expect(result.animation).toBe(DEFAULT_OPTIONS.animation);
    });

    it('should disable progress bar when duration is 0', () => {
      const options: NotificationOptions = {
        title: 'Title',
        message: 'Message',
        duration: 0,
      };
      const id = 'test-id';

      const result = initializeOptions(options, id);

      expect(result.showProgressBar).toBe(false);
    });

    it('should disable progress bar when duration is negative', () => {
      const options: NotificationOptions = {
        title: 'Title',
        message: 'Message',
        duration: -1,
      };
      const id = 'test-id';

      const result = initializeOptions(options, id);

      expect(result.showProgressBar).toBe(false);
    });

    it('should respect explicit showProgressBar when duration is positive', () => {
      const options: NotificationOptions = {
        title: 'Title',
        message: 'Message',
        duration: 5000,
        showProgressBar: false,
      };
      const id = 'test-id';

      const result = initializeOptions(options, id);

      expect(result.showProgressBar).toBe(false);
    });

    it('should use default showProgressBar when not specified and duration is positive', () => {
      const options: NotificationOptions = {
        title: 'Title',
        message: 'Message',
        duration: 5000,
      };
      const id = 'test-id';

      const result = initializeOptions(options, id);

      expect(result.showProgressBar).toBe(DEFAULT_OPTIONS.showProgressBar);
    });
  });

  describe('setupVNodeProps', () => {
    it('should create correct props structure', () => {
      const config = {
        id: 'original-id',
        title: 'Title',
        message: 'Message',
        type: 'info' as const,
        duration: 5000,
        position: 'top-right' as Position,
        backgroundColor: '',
        textColor: '',
        showIcon: true,
        showCloseButton: true,
        animation: 'bounce' as const,
        showProgressBar: true,
        progressBarColor: '',
        pauseOnHover: true,
        container: '',
        customIcon: '',
      };
      const id = 'new-id';
      const offset = 100;
      const closeFn = jest.fn();

      const result = setupVNodeProps(config, id, offset, closeFn);

      expect(result).toMatchObject({
        ...config,
        id,
        offset,
        visible: false,
      });
      expect(result.onCloseHandler).toBeDefined();
    });

    it('should create onCloseHandler that calls close function with correct params', () => {
      const config = {
        id: 'test-id',
        title: 'Title',
        message: 'Message',
        type: 'success' as const,
        duration: 5000,
        position: 'bottom-center' as Position,
        backgroundColor: '',
        textColor: '',
        showIcon: true,
        showCloseButton: true,
        animation: 'fade' as const,
        showProgressBar: true,
        progressBarColor: '',
        pauseOnHover: true,
        container: '',
        customIcon: '',
      };
      const id = 'handler-test-id';
      const offset = 50;
      const closeFn = jest.fn();

      const result = setupVNodeProps(config, id, offset, closeFn);

      result.onCloseHandler();

      expect(closeFn).toHaveBeenCalledWith(id, config.position);
      expect(closeFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('moveToastsOnAdd', () => {
    it('should return initial gap when no toasts exist', () => {
      const config = {
        id: 'test-id',
        title: 'Title',
        message: 'Message',
        type: 'info' as const,
        duration: 5000,
        position: 'top-right' as Position,
        backgroundColor: '',
        textColor: '',
        showIcon: true,
        showCloseButton: true,
        animation: 'bounce' as const,
        showProgressBar: true,
        progressBarColor: '',
        pauseOnHover: true,
        container: '',
        customIcon: '',
      };
      const emptyToasts: Record<Position, ToastObject[]> = {
        'top-left': [],
        'top-right': [],
        'bottom-left': [],
        'bottom-right': [],
        'top-center': [],
        'bottom-center': [],
      };

      const result = moveToastsOnAdd(config, emptyToasts, TOAST_GAP);

      expect(result).toBe(TOAST_GAP);
    });

    it('should calculate offset based on existing toasts', () => {
      const config = {
        id: 'test-id',
        title: 'Title',
        message: 'Message',
        type: 'info' as const,
        duration: 5000,
        position: 'top-right' as Position,
        backgroundColor: '',
        textColor: '',
        showIcon: true,
        showCloseButton: true,
        animation: 'bounce' as const,
        showProgressBar: true,
        progressBarColor: '',
        pauseOnHover: true,
        container: '',
        customIcon: '',
      };

      const mockVNode1 = {
        el: { offsetHeight: 80 } as HTMLElement,
      } as any;

      const mockVNode2 = {
        el: { offsetHeight: 100 } as HTMLElement,
      } as any;

      const toasts: Record<Position, ToastObject[]> = {
        'top-left': [],
        'top-right': [
          { toastVNode: mockVNode1, container: document.createElement('div') },
          { toastVNode: mockVNode2, container: document.createElement('div') },
        ],
        'bottom-left': [],
        'bottom-right': [],
        'top-center': [],
        'bottom-center': [],
      };

      const result = moveToastsOnAdd(config, toasts, TOAST_GAP);

      // TOAST_GAP + (80 + TOAST_GAP) + (100 + TOAST_GAP)
      const expected = TOAST_GAP + (80 + TOAST_GAP) + (100 + TOAST_GAP);
      expect(result).toBe(expected);
    });
  });
});
