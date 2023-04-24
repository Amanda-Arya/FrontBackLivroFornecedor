import { Router } from 'express';
import LivroCTRL from '../Controle/livroCtrl.js';

const rotaLivros = new Router();
const livroCTRL = new LivroCTRL();

rotaLivros
    .get('/', livroCTRL.consultar)
    .get('/:codigo', livroCTRL.consultarCodigo)
    .post('/', livroCTRL.gravar)
    .put('/', livroCTRL.atualizar)
    .delete('/', livroCTRL.excluir);

export default rotaLivros;