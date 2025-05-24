import Usuarios from "../novosTestesAPI/apiAlias"; // Importando a classe Usuarios
const user = new Usuarios();

describe('Testando API com Cypress - POST, GET, PUT e DELETE', function () {
  beforeEach(function () {
    // Criar o usuário antes de cada teste
    const userData = user.construtorDeValidacao();
    cy.log('Dados para criação do usuário:', userData); // Log para verificar os dados

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user',
      body: userData,
      failOnStatusCode: false,
    }).then((response) => {
      // Verifica a resposta do POST
      expect(response.status).to.equal(200);
      cy.wrap(userData).as('usuarioCriado'); // Alias que será usado nos testes
      cy.log('Usuário criado com sucesso!', userData);
    });
  });

  // Teste de login
  it('Deve realizar login com o usuário criado via GET', function () {
    cy.get('@usuarioCriado').then((userData) => {
      // Verifica se os dados do usuário foram recuperados corretamente
      cy.log('Dados do usuário para login:', userData);

      const { username, password } = userData;
      cy.log('Username:', username, 'Password:', password);

      cy.request({
        method: 'GET',
        url: `https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`,
        failOnStatusCode: false,
      }).then((response) => {
        const codigo = response.body.message;
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(codigo);
        expect(response.body.type).to.equal("unknown");
        cy.log('Login realizado com sucesso!');
      });
    });
  });

  // Teste de atualização do usuário
  it('Deve atualizar o usuário via PUT', function () {
    cy.get('@usuarioCriado').then((userData) => {
      // Verifica se os dados do usuário para atualização estão corretos
      cy.log('Dados do usuário para atualização:', userData);

      const { username } = userData;

      const dadosAtualizados = {
        ...userData,
        firstName: "João Atualizado"
      };

      cy.request({
        method: 'PUT',
        url: `https://petstore.swagger.io/v2/user/${username}`,
        body: dadosAtualizados,
        failOnStatusCode: false,
      }).then((response) => {
        const message = response.body.message;
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(message);
        cy.log('Usuário atualizado com sucesso!');
      });
    });
  });

  it('Deve deletar o usuário via DELETE', function () {
    cy.get('@usuarioCriado').then((userData) => {
      // Verifica se o alias foi recuperado corretamente
      cy.log('Dados do usuário para deletação:', userData);
  
      const { username } = userData;
  
      cy.request({
        method: 'DELETE',
        url: `https://petstore.swagger.io/v2/user/${username}`,
        failOnStatusCode: false,
      }).then((response) => {
        cy.log('Resposta da deleção:', response);
        expect(response.status).to.equal(200);
        cy.log(`Usuário ${username} deletado com sucesso!`);
      });
    });
  });
});
