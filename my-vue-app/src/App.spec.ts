import {afterAll, beforeAll, describe, expect, it, vi} from "vitest";
import {render, RenderResult} from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'

import App from "./App.vue";

describe('app tests', () => {

    let component: RenderResult
    const server = setupServer(
        http.get('http://mock-url:3000/todos', () => HttpResponse.json([
            {id: 777, description:'Walk the dog', done: true }
        ]))
    )

    beforeAll(() => {
        server.listen()
        component = render(App)
    })

    afterAll(() => {
        vi.waitFor(() => component.unmount())

        server.close()
    })

    it('should have import.meta.env.MODE to be "test"', () => {
        expect(import.meta.env.MODE).eq('test')
    })

    it('should have VITE_API_URL set to mock url', () => {
        expect(import.meta.env.VITE_API_URL).eq('http://mock-url:3000')
    })

    it('should click the count button', async () => {
        const button = component.getByText("count is 0")
        expect(button).toBeTruthy()
        const user = userEvent.setup()
        await user.click(button)
        expect(button.innerText).eq("count is 1")
    })

    it('should search todos', async () => {
        const search = component.getByPlaceholderText('Search')
        expect(search).toBeTruthy()
    })

    it('should have one todo - check id', async () => {
        const id = component.getByText('#777')
        expect(id).toBeTruthy()
    })

    it('should have one todo - check input', async () => {
        const field = component.getByDisplayValue('Walk the dog')
        expect(field).toBeTruthy()
    })
})
