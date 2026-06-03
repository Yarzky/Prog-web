import Tarefa from '../models/tarefa.js';

export const listar = async (req, res) => {
  res.status(200).json(Tarefa);
};


export const criar = async (req, res) => {
  const { descricao } = req.body;
  const novaTarefa = {
    id: Tarefa.length > 0 ? Tarefa[Tarefa.length - 1].id + 1 : 1,
    descricao,
    concluida: false
  };
  Tarefa.push(novaTarefa);
  res.status(201).json(novaTarefa);
};

export const atualizar = async (req, res) => {
  const { id } = req.params;
  const { descricao, concluida } = req.body;
  const index = Tarefa.findIndex(t => t.id === parseInt(id));

  if (index !== -1) {
    Tarefa[index] = { ...Tarefa[index], descricao, concluida };
    res.status(200).json(Tarefa[index]);
  } else {
    res.status(404).json({ mensagem: 'Tarefa não encontrada' });
  }
};

export const remover = async (req, res) => {
  const { id } = req.params;
  const index = Tarefa.findIndex(t => t.id === parseInt(id));

  if (index !== -1) {
    const removida = Tarefa.splice(index, 1);
    res.status(200).json(removida[0]);
  } else {
    res.status(404).json({ mensagem: 'Tarefa não encontrada' });
  }
};
