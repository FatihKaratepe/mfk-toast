import { computed, type ComputedRef } from 'vue';
import type { AnimationType, Position } from '../types';

type TransitionMap = { [pos in Position]: { [type in AnimationType]: string } };

const TRANSITION_MAP: TransitionMap = {
  'top-left': {
    bounce: 'mfk__bounceInLeft',
    zoom: 'mfk__zoomIn',
    slide: 'mfk__slideInLeft',
    fade: 'mfk__fadeIn',
  },
  'top-right': {
    bounce: 'mfk__bounceInRight',
    zoom: 'mfk__zoomIn',
    slide: 'mfk__slideInRight',
    fade: 'mfk__fadeIn',
  },
  'top-center': {
    bounce: 'mfk__bounceInDown',
    zoom: 'mfk__zoomIn',
    slide: 'mfk__slideInDown',
    fade: 'mfk__fadeIn',
  },
  'bottom-center': {
    bounce: 'mfk__bounceInUp',
    zoom: 'mfk__zoomIn',
    slide: 'mfk__slideInUp',
    fade: 'mfk__fadeIn',
  },
  'bottom-right': {
    bounce: 'mfk__bounceInRight',
    zoom: 'mfk__zoomIn',
    slide: 'mfk__slideInRight',
    fade: 'mfk__fadeIn',
  },
  'bottom-left': {
    bounce: 'mfk__bounceInLeft',
    zoom: 'mfk__zoomIn',
    slide: 'mfk__slideInLeft',
    fade: 'mfk__fadeIn',
  },
};

const useTransitionType = (position: Position, transition: AnimationType): { transitionType: ComputedRef<string> } => {
  const transitionType = computed(() => {
    return TRANSITION_MAP[position][transition];
  });

  return { transitionType };
};

export default useTransitionType;
