import {describe, it, expect, beforeAll, afterAll} from "vitest";

import {server} from "./server";
import {db, initDb, resetDb, seedDb} from "./database";

describe('api tests', () => {

    beforeAll(async () => {
        await resetDb()
        await initDb()
        await seedDb()
    });

    afterAll(async () => {
        await db.destroy()
    });

    it('NODE_ENV should be "test"', async () => {
        expect(process.env.NODE_ENV).eq('test')
    });

    it('should be ONLINE', async () => {
        const result = await server.inject({ method: 'GET', url: '/status'})
        expect(result).toBeTruthy()
        const payload = result.json()
        expect(payload).toHaveProperty('message')
        expect(payload.message).eq('ONLINE')
    });

    it('should list todos', async () => {
        const result = await server.inject({method: 'GET', url: '/todos'})
        expect(result).toBeTruthy()
        const payload = result.json()
        expect(payload).to.be.an('array')
        expect(payload).toContain({'watch tv'})
    })
});
