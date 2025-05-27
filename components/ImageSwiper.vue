<template>
  <div class="swiper-container">
    <div class="swiper-wrapper" :style="wrapperStyle">
      <div
          v-for="(slide, index) in slides"
          :key="index"
          class="swiper-slide"
          :class="{ active: currentIndex === index }"
      >
        <Loader v-if="loadingStates[index]"/>
        <img
            class="!object-cover"
            :src="slide.src"
            :alt="slide.label"
            @load="loadingStates[index] = false"
        >

        <div class="slide-text"
        >
          <h6 class="text-3xl font-bold mb-2">{{ slide.text.title }}</h6>
          <span class="text-xl ">{{ slide.text.description }}</span>
        </div>

        <button
            class="slide-label"
            @click="router.push({ name: slide.routeName })"
        >
          {{ slide.text.label }}
        </button>
      </div>
    </div>

    <button class="nav-button prev" @click="prevSlide">
      <span>❮</span>
    </button>
    <button class="nav-button next" @click="nextSlide">
      <span>❯</span>
    </button>

    <div class="dots-container">
      <span
          v-for="(_, index) in slides"
          :key="index"
          :class="['dot', { active: currentIndex === index }]"
          @click="goToSlide(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from "vue";
import {useRouter} from "vue-router";
import type {Component} from "vue";
import LoaderComponent from "./Loader.vue";

const Loader = LoaderComponent as Component;

interface Slide {
  src: string;
  text: { label: string, title: string, description: string };
  routeName: string;
}

const props = withDefaults(
    defineProps<{
      slides: Slide[];
      autoScrollInterval?: number;
    }>(),
    {
      autoScrollInterval: 5000,
    }
);

const router = useRouter();
const currentIndex = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const loadingStates = ref(props.slides.map(() => true));

const wrapperStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
}));

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length;
  resetAutoScroll();
};

const prevSlide = () => {
  currentIndex.value =
      currentIndex.value === 0 ? props.slides.length - 1 : currentIndex.value - 1;
  resetAutoScroll();
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
  resetAutoScroll();
};

const startAutoScroll = () => {
  timer = setInterval(() => {
    nextSlide();
  }, props.autoScrollInterval);
};

const resetAutoScroll = () => {
  if (timer) {
    clearInterval(timer);
  }
  startAutoScroll();
};

onMounted(() => {
  startAutoScroll();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.swiper-container {
  border-radius: 16px;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.swiper-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.swiper-slide {
  flex: 0 0 100%;
  position: relative;
}

.swiper-slide img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.slide-label {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-avocado-200);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.slide-text {
  background: var(--color-op-avocado-600);
  color: var(--color-avocado-200);
  position: absolute;
  top: 5%;
  left: 20px;
  padding: 8px 16px;
  border-radius: 4px;

}

.slide-label:hover {
  transform: scale(1.05);
  background: rgba(0, 0, 0, 0.8);

}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-avocado-600);
  border: none;
  padding: 16px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button.prev {
  left: 10px;
}

.nav-button.next {
  right: 10px;
}

.dots-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-avocado-300);
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background: var(--color-avocado-500);
}

@media (max-width: 768px) {
  .swiper-slide img {
    height: 300px;
  }

  .nav-button {
    width: 40px;
    height: 40px;
    padding: 12px;
    font-size: 1.2rem;
  }

  .slide-label {
    font-size: 1rem;
    padding: 6px 12px;
  }

  .dots-container {
    left: 85%;
  }
}
</style>
