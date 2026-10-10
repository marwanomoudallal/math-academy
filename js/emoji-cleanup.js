// Keep the interface artwork-only: remove legacy emoji characters from rendered UI text.
(function () {
  const emoji = /[\u{1F000}-\u{1FAFF}\u{2300}-\u{23FF}\u{2600}-\u{27BF}\uFE0F\u200D]/gu;
  const clean = root => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(text => {
      if (text.parentElement?.closest('script,style,textarea,input')) return;
      const value = text.nodeValue.replace(emoji, '').replace(/ {2,}/g, ' ');
      if (value !== text.nodeValue) text.nodeValue = value;
    });
    const cards = [];
    if (root.matches?.('.expansion-card')) cards.push(root);
    root.querySelectorAll?.('.expansion-card').forEach(card => cards.push(card));
    cards.forEach(card => {
      const art = {story:'web-open-book.svg',inventory:'web-backpack.svg','pet-book':'web-paw.svg','math-training':'web-pencil.svg'}[card.dataset.page];
      const icon = card.querySelector('.emoji');
      if (art && icon) { icon.style.backgroundImage = `url("assets/${art}")`; icon.style.backgroundSize = 'contain'; icon.style.backgroundRepeat = 'no-repeat'; }
    });
    const themed = (selector, art) => root.querySelectorAll?.(selector).forEach(el => {
      el.style.fontSize = '0'; el.style.display = 'block'; el.style.width = '74px'; el.style.height = '74px';
      el.style.margin = '0 auto 8px'; el.style.background = `url("assets/${art}") center/contain no-repeat`;
    });
    themed('.shop-item .emoji', 'inventory-backpack-art.svg');
    themed('.wardrobe-item > span', 'math-training-art.svg');
    themed('.pet-book-card .emoji', 'pet-collection-art.svg');
    root.querySelectorAll?.('.book-item.outfit-card > span').forEach(slot => {
      if (!window.Wardrobe?.figure || slot.classList.contains('item-character')) return;
      slot.classList.add('item-character');
      const category = window.Player?.data?.wardrobeCategory || 'shoes';
      const item = slot.parentElement?.querySelector('b')?.textContent?.trim() || '';
      const art = {shoes:'web-sneaker.svg',costume:'web-castle.svg',pants:'web-calculator.svg',cape:'web-rocket.svg',backpack:'web-backpack.svg',pets:'web-paw.svg'}[category] || 'web-pencil.svg';
      slot.innerHTML = '';
      slot.style.backgroundImage = `url("assets/${art}")`;
      slot.style.backgroundPosition = 'center';
      slot.style.backgroundSize = 'contain';
      slot.style.backgroundRepeat = 'no-repeat';
    });
  };
  const clarifyHud = () => {
    const stats = document.querySelector('.top-stats');
    if (!stats) return;
    const xp = document.getElementById('xp');
    const coins = document.getElementById('coins');
    const gems = document.getElementById('gems');
    const setStat = (selector, label, value) => {
      const pill = stats.querySelector(selector);
      if (!pill || !value) return;
      if (pill.classList.contains('clear-stat')) return;
      pill.classList.add('clear-stat');
      pill.innerHTML = `<span class="stat-label">${label}</span><b id="${value.id}">${value.textContent || '0'}</b>`;
      pill.setAttribute('aria-label', label);
    };
    setStat('.pill:nth-child(1)', 'XP', xp);
    setStat('.pill:nth-child(2)', 'Coins', coins);
    setStat('.pill:nth-child(3)', 'Gems', gems);
    const settings = stats.querySelector('.icon-btn');
    if (settings && !settings.classList.contains('settings-btn')) {
      settings.classList.add('settings-btn');
      settings.textContent = 'Settings';
      settings.title = 'Settings';
      settings.setAttribute('aria-label', 'Settings');
    }
  };
  clarifyHud();
  clean(document.body);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) clean(node);
    else if (node.nodeType === Node.TEXT_NODE) node.nodeValue = node.nodeValue.replace(emoji, '');
  }))).observe(document.body, {childList:true, subtree:true});
  new MutationObserver(clarifyHud).observe(document.querySelector('.topbar') || document.body, {childList:true, subtree:true});
})();
