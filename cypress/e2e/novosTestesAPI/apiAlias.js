class Usuarios {
    constructor() {
        this.id = null;
        this.username = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.password = null;
        this.phone = null;
        this.userStatus = null;
    }

    SetId(id){
        this.SetId = id;
    }

    GetId(){
        return this.GetId();
    }

    SetUsername(username){
        this.SetUsername = username;
    }

    GetUsername(){
        return this.GetUsername();
    }

    SetFirstName(firstName){
        this.SetFirstName = firstName;
    }

    GetFirstName(){
        return this.GetFirstName();
    }

    SetLastName(lastName){
        this.SetLastName = lastName;
    }

    GetLastName(){
        return this.GetLastName();
    }

    SetEmail(email){
        this.SetEmail = email;
    }

    GetEmail(){
        return this.GetEmail();
    }

    SetPassword(password){
        this.SetPassword = password;
    }

    GetPassword(){
        return this.GetPassword();
    }

    SetPhone(phone){
        this.SetPhone = phone;
    }

    GetPhone(){
        return this.GetPhone();
    }

    SetUserStatus(userStatus){
        this.SetUserStatus = userStatus;
    }

    GetUserStatus(){
        return this.GetUserStatus();
    }

    toJson() {
        return {
            id: this.id,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            phone: this.phone,
            userStatus: this.userStatus
        };
    }

    // const dadosPost = [
    //     {
    //         id: 0,
    //         username: "usuário teste",
    //         firstName: "novo",
    //         lastName: "teste",
    //         email: "a@ahotmail.com",
    //         password: "teste",
    //         phone: "1194778-83828",
    //         userStatus: 1
    //     }
    // ]

    construtorDeValidacao() {
        const user = new Usuarios();
        user.SetId(11);
        user.SetUsername("joaosilva"); // Adicione este método se não existir
        user.SetFirstName("João");
        user.SetLastName("Silva");
        user.SetEmail("joao.silva@example.com");
        user.SetPassword("SenhaSegura123");
        user.SetPhone("11999999999");
        user.SetUserStatus(1);
    
        return user;
    }
}

export default Usuarios


// // it('Deve realizar PUT e atualizar os dados', function () {
    //     cy.get('@usuarioCriado').then((res) => {
    //         const userData = res.toJson();
    //         const { username } = userData;
    //         cy.log(username);
    //         userData.firstName = "NomeAtualizado";
    //     })
    //     const userData = user.construtorDeValidacao();
    //     cy.request({
    //         method: 'PUT',
    //         url: `https://petstore.swagger.io/v2/user/${username}`,
    //         body:[{userData}],
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         const codigoAleatorio = response.body.message
    //         expect(response.status).to.equal(200);
    //         expect(response.body.message).to.equal(codigoAleatorio)
    //     })
    // })