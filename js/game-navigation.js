// Opens playable realms on the first click from Home, Map, or All Games.
(() => {
  const playableGames = new Set(['math', 'fraction', 'typing', 'memory']);

  // Render only the requested game. The original object literal evaluated all
  // four render functions and crashed when an unvisited game had no state yet.
  App.renderGame = function renderSelectedGame(game) {
    const renderers = {
      math: () => MathBattle.render(),
      fraction: () => FractionKingdom.render(),
      typing: () => TypingDefense.render(),
      memory: () => MemoryGame.render()
    };
    if (!renderers[game]) return;
    this.current = game;
    const screen = document.querySelector('#screen');
    screen.className = 'screen';
    screen.innerHTML = renderers[game]();
    this.bind();
    if (game === 'math') document.querySelector('#math-answer')?.focus();
    if (game === 'typing') document.querySelector('#typing-input')?.focus();
    this.hud();
  };

  document.addEventListener('click', event => {
    const destination = event.target.closest('[data-page]')?.dataset.page;
    if (!playableGames.has(destination)) return;

    event.preventDefault();
    event.stopPropagation();
    App.navigate(destination);
  }, true);

  // Make card-style links keyboard accessible as well.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.game-card[data-page]');
    if (!card || !playableGames.has(card.dataset.page)) return;
    event.preventDefault();
    App.navigate(card.dataset.page);
  });
})();
