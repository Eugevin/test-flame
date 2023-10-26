<script setup lang="ts">
import { useStore } from 'vuex'
import Table from '../components/Table.vue'

const store = useStore()
</script>

<template>
  <div class="favorites">
    <div class="container">
      <transition mode="out-in">
        <h1 v-if="store.state.favorites.size === 0">
          No actual favorites 😿
        </h1>
        <div v-else>
          <Table
            :data="[...store.state.favorites.values()]"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
