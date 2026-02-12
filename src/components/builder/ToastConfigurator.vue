<template>
  <div class="card">
    <div class="card-header">Configuration</div>

    <form class="p-6" @submit.prevent="$emit('show')">
      <div class="mb-6">
        <label class="form-label-small">Type</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="item in types"
            :key="item"
            type="button"
            @click="form.type = item"
            class="btn-type relative"
            :class="[
              form.type === item
                ? item === 'success'
                  ? 'bg-green-500 border-green-600 text-white shadow-lg shadow-green-500/20'
                  : item === 'error'
                    ? 'bg-red-500 border-red-600 text-white shadow-lg shadow-red-500/20'
                    : item === 'warning'
                      ? 'bg-orange-500 border-orange-600 text-white shadow-lg shadow-orange-500/20'
                      : 'bg-blue-500 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600',
            ]"
          >
            <svg
              v-if="item === 'success'"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="form.type !== 'success' && 'text-green-500'"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <svg
              v-else-if="item === 'error'"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="form.type !== 'error' && 'text-red-500'"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <svg
              v-else-if="item === 'warning'"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="form.type !== 'warning' && 'text-orange-500'"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <svg
              v-else="item === 'info'"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="form.type !== 'info' && 'text-blue-500'"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>

            <span class="text-xs font-semibold capitalize">{{ item }}</span>
            
            <!-- Counter Badge -->
            <span 
              v-if="typeCounts[item] > 0"
              class="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full text-[10px] font-bold"
              :class="[
                item === 'success'
                  ? 'bg-green-600 text-white'
                  : item === 'error'
                    ? 'bg-red-600 text-white'
                    : item === 'warning'
                      ? 'bg-orange-600 text-white'
                      : 'bg-blue-600 text-white'
              ]"
            >
              {{ typeCounts[item] }}
            </span>
          </button>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label"> Title </label>
        <input type="text" class="form-input" v-model.trim="form.title" placeholder="Success!" />
      </div>

      <div class="mb-6">
        <label class="form-label"> Message </label>
        <textarea
          required
          class="form-textarea"
          v-model.trim="form.message"
          name="message"
          placeholder="Your changes have been saved successfully."
        ></textarea>
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <label class="form-label mb-0"> Duration </label>
          <span v-if="!isPersistent" class="text-sm font-semibold text-slate-800 dark:text-slate-200"
            >{{ (form.duration ?? 3000) / 1000 }}s</span
          >
        </div>

        <div class="flex flex-col gap-3">
          <input
            type="range"
            class="form-range"
            min="1000"
            step="1000"
            max="10000"
            v-model.number="form.duration"
            :disabled="isPersistent"
          />
          <label class="form-label-checkbox">
            <input
              :checked="isPersistent"
              @change="$emit('update:isPersistent', ($event.target as HTMLInputElement).checked)"
              type="checkbox"
              class="checkbox-custom"
            />
            <span>Persistent (no auto-dismiss)</span>
          </label>
        </div>
      </div>

      <div class="mb-8">
        <label class="form-label-small">Position</label>
        <div class="grid grid-cols-3 gap-2 w-full md:w-3/5">
          <button
            v-for="item in positions"
            :key="item"
            type="button"
            @click="form.position = item"
            class="btn-toggle text-[11px] font-bold w-full"
            :class="[form.position === item ? 'btn-toggle-active' : 'btn-toggle-inactive']"
          >
            {{ posAbbreviations[item] }}
          </button>
        </div>
      </div>

      <div class="mb-6">
        <label class="form-label text-slate-800 dark:text-slate-200 mb-4">Style</label>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label-small">Background</label>
            <div class="flex items-center gap-2">
              <div class="relative shrink-0">
                <div
                  class="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                  :style="{
                    backgroundColor:
                      form.backgroundColor ||
                      (form.type === 'success'
                        ? '#22c55e'
                        : form.type === 'error'
                          ? '#ef4444'
                          : form.type === 'warning'
                            ? '#f59e0b'
                            : '#3b82f6'),
                  }"
                ></div>
                <input
                  type="color"
                  class="absolute inset-0 opacity-0 cursor-pointer w-10 h-10"
                  v-model="form.backgroundColor"
                />
              </div>
              <div class="relative flex-1">
                <input type="text" class="form-input-mono" v-model="form.backgroundColor" placeholder="#22c55e" />
                <button
                  v-if="form.backgroundColor"
                  type="button"
                  class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  @click="form.backgroundColor = undefined"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label class="form-label-small">Text Color</label>
            <div class="flex items-center gap-2">
              <div class="relative shrink-0">
                <div
                  class="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                  :style="{ backgroundColor: form.textColor || '#FFFFFF' }"
                ></div>
                <input
                  type="color"
                  class="absolute inset-0 opacity-0 cursor-pointer w-10 h-10"
                  v-model="form.textColor"
                />
              </div>
              <div class="relative flex-1">
                <input type="text" class="form-input-mono" v-model="form.textColor" placeholder="#FFFFFF" />
                <button
                  v-if="form.textColor"
                  type="button"
                  class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  @click="form.textColor = undefined"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <label class="form-label-small">Options</label>
        <div class="flex gap-6">
          <label class="form-label-checkbox-large">
            <input v-model="form.showIcon" type="checkbox" class="checkbox-custom" />
            <span>Show Icon</span>
          </label>
          <label class="form-label-checkbox-large">
            <input v-model="form.showCloseButton" type="checkbox" class="checkbox-custom" />
            <span>Show Close Button</span>
          </label>
          <label class="form-label-checkbox-large">
            <input v-model="form.pauseOnHover" type="checkbox" class="checkbox-custom" />
            <span>Pause on Hover</span>
          </label>
          <label class="form-label-checkbox-large">
            <input v-model="form.showProgressBar" type="checkbox" class="checkbox-custom" />
            <span>Show Progress Bar</span>
          </label>
        </div>
      </div>

      <div v-if="form.showProgressBar" class="mb-6">
        <label class="form-label-small">Progress Bar Color</label>
        <div class="flex items-center gap-2">
          <div class="relative shrink-0">
            <div
              class="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
              :style="{
                backgroundColor:
                  form.progressBarColor ||
                  (form.type === 'success'
                    ? '#22c55e'
                    : form.type === 'error'
                      ? '#ef4444'
                      : form.type === 'warning'
                        ? '#f59e0b'
                        : '#3b82f6'),
              }"
            ></div>
            <input
              type="color"
              class="absolute inset-0 opacity-0 cursor-pointer w-10 h-10"
              v-model="form.progressBarColor"
            />
          </div>
          <div class="relative flex-1">
            <input type="text" class="form-input-mono" v-model="form.progressBarColor" placeholder="#FFFFFF" />
            <button
              v-if="form.progressBarColor"
              type="button"
              @click="form.progressBarColor = undefined"
              class="p-2 text-slate-400 hover:text-slate-600 absolute right-2 top-1/2 -translate-y-1/2 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label-small">Animation</label>
        <div class="grid grid-cols-3 md:grid-cols-4 gap-2">
          <button
            v-for="anim in allAnimations"
            :key="anim"
            type="button"
            @click="form.animation = anim"
            class="btn-toggle text-[10px] md:text-[11px] font-medium w-full capitalize"
            :class="[form.animation === anim ? 'btn-toggle-active' : 'btn-toggle-inactive']"
          >
            {{ anim.replace('-', ' ') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { AnimationType, NotificationOptions, NotificationType, Position } from '@/lib/toast';
import { reactive } from 'vue';

defineProps<{
  form: NotificationOptions;
  isPersistent: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:isPersistent', value: boolean): void;
  (e: 'show'): void;
}>();

const types: NotificationType[] = ['success', 'error', 'warning', 'info'];
const positions: Position[] = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];

const posAbbreviations: Record<string, string> = {
  'top-left': 'TL',
  'top-center': 'TC',
  'top-right': 'TR',
  'bottom-left': 'BL',
  'bottom-center': 'BC',
  'bottom-right': 'BR',
};

const allAnimations: AnimationType[] = ['fade', 'bounce', 'slide', 'zoom'];

// Toast type counters
const typeCounts = reactive<Record<NotificationType, number>>({
  success: 0,
  error: 0,
  warning: 0,
  info: 0,
});

// Increment counter for a specific type
const incrementCount = (type: NotificationType) => {
  typeCounts[type]++;
};

// Expose method so parent can increment counts
defineExpose({
  incrementCount,
  typeCounts,
});
</script>
