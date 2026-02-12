<script setup lang="ts">
import { computed } from 'vue';
import type { NotificationType } from '../types';

interface Props {
  type?: NotificationType;
  textColor?: string;
  customIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  customIcon: '',
});

const processedCustomIcon = computed(() => {
  if (!props.customIcon) return '';
  
  const color = props.textColor || '#fff';
  let svg = props.customIcon;
  
  svg = svg.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
  svg = svg.replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`);
  
  if (!svg.includes('stroke=')) {
    svg = svg.replace(/<svg([^>]*)>/, `<svg$1 stroke="${color}">`);
  }
  
  return svg;
});
</script>

<template>
  <span class="mfk__icon">
    <span v-if="customIcon" v-html="processedCustomIcon"></span>
    <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" :stroke="textColor || '#fff'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" :stroke="textColor || '#fff'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    <svg v-else-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" :stroke="textColor || '#fff'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" :stroke="textColor || '#fff'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  </span>
</template>
