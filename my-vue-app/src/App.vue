<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import HelloWorld from './components/HelloWorld.vue'
import SearchBar from "./components/SearchBar.vue";
import TodoItem from "./components/TodoItem.vue";
import {useDebouncedRef} from "./composables/DebouncedRef.ts";
import {Todo} from "./models/Todo.ts";

const q = useDebouncedRef('')
const todos = ref<Todo[]>([])
const newTodo = ref<Todo>({description: '', done: false})

const list = async () => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/todos?q=${q.value}`)
  if (result.status != 200) throw new Error('query failed')
  const values = await result.json()
  todos.value = values.map((v: Todo) => {
    v.done = v.done === 1 // checkboxes huh?
    return v
  })
}

const doSave = async (item: Todo) => {
  if (!item.id) {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(item),
      method: 'POST'
    })
    if (result.status != 201) throw new Error('query failed')
  } else {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/todos/${item.id}`, {
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(item),
      method: 'PUT'
    })
    if (result.status != 303) throw new Error('query failed')

  }
  newTodo.value = {description: '', done: false}
  await list()
}

onMounted(() => list())
watch(q, () => list())
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  <search-bar v-model="q"/>
  <todo-item :item="newTodo" @save="doSave"/>
  <todo-item v-for="todo in todos" :key="todo.id" :item="todo" @save="doSave"/>
  <HelloWorld msg="Vite + Vue"/>
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
