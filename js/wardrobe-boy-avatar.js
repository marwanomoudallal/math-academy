// Neutral cartoon-boy starter body. Wearable choices layer on top of this base.
(() => {
  const ensureBoyBase = () => { if (!Player.data.outfitBaseInitialized) {
    Player.data.outfit ||= {};
    // Migration must add missing slots without erasing an older hero's clothes.
    ['shirt','costume','pants','hat','boyHair','girlHair','mask','gloves','emblem','belt','cape','shoes','glasses','wings','weapon','backpack','necklace','aura'].forEach(slot=>Player.data.outfit[slot]??='');
    Player.data.outfit.background||='Bedroom';
    Player.data.outfit.pose||='Ready Pose';
    Player.data.outfitBaseInitialized=true;
    Player.save();
  }};
  ensureBoyBase();
  ['Boy Hero','Girl Hero'].forEach(name=>{if(!Player.data.inventory.includes(name))Player.data.inventory.push(name)});
  if (!['Boy Hero','Girl Hero'].includes(Player.data.outfit.body)) Player.data.outfit.body='Boy Hero';
  Player.save();
  const colors={'Sky T-Shirt':'#42a5f5','Forest Hoodie':'#43a047','Galaxy Jacket':'#673ab7','Hero Suit':'#d32f2f','Ninja Suit':'#263238','Knight Armor':'#78909c','Explorer Shirt':'#ef6c00','Space Suit':'#eceff1','Dragon Armor':'#2e7d32','Wizard Robe':'#512da8','Academy Uniform':'#3949ab','Sports Star':'#ec407a','Super Girl Suit':'#d81b60','Moon Knight Armor':'#7986cb','Forest Ranger':'#43a047','Crystal Princess':'#7e57c2','Galaxy Explorer':'#5c6bc0','Dragon Rider':'#00897b','Magic Academy':'#8e24aa','Phoenix Guardian':'#f4511e','Adventure Shorts':'#ffb74d','Knight Pants':'#455a64','Blue Jeans':'#1565c0','Sport Shorts':'#e53935','Explorer Pants':'#6d4c41','Ninja Pants':'#212121','Snow Pants':'#90caf9','Space Pants':'#eceff1','Dragon Pants':'#2e7d32','Royal Pants':'#6a1b9a','Red Sneakers':'#e53935','Star Boots':'#fbc02d','Blue Trainers':'#1976d2','Green Runners':'#43a047','Golden Shoes':'#f9a825','Knight Boots':'#795548','Snow Boots':'#90caf9','Rocket Shoes':'#ef6c00','Shadow Shoes':'#263238','Royal Shoes':'#7b1fa2','Shadow Cape':'#202030','Royal Cape':'#b71c1c','Hero Cape':'#e53935','Ocean Cape':'#1976d2','Forest Cape':'#388e3c','Golden Cape':'#f9a825','Fire Cape':'#ef6c00','Ice Cape':'#80deea','Dragon Cape':'#2e7d32','Galaxy Cape':'#4527a0'};
  const skins={'Boy Hero':'#f2dcca','Girl Hero':'#f2dcca','Warm Body':'#f2b38f','Golden Body':'#c98656','Bronze Body':'#ad7145','Cocoa Body':'#825033','Moon Body':'#ead1bd','Sunset Body':'#d99a72','Ocean Body':'#75b9c7','Alien Body':'#75c96b'};
  Wardrobe.figure=function boyFigure(size='',outfitOverride=null){
    ensureBoyBase();
    const o=outfitOverride||Player.data.outfit||{},isGirl=o.body==='Girl Hero',hair=o.boyHair||o.girlHair||'',costume=o.costume||o.shirt||'',pants=o.pants||'',shoes=o.shoes||'';
    const motion=outfitOverride?'':Wardrobe.heroAnimation||'';if(!outfitOverride)Wardrobe.heroAnimation='';
    const slug=value=>(value||'none').toLowerCase().replace(/[^a-z0-9]+/g,'-'),outfitClass='outfit-'+slug(costume);
    const accessoryClasses=`face-${slug(o.face)} hair-${slug(hair)} mask-${slug(o.mask)} hat-${slug(o.hat)} glasses-${slug(o.glasses)} gloves-${slug(o.gloves)} emblem-${slug(o.emblem)} belt-${slug(o.belt)} pants-${slug(pants)} shoes-${slug(shoes)} cape-${slug(o.cape)} wings-${slug(o.wings)} weapon-${slug(o.weapon)} backpack-${slug(o.backpack)} necklace-${slug(o.necklace)} aura-${slug(o.aura)} pose-${slug(o.pose)}`;
    const html=`<div class="cartoon-boy ${isGirl?'girl':'boy'} ${size} ${motion} ${outfitClass} ${accessoryClasses}" style="--skin:${skins[o.body]||'#f2dcca'};--top:${colors[costume]||'#dedede'};--bottom:${colors[pants]||'#a8a8a8'};--shoe:${colors[shoes]||'#f2dcca'};--cape:${colors[o.cape]||'transparent'}">
      <div class="cb-aura"></div><div class="cb-wings"></div><div class="cb-backpack"></div><div class="cb-cape ${o.cape?'show':''}"></div><div class="cb-head"><i class="ear left"></i><i class="ear right"></i><i class="eye left"></i><i class="eye right"></i><i class="nose"></i><i class="smile"></i><span class="cb-hair"></span><span class="cb-mask"></span><span class="cb-glasses"></span><span class="cb-headwear"></span></div>
      <div class="cb-neck"></div><div class="cb-necklace"></div><div class="cb-torso"><span></span></div><div class="cb-arm left"><b></b></div><div class="cb-arm right"><b></b></div><div class="cb-tool"></div><div class="cb-belt">${o.belt?'<i></i>':''}</div><div class="cb-shorts"></div><div class="cb-leg left"></div><div class="cb-leg right"></div><div class="cb-foot left"></div><div class="cb-foot right"></div>
    </div>`;return size==='book-large'&&Wardrobe.stage?Wardrobe.stage(html):html;
  };
  const genderBookRender=Wardrobe.render.bind(Wardrobe);
  Wardrobe.render=function genderLocalizedBook(){let html=genderBookRender(),language=Player.data.settings.language||'en';const labels=language==='fr'?{'Boy Hero':'Garçon','Girl Hero':'Fille'}:language==='ar'?{'Boy Hero':'ولد','Girl Hero':'فتاة'}:{};Object.entries(labels).forEach(([from,to])=>{html=html.split(`>${from}<`).join(`>${to}<`)});return html};
})();
