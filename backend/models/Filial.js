import { readAll } from '../config/database.js';

const listarFilial = async () => {
  try {
    const todos = readAll('filiais');
    return todos;
  } catch (err) {
    console.error('Erro model ao listar filiais: ', err);
  }
};

export { listarFilial };
