const form = document.getElementById('pokedex');
const card = document.getElementById('card');
const status = document.getElementById('status');

// Mapa de nomes PT-BR para as stats da API
const statNames = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Atq. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidade',
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value.trim().toLowerCase();
  if (!name) return;

  // Estado de carregando
  status.textContent = 'Carregando...';
  status.className = '';
  card.classList.remove('visible');
  card.innerHTML = '';

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!res.ok) {
      throw new Error('Pokémon não encontrado');
    }

    const data = await res.json();

    // Tipos
    const typesBadges = data.types
      .map(t => `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`)
      .join('');

    // Estatísticas
    const statsHTML = data.stats
      .map(s => {
        const label = statNames[s.stat.name] || s.stat.name;
        const val = s.base_stat;
        return `
          <div class="stat-row">
            <span class="stat-label">${label}</span>
            <span class="stat-value">${val}</span>
          </div>`;
      })
      .join('');

    // Numero formatado com zeros (#001)
    const number = String(data.id).padStart(3, '0');

    card.innerHTML = `
      <div class="card-header">
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <h2>${data.name}</h2>
        <span class="card-number">#${number}</span>
        <div class="types">${typesBadges}</div>
      </div>
      <div class="card-stats">
        ${statsHTML}
      </div>
    `;

    card.classList.add('visible');
    status.textContent = '';

  } catch (err) {
    status.textContent = 'X ' + err.message;
    status.className = 'error';
    card.classList.remove('visible');
  }
});
