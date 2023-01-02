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
  const filters: Array<string> = props.filterText.split(";");
  const searchString = `${book.name} Publisher: ${book.publisher} Subject: ${book.subject} ${book.description} ${book.ISBN}`;

  if (props.filterText !== "") {
    filters.every((filter) => {
      if (!searchString.toLowerCase().includes(filter.toLowerCase())) {
        return false;
      }
    });
  }
  return true;
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
