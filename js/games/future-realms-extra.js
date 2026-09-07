// Two additional playable Future Realms: Space Mission and Nature Rescue.
(() => {
  const banks={
    space:[
      ['Which planet is closest to the Sun?',['Mercury','Earth','Mars','Jupiter'],'Mercury','Mercury is the first planet from the Sun.'],
      ['What is a person who travels in space called?',['Astronaut','Sailor','Geologist','Pilot fish'],'Astronaut','Astronauts train to live and work in space.'],
      ['What keeps planets moving around the Sun?',['Gravity','Wind','Sound','Rain'],'Gravity','The Sun’s gravity holds planets in their orbits.'],
      ['Which planet is famous for its rings?',['Saturn','Venus','Earth','Mars'],'Saturn','Saturn has a large, bright system of icy rings.'],
      ['What is Earth’s natural satellite?',['The Moon','The Sun','Mars','A comet'],'The Moon','The Moon travels around Earth.'],
      ['Which star gives Earth light and heat?',['The Sun','Polaris','Sirius','Vega'],'The Sun','The Sun is the star at the center of our solar system.'],
      ['What do we call a rock that reaches Earth’s ground?',['Meteorite','Cloud','Galaxy','Orbit'],'Meteorite','A space rock that survives to reach the ground is a meteorite.'],
      ['Which planet is the largest?',['Jupiter','Earth','Mercury','Neptune'],'Jupiter','Jupiter is the largest planet in our solar system.'],
      ['Why do astronauts wear spacesuits?',['To breathe and stay protected','To swim faster','To become invisible','To control planets'],'To breathe and stay protected','Spacesuits provide air and protection from the space environment.'],
      ['A rover drives 4 km each day for 3 days. How far does it travel?',['12 km','7 km','4 km','1 km'],'12 km','4 × 3 = 12 kilometers.'],
      ['A rocket has 20 fuel cells and uses 6. How many remain?',['14','26','12','16'],'14','20 − 6 = 14 fuel cells.'],
      ['Which tool helps us observe very distant objects?',['Telescope','Microscope','Thermometer','Compass'],'Telescope','Telescopes collect light from faraway objects in space.']
    ],
    nature:[
      ['What do trees release that people breathe?',['Oxygen','Plastic','Smoke','Salt'],'Oxygen','Plants release oxygen during photosynthesis.'],
      ['Which bin is best for a clean paper box?',['Recycling bin','River','Road','Food bowl'],'Recycling bin','Clean paper and cardboard can often be recycled.'],
      ['What should you do with a dripping tap?',['Turn it off','Leave it running','Add soap','Open it more'],'Turn it off','Turning off leaks helps save water.'],
      ['Which energy source uses sunlight?',['Solar power','Coal','Gasoline','Diesel'],'Solar power','Solar panels turn sunlight into electricity.'],
      ['Why are bees important to many plants?',['They pollinate flowers','They make rain','They clean oceans','They move mountains'],'They pollinate flowers','Pollination helps plants make seeds and fruit.'],
      ['Which habitat is home to camels?',['Desert','Ocean','Arctic ice','Rain cloud'],'Desert','Camels have adaptations that help them live in deserts.'],
      ['What is a food chain?',['How energy passes between living things','A metal necklace','A weather map','A type of road'],'How energy passes between living things','Food chains show who eats whom and how energy moves.'],
      ['Which action helps wild animals?',['Protecting habitats','Dropping litter','Wasting water','Cutting every tree'],'Protecting habitats','Healthy habitats provide animals with food, water, and shelter.'],
      ['What can reusable bottles reduce?',['Plastic waste','Sunlight','Fresh air','Plant growth'],'Plastic waste','Reusing a bottle can replace many single-use bottles.'],
      ['A class plants 5 rows of 4 trees. How many trees are planted?',['20','9','15','25'],'20','5 × 4 = 20 trees.'],
      ['You collect 18 cans and recycle 7. How many are left?',['11','25','9','12'],'11','18 − 7 = 11 cans.'],
      ['Which animal begins life as a tadpole?',['Frog','Eagle','Rabbit','Bee'],'Frog','A tadpole develops into a frog.']
    ]
  };
  const shuffle=list=>[...list].sort(()=>Math.random()-.5),extra=realm=>realm==='space'||realm==='nature';
  Player.data.futureRealms||={};
  ['space','nature'].forEach(realm=>Player.data.futureRealms[realm]||={level:1,correct:0,attempts:0});
  FutureRealms.recent.space||=[];FutureRealms.recent.nature||=[];

  const oldStart=FutureRealms.start.bind(FutureRealms),oldNext=FutureRealms.next.bind(FutureRealms),oldTitle=FutureRealms.title.bind(FutureRealms),oldRealmRender=FutureRealms.render.bind(FutureRealms);
  FutureRealms.start=function startExtra(realm){if(!extra(realm))return oldStart(realm);this.current=realm;this.next();App.current=realm;App.render()};
  FutureRealms.next=function nextExtra(){if(!extra(this.current))return oldNext();const recent=this.recent[this.current],available=banks[this.current].filter(question=>!recent.includes(question[0])),raw=(available.length?available:banks[this.current])[Math.floor(Math.random()*(available.length||banks[this.current].length))];recent.push(raw[0]);if(recent.length>=banks[this.current].length-2)recent.shift();this.question={text:raw[0],options:shuffle(raw[1]),answer:raw[2],explain:raw[3],code:''};this.feedback='';this.explanation=''};
  FutureRealms.title=function titleExtra(){return this.current==='space'?'Space Mission':this.current==='nature'?'Nature Rescue':oldTitle()};
  FutureRealms.render=function renderExtra(){if(!extra(this.current))return oldRealmRender();if(!this.question)this.next();const stats=Player.data.futureRealms[this.current],accuracy=Math.round(stats.correct/Math.max(1,stats.attempts)*100),meta=this.current==='space'?['🚀','🧑‍🚀','space-scene','Commander Nova','Explore planets, rockets, gravity, and the solar system.']:['🌱','🦊','nature-scene','Ranger Fern','Protect habitats, save resources, and learn how nature works.'];return `<section class="future-realm card"><div class="game-hud"><button class="btn ghost" data-page="games">← Games</button><h1>${meta[0]} ${this.title()}</h1><div class="realm-progress"><span class="pill">Level ${stats.level}</span><span class="pill">✅ ${stats.correct}</span><span class="pill">🎯 ${accuracy}%</span></div></div><div class="realm-scene ${meta[2]}"><div class="realm-character">${meta[1]}</div><div class="realm-dialogue card"><h2>${meta[3]}</h2><p>${meta[4]}</p></div></div><div class="realm-question card"><h2>${this.question.text}</h2><div class="realm-options">${this.question.options.map(option=>`<button class="btn ghost" onclick="FutureRealms.answer('${option.replace(/'/g,"\\'")}')">${option}</button>`).join('')}</div><div class="realm-feedback">${this.feedback}</div>${this.explanation?`<div class="answer-explanation">${this.explanation}</div>`:''}</div></section>`};

  const oldCards=App.gameCards.bind(App);App.gameCards=function extraFutureCards(){const html=oldCards(),extraCards=`<article class="game-card card space-card" data-page="space"><div class="emoji">🚀</div><h3>Space Mission</h3><p>Explore planets, rockets, and our solar system.</p><span class="go">→</span></article><article class="game-card card nature-card" data-page="nature"><div class="emoji">🌱</div><h3>Nature Rescue</h3><p>Protect wildlife and care for our planet.</p><span class="go">→</span></article>`;return html.replace(/<\/div>$/,`${extraCards}</div>`)};
  const oldRender=App.render.bind(App);App.render=function extraFutureRender(){if(!extra(this.current))return oldRender();document.querySelector('#screen').className='screen';document.querySelector('#screen').innerHTML=FutureRealms.render();this.bind();this.hud()};
  document.addEventListener('click',event=>{const realm=event.target.closest('[data-page]')?.dataset.page;if(!extra(realm))return;event.preventDefault();event.stopPropagation();FutureRealms.start(realm)},true);
  Player.save();
})();
