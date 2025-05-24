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
    const titleValidation = 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
    cy.request({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/", // Busca um post específico
        qs: { id: 1, id: 1, title:  titleValidation}, // Passa o parâmetro de consulta 'id=1'
        failOnStatusCode: false, // Evita falha automática e permite captura do erro
    }).then((response) => {
        expect(response.status).to.equal(200, "Verificando se API retornou 200");

        // Verifica se o body é um array e contém pelo menos um item
        expect(response.body).to.be.an("array").and.to.have.length.greaterThan(0);

        //   const apiPostId = Array.isArray(response.body) ? response.body[0, 1] : response.body;
        const apiPostId = response.body[0].id; // Obtém o ID do post

        //response.body[0];

        lockSystem.setPostId(apiPostId); // Define postId na classe
        cy.wrap(lockSystem).as("lockSystem"); // Armazena instância no alias

        // Valida se o postId da classe é igual ao recebido da API
        expect(lockSystem.getPostId()).to.equal(apiPostId);

        const TitleResp = response.body[0].title;

        lockSystem.setTitle(TitleResp);

        expect(lockSystem.getTitle()).to.equal(TitleResp)
    });
});

// 🔹 Chamada do comando antes do teste
before(() => {
    cy.fetchPostId();
});

// 🔹 Teste para validar o postId armazenado
it("Valida se o postId armazenado na classe é válido", () => {
    cy.get("@lockSystem").should((lockSystem) => {
        expect(lockSystem.getPostId()).to.be.a("number").and.to.be.greaterThan(0);
        expect(lockSystem.getTitle()).to.be.a("string").and.to.have.length.greaterThan(0);
    });
});
