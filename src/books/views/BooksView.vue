<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import BooksList from "../components/BooksList.vue";
import SearchBar from "../../shared/components/search/SearchBar.vue";

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

const books: Ref<Array<Book>> = ref([]);
let filterText: Ref<string> = ref("");

const onChangeFilterHandler = (inputText: string): void => {
  filterText.value = inputText;
};

onMounted(async () => {
  const response = await fetch("/book-collection/data/books.json");
  const bookList: Array<Book> = await response.json();
  books.value = bookList.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });
});
</script>

<template>
  <div class="books">
    <SearchBar @onChangeInputText="onChangeFilterHandler" />
    <!--
    <p class="books__searchbar-guide">
      For multiple search separate the words with ";"<br />
      Example: search by publisher and subject: "dover;math"
    </p>
    -->
    <BooksList :books="books" :filterText="filterText" />
  </div>
</template>

<style scoped>
.books {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.books__searchbar-guide {
  font-size: 14px;
  text-align: center;
  background: #3b3b3b;
  color: #bcbcbc;
  padding: 1rem;
  border: 2px solid #888888;
  border-radius: 10px;
  margin: 0 1rem;
}
</style>
