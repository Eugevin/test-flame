<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Header from './components/Header.vue'

const store = useStore()

onMounted(() => {
  restoreLocalData()

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('favorites', JSON.stringify([...store.state.favorites]))
  })
})

function restoreLocalData() {
  const allFavorites = localStorage.getItem('favorites') as string
  const parsedFavorites = JSON.parse(allFavorites)?.map((el: [string, UserProperties]) => el[1])

  if (Array.isArray(parsedFavorites) && parsedFavorites.length > 0) {
    parsedFavorites.forEach((el: string) => store.commit('setFavorite', el))
  }
}
</script>

<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
/* Default styles for Transition component */
.v-enter-active,
.v-leave-active {
  transition: opacity .3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
