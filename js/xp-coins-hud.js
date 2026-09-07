(() => {
  function updateXp() {
    const xp = document.querySelector('#xp');
    if (xp && window.Player?.data) xp.textContent = Player.data.totalXp;
  }

  updateXp();
  window.addEventListener('playerchange', updateXp);
})();
