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
  const copy = async text => {
    try { await navigator.clipboard.writeText(text); }
    catch (_) { const input = document.querySelector('#profile-code-output'); input?.focus(); input?.select(); document.execCommand('copy'); }
    Rewards.toast('Profile code copied to clipboard.');
  };
  window.ProfileCode = {
    generate() {
      const code = encode({ version: 1, name: Player.data.name || 'Player', data: Player.data });
      const output = document.querySelector('#profile-code-output');
      if (output) { output.value = code; output.focus(); output.select(); }
      copy(code);
    },
    import(event) {
      event.preventDefault();
      let payload;
      try { payload = decode(document.querySelector('#profile-code-input')?.value); }
      catch (_) { Rewards.toast('That profile code is not valid.'); return; }
      if (!payload || payload.version !== 1 || !payload.data || typeof payload.data !== 'object') { Rewards.toast('That profile code is not valid.'); return; }
      const name = String(payload.data.name || payload.name || '').trim();
      if (name.length < 2 || name.length > 40) { Rewards.toast('This code does not contain a valid player name.'); return; }
      if (!window.confirm(`Import ${name}'s profile on this device?`)) return;
      const id = profileId(name);
      const profiles = readProfiles();
      profiles[id] = payload.data;
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
      localStorage.setItem(ACTIVE_KEY, id);
      SaveSystem.save(payload.data);
      window.location.reload();
    }
  };

  const originalSettings = App.settings.bind(App);
  App.settings = function settingsWithProfileCode() {
    const html = originalSettings();
    const language = Player.data.settings.language || 'en';
    const labels = {
      en: ['Profile Code', 'Generate a code to move this profile to another device.', 'Generate Code', 'Enter a profile code to restore progress on this device.', 'Import Code', 'Profile code'],
      fr: ['Code du profil', 'Génère un code pour déplacer ce profil sur un autre appareil.', 'Générer le code', 'Saisis un code pour restaurer la progression sur cet appareil.', 'Importer le code', 'Code du profil'],
      ar: ['رمز الملف الشخصي', 'أنشئ رمزًا لنقل هذا الملف إلى جهاز آخر.', 'إنشاء الرمز', 'أدخل رمز الملف لاستعادة التقدم على هذا الجهاز.', 'استيراد الرمز', 'رمز الملف الشخصي']
    }[language] || [];
    const [title, help, generate, importHelp, importLabel, placeholder] = labels;
    const section = `<div class="setting profile-code-setting"><div><b>▣ ${title}</b><div class="muted">${help}</div></div><div class="profile-code-row"><input id="profile-code-output" class="text-input" readonly aria-label="${placeholder}"><button class="btn gold" type="button" onclick="ProfileCode.generate()">${generate}</button></div><div class="muted">${importHelp}</div><form class="profile-code-row" onsubmit="ProfileCode.import(event)"><input id="profile-code-input" class="text-input" autocomplete="off" placeholder="${placeholder}" required><button class="btn green" type="submit">${importLabel}</button></form></div>`;
    const close = html.lastIndexOf('</section>');
    return close < 0 ? html : html.slice(0, close) + section + html.slice(close);
  };
})();
