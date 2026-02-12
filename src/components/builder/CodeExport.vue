<template>
  <div class="card">
    <div class="card-header">Code Export</div>
    <div class="p-4 bg-slate-900 dark:bg-black m-4 rounded-xl">
      <pre class="text-[13px] leading-relaxed text-slate-200 font-mono wrap-break-word whitespace-pre-wrap">{{ codeSnippet }}</pre>
    </div>
    <div class="px-4 pb-4">
      <button
        @click="$emit('copy')"
        class="btn-secondary flex items-center justify-center gap-2 w-full md:w-fit py-2.5 text-xs border border-slate-200 dark:border-slate-600"
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
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
        Copy to Clipboard
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  codeSnippet: string;
}>();

defineEmits<{
  (e: 'copy'): void;
}>();
</script>
