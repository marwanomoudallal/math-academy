// Supplies a fresh challenge set whenever all three current rewards are claimed.
(() => {
  const rounds = [
    { math:20, typing:100, memory:3 },
    { math:10, typing:50, memory:2 },
    { math:25, typing:75, memory:4 },
    { math:15, typing:120, memory:3 },
    { math:30, typing:60, memory:5 }
  ];
  const labels = {
    en:{math:n=>`Answer ${n} math questions`,typing:n=>`Type ${n} words`,memory:n=>`Complete ${n} memory games`,claim:'Claim',claimed:'✓ Claimed',fresh:'🌟 New daily challenges are ready!'},
    fr:{math:n=>`Répondre à ${n} questions de maths`,typing:n=>`Taper ${n} mots`,memory:n=>`Terminer ${n} jeux de mémoire`,claim:'Réclamer',claimed:'✓ Réclamé',fresh:'🌟 De nouveaux défis sont prêts !'},
    ar:{math:n=>`أجب عن ${n} سؤال رياضيات`,typing:n=>`اكتب ${n} كلمة`,memory:n=>`أكمل ${n} ألعاب ذاكرة`,claim:'استلام',claimed:'✓ تم الاستلام',fresh:'🌟 تحديات جديدة جاهزة!'}
  };

  const ensureRound = () => {
    Player.data.daily.round ||= 0;
    return rounds[Player.data.daily.round % rounds.length];
  };

  App.challenges = function rotatingChallenges() {
    const daily=Player.data.daily,targets=ensureRound(),language=Player.data.settings.language||'en',t=labels[language]||labels.en;
    const rows=[['math','⚔️',t.math(targets.math),daily.math,targets.math],['typing','⌨️',t.typing(targets.typing),daily.typing,targets.typing],['memory','🧠',t.memory(targets.memory),daily.memory,targets.memory]];
    return `<div class="challenge-list">${rows.map(([id,icon,title,count,max])=>`<div class="challenge card"><span class="big">${icon}</span><div><b>${title}</b><small><br>${Math.min(count,max)} / ${max}</small><div class="mini-progress" style="--value:${Math.min(100,count/max*100)}%"><i></i></div></div>${count>=max&&!daily.claimed.includes(id)?`<button class="btn green" onclick="App.claim('${id}')">${t.claim}</button>`:daily.claimed.includes(id)?`<span class="owned">${t.claimed}</span>`:'<b>+100 XP</b>'}</div>`).join('')}</div>`;
  };

  App.claim = function claimRotatingChallenge(id) {
    const daily=Player.data.daily,targets=ensureRound();
    if (daily.claimed.includes(id) || daily[id] < targets[id]) return;
    daily.claimed.push(id);
    Player.addRewards(100,35,1);
    if (daily.claimed.length === 3) {
      daily.round++;
      daily.math=0; daily.typing=0; daily.memory=0; daily.claimed=[];
      Player.save();
      const t=labels[Player.data.settings.language||'en']||labels.en;
      Rewards.toast(t.fresh);
    } else {
      Player.save();
      Rewards.toast(Player.data.settings.language==='fr'?'🎁 Récompense récupérée !':Player.data.settings.language==='ar'?'🎁 تم استلام المكافأة!':'🎁 Daily reward claimed!');
    }
    App.render();
  };
})();
