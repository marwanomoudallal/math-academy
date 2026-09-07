// Adds frequent multi-phase bosses, special abilities, and unique relics.
(() => {
  const bosses = [
    { name:'Slime King', icon:'👑', ability:'Royal Bounce', relic:'Slime Crown' },
    { name:'Bone Captain', icon:'☠️', ability:'Bone Shield', relic:'Captain’s Compass' },
    { name:'Frost Giant', icon:'🥶', ability:'Freezing Roar', relic:'Frozen Crystal' },
    { name:'Shadow Dragon', icon:'🐲', ability:'Shadow Flame', relic:'Dragon Scale' }
  ];
  const originalStart = MathBattle.start.bind(MathBattle);
  const originalSubmit = MathBattle.submit.bind(MathBattle);
  const originalRender = MathBattle.render.bind(MathBattle);

  MathBattle.start = function expandedBossStart() {
    originalStart();
    const battle = this.state.battle;
    if (battle % 3 === 0 || battle % 5 === 0) {
      const profile = bosses[(Math.ceil(battle / 3) - 1) % bosses.length];
      this.state.boss = true; this.state.bossProfile = profile; this.state.bossPhase = 1; this.state.bossTurns = 0;
      this.state.maxEnemy = 170 + battle * 8; this.state.enemyHp = this.state.maxEnemy;
      App.renderGame('math');
    }
  };

  MathBattle.submit = function expandedBossSubmit(value) {
    const state = this.state;
    const wasBoss = state?.boss;
    const profile = state?.bossProfile;
    const battle = state?.battle;
    const correct = Number(value) === state?.q?.answer;
    originalSubmit(value);
    if (!wasBoss || !profile) return;
    state.bossTurns++;
    if (!correct && state.playerHp > 0) {
      state.playerHp = Math.max(0, state.playerHp - 8);
      Rewards.toast(`⚠️ ${profile.ability}! Extra 8 damage.`);
    }
    if (state.bossPhase === 1 && state.enemyHp > 0 && state.enemyHp <= state.maxEnemy / 2) {
      state.bossPhase = 2; state.enemyHp = Math.min(state.maxEnemy, state.enemyHp + 30);
      Rewards.toast(`🔥 ${profile.name} entered Phase 2 and gained a 30 HP shield!`);
    }
    if (state.enemyHp <= 0) {
      Player.data.bossRelics ||= [];
      if (!Player.data.bossRelics.includes(profile.relic)) {
        Player.data.bossRelics.push(profile.relic);
        Player.addRewards(120,75,3,2);
        Rewards.toast(`🏆 Unique relic earned: ${profile.relic}!`);
      }
    }
  };

  MathBattle.render = function expandedBossRender() {
    let html = originalRender();
    const state = this.state;
    if (!state?.boss || !state.bossProfile) return html;
    const profile = state.bossProfile;
    const banner = `<div class="boss-banner"><span>${profile.icon}</span><div><strong>${profile.name} · Phase ${state.bossPhase}</strong><br><small>Special Ability: ${profile.ability} · Relic: ${profile.relic}</small></div></div>`;
    html = html.replace('<div class="tabs">', `${banner}<div class="tabs">`);
    if (state.bossPhase===2) html=html.replace('enemy-fighter','enemy-fighter boss-phase-two');
    return html;
  };
})();
