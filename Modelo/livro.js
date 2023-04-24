import LivroBD from "../Persistencia/livroBD.js";

export default class Livro{
    #cod_livro; // # define que um atributo é privado
    #nome;
    #autor;
    #editora;
    #genero;
    

    // metodo construtor que define informações necessarias para se criar objeto 
    constructor(cod_livro, nome, autor, editora, genero) {
        this.#cod_livro = cod_livro;
        this.#nome = nome;
        this.#autor = autor;
        this.#editora = editora;
        this.#genero = genero;
    }
        
    // nos metodos get e set pode-se implementar regras de nogocios
    // metodos publicos get e set
    get codigo(){
        return this.#cod_livro;
    }
    set codigo(novoCodigo){

            this.#cod_livro = novoCodigo;
    }
    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        if(novoNome != "") // regra de negocio que impede que clientes existam com nome vazio
            this.#nome = novoNome;
    }

    get autor(){
        return this.#autor;
    }
    set autor(novoAutor){
        this.#autor = novoAutor;
    }

    get editora(){
        return this.#editora;
    }
    set editora(novaEditora){
        this.#editora = novaEditora;
    }
    get genero(){
        return this.#genero;
    }
    set genero(novoGenero){
        this.#genero = novoGenero;
    }
    
    // override ou sobrescrita do metodo toJson
    toJSON(){
        return{
            "codigo": this.#cod_livro,
            "nome": this.#nome,
            "autor": this.#autor,
            "editora": this.#editora,
            "genero":this.#genero,
            
        }
    }
    async gravar(){
        // instancia da classe LivroBD
        const livroBD = new LivroBD();
        this.cod_livro = await livroBD.incluir(this);
        // o codigo gerado pelo banco é atribuido ao codigo do livro
    }
    async atualizar(){
        const livroBD = new LivroBD();
        await livroBD.alterar(this);
    }

    async removerDoBancoDados(){
        const livroBD = new LivroBD();
        await livroBD.excluir(this);
    }
    async consultarTodos() {
        const livroBD = new LivroBD();
        return await livroBD.consultarTodos();
    }

    async consultar(nome){
        const livroBD = new LivroBD();
        const livro = await livroBD.consultar(nome);
        return livro;
    }

    async consultarCodigo(codigo){
        const livroBD = new LivroBD();
        const livro = await livroBD.consultarCodigo(codigo);
        return livro;

    }
}