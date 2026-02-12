<script setup lang="ts">
interface Props {
  isOpen: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'modal-close'): void;
}>();
</script>

<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-9998 bg-black/50 dark:bg-black/70"
    @click.self="emit('modal-close')"
  >
    <div class="flex items-start justify-center min-h-screen pt-32 px-4">
      <div 
        class="w-full max-w-lg bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 mx-auto"
        @click.stop
      >
        <div class="mb-4 text-slate-800 dark:text-slate-100">
          <slot name="header">default header</slot>
        </div>
        <div class="mb-6 text-slate-600 dark:text-slate-300">
          <slot name="content">default content</slot>
        </div>
        <div class="flex">
          <slot name="footer">
            <button 
              class="btn btn-secondary" 
              @click.stop="emit('modal-close')"
            >
              Submit
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
