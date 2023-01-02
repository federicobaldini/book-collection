<script setup lang="ts">
const props = defineProps<{
  id: number;
  name: string;
  description: string;
  publisher: string;
  subject: string;
  ISBN: string;
  imagePath: string;
  textsToHighlight: Array<string>;
}>();

/**
 * Highlight the specified text adding a <mark></mark> tag.
 */
const highlightText = (text: string): string => {
  let textMarked: string = text;

  props.textsToHighlight.forEach((textToHighlight) => {
    if (
      text.length > 0 &&
      textToHighlight &&
      textToHighlight.length > 0 &&
      !textMarked.includes("<mark>")
    ) {
      const markedText: string = textMarked
        .toLowerCase()
        .split(textToHighlight)
        .join(`<mark>${textToHighlight}</mark>`);
      const splittedMarkedText: Array<string> = markedText.split("");
      const splittedText: Array<string> = text.split("");
      let offset: number = 0;

      splittedText.forEach((character: string, index: number) => {
        if (splittedMarkedText[index + offset] === "<") {
          if (splittedMarkedText[index + offset + 1] === "m") {
            offset += 6;
          } else {
            offset += 7;
          }
        }
        splittedMarkedText[index + offset] = character;
      });
      textMarked = splittedMarkedText.join("");
    }
  });

  if (textMarked !== text) {
    return textMarked;
  }
  return text;
};
</script>

<template>
  <li class="books-item">
    <div class="books-item__image-container">
      <img class="books-item__image" :src="props.imagePath" alt="book" />
    </div>
    <div class="books-item__info-container">
      <h1 class="books-item__title">
        <span
          v-html="
            props.textsToHighlight ? highlightText(props.name) : props.name
          "
        />
      </h1>
      <h2 class="books-item__publisher">
        <span
          v-html="
            props.textsToHighlight
              ? highlightText(`Publisher: ${props.publisher}`)
              : `Publisher: ${props.publisher}`
          "
        />
      </h2>
      <h3 class="books-item__subject">
        <span
          v-html="
            props.textsToHighlight
              ? highlightText(`Subject: ${props.subject}`)
              : `Subject: ${props.subject}`
          "
        />
      </h3>
      <p class="books-item__description">
        <span
          v-html="
            props.textsToHighlight
              ? highlightText(props.description)
              : props.description
          "
        />
      </p>
      <div>
        <span>ISBN-13: </span>
        <span class="books-item__ISBN">
          <span
            v-html="
              props.textsToHighlight ? highlightText(props.ISBN) : props.ISBN
            "
        /></span>
      </div>
    </div>
  </li>
</template>

<style scoped>
.books-item {
  position: relative;
  border: 2px solid #888888;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem;
  overflow: hidden;
  background: #3b3b3b;
  color: #bcbcbc;
  min-height: 10rem;
  width: 40rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.books-item__title {
  font-size: 18px;
  padding: 0 1rem 0 0;
}
.books-item__publisher {
  font-size: 16px;
  margin: 0 0 12px 0;
}
.books-item__subject {
  font-size: 14px;
  margin: 0;
}
.books-item__image-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 2rem 0 0;
}
.books-item__image {
  padding: 1rem;
  height: 20rem;
  width: 15rem;
}
.books-item__info-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.books-item__description {
  font-size: 12px;
  color: #a6acaf;
  padding: 0 1rem 1rem 0;
}
.books-item__button-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem 0 0;
}
.books-item__button-info {
  margin: 0 0 0 1rem;
  cursor: pointer;
  color: #424949;
  background: #82e0aa;
}
.books-item__button-info:hover {
  background: #58e958;
}
.books-item__ISBN {
  color: #82e0aa;
}

@media (max-width: 600px) {
  .books-item {
    width: auto;
    flex-direction: column;
  }
  .books-item__image-container {
    min-height: 20rem;
    margin: 0;
  }
}
</style>
