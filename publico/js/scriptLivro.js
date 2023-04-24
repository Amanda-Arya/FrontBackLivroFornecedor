const urlBackend = 'http://localhost:3001/livros';
var mensagem;

document.addEventListener("DOMContentLoaded", function (event) {
  var formulario = document.getElementById("form-cadastro");
  // atribui a funcao manipular submissao para ser executada no momento da ocorrrencia do formulario
  formulario.onsubmit = manipulaSubmit;
  mensagem = document.getElementById("mensagem");
  carregarTabela();
});

function resetForm() {
  document.getElementById('inputNome').value = "";
  document.getElementById('inputAutor').value = "";
  document.getElementById('inputEditora').value = "";
  document.getElementById('inputGenero').value = "";
}

function novoLivro() {
  resetForm();
  let btnInserir = document.getElementById('inserir');
  btnInserir.removeAttribute('hidden');

  let btnAlterar = document.getElementById('alt');
  btnAlterar.setAttribute('hidden', true);
}

function caixaAltaNome() {
  document.getElementById("inputNome").value = document
    .getElementById("inputNome")
    .value.toUpperCase();
}
function caixaAltaAutor() {
  document.getElementById("inputAutor").value = document
    .getElementById("inputAutor")
    .value.toUpperCase();
}
function caixaAltaEditora() {
  document.getElementById("inputEditora").value = document
    .getElementById("inputEditora")
    .value.toUpperCase();
}

function manipulaSubmit(evento) {
  if (validarLivro()) {

    gravarNoBackend();
  }
  evento.stopPropagation();
  evento.preventDefault();

}

function validarLivro() {
  let nome = document.getElementById("inputNome").value;
  let autor = document.getElementById("inputAutor").value;
  let editora = document.getElementById("inputEditora").value;
  let genero = document.getElementById("inputGenero").value;

  if (!nome || !autor || !editora || !genero) {
    mensagem.innerHTML = ` <div class="alert alert-danger" role="alert">
    Por favor, preencha todos os campos!</div>`
    return false;
  }
  mensagem.innerHTML = "";
  return true;
}

function gravarNoBackend() {

  const data = {
    nome: document.getElementById("inputNome").value,
    autor: document.getElementById("inputAutor").value,
    editora: document.getElementById("inputEditora").value,
    genero: document.getElementById("inputGenero").value
  };

  fetch(urlBackend, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data),
  })
    .then((resposta) => {
      return resposta.json();
    })
    .then((dados) => {
      if (dados.status) {
        alert("O livro foi salvo com sucesso!");
        carregarTabela();
        
      }
      else {
        mensagem.innerHTML = ` <div class="alert alert-danger" role="alert">
      ${dados.mensagem}</div>`
      }
    })
    .catch((erro) => {
      mensagem.innerHTML = `<div class="alert alert-danger" role="alert">${erro.message}</div>`
    });
}

function carregarTabela() {
  fetch(urlBackend, {
    method: "GET",
  })
    .then((resposta) => resposta.json())
    .then((data) => montarTabela(data))
    .catch((erro) => {
      mensagem.innerHTML = `<div class="alert alert-danger" role="alert">${erro.message}</div>`
    })
}

function montarTabela(dados) {
  tabela = document.querySelector('#table tbody');
  tabela.textContent = ''

  dados.forEach((livro) => {
    let linha = document.createElement('tr');

    Object.values(livro).forEach((valor) => {
      let coluna = document.createElement('td');
      coluna.textContent = valor;
      linha.appendChild(coluna);
    });

    let acoes = document.createElement('td');
    params = JSON.stringify(livro).replace(/"/g, '&quot;');
    acoes.innerHTML = `<button type="button" class="btn" onclick="editar(${params}) ">🖋️</button> <button type="button" class="btn" onclick="excluir(${params})">❌</button>`;
    linha.appendChild(acoes);

    tabela.appendChild(linha);
  })
}

function editar(livro) {
  document.getElementById('inputCodigo').value = livro.codigo;
  document.getElementById('inputNome').value = livro.nome;
  document.getElementById('inputAutor').value = livro.autor;
  document.getElementById('inputEditora').value = livro.editora
  document.getElementById('inputGenero').value = livro.genero;

  let btnAlterar = document.getElementById('alt');
  btnAlterar.removeAttribute('hidden');

  let btnInserir = document.getElementById('inserir');
  btnInserir.setAttribute('hidden', true);

}

function excluir(livro) {
  fetch(urlBackend, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(livro),
  })
    .then((resposta) => resposta.json())

    .then((dados) => {
      if (dados.status) {

        carregarTabela();
      }
      else {
        mensagem.innerHTML = ` <div class="alert alert-danger" role="alert">
      ${dados.mensagem}</div>`
      }
    })
    .catch((erro) => {
      mensagem.innerHTML = `<div class="alert alert-danger" role="alert">${erro.message}</div>`
    })
}

function alterar() {
  const data = {
    codigo: document.getElementById('inputCodigo').value,
    nome: document.getElementById('inputNome').value,
    autor: document.getElementById('inputAutor').value,
    editora: document.getElementById('inputEditora').value,
    genero: document.getElementById('inputGenero').value,
  }
  fetch(urlBackend, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data),
  })
    .then((resposta) => resposta.json())
    .then((dados) => {
      if (dados.status) {
        alert(dados.mensagem);
        carregarTabela();
      }
      else {
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">
      ${dados.mensagem}</div>`
      }
    })
    .catch((erro) => {
      mensagem.innerHTML = `<div class="alert alert-danger" role="alert">${erro.message}</div>`
    })

}

// function apagarLivro() {

//   if (confirm("Confirma a exclusão do item cadastrado")) {
//     const data = JSON.stringify({ codigo: document.getElementById('codigo').value });

//     fetch(urlBackend, {
//       method: 'DELETE',
//       headers: { "content-Type": "application/json" }["content-Type"],
//       body: data,
//     })
//       .then((resposta) => {
//         if (resposta.ok)
//           return resposta.json();
//       })
//       .then((dados) => {
//         mensagem.innerHTML = `<div class="alert alert-sucess" role="alert">${dados.mensagem}</div>`
//         selecionarRegistro();
//         carregarTabela();
//       })
//       .catch((erro) => {
//         mensagem.innerHTML = `<div class="alert alert-danger" role="alert">${erro.message}</div>`
//       });
//   }
//   else {
//     selecionarRegistro(); // preparar a tela para seu estado padrao
//   }
// }

