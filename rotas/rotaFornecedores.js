import { Router } from 'express';
import FornecedorCTRL from '../Controle/fornecedorCtrl.js';

const rotaFornecedores = new Router();
const fornecedorCTRL = new FornecedorCTRL();

rotaFornecedores
    .get('/', fornecedorCTRL.consultar)
    .get('/:cnpj', fornecedorCTRL.consultarCnpj)
    .post('/', fornecedorCTRL.gravar)
    .put('/', fornecedorCTRL.atualizar)
    .delete('/', fornecedorCTRL.excluir);

export default rotaFornecedores;