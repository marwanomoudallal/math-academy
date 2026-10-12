// Reuse the same illustrated hero for each wardrobe card, wearing only that item.
(() => {
  if (!window.Wardrobe || !window.WardrobeCatalog) return;
  const slug = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const originalRender = Wardrobe.render;
  Wardrobe.render = function illustratedCardRender() {
    const html = originalRender.apply(this, arguments);
    const root = document.createElement('div');
    root.innerHTML = html;
    root.querySelectorAll('.outfit-card').forEach(card => {
      const itemClass = [...card.classList].find(name => name.startsWith('outfit-') && name !== 'outfit-card');
      const item = window.WardrobeCatalog.find(entry => `outfit-${slug(entry[1])}` === itemClass);
      const holder = [...card.children].find(child => child.tagName === 'SPAN');
      if (!item || !holder) return;
      const outfit = { ...(Player.data.outfit || {}) };
      // Clear the default outfit first so this card shows only its selected item.
      ['costume', 'shirt', 'pants', 'shoes', 'mask', 'hat', 'boyHair', 'girlHair', 'gloves', 'emblem', 'belt', 'cape', 'wings', 'weapon', 'backpack', 'necklace', 'aura', 'glasses'].forEach(slot => { outfit[slot] = ''; });
      outfit.body = Player.data.outfit?.body || 'Boy Hero';
      outfit.face = 'Happy Face';
      outfit.pose = 'Ready Pose';
      outfit[item[0]] = item[1];
      holder.classList.add('illustrated-preview');
      holder.replaceChildren();
      holder.insertAdjacentHTML('afterbegin', Wardrobe.figure('small', outfit));
    });
    return root.innerHTML;
  };
})();
