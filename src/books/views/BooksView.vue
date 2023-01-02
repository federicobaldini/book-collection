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
  ISBN: string;
  imagePath: string;
};

const books: Ref<Array<Book>> = ref([]);
let filterText: Ref<string> = ref("");

const onChangeFilterHandler = (inputText: string): void => {
  filterText.value = inputText;
};

onMounted(async () => {
  const response = await fetch("/data/books.json");
  const file = await response.json();
  books.value = file;
});
</script>

<template>
  <div class="books">
    <SearchBar @onChangeInputText="onChangeFilterHandler" />
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
</style>
