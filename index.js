import http from 'http';
import express from 'express';
import rotaLogin from './rotas/rotaLogin.js';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import rotaLivros from './rotas/rotaLivros.js';
import rotaFornecedores from './rotas/rotaFornecedores.js'

// express session das a capacipade de o servidor lembrar quem passou por ele

const hostname = 'localhost';
const porta = 3001;

const app = express();

app.use(session({
    secret:"M1nh4Ch4v3S3cr3t4",
    resave: true, // salvar o estado da sessão a cada requisição
    saveUninitialized: false, // nao criar sessão para quem não estiver logado
    cookie:{
        maxAge: 1000 * 60 * 30 // login valido por 30 min
    }
    }));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// que o aplicativo express é informado para 
//disponiblizar o conteudo da pasta para os usuários

// a ordem de declarações de funcionalidade de uma aplicaçãp express é importante
app.use("/login", rotaLogin);
app.use("/livros", rotaLivros);
app.use("/fornecedor", rotaFornecedores);
app.use(express.static('./publico'));
app.use(autenticar, express.static('./privado')); // acesso ao cadastro.html

const servidor = http.createServer(app);

servidor.listen(porta, hostname, () =>{
    console.log(`Servidor escutando em http:// ${hostname}: ${porta}`);
});
