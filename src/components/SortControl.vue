<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
import type { SortType } from '@/types';

defineProps<{
  modelValue: SortType
  variant?: 'plain' | 'outlined'
}>();

const emit = defineEmits<{
  'update:modelValue': [value: SortType]
}>();
</script>

<template>
  <label class="relative inline-flex min-h-11 items-center">
    <span class="sr-only">Сортировка предложений</span>
    <select
      :value="modelValue"
      class="min-h-11 appearance-none bg-transparent py-2 pl-3 pr-10 text-sm font-medium outline-none
        focus-visible:ring-2 focus-visible:ring-current"
      :class="variant === 'outlined' ? 'rounded-xl border border-slate-200 bg-white' : 'rounded-lg'"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value as SortType)"
    >
      <option value="default">По умолчанию</option>
      <option value="amount">Сначала по сумме</option>
      <option value="term">Сначала по сроку</option>
    </select>
    <ChevronDown class="pointer-events-none absolute right-3 h-4 w-4" aria-hidden="true" />
  </label>
</template>
