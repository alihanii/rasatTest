<template>
  <transition name="modal-fade">
    <div v-if="visible" class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <header class="modal-header">
          <slot name="header">
            <h3>Default Title</h3>
          </slot>
          <button class="close-btn" @click="close">×</button>
        </header>
        <section class="modal-body">
          <slot name="body" />
        </section>
        <footer class="modal-footer">
          <slot name="footer"> </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

interface props {
  visible: boolean
}

defineProps<props>()
const emit = defineEmits<{ (e: 'update:visible', visible: boolean): void }>()

function close() {
  emit('update:visible', false)
}
</script>

<style scoped>
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(1);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease; /* 900ms duration */
}

.modal-backdrop {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 6px;
  max-width: 500px;
  width: 90%;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  margin-top: 1rem;
}

.modal-footer {
  margin-top: 1rem;
  text-align: right;
}

@media (max-width: 640px) {
  .modal-content {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
