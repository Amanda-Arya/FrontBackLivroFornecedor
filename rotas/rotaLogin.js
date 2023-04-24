// essa funcionalidade visa interceptar as requisicoes do usuario desviando o fluxo de execucao do servidor,
//  permitindo uma janela de oportunidade para processar alguma coisa 

// router é uma classe que fornece uma micro aplicação express
import { Router } from "express"; 

const rotaLogin = new Router();

// precisa processar um par de requisição e produzir uma resposta
rotaLogin.get('/',(requisicao, resposta) => {
    resposta.redirect("/login.html"); // o usuario sera rediricionado para login.html quando acessar http://localhost:3001/login
});

rotaLogin.post('/',(requisicao, resposta) =>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario && senha && usuario === 'Amanda' && senha === 'Node2023') // consulta banco de dados
    {
        requisicao.session.usuarioLogado=true;
        resposta.redirect('/livros.html');
        //procede com autenticação do usuario
    }else{
        resposta.send("<p>Falha no login</p><br/> <button onclick ='history.back()'>Tente Novamente</button>");
    }
    
}); // uma requisicao tipo post envia para o servidor dados vindos do navegador, por exmplo usuario e senha informdos pelo formulario

export default rotaLogin;