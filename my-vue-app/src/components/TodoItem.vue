<script setup lang="ts">
import {Todo} from "../models/Todo.ts";

const props = defineProps<{ item: Todo }>()
const emit = defineEmits<{
  save: [itewm: Todo],
  del: [itewm: Todo]
}>()

const save = () => emit('save', props.item)
const del = () => emit('del', props.item)
</script>

<template>
  <form @submit.prevent.stop="save">
    <span v-if="item.id">#{{ item.id }} </span><input v-model="item.description"/>
    <label>Done? <input type="checkbox" v-model="item.done"/></label>
    <button type="submit">OK</button>
    <button v-if="item.id" type="button" @click="del">DEL</button>
  </form>
</template>

<style scoped>

</style>
