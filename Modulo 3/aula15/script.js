const form = document.querySelector('form');
const list = document.querySelector('#lista-tarefas');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const nome = document.querySelector('#nome').value.trim();
  if (nome === '') return;

  const li = document.createElement('li');

  const texto = document.createElement('span');
  texto.textContent = nome;
  texto.style.cursor = 'pointer';
  texto.addEventListener('click', function () {
    texto.style.textDecoration = texto.style.textDecoration === 'line-through' ? '' : 'line-through';
  });

  const btnDeletar = document.createElement('button');
  btnDeletar.textContent = 'X';
  btnDeletar.className = 'delete-button';
  btnDeletar.addEventListener('click', function () {
    list.removeChild(li);
  });

  li.appendChild(texto);
  li.appendChild(btnDeletar);
  list.appendChild(li);

  document.querySelector('#nome').value = '';
});
