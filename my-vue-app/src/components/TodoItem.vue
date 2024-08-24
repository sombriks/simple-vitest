<script setup lang="ts">
import {Todo} from "../models/Todo.ts";

const props = defineProps<{ item: Todo }>()
const emit = defineEmits<{
  save: [itewm: Todo]
}>()

const save = () => emit('save', props.item)
</script>

<template>
  <form @submit.prevent.stop="save">
    #{{ item.id }} <input v-model="item.description"/>
    <label>Done? <input type="checkbox" v-model="item.done"/></label>
    <button>OK</button>
  </form>
</template>

<style scoped>

</style>
