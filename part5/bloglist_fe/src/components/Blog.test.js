import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("Initial Blog render", () => {
    const mockHandler = jest.fn()
    const blog = {
        title: "Testing a blog",
        url: "blog.tst",
        author: "Fincti Onal",
        likes: 12,
        user: {
            username: "root",
            name: "test user"
        }
    }
    let container
    beforeEach(() => {
        container = render(<Blog blog={blog} likeFunction={mockHandler} removeBlog={mockHandler} username="root" />).container
    })

    test("displays title and author", () => {

        const smallInfo = container.querySelector(".partialNote")
        expect(smallInfo).toHaveTextContent("Testing a blog")
        expect(smallInfo).toHaveTextContent("Fincti Onal")
    })

    test("doesn't display url and likes", () => {
        const bigInfo = container.querySelector(".fullNote")
        expect(bigInfo).toHaveStyle("display: none")
    })

})

describe("Clicking the button", () => {
    const mockHandler = jest.fn()
    const blog = {
        title: "Testing a blog",
        url: "blog.tst",
        author: "Fincti Onal",
        likes: 12,
        user: {
            username: "root",
            name: "test user"
        }
    }
    let container
    beforeEach(() => {
        container = render(<Blog blog={blog} likeFunction={mockHandler} removeBlog={mockHandler} username="root" />).container
    })

    test("shows likes and url", async () => {
        const user = userEvent.setup()
        const button = screen.getByText("more")
        await user.click(button)
        const bigInfo = container.querySelector(".fullNote")
        expect(bigInfo).not.toHaveStyle("display: none")
        expect(bigInfo).toHaveTextContent("likes")
        expect(bigInfo).toHaveTextContent("blog.tst")
    })

})

describe("Clicking the like-button", () => {
    const mockLike = jest.fn()
    const mockRemove = jest.fn()
    const blog = {
        title: "Testing a blog",
        url: "blog.tst",
        author: "Fincti Onal",
        likes: 12,
        user: {
            username: "root",
            name: "test user"
        }
    }
    beforeEach(() => {
        render(<Blog blog={blog} likeFunction={mockLike} removeBlog={mockRemove} username="root" />)
    })

    test("twice calls the handler function twice", async () => {
        const user = userEvent.setup()
        const button = screen.getByText("like")
        await user.click(button)
        await user.click(button)
        expect(mockLike.mock.calls).toHaveLength(2)
    })

})