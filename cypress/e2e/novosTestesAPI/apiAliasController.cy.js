import Usuarios from "../novosTestesAPI/apiAlias";
const user = new Usuarios();

describe('Testando API com Cypress - POST, GET e PUT', function () {
    before(() => {
        // Constrói o usuário e cria com POST
        const userData = user.construtorDeValidacao();
        const dadosPost = [
            {
                id: 0,
                username: "teste",
                firstName: "novo",
                lastName: "teste",
                email: "a@ahotmail.com",
                password: "teste",
                phone: "1194778-83828",
                userStatus: 1
            }
        ]
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/user/createWithList',
            body: [{ userData }], // Usa o método toJson() da instância
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200);
            cy.wrap(userData).as('usuarioCriado'); // Alias acessível no `it()`
            cy.log(userData, 'usuarioCriado')
        });
    });

    it('Deve realizar login com o usuário criado via GET', function () {
        cy.get('@usuarioCriado').then((us) => {
            const { username, password } = us;
            cy.log(username, password)
            cy.request({
                method: 'GET',
                url: `https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`,
                failOnStatusCode: false,
            }).then((response) => {
                const codigo = response.body.message
                expect(response.status).to.equal(200);
                expect(response.body.message).to.equal(codigo)
                expect(response.body.type).to.equal("unknown")
                cy.log('Login realizado com sucesso!');
            });
        });
    });

    it('Deve atualizar o usuário via PUT', () => {
        const dadosAtualizados = {
            ...user.constData,
            firstName: "João Atualizado"
        };

        cy.request({
            method: 'PUT',
            url: `https://petstore.swagger.io/v2/user/${user.username}`,
            body: dadosAtualizados,
            failOnStatusCode: false,
        }).then((response) => {
            cy.wrap(dadosAtualizados).as('users');
            const message = response.body.message;
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal(message);
            cy.log('Usuário atualizado com sucesso!');
        });
    });

    // Teste para deletar o usuário usando o alias criado
    // it('Deve deletar o usuário via DELETE', function () {
    //     const data = {
    //         ...user.constData,
    //         username: "usuário teste"
    //     };

    //     const username = data.username; // Define corretamente a variável username

    //     cy.request({
    //         method: 'DELETE',
    //         // url: `https://petstore.swagger.io/v2/user/${data}`
    //         url: 'https://petstore.swagger.io/v2/user/teste',
    //         failOnStatusCode: false,
    //       }).then((response) => {
    //         cy.log('Resposta da requisição:', JSON.stringify(response));
    //         expect(response.status).to.equal(200);
    //         cy.log(`Usuário joaosilva deletado com sucesso!`);
    //     });
    // });
    it('Deve deletar o usuário via DELETE', function () {
        cy.get('@users').then((res) => {
          const username = res.body.username;
      
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
});
