rotaLogin.get('/',(requisicao, resposta) => {
    resposta.redirect("/login.html"); // o usuario sera rediricionado para login.html quando acessar http://localhost:3001/login
});