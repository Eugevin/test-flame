<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()

function favoritesHandler(value: UserProperties) {
  store.commit('setFavorite', value)
}

defineProps<{
  data: Array<UserProperties>,
  full?: boolean
}>()

</script>

<template>
  <table :class="{ table: true, table_full: full }">
    <thead>
      <tr>
        <th
          v-for="head in Object.keys(data[0])"
          :key="head"
        >
          {{ head }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in data"
        :key="user.name"
      >
        <td
          v-for="(property, i) in user"
          :key="i"
        >
          <div v-if="i === 'favorite'">
            <label>
              <input
                type="checkbox"
                :checked="user.favorite"
                @change="favoritesHandler(user)"
              >
              <span />
            </label>
          </div>
          <div v-else>
            {{ property }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.table {
  &_full {
    width: 100%;
    overflow: auto;
    display: block;
  }

  th {
    text-transform: capitalize;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 0;

    input {
      display: none;
    }

    span {
      position: relative;
      display: inline-block;
      height: 2rem;
      width: 2rem;
      border-radius: 100%;
      border: 2px solid var(--accent-color);

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 50%;
        width: 50%;
        background: var(--accent-color);
        border-radius: 100%;
        opacity: 0;
        will-change: opacity;
        transition: var(--transition);
      }
    }

    input:checked+span::before {
      opacity: 1;
    }
  }
}
</style>
