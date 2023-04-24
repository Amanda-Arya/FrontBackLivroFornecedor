import Livro from '../Modelo/livro.js'

// essa classe manipula/controla a entidade Livro
export default class LivroCTRL {
    
  // metodo responsavel por gravar os dados de um livro das requisiçoes (post) vindas da net por meio do HTTP
  // recupera dados de um livro (json) vindos da requisicao
  
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const autor = dados.autor;
      const editora = dados.editora;
      const genero = dados.genero;
      if (nome && autor && editora && genero) {
        // grava o livro
        const livro = new Livro(0, nome, autor, editora, genero);

        //chama metodo Assicrono gravar que instanciua a camada de persistencia e grava o livro no banco
        livro
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "O livro foi salvo com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,

              // resposta de erro vinda do servidor
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados corretamente!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou livro no formato Json nao foi reconhecido!",
      });
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      const nome = dados.nome;
      const autor = dados.autor;
      const editora = dados.editora;
      const genero = dados.genero;
      if (codigo && nome && autor && editora && genero) {
        const livro = new Livro(codigo, nome, autor, editora, genero);

        //chama metodo Assicrono atualizar que instanciua a camada de persistencia e altera o livro no banco
        livro
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "O livro foi atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,

              // resposta de erro vinda do servidor
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados corretamente!",
        });''
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou livro no formato Json nao foi reconhecido!",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;

      if (codigo) {
        // grava o livro
        const livro = new Livro(codigo);

        //chama metodo Assicrono remover do banco que instanciua a camada de persistencia e remove o livro.
        livro
          .removerDoBancoDados()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "O livro foi excluido com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,

              // resposta de erro vinda do servidor
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados corretamente!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou livro no formato Json nao foi reconhecido!",
      });
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "GET") {
        const livro = new Livro();
        //chama metodo Assicrono que recupera os livros cadastrados no banco de dados
        livro
          .consultarTodos()
          .then((listaLivros) => {
            resposta.status(200).json(listaLivros);
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou livro no formato Json nao foi reconhecido!",
      });
    }
  }

  consultarCodigo(requisicao, resposta) {
    resposta.type("application/json");
    const codigo = requisicao.params["codigo"];

    if (requisicao.method === "GET") {
      const livro = new Livro();

      //chama metodo Assicrono que recupera os livros cadastrados no banco de dados
      livro
        .consultarCodigo(codigo)
        .then((livro) => {
          resposta.status(200).json(livro);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou livro no formato Json nao foi reconhecido!",
      });
    }
  }
}
