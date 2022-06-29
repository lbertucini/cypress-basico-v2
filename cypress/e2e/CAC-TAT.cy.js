/// <reference types="Cypress" />







describe('CAC-TAT',() => {

    const user = {}

    //essa função serve para pode ser chamada em todo it, ao invés de passar a penas um arrow function. (perfumaria)
    beforeEach(function() {

        cy.visit('../../src/index.html')
    
    })


    it('checar título',() => {
     
        cy.title()
            .should('contains' , 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário',() =>{

        cy.get('#firstName')
            .click()
            .type('lucas', {delay: 0})

        cy.get('#lastName')
            .click()
            .type('bertucini', {delay: 50})
        
        cy.get('#email')
            .click()
            .type('teste@teste.com')
        
        cy.get('#open-text-area')
            .click()
            .type('estou com problemas')

        cy.get('.button')
            .click()
        
        cy.get('.success')
            .should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',() =>{

        cy.get('.button')
            .click()

        cy.get('.error')
            .should('be.visible')

    })

    it('valida se o telefone só contém números',() => {

        cy.get('#phone')
            .click()
            .type(44999552349)
            .invoke('val')
            .should(value => {
                expect(Number.isNaN(+value), 'input has to be a number').to.eq(false)
            })



            // cy.get('#phone')
            // .click()
            // .type(44999552349)
            // .invoke('text')
            // .should('match', /^[0-9]*$/)
            
            // essa validação serve também, porém não é muito indicada e menos prática pois precisa indicar o regex corretamente
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {

        cy.get('#firstName')
            .click()
            .type('lucas', {delay: 0})

        cy.get('#lastName')
            .click()
            .type('bertucini', {delay: 50})
        
        cy.get('#email')
            .click()
            .type('teste@teste.com')
        
        cy.get('#phone-checkbox')
            .check()

        cy.get('.button')
            .click()
        
        cy.get('.error')
            .should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',() => {

        cy.get('#firstName')
            .click()
            .type('lucas', {delay: 0})
            .should('have.value', 'lucas')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .click()
            .type('bertucini', {delay: 50})
            .should('have.value', 'bertucini')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .click()
            .type('teste@teste.com')
            .should('have.value', 'teste@teste.com')
            .clear()
            .should('have.value', '')
        
        cy.get('#phone-checkbox')
            .click()

        cy.get('.button')
            .click()
        
        cy.get('.error')
            .should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {     
        
        cy.get('.button')
            .click()
    
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {

        cy.fillMandatoryFieldsAndSubmit(user)
    
    })

    it('exercicio de validar contains ao invés de cy.get',() => {

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

    it('seleciona um produto (YouTube) por seu texto',() => {
        cy.get('select')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)',() => {
        cy.get('select')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice',() => {
        cy.get('select')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback')
    }) 

    it('marca cada tipo de atendimento"' , function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
           
    }) 

    it('marca cada tipo de atendimento"' , function () {
        cy.get('input[type="checkbox"]')
            .as('checkboxes')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
           
    }) 
    
    it('seleciona um arquivo da pasta fixtures ' , function () {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/teste.bmp')
            .then (input => {
                expect(input[0].files[0].name).to.equal('teste.bmp')

            })
           
    }) 

    it('seleciona um arquivo simulando um drag-and-drop' , function () {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/teste.bmp', {action: 'drag-drop'})
            .then (input => {
                expect(input[0].files[0].name).to.equal('teste.bmp')

            })
           
    }) 

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias' , function () {
        cy.fixture('teste.bmp')
            .as('fileUpload')
        cy.get('input[type="file"]')
            .selectFile('@fileUpload')
            .then (input => {
                expect(input[0].files[0].name).to.equal('teste.bmp')
        }) 
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique' , function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
        
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link' , function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
        
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link' , function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
        
    })

    it('testa a página da política de privavidade de forma independente' , function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

            //ao meu ver essa é a melhor solução, pois não precisa criar outros scripts e algumas páginas pedem pra que você esteja logado
        
    })

    it('testa a página da política de privavidade de forma independente - segunda solução', () => {
        cy.visit('./src/privacy.html')
    
        cy.contains('Talking About Testing').should ('be.visible')
        
    })

})