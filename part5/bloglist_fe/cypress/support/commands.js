Cypress.Commands.add("login", ({ username, password }) => {
    cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
        username, password
    }).then(({ body }) => {
        localStorage.setItem("loggedBlogappUser", JSON.stringify(body))
        cy.visit("")
    })
})

Cypress.Commands.add("newBlog", (blogObject) => {
    console.log(JSON.parse(localStorage.getItem("loggedBlogappUser")).token)
    cy.request({
        url: `${Cypress.env("BACKEND")}/blogs`,
        method: "POST",
        body: blogObject,
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("loggedBlogappUser")).token}`
        }
    })
    cy.visit("")
})