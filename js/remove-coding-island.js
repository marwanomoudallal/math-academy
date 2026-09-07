// Coding Island was retired; keep the other future realms available.
(() => {
  const removeCodingMarkup = html => html
    .replace(/<article class="game-card card coding-card"[\s\S]*?<\/article>/, '')
    .replace(/<button class="zone l1[\s\S]*?<\/button>/, '')
    .replace('Seven playable realms', 'Six playable realms');

  const previousGameCards = App.gameCards.bind(App);
  App.gameCards = function gameCardsWithoutCoding() {
    return removeCodingMarkup(previousGameCards());
  };

  const previousMap = App.map.bind(App);
  App.map = function mapWithoutCoding() {
    return removeCodingMarkup(previousMap());
  };

  const previousNavigate = App.navigate.bind(App);
  App.navigate = function navigateWithoutCoding(page) {
    return previousNavigate(page === 'coding' ? 'games' : page);
  };
})();
