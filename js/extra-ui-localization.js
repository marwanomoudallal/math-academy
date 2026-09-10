// Final vocabulary for reward, training, and customization screens.
(() => {
  const dictionaries = {
    fr: {
      'Daily Reward': 'Récompense quotidienne',
      'Daily Reward Calendar': 'Calendrier des récompenses quotidiennes',
      'Daily Reward!': 'Récompense quotidienne !',
      'Day 1 reward is ready.': 'La récompense du jour 1 est prête.',
      'Day 2 reward is ready.': 'La récompense du jour 2 est prête.',
      'Day 3 reward is ready.': 'La récompense du jour 3 est prête.',
      'Day 4 reward is ready.': 'La récompense du jour 4 est prête.',
      'Day 5 reward is ready.': 'La récompense du jour 5 est prête.',
      'Day 6 reward is ready.': 'La récompense du jour 6 est prête.',
      'Day 7 reward is ready.': 'La récompense du jour 7 est prête.',
      'Day 1 reward is ready': 'La récompense du jour 1 est prête',
      'Day 2 reward is ready': 'La récompense du jour 2 est prête',
      'Day 3 reward is ready': 'La récompense du jour 3 est prête',
      'Day 4 reward is ready': 'La récompense du jour 4 est prête',
      'Day 5 reward is ready': 'La récompense du jour 5 est prête',
      'Day 6 reward is ready': 'La récompense du jour 6 est prête',
      'Day 7 reward is ready': 'La récompense du jour 7 est prête',
      'Math Training': 'Entraînement de maths',
      'No battles · No timer · No health': 'Aucun combat · Aucun chrono · Aucune vie',
      'Hats & Crowns': 'Chapeaux et couronnes',
      'Necklaces': 'Colliers',
      'Cape': 'Cape',
      'Wings': 'Ailes',
      'Weapons & Tools': 'Armes et outils',
      'Backpacks': 'Sacs à dos',
      'Auras': 'Auras',
      'Backgrounds': 'Arrière-plans',
      'Hero Poses': 'Poses du héros',
      '0 Tried': '0 essayé',
      'Tried': 'Essayées',
      'Correct': 'Correctes',
      'Your answer': 'Ta réponse',
      'Check Answer': 'Vérifier la réponse',
      'Take your time. Mistakes do not remove health.': 'Prends ton temps. Les erreurs ne retirent pas de vie.'
    },
    ar: {
      'Daily Reward': 'المكافأة اليومية',
      'Daily Reward Calendar': 'تقويم المكافآت اليومية',
      'Daily Reward!': 'المكافأة اليومية!',
      'Day 1 reward is ready.': 'مكافأة اليوم 1 جاهزة.',
      'Day 2 reward is ready.': 'مكافأة اليوم 2 جاهزة.',
      'Day 3 reward is ready.': 'مكافأة اليوم 3 جاهزة.',
      'Day 4 reward is ready.': 'مكافأة اليوم 4 جاهزة.',
      'Day 5 reward is ready.': 'مكافأة اليوم 5 جاهزة.',
      'Day 6 reward is ready.': 'مكافأة اليوم 6 جاهزة.',
      'Day 7 reward is ready.': 'مكافأة اليوم 7 جاهزة.',
      'Day 1 reward is ready': 'مكافأة اليوم 1 جاهزة',
      'Day 2 reward is ready': 'مكافأة اليوم 2 جاهزة',
      'Day 3 reward is ready': 'مكافأة اليوم 3 جاهزة',
      'Day 4 reward is ready': 'مكافأة اليوم 4 جاهزة',
      'Day 5 reward is ready': 'مكافأة اليوم 5 جاهزة',
      'Day 6 reward is ready': 'مكافأة اليوم 6 جاهزة',
      'Day 7 reward is ready': 'مكافأة اليوم 7 جاهزة',
      'Math Training': 'تدريب الرياضيات',
      'No battles · No timer · No health': 'بلا قتال · بلا مؤقت · بلا أرواح',
      'Hats & Crowns': 'القبعات والتيجان',
      'Necklaces': 'القلائد',
      'Cape': 'عباءة',
      'Wings': 'أجنحة',
      'Weapons & Tools': 'الأسلحة والأدوات',
      'Backpacks': 'حقائب الظهر',
      'Auras': 'الهالات',
      'Backgrounds': 'الخلفيات',
      'Hero Poses': 'وضعيات البطل',
      '0 Tried': 'جرّبت 0',
      'Tried': 'تمت المحاولة',
      'Correct': 'صحيحة',
      'Your answer': 'إجابتك',
      'Check Answer': 'تحقق من الإجابة',
      'Take your time. Mistakes do not remove health.': 'خذ وقتك. الأخطاء لا تنقص الأرواح.'
    }
  };

  function apply() {
    const language = window.Player?.data?.settings?.language || 'en';
    const dictionary = dictionaries[language];
    if (!dictionary) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement?.closest('script,style,input,textarea,select')) return;
      const value = node.nodeValue.trim();
      let translated = dictionary[value];
      const ready = value.match(/^Day (\d+) reward is ready\.?$/);
      if (ready) translated = language === 'fr' ? `La récompense du jour ${ready[1]} est prête.` : `مكافأة اليوم ${ready[1]} جاهزة.`;
      const tried = value.match(/^(\d+) Tried$/);
      if (tried) translated = language === 'fr' ? `${tried[1]} essayées` : `تمت محاولة ${tried[1]}`;
      if (translated) node.nodeValue = node.nodeValue.replace(value, translated);
    });
  }

  window.addEventListener('playerchange', apply);
  new MutationObserver(apply).observe(document.body, { childList: true, subtree: true });
  setTimeout(apply, 0);
})();
