<script setup lang="ts">
import { onBeforeUnmount, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Table from '../components/Table.vue'
import Search from '../components/SearchPeople.vue'
import Loader from '../components/Loader.vue'
import { ApiRoutes } from '../helpers/staticValues.ts'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const userData = ref<Array<UserProperties>>([])

let controller: AbortController | null = null

async function getUserData(id: string) {
  try {
    if (controller) controller.abort()
    controller = new AbortController()

    const res = await fetch(ApiRoutes.id + id, { signal: controller.signal })
    const data = await res.json()

    data.favorite = store.state.favorites.has(data.name)

    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

watchEffect(async () => {
  const userID = route.params.id as string

  if (route.params.id) {
    userData.value = []

    const data = await getUserData(userID)
    if (data) userData.value.push(data)
  }
})

onBeforeUnmount(() => {
  if (controller) controller.abort()
})
</script>

<template>
  <div class="peoples">
    <div class="container">
      <Search />
      <transition mode="out-in">
        <Loader v-if="userData.length === 0" />
        <div v-else>
          <Table
            :data="userData"
            :full="true"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
