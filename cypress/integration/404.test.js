describe('404 page', () => {
  it('navigates to a 404 page on an invalid route', () => {
    cy.visit('/this-page-does-not-exist');
    cy.contains('404');
  });
});
