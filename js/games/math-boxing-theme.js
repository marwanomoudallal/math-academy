(()=>{
  if(!window.MathBattle)return;
  const originalRender=MathBattle.render.bind(MathBattle);
  MathBattle.render=function boxingBattleRender(){
    const s=this.state||{},level=Math.ceil((s.battle||1)/2),boss=s.boss?'BOSS ':'';
    const robot=`<div class="robot-boxer" aria-label="Robot boxer"><i class="robot-antenna"></i><i class="robot-head"><em></em><em></em></i><i class="robot-body"><strong>R</strong></i><i class="robot-arm left"><u></u></i><i class="robot-arm right"><u></u></i><i class="robot-leg left"></i><i class="robot-leg right"></i></div>`;
    let html=originalRender().replace('⚔️ ATTACK','🥊 PUNCH').replace(`<b>Battle ${s.battle}`,`<b>🥊 Boxing Round ${s.battle}`);
    html=html.replace(/(<div class="fighter enemy-fighter[^"]*">[\s\S]*?<div class="sprite">)[\s\S]*?(<\/div><b>)[\s\S]*?(<\/b>)/,`$1${robot}$2Lv ${level} ${boss}MATH ROBOT$3`);
    return html.replace('<div class="battlefield">','<div class="battlefield boxing-ring"><i class="ring-post left"></i><i class="ring-post right"></i><div class="ring-ropes"><i></i><i></i><i></i></div>')
  };
  const skinBoxer=()=>{
    const figure=Wardrobe.figure('battle'),style=figure.match(/style="([^"]*)"/)?.[1]||'',classes=figure.match(/class="([^"]*)"/)?.[1]||'';
    return `<div class="skin-boxer ${classes}" style="${style}"><i class="sb-head"><i class="sb-ear left"></i><i class="sb-ear right"></i><i class="sb-eye left"></i><i class="sb-eye right"></i><i class="sb-smile"></i><span class="cb-hair"></span><span class="cb-mask"></span><span class="cb-glasses"></span><span class="cb-headwear"></span></i><i class="sb-body"><strong></strong></i><i class="sb-arm left"><u></u></i><i class="sb-arm right"><u></u></i><i class="sb-leg left"><u></u></i><i class="sb-leg right"><u></u></i></div>`
  };
  if(window.Wardrobe){
    const originalApply=Wardrobe.apply.bind(Wardrobe);
    Wardrobe.apply=function boxingSkinApply(){originalApply();if(App.current==='math'){const sprite=document.querySelector('.boxing-ring .player-fighter>.sprite');if(sprite)sprite.innerHTML=skinBoxer()}}
  }
})();
