// Local player profiles: a new username creates separate saved progress.
(() => {
  const PROFILES_KEY = 'brainquest-academy-profiles-v1';
  const ACTIVE_KEY = 'brainquest-academy-active-profile';
  const originalSettings = App.settings.bind(App);
  const originalSave = Player.save.bind(Player);
  const originalReset = Player.reset.bind(Player);
  const profileId = name => name.trim().toLocaleLowerCase();
  const clone = value => JSON.parse(JSON.stringify(value));
  const nameFromId = id => id.split(/[-_ ]+/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  const repairProfileName = (id, data) => {
    const repaired = clone(data);
    if (id === '__unnamed__') { repaired.name = ''; return repaired; }
    if (profileId(repaired.name || '') !== id) repaired.name = nameFromId(id);
    return repaired;
  };
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[character]);
  const loadProfiles = () => {
    try { return JSON.parse(localStorage.getItem(PROFILES_KEY)) || {}; }
    catch { return {}; }
  };
  const storeProfiles = profiles => localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));

  let profiles = loadProfiles();
  let activeId = localStorage.getItem(ACTIVE_KEY) || profileId(Player.data.name) || '__unnamed__';

  // Recover profiles created by the old bug: their storage key contains the
  // chosen username (for example "marwan"), but their internal name and the
  // active pointer were left as the default "Alex".
  if (activeId === 'alex') {
    const recoveredId = (profiles.marwan ? 'marwan' : null) || Object.keys(profiles).find(id =>
      id !== 'alex' && profileId(profiles[id]?.name || '') !== id
    );
    if (recoveredId) activeId = recoveredId;
  }

  // Restore the selected profile before any other extension can save. Older
  // versions loaded the legacy single save first and could overwrite Marwan
  // (or another active profile) with the default name Alex.
  if (profiles[activeId]) {
    Player.data = repairProfileName(activeId, profiles[activeId]);
    Player.resetDaily();
    profiles[activeId] = clone(Player.data);
    originalSave();
  } else {
    profiles[activeId] = clone(Player.data);
  }

  // Alex used to be inserted automatically. Treat that legacy value as
  // unnamed unless the profile explicitly records that the player chose it.
  let requiresFirstName = !Player.data.hasChosenName && (!Player.data.name || activeId === 'alex');
  if (activeId !== 'alex' && activeId !== '__unnamed__' && Player.data.name) {
    Player.data.hasChosenName = true;
    requiresFirstName = false;
  }
  if (requiresFirstName) {
    delete profiles[activeId];
    activeId = '__unnamed__';
    Player.data.name = '';
    Player.data.hasChosenName = false;
    profiles[activeId] = clone(Player.data);
  }
  storeProfiles(profiles);
  localStorage.setItem(ACTIVE_KEY, activeId);

  // Every normal game save also updates the active local profile.
  Player.save = function saveActiveProfile() {
    originalSave();
    profiles = loadProfiles();
    profiles[activeId] = clone(this.data);
    storeProfiles(profiles);
  };

  // Reset game progress without silently changing the active username.
  Player.reset = function resetActiveProgress() {
    const currentName = this.data.name;
    originalReset();
    this.data.name = currentName;
    this.save();
  };

  App.settings = function settingsWithProfiles() {
    profiles = loadProfiles();
    const language = Player.data.settings.language || 'en';
    const copy = ({
      en: { edit:'Edit Current Name', current:'Current player:', kept:'Progress will be kept', editButton:'Edit', change:'Change Account', help:'Type an existing username to sign in, or a new username to create a fresh account.', placeholder:'Type username', accountLabel:'Account username', continueButton:'Continue' },
      fr: { edit:'Modifier le nom actuel', current:'Joueur actuel :', kept:'La progression sera conservée', editButton:'Modifier', change:'Changer de compte', help:'Saisis un nom existant pour te connecter, ou un nouveau nom pour créer un compte.', placeholder:'Saisir un nom', accountLabel:'Nom du compte', continueButton:'Continuer' },
      ar: { edit:'تعديل الاسم الحالي', current:'اللاعب الحالي:', kept:'سيتم الاحتفاظ بالتقدم', editButton:'تعديل', change:'تغيير الحساب', help:'اكتب اسم مستخدم موجودًا للدخول، أو اسمًا جديدًا لإنشاء حساب جديد.', placeholder:'اكتب اسم المستخدم', accountLabel:'اسم مستخدم الحساب', continueButton:'متابعة' }
    })[language];
    const profileOptions = Object.entries(profiles).filter(([id, data]) => id !== '__unnamed__' && data.name).map(([id, data]) =>
      `<option value="${escapeHtml(id)}" ${id === activeId ? 'selected' : ''}>${escapeHtml(data.name)} · Level ${data.level}</option>`
    ).join('');
    const profileSetting = `<form class="setting username-setting" autocomplete="off" onsubmit="App.renameCurrentProfile(event)"><div><b>✏️ ${copy.edit}</b><div class="muted">${copy.current} <strong>${escapeHtml(Player.data.name)}</strong> · ${copy.kept}</div></div><div class="username-controls"><input id="edit-current-username" name="edit-player-name" class="text-input" value="" minlength="2" maxlength="18" autocomplete="off" autocorrect="off" spellcheck="false" data-lpignore="true" data-1p-ignore readonly required><button id="edit-username-button" class="btn green" type="button" onclick="App.beginUsernameEdit()">${copy.editButton}</button></div></form><form class="setting username-setting" autocomplete="off" onsubmit="App.enterAccount(event)"><div><b>🔑 ${copy.change}</b><div class="muted">${copy.help}</div></div><div class="username-controls"><input id="settings-username" name="brainquest-account-code" class="text-input" value="" minlength="2" maxlength="18" autocomplete="one-time-code" autocorrect="off" spellcheck="false" data-lpignore="true" data-1p-ignore placeholder="${copy.placeholder}" aria-label="${copy.accountLabel}" required><button class="btn green" type="submit">${copy.continueButton}</button></div></form>`;
    return originalSettings().replace('<div class="setting"><div><b>Reset Progress</b>', `${profileSetting}<div class="setting"><div><b>Reset Progress</b>`);
  };

  App.createProfile = function createProfile(event) {
    event.preventDefault();
    const input = document.querySelector('#settings-username');
    const name = input.value.trim().replace(/\s+/g, ' ');
    if (name.length < 2 || name.length > 18) return Rewards.toast('Choose a username between 2 and 18 characters.');
    if (!/^[\p{L}\p{N}_ -]+$/u.test(name)) return Rewards.toast('Use letters, numbers, spaces, - or _ in your username.');

    const newId = profileId(name);
    profiles = loadProfiles();
    if (profiles[newId]) {
      profiles[newId] = repairProfileName(newId, profiles[newId]);
      storeProfiles(profiles);
      Rewards.toast(`${profiles[newId].name} already exists. Switching to that player!`);
      App.switchProfile(newId);
      return;
    }

    profiles[activeId] = clone(Player.data);
    storeProfiles(profiles);
    activeId = newId;
    localStorage.setItem(ACTIVE_KEY, activeId);

    // Player.reset supplies the game's clean default state for the new hero.
    Player.reset();
    Player.data.name = name;
    Player.data.hasChosenName = true;
    Player.data.welcomeGuideComplete = false;
    Player.save();
    Rewards.toast(`🌟 New account ${name} created with fresh progress!`);
    App.navigate('home');
    window.WelcomeGuide?.start();
  };

  // One account field: existing usernames sign in; unknown usernames create a
  // completely fresh profile through createProfile's reset path.
  App.enterAccount = function enterOrCreateAccount(event) {
    App.createProfile(event);
  };

  App.renameCurrentProfile = function renameCurrentProfile(event) {
    event.preventDefault();
    const input = document.querySelector('#edit-current-username');
    const name = input.value.trim().replace(/\s+/g, ' ');
    if (name.length < 2 || name.length > 18) return Rewards.toast('Choose a username between 2 and 18 characters.');
    if (!/^[\p{L}\p{N}_ -]+$/u.test(name)) return Rewards.toast('Use letters, numbers, spaces, - or _ in your username.');

    const oldId = activeId;
    const newId = profileId(name);
    profiles = loadProfiles();
    if (newId !== oldId && profiles[newId]) {
      Rewards.toast('That username already belongs to another player.');
      input.focus();
      return;
    }

    delete profiles[oldId];
    Player.data.name = name;
    Player.data.hasChosenName = true;
    activeId = newId;
    profiles[activeId] = clone(Player.data);
    storeProfiles(profiles);
    localStorage.setItem(ACTIVE_KEY, activeId);
    Player.save();
    Rewards.toast(`✅ Player renamed to ${name}!`);
    App.render();
  };

  App.beginUsernameEdit = function beginUsernameEdit() {
    const input = document.querySelector('#edit-current-username');
    const button = document.querySelector('#edit-username-button');
    input.readOnly = false;
    input.value = '';
    const language = Player.data.settings.language || 'en';
    input.placeholder = language === 'ar' ? 'اختر اسم مستخدم جديدًا' : language === 'fr' ? 'Choisir un nouveau nom' : 'Choose a new username';
    button.type = 'submit';
    button.removeAttribute('onclick');
    button.textContent = language === 'ar' ? 'حفظ الاسم' : language === 'fr' ? 'Enregistrer le nom' : 'Save Name';
    input.focus();
  };

  App.switchProfile = function switchProfile(id) {
    profiles = loadProfiles();
    if (!profiles[id]) return;
    if (id === activeId) {
      Player.data = repairProfileName(id, profiles[id]);
      profiles[id] = clone(Player.data);
      storeProfiles(profiles);
      Player.resetDaily();
      Player.save();
      Rewards.toast(`👋 Welcome back, ${Player.data.name}!`);
      App.navigate('home');
      return;
    }
    profiles[activeId] = clone(Player.data);
    activeId = id;
    localStorage.setItem(ACTIVE_KEY, activeId);
    Player.data = repairProfileName(id, profiles[id]);
    profiles[id] = clone(Player.data);
    storeProfiles(profiles);
    Player.resetDaily();
    Player.save();
    Rewards.toast(`👋 Welcome back, ${Player.data.name}!`);
    App.navigate('home');
  };

  App.completeFirstUsername = function completeFirstUsername(event) {
    event.preventDefault();
    const input = document.querySelector('#first-username');
    const name = input.value.trim().replace(/\s+/g, ' ');
    if (name.length < 2 || name.length > 18) return Rewards.toast('Choose a username between 2 and 18 characters.');
    if (!/^[\p{L}\p{N}_ -]+$/u.test(name)) return Rewards.toast('Use letters, numbers, spaces, - or _ in your username.');
    const newId = profileId(name);
    profiles = loadProfiles();
    delete profiles.__unnamed__;
    let created = false;
    if (profiles[newId]) {
      activeId = newId;
      Player.data = repairProfileName(newId, profiles[newId]);
    } else {
      activeId = newId;
      Player.data.name = name;
      Player.data.hasChosenName = true;
      Player.data.welcomeGuideComplete = false;
      created = true;
      profiles[activeId] = clone(Player.data);
    }
    localStorage.setItem(ACTIVE_KEY, activeId);
    storeProfiles(profiles);
    Player.save();
    document.querySelector('#modal').classList.add('hidden');
    Rewards.toast(`👋 Welcome, ${Player.data.name}!`);
    App.navigate('home');
    if (created) window.WelcomeGuide?.start();
  };

  if (requiresFirstName) setTimeout(() => {
    const modal = document.querySelector('#modal');
    modal.innerHTML = `<form class="dialog card pop" onsubmit="App.completeFirstUsername(event)"><div class="big-icon">🪪</div><h2>Choose Your Username</h2><p class="muted">Enter a name before beginning your adventure.</p><input id="first-username" class="text-input" minlength="2" maxlength="18" autocomplete="nickname" placeholder="Your username" required autofocus><div class="actions"><button class="btn green" type="submit">Start Adventure</button></div></form>`;
    modal.classList.remove('hidden');
    document.querySelector('#first-username')?.focus();
  }, 0);

  // Main renders once before profile restoration; refresh the visible profile
  // after the correct saved player (or unnamed state) has been loaded.
  setTimeout(() => App.render(), 0);

  // The leaderboard contains only genuine local profiles—no generated players.
  App.leaderboard = function localProfileLeaderboard() {
    profiles = loadProfiles();
    profiles[activeId] = clone(Player.data);
    storeProfiles(profiles);

    const players = Object.entries(profiles)
      .map(([id, storedData]) => {
        const data = repairProfileName(id, storedData);
        profiles[id] = clone(data);
        return ({
        id,
        name: data.name,
        level: data.level || 1,
        xp: data.totalXp || 0,
        trophies: data.trophies || 0,
        avatar: data.avatar || '🧙'
      });})
      .sort((first, second) => second.xp - first.xp || second.level - first.level || second.trophies - first.trophies);
    storeProfiles(profiles);

    const rows = players.map((player, index) => {
      const rank = ['🥇', '🥈', '🥉'][index] || `#${index + 1}`;
      const isActive = player.id === activeId;
      return `<div class="challenge card" style="border-color:${isActive ? 'var(--gold)' : ''}"><span class="big">${rank}</span><div><b>${escapeHtml(player.avatar)} ${escapeHtml(player.name)}${isActive ? ' (You)' : ''}</b><small><br>Level ${player.level} · ${player.xp} XP</small></div><b>🏆 ${player.trophies}</b></div>`;
    }).join('');

    return `<div class="page-head"><h1>🏆 Player Leaderboard</h1><button class="btn ghost" data-page="profile">Back</button></div><div class="challenge-list">${rows}</div><p class="center muted">Only player profiles created on this device are shown.</p>`;
  };
})();
