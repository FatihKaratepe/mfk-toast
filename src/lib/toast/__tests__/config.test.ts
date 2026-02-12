import { describe, expect, it } from '@jest/globals';
import { DEFAULT_OPTIONS, TOAST_GAP } from '../config';

describe('Configuration Constants', () => {
  describe('TOAST_GAP', () => {
    it('should have the correct value', () => {
      expect(TOAST_GAP).toBe(12);
    });

    it('should be a number', () => {
      expect(typeof TOAST_GAP).toBe('number');
    });

    it('should be positive', () => {
      expect(TOAST_GAP).toBeGreaterThan(0);
    });
  });

  describe('DEFAULT_OPTIONS', () => {
    it('should have all required properties', () => {
      expect(DEFAULT_OPTIONS).toHaveProperty('type');
      expect(DEFAULT_OPTIONS).toHaveProperty('duration');
      expect(DEFAULT_OPTIONS).toHaveProperty('position');
      expect(DEFAULT_OPTIONS).toHaveProperty('backgroundColor');
      expect(DEFAULT_OPTIONS).toHaveProperty('textColor');
      expect(DEFAULT_OPTIONS).toHaveProperty('showCloseButton');
      expect(DEFAULT_OPTIONS).toHaveProperty('showIcon');
      expect(DEFAULT_OPTIONS).toHaveProperty('animation');
      expect(DEFAULT_OPTIONS).toHaveProperty('showProgressBar');
      expect(DEFAULT_OPTIONS).toHaveProperty('progressBarColor');
      expect(DEFAULT_OPTIONS).toHaveProperty('pauseOnHover');
      expect(DEFAULT_OPTIONS).toHaveProperty('container');
    });

    it('should have correct default type', () => {
      expect(DEFAULT_OPTIONS.type).toBe('info');
    });

    it('should have correct default duration', () => {
      expect(DEFAULT_OPTIONS.duration).toBe(3000);
      expect(typeof DEFAULT_OPTIONS.duration).toBe('number');
      expect(DEFAULT_OPTIONS.duration).toBeGreaterThan(0);
    });

    it('should have correct default position', () => {
      expect(DEFAULT_OPTIONS.position).toBe('top-right');
    });

    it('should have correct default animation', () => {
      expect(DEFAULT_OPTIONS.animation).toBe('bounce');
    });

    it('should have showCloseButton enabled by default', () => {
      expect(DEFAULT_OPTIONS.showCloseButton).toBe(true);
    });

    it('should have showIcon enabled by default', () => {
      expect(DEFAULT_OPTIONS.showIcon).toBe(true);
    });

    it('should have showProgressBar enabled by default', () => {
      expect(DEFAULT_OPTIONS.showProgressBar).toBe(true);
    });

    it('should have pauseOnHover enabled by default', () => {
      expect(DEFAULT_OPTIONS.pauseOnHover).toBe(true);
    });

    it('should have empty backgroundColor by default', () => {
      expect(DEFAULT_OPTIONS.backgroundColor).toBe('');
    });

    it('should have empty textColor by default', () => {
      expect(DEFAULT_OPTIONS.textColor).toBe('');
    });

    it('should have empty progressBarColor by default', () => {
      expect(DEFAULT_OPTIONS.progressBarColor).toBe('');
    });

    it('should have empty container by default', () => {
      expect(DEFAULT_OPTIONS.container).toBe('');
    });

    it('should have valid notification type', () => {
      const validTypes = ['success', 'error', 'warning', 'info'];
      expect(validTypes).toContain(DEFAULT_OPTIONS.type);
    });

    it('should have valid position', () => {
      const validPositions = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'];
      expect(validPositions).toContain(DEFAULT_OPTIONS.position);
    });

    it('should have valid animation type', () => {
      const validAnimations = ['bounce', 'zoom', 'slide', 'fade'];
      expect(validAnimations).toContain(DEFAULT_OPTIONS.animation);
    });
  });
});
