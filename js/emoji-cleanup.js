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
      const art = {story:'quest-story-art.svg',inventory:'inventory-backpack-art.svg','pet-book':'pet-collection-art.svg','math-training':'math-training-art.svg'}[card.dataset.page];
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
  };
  clean(document.body);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) clean(node);
    else if (node.nodeType === Node.TEXT_NODE) node.nodeValue = node.nodeValue.replace(emoji, '');
  }))).observe(document.body, {childList:true, subtree:true});
})();
