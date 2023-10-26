<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ApiRoutes } from '../helpers/staticValues.ts'
import debounce from '../helpers/debounce'

const router = useRouter()

const isLoading = ref<boolean>(false)

const searchRef = ref<string>('')
const searchData = ref<Array<{ name: string, url: string }>>([])

let controller: AbortController | null = null

async function getUsers(name: string) {
  try {
    if (controller) controller.abort()
    controller = new AbortController()

    isLoading.value = true

    const res = await fetch(ApiRoutes.search + name, { signal: controller.signal })
    const data = await res.json()

    isLoading.value = false

    return data.results
  } catch (err) {
    console.error(err)
    return []
  }
}

const inputHandler = debounce(async () => {
  searchData.value = []
  const data = await getUsers(searchRef.value)

  if (Array.isArray(data) && data.length > 0) {
    searchData.value = data.map(el => {
      return {
        name: el.name,
        url: el.url
      }
    })
  }
})

onBeforeUnmount(() => {
  if (controller) controller.abort()
})
</script>

<template>
  <div :class="{ search: true, search_active: isLoading }">
    <input
      v-model="searchRef"
      type="text"
      @input="inputHandler"
    >
    <ul
      v-if="searchData.length > 0"
      class="search__content"
    >
      <li
        v-for="user in searchData"
        :key="user.name"
        @click="router.push(`/peoples/${user.url.split('/')[5]}`)"
      >
        <span><b>{{ user.name }}</b></span>
        <br>
        <span><em>{{ user.url }}</em></span>
        <hr>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.search {
  position: relative;

  &__content {
    z-index: 1;
    list-style: none;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    padding: 1rem 1rem 0 1rem;
    background: #ffffff;
    filter: drop-shadow(0 0 5rem #00000040);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);

    &:hover {
      opacity: 1;
      visibility: visible;
    }

    li {
      opacity: 0.8;
      cursor: pointer;
      transition: inherit;

      &:hover {
        opacity: 1;
      }

      &:last-of-type hr {
        display: none;
      }
    }
  }

  &::before {
    content: "";
    position: absolute;
    right: 0.5rem;
    top: 0.9rem;
    height: 2rem;
    width: 2rem;
    border: 1px solid #9b4dca;
    opacity: 0;
    visibility: hidden;
    animation: loaderAnimation 1s linear infinite;
    transition: var(--transition);
  }

  &_active::before {
    visibility: visible;
    opacity: 1;
  }

  input:focus {
    +.search__content {
      opacity: 1;
      visibility: visible;
    }
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
