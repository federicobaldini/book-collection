<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import BooksItem from "./BooksItem.vue";

type Book = {
  id: number;
  name: string;
  description: string;
  publisher: string;
  subject: string;
  ISBN: string;
  imagePath: string;
};

const props = defineProps<{
  books: Array<Book>;
  filterText: string;
}>();

const filters: Ref<Array<string>> = ref(props.filterText.split(";"));

const checkFilter = (book: Book): boolean => {
  const searchString = `${book.name} Publisher: ${book.publisher} Subject: ${book.subject} ${book.description} ${book.ISBN}`;
  let found: boolean = true;

  if (props.filterText !== "") {
    filters.value.forEach((filter) => {
      if (!searchString.toLowerCase().includes(filter)) {
        found = false;
      }
    });
  }
  return found;
};

watch([(): string => props.filterText], ([newFilterText]): void => {
  filters.value = newFilterText.toLowerCase().split(";");
});
</script>

<template>
  <ul class="books-list">
    <template v-for="book in props.books">
      <BooksItem
        v-if="filters ? checkFilter(book) : true"
        :key="book.id"
        v-bind="book"
        :texts-to-highlight="filters"
      />
    </template>
  </ul>
</template>

<style scoped>
.books-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
