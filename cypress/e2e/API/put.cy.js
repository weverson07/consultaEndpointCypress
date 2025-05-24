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
describe('Teste API com Cypress - Atualização com PUT', () => {
    const lockSystem = new LockSystem();
  
    before(() => {
      // Criação de um novo post para obter o ID e criar o alias
      const newPost = {
        title: 'Novo título de teste',
        body: 'Conteúdo do post para teste',
        userId: 10,
      };
  
      cy.request({
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        body: newPost,
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(201, 'Verificando se o POST retornou 201');
        expect(response.body).to.have.property('id');
  
        // Armazena os dados no LockSystem
        lockSystem.setPostId(response.body.id);
        lockSystem.setTitle(response.body.title);
  
        // Registra o alias para ser usado nos testes seguintes
        cy.wrap(lockSystem).as('createdLockSystem');
      });
    });
  
    it('Deve atualizar o post criado anteriormente com novos dados (usando alias e Promise)', () => {
      // Obtém o alias registrado no 'before'
      cy.get('@createdLockSystem').then((lockSystem) => {
        const postIdToUpdate = lockSystem.getPostId();
        const updatedPost = {
          title: 'Título atualizado pelo método PUT',
          body: 'Conteúdo do post atualizado para teste',
          userId: 1,
        };
  
        expect(postIdToUpdate).to.be.a('number', 'Valida que o ID armazenado é um número válido');
  
        // Realiza a requisição PUT para atualizar o post
        cy.request({
          method: 'PUT',
          url: `https://jsonplaceholder.typicode.com/posts/${postIdToUpdate}`,
          body: updatedPost,
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          failOnStatusCode: false,
        }).then((response) => {
          // Verifica se a resposta foi bem-sucedida
          expect(response.status).to.equal(200, 'Verificando se o PUT retornou 200');
          expect(response.body).to.have.property('id').and.to.equal(postIdToUpdate);
          expect(response.body.title).to.equal(updatedPost.title);
  
          // Atualiza o título no LockSystem
          lockSystem.setTitle(response.body.title);
  
          // Valida os valores armazenados no LockSystem
          expect(lockSystem.getPostId()).to.equal(postIdToUpdate);
          expect(lockSystem.getTitle()).to.equal(updatedPost.title);
  
          cy.log(`Post com ID: ${postIdToUpdate} atualizado com sucesso.`);
        });
      });
    });
  });
  