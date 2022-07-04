// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', user => {

    cy.contains('Nome')
        .click()
        .type('lucas', {delay: 0})

    cy.contains('Sobrenome')
        .click()
        .type('bertucini', {delay: 50})

    cy.contains('E-mail')
        .click()
        .type('teste@teste.com', {delay: 50})

    cy.get('#open-text-area')
        .click()
        .type('estou com problemas')
            
    cy.contains('.button','Enviar')
        .click()

    cy.contains('Mensagem enviada com sucesso.')
        .should('be.visible')

})


Cypress.Commands.add('setDate', date => {

    cy.get('[data-cy=birthdate-date-field]')
    .type(date)
    .should('have.value', date)
    .blur()
})