<template>
  <div class="card mb-4">
    <div class="card-header">Saved Presets</div>

    <div class="p-4 space-y-3 max-h-100 overflow-y-auto">
      <div v-if="presets.length === 0" class="text-center text-slate-400 py-8 text-sm">No saved presets.</div>
      <div v-for="preset in presets" :key="preset.id" class="preset-item">
        <div
          class="h-2.5 w-2.5 rounded-full shrink-0"
          :class="[
            preset.config.type === 'success' && 'bg-green-500',
            preset.config.type === 'error' && 'bg-red-500',
            preset.config.type === 'warning' && 'bg-orange-500',
            preset.config.type === 'info' && 'bg-blue-500',
          ]"
        ></div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{{ preset.name }}</div>
          <div class="text-[11px] font-medium text-slate-400">
            {{ preset.config.duration === 0 ? 'Persistent' : (preset.config.duration ?? 3000) / 1000 + 's' }} •
            <span class="capitalize">{{ (preset.config.position ?? 'top-right').replace('-', ' ') }}</span>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="$emit('load', preset)"
            type="button"
            class="btn-secondary px-3 py-1.5 text-xs font-bold rounded-lg"
          >
            Load
          </button>
          <button
            @click="$emit('delete', preset)"
            type="button"
            class="btn-secondary px-3 py-1.5 text-xs font-bold rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div class="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="Preset name..."
          v-model.trim="newPresetName"
          @keyup.enter="savePreset"
          class="preset-input"
        />
        <button @click="savePreset" class="btn-primary px-5 text-sm">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/lib/toast';
import { type Preset } from '@/types';
import { ref } from 'vue';

defineProps<{
  presets: Preset[];
}>();

const emit = defineEmits<{
  (e: 'load', preset: Preset): void;
  (e: 'delete', preset: Preset): void;
  (e: 'save', name: string): void;
}>();

const newPresetName = ref('');
const toast = useToast();

const savePreset = () => {
  if (!newPresetName.value) {
    toast.error('Error', 'Preset name is required', { container: 'body' });
    return;
  }
  emit('save', newPresetName.value);
  newPresetName.value = '';
};
</script>
