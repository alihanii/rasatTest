<template>
  <div class="main-container">
    <ImageSwiper :slides="slides"/>
  </div>
</template>

<script setup lang="ts">
import ImageSwiper from "~/components/ImageSwiper.vue";

const slides = [
  {
    src: "https://picsum.photos/1200/400?random=2",
    label: "add your new post",
    routeName: "posts",
  },
  {
    src: "https://picsum.photos/1200/400?random=3",
    label: "see all the posts",
    routeName: "posts-new",
  },
  {
    src: "https://picsum.photos/1200/400?random=4",
    label: "analyse the posts", routeName: "analytics",

  }
];
</script>

<style scoped>
.main-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-avocado-600);
  font-size: 2.5rem;
}

.content-section {
  margin-top: 3rem;
  padding: 2rem;
  background-color: var(--color-avocado-50);
  border-radius: 8px;
}

.content-section h2 {
  color: var(--color-avocado-600);
  margin-bottom: 1rem;
}

.content-section p {
  color: var(--color-avocado-800);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .main-container {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .content-section {
    padding: 1.5rem;
  }
}
</style>
