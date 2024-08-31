import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {render, RenderResult} from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import {http, HttpResponse} from 'msw'
import {setupServer, SetupServerApi} from 'msw/node'

import App from "./App.vue";

describe('app tests', () => {

    let component: RenderResult
    let server: SetupServerApi

    beforeAll(() => {
        server = setupServer(
            http.get('http://mock-url:3000/todos', () => HttpResponse.json([]))
        )
        server.listen()
        component = render(App)
    })

    afterAll(() => {
        component.unmount()
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
})
