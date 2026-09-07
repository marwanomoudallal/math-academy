// Localizes expansion screens that were added after the original language system.
(() => {
  const translations = {
    fr: {
      'New learning expeditions':'Nouvelles expéditions éducatives', 'Future Realms':'Royaumes du futur',
      'Coding Island':'Île du codage', 'Learn logic, loops, and variables.':'Apprends la logique, les boucles et les variables.',
      'Science Laboratory':'Laboratoire scientifique', 'Explore how our universe works.':'Explore le fonctionnement de notre univers.',
      'Geography World':'Monde de la géographie', 'Discover countries and our planet.':'Découvre les pays et notre planète.',
      'Answer 20 math questions':'Répondre à 20 questions de maths', 'Type 100 words':'Taper 100 mots',
      'Complete 3 memory games':'Terminer 3 jeux de mémoire', '✓ Claimed':'✓ Réclamé', Claim:'Réclamer',
      'Continue your legend':'Continue ta légende', 'Hero Adventures':'Aventures du héros',
      'Quest Story':'Histoire de quête', 'Follow five connected chapters and face the final boss.':'Suis cinq chapitres liés et affronte le boss final.',
      'Player Inventory':'Inventaire du joueur', 'View every item you own and what is active.':'Vois tous tes objets et ceux qui sont équipés.',
      'Pet Collection':'Collection de compagnons', 'Name companions and collect pet badges.':'Nomme tes compagnons et collectionne leurs badges.',
      'Math Training':'Entraînement de maths', 'Practice calmly without battles, health, or timers.':'Entraîne-toi sans combat, vies ni chronomètre.',
      'Daily Reward Calendar':'Calendrier des récompenses quotidiennes', 'Today’s reward collected. Return tomorrow!':'Récompense du jour récupérée. Reviens demain !',
      'View Calendar':'Voir le calendrier', 'Claim Reward':'Récupérer', 'Return and learn':'Reviens pour apprendre', Home:'Accueil',
      'Come back tomorrow!':'Reviens demain !', 'Claim seven consecutive daily rewards to open the special chest.':'Récupère sept récompenses quotidiennes consécutives pour ouvrir le coffre spécial.',
      'Special Chest':'Coffre spécial', '✓ Collected Today':'✓ Récupéré aujourd’hui'
      ,'Typing Fortress':'Forteresse de frappe', 'Castle Lives:':'Vies du château :', 'Type the word…':'Tape le mot…',
      'Every monster receives a different word. Each castle breach removes one life.':'Chaque monstre reçoit un mot différent. Chaque attaque du château enlève une vie.',
      'Castle Defeated!':'Château vaincu !', 'Try Again':'Réessayer'
      ,'🃏 Card Match':'🃏 Paires de cartes', '🎨 Pattern':'🎨 Motif', '🔢 Number':'🔢 Nombres', '📝 Words':'📝 Mots', '🖼️ Picture':'🖼️ Images'
      ,'🧠 Memory Temple':'🧠 Temple de la mémoire'
      ,'Explore a magical world where every answer strengthens your hero and grows your kingdom.':'Explore un monde magique où chaque réponse renforce ton héros et développe ton royaume.'
      ,'Defeat monsters with mighty math.':'Vaincs les monstres grâce aux mathématiques.'
      ,'Learn fractions. Build a kingdom.':'Apprends les fractions et construis un royaume.'
      ,'Type fast to protect the fortress.':'Tape vite pour protéger la forteresse.'
      ,'Train your memory in five modes.':'Entraîne ta mémoire avec cinq modes.'
      ,'The learning realm':'Le royaume de l’apprentissage', 'Adventure Map':'Carte de l’aventure', 'Daily quests':'Quêtes quotidiennes', Hero:'Héros'
      ,'Difficulty: Easy':'Difficulté : Facile', 'Difficulty: Normal':'Difficulté : Normal', 'Difficulty: Hard':'Difficulté : Difficile', 'Difficulty: Expert':'Difficulté : Expert'
      ,'No real money':'Aucun argent réel', 'Ready in your inventory.':'Disponible dans ton inventaire.', 'Earned through learning quests.':'À gagner grâce aux quêtes éducatives.'
      ,'Select':'Choisir', '✓ Owned':'✓ Possédé', 'Hero record':'Dossier du héros', 'Adventure Stats':'Statistiques de l’aventure'
      ,'Player Level':'Niveau du joueur', 'Total XP':'XP total', 'Trophies':'Trophées', 'Games Completed':'Parties terminées'
      ,'Math Answers':'Réponses de maths', 'Best WPM':'Meilleure vitesse', 'Best Accuracy':'Meilleure précision', 'Fraction Answers':'Réponses sur les fractions'
      ,'Memory Level':'Niveau de mémoire', 'Day Streak':'Série quotidienne', 'Leaderboard':'Classement', 'Achievements':'Succès'
      ,'unlocked':'débloqués', 'Unlocked!':'Débloqué !', 'Keep questing':'Continue les quêtes', 'Back':'Retour'
      ,'Answer correctly to attack!':'Réponds correctement pour attaquer !', 'Your answer':'Ta réponse', 'Score':'Score', 'Hero':'Héros'
      ,'Kingdom lesson':'Leçon du royaume', 'Upgrade Kingdom':'Améliorer le royaume', 'They are equal':'Ils sont égaux'
      ,'Remember this number!':'Mémorise ce nombre !', 'Check':'Vérifier', 'Remember these words':'Mémorise ces mots'
      ,'Choose every word you saw':'Choisis tous les mots que tu as vus', 'Check Memory':'Vérifier la mémoire', 'Remember each position':'Mémorise chaque position'
      ,'Seven playable realms':'Six royaumes jouables', 'Six playable realms':'Six royaumes jouables', 'Battle Arena':'Arène de combat'
      ,'Castle':'Château', 'Farm':'Ferme', 'Blacksmith':'Forge', 'Library':'Bibliothèque', 'Magic Tower':'Tour magique'
      ,'Sound Effects':'Effets sonores', 'Erase all local adventure data':'Effacer toutes les données locales de l’aventure'
      ,'Open Manual':'Ouvrir le manuel', 'Learn the controls and rules for every adventure.':'Apprends les commandes et les règles de chaque aventure.'
      ,'🏆 Leaderboard':'🏆 Classement'
      ,'🏆 Achievements':'🏆 Succès', 'First Victory':'Première victoire', 'Win a Math Battle':'Gagne un combat de maths'
      ,'Six playable realms':'Six royaumes jouables', 'Adventure Map':'Carte de l’aventure', 'Battle Arena':'Arène de combat'
      ,'Math Warrior':'Guerrier des maths', 'Answer 100 math questions':'Réponds à 100 questions de maths'
      ,'Fraction Master':'Maître des fractions', 'Complete 50 fraction challenges':'Termine 50 défis sur les fractions'
      ,'Speed Typist':'Dactylographe rapide', 'Reach 50 WPM':'Atteins 50 mots par minute'
      ,'Perfect Typist':'Dactylographe parfait', 'Get 100% accuracy':'Obtiens 100 % de précision'
      ,'Memory Master':'Maître de la mémoire', 'Reach memory level 20':'Atteins le niveau de mémoire 20'
      ,'Champion':'Champion', 'Reach player level 50':'Atteins le niveau de joueur 50'
    },
    ar: {
      'New learning expeditions':'بعثات تعليمية جديدة', 'Future Realms':'العوالم المستقبلية',
      'Coding Island':'جزيرة البرمجة', 'Learn logic, loops, and variables.':'تعلّم المنطق والحلقات والمتغيرات.',
      'Science Laboratory':'مختبر العلوم', 'Explore how our universe works.':'استكشف كيف يعمل كوننا.',
      'Geography World':'عالم الجغرافيا', 'Discover countries and our planet.':'اكتشف البلدان وكوكبنا.',
      'Answer 20 math questions':'أجب عن 20 سؤال رياضيات', 'Type 100 words':'اكتب 100 كلمة',
      'Complete 3 memory games':'أكمل 3 ألعاب ذاكرة', '✓ Claimed':'✓ تم الاستلام', Claim:'استلام',
      'Continue your legend':'واصل أسطورتك', 'Hero Adventures':'مغامرات البطل',
      'Quest Story':'قصة المغامرة', 'Follow five connected chapters and face the final boss.':'اتبع خمسة فصول مترابطة وواجه الزعيم الأخير.',
      'Player Inventory':'حقيبة اللاعب', 'View every item you own and what is active.':'شاهد كل ما تملكه وما تم تجهيزه.',
      'Pet Collection':'مجموعة الحيوانات الأليفة', 'Name companions and collect pet badges.':'سمِّ رفاقك واجمع شاراتهم.',
      'Math Training':'تدريب الرياضيات', 'Practice calmly without battles, health, or timers.':'تدرّب بهدوء دون قتال أو أرواح أو مؤقت.',
      'Daily Reward Calendar':'تقويم المكافآت اليومية', 'Today’s reward collected. Return tomorrow!':'تم استلام مكافأة اليوم. عُد غدًا!',
      'View Calendar':'عرض التقويم', 'Claim Reward':'استلام المكافأة', 'Return and learn':'عُد وتعلّم', Home:'الرئيسية',
      'Come back tomorrow!':'عُد غدًا!', 'Claim seven consecutive daily rewards to open the special chest.':'استلم سبع مكافآت يومية متتالية لفتح الصندوق الخاص.',
      'Special Chest':'الصندوق الخاص', '✓ Collected Today':'✓ تم الاستلام اليوم'
      ,'Typing Fortress':'حصن الكتابة', 'Castle Lives:':'أرواح القلعة:', 'Type the word…':'اكتب الكلمة…',
      'Every monster receives a different word. Each castle breach removes one life.':'لكل وحش كلمة مختلفة. كل وصول إلى القلعة يزيل روحًا واحدة.',
      'Castle Defeated!':'هُزمت القلعة!', 'Try Again':'حاول مجددًا'
      ,'🃏 Card Match':'🃏 تطابق البطاقات', '🎨 Pattern':'🎨 النمط', '🔢 Number':'🔢 الأرقام', '📝 Words':'📝 الكلمات', '🖼️ Picture':'🖼️ الصور'
      ,'🧠 Memory Temple':'🧠 معبد الذاكرة'
      ,'🏆 Leaderboard':'🏆 لوحة المتصدرين'
      ,'Explore a magical world where every answer strengthens your hero and grows your kingdom.':'استكشف عالمًا سحريًا حيث تقوّي كل إجابة بطلك وتُنمّي مملكتك.'
      ,'Defeat monsters with mighty math.':'اهزم الوحوش بقوة الرياضيات.'
      ,'Daily quests':'المهام اليومية'
      ,Hero:'البطل'
      ,'Learn fractions. Build a kingdom.':'تعلّم الكسور وابنِ مملكة.'
      ,'Type fast to protect the fortress.':'اكتب بسرعة لحماية الحصن.'
      ,'Train your memory in five modes.':'درّب ذاكرتك من خلال خمسة أنماط.'
      ,'🏆 Achievements':'🏆 الإنجازات', 'First Victory':'الانتصار الأول', 'Win a Math Battle':'اربح معركة رياضيات'
      ,'Six playable realms':'ستة عوالم قابلة للعب', 'Adventure Map':'خريطة المغامرة', 'Battle Arena':'ساحة المعركة'
      ,'Math Warrior':'محارب الرياضيات', 'Answer 100 math questions':'أجب عن 100 سؤال رياضيات'
      ,'Fraction Master':'خبير الكسور', 'Complete 50 fraction challenges':'أكمل 50 تحديًا في الكسور'
      ,'Speed Typist':'الكاتب السريع', 'Reach 50 WPM':'اكتب 50 كلمة في الدقيقة'
      ,'Perfect Typist':'الكاتب المثالي', 'Get 100% accuracy':'احصل على دقة 100٪'
      ,'Memory Master':'خبير الذاكرة', 'Reach memory level 20':'صل إلى مستوى الذاكرة 20'
      ,'Champion':'البطل', 'Reach player level 50':'صل إلى مستوى اللاعب 50'
    }
  };

  function translateExpansionText() {
    const language = Player.data.settings.language || 'en';
    const dictionary = translations[language];
    if (!dictionary) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const value = node.nodeValue.trim();
      let translated = dictionary[value];
      if (!translated) {
        const day = value.match(/^Day (\d+)$/);
        if (day) translated = language === 'fr' ? `Jour ${day[1]}` : `اليوم ${day[1]}`;
      }
      if (!translated) {
        const unlocked = value.match(/^(\d+) unlocked$/);
        if (unlocked) translated = language === 'fr' ? `${unlocked[1]} débloqués` : `${unlocked[1]} مفتوحة`;
      }
      if (!translated) {
        const achievements = value.match(/^(🏆\s*)?(\d+) Achievements$/);
        if (achievements) translated = language === 'fr' ? `🏆 ${achievements[2]} succès` : `🏆 ${achievements[2]} إنجازات`;
      }
      if (!translated && language === 'fr') {
        let match = value.match(/^(?:🔥\s*)?(\d+) day adventure streak$/);
        if (match) translated = `${match[1]} jours de série d’aventure`;
        match = value.match(/^(.+)'s Profile$/);
        if (match) translated = `Profil de ${match[1]}`;
        match = value.match(/^Score (\d+) ·/);
        if (match) translated = value.replace('Score', 'Score');
        match = value.match(/^Castle Lv (\d+)$/);
        if (match) translated = `Château niv. ${match[1]}`;
        match = value.match(/^Where was (.+)\?$/);
        if (match) translated = `Où se trouvait ${match[1]} ?`;
      }
      if (!translated && language === 'ar') {
        const streak = value.match(/^(?:🔥\s*)?(\d+) day adventure streak$/);
        if (streak) translated = `🔥 سلسلة مغامرات لمدة ${streak[1]} يوم`;
      }
      if (!translated) {
        const playerLevel = value.match(/^(?:⭐\s*)?Level (\d+)$/);
        if (playerLevel) translated = language === 'fr' ? `⭐ Niveau ${playerLevel[1]}` : `⭐ المستوى ${playerLevel[1]}`;
      }
      if (!translated) {
        const castleLevel = value.match(/^Castle Lv (\d+)$/);
        if (castleLevel) translated = language === 'fr' ? `Château niv. ${castleLevel[1]}` : `القلعة، المستوى ${castleLevel[1]}`;
      }
      if (!translated) {
        const enemy = value.match(/^(Lv \d+ )(?:BOSS )?(Green Slime|Goblin|Skeleton|Forest Troll|Stone Golem|Ice Wizard|Shadow Knight|Robot Warrior|Dragon)$/);
        if (enemy) {
          const names = language === 'fr'
            ? { 'Green Slime':'Gelée verte', Goblin:'Gobelin', Skeleton:'Squelette', 'Forest Troll':'Troll de la forêt', 'Stone Golem':'Golem de pierre', 'Ice Wizard':'Sorcier de glace', 'Shadow Knight':'Chevalier de l’ombre', 'Robot Warrior':'Guerrier robot', Dragon:'Dragon' }
            : { 'Green Slime':'الوحل الأخضر', Goblin:'العفريت', Skeleton:'الهيكل العظمي', 'Forest Troll':'قزم الغابة', 'Stone Golem':'الغول الحجري', 'Ice Wizard':'ساحر الجليد', 'Shadow Knight':'فارس الظلال', 'Robot Warrior':'المحارب الآلي', Dragon:'التنين' };
          const level = enemy[1].match(/\d+/)[0];
          const boss = value.includes('BOSS ') ? (language === 'fr' ? 'BOSS ' : 'الزعيم ') : '';
          translated = language === 'fr' ? `Niv. ${level} ${boss}${names[enemy[2]]}` : `المستوى ${level} ${boss}${names[enemy[2]]}`;
        }
      }
      if (translated) node.nodeValue = node.nodeValue.replace(value, translated);
    });
    document.querySelectorAll('input[placeholder]').forEach(input => {
      const translated = dictionary[input.placeholder];
      if (translated) input.placeholder = translated;
    });
  }

  const previousRender = App.render.bind(App);
  App.render = function renderWithExpansionLanguage() {
    previousRender();
    translateExpansionText();
  };
  const previousGameRender = App.renderGame.bind(App);
  App.renderGame = function renderGameWithExpansionLanguage(game) {
    previousGameRender(game);
    translateExpansionText();
  };
  translateExpansionText();
})();
