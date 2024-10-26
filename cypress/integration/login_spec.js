// cypress/integration/login_spec.js
describe('Login Test', () => {
    it('Logs in with valid credentials', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input').first().type('testuser'); // Adjust selectors as needed
      cy.get('input').eq(1).type('TestPass123!');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
      cy.contains('Your Projects');
    });
  });
  