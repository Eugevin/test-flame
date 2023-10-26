<script setup lang="ts">
defineProps<{
  totalNumbers: number,
  currentNumber: number
}>()

const emit = defineEmits<{
  changePage: [value: number]
}>()
</script>

<template>
  <div class="pagination">
    <div
      v-for="number in totalNumbers"
      :key="number"
      :class="['pagination__item', { pagination__item_active: currentNumber === number }]"
      @click="emit('changePage', number)"
    >
      {{ number }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 1rem;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    width: 4rem;
    cursor: pointer;
    background: #eeeeee;
    opacity: 0.5;
    transition: var(--transition);

    &:hover {
      opacity: 0.75;
    }

    &_active {
      opacity: 1;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
