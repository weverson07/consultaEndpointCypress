import Usuarios from "../novosTestesAPI/apiAlias";

const user = new Usuarios();
let userData = {}; // <- variável de escopo

describe('Testando API com Cypress - POST, GET e PUT', function () {

  before(() => {
    // Configura os dados do usuário
    user.SetId(10);
    user.SetUsername("joaosilva");
    user.SetFirstName("João");
    user.SetLastName("Silva");
    user.SetEmail("joao.silva@example.com");
    user.SetPassword("senha123");
    user.SetPhone("11999999999");
    user.SetUserStatus(1);
    userData = user.toJson();

    // Criação do usuário
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/user/createWithList',
      body: [userData],
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      cy.log('Usuário criado com sucesso');
    });
  });

  it('Deve realizar login com o usuário criado via GET', () => {
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/user/login?username=${userData.username}&password=${userData.password}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      cy.log('Login realizado com sucesso!');
    });
  });

  it('Deve atualizar o usuário via PUT', () => {
    const dadosAtualizados = {
      ...userData,
      firstName: "João Atualizado"
    };

    cy.request({
      method: 'PUT',
      url: `https://petstore.swagger.io/v2/user/${userData.username}`,
      body: dadosAtualizados,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      cy.log('Usuário atualizado com sucesso!');
    });
  });
});
