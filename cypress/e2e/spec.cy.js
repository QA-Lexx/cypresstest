describe('login page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('logins succesfully', () => {
    cy.login('test@test.com', 'test')
    cy.contains('Добро пожаловать test@test.com').should('be.visible')
    cy.contains('Log out').should('be.visible')
  })

  it('logins error on empty login', () => {
    cy.login(null, 'test')
    cy.get('#mail').then((el) => {
      expect(el[0].checkValidity()).to.be.false
      expect(el[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })

  it('logins error on empty password', () => {
    cy.login('test@test.com', null)
    cy.get('#pass').then((el) => {
      expect(el[0].checkValidity()).to.be.false
      expect(el[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })

  it('add new book', () => {
    cy.login('test@test.com', 'test')
    cy.contains('Add new').click()
    cy.get('#title').type('Ulysses')
    cy.get('#description').type('Joyce')
    cy.contains('Submit').click()
    cy.contains('Ulysses').should('be.visible')
  })

  it('addition to favorities', () => {
    cy.login('test@test.com', 'test')
    cy.get('[href="book/b6334cd7-1746-40c5-a5ed-e776072efe5d"] > .h-100 > .card-footer > .btn').click()
    cy.contains('Delete from favorite').should('be.visible')
  })

  it('book download', () => {
    cy.login('test@test.com', 'test')
    cy.get('[href="book/b6334cd7-1746-40c5-a5ed-e776072efe5d"] > .h-100 > .card-body').click()
    cy.contains('Dowload book').click()
  })

})