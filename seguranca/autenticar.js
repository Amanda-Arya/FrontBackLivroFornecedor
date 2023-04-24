export default function autenticar(requisicao, resposta, next) {
    // o next permite o que vem depois ser processado
    if (requisicao.session.usuarioLogado) {
        next();
    }
    else {
        resposta.redirect("/login.html");
    }
}