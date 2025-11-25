import { listarFilial } from '../models/Filial.js';

const listarFilialController = async (req, res) => {
  try {
    const filiais = await listarFilial();
    const soFiliais = filiais.slice(1);
    console.log(soFiliais);
    res.status(200).json(soFiliais);
  } catch (err) {
    console.error('Erro ao listar filiais: ', err);
    res.status(500).json({ mensagem: 'Erro ao listar filiais' });
  }
};

export { listarFilialController };
