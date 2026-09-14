// Export/import a local player profile as a portable, offline code.
(() => {
  const PROFILES_KEY = 'brainquest-academy-profiles-v1';
  const ACTIVE_KEY = 'brainquest-academy-active-profile';
  const PREFIX = 'BQA1.';
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const profileId = name => String(name || '').trim().toLocaleLowerCase();
  const encode = value => {
    const bytes = new TextEncoder().encode(JSON.stringify(value));
    let binary = '';
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return PREFIX + btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  };
  const decode = code => {
    const raw = String(code || '').trim();
    if (!raw.startsWith(PREFIX)) throw new Error('Invalid profile code');
    const encoded = raw.slice(PREFIX.length).replace(/-/g, '+').replace(/_/g, '/');
    const remainder = encoded.length % 4;
    const base64 = encoded + (remainder ? '='.repeat(4 - remainder) : '');
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  };
  const readProfiles = () => { try { return JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}'); } catch (_) { return {}; } };
  let pinChangeAuthorized = false;
  const askPin = message => new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'profile-dialog-backdrop';
    overlay.innerHTML = `<form class="profile-dialog card"><div class="profile-dialog-icon">🔒</div><h2>Profile PIN</h2><p>${message}</p><div class="pin-input-wrap"><input class="text-input" type="password" inputmode="numeric" maxlength="8" autocomplete="one-time-code" autofocus required><button class="pin-toggle" type="button" aria-label="Show PIN">Show</button></div><div class="profile-dialog-actions"><button class="btn ghost" type="button" data-cancel>Cancel</button><button class="btn gold" type="submit">Continue</button></div></form>`;
    document.body.append(overlay);
    const close = value => { overlay.remove(); resolve(value); };
    overlay.querySelector('form').addEventListener('submit', event => { event.preventDefault(); close(overlay.querySelector('input').value); });
    overlay.querySelector('[data-cancel]').addEventListener('click', () => close(null));
    overlay.querySelector('.pin-toggle').addEventListener('click', event => {
      const input = overlay.querySelector('input');
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      event.currentTarget.textContent = visible ? 'Show' : 'Hide';
      event.currentTarget.setAttribute('aria-label', visible ? 'Show PIN' : 'Hide PIN');
    });
    overlay.querySelector('input').focus();
  });
  const askConfirm = message => new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'profile-dialog-backdrop';
    overlay.innerHTML = `<div class="profile-dialog card"><div class="profile-dialog-icon">⚠</div><h2>Remove PIN?</h2><p>${message}</p><div class="profile-dialog-actions"><button class="btn ghost" data-cancel>Cancel</button><button class="btn red" data-confirm>Delete PIN</button></div></div>`;
    document.body.append(overlay);
    const close = value => { overlay.remove(); resolve(value); };
    overlay.querySelector('[data-cancel]').addEventListener('click', () => close(false));
    overlay.querySelector('[data-confirm]').addEventListener('click', () => close(true));
  });
  const copy = async text => {
    try { await navigator.clipboard.writeText(text); }
    catch (_) { const input = document.querySelector('#profile-code-output'); input?.focus(); input?.select(); document.execCommand('copy'); }
    Rewards.toast('Profile code copied to clipboard.');
  };
  window.ProfileCode = {
    showPinEditor() {
      pinChangeAuthorized = true;
      const form = document.querySelector('#profile-pin-form');
      const input = document.querySelector('#profile-pin-input');
      const actions = document.querySelector('#profile-pin-actions');
      if (form) form.hidden = false;
      if (actions) actions.hidden = true;
      input?.focus();
    },
    togglePin(id, button) {
      const input = document.getElementById(id);
      if (!input) return;
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      button.textContent = visible ? 'Show' : 'Hide';
      button.setAttribute('aria-label', visible ? 'Show PIN' : 'Hide PIN');
    },
    async changePin() {
      const language = Player.data.settings.language || 'en';
      const promptText = language === 'fr' ? 'Entre ton ancien PIN :' : language === 'ar' ? 'أدخل رقم PIN القديم:' : 'Enter your old PIN:';
      if (await askPin(promptText) !== String(Player.data.profilePin || '')) {
        Rewards.toast(language === 'fr' ? 'Ancien PIN incorrect.' : language === 'ar' ? 'رقم PIN القديم غير صحيح.' : 'Incorrect old PIN.');
        return;
      }
      this.showPinEditor();
    },
    async deletePin() {
      const language = Player.data.settings.language || 'en';
      const promptText = language === 'fr' ? 'Entre ton PIN actuel pour le supprimer :' : language === 'ar' ? 'أدخل رقم PIN الحالي لحذفه:' : 'Enter your current PIN to delete it:';
      if (await askPin(promptText) !== String(Player.data.profilePin || '')) {
        Rewards.toast(language === 'fr' ? 'PIN incorrect. Le PIN n’a pas été supprimé.' : language === 'ar' ? 'رقم PIN غير صحيح. لم يتم حذفه.' : 'Incorrect PIN. Your PIN was not deleted.');
        return;
      }
      if (!await askConfirm(language === 'fr' ? 'Supprimer la protection PIN ?' : language === 'ar' ? 'هل تريد حذف حماية PIN؟' : 'Delete PIN protection?')) return;
      Player.data.profilePin = '';
      Player.save();
      Rewards.toast(language === 'fr' ? 'PIN supprimé.' : language === 'ar' ? 'تم حذف PIN.' : 'PIN deleted.');
      App.render();
    },
    savePin(event) {
      event.preventDefault();
      const input = document.querySelector('#profile-pin-input');
      const pin = String(input?.value || '').replace(/\D/g, '');
      if (pin && (pin.length < 4 || pin.length > 8)) { Rewards.toast('Use a PIN with 4 to 8 numbers.'); return; }
      if (Player.data.profilePin && !pinChangeAuthorized) { Rewards.toast('Enter your old PIN before choosing a new one.'); return; }
      Player.data.profilePin = pin;
      pinChangeAuthorized = false;
      Player.save();
      if (input) input.value = '';
      const form = document.querySelector('#profile-pin-form');
      const actions = document.querySelector('#profile-pin-actions');
      if (form) form.hidden = true;
      if (actions) actions.hidden = false;
      Rewards.toast(pin ? 'Profile PIN saved.' : 'Profile PIN removed.');
    },
    generate() {
      const code = encode({ version: 1, name: Player.data.name || 'Player', data: Player.data });
      const output = document.querySelector('#profile-code-output');
      if (output) { output.value = code; output.focus(); output.select(); }
      copy(code);
    },
    async import(event) {
      event.preventDefault();
      let payload;
      try { payload = decode(document.querySelector('#profile-code-input')?.value); }
      catch (_) { Rewards.toast('That profile code is not valid.'); return; }
      if (!payload || payload.version !== 1 || !payload.data || typeof payload.data !== 'object') { Rewards.toast('That profile code is not valid.'); return; }
      const name = String(payload.data.name || payload.name || '').trim();
      if (name.length < 2 || name.length > 40) { Rewards.toast('This code does not contain a valid player name.'); return; }
      if (!await askConfirm(`Import ${name}'s profile on this device?`)) return;
      const id = profileId(name);
      const profiles = readProfiles();
      profiles[id] = payload.data;
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
      localStorage.setItem(ACTIVE_KEY, id);
      SaveSystem.save(payload.data);
      window.location.reload();
    }
  };

  const originalSwitchProfile = App.switchProfile?.bind(App);
  const canEnterProfile = async id => {
    if (!id || id === localStorage.getItem(ACTIVE_KEY)) return true;
    const profiles = readProfiles();
    const profile = profiles[id];
    if (!profile?.profilePin) return true;
    const entered = await askPin('Enter the numeric code for this profile:');
    if (entered === profile.profilePin) return true;
    Rewards.toast('Incorrect profile code. Access denied.');
    return false;
  };
  if (originalSwitchProfile) {
    App.switchProfile = async function protectedSwitchProfile(id) {
      if (!await canEnterProfile(id)) return;
      return originalSwitchProfile(id);
    };
  }

  const originalSettings = App.settings.bind(App);
  App.settings = function settingsWithProfileCode() {
    // Remove the previous export/import block if an older cached wrapper is still present.
    const html = originalSettings().replace(/<div class="setting profile-code-setting">[\s\S]*?<\/div>\s*(?=<div class="setting|<\/section>)/, '');
    const language = Player.data.settings.language || 'en';
    const labels = {
      en: ['Profile PIN', 'Create a PIN to enter this profile on this device.', 'Create PIN', 'Change PIN', 'Delete PIN', 'Save PIN', 'Numeric PIN'],
      fr: ['PIN du profil', 'Crée un PIN pour entrer dans ce profil sur cet appareil.', 'Créer un PIN', 'Modifier le PIN', 'Supprimer le PIN', 'Enregistrer', 'PIN numérique'],
      ar: ['رقم PIN للملف', 'أنشئ رقم PIN للدخول إلى هذا الملف على هذا الجهاز.', 'إنشاء PIN', 'تغيير PIN', 'حذف PIN', 'حفظ PIN', 'PIN رقمي']
    }[language] || [];
    const [title, help, create, change, remove, save, placeholder] = labels;
    const action = change;
    const pinAction = Player.data.profilePin ? 'ProfileCode.changePin()' : 'ProfileCode.showPinEditor()';
    const deleteButton = Player.data.profilePin ? `<button class="btn red" type="button" onclick="ProfileCode.deletePin()">${remove}</button>` : '';
    const section = `<div class="setting profile-pin-setting"><div><b>🔒 ${title}</b><div class="muted">${help}</div></div><div id="profile-pin-actions" class="profile-pin-actions"><button class="btn gold" type="button" onclick="${pinAction}">${action}</button>${deleteButton}</div><form id="profile-pin-form" class="profile-code-row" hidden onsubmit="ProfileCode.savePin(event)"><div class="pin-input-wrap"><input id="profile-pin-input" class="text-input" type="password" inputmode="numeric" pattern="[0-9]{4,8}" minlength="4" maxlength="8" autocomplete="new-password" placeholder="${placeholder}"><button class="pin-toggle" type="button" onclick="ProfileCode.togglePin('profile-pin-input', this)" aria-label="Show PIN">Show</button></div><button class="btn green" type="submit">${save}</button></form></div>`;
    const close = html.lastIndexOf('</section>');
    return close < 0 ? html : html.slice(0, close) + section + html.slice(close);
  };
})();
