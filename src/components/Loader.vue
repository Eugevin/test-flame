<script setup lang="ts">
</script>

<template>
  <div class="loader" />
</template>

<style scoped lang="scss">
.loader {
  margin: 0 auto;
  height: 5rem;
  width: 5rem;
  border-radius: 100%;
  border: 2px solid var(--accent-color);
  position: relative;
  animation: loaderAnimation 1s linear infinite;

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    height: 50%;
    width: 50%;
    background: #ffffff;
  }
}

@keyframes loaderAnimation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
