import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { useToast } from '../api';
import * as createToastModule from '../createToast';

// Mock the createToast module
jest.mock('../createToast');

describe('useToast API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useToast hook', () => {
    it('should return an object with all required methods', () => {
      const toast = useToast();

      expect(toast).toHaveProperty('open');
      expect(toast).toHaveProperty('clear');
      expect(toast).toHaveProperty('success');
      expect(toast).toHaveProperty('error');
      expect(toast).toHaveProperty('info');
      expect(toast).toHaveProperty('warning');

      expect(typeof toast.open).toBe('function');
      expect(typeof toast.clear).toBe('function');
      expect(typeof toast.success).toBe('function');
      expect(typeof toast.error).toBe('function');
      expect(typeof toast.info).toBe('function');
      expect(typeof toast.warning).toBe('function');
    });
  });

  describe('open method', () => {
    it('should call createToast with correct options', () => {
      const mockCreateToast = jest.spyOn(createToastModule, 'createToast').mockReturnValue({ close: jest.fn() });
      const toast = useToast();
      const options = {
        title: 'Test Title',
        message: 'Test Message',
        type: 'success' as const,
      };

      toast.open(options);

      expect(mockCreateToast).toHaveBeenCalledWith(options);
      expect(mockCreateToast).toHaveBeenCalledTimes(1);
    });

    it('should return value from createToast', () => {
      const mockClose = jest.fn();
      const mockReturn = { close: mockClose };
      jest.spyOn(createToastModule, 'createToast').mockReturnValue(mockReturn);

      const toast = useToast();
      const result = toast.open({ title: 'Test', message: 'Test' });

      expect(result).toBe(mockReturn);
    });
  });

  describe('clear method', () => {
    it('should call clearToasts', () => {
      const mockClearToasts = jest.spyOn(createToastModule, 'clearToasts').mockImplementation(() => {});
      const toast = useToast();

      toast.clear();

      expect(mockClearToasts).toHaveBeenCalledTimes(1);
    });
  });

  describe('success method', () => {
    it('should call createToast with type "success"', () => {
      const mockCreateToast = jest.spyOn(createToastModule, 'createToast').mockReturnValue({ close: jest.fn() });
      const toast = useToast();

      toast.success('Success Title', 'Success Message');

      expect(mockCreateToast).toHaveBeenCalledWith({
        title: 'Success Title',
        message: 'Success Message',
        type: 'success',
      });
    });

    it('should merge additional options correctly', () => {
      const mockCreateToast = jest.spyOn(createToastModule, 'createToast').mockReturnValue({ close: jest.fn() });
      const toast = useToast();

      toast.success('Title', 'Message', { duration: 3000, position: 'top-left' });

      expect(mockCreateToast).toHaveBeenCalledWith({
        title: 'Title',
        message: 'Message',
        type: 'success',
        duration: 3000,
        position: 'top-left',
      });
    });
  });

  describe('error method', () => {
    it('should call createToast with type "error"', () => {
      const mockCreateToast = jest.spyOn(createToastModule, 'createToast').mockReturnValue({ close: jest.fn() });
      const toast = useToast();

      toast.error('Error Title', 'Error Message');

      expect(mockCreateToast).toHaveBeenCalledWith({
        title: 'Error Title',
        message: 'Error Message',
        type: 'error',
      });
    });
  });

  describe('info method', () => {
    it('should call createToast with type "info"', () => {
      const mockCreateToast = jest.spyOn(createToastModule, 'createToast').mockReturnValue({ close: jest.fn() });
      const toast = useToast();

      toast.info('Info Title', 'Info Message');

      expect(mockCreateToast).toHaveBeenCalledWith({
        title: 'Info Title',
        message: 'Info Message',
        type: 'info',
      });
    });
  });

  describe('warning method', () => {
    it('should call createToast with type "warning"', () => {
      const mockCreateToast = jest.spyOn(createToastModule, 'createToast').mockReturnValue({ close: jest.fn() });
      const toast = useToast();

      toast.warning('Warning Title', 'Warning Message');

      expect(mockCreateToast).toHaveBeenCalledWith({
        title: 'Warning Title',
        message: 'Warning Message',
        type: 'warning',
      });
    });
  });

  describe('type methods with custom options', () => {
    it('should support all notification types with custom options', () => {
      const mockCreateToast = jest.spyOn(createToastModule, 'createToast').mockReturnValue({ close: jest.fn() });
      const toast = useToast();
      const customOptions = { duration: 2000, showIcon: false };

      toast.success('Title', 'Message', customOptions);
      toast.error('Title', 'Message', customOptions);
      toast.info('Title', 'Message', customOptions);
      toast.warning('Title', 'Message', customOptions);

      expect(mockCreateToast).toHaveBeenCalledTimes(4);

      // Verify each call had the custom options
      const calls = (mockCreateToast as any).mock.calls;
      calls.forEach((call: any) => {
        expect(call[0]).toMatchObject(customOptions);
      });
    });
  });
});
