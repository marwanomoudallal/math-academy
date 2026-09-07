// Final French-only pass for dynamically created expansion and game content.
(() => {
  const text = {
    'Correct!':'Correct !','Not quite!':'Pas tout à fait !','Correct answer:':'Bonne réponse :','The answer was':'La réponse était',
    'Battle Rest':'Repos du combat','Your hero recovered at camp. Try a new question!':'Ton héros a récupéré au camp. Essaie une nouvelle question !',
    'POWER ATTACK!':'ATTAQUE PUISSANTE !','Green Slime':'Gelée verte','Goblin':'Gobelin','Skeleton':'Squelette','Forest Troll':'Troll de la forêt','Stone Golem':'Golem de pierre','Ice Wizard':'Sorcier de glace','Shadow Knight':'Chevalier de l’ombre','Robot Warrior':'Guerrier robot',
    'What fraction is':'Quelle fraction représente','Which fraction is larger?':'Quelle fraction est la plus grande ?','Simplify':'Simplifie','Need':'Il faut','wood and stone':'de bois et de pierre','Kingdom upgraded to level':'Royaume amélioré au niveau',
    'Try again — watch the new pattern!':'Réessaie — observe le nouveau motif !','The number was':'Le nombre était','Not quite — try a new word set!':'Pas tout à fait — essaie une nouvelle liste !','That spot held':'Cette case contenait','Memory Victory!':'Victoire de mémoire !','Memory level':'Niveau de mémoire','reached!':'atteint !',
    'The BrainQuest Chronicles':'Les Chroniques de BrainQuest','Lyra the Academy Guide':'Lyra, guide de l’Académie','Chapter complete':'Chapitre terminé','Play Again':'Rejouer','Locked':'Verrouillé','Begin':'Commencer','The Final Boss':'Le boss final','Story completed':'Histoire terminée','Face Boss':'Affronter le boss','Battle Again':'Combattre encore',
    'You saved every realm, champion! You may challenge the dragon again.':'Tu as sauvé tous les royaumes, champion ! Tu peux affronter le dragon à nouveau.','Four keys unlock the Dragon of Forgetfulness. Train in every realm and bring them to me!':'Quatre clés libèrent le Dragon de l’Oubli. Entraîne-toi dans chaque royaume et rapporte-les-moi !',
    'Use rapid two-digit math to defeat the Dragon of Forgetfulness.':'Utilise rapidement les nombres à deux chiffres pour vaincre le Dragon de l’Oubli.','Reward:':'Récompense :',
    'Owned Items':'Objets possédés','Active Equipment':'Équipement actif','Nothing owned yet. Visit the shop!':'Tu ne possèdes encore rien. Visite la boutique !','Nothing equipped':'Aucun objet équipé',
    'Pet Collection Book':'Livre des compagnons','No pet selected':'Aucun compagnon sélectionné','Choose a pet in the shop first.':'Choisis d’abord un compagnon dans la boutique.','Pet name':'Nom du compagnon','Save Pet Name':'Enregistrer le nom','Pet Badges':'Badges des compagnons',
    'Training Mode':'Mode entraînement','No battles, health loss, or timers.':'Aucun combat, aucune perte de vie et aucun chronomètre.','New Question':'Nouvelle question','Check Answer':'Vérifier la réponse',
    'Captain Byte':'Capitaine Octet','Dr. Nova':'Docteure Nova','Atlas the Explorer':'Atlas l’explorateur','Test ideas from biology, physics, chemistry, Earth, and space science.':'Teste tes connaissances en biologie, physique, chimie, sciences de la Terre et de l’espace.','Travel through capitals, continents, oceans, landmarks, and maps.':'Voyage parmi les capitales, continents, océans, monuments et cartes.',
    'Overall Accuracy':'Précision générale','Questions Attempted':'Questions essayées','Words Typed':'Mots tapés','Practice Time':'Temps de pratique','Strengths':'Points forts','Needs Practice':'À travailler','Topic Accuracy':'Précision par sujet','Recommendations':'Recommandations','Other records':'Autres résultats','Keep playing across different topics to build a balanced learning record.':'Continue à jouer sur différents sujets pour construire un apprentissage équilibré.'
  };

  function translate(root=document.body) {
    if ((Player.data.settings.language || 'en') !== 'fr') return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const value=node.nodeValue.trim(); if(!value)return;
      let result=text[value];
      if(!result){let m=value.match(/^What fraction is (\d+) out of (\d+)\?$/);if(m)result=`Quelle fraction représente ${m[1]} sur ${m[2]} ?`;}
      if(!result){let m=value.match(/^Simplify (.+)$/);if(m)result=`Simplifie ${m[1]}`;}
      if(!result){let m=value.match(/^Chapter (\d+) · (.+)$/);if(m)result=`Chapitre ${m[1]} · ${m[2]}`;}
      if(!result){let m=value.match(/^Level (\d+) Hero$/);if(m)result=`Héros niveau ${m[1]}`;}
      if(result)node.nodeValue=node.nodeValue.replace(value,result);
    });
    root.querySelectorAll?.('input[placeholder]').forEach(input=>{
      const p=input.placeholder;
      if(p==='Your answer')input.placeholder='Ta réponse';
      if(p==='Type the word...'||p==='Type the word…')input.placeholder='Tape le mot…';
    });
  }

  // French vocabulary for Memory Temple's word-memory mode.
  MemoryGame.wordsSetup=function(){const language=Player.data.settings.language||'en';const lists={en:['apple','river','castle','planet','dragon','forest','silver','comet','puzzle','bridge'],fr:['pomme','rivière','château','planète','dragon','forêt','argent','comète','énigme','pont'],ar:['تفاحة','نهر','قلعة','كوكب','تنين','غابة','فضة','مذنب','لغز','جسر']};const all=[...(lists[language]||lists.en)];const shown=all.sort(()=>Math.random()-.5).slice(0,4+Math.min(3,Player.data.memoryLevel/5|0));this.state={shown,visible:true};this.timer=setTimeout(()=>{this.state.visible=false;this.state.options=[...shown,...all.filter(x=>!shown.includes(x)).slice(0,3)].sort(()=>Math.random()-.5);this.state.selected=[];App.renderGame('memory')},2600)};

  const observer=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)translate(node)})));
  observer.observe(document.body,{childList:true,subtree:true});
  const oldRender=App.render.bind(App);App.render=function(){oldRender();translate()};
  const oldGameRender=App.renderGame.bind(App);App.renderGame=function(game){oldGameRender(game);translate()};
  translate();
})();
