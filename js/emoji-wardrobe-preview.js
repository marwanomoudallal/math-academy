// Keep the wardrobe hero preview emoji-based and focused on worn items.
(function(){
  if(!window.Wardrobe?.figure)return;
  const original=Wardrobe.figure.bind(Wardrobe);
  const icons={
    'Sky T-Shirt':'👕','Forest Hoodie':'🧥','Galaxy Jacket':'🧥','Hero Suit':'🦸','Ninja Suit':'🥷','Knight Armor':'🛡️','Explorer Shirt':'👕','Space Suit':'🚀',
    'Adventure Shorts':'🩳','Knight Pants':'👖','Blue Jeans':'👖','Sport Shorts':'🩳','Shadow Cape':'🦸','Royal Cape':'🦸','Red Sneakers':'👟','Star Boots':'🥾','Blue Trainers':'👟','Green Runners':'👟','Golden Shoes':'👞',
    'Hero Cap':'🧢','Royal Crown':'👑','Wizard Hat':'🧙','Ninja Mask':'🥷','Robot Mask':'🤖','Power Gloves':'🧤','Ice Gloves':'🧤','Star Emblem':'⭐','Dragon Emblem':'🐉'
  };
  Wardrobe.figure=function(size='',override){
    if(size!=='book-large')return original(size,override);
    const o=override||Player.data.outfit||{}, worn=[o.costume||o.shirt,o.pants,o.shoes,o.hat,o.mask,o.gloves,o.emblem].filter(Boolean).map(name=>icons[name]||'✨');
    return `<div class="emoji-hero-preview book-large" aria-label="Worn items">${(worn.length?worn:['🧍']).map(icon=>`<span>${icon}</span>`).join('')}</div>`;
  };
})();
