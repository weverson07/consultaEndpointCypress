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
    it('Deve fazer uma requisição GET e validar os dados do item na posição 6', () => {
        // Cria a instância de LockSystem
        const lockSystem = new LockSystem();

        // Usando Cypress.Promise para controlar o fluxo
        return new Cypress.Promise((resolve) => {
            cy.request({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts', // Obtém todos os posts
                failOnStatusCode: false, // Permite captura do erro, caso haja
            })
            .then((response) => {
                // Verifica se a requisição foi bem-sucedida
                expect(response.status).to.equal(200, 'Verificando se API retornou 200');

                // Verifica se o corpo da resposta contém pelo menos 7 itens
                expect(response.body).to.be.an('array').and.to.have.length.greaterThan(6);

                // Acessa o item na posição 6 do array
                const apiPost = response.body[6]; 

                // Verifica se o objeto possui as propriedades esperadas
                expect(apiPost).to.have.property('id');
                expect(apiPost).to.have.property('title').and.to.be.a('string');

                // Obtém os valores do post
                const apiPostId = apiPost.id;
                const TitleResp = apiPost.title;

                // Armazena os valores no LockSystem
                lockSystem.setPostId(apiPostId);
                lockSystem.setTitle(TitleResp);

                // Valida os valores armazenados
                expect(lockSystem.getPostId()).to.equal(apiPostId);
                expect(lockSystem.getTitle()).to.equal(TitleResp);

                // Resolve a promessa
                resolve(response);
            });
        });
    });
});
