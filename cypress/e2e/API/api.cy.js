// describe('Testando a API', () => {
//     it('Deve obter o primeiro item da resposta da API', () => {
//       cy.request({
//         method: "GET",
//         url: "https://jsonplaceholder.typicode.com/posts", // URL de exemplo
//       }).then((response) => {
//         // Verifica se a resposta é bem-sucedida
//         expect(response.status).to.equal(200);
  
//         // Verifica se o body é um array e contém pelo menos 1 item
//         expect(response.body).to.be.an("array").and.to.have.length.greaterThan(0);
  
//         // Acessa o primeiro item do array
//         const firstItem = response.body[10];
//         expect(firstItem).to.have.property("id").and.to.be.a("number");
//         expect(firstItem).to.have.property("title").and.to.be.a("string");
//       });
//     });
//   });
  

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
    it('Deve fazer uma requisição GET e validar os dados do post com id=10', () => {
        // Cria a instância de LockSystem
        const lockSystem = new LockSystem();

        // Usando Cypress.Promise para controlar o fluxo
        return new Cypress.Promise((resolve) => {
            cy.request({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts/10', // Busca diretamente o post com ID 10
                failOnStatusCode: false, // Permite captura do erro, caso haja
            })
            .then((response) => {
                // Verifica se a requisição foi bem-sucedida
                expect(response.status).to.equal(200, 'Verificando se API retornou 200');

                // Verifica se o corpo da resposta é válido
                expect(response.body).to.not.be.null;
                expect(response.body).to.be.an('object');

                // Verifica se o post retornado contém um ID e um título válidos
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('title');

                // Obtém os valores do post
                const apiPostId = response.body.id;
                const TitleResp = response.body.title;

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
