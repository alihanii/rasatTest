<template>
  <div class="main-container">
    <ImageSwiper class="w-full" :slides="slides"/>
  </div>
</template>

<script setup lang="ts">
import ImageSwiper from "~/components/ImageSwiper.vue";

const slides = [
  {
    src: "https://picsum.photos/1200/400?random=2",
    routeName: "posts",
    text: {
      label: "add your new post",
      title: "posts", description: 'Lorem ipsum is placeholder text commonly used in the graphic, print,'
    }

  },
  {
    src: "https://picsum.photos/1200/400?random=3",
    routeName: "posts-new",
    text: {
      label: "see all the posts",
      title: "new posts",
      description: 'Lorem ipsum is placeholder text commonly used in the graphic, print,'
    }

  },
  {
    src: "https://picsum.photos/1200/400?random=4",
    routeName: "analytics",
    text: {
      label: "analyse the posts",
      title: "analytics", description: 'Lorem ipsum is placeholder text commonly used in the graphic, print,'
    }
  }
];
</script>

<style scoped>

.title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-avocado-600);
  font-size: 2.5rem;
}
</style>
