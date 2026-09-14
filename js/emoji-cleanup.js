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
  };
  clean(document.body);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) clean(node);
    else if (node.nodeType === Node.TEXT_NODE) node.nodeValue = node.nodeValue.replace(emoji, '');
  }))).observe(document.body, {childList:true, subtree:true});
})();
