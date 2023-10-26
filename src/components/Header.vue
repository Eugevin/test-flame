<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="header">
    <button
      title="Go back"
      @click="router.push('/')"
    >
      ../
    </button>
  </div>
</template>

<style scoped lang="scss">
.header {
  margin-bottom: 5rem;
  background: #eeeeee;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
}
</style>
