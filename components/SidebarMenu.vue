<template>
  <div class="sidebar-container ">
    <div :class="['sidebar', { 'sidebar-open': isOpen }]">
      <div class="sidebar-header">
        <h2 class="logo  font-['Pacifico'] text-primary">{{ isOpen ? 'Dashboard' : 'DA' }}</h2>
      </div>

      <nav class="sidebar-nav">
        <div v-for="(item, index) in sidebarItems" :key="index" class="nav-item">
          <div
              :class="{ active: route.name === item.routeName }"
              class="nav-link"
              @click="() => router.push({ name: item.routeName })"
          >

            <i :class="['nav-icon' , item.icon]"/>
            <span v-show="isOpen" class="nav-text">{{ item.title }}</span>
          </div>
        </div>
      </nav>
      <button :class="['nav-link']" @click="toggleSidebar">
        <i :class="['ri-arrow-right-wide-line ri-xl toggle-button',{rotated : isOpen}]"/>
        <span v-show="isOpen">Close</span>
      </button>
    </div>

    <!-- Overlay for mobile -->
    <div v-if="isOpen" class="sidebar-overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { sidebarItems } from "~/composable";

const route = useRoute();
const router = useRouter();
const isOpen = ref(true);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.sidebar-container {

}

.sidebar {
  top: 0;
  left: 0;
  border-radius: 0 10px 10px 0;
  height: 100vh;
  background-color: var(--color-avocado-200);
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
  padding: .3rem 1rem;
  border-bottom: 1px solid #2c2c2c;
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

.toggle-button {
  font-size: 1.5rem;
  padding: 0.2rem;
  transition: transform 0.4s ease;
}

.rotated {
  transform: rotate(180deg);
}

.sidebar-nav {
  padding: 1rem 0;
  flex: 1
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
  background-color: var(--color-avocado-400);
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

.submenu-item:hover {
  background-color: #3c3c3c;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
}

/* Responsive styles */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(+100%);
    width: 250px;
  }

  .sidebar-container {
    width: 0;
  }

  .sidebar-open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
  }

  .logo {
    opacity: 1;
  }
}
</style>
