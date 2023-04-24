import Fornecedor from "../Modelo/fornecedor.js";
import conectar from "./ConexaoLivro.js";

export default class FornecedorBD{

    async incluir(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = "INSERT INTO fornecedor(razaoS, nomeFantasia, cnpj, inscEstadual, celular, telefone, email, rua, numero, bairro, estado, cidade, cep, vendedor)\
                         VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            const valores = [fornecedor.razaoS, fornecedor.nomeFantasia, fornecedor.cnpj, fornecedor.inscEstadual, fornecedor.celular, fornecedor.telefone,
                            fornecedor.email, fornecedor.rua, fornecedor.numero, fornecedor.bairro, fornecedor.estado, fornecedor.cidade, fornecedor.cep, fornecedor.vendedor];
            await conexao.query(sql, valores);
        }
    }

    async alterar(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = "UPDATE fornecedor SET razaoS=?, nomeFantasia=?, inscEstadual=?, celular=?, telefone=?, email=?, rua=?, numero=?, bairro=?, estado=?, cidade=?, cep=?, vendedor=?\
                         WHERE cnpj=? ";
            const valores = [fornecedor.razaoS, fornecedor.nomeFantasia, fornecedor.inscEstadual, fornecedor.celular, fornecedor.telefone,
                fornecedor.email, fornecedor.rua, fornecedor.numero, fornecedor.bairro, fornecedor.estado, fornecedor.cidade, fornecedor.cep, fornecedor.vendedor, fornecedor.cnpj];
            await conexao.query(sql, valores);
        }
    }
    async excluir(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = "DELETE FROM fornecedor WHERE cnpj=?";
            const valores = [fornecedor.cnpj];
            await conexao.query(sql, valores);
        }
    }
    async consultarTodos(){
        const conexao = await conectar();
        const sql = "SELECT * FROM fornecedor";
        const [rows] = await conexao.query(sql);
        const listaFornecedores = [];
        for(const row of rows){
            const fornecedor = new Fornecedor(
                row["razaoS"],
                row["nomeFantasia"],
                row["cnpj"],
                row["inscEstadual"],
                row["celular"],
                row["telefone"],
                row["email"],
                row["rua"],
                row["numero"],
                row["bairro"],
                row["estado"],
                row["cidade"],
                row["cep"],
                row["vendedor"]
            );
            listaFornecedores.push(fornecedor);
        }
        return listaFornecedores;
    }
    async consultar(cnpj){
        const conexao = await conectar();
        const sql = "SELECT * FROM fornecedor WHERE cnpj=?";
        const valores = [cnpj];
        const [rows] = await conexao.query(sql, valores);
        var fornecedor = null;
        for( const row of rows){
            const fornecedor = new Fornecedor(
                row["razaoS"],
                row["nomeFantasia"],
                row["cnpj"],
                row["inscEstadual"],
                row["celular"],
                row["telefone"],
                row["email"],
                row["rua"],
                row["numero"],
                row["bairro"],
                row["estado"],
                row["cidade"],
                row["cep"],
                row["vendedor"]
            ).toJSON();
        }
        return fornecedor;
    }

}