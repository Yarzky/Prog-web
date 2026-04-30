const produtos = [
  { nome: 'Notebook', preco: 4500.00, categoria: 'Eletrônicos' },
  { nome: 'Camiseta', preco: 89.90, categoria: 'Roupas' },
  { nome: 'Smartphone', preco: 2999.50, categoria: 'Eletrônicos' },
  { nome: 'Tênis', preco: 250.00, categoria: 'Calçados' },
  { nome: 'Monitor', preco: 1200.00, categoria: 'Eletrônicos' }
];

const container = document.getElementById('container');

function renderizarProdutos() {
  container.innerHTML = '';
  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.categoria = produto.categoria;

    const nome = document.createElement('h3');
    nome.textContent = produto.nome;

    const preco = document.createElement('p');
    preco.classList.add('preco');
    preco.textContent = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const categoria = document.createElement('p');
    categoria.classList.add('categoria');
    categoria.textContent = produto.categoria;

    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(categoria);

    container.appendChild(card);
  });
}

renderizarProdutos();

const btnEletronicos = document.getElementById('btn-eletronicos');
btnEletronicos.addEventListener('click', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (card.dataset.categoria !== 'Eletrônicos') {
      card.classList.toggle('hidden');
    }
  });
});

// Button: Limpar
const btnLimpar = document.getElementById('btn-limpar');
btnLimpar.addEventListener('click', () => {
  container.innerHTML = '';
});
