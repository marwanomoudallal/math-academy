// Provides visible, persistent equipment states for every shop category.
(() => {
  const items = [
    ['Knight', '🛡️', 0, 'Avatar'], ['Wizard', '🧙', 0, 'Avatar'],
    ['Explorer', '🧭', 350, 'Avatar'], ['Robot', '🤖', 500, 'Avatar'],
    ['Ninja', '🥷', 650, 'Avatar'], ['Scientist', '🥼', 800, 'Avatar'],
    ['Dog', '🐶', 250, 'Pet'], ['Cat', '🐱', 250, 'Pet'],
    ['Baby Dragon', '🐉', 900, 'Pet'], ['Mini Robot', '🤖', 700, 'Pet'],
    ['Fox', '🦊', 500, 'Pet'], ['Owl', '🦉', 450, 'Pet'],
    ['Moon Sword', '🗡️', 450, 'Gear'], ['Crystal Shield', '🛡️', 550, 'Gear'],
    ['Royal Frame', '👑', 400, 'Profile'], ['Fire Frame', '🔥', 450, 'Profile'],
    ['Ice Frame', '❄️', 450, 'Profile'], ['Galaxy Frame', '🌌', 600, 'Profile'],
    ['Forest Frame', '🌿', 400, 'Profile'], ['Ocean Frame', '🌊', 400, 'Profile'],
    ['Rainbow Frame', '🌈', 650, 'Profile'], ['Dragon Frame', '🐲', 800, 'Profile'],
    ['Golden Frame', '⭐', 700, 'Profile'], ['Shadow Frame', '🌑', 550, 'Profile'],
    ['Galaxy Keys', '🌌', 600, 'Theme'], ['Ocean Keys', '🌊', 450, 'Theme'],
    ['Forest Keys', '🌿', 450, 'Theme'], ['Candy Keys', '🍬', 500, 'Theme'],
    ['Fire Keys', '🔥', 550, 'Theme'],
    ['Cherry Castle', '🌸', 700, 'Decoration'],
    ['Dragon Statues', '🐲', 800, 'Decoration'],
    ['Royal Garden', '🌷', 650, 'Decoration']
  ];

  // Migrate older saves to the single equipped-skin slot.
  Player.data.equippedSkin = Player.data.avatarName || Player.data.equippedSkin || 'Wizard';
  delete Player.data.equippedAvatar;
  delete Player.data.selectedAvatar;
  delete Player.data.skin;
  Player.save();

  const equippedName = type => ({
    Avatar: Player.data.equippedSkin,
    Pet: Player.data.petName,
    Gear: Player.data.equippedGear,
    Profile: Player.data.equippedProfile,
    Theme: Player.data.equippedTheme,
    Decoration: Player.data.equippedDecoration
  })[type];

  const applyKeyboardTheme = () => {
    const name = Player.data.equippedTheme || '';
    document.body.dataset.keyboardTheme = name.toLowerCase().replace(/\s+keys$/, '').replace(/\s+/g, '-');
  };

  const applyCastleDecoration = () => {
    const name = Player.data.equippedDecoration || '';
    document.body.dataset.castleDecoration = name.toLowerCase().replace(/\s+/g, '-');
  };

  const applyProfileFrame = () => {
    const name = Player.data.equippedProfile || '';
    document.body.dataset.profileFrame = name.toLowerCase().replace(/\s+frame$/, '').replace(/\s+/g, '-');
  };

  applyKeyboardTheme();
  applyCastleDecoration();
  applyProfileFrame();
  window.addEventListener('playerchange', applyKeyboardTheme);
  window.addEventListener('playerchange', applyCastleDecoration);
  window.addEventListener('playerchange', applyProfileFrame);

  App.shop = function equipmentShop() {
    const data = Player.data;
    // Older profiles may contain two conflicting skin fields. The avatar
    // actually displayed by the game is the single source of truth.
    data.equippedSkin = data.avatarName || data.equippedSkin || 'Wizard';
    const language = data.settings.language || 'en';
    const translatedItemNames = {
      fr: { Knight:'Chevalier', Wizard:'Sorcier', Explorer:'Explorateur', Robot:'Robot', Ninja:'Ninja', Scientist:'Scientifique' },
      ar: { Knight:'فارس', Wizard:'ساحر', Explorer:'مستكشف', Robot:'روبوت', Ninja:'نينجا', Scientist:'عالِم' }
    }[language] || {};
    const sectionText = {
      en: {
        Avatar:['🎭 Skins','Changes your hero avatar. Only one skin can be equipped at a time.'],
        Pet:['🐾 Pets','Cosmetic companions that follow your hero.'],
        Gear:['⚔️ Gear','Cosmetic swords and shields for your collection.'],
        Profile:['🖼️ Profile Frames','Decorations for your player profile.'],
        Theme:['⌨️ Keyboard Themes','Styles for your Typing Defense keyboard.'],
        Decoration:['🏰 Castle Decorations','Decorations for your Fraction Kingdom.']
      },
      fr: {
        Avatar:['🎭 Skins','Change ton héros. Un seul skin peut être équipé.'],
        Pet:['🐾 Animaux','Compagnons cosmétiques qui suivent ton héros.'],
        Gear:['⚔️ Équipement','Épées et boucliers cosmétiques.'],
        Profile:['🖼️ Cadres de profil','Décorations pour ton profil.'],
        Theme:['⌨️ Thèmes de clavier','Styles pour le clavier de Défense de frappe.'],
        Decoration:['🏰 Décorations du château','Décorations pour le Royaume des fractions.']
      },
      ar: {
        Avatar:['🎭 المظاهر','يغيّر شكل بطلك. يمكن تجهيز مظهر واحد فقط.'],
        Pet:['🐾 الحيوانات الأليفة','رفاق تجميليون يتبعون بطلك.'],
        Gear:['⚔️ المعدات','سيوف ودروع تجميلية لمجموعتك.'],
        Profile:['🖼️ إطارات الملف','زينة لملف اللاعب.'],
        Theme:['⌨️ سمات لوحة المفاتيح','أشكال للوحة مفاتيح دفاع الكتابة.'],
        Decoration:['🏰 زينة القلعة','زينة لمملكة الكسور.']
      }
    }[language] || null;

    const renderItem = ([name, icon, cost, type]) => {
      const displayName = translatedItemNames[name] || name;
      const owned = data.inventory.includes(name);
      const equipped = equippedName(type) === name;
      let action;
      if (equipped && type === 'Avatar') action = '<button class="btn green" disabled>✓ Only Equipped Skin</button>';
      else if (equipped) action = '<button class="btn green" disabled>✓ Active Accessory</button>';
      else if (owned) action = `<button class="btn green" data-shop-equip="${name}" data-shop-icon="${icon}" data-shop-type="${type}">Equip</button>`;
      else action = `<button class="btn gold" data-shop-buy="${name}" data-shop-icon="${icon}" data-shop-cost="${cost}" data-shop-type="${type}">🪙 ${cost}</button>`;
      const categoryLabel = type === 'Avatar' ? 'Skin · One equipped at a time' : type;
      const equippedClass = equipped ? (type === 'Avatar' ? 'shop-equipped skin-equipped' : 'accessory-active') : '';
      return `<article class="shop-item card ${equippedClass}" data-shop-category="${type}"><div class="emoji">${icon}</div><h3>${displayName}</h3><small class="muted">${categoryLabel}</small><p>${equipped ? (type === 'Avatar' ? 'This is your only equipped skin.' : 'Active accessory in a separate slot.') : owned ? 'Ready to equip.' : 'Earned through learning quests.'}</p>${action}</article>`;
    };

    const itemWord = language === 'fr' ? 'articles' : language === 'ar' ? 'عناصر' : 'items';
    const sections = ['Avatar','Pet','Gear','Profile','Theme','Decoration'].map(type => {
      const [title, description] = sectionText?.[type] || [type, ''];
      return `<section class="shop-section" data-shop-section="${type}"><div class="shop-section-head"><div><h2>${title}</h2><p>${description}</p></div><span>${items.filter(item => item[3] === type).length} ${itemWord}</span></div><div class="shop-grid">${items.filter(item => item[3] === type).map(renderItem).join('')}</div></section>`;
    }).join('');

    return `<div class="page-head"><div><p class="eyebrow">No real money</p><h1>Quest Shop</h1></div><span class="pill">🪙 ${data.coins} · 💎 ${data.gems}</span></div>${sections}`;
  };

  App.equipShopItem = function equipShopItem(name, icon, type) {
    if (!Player.data.inventory.includes(name)) return;
    if (type === 'Avatar') {
      // One skin slot: assigning a new value always removes the prior skin.
      delete Player.data.equippedAvatar;
      delete Player.data.selectedAvatar;
      delete Player.data.skin;
      Player.data.avatar = icon;
      Player.data.avatarName = name;
      Player.data.equippedSkin = name;
    } else if (type === 'Pet') {
      Player.data.pet = icon;
      Player.data.petName = name;
    } else if (type === 'Gear') Player.data.equippedGear = name;
    else if (type === 'Profile') {
      Player.data.equippedProfile = name;
      applyProfileFrame();
    }
    else if (type === 'Theme') {
      Player.data.equippedTheme = name;
      applyKeyboardTheme();
    }
    else if (type === 'Decoration') {
      Player.data.equippedDecoration = name;
      applyCastleDecoration();
    }
    Player.save();
    const savedName = type === 'Avatar' ? Player.data.equippedSkin : equippedName(type);
    Rewards.toast(savedName === name ? `✅ ${name} equipped!` : `Could not equip ${name}. Please try again.`);
    App.render();
  };

  App.buyAndEquip = function buyAndEquip(name, icon, cost, type) {
    if (Player.data.coins < cost) return Rewards.toast('Keep questing to earn more coins!');
    Player.data.coins -= cost;
    if (!Player.data.inventory.includes(name)) Player.data.inventory.push(name);
    App.equipShopItem(name, icon, type);
  };

  // Delegated controls keep working after the shop is re-rendered.
  document.addEventListener('click', event => {
    const equipButton = event.target.closest('[data-shop-equip]');
    const buyButton = event.target.closest('[data-shop-buy]');
    if (equipButton) {
      event.preventDefault();
      App.equipShopItem(equipButton.dataset.shopEquip, equipButton.dataset.shopIcon, equipButton.dataset.shopType);
    } else if (buyButton) {
      event.preventDefault();
      App.buyAndEquip(buyButton.dataset.shopBuy, buyButton.dataset.shopIcon, Number(buyButton.dataset.shopCost), buyButton.dataset.shopType);
    }
  });
})();
