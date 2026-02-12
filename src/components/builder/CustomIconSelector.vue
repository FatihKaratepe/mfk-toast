<template>
  <div class="card mt-3">
    <div class="card-header">Custom Icons</div>
    <div class="p-6">
      <div class="grid grid-cols-4 gap-3">
        <button
          v-for="type in ['info', 'success', 'warning', 'error']"
          :key="type"
          @click="$emit('openIconModal', type as any)"
          class="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">{{ type }}</span>
            <span v-if="customIcons[type]" class="text-xs text-green-600 dark:text-green-400">✓ Custom</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  customIcons: Record<string, string>;
}

defineProps<Props>();

defineEmits<{
  (e: 'openIconModal', type: 'info' | 'success' | 'warning' | 'error'): void;
}>();
</script>
