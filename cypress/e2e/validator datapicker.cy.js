/// <reference types="Cypress" />


describe('Age finder',() => {

    


    //essa função serve para pode ser chamada em todo it, ao invés de passar a penas um arrow function. (perfumaria)
    beforeEach(() => {

        const now = new Date('2022-07-01').getTime()
    
        cy.clock(now) //Freezes the date to July 01, 2022
        cy.visit('https://age-finder.vercel.app/') 
    })


    context('Plural years', () => {
     
        it('The choosen age has to be 0', () => {

            //cy.setDate(input.birthdate)
            cy.get('[data-cy=birthdate-date-field]')
            .type('2022-02-02')
            .should('have.value', '2022-02-02')
            .blur()

            cy.contains("You're 0 years old")
                .should('be.visible')
    
        })
    
        it('The choosen age has to be 22', () =>{
    
            cy.get('[data-cy=birthdate-date-field]')
            .type('2000-02-02')
            .should('have.value', '2000-02-02')
            .blur()

            cy.contains("You're 22 years old")
                .should('be.visible')
    
        })



    })

   

    

})