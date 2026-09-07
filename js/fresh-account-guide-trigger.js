// Keep the first-time guide reliable even when an older profile script is cached.
(() => {
  const profileId=name=>String(name||'').trim().toLocaleLowerCase();
  const isNewName=name=>{try{return !JSON.parse(localStorage.getItem('brainquest-academy-profiles-v1')||'{}')[profileId(name)]}catch{return true}};
  const startGuide=()=>{Player.data.welcomeGuideComplete=false;Player.save();window.WelcomeGuide?.start()};
  const oldCreate=App.createProfile?.bind(App);
  if(oldCreate)App.createProfile=function createProfileWithGuide(event){const name=document.querySelector('#settings-username')?.value;const fresh=isNewName(name);const result=oldCreate(event);if(fresh&&Player.data.name)startGuide();return result};
  const oldFirstName=App.completeFirstUsername?.bind(App);
  if(oldFirstName)App.completeFirstUsername=function firstProfileWithGuide(event){const name=document.querySelector('#first-username')?.value;const fresh=isNewName(name);const result=oldFirstName(event);if(fresh&&Player.data.name)startGuide();return result};
})();
