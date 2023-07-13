import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NewBlog from "./NewBlog"

describe("Sending a form", () => {
    const mockSend = jest.fn()
    beforeEach(() => {
        render(<NewBlog sendBlog={mockSend} />)
    })

    test("calls the handler function with the right content", async () => {
        const user = userEvent.setup()
        const button = screen.getByText("Send")
        const inputName = screen.getByPlaceholderText("Blog name")
        const inputUrl = screen.getByPlaceholderText("example.com")
        const inputAuthor = screen.getByPlaceholderText("(optional)")
        await user.type(inputName, "My favourite blog ever!")
        await user.type(inputUrl, "ponies.org")
        await user.type(inputAuthor, "Jessica Moogles")
        await user.click(button)
        expect(mockSend.mock.calls).toHaveLength(1)
        expect(mockSend.mock.calls[0][0].title).toBe("My favourite blog ever!")
        expect(mockSend.mock.calls[0][0].url).toBe("ponies.org")
        expect(mockSend.mock.calls[0][0].author).toBe("Jessica Moogles")
    })

})