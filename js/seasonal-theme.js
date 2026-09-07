// Automatically dress the entire academy for the current season.
(() => {
  const month = new Date().getMonth() + 1;
  const season = month === 10 ? 'halloween' : (month === 12 || month <= 2) ? 'winter' : month >= 6 && month <= 8 ? 'summer' : 'academy';
  document.documentElement.dataset.season = season;
  document.body.dataset.season = season;
})();
