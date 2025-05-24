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
  
  describe('Testando API com Cypress - POST, PUT e DELETE', () => {
    // Instância compartilhada da classe LockSystem
    const lockSystem = new LockSystem();
  
    it('Deve criar um novo post e armazenar o ID gerado (usando Promise e alias)', () => {
      const newPost = {
        title: 'Novo título de teste',
        body: 'Conteúdo do post para teste',
        userId: 10,
      };
  
      return new Cypress.Promise((resolve) => {
        cy.request({
          method: 'POST',
          url: 'https://jsonplaceholder.typicode.com/posts',
          body: newPost,
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(201, 'Verificando se o POST retornou 201');
          expect(response.body).to.have.property('id');
          expect(response.body.title).to.equal(newPost.title);
  
          // Armazena os dados na instância do LockSystem
          lockSystem.setPostId(response.body.id);
          lockSystem.setTitle(response.body.title);
  
          // Valida os valores armazenados
          expect(lockSystem.getPostId()).to.equal(response.body.id);
          expect(lockSystem.getTitle()).to.equal(response.body.title);
  
          cy.log(`Post criado com ID: ${lockSystem.getPostId()}`);
  
          // Cria um alias para o LockSystem, facilitando o acesso nos testes seguintes
          cy.wrap(lockSystem).as('createdLockSystem');
  
          resolve(response);
        });
      });
    });
  
    it('Deve atualizar o post criado anteriormente com novos dados (usando alias e Promise)', function () {
      // Acessa o alias criado no POST
      cy.get('@createdLockSystem').then((ls) => {
        const postIdToUpdate = ls.getPostId();
        const updatedPost = {
          title: 'Título atualizado pelo método PUT',
          body: 'Conteúdo do post atualizado para teste',
          userId: 1,
        };
  
        expect(postIdToUpdate).to.be.a('number', 'Valida que o ID armazenado é um número');
  
        return new Cypress.Promise((resolve) => {
          cy.request({
            method: 'PUT',
            url: `https://jsonplaceholder.typicode.com/posts/${postIdToUpdate}`,
            body: updatedPost,
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.equal(200, 'Verificando se o PUT retornou 200');
            expect(response.body).to.have.property('id').and.to.equal(postIdToUpdate);
            expect(response.body.title).to.equal(updatedPost.title);
  
            // Atualiza o título no LockSystem
            ls.setTitle(response.body.title);
  
            // Valida os valores armazenados
            expect(ls.getPostId()).to.equal(postIdToUpdate);
            expect(ls.getTitle()).to.equal(updatedPost.title);
  
            cy.log(`Post com ID: ${postIdToUpdate} atualizado com sucesso.`);
            resolve(response);
          });
        });
      });
    });
  
    it('Deve excluir o post criado e atualizado anteriormente (usando alias e Promise)', function () {
      // Acessa o alias criado para obter o ID do post
      cy.get('@createdLockSystem').then((ls) => {
        const postIdToDelete = ls.getPostId();
  
        expect(postIdToDelete).to.be.a('number', 'Valida que o ID armazenado é um número');
  
        return new Cypress.Promise((resolve) => {
          cy.request({
            method: 'DELETE',
            url: `https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.equal(200, 'Verificando se o DELETE retornou 200');
            cy.log(`Post com ID: ${postIdToDelete} excluído com sucesso.`);
            resolve(response);
          });
        });
      });
    });
  });
  