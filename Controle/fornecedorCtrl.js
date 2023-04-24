import Fornecedor from "../Modelo/fornecedor.js";

export default class FornecedorCTRL{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const razaoS = dados.razaoS;
            const nomeFantasia = dados.nomeFantasia;
            const cnpj = dados.cnpj;
            const inscEstadual = dados.inscEstadual;
            const celular = dados.celular;
            const telefone = dados.telefone;
            const email = dados.email;
            const rua = dados.rua;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const estado = dados.estado;
            const cidade = dados.cidade;
            const cep = dados.cep;
            const vendedor = dados.vendedor;
            if(razaoS && nomeFantasia && cnpj && inscEstadual && celular && telefone && email && rua && numero && bairro && estado && cidade && cep && vendedor){
                 const fornecedor = new Fornecedor(razaoS, nomeFantasia, cnpj, inscEstadual, celular, telefone, email, rua, numero, bairro, estado, cidade, cep, vendedor);

                 fornecedor.gravar()
                 .then(()=> {

                    resposta.status(200).json({
                        status: true,
                        mensagem: "O fornecedor foi salvo com sucesso!",
                    });
                 })
                 .catch((erro) =>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message,

                    });
                 }); 
            }
            else {
                  resposta.status(400).json({
                  status: false,
                  mensagem: "Informe todos os dados corretamente!",
                });
              }
            } else {
                resposta.status(400).json({
                status: false,
                mensagem:
                  "Método não permitido ou fornecedor no formato Json nao foi reconhecido!",
              });
            } 
        }
    
    atualizar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method = "PUT" && requisicao.is("application/json")){

            const dados = requisicao.body;
            const razaoS = dados.razaoS;
            const nomeFantasia = dados.nomeFantasia;
            const cnpj = dados.cnpj;
            const inscEstadual = dados.inscEstadual;
            const celular = dados.celular;
            const telefone = dados.telefone;
            const email = dados.email;
            const rua = dados.rua;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const estado = dados.estado;
            const cidade = dados.cidade;
            const cep = dados.cep;
            const vendedor = dados.vendedor;
            if(razaoS && nomeFantasia && cnpj && inscEstadual && celular && telefone && email && rua && numero && bairro && estado && cidade && cep && vendedor){
                const fornecedor = new Fornecedor(razaoS, nomeFantasia, cnpj, inscEstadual, celular, telefone, email, rua, numero, bairro, estado, cidade, cep, vendedor);
                fornecedor.atualizar()
                .then(()=>{
                    resposta.status(200).json({
                        status: true,
                        mensagem: "O fornecedor foi atualizado com sucesso!"
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message,
                    });
                });
            }else{
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados corretamente!",
                  });
                }
            
        }else {
            resposta.status(400).json({
              status: false,
              mensagem:
                "Método não permitido ou fornecedor no formato Json nao foi reconhecido!",
            });
          }
    }
    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
          const dados = requisicao.body;
          const cnpj = dados.cnpj;
    
          if (cnpj) {
         
            const fornecedor = new Fornecedor();
            fornecedor.cnpj = cnpj;
    
            //chama metodo Assicrono remover do banco que instanciua a camada de persistencia e remove o livro.
            fornecedor
              .removerDoBancoDados()
              .then(() => {
                resposta.status(200).json({
                  status: true,
                  mensagem: "O fornecedor foi excluido com sucesso!",
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
              "Método não permitido ou fornecedor no formato Json nao foi reconhecido!",
          });
        }
      }
      consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            const fornecedor = new Fornecedor();
            //chama metodo Assicrono que recupera os fornecedores cadastrados no banco de dados
            fornecedor
              .consultarTodos()
              .then((listaFornecedores) => {
                resposta.status(200).json(listaFornecedores);
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
              "Método não permitido ou fornecedor no formato Json nao foi reconhecido!",
          });
        }
      }
      consultarCnpj(requisicao, resposta) {
        resposta.type("application/json");
        const cnpj = requisicao.params["cnpj"];
    
        if (requisicao.method === "GET") {
          const fornecedor = new Fornecedor();
    
          //chama metodo Assicrono que recupera os fornecedores cadastrados no banco de dados
          fornecedor
            .consultar(cnpj)
            .then((fornecedor) => {
              resposta.status(200).json(fornecedor);
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
              "Método não permitido ou fornecedor no formato Json nao foi reconhecido!",
          });
        }
      }
      
}