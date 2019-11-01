

describe('Blog', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('User can be login', function(){
    cy.visit('http://localhost:3003')
    cy.contains('login')
      .click()
    cy.get('input:first')
      .type('natalaan')
    cy.get('input:last')
      .type('alati')
    cy.contains('Kirjaudu')
      .click()
    cy.contains('Natalia logged in')
  })

  it('Move to users page from menu', function(){
    cy.visit('http://localhost:3003')
    cy.contains('Users')
      .click()
    cy.contains('Users')
  })
})