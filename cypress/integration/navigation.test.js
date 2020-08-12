describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  context('desktop navigation', () => {
    beforeEach(() => {
      cy.viewport(1024, 768);
    });

    it('displays properly', () => {
      cy.get('nav').children().should('have.length', 2);
    });

    it('changes pages on click', () => {
      cy.get('nav').contains('blog').click();
      cy.contains('Blog');
    });

    it('should not show the menu button on desktop', () => {
      cy.get('#nav-menu-button').should('not.be.visible');
    });
  });

  context('mobile navigation', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('displays mobile menu button', () => {
      cy.get('#nav-menu-button').should('be.visible');
    });

    it('toggles the nav when the menu button is clicked', () => {
      cy.get('nav').should('not.be.visible');
      cy.get('#nav-menu-button').click();
      cy.get('nav').should('be.visible');
      cy.get('nav').children().should('have.length', 2);
      cy.get('#nav-menu-button').click();
      cy.get('nav').should('not.be.visible');
    });

    it('changes the page on a nav item click', () => {
      cy.get('#nav-menu-button').click();
      cy.contains('blog').click();
      cy.contains('Blog');
    });
  });
});
