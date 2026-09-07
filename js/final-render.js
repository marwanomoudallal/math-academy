// Render once after every extension has registered its home-screen content.
// This keeps Hero Adventures and the reward calendar visible after reloads.
(() => {
  if (App.current === 'coding') App.current = 'games';
  App.render();
})();
