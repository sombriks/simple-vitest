import {describe, it, expect, beforeAll, afterAll} from "vitest";

import {server} from "./server";
import {db, initDb, resetDb, seedDb} from "./database";
import {Todo} from "./todo";

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
        const result = await server.inject({method: 'GET', url: '/status'})
        expect(result).toBeTruthy()
        expect(result.statusCode).eq(200)
        const payload = result.json()
        expect(payload).toHaveProperty('message')
        expect(payload.message).eq('ONLINE')
    });

    it('should list todos', async () => {
        const result = await server.inject({method: 'GET', url: '/todos'})
        expect(result).toBeTruthy()
        expect(result.statusCode).eq(200)
        const payload = result.json()
        expect(payload).to.be.an('array')
        expect(payload.map((t: Todo) => t.description)).toContain('watch tv')
    })

    it('should find todo', async () => {
        const result = await server.inject({method: 'GET', url: '/todos/1'})
        expect(result).toBeTruthy()
        expect(result.statusCode).eq(200)
        const payload = result.json()
        expect(payload).to.be.an('object')
        expect(payload.id).eq(1)
    })

    it('should NOT find todo - invalid id', async () => {
        const result = await server.inject({method: 'GET', url: '/todos/1234567890'})
        expect(result).toBeTruthy()
        expect(result.statusCode).eq(404)
        const payload = result.json()
        expect(payload).to.be.an('object')
        expect(payload.message).eq('not found')
    })

    it('should count todo', async () => {
        const result = await server.inject({method: 'GET', url: '/todos/count'})
        expect(result).toBeTruthy()
        expect(result.statusCode).eq(200)
        const payload = result.json()
        expect(payload).to.be.an('object')
        expect(payload.total).toBeTruthy()
    })

    it('should create todo', async () => {
        const result = await server.inject({
            method: 'POST',
            url: '/todos',
            payload: {description: 'walk the cat'}
        })
        expect(result).toBeTruthy()
        expect(result.statusCode).eq(201)
        const payload = result.json()
        expect(payload).to.be.an('object')
        expect(payload.id).toBeTruthy()
    })

    it('should update todo', async () => {
        const result = await server.inject({
            method: 'PUT',
            url: '/todos/1',
            payload: {description: 'argue on the internet'}
        })
        expect(result).toBeTruthy()
        expect(result.statusCode).eq(303)
        const payload = result.json()
        expect(payload).to.be.an('object')
        expect(payload.message).toBeTruthy()
        expect(payload.message).eq('1 updated')
    })

    it('should delete todo', async () => {
        const result = await server.inject({method: 'DELETE', url: '/todos/3'})
        expect(result).toBeTruthy()
        expect(result.statusCode).eq(303)
        const payload = result.json()
        expect(payload).to.be.an('object')
        expect(payload.message).toBeTruthy()
        expect(payload.message).eq('1 deleted')
    })
});
