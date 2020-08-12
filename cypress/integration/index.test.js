describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Loads the page when visited', () => {
    cy.contains('Hello');
    cy.title('Matthew Secrist');
  });

  it('shows a light theme as expected', () => {
    cy.get('body').should('have.class', 'light');
  });

  it('shows a dark theme as expected', () => {
    cy.contains('Change Theme').click();
    cy.get('body').should('have.class', 'dark');
    cy.visit('/');
    cy.get('body').should('have.class', 'dark');
  });

  it('shows the most recent blog posts', () => {
    cy.get('#recent-posts').children('a').should('have.length', 3);
  });
});
