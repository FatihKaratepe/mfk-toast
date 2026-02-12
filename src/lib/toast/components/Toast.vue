<script setup lang="ts">
import { onMounted, ref, watchEffect, type CSSProperties } from 'vue';
import useCustomStyle from '../hooks/useCustomStyle';
import useScreenSize from '../hooks/useScreenSize';
import useTimer from '../hooks/useTimer';
import useTransitionType from '../hooks/useTransitionType';
import type { AnimationType, NotificationType, Position } from '../types';
import ToastIcon from './ToastIcon.vue';

interface Props {
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
  createdAt: number;
  visible?: boolean;
  onCloseHandler: () => void;
  offset: number;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
});

const style = ref<CSSProperties>();

const { width } = useScreenSize();

const { transitionType } = useTransitionType(props.position, props.animation);

const { start, stop, progress } = useTimer(
  () => {
    props.onCloseHandler();
  },
  props.duration,
  props.createdAt,
);

const startTimer = () => {
  if (props.duration > 0) {
    start();
  }
};

const onMouseEnter = () => {
  if (props.pauseOnHover && props.duration > 0 && width.value > 425) {
    stop();
  }
};

const onMouseLeave = () => {
  startTimer();
};

watchEffect(() => {
  const { customStyle } = useCustomStyle(props.position, props.offset, props.backgroundColor, props.textColor);
  style.value = customStyle.value;
});

onMounted(() => {
  startTimer();
});
</script>

<template>
  <transition :name="transitionType" type="animation">
    <div
      v-if="visible"
      class="mfk__toast"
      :style="style"
      :class="backgroundColor ? null : type"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="mfk__toast__content-wrapper">
        <ToastIcon v-if="showIcon" :type="type" :text-color="textColor" :custom-icon="customIcon" />
        <div class="mfk__toast__content">
          <div class="mfk__toast__content__title" :style="{ color: textColor }">{{ title }}</div>
          <div class="mfk__toast__content__message" :style="{ color: textColor }">
            {{ message }}
          </div>
        </div>
      </div>
      <div v-if="showCloseButton" class="mfk__toast__close-icon" @click="onCloseHandler"></div>
      <div
        v-if="showProgressBar"
        class="mfk__toast__progress"
        :style="{ width: `${progress}%`, backgroundColor: progressBarColor }"
      ></div>
    </div>
  </transition>
</template>
