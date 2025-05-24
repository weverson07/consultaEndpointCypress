before(() => {
    const userData = {
      id: 11,
      username: "joaosilva",
      firstName: "João",
      lastName: "Silva",
      email: "joao@example.com",
      password: "senha123",
      phone: "11999999999",
      userStatus: 1
    };
  
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user/createWithList',
      body: [userData],
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      cy.wrap(userData).as('usuarioCriado'); // <== Aqui é onde o alias é criado
    });
  });
  it('Deve deletar o usuário via DELETE', () => {
    cy.get('@usuarioCriado').then((us) => {
      const username = us.username;
  
      cy.request({
        method: 'DELETE',
        url: `https://petstore.swagger.io/v2/user/${username}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(200);
        cy.log(`Usuário ${username} deletado com sucesso!`);
      });
    });
  });
    