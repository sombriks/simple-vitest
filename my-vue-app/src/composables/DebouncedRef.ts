import {customRef} from 'vue'

/**
 * debounced ref, so we don't hit apis with every single value change
 *
 * https://vuejs.org/api/reactivity-advanced.html#customref
 *
 * @param value inicial ref value
 * @param delay how much we should wait before hit the value
 */
export function useDebouncedRef<T>(value: T, delay = 500) {
    let timeout: number
    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value
            },
            set(newValue) {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    value = newValue
                    trigger()
                }, delay) as unknown as number
            }
        }
    })
}
