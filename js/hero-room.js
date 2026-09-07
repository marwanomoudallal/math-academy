// A personal room that displays the hero and every coin-shop collectible.
(() => {
  const icons = {
    Knight:'🛡️',Wizard:'🧙',Explorer:'🧭',Robot:'🤖',Ninja:'🥷',Scientist:'🥼',Dog:'🐶',Cat:'🐱','Baby Dragon':'🐉','Mini Robot':'🤖',Fox:'🦊',Owl:'🦉',
    'Moon Sword':'🗡️','Crystal Shield':'🛡️','Royal Frame':'👑','Fire Frame':'🔥','Ice Frame':'❄️','Galaxy Frame':'🌌','Forest Frame':'🌿','Ocean Frame':'🌊','Rainbow Frame':'🌈','Dragon Frame':'🐲','Golden Frame':'⭐','Shadow Frame':'🌑',
    'Galaxy Keys':'🌌','Ocean Keys':'🌊','Forest Keys':'🌿','Candy Keys':'🍬','Fire Keys':'🔥','Cherry Castle':'🌸','Dragon Statues':'🐲','Royal Garden':'🌷'
  };
  const copy = {
    en:{eyebrow:'Your personal headquarters',title:'Custom Hero Room',home:'Home',shop:'Get More Items',equipped:'Equipped Display',skin:'Skin',pet:'Pet',gear:'Gear',frame:'Frame',theme:'Keyboard Theme',decor:'Castle Decoration',trophies:'Trophy Cabinet',collection:'Collected Objects',empty:'Earn coins by learning, then unlock items in the shop.',card:'Every item here is earned with game coins—never real money.',room:'Hero Room',roomSub:'Display your hero, pets, trophies, and collected objects.'},
    fr:{eyebrow:'Ton quartier général personnel',title:'Chambre du héros',home:'Accueil',shop:'Obtenir plus d’objets',equipped:'Objets équipés',skin:'Skin',pet:'Compagnon',gear:'Équipement',frame:'Cadre',theme:'Thème du clavier',decor:'Décoration du château',trophies:'Vitrine des trophées',collection:'Objets collectionnés',empty:'Gagne des pièces en apprenant, puis débloque des objets dans la boutique.',card:'Chaque objet est obtenu avec les pièces du jeu, jamais avec de l’argent réel.',room:'Chambre du héros',roomSub:'Expose ton héros, tes compagnons, tes trophées et tes objets.'},
    ar:{eyebrow:'مقرك الشخصي',title:'غرفة البطل',home:'الرئيسية',shop:'احصل على عناصر أكثر',equipped:'العناصر المجهزة',skin:'المظهر',pet:'الحيوان الأليف',gear:'المعدات',frame:'الإطار',theme:'سمة لوحة المفاتيح',decor:'زينة القلعة',trophies:'خزانة الكؤوس',collection:'العناصر المجموعة',empty:'اربح العملات بالتعلّم ثم افتح العناصر في المتجر.',card:'تحصل على كل عنصر بعملات اللعبة فقط، وليس بأموال حقيقية.',room:'غرفة البطل',roomSub:'اعرض بطلك وحيواناتك وكؤوسك والعناصر التي جمعتها.'}
  };
  const safe=value=>String(value||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[c]);
  const words=()=>copy[Player.data.settings.language||'en']||copy.en;

  const previousHome=App.home.bind(App);
  App.home=function homeWithHeroRoom(){const t=words();return previousHome()+`<article class="hero-room-banner card" data-page="hero-room"><div class="hero-room-banner-icon">🛏️</div><div><h3>${t.room}</h3><p>${t.roomSub}</p></div><span class="go">→</span></article>`};

  window.HeroRoom={render(){const d=Player.data,t=words(),owned=[...new Set(d.inventory||[])],slots=[[t.skin,d.equippedSkin||d.avatarName],[t.pet,d.petName],[t.gear,d.equippedGear],[t.frame,d.equippedProfile],[t.theme,d.equippedTheme],[t.decor,d.equippedDecoration]];return `<div class="page-head"><div><p class="eyebrow">${t.eyebrow}</p><h1>🛏️ ${t.title}</h1></div><button class="btn ghost" data-page="home">${t.home}</button></div><section class="hero-room-scene card"><div class="room-window">☀️</div><div class="room-trophies"><b>${t.trophies}</b><div>${'🏆'.repeat(Math.min(8,d.trophies||0))||'▫️'}</div><small>🏆 ${d.trophies||0}</small></div><div class="room-hero"><div class="room-frame"><span>${d.avatar}</span></div><h2>${safe(d.name)}</h2>${d.pet?`<div class="room-pet">${d.pet}</div>`:''}</div><div class="room-rack">${slots.map(([label,name])=>`<div><small>${label}</small><strong>${name?`${icons[name]||'✨'} ${safe(name)}`:'—'}</strong></div>`).join('')}</div></section><p class="center muted">${t.card}</p><div class="section-title"><h2>${t.collection}</h2><button class="btn gold" data-page="shop">🪙 ${t.shop}</button></div><div class="hero-collection">${owned.length?owned.map(name=>`<article class="collection-object card"><span>${icons[name]||'🎁'}</span><b>${safe(name)}</b></article>`).join(''):`<div class="card hero-room-empty">${t.empty}</div>`}</div>`}};

  const previousRender=App.render.bind(App);
  App.render=function heroRoomRender(){if(this.current!=='hero-room')return previousRender();const screen=document.querySelector('#screen');screen.className='screen';screen.innerHTML=HeroRoom.render();this.bind();this.hud()};
})();
