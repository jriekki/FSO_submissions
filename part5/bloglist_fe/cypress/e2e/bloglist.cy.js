describe("Bloglist", function() {
    beforeEach(function() {
        cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
        const user1 = {
            username: "user159",
            password: "pikeIsAFish22",
            name: "User Nicholson"
        }
        const user2 = {
            username: "user420",
            password: "root",
            name: "Nick Userson"
        }
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user1)
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("Log in")
        cy.contains("username")
        cy.contains("password")
        cy.get("#username")
        cy.get("#password")
        cy.get("#login-button").contains("login")
    })

    it("login works with valid credentials", function() {
        cy.get("#username").type("user159")
        cy.get("#password").type("pikeIsAFish22")
        cy.get("#login-button").click()

        cy.get(".notification").should("contain", "Logged in").and("have.css", "color", "rgb(0, 128, 0)")
        cy.contains("User Nicholson logged in")
    })

    it("login doesn't work with invalid username", function() {
        cy.get("#username").type("user158")
        cy.get("#password").type("pikeIsAFish22")
        cy.get("#login-button").click()

        cy.contains("Wrong credentials")
        cy.contains("User Nicholson logged in").should("not.exist")
        cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)")
    })

    it("login doesn't work with invalid password", function() {
        cy.get("#username").type("user159")
        cy.get("#password").type("...")
        cy.get("#login-button").click()

        cy.contains("Wrong credentials")
        cy.contains("User Nicholson logged in").should("not.exist")
        cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)")
    })

    describe("When logged in", function() {
        beforeEach(function() {
            cy.login({ username: "user159", password: "pikeIsAFish22" })
        })

        it("a blog can be created", function() {
            cy.contains("Add new blog").click()
            cy.get("#title").type("Adventures and stuff")
            cy.get("#url").type("yehoo.net")
            cy.get("#author").type("Gill Bates")
            cy.get("#submit-button").click()
            cy.get(".notification").should("contain", "Added Adventures and stuff")
            cy.get("#blogList").should("contain","Adventures and stuff")
        })

        describe("and blogs exist", function() {
            beforeEach(function() {
                const blog1 = {
                    title: "Blog1",
                    url: "blogone.com",
                    author: "First Author"
                }
                const blog2 = {
                    title: "Popular blog",
                    url: "blogtwo.com",
                    likes: 6
                }
                const blog3 = {
                    title: "Mysterious things",
                    url: "questionmark.com",
                    likes: 3
                }
                cy.newBlog(blog1)
                cy.login({ username: "user420", password: "root" })
                cy.newBlog(blog2)
                cy.newBlog(blog3)
            })

            it("blogs can be liked", function() {
                cy.contains("Blog1").parent()
                    .contains("more")
                    .click()

                cy.contains("Blog1").parent()
                    .contains("likes: 0")
                    .contains("like")
                    .click()

                cy.contains("Blog1").parent()
                    .contains("likes: 1")
            })

            it("blogs can be deleted by their maker", function() {
                cy.get("#blogList")
                    .contains("Popular blog")
                    .should("exist")
                cy.contains("Popular blog").parent()
                    .contains("more")
                    .click()
                cy.contains("Popular blog").parent()
                    .contains("Delete blog")
                    .click()
                cy.get(".notification").should("contain", "Deleted Popular blog")
                cy.get("#blogList")
                    .contains("Popular blog")
                    .should("not.exist")
            })

            it("delete button is not shown for other users' blogs", function() {
                cy.get("#blogList")
                    .contains("Blog1")
                    .should("exist")
                cy.contains("Blog1").parent()
                    .contains("more")
                    .click()
                cy.contains("Blog1").parent()
                    .contains("Delete blog")
                    .should("have.css", "display", "none")

                cy.login({ username: "user159", password: "pikeIsAFish22" })
                cy.get("#blogList")
                    .contains("Blog1")
                    .should("exist")
                cy.contains("Blog1").parent()
                    .contains("more")
                    .click()
                cy.contains("Blog1").parent()
                    .contains("Delete blog")
                    .should("not.have.css", "display", "none")
            })
            it("blogs are ordered by number of likes", function() {
                cy.get(".blog").eq(0).contains("Popular blog")
                cy.get(".blog").eq(1).contains("Mysterious things")
                cy.get(".blog").eq(2).contains("Blog1")

                cy.contains("Blog1").parent()
                    .contains("more")
                    .click()

                cy.contains("Blog1").parent()
                    .contains("like")
                    .as("likeBlog1")
                // Click seven times
                cy.get("@likeBlog1").click()
                cy.wait(1500)

                cy.get("@likeBlog1").click()
                cy.wait(1500)

                cy.get("@likeBlog1").click()
                cy.wait(1500)

                cy.get("@likeBlog1").click()
                cy.wait(1500)
                cy.get("@likeBlog1").click()
                cy.wait(1500)

                cy.get("@likeBlog1").click()
                cy.wait(1500)

                cy.get("@likeBlog1").click()
                cy.wait(1500)

                cy.get(".blog").eq(1).contains("Popular blog")
                cy.get(".blog").eq(2).contains("Mysterious things")
                cy.get(".blog").eq(0).contains("Blog1")

            })
        })
    })
})