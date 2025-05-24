class LockSystem {
    constructor() {
        this.postId = null;
        this.title = null;
    }

    setPostId(id) {
        this.postId = id;
    }

    getPostId() {
        return this.postId;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }
}

describe('Testando API com Cypress', () => {
    it('Deve criar um post, capturar a resposta, atualizar com PUT, validar com GET e deletar', () => {
        const lockSystem = new LockSystem();

        // Dados para criação do post
        const postData = {
            title: 'Novo Post',
            body: 'Este é o conteúdo do novo post.',
            userId: 1
        };

        // Criar um novo post e armazenar a resposta
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: postData,
            failOnStatusCode: false,
        }).as('postResponse');

        // Usa a resposta armazenada
        cy.get('@postResponse').then((postResponse) => {
            expect(postResponse.status).to.equal(201, 'Post criado com sucesso');

            // Captura o ID gerado
            const apiPostId = postResponse.body.id;

            // Armazena os dados do post criado
            lockSystem.setPostId(apiPostId);
            lockSystem.setTitle(postData.title);

            expect(lockSystem.getPostId()).to.equal(apiPostId);
            expect(lockSystem.getTitle()).to.equal(postData.title);

            // **Agora faz um GET para validar o post criado**
            cy.request({
                method: 'GET',
                url: `https://jsonplaceholder.typicode.com/posts/${apiPostId}`,
                failOnStatusCode: false,
            }).then((getResponse) => {
                expect(getResponse.status).to.equal(200, 'Verificando se o post foi criado corretamente');
                expect(getResponse.body).to.have.property('title', postData.title);
                expect(getResponse.body).to.have.property('body', postData.body);
                expect(getResponse.body).to.have.property('userId', postData.userId);
            });

            // **Agora realiza o PUT para atualizar o post**
            const updatedData = {
                title: 'Post Atualizado',
                body: 'Este é o conteúdo atualizado.',
                userId: 1
            };

            cy.request({
                method: 'PUT',
                url: `https://jsonplaceholder.typicode.com/posts/${apiPostId}`,
                body: updatedData,
                failOnStatusCode: false,
            }).as('putResponse');

            // Usa a resposta armazenada do PUT
            cy.get('@putResponse').then((putResponse) => {
                expect(putResponse.status).to.equal(200, 'Post atualizado com sucesso');

                // Verifica se os dados foram alterados corretamente
                expect(putResponse.body).to.have.property('title', updatedData.title);
                expect(putResponse.body).to.have.property('body', updatedData.body);
                expect(putResponse.body).to.have.property('userId', updatedData.userId);
            });

            // **Agora faz um GET para validar o post atualizado**
            cy.request({
                method: 'GET',
                url: `https://jsonplaceholder.typicode.com/posts/${apiPostId}`,
                failOnStatusCode: false,
            }).then((getUpdatedResponse) => {
                expect(getUpdatedResponse.status).to.equal(200, 'Verificando se o post foi atualizado corretamente');
                expect(getUpdatedResponse.body).to.have.property('title', updatedData.title);
                expect(getUpdatedResponse.body).to.have.property('body', updatedData.body);
            });

            // **Agora realiza o DELETE para remover o post**
            cy.request({
                method: 'DELETE',
                url: `https://jsonplaceholder.typicode.com/posts/${apiPostId}`,
                failOnStatusCode: false,
            }).as('deleteResponse');

            // Valida se a resposta do DELETE foi bem-sucedida
            cy.get('@deleteResponse').then((deleteResponse) => {
                expect(deleteResponse.status).to.equal(200, 'Post deletado com sucesso');
            });

            // **Agora faz um GET para garantir que o post foi realmente excluído**
            cy.request({
                method: 'GET',
                url: `https://jsonplaceholder.typicode.com/posts/${apiPostId}`,
                failOnStatusCode: false,
            }).then((getDeletedResponse) => {
                expect(getDeletedResponse.status).to.equal(404, 'Post não encontrado após exclusão');
            });
        });
    });
});
