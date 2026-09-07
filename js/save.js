/* LocalStorage adapter. All game modules save through this single gateway. */
window.SaveSystem={
  key:'brainquest-academy-v1',
  load(){
    try {
      // Load the selected account first. This prevents rapid refreshes from
      // restoring an older legacy save before the profile system starts.
      const activeId=localStorage.getItem('brainquest-academy-active-profile');
      const profiles=JSON.parse(localStorage.getItem('brainquest-academy-profiles-v1')||'{}');
      if(activeId&&profiles[activeId])return structuredClone(profiles[activeId]);
      return JSON.parse(localStorage.getItem(this.key));
    } catch(e) { return null; }
  },
  save(data){localStorage.setItem(this.key,JSON.stringify(data))},
  clear(){localStorage.removeItem(this.key)}
};
