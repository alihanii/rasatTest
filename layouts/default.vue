<template>
  <div class="app-container">
    <SidebarMenu/>
    <main class="main-content">
      <HeaderMenu/>
      <slot/>
    </main>
  </div>
</template>
<script setup>
</script>
<style>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
