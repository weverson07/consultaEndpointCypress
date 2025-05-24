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
    it('Deve fazer uma requisição GET e validar os dados', () => {
      // Cria a instância de LockSystem
      const lockSystem = new LockSystem();

      // Usando Cypress.Promise para controlar o fluxo
      return new Cypress.Promise((resolve) => {
        cy.request({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/posts', // URL da API
          qs: { id: 7 }, // Passa o parâmetro de consulta 'id=1'
          failOnStatusCode: false, // Permite captura do erro, caso haja
        })
        .then((response) => {
          // Verifica se a requisição foi bem-sucedida
          expect(response.status).to.equal(200, 'Verificando se API retornou 200');
  
          // Verifica se o corpo da resposta contém um array com pelo menos um item
          expect(response.body).to.be.an('array').and.to.have.length.greaterThan(0);
  
          // Acessa o primeiro item do array e extrai o id
          const apiPostId = response.body[0].id;
  
          // Verifica se o ID do primeiro post é o que esperamos
          expect(apiPostId).to.equal(7); // Como estamos filtrando por 'id=1'
  
          // Verifica se o título do post está presente
          expect(response.body[0]).to.have.property('title').and.to.be.a('string');
  
          const TitleResp = response.body[0].title; // Obtém o título do primeiro post
  
          // Armazena e valida o título e ID
          lockSystem.setPostId(apiPostId);
          lockSystem.setTitle(TitleResp);
  
          // Valida se o postId e o título estão corretos
          expect(lockSystem.getPostId()).to.equal(apiPostId);
          expect(lockSystem.getTitle()).to.equal(TitleResp);
  
          // Resolve a promessa com sucesso
          resolve(response);
        });
      });
    });
});
