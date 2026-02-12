<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    duration?: number;
  }>(),
  {
    duration: 400,
  },
);

const emit = defineEmits(['update:modelValue', 'change']);
const isDark = ref(false);
const buttonRef = ref<HTMLButtonElement | null>(null);
const STORAGE_KEY = 'theme';

const updateTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark');
  emit('update:modelValue', isDark.value);
};

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored ? stored === 'dark' : prefersDark;

  isDark.value = initial;
  document.documentElement.classList.toggle('dark', initial);
  localStorage.setItem(STORAGE_KEY, initial ? 'dark' : 'light');
  emit('update:modelValue', initial);

  const observer = new MutationObserver(updateTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
});

const toggleTheme = async () => {
  if (!buttonRef.value) return;
  const target = buttonRef.value;

  if (!document.startViewTransition) {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
    emit('change', isDark.value);
    return;
  }

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
    emit('change', isDark.value);
    await nextTick();
  });

  await transition.ready;

  if (target) {
    const { top, left, width, height } = target.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top));

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: props.duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  }
};
</script>

<template>
  <button
    ref="buttonRef"
    @click="toggleTheme"
    class="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
  >
    <div class="w-6 h-6 flex items-center justify-center">
      <svg
        v-if="isDark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5 text-yellow-500"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5 text-slate-700"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </div>
    <span class="sr-only">Toggle theme</span>
  </button>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 99999;
}
</style>
