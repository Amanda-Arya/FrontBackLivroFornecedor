import Livro from "../Modelo/livro.js";
import conectar from "./ConexaoLivro.js";

export default class LivroBD {

  async incluir(livro) {
    // verifica se livro é instancia de Livro, verifica conexao
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql = "INSERT INTO livro(nome, autor, editora, genero)VALUES(?,?,?,?)";
      const valores = [livro.nome, livro.autor, livro.editora, livro.genero];
      const resultado = await conexao.query(sql, valores);
      return await resultado[0].insertId;
      // retorna o cod gerado pelo banco de dados qdo a coluna for auto incremento
    }
  }
  async alterar(livro) {
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql =
        "UPDATE livro SET nome=?,autor=?,editora=?,genero=?\
                                            WHERE cod_livro=?";
      //codigo é a chave primaria
      const valores = [
        livro.nome,
        livro.autor,
        livro.editora,
        livro.genero,
        livro.codigo,
      ];
      await conexao.query(sql, valores);
    }
  }
  async excluir(livro) {
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql = "DELETE FROM livro WHERE(cod_livro=?)";

      const valores = [livro.codigo];
      await conexao.query(sql, valores);
    }
  }

  async consultarTodos() {
    const conexao = await conectar();

    const sql = "SELECT * FROM livro";
    const [rows] = await conexao.query(sql);
    const listaLivros = [];
    for (const row of rows) {
      const livro = new Livro(
        row["cod_livro"],
        row["nome"],
        row["autor"],
        row["editora"],
        row["genero"]
      );
      listaLivros.push(livro);
    }
    return listaLivros;
  }

  async consultar(nome) {
    const conexao = await conectar();

    const sql = "SELECT * FROM livro WHERE nome LIKE ?";
    // nao importa o que ta a direita ou a esquerda do nome, importante é recuperar a informação do banco
    const valores = ["%" + nome + "%"];
    // traz as linhas de informaçao
    const [rows] = await conexao.query(sql, valores);
    const listaLivros = [];
    for (const row of rows) {
      const livro = new Livro(
        row["cod_livro"],
        row["nome"],
        row["autor"],
        row["editora"],
        row["genero"]
      );
      listaLivros.push(livro);
    }
    return listaLivros;
  }
  async consultarCodigo(codigo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM livro WHERE cod_livro = ?";
    const valores = [codigo];
    // traz as linhas de informaçao
    const [rows] = await conexao.query(sql, valores);
    var livro = null;
    for (const row of rows) {
      livro = new Livro(
        row["cod_livro"],
        row["nome"],
        row["autor"],
        row["editora"],
        row["genero"]
      ).toJSON();
    }
    return livro;
  }
}
