import {describe, expect, it} from "vitest";

describe('app tests', () => {

    it('should have import.meta.env.MODE to be "test"', () => {
        expect(import.meta.env.MODE).eq('test')
    })

    it('should have VITE_API_URL set to mock url', () => {
        expect(import.meta.env.VITE_API_URL).eq('http://mock-url:3000')
    })
})
