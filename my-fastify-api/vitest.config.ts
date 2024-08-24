import {defineConfig} from "vite";
import {config} from 'dotenv'

export default defineConfig({
    // @ts-ignore
    test: {
        // @ts-ignore
        env: {
            "NODE_ENV": "test",
            ...config({path: '.env'}).parsed,
            ...config({path: '.env.test'}).parsed,
        }
    },
})
