<template>
  <div class="loader-wrapper">
    <div class="the-loader"></div>
  </div>
</template>

<style scoped lang="scss">
.loader-wrapper {
  height: calc(100vh - 90px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.the-loader {
  width: 50px;
  height: 50px;
  border: 3px solid;
  border-top-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: spinning 1s infinite linear;
}
@keyframes spinning {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
