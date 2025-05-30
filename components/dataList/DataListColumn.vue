<script setup lang="ts">
interface props {
  width?: string | number
  sticky?: boolean
}

withDefaults(defineProps<props>(), {
  sticky: false,
})
</script>

<template>
  <div
    :style="{
      position: sticky ? 'sticky' : '',
      left: 0,
      flex:
        width === 'full' || width === '1' || width === 1
          ? '1'
          : typeof width === 'number'
            ? `0 0 ${width}px`
            : `0 0 ${width}`,
      overflow: 'hidden',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
    }"
  >
    <slot v-if="$slots.header" name="header" />
    <slot v-else />
  </div>
</template>
