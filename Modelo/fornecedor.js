import FornecedorBD from "../Persistencia/fornecedorBD.js";

export default class Fornecedor {

    #razaoS;
    #nomeFantasia;
    #cnpj;
    #inscEstadual;
    #celular;
    #Telefone;
    #email;
    #rua;
    #numero;
    #bairro;
    #estado;
    #cidade;
    #cep;
    #vendedor;

    constructor(razaoS, nomeFantasia, cnpj, inscEstadual, celular, telefone, email, rua, numero, bairro, estado, cidade, cep, vendedor) {

        this.#razaoS = razaoS;
        this.#nomeFantasia = nomeFantasia;
        this.#cnpj = cnpj;
        this.#inscEstadual = inscEstadual;
        this.#celular = celular;
        this.#Telefone = telefone;
        this.#email = email;
        this.#rua = rua;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#estado = estado;
        this.#cidade = cidade;
        this.#cep = cep;
        this.#vendedor = vendedor;
    }
    get razaoS() {
        return this.#razaoS;
    }
    set razaoS(novaRazao) {
        this.#razaoS = novaRazao;
    }
    get nomeFantasia() {
        return this.#nomeFantasia
    }
    set nomeFantasia(novoNome) {
        this.#nomeFantasia = novoNome;
    }
    get cnpj() {
        return this.#cnpj;
    }
    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }
    get inscEstadual() {
        return this.#inscEstadual;
    }
    set inscEstadual(novaIe) {
        this.#inscEstadual = novaIe;
    }
    get celular() {
        return this.#celular;
    }
    set celular(novoCel) {
        this.#celular = novoCel;
    }
    get telefone() {
        return this.#Telefone;
    }
    set telefone(novoTel) {
        this.#Telefone = novoTel;
    }
    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }
    get rua() {
        return this.#rua;
    }
    set rua(novaRua) {
        this.#rua = rua;
    }
    get numero() {
        return this.#numero;
    }
    set numero(novoNum) {
        this.#numero = novoNum;
    }
    get bairro() {
        return this.#bairro
    }
    set bairro(novoBairro) {
        this.#bairro = bairro;
    }
    get estado() {
        return this.#estado;
    }
    set estado(novoEst) {
        this.#estado = novoEst;
    }
    get cidade() {
        return this.#cidade;
    }
    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }
    get cep() {
        return this.#cep;
    }
    set cep(novoCep) {
        this.#cep = novoCep;
    }
    get vendedor() {
        return this.#vendedor;
    }
    set vendedor(novoVendedor) {
        this.#vendedor = novoVendedor;
    }

    toJSON() {
        return {
            "razaoS": this.#razaoS,
            "nomeFantasia": this.#nomeFantasia,
            "cnpj": this.#cnpj,
            "inscEstadual": this.#inscEstadual,
            "celular": this.#celular,
            "telefone": this.#Telefone,
            "email": this.#email,
            "rua": this.#rua,
            "numero": this.#numero,
            "bairro": this.#bairro,
            "estado": this.#estado,
            "cidade": this.#cidade,
            "cep": this.#cep,
            "vendedor": this.#vendedor,

        }
    }
    async gravar() {

        const fornecedorBD = new FornecedorBD();
        this.cnpj = await fornecedorBD.incluir(this);

    }
    async atualizar() {
        const fornecedorBD = new FornecedorBD();
        await fornecedorBD.alterar(this);
    }

    async removerDoBancoDados() {
        const fornecedorBD = new FornecedorBD();
        await fornecedorBD.excluir(this);
    }
    async consultarTodos() {
        const fornecedoroBD = new FornecedorBD();
        return await fornecedoroBD.consultarTodos();
    }

    async consultar(cnpj) {
        const fornecedorBD = new FornecedorBD();
        const fornecedor = await fornecedorBD.consultar(cnpj);
        return fornecedor;
    }

}