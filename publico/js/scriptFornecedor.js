function Tel() {
  var tel = event.target.value;
  tel = tel.replace(/\D/g, "");
  tel = tel.replace(/^(\d)/, "($1");
  tel = tel.replace(/(.{3})(\d)/, "$1)$2");
  if (tel.length == 9) {
    tel = tel.replace(/(.{1})$/, "-$1");
  } else if (tel.length == 10) {
    tel = tel.replace(/(.{2})$/, "-$1");
  } else if (tel.length == 11) {
    tel = tel.replace(/(.{3})$/, "-$1");
  } else if (tel.length == 12) {
    tel = tel.replace(/(.{4})$/, "-$1");
  } else if (tel.length > 12) {
    tel = tel.replace(/(.{4})$/, "-$1");
  }
  event.target.value = tel;
}

function phoneMask(event) {
  var input = event.target;
  var phone = event.target.value;
  var length = phone.length;

  phone = phone.replace(/(\D)/g, "");

  if (length >= 11)
    phone = phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "($1) $2 $3-$4");
  if (length >= 8)
    phone = phone.replace(/^(\d{2})(\d{1})(\d{4})/, "($1) $2 $3-");
  if (length >= 4) phone = phone.replace(/^(\d{2})(\d{1})/, "($1) $2 ");
  if (length >= 3) phone = phone.replace(/^(\d{2})/, "($1) ");

  input.value = phone;
}
const urlBackend = 'http://localhost:3001/fornecedor';
var mensagem;

document.addEventListener("DOMContentLoaded", function (event) {
  var formulario = document.getElementById("form-cadastro");
  // atribui a funcao manipular submissao para ser executada no momento da ocorrrencia do formulario
  formulario.onsubmit = manipulaSubmit;
  mensagem = document.getElementById("mensagem");
  carregarTabela();
});

function resetForm() {
  document.getElementById('inputRazao').value = "";
  document.getElementById('inputNomeF').value = "";
  document.getElementById('inputCnpj').value = "";
  document.getElementById('inputIe').value = "";
  document.getElementById('inputCelular').value = "";
  document.getElementById('inputTelefone').value = "";
  document.getElementById('inputEmail').value = "";
  document.getElementById('inputRua').value = "";
  document.getElementById('inputNum').value = "";
  document.getElementById('inputBairro').value = "";
  document.getElementById('inputEstado').value = "";
  document.getElementById('inputCidade').value = "";
  document.getElementById('inputCep').value = "";
  document.getElementById('inputVendedor').value = "";

}
function novoFornecedor() {
  resetForm();
  let btnInserir = document.getElementById('inserir');
  btnInserir.removeAttribute('hidden');

  let btnAlterar = document.getElementById('alt');
  btnAlterar.setAttribute('hidden', true);
}


function caixaAltaRazao() {
  document.getElementById("inputRazao").value = document
    .getElementById("inputRazao")
    .value.toUpperCase();
}
function caixaAltaNomeF() {
  document.getElementById("inputNomeF").value = document
    .getElementById("inputNomeF")
    .value.toUpperCase();
}
function caixaAltaRua() {
  document.getElementById("inputRua").value = document
    .getElementById("inputRua")
    .value.toUpperCase();
}
function caixaAltaBairro() {
  document.getElementById("inputBairro").value = document
    .getElementById("inputBairro")
    .value.toUpperCase();
}
function caixaAltaCidade() {
  document.getElementById("inputCidade").value = document
    .getElementById("inputCidade")
    .value.toUpperCase();
}
function caixaAltaVendedor() {
  document.getElementById("inputVendedor").value = document
    .getElementById("inputVendedor")
    .value.toUpperCase();
}

function manipulaSubmit(evento) {
  if (validarFornecedor()) {

    gravarNoBackend();
  }
  evento.stopPropagation();
  evento.preventDefault();

}

function validarFornecedor() {
  let razaoS = document.getElementById("inputRazao").value;
  let nomeFantasia = document.getElementById("inputNomeF").value;
  let cnpj = document.getElementById("inputCnpj").value;
  let inscEstadual = document.getElementById("inputIe").value;
  let celular = document.getElementById("inputCelular").value;
  let telefone = document.getElementById("inputTelefone").value;
  let email = document.getElementById("inputEmail").value;
  let rua = document.getElementById("inputRua").value;
  let numero = document.getElementById("inputNum").value;
  let bairro = document.getElementById("inputBairro").value;
  let estado = document.getElementById("inputEstado").value;
  let cidade = document.getElementById("inputCidade").value;
  let cep = document.getElementById("inputCep").value;
  let vendedor = document.getElementById("inputVendedor").value;

  if (!razaoS || !nomeFantasia || !cnpj || !inscEstadual || !celular || !telefone || !email || !rua || !numero || !bairro || !estado || !cidade || !cep || !vendedor) {
    mensagem.innerHTML = ` <div class="alert alert-danger" role="alert">
    Por favor, preencha todos os campos!</div>`
    return false;
  }
  mensagem.innerHTML = "";
  return true;
}

function gravarNoBackend() {

  const data = {
    razaoS: document.getElementById("inputRazao").value,
    nomeFantasia: document.getElementById("inputNomeF").value,
    cnpj: document.getElementById("inputCnpj").value,
    inscEstadual: document.getElementById("inputIe").value,
    celular: document.getElementById("inputCelular").value,
    telefone: document.getElementById("inputTelefone").value,
    email: document.getElementById("inputEmail").value,
    rua: document.getElementById("inputRua").value,
    numero: document.getElementById("inputNum").value,
    bairro: document.getElementById("inputBairro").value,
    estado: document.getElementById("inputEstado").value,
    cidade: document.getElementById("inputCidade").value,
    cep: document.getElementById("inputCep").value,
    vendedor: document.getElementById("inputVendedor").value,
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
        alert("O fornecedor foi salvo com sucesso!");
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

  dados.forEach((fornecedor) => {
    let linha = document.createElement('tr');

    var data = {
      cnpj: fornecedor['cnpj'],
      nomeFantasia: fornecedor['nomeFantasia'],
      cidade: fornecedor['cidade'],
      celular: fornecedor['celular']
    }

    Object.values(data).forEach((valor) => {
      let coluna = document.createElement('td');
      coluna.textContent = valor;
      linha.appendChild(coluna);
    });

    let acoes = document.createElement('td');
    params = JSON.stringify(fornecedor).replace(/"/g, '&quot;');
    acoes.innerHTML = `<button type="button" class="btn" onclick="editar(${params}) ">🖋️</button> <button type="button" class="btn" onclick="excluir(${params})">❌</button>`;
    linha.appendChild(acoes);

    tabela.appendChild(linha);
  })
}
function editar(fornecedor) {
  document.getElementById("inputRazao").value = fornecedor.razaoS;
  document.getElementById("inputNomeF").value = fornecedor.nomeFantasia;
  document.getElementById("inputCnpj").value = fornecedor.cnpj;
  document.getElementById("inputIe").value = fornecedor.inscEstadual;
  document.getElementById("inputCelular").value = fornecedor.celular;
  document.getElementById("inputTelefone").value = fornecedor.telefone;
  document.getElementById("inputEmail").value = fornecedor.email;
  document.getElementById("inputRua").value = fornecedor.rua;
  document.getElementById("inputNum").value = fornecedor.numero;
  document.getElementById("inputBairro").value = fornecedor.bairro;
  document.getElementById("inputEstado").value = fornecedor.estado;
  document.getElementById("inputCidade").value = fornecedor.cidade;
  document.getElementById("inputCep").value = fornecedor.cep;
  document.getElementById("inputVendedor").value = fornecedor.vendedor;


  let btnAlterar = document.getElementById('alt');
  btnAlterar.removeAttribute('hidden');

  let btnInserir = document.getElementById('inserir');
  btnInserir.setAttribute('hidden', true);

}

function excluir(fornecedor) {
  fetch(urlBackend, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(fornecedor),
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
    razaoS: document.getElementById("inputRazao").value,
    nomeFantasia: document.getElementById("inputNomeF").value,
    cnpj: document.getElementById("inputCnpj").value,
    inscEstadual: document.getElementById("inputIe").value,
    celular: document.getElementById("inputCelular").value,
    telefone: document.getElementById("inputTelefone").value,
    email: document.getElementById("inputEmail").value,
    rua: document.getElementById("inputRua").value,
    numero: document.getElementById("inputNum").value,
    bairro: document.getElementById("inputBairro").value,
    estado: document.getElementById("inputEstado").value,
    cidade: document.getElementById("inputCidade").value,
    cep: document.getElementById("inputCep").value,
    vendedor: document.getElementById("inputVendedor").value,
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
        mensagem.innerHTML = ` <div class="alert alert-danger" role="alert">
      ${dados.mensagem}</div>`
      }
    })
    .catch((erro) => {
      mensagem.innerHTML = `<div class="alert alert-danger" role="alert">${erro.message}</div>`
    })

}

// function apagarFornecedor() {

//   if (confirm("Confirma a exclusão do item cadastrado")) {
//     const data = JSON.stringify({ cnpj: document.getElementById('inputCnpj').value });

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


