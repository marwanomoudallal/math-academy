// Gender choice for new profiles and a progress-safe Settings control.
(() => {
  const copy={en:{title:'Choose Your Hero',help:'Choose before starting. You can change this later in Settings.',boy:'Boy',girl:'Girl',save:'Continue',setting:'Hero Gender',settingHelp:'Change your hero without losing progress'},fr:{title:'Choisis ton héros',help:'Choisis avant de commencer. Tu pourras changer plus tard dans les paramètres.',boy:'Garçon',girl:'Fille',save:'Continuer',setting:'Genre du héros',settingHelp:'Change ton héros sans perdre ta progression'},ar:{title:'اختر بطلك',help:'اختر قبل البدء. يمكنك التغيير لاحقًا من الإعدادات.',boy:'ولد',girl:'فتاة',save:'متابعة',setting:'جنس البطل',settingHelp:'غيّر بطلك دون فقدان التقدم'}};
  const t=()=>copy[Player.data.settings.language||'en']||copy.en;
  const setGender=gender=>{Player.data.gender=gender;Player.data.outfit||={};Player.data.outfit.body=gender==='girl'?'Girl Hero':'Boy Hero';Player.data.outfitBaseInitialized=true;Player.save()};
  const chooser=()=>{const c=t(),modal=document.querySelector('#modal');modal.innerHTML=`<form class="dialog card pop gender-dialog" onsubmit="GenderProfile.save(event)"><div class="big-icon">🦸</div><h2>${c.title}</h2><p class="muted">${c.help}</p><div class="gender-options"><label><input type="radio" name="hero-gender" value="boy" required><span>👦<b>${c.boy}</b></span></label><label><input type="radio" name="hero-gender" value="girl" required><span>👧<b>${c.girl}</b></span></label></div><button class="btn green" type="submit">${c.save}</button></form>`;modal.classList.remove('hidden')};
  window.GenderProfile={show:chooser,save(event){event.preventDefault();const gender=new FormData(event.target).get('hero-gender');if(!gender)return;setGender(gender);document.querySelector('#modal').classList.add('hidden');App.navigate('home')},change(gender){setGender(gender);App.render()}};

  // First username: finish account setup, then require gender before play.
  const oldFirst=App.completeFirstUsername.bind(App);
  App.completeFirstUsername=function genderAfterFirstName(event){oldFirst(event);if(!Player.data.gender)chooser()};

  // Account field: unknown names create fresh accounts and must choose gender.
  const oldCreate=App.createProfile.bind(App);
  App.createProfile=function genderAfterNewAccount(event){const input=document.querySelector('#settings-username'),id=input?.value.trim().toLocaleLowerCase();let exists=false;try{exists=!!(JSON.parse(localStorage.getItem('brainquest-academy-profiles-v1')||'{}')[id])}catch(_){}oldCreate(event);if(!exists)chooser()};

  const oldSettings=App.settings.bind(App);
  App.settings=function settingsWithGender(){const c=t(),gender=Player.data.gender||(Player.data.outfit?.body==='Girl Hero'?'girl':'boy'),row=`<div class="setting gender-setting"><div><b>🦸 ${c.setting}</b><div class="muted">${c.settingHelp}</div></div><div class="gender-setting-buttons"><button class="btn ${gender==='boy'?'green':'ghost'}" onclick="GenderProfile.change('boy')">👦 ${c.boy}</button><button class="btn ${gender==='girl'?'green':'ghost'}" onclick="GenderProfile.change('girl')">👧 ${c.girl}</button></div></div>`;return oldSettings().replace('<div class="setting"><div><b>Reset Progress</b>',`${row}<div class="setting"><div><b>Reset Progress</b>`) };
})();
