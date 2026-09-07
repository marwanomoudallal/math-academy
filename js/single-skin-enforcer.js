// Final compatibility pass for profiles created before single-skin support.
(() => {
  const enforce = () => {
    Player.data.equippedSkin = Player.data.avatarName || Player.data.equippedSkin || 'Wizard';
    delete Player.data.equippedAvatar;
    delete Player.data.selectedAvatar;
    delete Player.data.skin;
  };

  enforce();
  Player.save();

  const originalEquip = App.equipShopItem.bind(App);
  App.equipShopItem = function equipOneSkin(name, icon, type) {
    if (type === 'Avatar') {
      enforce();
      Player.data.avatarName = name;
      Player.data.equippedSkin = name;
      Player.data.avatar = icon;
    }
    originalEquip(name, icon, type);
    enforce();
    Player.save();
  };
})();
