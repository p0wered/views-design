<script setup lang="ts">
import { ref } from 'vue';

withDefaults(defineProps<{
  logo: string
  name: string
  size?: 'sm' | 'md' | 'lg'
}>(), { size: 'md' });

const failed = ref(false);
</script>

<template>
  <span class="offer-logo" :class="`offer-logo--${size}`">
    <img
      v-if="logo && !failed"
      :src="logo"
      :alt="name"
      class="offer-logo__img"
      @error="failed = true"
    >
    <span v-else class="offer-logo__name">{{ name }}</span>
  </span>
</template>

<style scoped>
.offer-logo {
  display: inline-flex;
  max-width: 100%;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.offer-logo--sm {
  height: 2rem;
  max-width: 10rem;
}

.offer-logo--md {
  height: 2.75rem;
  max-width: 13.75rem;
}

.offer-logo--lg {
  height: 3.25rem;
  max-width: 16rem;
}

.offer-logo__img {
  display: block;
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  object-position: left center;
}

.offer-logo__name {
  overflow: hidden;
  padding: 0 0.25rem;
  text-align: center;
  font-size: 0.95em;
  font-weight: 700;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
