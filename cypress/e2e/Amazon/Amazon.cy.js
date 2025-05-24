describe('Autocomplete da Amazon', () => {
  beforeEach(() => {
    cy.visit('https://www.amazon.com.br/');
  });

  it('Deve exibir sugestões de autocomplete ao digitar', () => {
    cy.get('#twotabsearchtextbox').type('livro');

    cy.get('.s-suggestion')
      .should('be.visible')
      .then(($suggestions) => {
        expect($suggestions.length).to.be.greaterThan(0);
        console.log('Itens:', $suggestions)
      });
  });
});
