// Three additional playable learning realms with shared rewards and saves.
(() => {
  const shuffle = list => [...list].sort(() => Math.random() - .5);
  const ensure = () => {
    Player.data.futureRealms ||= {
      coding:{level:1,correct:0,attempts:0}, science:{level:1,correct:0,attempts:0}, geography:{level:1,correct:0,attempts:0}
    };
    return Player.data.futureRealms;
  };
  ensure();

  const scienceQuestions = [
    ['Which force pulls objects toward Earth?',['Gravity','Magnetism','Friction','Electricity'],'Gravity','Gravity attracts objects toward Earth’s center.'],
    ['Which organ pumps blood around the body?',['Heart','Lungs','Brain','Stomach'],'Heart','The heart is a muscle that pumps blood through blood vessels.'],
    ['What do plants use to make food?',['Sunlight','Moonlight','Rocks','Sound'],'Sunlight','Photosynthesis uses sunlight, water, and carbon dioxide.'],
    ['Which state of matter keeps its own shape?',['Solid','Liquid','Gas','Plasma'],'Solid','Particles in a solid stay closely packed in fixed positions.'],
    ['What planet is known as the Red Planet?',['Mars','Venus','Jupiter','Mercury'],'Mars','Iron minerals on Mars make its surface appear red.'],
    ['Water boils at what temperature at sea level?',['100°C','50°C','0°C','200°C'],'100°C','At normal atmospheric pressure, water boils at 100°C.'],
    ['Which gas do humans breathe in to survive?',['Oxygen','Carbon dioxide','Helium','Hydrogen'],'Oxygen','Cells use oxygen to release energy from food.'],
    ['What is the center of an atom called?',['Nucleus','Orbit','Cell','Core shell'],'Nucleus','The nucleus contains protons and neutrons.'],
    ['Which simple machine is a ramp?',['Inclined plane','Lever','Pulley','Wheel'],'Inclined plane','An inclined plane helps move objects vertically with less force.'],
    ['What causes day and night?',['Earth rotating','Earth orbiting','The Moon moving','Clouds'],'Earth rotating','Earth completes one rotation roughly every 24 hours.'],
    ['Which material is a good electrical conductor?',['Copper','Rubber','Plastic','Wood'],'Copper','Metals such as copper allow electric charge to flow easily.'],
    ['What is evaporation?',['Liquid changing to gas','Gas changing to liquid','Solid changing to liquid','Water freezing'],'Liquid changing to gas','Surface particles gain enough energy to enter the gas state.']
  ];
  const geographyQuestions = [
    ['What is the capital of France?',['Paris','Rome','Madrid','Berlin'],'Paris','Paris is the capital and largest city of France.'],
    ['Egypt is located on which continent?',['Africa','Asia','Europe','South America'],'Africa','Most of Egypt lies in northeastern Africa.'],
    ['Which is the largest ocean?',['Pacific Ocean','Atlantic Ocean','Indian Ocean','Arctic Ocean'],'Pacific Ocean','The Pacific covers more area than all land on Earth combined.'],
    ['What is the capital of Japan?',['Tokyo','Kyoto','Seoul','Beijing'],'Tokyo','Tokyo is Japan’s capital and largest metropolitan area.'],
    ['The Amazon rainforest is mainly in which country?',['Brazil','Canada','India','Australia'],'Brazil','Most of the Amazon rainforest lies within Brazil.'],
    ['Which continent is the coldest?',['Antarctica','Europe','Asia','North America'],'Antarctica','Antarctica surrounds the South Pole and is covered by ice.'],
    ['Mount Everest belongs to which mountain range?',['Himalayas','Andes','Alps','Rockies'],'Himalayas','Everest lies in the Himalayas on the Nepal–China border.'],
    ['What is the capital of Lebanon?',['Beirut','Tripoli','Byblos','Sidon'],'Beirut','Beirut is the capital and largest city of Lebanon.'],
    ['Which imaginary line divides Earth into north and south?',['Equator','Prime Meridian','Tropic of Cancer','Date Line'],'Equator','The Equator is at zero degrees latitude.'],
    ['Which country has the shape of a boot?',['Italy','Greece','Portugal','Norway'],'Italy','Italy’s peninsula is famously shaped like a boot.'],
    ['The Nile River flows into which sea?',['Mediterranean Sea','Red Sea','Black Sea','Arabian Sea'],'Mediterranean Sea','The Nile delta meets the Mediterranean in northern Egypt.'],
    ['What is the capital of Australia?',['Canberra','Sydney','Melbourne','Perth'],'Canberra','Canberra was selected as Australia’s capital in 1908.']
  ];

  const random=(min,max)=>min+Math.floor(Math.random()*(max-min+1));
  const numberOptions=answer=>shuffle([...new Set([answer,answer+1,Math.max(0,answer-1),answer+random(2,5),Math.max(0,answer-random(2,4))])]).slice(0,4).map(String);
  const codingQuestion = () => {
    const type=random(0,5);
    if(type===0){const repeats=random(2,12),steps=random(1,5),answer=repeats*steps;return[`A robot repeats MOVE ${steps} a total of ${repeats} times. How many spaces does it travel?`,numberOptions(answer),String(answer),`The loop runs ${repeats} times: ${repeats} × ${steps} = ${answer}.`]}
    if(type===1){const start=random(1,30),change=random(2,20),answer=start+change;return['What will this code print?',numberOptions(answer),String(answer),`The variable starts at ${start}, then ${change} is added.`,`let score = ${start};\nscore = score + ${change};\nprint(score);`]}
    if(type===2){const outer=random(2,6),inner=random(2,7),answer=outer*inner;return['How many times does COLLECT run?',numberOptions(answer),String(answer),`The nested loops multiply: ${outer} × ${inner} = ${answer}.`,`REPEAT ${outer} {\n  REPEAT ${inner} { COLLECT }\n}`]}
    if(type===3){const value=random(1,30),limit=random(5,25),yes=value>limit,answer=yes?'OPEN':'WAIT';return['What command will run?',['OPEN','WAIT','BOTH','NOTHING'],answer,`${value} ${yes?'>':'≤'} ${limit}, so the condition is ${yes?'true':'false'}.`,`energy = ${value}\nIF energy > ${limit} { OPEN }\nELSE { WAIT }`]}
    if(type===4){const values=shuffle([random(2,9),random(10,19),random(20,29),random(30,39)]),index=random(0,3),answer=values[index];return[`What is gems[${index}]?`,values.map(String),String(answer),`Arrays start at index 0, so position ${index} contains ${answer}.`,`gems = [${values.join(', ')}]`]}
    const n=random(2,30),factor=random(2,4),answer=n*factor;return['What will the function return?',numberOptions(answer),String(answer),`The function multiplies ${n} by ${factor}.`,`FUNCTION power(x) { RETURN x * ${factor} }\nprint(power(${n}))`]
  };

  const scienceQuestion=()=>{
    if(Math.random()<.35)return scienceQuestions[random(0,scienceQuestions.length-1)];
    const type=random(0,4);
    if(type===0){const speed=random(2,20),time=random(2,10),distance=speed*time;return[`A rover travels ${distance} meters in ${time} seconds. What is its speed?`,numberOptions(speed).map(x=>x+' m/s'),speed+' m/s',`Speed = distance ÷ time = ${distance} ÷ ${time} = ${speed} m/s.`]}
    if(type===1){const groups=random(2,9),items=random(2,12),total=groups*items;return[`A scientist places ${items} seeds in each of ${groups} trays. How many seeds are there altogether?`,numberOptions(total),String(total),`${groups} groups of ${items} seeds: ${groups} × ${items} = ${total}.`]}
    if(type===2){const start=random(-5,25),change=random(3,18),final=start+change;return[`A liquid warms from ${start}°C by ${change}°C. What is its final temperature?`,numberOptions(final).map(x=>x+'°C'),final+'°C',`${start} + ${change} = ${final}°C.`]}
    if(type===3){const containers=random(2,10),cups=random(2,8),total=containers*cups;return[`A science class fills ${containers} containers with ${cups} cups of water each. How many cups are used altogether?`,numberOptions(total).map(x=>x+' cups'),total+' cups',`${containers} × ${cups} = ${total} cups.`]}
    const bulbs=random(2,8),watts=random(3,12),total=bulbs*watts;return[`${bulbs} identical bulbs each use ${watts} watts. How much power do they use together?`,numberOptions(total).map(x=>x+' W'),total+' W',`${bulbs} × ${watts} = ${total} watts.`]
  };

  const geographyQuestion=()=>{
    if(Math.random()<.35)return geographyQuestions[random(0,geographyQuestions.length-1)];
    const type=random(0,3);
    if(type===0){const scale=random(5,50),length=random(2,12),answer=scale*length;return[`On a map, 1 cm represents ${scale} km. How far is ${length} cm?`,numberOptions(answer).map(x=>x+' km'),answer+' km',`${length} × ${scale} = ${answer} kilometers.`]}
    if(type===1){const latitude=random(1,80),north=Math.random()<.5,answer=north?'Northern Hemisphere':'Southern Hemisphere';return[`A place is at ${latitude}° ${north?'N':'S'}. Which hemisphere is it in?`,['Northern Hemisphere','Southern Hemisphere','Eastern Hemisphere','Western Hemisphere'],answer,`${north?'N':'S'} means ${answer}.`]}
    if(type===2){const longitude=random(1,170),east=Math.random()<.5,answer=east?'Eastern Hemisphere':'Western Hemisphere';return[`A city is at ${longitude}° ${east?'E':'W'}. Which hemisphere is it in?`,['Eastern Hemisphere','Western Hemisphere','Northern Hemisphere','Southern Hemisphere'],answer,`${east?'E':'W'} means ${answer}.`]}
    const north=random(1,9),east=random(1,9),answer='Northeast';return[`An explorer travels ${north} km north and ${east} km east. In which overall direction did they move?`,['Northeast','Northwest','Southeast','Southwest'],answer,'Moving north and east gives the combined direction northeast.']
  };

  window.FutureRealms = {
    current:'coding', question:null, feedback:'', explanation:'', recent:{coding:[],science:[],geography:[]},
    start(realm){this.current=realm;this.next();App.current=realm;App.render()},
    next(){let raw,tries=0,signature;do{raw=this.current==='coding'?codingQuestion():this.current==='science'?scienceQuestion():geographyQuestion();signature=raw[0]+'|'+(raw[4]||'');tries++}while(this.recent[this.current].includes(signature)&&tries<80);this.recent[this.current].push(signature);if(this.recent[this.current].length>60)this.recent[this.current].shift();this.question={text:raw[0],options:shuffle(raw[1]),answer:raw[2],explain:raw[3],code:raw[4]||''};this.feedback='';this.explanation=''},
    answer(value){const stats=ensure()[this.current];stats.attempts++;if(value===this.question.answer){stats.correct++;this.feedback='✅ Correct!';this.explanation=this.question.explain;if(stats.correct%5===0){stats.level++;Player.addRewards(100,50,1,1);Rewards.toast(`🌟 ${this.title()} reached level ${stats.level}!`)}else Player.addRewards(30,15);Rewards.sound('good')}else{this.feedback=`❌ Correct answer: ${this.question.answer}`;this.explanation=this.question.explain;Rewards.sound('bad')}Player.data.gamesPlayed++;Player.save();App.render();setTimeout(()=>{this.next();App.render()},1600)},
    title(){return this.current==='coding'?'Coding Island':this.current==='science'?'Science Laboratory':'Geography World'},
    render(){if(!this.question)this.next();const stats=ensure()[this.current],meta={coding:['💻','🤖','coding-scene','Captain Byte','Use sequences, loops, variables, and conditions to repair the island.'],science:['🔬','🧑‍🔬','science-scene','Dr. Nova','Test ideas from biology, physics, chemistry, Earth, and space science.'],geography:['🌍','🧭','geography-scene','Atlas the Explorer','Travel through capitals, continents, oceans, landmarks, and maps.']}[this.current],accuracy=Math.round(stats.correct/Math.max(1,stats.attempts)*100);return `<section class="future-realm card"><div class="game-hud"><button class="btn ghost" data-page="games">← Games</button><h1>${meta[0]} ${this.title()}</h1><div class="realm-progress"><span class="pill">Level ${stats.level}</span><span class="pill">✅ ${stats.correct}</span><span class="pill">🎯 ${accuracy}%</span></div></div><div class="realm-scene ${meta[2]}"><div class="realm-character">${meta[1]}</div><div class="realm-dialogue card"><h2>${meta[3]}</h2><p>${meta[4]}</p></div></div><div class="realm-question card"><h2>${this.question.text}</h2>${this.question.code?`<pre class="code-block">${this.question.code}</pre>`:''}<div class="realm-options">${this.question.options.map(option=>`<button class="btn ghost" onclick="FutureRealms.answer('${option.replace(/'/g,"\\'")}')">${option}</button>`).join('')}</div><div class="realm-feedback">${this.feedback}</div>${this.explanation?`<div class="answer-explanation">${this.explanation}</div>`:''}</div></section>`}
  };

  const originalGameCards=App.gameCards.bind(App);
  App.gameCards=function allRealmCards(){return originalGameCards()+`<div class="section-title"><div><p class="eyebrow">New learning expeditions</p><h2>Future Realms</h2></div></div><div class="game-grid"><article class="game-card card coding-card" data-page="coding"><div class="emoji">💻</div><h3>Coding Island</h3><p>Learn logic, loops, and variables.</p><span class="go">→</span></article><article class="game-card card science-card" data-page="science"><div class="emoji">🔬</div><h3>Science Laboratory</h3><p>Explore how our universe works.</p><span class="go">→</span></article><article class="game-card card geography-card" data-page="geography"><div class="emoji">🌍</div><h3>Geography World</h3><p>Discover countries and our planet.</p><span class="go">→</span></article></div>`};

  App.map=function playableWorldMap(){const d=Player.data,s=ensure();const zone=(cls,icon,title,sub,page,extra='')=>`<button class="zone ${cls} ${extra}" data-page="${page}"><span>${icon}</span><b>${title}</b><small>${sub}</small></button>`;return `<div class="page-head"><div><p class="eyebrow">Seven playable realms</p><h1>Adventure Map</h1></div><span class="pill">⭐ Level ${d.level}</span></div><section class="world card">${zone('z1','⚔️','Battle Arena','Battle '+d.battle,'math')}${zone('z2','🏰','Fraction Kingdom','Castle Lv '+d.castleLevel,'fraction')}${zone('z3','⌨️','Typing Fortress','Wave '+d.wave,'typing')}${zone('z4','🧠','Memory Temple','Level '+d.memoryLevel,'memory')}${zone('l1','💻','Coding Island','Level '+s.coding.level,'coding','future-zone')}${zone('l2','🔬','Science Laboratory','Level '+s.science.level,'science','future-zone')}${zone('l3','🌍','Geography World','Level '+s.geography.level,'geography','future-zone')}</section>`};

  const previousRender=App.render.bind(App);
  App.render=function futureRealmRender(){if(!['coding','science','geography'].includes(this.current))return previousRender();document.querySelector('#screen').className='screen';document.querySelector('#screen').innerHTML=FutureRealms.render();this.bind();this.hud()};
  document.addEventListener('click',event=>{const realm=event.target.closest('[data-page]')?.dataset.page;if(['coding','science','geography'].includes(realm)){event.preventDefault();event.stopPropagation();FutureRealms.start(realm)}},true);
  Player.save();
})();
