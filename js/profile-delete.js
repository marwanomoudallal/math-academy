// Settings control for removing only the currently active local profile.
(() => {
  const PROFILES_KEY='brainquest-academy-profiles-v1',ACTIVE_KEY='brainquest-academy-active-profile';
  const escape=value=>String(value||'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&gt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const oldSettings=App.settings.bind(App);
  App.settings=function settingsWithDeleteProfile(){const html=oldSettings();const control=`<div class="setting delete-profile-setting"><div><b>🗑️ Delete Profile</b><div class="muted">Permanently remove this player and their local progress.</div></div><button class="btn red" type="button" onclick="App.confirmDeleteProfile()">Delete Profile</button></div>`;return html.replace('</section>',`${control}</section>`)};
  App.confirmDeleteProfile=function confirmDeleteProfile(){const name=escape(Player.data.name);Rewards.modal('Delete this profile?',`This permanently deletes <b>${name}</b> and all of this profile’s progress. This cannot be undone.`,'🗑️','<button class="btn ghost" data-close>Cancel</button><button class="btn red" onclick="App.deleteCurrentProfile()">Delete Profile</button>')};
  App.deleteCurrentProfile=function deleteCurrentProfile(){const activeId=localStorage.getItem(ACTIVE_KEY),profiles=JSON.parse(localStorage.getItem(PROFILES_KEY)||'{}');if(activeId)delete profiles[activeId];localStorage.setItem(PROFILES_KEY,JSON.stringify(profiles));localStorage.setItem(ACTIVE_KEY,'__unnamed__');localStorage.removeItem(SaveSystem.key);window.location.reload()};
})();
