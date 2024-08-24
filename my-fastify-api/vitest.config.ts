import {defineConfig} from "vite";

export default defineConfig({
    // @ts-ignore
    test: {
        // @ts-ignore
        env: {
            // TODO load from .env files
            "NODE_ENV": "test",
            "DB_URL":"./todos-test.db"
        }
    },
})
