<template>
  <div :class="['sidebar-container', { 'sidebar-open': isOpen }]">
    <div :class="['sidebar', { 'sidebar-open': isOpen }]">
      <div class="sidebar-header">
        <h2 class="logo text-primary font-['Pacifico']">{{ isOpen ? 'Dashboard' : 'DA' }}</h2>
      </div>

      <nav class="sidebar-nav">
        <div v-for="(item, index) in sidebarItems" :key="index" class="nav-item">
          <div
            :class="{ active: route.name === item.routeName }"
            class="nav-link"
            @click="() => router.push({ name: item.routeName })"
          >
            <i :class="['nav-icon', item.icon]" />
            <span :class="['nav-text', { 'nav-show': !isOpen }]">{{ item.title }}</span>
          </div>
        </div>
      </nav>
      <button :class="['sidebar-button']" @click="toggleSidebar">
        <i :class="['ri-arrow-right-wide-line ri-xl toggle-button', { rotated: isOpen }]" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sidebarItems } from '~/composables'

const route = useRoute()
const router = useRouter()
const isOpen = ref(true)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.sidebar-container {
  position: relative;
  width: 80px;
}

.sidebar {
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  border-radius: 10px 0 0 10px;
  height: 100vh;
  background-color: var(--color-avocado-100);
  color: var(--color-avocado-600);
  transition: all 0.3s ease;
  width: 80px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.sidebar-open {
  width: 250px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 0.4rem;
  border-bottom: 1px solid var(--color-avocado-600);
  margin: 0 0.8rem;
}

.logo {
  font-size: 1.8rem;
  margin: 0;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.1s ease;
}

.sidebar-open .logo {
  opacity: 1;
  font-size: 1.8rem;
}

.sidebar-nav {
  padding: 1rem 0;
  flex: 1;
}

.nav-item {
  position: relative;
}

.nav-link {
  margin: 4px 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  color: var(--color-avocado-600);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: var(--color-gray-300);
}

.nav-link.active {
  background-color: var(--color-avocado-300);
}

.nav-icon {
  font-size: 1.2rem;
  min-width: 30px;
}

.nav-text {
  margin-left: 0.5rem;
  white-space: nowrap;
}

.submenu-arrow {
  margin-left: auto;
  font-size: 0.8rem;
}

.submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: #2c2c2c;
}

.submenu-open {
  max-height: 500px;
}

.submenu-item {
  display: block;
  padding: 0.8rem 1rem 0.8rem 3.5rem;
  color: var(--color-avocado-600);
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.nav-show {
  display: none;
}

.submenu-item:hover {
  background-color: #8a8a8a;
}

.sidebar-button {
  border-radius: 4px;
  color: var(--color-avocado-200);
  background-color: var(--color-avocado-600);
  padding: 0.3rem 0.2rem;
  position: absolute;
  left: -12px;
  bottom: 10%;
  cursor: pointer;
}

.toggle-button {
  font-size: 1.5rem;
  padding: 0.2rem 0.1rem;
  transition: transform 0.4s ease;
  display: inline-block;
}

.rotated {
  transform: rotate(180deg);
}

@media (max-width: 640px) {
  .sidebar {
    //transform: translateX(+100%);
    //display: none;
    height: 70px;
    width: 100%;
    bottom: 0;
    top: initial;
  }

  .sidebar-container {
    width: 0;
  }

  .sidebar-header {
    display: none;
  }

  .nav-link:hover {
    background-color: transparent;
  }

  .nav-link {
    flex-direction: column;
    font-size: small;
    padding: 0;
    width: 56px;
    margin: 0;
  }

  .nav-link.active {
    background-color: transparent;
    color: var(--color-avocado-500);
  }

  .sidebar-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0 1rem;
  }

  .sidebar-button {
    display: none;
  }

  .sidebar-open {
    //width: 0;
  }

  .nav-show {
    display: initial;
  }

  .logo {
    opacity: 1;
  }
}
</style>
