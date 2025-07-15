beforeEach(() => {
  cy.visit('https://e-commerce-umber-theta.vercel.app/')
  cy.get('button').contains(/Login/i).click();
    cy.url().should('include', '/login')
    cy.get('input[name="email"]').type('test@gmail.com')
    cy.get('input[name="password"]').type('test@123')
    cy.get('button[type="submit"]').click()
  })
  describe('Product Order Flow', () => {
    
    it('Initiating purchase', () => {
      cy.wait(4000)
      cy.contains('h6', 'Red Lipstick').click()
      cy.contains(/add to cart/i).click()
      cy.get('[data-testid="ShoppingCartIcon"]').should('be.visible')
      cy.get('.MuiBadge-badge').should('have.class', 'MuiBadge-invisible')
      cy.get('[data-testid="ShoppingCartIcon"]').click()
      cy.get('[data-testid="AddIcon"]').click()
      cy.get('button').contains(/Proceed to Checkout/i).click()
      cy.url().should('include', '/checkout')
      
      cy.get('input[name="name"]').type('Abin Jose')
      cy.get('input[name="phone"]').type('6238798042')
      cy.get('input[name="email"]').type('abin@gmail.com')
      cy.get('textarea[name="address"]').type('chengamthadathil') // ✅ textarea fix
      cy.get('input[name="city"]').type('pala')
      cy.get('input[name="pincode"]').type('686590')
      cy.get('input[name="country"]').type('India')

  })
})
