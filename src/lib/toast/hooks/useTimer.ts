import { onMounted, onUnmounted, ref, type Ref } from 'vue';

const useTimer = (
  callback: () => void | string,
  delay: number,
  createdAt?: number,
): {
  start: () => void;
  stop: () => void;
  clear: () => void;
  progress: Ref<number>;
} => {
  const timerId = ref<ReturnType<typeof setTimeout>>();
  const startTime = ref<number>(0);

  const calculateInitialRemainingTime = () => {
    if (createdAt && delay > 0) {
      const elapsed = Date.now() - createdAt;
      const remaining = Math.max(0, delay - elapsed);
      return remaining;
    }
    return delay;
  };

  const remainingTime = ref<number>(calculateInitialRemainingTime());
  const intervalId = ref<ReturnType<typeof setInterval>>();

  const calculateInitialProgress = () => {
    if (createdAt && delay > 0) {
      const elapsed = Date.now() - createdAt;
      const progressPercent = Math.max(0, 100 - (elapsed / delay) * 100);
      return Math.round(progressPercent);
    }
    return 100;
  };

  const progress = ref(calculateInitialProgress());

  const stop = () => {
    clearInterval(intervalId.value);
    clearTimeout(timerId.value);
    remainingTime.value -= Date.now() - startTime.value;
  };

  const start = () => {
    startTime.value = Date.now();
    clearTimeout(timerId.value);

    const progressInterval = remainingTime.value > 0 ? remainingTime.value / progress.value : 10;

    intervalId.value = setInterval(() => {
      if (progress.value > 0) {
        progress.value--;
      }
    }, progressInterval);

    timerId.value = setTimeout(callback, remainingTime.value);
  };

  const clear = () => {
    clearInterval(intervalId.value);
    clearTimeout(timerId.value);
  };

  onMounted(() => {
    if (delay <= 0) return;
  });

  onUnmounted(() => {
    clear();
  });

  return { start, stop, clear, progress };
};

export default useTimer;
