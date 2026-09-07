// Lightweight client-side localization. Internal game values remain language-neutral.
(() => {
  Player.data.settings.language ||= 'en';

  const dictionaries = {
    fr: {
      Home:'Accueil', Map:'Carte', Games:'Jeux', Shop:'Boutique', Profile:'Profil', Settings:'Paramètres',
      'Choose your path':'Choisis ton chemin', 'Adventure Realms':'Royaumes d’aventure', 'View all':'Voir tout',
      'Fresh every day':'Nouveau chaque jour', 'Daily Challenges':'Défis quotidiens',
      'Explore World Map 🗺️':'Explorer la carte 🗺️', 'Ready for your':'Prêt pour ta', 'next quest?':'prochaine quête ?',
      'Game Library':'Bibliothèque de jeux', 'Train your skills':'Entraîne tes compétences',
      'Math Battle':'Combat de maths', 'Fraction Kingdom':'Royaume des fractions', 'Typing Defense':'Défense de frappe', 'Memory Temple':'Temple de la mémoire',
      '← Games':'← Jeux', 'Your turn! Repeat the pattern.':'À toi ! Répète le motif.', 'Watch carefully…':'Regarde attentivement…', 'Repeat the pattern!':'Répète le motif !',
      'Choose Difficulty:':'Choisir la difficulté :', Easy:'Facile', Medium:'Moyen', Hard:'Difficile', Expert:'Expert', Normal:'Normal',
      WPM:'MPM', Accuracy:'Précision', Defeated:'Vaincus', Combo:'Combo', Wave:'Vague',
      'Castle Lives:':'Vies du château :', 'Try Again':'Réessayer', 'Castle Defeated!':'Château vaincu !',
      'Card Match':'Paires de cartes', Pattern:'Motif', Number:'Nombres', Words:'Mots', Picture:'Images',
      'Quest Shop':'Boutique des quêtes', Equip:'Équiper', '✓ Equipped':'✓ Équipé', 'Currently equipped.':'Actuellement équipé.', 'Ready to equip.':'Prêt à équiper.',
      'Player Leaderboard':'Classement des joueurs', Back:'Retour', 'Player Profiles':'Profils des joueurs', 'New Player':'Nouveau joueur', 'Create Player':'Créer le joueur',
      'Reset Progress':'Réinitialiser la progression', Reset:'Réinitialiser', 'Sound Effects':'Effets sonores', Animations:'Animations', Difficulty:'Difficulté',
      'Player Username':'Nom du joueur', 'Save Name':'Enregistrer', 'Begin My Adventure ➜':'Commencer mon aventure ➜',
      'Answer correctly to attack!':'Réponds correctement pour attaquer !', ATTACK:'ATTAQUER', Addition:'Addition', Subtraction:'Soustraction', Multiplication:'Multiplication', Division:'Division', 'Mixed Math':'Maths mixtes',
      'Kingdom lesson':'Leçon du royaume', 'Which fraction is larger?':'Quelle fraction est la plus grande ?', 'Upgrade Kingdom':'Améliorer le royaume',
      'Music':'Musique', 'Language':'Langue', '⚙️ Settings':'⚙️ Paramètres', '🎵 Music':'🎵 Musique',
      '🔊 Sound Effects':'🔊 Effets sonores', '✨ Animations':'✨ Animations', '🎯 Difficulty':'🎯 Difficulté', '🌐 Language':'🌐 Langue',
      '👥 Player Profiles':'👥 Profils des joueurs', '➕ New Player':'➕ Nouveau joueur',
      '✏️ Edit Current Name':'✏️ Modifier le nom actuel', Rename:'Renommer',
      'Rename this player without losing progress':'Renommer ce joueur sans perdre sa progression',
      Edit:'Modifier', 'Save Name':'Enregistrer le nom', 'Choose a new username':'Choisir un nouveau nom',
      '👥 Saved Accounts':'👥 Comptes enregistrés', 'Choose an account already saved on this device':'Choisis un compte enregistré sur cet appareil',
      '✏️ Edit Current Name':'✏️ Modifier le nom actuel', 'Rename this account without losing progress':'Renommer ce compte sans perdre sa progression',
      '🔑 Enter or Create Account':'🔑 Ouvrir ou créer un compte', 'Existing names load their progress. New names start fresh.':'Un nom existant charge sa progression. Un nouveau nom recommence à zéro.', Continue:'Continuer',
      'Switch heroes or create a new player':'Change de héros ou crée un nouveau joueur',
      'A different username starts with fresh progress':'Un nouveau nom commence une nouvelle progression',
      'Erase all local adventure data':'Effacer toutes les données de cette aventure',
      'Change the name shown on your profile':'Changer le nom affiché sur ton profil',
      'Reset all progress?':'Réinitialiser toute la progression?', Cancel:'Annuler', 'Yes, reset':'Oui, réinitialiser'
    },
    ar: {
      Home:'الرئيسية', Map:'الخريطة', Games:'الألعاب', Shop:'المتجر', Profile:'الملف الشخصي', Settings:'الإعدادات',
      'Choose your path':'اختر طريقك', 'Adventure Realms':'عوالم المغامرة', 'View all':'عرض الكل',
      'Fresh every day':'جديد كل يوم', 'Daily Challenges':'التحديات اليومية',
      'Explore World Map 🗺️':'استكشف خريطة العالم 🗺️', 'Ready for your':'هل أنت مستعد', 'next quest?':'لمهمتك القادمة؟',
      'Game Library':'مكتبة الألعاب', 'Train your skills':'درّب مهاراتك',
      'Math Battle':'معركة الرياضيات', 'Fraction Kingdom':'مملكة الكسور', 'Typing Defense':'دفاع الكتابة', 'Memory Temple':'معبد الذاكرة',
      '← Games':'الألعاب →', 'Your turn! Repeat the pattern.':'دورك! كرر النمط.', 'Watch carefully…':'شاهد بعناية…', 'Repeat the pattern!':'كرر النمط!',
      'Choose Difficulty:':'اختر الصعوبة:', Easy:'سهل', Medium:'متوسط', Hard:'صعب', Expert:'خبير', Normal:'عادي',
      WPM:'كلمة/د', Accuracy:'الدقة', Defeated:'المهزومون', Combo:'التتابع', Wave:'الموجة',
      'Castle Lives:':'أرواح القلعة:', 'Try Again':'حاول مجددًا', 'Castle Defeated!':'هُزمت القلعة!',
      'Card Match':'تطابق البطاقات', Pattern:'النمط', Number:'الأرقام', Words:'الكلمات', Picture:'الصور',
      'Quest Shop':'متجر المهام', Equip:'تجهيز', '✓ Equipped':'✓ مُجهّز', 'Currently equipped.':'مُجهّز حاليًا.', 'Ready to equip.':'جاهز للتجهيز.',
      'Player Leaderboard':'ترتيب اللاعبين', Back:'رجوع', 'Player Profiles':'ملفات اللاعبين', 'New Player':'لاعب جديد', 'Create Player':'إنشاء لاعب',
      'Reset Progress':'إعادة ضبط التقدم', Reset:'إعادة ضبط', 'Sound Effects':'المؤثرات الصوتية', Animations:'الحركات', Difficulty:'الصعوبة',
      'Player Username':'اسم اللاعب', 'Save Name':'حفظ الاسم', 'Begin My Adventure ➜':'ابدأ مغامرتي ←',
      'Answer correctly to attack!':'أجب بشكل صحيح للهجوم!', ATTACK:'هجوم', Addition:'الجمع', Subtraction:'الطرح', Multiplication:'الضرب', Division:'القسمة', 'Mixed Math':'رياضيات متنوعة',
      'Kingdom lesson':'درس المملكة', 'Which fraction is larger?':'أي كسر أكبر؟', 'Upgrade Kingdom':'تطوير المملكة',
      Music:'الموسيقى', Language:'اللغة', '⚙️ Settings':'⚙️ الإعدادات', '🎵 Music':'🎵 الموسيقى',
      '🔊 Sound Effects':'🔊 المؤثرات الصوتية', '✨ Animations':'✨ الحركات', '🎯 Difficulty':'🎯 الصعوبة', '🌐 Language':'🌐 اللغة',
      '👥 Player Profiles':'👥 ملفات اللاعبين', '➕ New Player':'➕ لاعب جديد',
      '✏️ Edit Current Name':'✏️ تعديل الاسم الحالي', Rename:'تغيير الاسم',
      'Rename this player without losing progress':'غيّر اسم هذا اللاعب دون فقدان التقدم',
      Edit:'تعديل', 'Save Name':'حفظ الاسم', 'Choose a new username':'اختر اسم مستخدم جديدًا',
      '👥 Saved Accounts':'👥 الحسابات المحفوظة', 'Choose an account already saved on this device':'اختر حسابًا محفوظًا على هذا الجهاز',
      'Rename this account without losing progress':'غيّر اسم هذا الحساب دون فقدان التقدم',
      '🔑 Enter or Create Account':'🔑 دخول أو إنشاء حساب', 'Existing names load their progress. New names start fresh.':'الاسم الموجود يحمّل تقدمه، والاسم الجديد يبدأ من الصفر.', Continue:'متابعة',
      'Switch heroes or create a new player':'بدّل بين الأبطال أو أنشئ لاعبًا جديدًا',
      'A different username starts with fresh progress':'اسم مستخدم جديد يبدأ بتقدم جديد',
      'Erase all local adventure data':'مسح جميع بيانات المغامرة المحلية',
      'Change the name shown on your profile':'غيّر الاسم الظاهر في ملفك الشخصي',
      'Reset all progress?':'إعادة ضبط كل التقدم؟', Cancel:'إلغاء', 'Yes, reset':'نعم، إعادة الضبط'
    }
  };

  const translateText = text => {
    const language = Player.data.settings.language;
    const dictionary = dictionaries[language];
    if (!dictionary) return text;
    const trimmed = text.trim();
    if (dictionary[trimmed]) return text.replace(trimmed, dictionary[trimmed]);
    const rules = language === 'ar'
      ? [[/^Level (\d+)$/,'المستوى $1'],[/^Wave (\d+)$/,'الموجة $1'],[/^Battle (\d+)$/,'المعركة $1'],[/^Your turn! (\d+) \/ (\d+)$/,'دورك! $1 / $2']]
      : [[/^Level (\d+)$/,'Niveau $1'],[/^Wave (\d+)$/,'Vague $1'],[/^Battle (\d+)$/,'Combat $1'],[/^Your turn! (\d+) \/ (\d+)$/,'À toi ! $1 / $2']];
    for (const [pattern, replacement] of rules) if (pattern.test(trimmed)) return text.replace(trimmed, trimmed.replace(pattern, replacement));
    return text;
  };

  const applyLanguage = () => {
    const language = Player.data.settings.language || 'en';
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (language === 'en') return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!['SCRIPT','STYLE','OPTION'].includes(node.parentElement?.tagName)) node.nodeValue = translateText(node.nodeValue);
    });
    document.querySelectorAll('input[placeholder]').forEach(input => {
      if (language === 'fr' && input.placeholder === 'New username') input.placeholder = 'Nouveau nom';
      if (language === 'ar' && input.placeholder === 'New username') input.placeholder = 'اسم مستخدم جديد';
    });

    // Translate visible difficulty choices while preserving the English values
    // required by the game logic.
    document.querySelectorAll('.settings select:not(.language-select):not(#profile-selector)').forEach(select => {
      const labels = language === 'fr'
        ? { Easy:'Débutant', Normal:'Explorateur', Hard:'Explorateur', Expert:'Expert' }
        : { Easy:'مبتدئ', Normal:'مستكشف', Hard:'مستكشف', Expert:'خبير' };
      [...select.options].forEach(option => {
        const internalValue = option.value;
        option.value = internalValue;
        if (labels[internalValue]) option.textContent = labels[internalValue];
      });
    });
  };

  const originalSettings = App.settings.bind(App);
  App.settings = function settingsWithLanguage() {
    const selector = `<div class="setting"><b>🌐 Language</b><select class="text-input language-select" onchange="App.changeLanguage(this.value)"><option value="en" ${Player.data.settings.language === 'en' ? 'selected' : ''}>English</option><option value="fr" ${Player.data.settings.language === 'fr' ? 'selected' : ''}>Français</option><option value="ar" ${Player.data.settings.language === 'ar' ? 'selected' : ''}>العربية</option></select></div>`;
    return originalSettings().replace('<div class="setting"><b>🎯 Difficulty</b>', `${selector}<div class="setting"><b>🎯 Difficulty</b>`);
  };

  App.changeLanguage = function changeLanguage(language) {
    Player.data.settings.language = ['en','fr','ar'].includes(language) ? language : 'en';
    Player.save();
    // Reload the original templates so switching back to English cannot leave
    // text nodes that were previously translated into French or Arabic.
    window.location.reload();
  };

  const originalRender = App.render.bind(App);
  App.render = function localizedRender() { originalRender(); applyLanguage(); };
  const originalRenderGame = App.renderGame.bind(App);
  App.renderGame = function localizedGame(game) { originalRenderGame(game); applyLanguage(); };
  const originalModal = Rewards.modal.bind(Rewards);
  Rewards.modal = function localizedModal(...args) { originalModal(...args); applyLanguage(); };

  applyLanguage();
})();
