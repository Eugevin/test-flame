<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const marks = ref<Array<string>>([
  'Yes, i can add loader icon to search, but not really want to do it. So many time wasted on responsive table in /peoples/:id, so fuck it.',
  'VueX is not perfect on Vue3 (especially in the area of type descriptions if we compare with Pinia), but in task i saw that it required. And... store is not typed 🥲',
  'Its all, wish you less code, more think and a nice day :)'
])
</script>

<template>
  <div class="index">
    <div class="container">
      <h1 class="index__title">
        🤠 Hola, traveler!
      </h1>
      <h4 class="index__subtitle">
        You can travel on this two routes. Which one will you choose?
      </h4>
      <p>
        *API is slow as 💩, so... wait, bruh
      </p>
      <div class="index__routes">
        <button @click="router.push('/peoples')">
          /peoples
        </button>
        <button @click="router.push('/favorites')">
          /favorites
        </button>
      </div>
      <hr>
      <h3>Some marks:</h3>
      <ol class="index__marks">
        <li
          v-for="mark in marks"
          :key="mark"
        >
          {{ mark }}
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index {

  &__title,
  &__subtitle,
  p {
    text-align: center;
  }

  &__routes {
    margin: 2rem 0 5rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
