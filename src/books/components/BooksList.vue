<script setup lang="ts">
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

const checkFilter = (book: Book): boolean => {
  const searchString = `${book.name} ${book.publisher} ${book.subject} ${book.description} ${book.ISBN}`;
  return searchString.toLowerCase().includes(props.filterText.toLowerCase());
};
</script>

<template>
  <ul class="books-list">
    <template v-for="book in props.books">
      <BooksItem
        v-if="checkFilter(book)"
        :key="book.id"
        v-bind="book"
        :text-to-highlight="props.filterText.toLowerCase()"
      />
    </template>
  </ul>
</template>

<style scoped>
.books-list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
