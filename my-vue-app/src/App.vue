<script setup lang="ts">
import {onMounted, watch} from "vue";

import HelloWorld from './components/HelloWorld.vue'
import SearchBar from "./components/SearchBar.vue";
import TodoItem from "./components/TodoItem.vue";

import {useTodoState} from "./composables/TodoState.ts";

const {q, newTodo, todos, doSave, list} = useTodoState()

watch(q, () => list())
onMounted(() => list())
</script>

<template>
  <div>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vitest.dev" target="_blank">
      <img src="/vitest.svg" class="logo vue" alt="Vitest logo"/>
    </a>
  </div>
  <search-bar v-model="q"/>
  <todo-item :item="newTodo" @save="doSave"/>
  <todo-item v-for="todo in todos" :key="todo.id" :item="todo" @save="doSave"/>
  <HelloWorld msg="Vue + Vite + Vitest"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
