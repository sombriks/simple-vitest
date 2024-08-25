import {ref} from "vue";

import {useDebouncedRef} from "./DebouncedRef.ts";
import {Todo} from "../models/Todo.ts";

export const useTodoState = () => {

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
            if (result.status != 201) throw new Error('insert failed')
        } else {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/todos/${item.id}`, {
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(item),
                method: 'PUT'
            })
            if (result.status != 200) throw new Error('update failed')
        }
        newTodo.value = {description: '', done: false}
        await list()
    }

    return {
        q, todos, newTodo, list, doSave
    }
}
