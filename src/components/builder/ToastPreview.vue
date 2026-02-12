<template>
  <div class="card mb-4 min-h-100">
    <div class="card-header">Preview</div>
    <div class="p-4 bg-slate-50/50 dark:bg-slate-900/50 h-100 flex items-center justify-center relative">
      <ToastContainer />
    </div>
    <div class="p-4 border-t border-slate-100 dark:border-slate-700 flex gap-3">
      <button type="button" @click="$emit('show')" class="btn-primary flex-1">Show Notification</button>
      <button type="button" @click="$emit('clearAll')" class="btn-secondary">Hide All</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToastContainer } from '@/lib/toast';

defineEmits<{
  (e: 'show'): void;
  (e: 'clearAll'): void;
}>();
</script>
