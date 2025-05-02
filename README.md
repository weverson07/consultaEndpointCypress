✅ Testes de API com Cypress – Fake Store API
Este projeto contém testes automatizados em Cypress para validar os endpoints da Fake Store API..

📦 Estrutura

├──cypress/

├── e2e/

│── getProducts.cy.js

├── support/

│── e2e.js

│──cypress.config.js

│──package.json

🔧 Instalação
Clone o repositório (ou navegue até a pasta do projeto).

Instale as dependências:

npm install
▶️ Como Executar os Testes
📋 Modo interativo (GUI):

npx cypress open
⚙️ Modo headless (terminal):

npx cypress run
🧪 Exemplo de Teste: Verificar se o array de produtos está vazio
js

📌 Observações
O Cypress já inclui asserções via Chai, Sinon e jQuery.

A API usada é pública e pode retornar dados diferentes a cada execução.

Você pode trocar .should('have.length', 0) por .should('have.length.greaterThan', 0) caso queira validar se o array tem itens.
