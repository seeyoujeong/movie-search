<template>
  <button class="the-btn">
    <span class="material-symbols-outlined">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
.the-btn {
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
