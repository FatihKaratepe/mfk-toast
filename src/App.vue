<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <nav class="bg-white dark:bg-slate-800 shadow-sm mb-3">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-lg font-semibold text-slate-800 dark:text-slate-100">Toast Notification Builder</span>

        <ul class="flex items-center gap-4">
          <li>
            <ThemeToggler @change="(val) => (isDark = val)" />
          </li>
          <li>
            <a
              class="nav-link"
              href="https://github.com/fatihkaratepe/mfk-toast"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <main class="px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-6 mb-3">
          <ToastConfigurator :form="form" v-model:isPersistent="isPersistent" @show="show" />
            <CustomIconSelector :customIcons="customIcons" @openIconModal="openIconModal" />
        </div>


        <aside class="lg:col-span-6 mb-3">
          <ToastPreview @show="show" @clearAll="clearAll" />

          <SavedPresets :presets="presets" @load="loadPreset" @delete="deletePreset" @save="savePreset" />

          <CodeExport :codeSnippet="codeSnippet" @copy="copyToClipboard" />
        </aside>
      </div>
    </main>

    <Modal :isOpen="isIconModalOpen" @modal-close="isIconModalOpen = false">
      <template #header>
        <h3 class="text-lg font-semibold">Custom Icon for {{ currentIconType }}</h3>
      </template>
      <template #content>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">SVG Icon Code</label>
            <textarea
              v-model="tempIconValue"
              rows="6"
              class="form-textarea"
              placeholder='<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">...</svg>'
            ></textarea>
          </div>
          <div v-if="tempIconValue" class="p-4 bg-gray-100 dark:bg-slate-700 rounded-md">
            <p class="text-sm font-medium mb-2 text-slate-800 dark:text-slate-100">Preview:</p>
            <div v-html="tempIconValue"></div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-1 gap-2 justify-between">
          <div class="flex flex-1 gap-2">
            <button @click="isIconModalOpen = false" class="btn btn-secondary px-4">Cancel</button>
            <button @click="clearCustomIcon" class="btn btn-secondary px-4">Clear</button>
          </div>
          <button @click="saveCustomIcon" class="btn btn-primary px-4">Save Icon</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { CodeExport, CustomIconSelector, SavedPresets, ThemeToggler, ToastConfigurator, ToastPreview,Modal } from '@/components';
import { useToast, type AnimationType, type NotificationOptions } from '@/lib/toast';

import { type Preset } from '@/types';
import { computed, onMounted, reactive, ref, watch } from 'vue';
const toast = useToast();
const isDark = ref(false);
const isPersistent = ref(false);

const isIconModalOpen = ref(false);
const customIcons = reactive<Record<string, string>>({
  info: '',
  success: '',
  warning: '',
  error: '',
});
const currentIconType = ref<'info' | 'success' | 'warning' | 'error'>('info');
const tempIconValue = ref('');

const openIconModal = (type: 'info' | 'success' | 'warning' | 'error') => {
  currentIconType.value = type;
  tempIconValue.value = customIcons[type] || '';
  isIconModalOpen.value = true;
};

const saveCustomIcon = () => {
  const trimmedValue = tempIconValue.value.trim();
  if (!trimmedValue) {
    toast.warning('Warning', 'Please enter an SVG icon', { container: 'body', position: 'bottom-right' });
    return;
  } 
  if (!trimmedValue.toLowerCase().includes('<svg')) {
    toast.error('Error', 'Invalid SVG: Must contain <svg> tag', { container: 'body', position: 'bottom-right' });
    return;
  }
  if (!trimmedValue.toLowerCase().includes('</svg>')) {
    toast.error('Error', 'Invalid SVG: Must have closing </svg> tag', { container: 'body', position: 'bottom-right' });
    return;
  }
  const svgTagMatch = trimmedValue.match(/<svg[^>]*>/i);
  if (!svgTagMatch) {
    toast.error('Error', 'Invalid SVG: Malformed <svg> tag', { container: 'body', position: 'bottom-right' });
    return;
  }
  
  customIcons[currentIconType.value] = trimmedValue;
  isIconModalOpen.value = false;
  toast.success('Success', `Custom icon for ${currentIconType.value} saved!`, { container: 'body', position: 'bottom-right' });
};

const clearCustomIcon = () => {
  customIcons[currentIconType.value] = '';
  tempIconValue.value = '';
  isIconModalOpen.value = false;
  toast.info('Info', `Custom icon for ${currentIconType.value} cleared!`, { container: 'body', position: 'bottom-right' });
};

watch(isPersistent, (val) => {
  if (val) form.duration = 0;
  else if (form.duration === 0) form.duration = 3000;
});

const form = reactive<NotificationOptions>({
  title: 'Success!',
  message: 'Your changes have been saved successfully.',
  type: 'success',
  duration: 3000,
  position: 'top-right',
  showProgressBar: true,
  progressBarColor: undefined,
  showIcon: true,
  showCloseButton: true,
  pauseOnHover: true,
  animation: 'fade' as AnimationType,
});

const presets = ref<Preset[]>([]);
const STORAGE_KEY = 'v-toast-presets';

const codeSnippet = computed(() => {
  const exportData = { ...form };
  if (customIcons[form.type || 'info']) {
    exportData.customIcon = customIcons[form.type || 'info'];
  }
  return `const notification = ${JSON.stringify(exportData, null, 2)}`;
});

const show = () => {
  const options = { ...form };
  if (customIcons[form.type || 'info']) {
    options.customIcon = customIcons[form.type || 'info'];
  }
  toast.open(options);
};

const clearAll = () => {
  toast.clear();
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(codeSnippet.value).then(() => {
    toast.success('Success', `Successfully coppied to clipboard!`, { container: 'body' });
  });
};

const savePreset = (name: string) => {
  if (!name) return;

  const newPreset: Preset = {
    id: Date.now().toString(),
    name: name,
    config: JSON.parse(JSON.stringify(form)),
    createdAt: new Date().toISOString(),
  };

  presets.value.push(newPreset);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets.value));
  toast.success('Success', `Preset "${newPreset.name}" saved!`, { container: 'body' });
};

const loadPreset = (preset: Preset) => {
  Object.assign(form, preset.config);
  isPersistent.value = form.duration === 0;
  toast.info('Info', `Loaded preset: ${preset.name}`, { container: 'body' });
};

const deletePreset = (preset: Preset) => {
  presets.value = presets.value.filter((p: Preset) => p.id !== preset.id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets.value));
  toast.info('Info', `Preset deleted: ${preset.name}`, { container: 'body' });
};

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      presets.value = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load presets', e);
    }
  }
});
</script>
