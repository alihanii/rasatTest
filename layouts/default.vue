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
<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: .5rem 1rem;
    margin-bottom: 80px;

  }
}
</style>
