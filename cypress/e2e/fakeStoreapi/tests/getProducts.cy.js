describe('Testando API com Cypress - GET', function () {

    it('Deve realizar consulta via GET de todos os produtos', function () {

        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/Products',
            failOnStatusCode: false,
        }).then((response) => {
            let categoria = response.body[0];

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array')
            expect(categoria.category).to.exist
            expect(categoria.description).to.exist;
            expect(categoria.id).to.exist;
            expect(categoria.image).to.exist;
            expect(categoria.price).to.exist;
            expect(categoria.rating.count).to.exist;
            expect(categoria.rating.rate).to.exist;
            expect(categoria.title).to.exist;
        });

    });

    it('Deve realizar consulta via GET de um produtos pelo ID', function () {

        const data = 1
        
        cy.request({
            method: 'GET',
            url: `https://fakestoreapi.com/products/${data}`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(200);
            const consulta = response.body;
            expect(consulta.category).to.exist;
            expect(consulta.description).to.exist;
            expect(consulta.id).to.exist;
            expect(consulta.image).to.exist;
            expect(consulta.price).to.exist;
            expect(consulta.rating.count).to.exist;
            expect(consulta.rating.rate).to.exist;
            expect(consulta.title).to.exist;
        });
    });
});