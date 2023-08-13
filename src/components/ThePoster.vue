<script setup lang="ts">
import AltImage from "./AltImage.vue";

defineProps<{
  poster: string;
}>();
</script>

<template>
  <div
    v-if="poster !== 'N/A'"
    class="img-wrapper"
    :style="{
      backgroundImage: `url(${poster})`,
    }">
    <slot></slot>
  </div>
  <AltImage
    v-else
    class="img-wrapper">
    <slot></slot>
  </AltImage>
</template>

<style scoped lang="scss">
.img-wrapper {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 10px 10px 0 0;
  border: 1px solid #ccc;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.04);
  }
}
</style>
