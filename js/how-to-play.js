// A localized gameplay manual available from Settings.
(() => {
  const manuals = {
    en: {
      title: 'How to Play', button: 'Open Manual', subtitle: 'Learn the controls and rules for every adventure.', close: 'Got it!',
      body: `<div class="manual-content"><p class="manual-tip"><b>🧭 Start here:</b> Choose a realm from Home, the World Map, or All Games. Progress saves automatically on this device.</p><h3>⚔️ Math Battle</h3><ul><li>Choose Addition, Subtraction, Multiplication, Division, or Mixed Math.</li><li>Type the answer and press Attack. Correct answers damage the monster.</li><li>Build a combo for stronger attacks. Wrong answers damage your hero.</li></ul><h3>🏰 Fraction Kingdom</h3><ul><li>Choose the correct fraction answer. Its position changes each round.</li><li>Correct answers earn wood, stone, gold, XP, and coins.</li><li>Spend resources to upgrade your kingdom.</li></ul><h3>⌨️ Typing Defense</h3><ul><li>Type the word shown above the approaching monster.</li><li>Each monster that reaches the castle removes one of its five lives.</li><li>Defeat monsters to improve your WPM, accuracy, combo, and wave.</li></ul><h3>🧠 Memory Temple</h3><ul><li>Choose Easy, Medium, or Hard, then select a memory mode.</li><li>Card Match: find pairs. Pattern: repeat the colored sequence.</li><li>Number, Word, and Picture modes test different memory skills.</li></ul><h3>⭐ Progress and Rewards</h3><ul><li>Games award XP, coins, gems, and trophies. Earn enough XP to level up.</li><li>Complete daily challenges and achievements for bonus rewards.</li><li>Use coins in the Shop. Only one avatar skin can be equipped at a time.</li></ul><h3>👥 Player Profiles</h3><p>Create or switch players in Settings. Each username has separate progress, equipment, records, and leaderboard results.</p></div>`
    },
    fr: {
      title: 'Comment jouer', button: 'Ouvrir le manuel', subtitle: 'Apprends les commandes et les règles de chaque aventure.', close: 'Compris !',
      body: `<div class="manual-content"><p class="manual-tip"><b>🧭 Pour commencer :</b> Choisis un royaume depuis l’accueil, la carte ou Tous les jeux. La progression est enregistrée automatiquement.</p><h3>⚔️ Combat de maths</h3><ul><li>Choisis l’addition, la soustraction, la multiplication, la division ou les maths mixtes.</li><li>Écris la réponse puis attaque. Une bonne réponse blesse le monstre.</li><li>Enchaîne les bonnes réponses pour créer un combo puissant.</li></ul><h3>🏰 Royaume des fractions</h3><ul><li>Choisis la bonne fraction. Sa position change à chaque question.</li><li>Les bonnes réponses donnent des ressources, de l’XP et des pièces.</li><li>Utilise les ressources pour améliorer ton royaume.</li></ul><h3>⌨️ Défense de frappe</h3><ul><li>Tape le mot affiché au-dessus du monstre.</li><li>Chaque monstre qui atteint le château retire une des cinq vies.</li><li>Bats les monstres pour améliorer ta vitesse, ta précision et ton combo.</li></ul><h3>🧠 Temple de la mémoire</h3><ul><li>Choisis Facile, Moyen ou Difficile, puis un mode.</li><li>Associe les cartes ou répète la séquence de couleurs.</li><li>Les modes nombres, mots et images entraînent d’autres mémoires.</li></ul><h3>⭐ Progression</h3><ul><li>Les jeux donnent de l’XP, des pièces, des gemmes et des trophées.</li><li>Termine les défis quotidiens et les succès.</li><li>Utilise les pièces dans la boutique. Un seul skin peut être équipé.</li></ul><h3>👥 Profils</h3><p>Crée ou change de joueur dans les paramètres. Chaque joueur garde sa propre progression.</p></div>`
    },
    ar: {
      title: 'كيفية اللعب', button: 'فتح دليل اللعب', subtitle: 'تعلّم التحكم وقواعد كل مغامرة.', close: 'فهمت!',
      body: `<div class="manual-content"><p class="manual-tip"><b>🧭 ابدأ من هنا:</b> اختر عالمًا من الرئيسية أو خريطة العالم أو كل الألعاب. يتم حفظ التقدم تلقائيًا على هذا الجهاز.</p><h3>⚔️ معركة الرياضيات</h3><ul><li>اختر الجمع أو الطرح أو الضرب أو القسمة أو الرياضيات المتنوعة.</li><li>اكتب الإجابة واضغط هجوم. الإجابة الصحيحة تضر الوحش.</li><li>اجمع إجابات صحيحة متتالية للحصول على هجوم أقوى.</li></ul><h3>🏰 مملكة الكسور</h3><ul><li>اختر إجابة الكسر الصحيحة. يتغير مكانها في كل سؤال.</li><li>الإجابات الصحيحة تمنح موارد ونقاط خبرة وعملات.</li><li>استخدم الموارد لتطوير مملكتك.</li></ul><h3>⌨️ دفاع الكتابة</h3><ul><li>اكتب الكلمة التي تظهر فوق الوحش.</li><li>كل وحش يصل إلى القلعة يزيل روحًا من الأرواح الخمس.</li><li>اهزم الوحوش لتحسين السرعة والدقة والتتابع.</li></ul><h3>🧠 معبد الذاكرة</h3><ul><li>اختر سهل أو متوسط أو صعب ثم اختر نمط الذاكرة.</li><li>طابق البطاقات أو كرر تسلسل الألوان.</li><li>أنماط الأرقام والكلمات والصور تدرب مهارات ذاكرة مختلفة.</li></ul><h3>⭐ التقدم والمكافآت</h3><ul><li>تمنح الألعاب خبرة وعملات وجواهر وكؤوسًا.</li><li>أكمل التحديات اليومية والإنجازات.</li><li>استخدم العملات في المتجر. يمكن تجهيز مظهر واحد فقط.</li></ul><h3>👥 ملفات اللاعبين</h3><p>أنشئ لاعبًا أو بدّل اللاعبين من الإعدادات. لكل اسم تقدم وتجهيزات ونتائج منفصلة.</p></div>`
    }
  };

  const originalSettings = App.settings.bind(App);
  App.settings = function settingsWithManual() {
    const manual = manuals[Player.data.settings.language] || manuals.en;
    const setting = `<div class="setting manual-setting"><div><b>📖 ${manual.title}</b><div class="muted">${manual.subtitle}</div></div><button class="btn" onclick="App.openHowToPlay()">${manual.button}</button></div>`;
    return originalSettings().replace('<div class="setting"><div><b>Reset Progress</b>', `${setting}<div class="setting"><div><b>Reset Progress</b>`);
  };

  App.openHowToPlay = function openHowToPlay() {
    const manual = manuals[Player.data.settings.language] || manuals.en;
    Rewards.modal(manual.title, manual.body, '📖', `<button class="btn" data-close>${manual.close}</button>`);
  };
})();
