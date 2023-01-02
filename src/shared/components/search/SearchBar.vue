<script setup lang="ts">
const emit = defineEmits<{
  (event: "onChangeInputText", value: string): void;
}>();
</script>

<template>
  <div class="searchbar">
    <input
      type="text"
      placeholder="What are you looking for?"
      class="searchbar__input"
      @input="(event) => emit('onChangeInputText', (event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.searchbar {
  padding: 2rem 1rem 1rem 1rem;
  width: 100%;
  text-align: center;
}

.searchbar__input {
  background: #3b3b3b;
  color: #bcbcbc;
  max-width: 40rem;
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
</style>
