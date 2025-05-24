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
    it('Deve criar um post e validar os dados', () => {
      // Cria a instância de LockSystem
      const lockSystem = new LockSystem();

      // Dados fictícios para criação do post
      const postData = {
        title: 'Novo Post',
        body: 'Este é o conteúdo do novo post.',
        userId: 1
      };

      // Usando Cypress.Promise para controlar o fluxo
      return new Cypress.Promise((resolve) => {
        cy.request({
          method: 'POST',
          url: 'https://jsonplaceholder.typicode.com/posts', // URL da API
          body: postData, // Dados do novo post
          failOnStatusCode: false, // Permite captura do erro, caso haja
        })
        .then((response) => {
          // Verifica se a requisição foi bem-sucedida
          expect(response.status).to.equal(201, 'Verificando se o post foi criado');

          // Verifica se o corpo da resposta contém os dados enviados
          expect(response.body).to.have.property('title', postData.title);
          expect(response.body).to.have.property('body', postData.body);
          expect(response.body).to.have.property('userId', postData.userId);

          // Acessa o id do post criado
          const apiPostId = response.body.id;

          // Armazena e valida o título e ID
          lockSystem.setPostId(apiPostId);
          lockSystem.setTitle(postData.title);

          // Valida se o postId e o título estão corretos
          expect(lockSystem.getPostId()).to.equal(apiPostId);
          expect(lockSystem.getTitle()).to.equal(postData.title);

          // Resolve a promessa com sucesso
          resolve(response);
        });
      });
    });
});
