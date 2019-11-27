describe('blog-app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Man',
      username: 'testaaja',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

    describe('when logged in', function(){
      beforeEach(function() {
        cy.contains('login')
          .click()
        cy.get('input:first').type('testaaja')
        cy.get('input:last').type('test')
        cy.contains('Kirjaudu').click()
      })

      it('users tab in menu can be open', function(){
        cy.contains('Users').click()
        cy.contains('Users')
      })

      it('name of the logged in user is shown', function() {
        cy.contains('Test Man logged in')
      })

      describe('when blog is added', function(){
        beforeEach(function(){
          cy.contains('New blog')
            .click()
          cy.get('#_title').type('Testaus blogi')
          cy.get('#_author').type('Testaaja')
          cy.get('#_url').type('http://testaaja.fi')
          cy.contains('Create blog')
            .click()
        })

        it('a new blog is added', function(){
          cy.contains('Testaus blogi')
        })

        it('added blog can be opened', function(){
          cy.contains('Testaus blogi').click()
          cy.contains('Comments here')
        })
        
        it('comments can be added', function(){
          cy.contains('Testaus blogi').click()
          cy.contains('Comments here')
          cy.get('#_comment').type('Testing comment')
          cy.contains('add comment').click()
          cy.contains('Testing comment')
        })

        it('user name is shown in user page', function(){
          cy.contains('Users').click()
          cy.get('table').contains('td', 'Test Man')
          cy.contains('Test Man')
        })
    })  
  })
})