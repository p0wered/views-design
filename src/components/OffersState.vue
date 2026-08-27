<script setup lang="ts">
import { CircleAlert, LoaderCircle, RefreshCw } from 'lucide-vue-next';

defineProps<{
  loading: boolean
  error: string
}>();

defineEmits<{
  retry: []
}>();
</script>

<template>
  <div v-if="loading" class="flex min-h-80 items-center justify-center"
       aria-live="polite">
    <LoaderCircle class="h-9 w-9 animate-spin text-current" aria-hidden="true" />
    <span class="sr-only">Загрузка предложений</span>
  </div>

  <div
    v-else-if="error"
    class="mx-auto flex min-h-80 max-w-lg flex-col items-center justify-center gap-4 text-center"
  >
    <CircleAlert class="h-10 w-10 text-current" aria-hidden="true" />
    <p class="text-base text-slate-600">{{ error }}</p>
    <button
      class="inline-flex min-h-11 items-center gap-2 rounded-xl border border-current px-5 font-semibold"
      @click="$emit('retry')"
    >
      <RefreshCw class="h-4 w-4" aria-hidden="true" />
      Повторить
    </button>
  </div>

  <slot v-else />
</template>
