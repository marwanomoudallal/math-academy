// Seven-day local return calendar, saved independently for each profile.
(() => {
  // Use the player's local calendar day. ISO strings use UTC and can report the
  // previous day for several hours after midnight in positive time zones.
  const today = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  };
  const profileKey = () => `brainquest-reward-calendar-v1:${String(Player.data.name||'unnamed').trim().toLocaleLowerCase()}`;
  let hydratedProfile = '';
  const persistCalendar = () => localStorage.setItem(profileKey(), JSON.stringify(Player.data.rewardCalendar));
  const differenceInDays = (from, to) => Math.round((new Date(to) - new Date(from)) / 86400000);
  const availableDay = calendar => {
    if (!calendar.lastClaim) return 1;
    const elapsed = differenceInDays(calendar.lastClaim, today());
    if (elapsed <= 0) return calendar.day;
    if (elapsed > 1 || calendar.cycleComplete) return 1;
    return Math.min(7, calendar.day + 1);
  };
  const rewards = [
    { icon:'🪙', coins:40, xp:30 }, { icon:'⭐', coins:55, xp:45 },
    { icon:'💎', coins:45, xp:55, gems:1 }, { icon:'🪙', coins:80, xp:65 },
    { icon:'🎁', coins:90, xp:80, gems:1 }, { icon:'🏆', coins:110, xp:100, trophies:1 },
    { icon:'🧰', coins:250, xp:200, gems:5, trophies:2 }
  ];
  const ensure = () => {
    const key = profileKey();
    if (hydratedProfile !== key) {
      hydratedProfile = key;
      try {
        const saved = JSON.parse(localStorage.getItem(key));
        if (saved && Number(saved.day) >= 1) Player.data.rewardCalendar = saved;
      } catch (_) {}
    }
    Player.data.rewardCalendar ||= { day:1, lastClaim:'', totalClaims:0 };
    const calendar = Player.data.rewardCalendar;
    if (calendar.lastClaim && differenceInDays(calendar.lastClaim, today()) > 1) {
      calendar.day = 1; calendar.cycleComplete = false;
    }
    persistCalendar();
  };
  ensure();

  const previousHome = App.home.bind(App);
  App.home = function homeWithCalendar() {
    ensure();
    const claimedToday = Player.data.rewardCalendar.lastClaim === today();
    const day = availableDay(Player.data.rewardCalendar);
    return previousHome() + `<section class="calendar-banner card"><div class="calendar-icon">${day===7?'🧰':'📅'}</div><div><h3>Daily Reward Calendar</h3><p>${claimedToday?'Today’s reward collected. Return tomorrow!':day===7?'Your special seventh-day chest is ready!':`Day ${day} reward is ready.`}</p></div><button class="btn gold" data-page="reward-calendar">${claimedToday?'View Calendar':'Claim Reward'}</button></section>`;
  };

  const previousRender = App.render.bind(App);
  App.render = function calendarRender() {
    if (this.current !== 'reward-calendar') return previousRender();
    document.querySelector('#screen').className = 'screen';
    document.querySelector('#screen').innerHTML = RewardCalendar.render();
    this.bind(); this.hud();
  };

  window.RewardCalendar = {
    claim() {
      ensure();
      const calendar = Player.data.rewardCalendar;
      if (calendar.lastClaim === today()) return Rewards.toast('You already collected today’s reward!');
      calendar.day = availableDay(calendar);
      calendar.cycleComplete = false;
      const prize = rewards[calendar.day - 1];
      calendar.lastClaim = today(); calendar.totalClaims++;
      Player.addRewards(prize.xp, prize.coins, prize.gems || 0, prize.trophies || 0);
      Rewards.modal(calendar.day===7?'Seventh-Day Chest!':'Daily Reward!',`<h3>+${prize.xp} XP · 🪙 +${prize.coins}${prize.gems?` · 💎 +${prize.gems}`:''}${prize.trophies?` · 🏆 +${prize.trophies}`:''}</h3>`,prize.icon);
      if (calendar.day === 7) calendar.cycleComplete = true;
      Player.save(); persistCalendar(); App.render();
    },
    render() {
      ensure(); const calendar=Player.data.rewardCalendar,claimedToday=calendar.lastClaim===today(),available=availableDay(calendar);
      const days=rewards.map((r,i)=>{const day=i+1,claimed=claimedToday?day<=calendar.day:day<available,current=day===available;return `<article class="reward-day card ${claimed?'claimed':current?'current':'locked'}"><div class="day-icon">${r.icon}</div><h3>Day ${day}</h3><small>+${r.xp} XP</small><small>🪙 ${r.coins}${r.gems?` · 💎 ${r.gems}`:''}</small>${day===7?'<b class="story-reward">Special Chest</b>':claimed?'✅':''}</article>`}).join('');
      return `<div class="page-head"><div><p class="eyebrow">Return and learn</p><h1>📅 Daily Reward Calendar</h1></div><button class="btn ghost" data-page="home">Home</button></div><div class="dialogue-box card"><div class="dialogue-character">🎁</div><div><b>${claimedToday?'Come back tomorrow!':`Day ${available} is ready!`}</b><p>Claim seven consecutive daily rewards to open the special chest.</p></div></div><div class="reward-calendar">${days}</div><button class="btn gold calendar-claim" onclick="RewardCalendar.claim()" ${claimedToday?'disabled':''}>${claimedToday?'✓ Collected Today':available===7?'Open Special Chest':'Claim Day '+available}</button>`;
    }
  };
  Player.save();
})();
