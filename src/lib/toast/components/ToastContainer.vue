<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const containerRef = ref<HTMLDivElement>();

onMounted(() => {
  if (containerRef.value) {
    window.__MFK_TOAST_CONTAINER__ = containerRef.value;
  }
});

onBeforeUnmount(() => {
  delete window.__MFK_TOAST_CONTAINER__;
});
</script>

<template>
  <div ref="containerRef" class="mfk__toast-container"></div>
</template>
