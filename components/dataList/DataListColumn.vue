<script setup lang="ts">
defineProps({
  width: {type: [String, Number], default: 'auto'},
});
</script>

<template>
  <div
      :style="{
      flex: typeof width === 'number' ? `0 0 ${width}px` : `0 0 ${width}`,
      overflow: 'hidden',
      padding: '0 10px',
      boxSizing: 'border-box',
    }"
  >
    <slot v-if="$slots.header" name="header"/>
    <slot v-else/>
  </div>
</template>
