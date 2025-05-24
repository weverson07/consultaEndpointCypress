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
    const lockSystem = new LockSystem();
  
    before(() => {
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
        expect(response.body.title).to.equal(newPost.title);
  
        lockSystem.setPostId(response.body.id);
        lockSystem.setTitle(response.body.title);
  
        cy.wrap(lockSystem).as('createdLockSystem'); // Alias registrado no `before`
      });
    });
  
    it('Deve atualizar o post criado anteriormente com novos dados (usando alias e Promise)', () => {
      cy.get('@createdLockSystem').then((ls) => {
        const postIdToUpdate = ls.getPostId();
        const updatedPost = {
          title: 'Título atualizado pelo método PUT',
          body: 'Conteúdo do post atualizado para teste',
          userId: 1,
        };
  
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
  
          ls.setTitle(response.body.title);
  
          expect(ls.getPostId()).to.equal(postIdToUpdate);
          expect(ls.getTitle()).to.equal(updatedPost.title);
  
          cy.log(`Post com ID: ${postIdToUpdate} atualizado com sucesso.`);
        });
      });
    });
  
    it('Deve excluir o post criado e atualizado anteriormente (usando alias e Promise)', () => {
      cy.get('@createdLockSystem').then((ls) => {
        const postIdToDelete = ls.getPostId();
  
        cy.request({
          method: 'DELETE',
          url: `https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(200, 'Verificando se o DELETE retornou 200');
          cy.log(`Post com ID: ${postIdToDelete} excluído com sucesso.`);
        });
      });
    });
  });
  