<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useStore } from 'vuex'
import Table from '../components/Table.vue'
import Search from '../components/SearchPeople.vue'
import Loader from '../components/Loader.vue'
import Pagination from '../components/Pagination.vue'

const store = useStore()

const currentPage = ref<number>(1)

function pageHandler(value: number) {
  store.commit('setUsers', null)

  currentPage.value = value

  store.dispatch('fetchUsers', value)
}

onBeforeMount(() => {
  store.dispatch('fetchUsers')
})

onBeforeUnmount(() => {
  store.commit('setUsers', null)
  store.dispatch('abortFetchUsers')
})
</script>

<template>
  <div class="peoples">
    <div class="container">
      <Search />
      <transition mode="out-in">
        <Loader v-if="!store.state.users" />
        <div v-else>
          <Table
            :data="store.state.users"
          />
          <Pagination
            :total-numbers="Math.ceil(store.state.totalUsers / 10)"
            :current-number="currentPage"
            @change-page="pageHandler"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
