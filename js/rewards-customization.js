// Rewards and customization hub: daily spins, mystery chests, and player titles.
(() => {
  const today=()=>new Date().toISOString().slice(0,10);
  const choices=[
    {label:'150 Coins',coins:150,icon:'🪙'}, {label:'3 Gems',gems:3,icon:'💎'},
    {label:'250 XP',xp:250,icon:'⚡'}, {label:'Wooden Chest',chest:'wood',icon:'📦'},
    {label:'500 Coins',coins:500,icon:'🪙'}, {label:'Golden Chest',chest:'gold',icon:'🏆'}
  ];
  const defaults=()=>({lastSpin:'',chests:{wood:1,gold:0,magic:0},titles:['Rising Star'],equippedTitle:'Rising Star',opened:0});
  const state=()=>{const data=Player.data.rewardHub||defaults();data.chests={wood:0,gold:0,magic:0,...data.chests};data.titles=[...new Set(data.titles||['Rising Star'])];data.equippedTitle||=data.titles[0];Player.data.rewardHub=data;return data};
  const save=()=>{Player.save();App.render()};
  const grant=reward=>{const s=state();if(reward.coins)Player.data.coins+=reward.coins;if(reward.gems)Player.data.gems+=reward.gems;if(reward.xp){Player.data.xp+=reward.xp;Player.data.totalXp+=reward.xp}if(reward.chest)s.chests[reward.chest]++;Player.save()};
  const chestRewards={
    wood:[{label:'100 Coins',coins:100,icon:'🪙'},{label:'2 Gems',gems:2,icon:'💎'},{label:'Explorer title',title:'Explorer',icon:'🧭'}],
    gold:[{label:'750 Coins',coins:750,icon:'🪙'},{label:'10 Gems',gems:10,icon:'💎'},{label:'Math Champion title',title:'Math Champion',icon:'⚔️'},{label:'Magic Chest',chest:'magic',icon:'✨'}],
    magic:[{label:'25 Gems',gems:25,icon:'💎'},{label:'Legend title',title:'Academy Legend',icon:'🌟'},{label:'Dragon Rider title',title:'Dragon Rider',icon:'🐉'}]
  };
  window.RewardsHub={
    spin(){const s=state();if(s.lastSpin===today())return Rewards.toast('Your daily spin is ready again tomorrow!');const reward=choices[Math.floor(Math.random()*choices.length)];s.lastSpin=today();grant(reward);Rewards.modal('Daily Spin!',`You won <b>${reward.icon} ${reward.label}</b>!`,'🎡','<button class="btn gold" data-close>Awesome!</button>');App.render()},
    open(type){const s=state();if(!s.chests[type])return;const reward=chestRewards[type][Math.floor(Math.random()*chestRewards[type].length)];s.chests[type]--;s.opened++;if(reward.title&&!s.titles.includes(reward.title))s.titles.push(reward.title);grant(reward);Rewards.modal(`${type==='wood'?'Wooden':type==='gold'?'Golden':'Magic'} Chest`, `You found <b>${reward.icon} ${reward.label}</b>!`,'🎁','<button class="btn gold" data-close>Collect</button>');App.render()},
    equip(title){const s=state();if(!s.titles.includes(title))return;s.equippedTitle=title;Rewards.toast(`Title equipped: ${title}`);save()},
    render(){const s=state(),canSpin=s.lastSpin!==today(),chest=(type,icon,name)=>`<article class="reward-chest card ${s.chests[type]?'ready':''}"><span>${icon}</span><h3>${name}</h3><b>${s.chests[type]} available</b><button class="btn ${type==='gold'?'gold':'green'}" ${s.chests[type]?'':'disabled'} onclick="RewardsHub.open('${type}')">Open chest</button></article>`;return `<div class="rewards-hub"><header class="page-head"><div><p class="eyebrow">Earn · collect · customize</p><h1>🎁 Rewards Hub</h1></div><button class="btn ghost" data-page="home">← Home</button></header><section class="reward-hero card"><div><span class="reward-wheel">🎡</span><div><p class="eyebrow">Daily reward</p><h2>${canSpin?'Your spin is ready!':'Come back tomorrow for another spin.'}</h2><p>Spin once each day for coins, gems, XP, or a surprise chest.</p><button class="btn gold" ${canSpin?'':'disabled'} onclick="RewardsHub.spin()">Spin the wheel</button></div></section><section><div class="section-title"><h2>Mystery Chests</h2><span class="pill">${s.opened} opened</span></div><div class="reward-chests">${chest('wood','📦','Wooden Chest')}${chest('gold','🏆','Golden Chest')}${chest('magic','✨','Magic Chest')}</div></section><section><div class="section-title"><h2>Player Titles</h2><span class="pill">${s.titles.length} collected</span></div><div class="title-grid">${s.titles.map(title=>`<button class="title-card card ${s.equippedTitle===title?'equipped':''}" onclick="RewardsHub.equip('${title.replace(/'/g,"\\'")}')"><span>${s.equippedTitle===title?'✓':'🏅'}</span><b>${title}</b><small>${s.equippedTitle===title?'Equipped':'Equip title'}</small></button>`).join('')}</div></section></div>`}
  };
  const oldHome=App.home.bind(App),oldRender=App.render.bind(App),oldProfile=App.profile.bind(App);
  App.home=function rewardsHome(){const s=state();return oldHome()+`<section class="reward-banner card" data-page="rewards-hub"><span>🎁</span><div><p class="eyebrow">Rewards & Customization</p><h3>${s.equippedTitle} · ${s.chests.wood+s.chests.gold+s.chests.magic} chest${s.chests.wood+s.chests.gold+s.chests.magic===1?'':'s'} waiting</h3></div><b>Open →</b></section>`};
  App.profile=function rewardsProfile(){const s=state();return oldProfile().replace("'s Profile</h1>",`'s Profile <span class="profile-title">${s.equippedTitle}</span></h1>`) };
  App.render=function rewardsRender(){if(this.current==='rewards-hub'){const screen=document.querySelector('#screen');screen.className='screen';screen.innerHTML=RewardsHub.render();this.bind();this.hud();return}return oldRender()};
})();
