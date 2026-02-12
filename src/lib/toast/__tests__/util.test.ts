import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { createVNode } from 'vue';
import { debounce, withProps } from '../util';

// Mock Vue's createVNode
jest.mock('vue', () => ({
  createVNode: jest.fn(),
}));

describe('Utility Functions', () => {
  describe('withProps', () => {
    it('should call createVNode with component and props', () => {
      const mockComponent = { name: 'TestComponent' };
      const mockProps = { foo: 'bar', baz: 123 };
      const mockVNode = { type: mockComponent, props: mockProps };

      (createVNode as any).mockReturnValue(mockVNode);

      const result = withProps(mockComponent as any, mockProps);

      expect(createVNode).toHaveBeenCalled();
      expect(result).toBe(mockVNode);
    });

    it('should pass empty props object correctly', () => {
      const mockComponent = { name: 'TestComponent' };
      const emptyProps = {};

      (createVNode as any).mockReturnValue({});

      withProps(mockComponent as any, emptyProps);

      expect(createVNode).toHaveBeenCalled();
    });

    it('should handle complex props objects', () => {
      const mockComponent = { name: 'TestComponent' };
      const complexProps = {
        nested: { value: 'test' },
        array: [1, 2, 3],
        func: () => {},
        bool: true,
      };

      (createVNode as any).mockReturnValue({});

      withProps(mockComponent as any, complexProps);

      expect(createVNode).toHaveBeenCalled();
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution by default delay (300ms)', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn);

      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(299);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should delay function execution by custom delay', () => {
      const mockFn = jest.fn();
      const customDelay = 500;
      const debouncedFn = debounce(mockFn, customDelay);

      debouncedFn();

      jest.advanceTimersByTime(499);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous call when called again within delay', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn();
      jest.advanceTimersByTime(200);

      debouncedFn(); // Second call should cancel the first
      jest.advanceTimersByTime(200);

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the debounced function', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn('arg1', 'arg2', 123);

      jest.advanceTimersByTime(300);

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    it('should handle multiple rapid calls correctly', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn('call1');
      jest.advanceTimersByTime(100);

      debouncedFn('call2');
      jest.advanceTimersByTime(100);

      debouncedFn('call3');
      jest.advanceTimersByTime(100);

      debouncedFn('call4');

      // At this point, no calls should have been made
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);

      // Only the last call should execute
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call4');
    });

    it('should allow function to be called multiple times after delay', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn('first');
      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(1);

      debouncedFn('second');
      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledTimes(2);

      expect(mockFn).toHaveBeenNthCalledWith(1, 'first');
      expect(mockFn).toHaveBeenNthCalledWith(2, 'second');
    });
  });
});
