<script setup lang="ts">
import { type Ref, ref } from "vue";

const emit = defineEmits<{
  (event: "onChangeInputText", value: string): void;
}>();
const inputText: Ref<string> = ref("");

const inputHandler = (text: string) => {
  inputText.value = text;
  emit("onChangeInputText", text);
};

const clearInputHandler = () => {
  inputText.value = "";
  emit("onChangeInputText", "");
};
</script>

<template>
  <div class="searchbar">
    <div class="searchbar__input-container">
      <input
        type="text"
        placeholder="What are you looking for?"
        class="searchbar__input"
        :value="inputText"
        @input="(event) => inputHandler((event.target as HTMLInputElement).value)"
      />
      <span class="searchbar__clear-input" @click="clearInputHandler">X</span>
    </div>
  </div>
</template>

<style scoped>
.searchbar {
  padding: 2rem 1rem 1rem 1rem;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchbar__input-container {
  position: relative;
  max-width: 40rem;
  width: 100%;
}
.searchbar__input {
  background: #3b3b3b;
  color: #bcbcbc;
  width: 100%;
  height: 3rem;
  text-decoration: none;
  border: none;
  border-radius: 20px;
  padding: 1.8rem 0 1.8rem 2rem;
  font-size: 18px;
  border: 2px solid #888888;
  border-radius: 20px;
  transition: 0.2s all;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
}
.searchbar__input:active,
.searchbar__input:focus {
  outline: none;
  border-color: #82e0aa;
}
.searchbar__clear-input {
  font-size: 20px;
  color: #bcbcbc;
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
