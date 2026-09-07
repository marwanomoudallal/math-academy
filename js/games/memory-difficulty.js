// Adds independent Easy, Medium, and Hard settings to Memory Temple.
(() => {
  if (!Player.data.memoryDifficulty) {
    Player.data.memoryDifficulty = 'Medium';
    Player.save();
  }

  const difficulty = () => Player.data.memoryDifficulty || 'Medium';
  const shuffle = list => [...list].sort(() => Math.random() - .5);

  MemoryGame.setDifficulty = function setMemoryDifficulty(value) {
    Player.data.memoryDifficulty = value;
    Player.save();
    this.start(this.mode);
  };

  MemoryGame.cardsSetup = function cardsByDifficulty() {
    const pairs = { Easy: 3, Medium: 6, Hard: 10 }[difficulty()];
    const icons = ['🐉','⚔️','🏰','🧪','🦊','🔮','🌟','🛡️','🧠','🚀'].slice(0, pairs);
    this.state = { cards: shuffle([...icons, ...icons]), open: [], matched: [] };
  };

  MemoryGame.patternSetup = function patternByDifficulty() {
    const colors = ['#ef476f','#3ca7ff','#49d17f','#ffd34e'];
    const base = { Easy: 3, Medium: 5, Hard: 7 }[difficulty()];
    const cap = { Easy: 5, Medium: 8, Hard: 12 }[difficulty()];
    const length = Math.min(cap, base + Math.floor(Player.data.memoryLevel / 4));
    this.state = { colors, seq: Array.from({ length }, () => Math.floor(Math.random() * 4)), input: [], showing: true };
  };

  MemoryGame.numberSetup = function numbersByDifficulty() {
    const base = { Easy: 3, Medium: 5, Hard: 7 }[difficulty()];
    const cap = { Easy: 5, Medium: 8, Hard: 12 }[difficulty()];
    const length = Math.min(cap, base + Math.floor(Player.data.memoryLevel / 5));
    this.state = { value: Array.from({ length }, () => Math.floor(Math.random() * 10)).join(''), visible: true };
    const viewingTime = { Easy: 3000, Medium: 2200, Hard: 1500 }[difficulty()];
    this.timer = setTimeout(() => { this.state.visible = false; App.renderGame('memory'); }, viewingTime);
  };

  MemoryGame.wordsSetup = function wordsByDifficulty() {
    const all = ['apple','river','castle','planet','dragon','forest','silver','comet','puzzle','bridge','rocket','garden'];
    const count = { Easy: 3, Medium: 5, Hard: 8 }[difficulty()];
    const shown = shuffle(all).slice(0, count);
    this.state = { shown, visible: true };
    const viewingTime = { Easy: 3500, Medium: 2600, Hard: 1800 }[difficulty()];
    this.timer = setTimeout(() => {
      this.state.visible = false;
      this.state.options = shuffle([...shown, ...all.filter(word => !shown.includes(word)).slice(0, 3)]);
      this.state.selected = [];
      App.renderGame('memory');
    }, viewingTime);
  };

  MemoryGame.pictureSetup = function picturesByDifficulty() {
    const count = { Easy: 4, Medium: 5, Hard: 6 }[difficulty()];
    const icons = shuffle(['🐶','🐱','🐉','🤖','🦊','🦉']).slice(0, count);
    this.state = { icons, visible: true, target: icons[Math.floor(Math.random() * icons.length)] };
    const viewingTime = { Easy: 3200, Medium: 2300, Hard: 1500 }[difficulty()];
    this.timer = setTimeout(() => { this.state.visible = false; App.renderGame('memory'); }, viewingTime);
  };

  const originalRender = MemoryGame.render.bind(MemoryGame);
  MemoryGame.render = function renderWithDifficulty() {
    const controls = `<div class="memory-difficulty"><b>Choose Difficulty:</b>${['Easy','Medium','Hard'].map(level => `<button class="btn ${difficulty() === level ? 'green' : 'ghost'}" onclick="MemoryGame.setDifficulty('${level}')">${level}</button>`).join('')}</div>`;
    return originalRender().replace('<div class="tabs">', `${controls}<div class="tabs">`);
  };
})();
