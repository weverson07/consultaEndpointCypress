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

// 🔹 Adiciona um comando Cypress para buscar um post da API
Cypress.Commands.add("fetchPostId", () => {
    const lockSystem = new LockSystem(); // Instância da classe

    cy.request({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts", // URL da API que retorna uma lista de posts
        failOnStatusCode: false, // Evita falha automática e permite captura do erro
    }).then((response) => {
        // Verificação de status da resposta
        expect(response.status).to.equal(200, "Verificando se API retornou 200");

        // Verifica se o body é um array e contém pelo menos um item
        expect(response.body).to.be.an("array").and.to.have.length.greaterThan(0);

        // Acessa o primeiro item do array e extrai o id
        const apiPostId = response.body[0].id; // Obtém o ID do primeiro post

        lockSystem.setPostId(apiPostId); // Define postId na classe
        cy.wrap(lockSystem).as("lockSystem"); // Armazena instância no alias

        // Valida se o postId da classe é igual ao recebido da API
        expect(lockSystem.getPostId()).to.equal(apiPostId);

        // Verifica se o primeiro item tem o título (title)
        expect(response.body[0]).to.have.property("title").and.to.be.a("string");

        const TitleResp = response.body[0].title; // Obtém o título do primeiro post

        lockSystem.setTitle(TitleResp); // Define o título na classe

        // Verifica se o título foi corretamente armazenado
        expect(lockSystem.getTitle()).to.equal(TitleResp);
    });
});

// 🔹 Chamada do comando antes do teste
before(() => {
    cy.fetchPostId();
});

// 🔹 Teste para validar o postId e título armazenados
it("Valida se o postId e título armazenados na classe são válidos", () => {
    cy.get("@lockSystem").should((lockSystem) => {
        // Verifica se o postId armazenado é um número e maior que 0
        expect(lockSystem.getPostId()).to.be.a("number").and.to.be.greaterThan(0);

        // Verifica se o título armazenado é uma string e tem um comprimento maior que 0
        expect(lockSystem.getTitle()).to.be.a("string").and.to.have.length.greaterThan(0);
    });
});
