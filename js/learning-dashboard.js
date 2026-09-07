// Collects local learning analytics and presents them to a parent or teacher.
(() => {
  const emptyAnalytics = () => ({
    math:{}, fractions:{}, typing:{attempts:0,correct:0}, memory:{completed:0},
    time:{home:0,math:0,fraction:0,typing:0,memory:0,training:0,story:0}, startedAt:Date.now()
  });
  const ensure = () => {
    Player.data.learningAnalytics ||= emptyAnalytics();
    Player.data.learningAnalytics.math ||= {};
    Player.data.learningAnalytics.fractions ||= {};
    Player.data.learningAnalytics.typing ||= {attempts:0,correct:0};
    Player.data.learningAnalytics.memory ||= {completed:0};
    Player.data.learningAnalytics.time ||= emptyAnalytics().time;
    return Player.data.learningAnalytics;
  };
  const record = (group,topic,correct) => {
    const analytics=ensure();analytics[group][topic]||={attempts:0,correct:0};analytics[group][topic].attempts++;if(correct)analytics[group][topic].correct++;Player.save();
  };
  const percent = (correct,attempts) => attempts?Math.round(correct/attempts*100):0;
  const mathTopic = question => question?.text?.includes('×')?'Multiplication':question?.text?.includes('÷')?'Division':question?.text?.includes('−')?'Subtraction':'Addition';
  const fractionTopic = question => {const text=question?.text||'';if(text.includes('larger'))return'Comparing';if(text.includes('Simplify'))return'Simplifying';if(text.includes('+'))return'Adding';if(text.includes('= ?/'))return'Equivalent Fractions';return'Understanding Fractions'};

  const mathSubmit = MathBattle.submit.bind(MathBattle);
  MathBattle.submit = function trackedMathSubmit(value){const q=this.state?.q;if(String(value).trim()&&q)record('math',mathTopic(q),Number(value)===q.answer);return mathSubmit(value)};
  const fractionAnswer = FractionKingdom.answer.bind(FractionKingdom);
  FractionKingdom.answer = function trackedFractionAnswer(value){if(this.q)record('fractions',fractionTopic(this.q),value===this.q.answer);return fractionAnswer(value)};
  const typingInput = TypingDefense.input.bind(TypingDefense);
  TypingDefense.input = function trackedTypingInput(value){const word=this.state?.word,complete=value===word,result=typingInput(value);if(complete){const a=ensure();a.typing.attempts++;a.typing.correct++;Player.save()}return result};
  const memoryWin = MemoryGame.win.bind(MemoryGame);
  MemoryGame.win = function trackedMemoryWin(){ensure().memory.completed++;Player.save();return memoryWin()};
  if (window.MathTraining) {
    const trainingSubmit=MathTraining.submit.bind(MathTraining);
    MathTraining.submit=function trackedTrainingSubmit(event){const q=this.state.q,value=Number(document.querySelector('#training-answer')?.value);if(q)record('math',mathTopic(q),value===q.answer);return trainingSubmit(event)};
  }

  // Count active practice time in ten-second increments.
  let lastTick=Date.now();
  setInterval(()=>{const now=Date.now(),seconds=Math.min(15,Math.round((now-lastTick)/1000));lastTick=now;if(document.hidden||!Player.data.name)return;const page=App.current,key=page==='math-training'?'training':page.startsWith('story')?'story':['math','fraction','typing','memory'].includes(page)?page:'home';const analytics=ensure();analytics.time[key]=(analytics.time[key]||0)+seconds;Player.save()},10000);

  const labels = {
    en:{title:'Parent / Teacher Dashboard',sub:'Local learning report',open:'Open Dashboard',back:'Settings',practice:'Practice Time',strengths:'Strengths',needs:'Needs Practice',topics:'Topic Accuracy',recommend:'Recommendations',attempts:'attempts',none:'Complete a few activities to generate learning insights.'},
    fr:{title:'Tableau Parent / Enseignant',sub:'Rapport d’apprentissage local',open:'Ouvrir le tableau',back:'Paramètres',practice:'Temps de pratique',strengths:'Points forts',needs:'À travailler',topics:'Précision par sujet',recommend:'Recommandations',attempts:'essais',none:'Termine quelques activités pour générer des observations.'},
    ar:{title:'لوحة ولي الأمر / المعلم',sub:'تقرير التعلم المحلي',open:'فتح لوحة المتابعة',back:'الإعدادات',practice:'وقت التدريب',strengths:'نقاط القوة',needs:'يحتاج إلى تدريب',topics:'الدقة حسب الموضوع',recommend:'التوصيات',attempts:'محاولات',none:'أكمل بعض الأنشطة لإنشاء ملاحظات تعليمية.'}
  };
  const text=()=>labels[Player.data.settings.language]||labels.en;
  const formatTime=seconds=>{const minutes=Math.floor(seconds/60),hours=Math.floor(minutes/60);return hours?`${hours}h ${minutes%60}m`:`${minutes}m`};

  window.LearningDashboard = {render(){const a=ensure(),t=text(),topics=[...Object.entries(a.math).map(([name,s])=>({name,group:'Math',...s})),...Object.entries(a.fractions).map(([name,s])=>({name,group:'Fractions',...s}))];const totalAttempts=topics.reduce((n,s)=>n+s.attempts,0),totalCorrect=topics.reduce((n,s)=>n+s.correct,0),overall=percent(totalCorrect,totalAttempts),totalTime=Object.values(a.time).reduce((x,y)=>x+y,0);const evaluated=topics.filter(s=>s.attempts>=3).map(s=>({...s,accuracy:percent(s.correct,s.attempts)}));const strengths=evaluated.filter(s=>s.accuracy>=80).sort((a,b)=>b.accuracy-a.accuracy);const needs=evaluated.filter(s=>s.accuracy<70).sort((a,b)=>a.accuracy-b.accuracy);const topicRows=topics.length?topics.sort((a,b)=>b.attempts-a.attempts).map(s=>`<div class="skill-row"><span>${s.group}: ${s.name}<small class="muted"><br>${s.attempts} ${t.attempts}</small></span><div class="bar" style="--value:${percent(s.correct,s.attempts)}%"><i></i></div><b>${percent(s.correct,s.attempts)}%</b></div>`).join(''):`<div class="dashboard-empty">${t.none}</div>`;const insights=(list,kind)=>list.length?list.map(s=>`<div class="insight ${kind}"><b>${kind==='strength'?'✅':'🎯'} ${s.name}</b><br><small>${s.accuracy}% · ${s.attempts} ${t.attempts}</small></div>`).join(''):`<div class="dashboard-empty">${t.none}</div>`;const recommendations=needs.length?needs.slice(0,3).map(s=>`<div class="insight practice">Practice <b>${s.name}</b> in Math Training or its adventure realm.</div>`).join(''):`<div class="insight strength">Keep playing across different topics to build a balanced learning record.</div>`;return `<div class="page-head"><div><p class="eyebrow">${t.sub}</p><h1>📊 ${t.title}</h1><p class="muted">${escapeDashboard(Player.data.name)} · ${new Date().toLocaleDateString()}</p></div><button class="btn ghost" data-page="settings">${t.back}</button></div><div class="dashboard-summary"><div class="dashboard-metric card"><strong>${overall}%</strong><small>Overall Accuracy</small></div><div class="dashboard-metric card"><strong>${totalAttempts}</strong><small>Questions Attempted</small></div><div class="dashboard-metric card"><strong>${a.typing.correct}</strong><small>Words Typed</small></div><div class="dashboard-metric card"><strong>${formatTime(totalTime)}</strong><small>${t.practice}</small></div></div><div class="dashboard-columns"><section class="dashboard-panel card"><h2>📈 ${t.topics}</h2>${topicRows}</section><section><div class="dashboard-panel card"><h2>💪 ${t.strengths}</h2><div class="insight-list">${insights(strengths,'strength')}</div><h2>🎯 ${t.needs}</h2><div class="insight-list">${insights(needs,'practice')}</div></div></section><section class="dashboard-panel card"><h2>⏱️ ${t.practice}</h2><div class="time-grid">${Object.entries(a.time).map(([name,seconds])=>`<div class="time-box"><b>${name[0].toUpperCase()+name.slice(1)}</b><br>${formatTime(seconds)}</div>`).join('')}</div></section><section class="dashboard-panel card"><h2>💡 ${t.recommend}</h2><div class="insight-list">${recommendations}</div><h3>Other records</h3><p>⌨️ Best WPM: <b>${Player.data.bestWpm}</b> · Accuracy: <b>${Player.data.bestAccuracy}%</b></p><p>🧠 Memory games: <b>${Player.data.memoryGames}</b> · Level: <b>${Player.data.memoryLevel}</b></p><p>🏰 Fraction answers: <b>${Player.data.fractionCorrect}</b></p></section></div>`}};
  const escapeDashboard=value=>String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[c]);

  const previousSettings=App.settings.bind(App);
  App.settings=function settingsWithDashboard(){const t=text(),setting=`<div class="setting"><div><b>📊 ${t.title}</b><div class="muted">${t.sub}</div></div><button class="btn" data-page="parent-dashboard">${t.open}</button></div>`;return previousSettings().replace('<div class="setting"><div><b>Reset Progress</b>',`${setting}<div class="setting"><div><b>Reset Progress</b>`)};
  const previousRender=App.render.bind(App);
  App.render=function dashboardRender(){if(this.current!=='parent-dashboard')return previousRender();document.querySelector('#screen').className='screen';document.querySelector('#screen').innerHTML=LearningDashboard.render();this.bind();this.hud()};
  ensure();Player.save();
})();
