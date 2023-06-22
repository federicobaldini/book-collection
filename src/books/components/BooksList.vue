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
  author: string;
  ISBN: string;
  imagePath: string;
};

const props = defineProps<{
  books: Array<Book>;
  filterText: string;
}>();

const filteredBooks: Ref<Array<Book>> = ref([]);
const filters: Ref<Array<string>> = ref(props.filterText.split(";"));

const checkFilter = (book: Book): boolean => {
  const searchString = `${book.name} Publisher: ${book.publisher} Subject: ${book.subject} Author: ${book.author} ${book.description} ${book.ISBN}`;
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

const doesNotContainWords = (
  inputString: string,
  wordList: Array<string>
): boolean => {
  // Constructing the regular expression pattern
  const pattern = new RegExp(wordList.join("|"), "i");

  // Checking if the inputString does not match the pattern
  return !pattern.test(inputString);
};

watch([(): string => props.filterText], ([newFilterText]): void => {
  filters.value = newFilterText.toLowerCase().split(";");
  if (newFilterText !== "") {
    filteredBooks.value = [...props.books].filter((book) => checkFilter(book));
  } else {
    filteredBooks.value = props.books;
  }
});

watch([(): Array<Book> => props.books], ([newBooks]): void => {
  if (newBooks && newBooks.length > 0) {
    filteredBooks.value = props.books;
  }
});
</script>

<template>
  <ul class="books-list">
    <template v-for="book in filteredBooks" :key="book.id">
      <BooksItem
        v-if="
          !doesNotContainWords(book.subject, [
            'Mathematics',
            'Physics',
            'Science',
            'Biology',
            'Microelectronics',
            'Astrophysics',
            'Chemistry',
          ])
        "
        v-bind="book"
        :texts-to-highlight="filters"
      />
    </template>
  </ul>
</template>

<style scoped>
.books-list {
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
</style>
