import Usuarios from "../novosTestesAPI/apiAlias";
const user = new Usuarios();

describe('Testando API com Cypress - POST, GET, PUT e DELETE', function () {
    before(() => {
        // Constrói o usuário e cria com POST
        const userData = user.construtorDeValidacao();

        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/user/createWithList',
            body: [userData],
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200);
            cy.wrap(userData).as('usuarioCriado');
            cy.log('Usuário criado:', JSON.stringify(userData));
        });
    });

    it('Deve realizar login com o usuário criado via GET', function () {
        cy.get('@usuarioCriado').then((us) => {
            const { username, password } = us;

            cy.request({
                method: 'GET',
                url: `https://petstore.swagger.io/v2/user/login?username=${username}&password=${password}`,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.type).to.equal("unknown");
                cy.log('Login realizado com sucesso!');
            });
        });
    });

    it('Deve atualizar o usuário via PUT', function () {
        cy.get('@usuarioCriado').then((us) => {
            const dadosAtualizados = {
                ...us,
                firstName: "João Atualizado"
            };

            cy.request({
                method: 'PUT',
                url: `https://petstore.swagger.io/v2/user/${us.username}`,
                body: dadosAtualizados,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(200);
                cy.wrap(dadosAtualizados).as('usuarioCriado'); // Atualiza o alias
                cy.log('Usuário atualizado com sucesso!');
            });
        });
    });

    it('Deve deletar o usuário via DELETE', function () {
        cy.get('@usuarioCriado').then((us) => {
            const username = us.username;

            cy.request({
                method: 'DELETE',
                url: `https://petstore.swagger.io/v2/user/${username}`,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(201);
                cy.log(`Usuário ${username} deletado com sucesso!`);
            });
        });
    });
});
