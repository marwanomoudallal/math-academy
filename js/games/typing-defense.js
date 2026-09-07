window.TypingDefense = {
  timer: null,
  state: null,

  words: {
    Easy: ['cat', 'tree', 'game', 'house', 'star', 'book', 'fish', 'moon', 'jump', 'blue', 'king', 'frog', 'ship', 'bird', 'cake', 'rain', 'play', 'smile', 'dream', 'light', 'stone', 'music', 'happy', 'green'],
    Normal: ['adventure', 'kingdom', 'fraction', 'explorer', 'challenge', 'courage', 'mystery', 'defender', 'treasure', 'mountain', 'library', 'journey', 'knight', 'wizard', 'victory', 'imagine', 'discover', 'ancient', 'friendly', 'powerful'],
    Hard: ['education', 'technology', 'extraordinary', 'imagination', 'constellation', 'multiplication', 'responsibility', 'determination', 'achievement', 'communication', 'independent', 'knowledgeable', 'magnificent', 'unforgettable', 'investigation', 'electricity'],
  },

  localizedWords: {
    fr: {
      Easy: ['chat','arbre','jeu','maison','étoile','livre','poisson','lune','saut','bleu','roi','pluie','ami','fleur','porte','pomme','école','soleil','neige','rivière'],
      Normal: ['aventure','royaume','fraction','explorateur','défi','courage','mystère','défenseur','trésor','montagne','bibliothèque','voyage','chevalier','sorcier','victoire','imaginer','découvrir','ancien','amical','puissant'],
      Hard: ['éducation','technologie','extraordinaire','imagination','constellation','multiplication','responsabilité','détermination','réussite','communication','indépendant','connaissance','magnifique','inoubliable','enquête','électricité'],
      Expert: ['Le héros découvre un château caché.','La magicienne protège le royaume enchanté.','Un dragon courageux traverse la montagne.','Les explorateurs trouvent une carte ancienne.','La lumière des étoiles guide le chevalier.','Le robot répare la grande tour de cristal.']
    },
    ar: {
      Easy: ['قطة','شجرة','لعبة','منزل','نجمة','كتاب','سمكة','قمر','قفز','أزرق','ملك','مطر','صديق','زهرة','باب','تفاحة','مدرسة','شمس','ثلج','نهر'],
      Normal: ['مغامرة','مملكة','كسور','مستكشف','تحدي','شجاعة','غموض','مدافع','كنز','جبل','مكتبة','رحلة','فارس','ساحر','انتصار','خيال','اكتشاف','قديم','ودود','قوي'],
      Hard: ['تعليم','تكنولوجيا','استثنائي','مخيلة','كوكبة','ضرب','مسؤولية','إصرار','إنجاز','تواصل','استقلال','معرفة','رائع','لاينسى','استكشاف','كهرباء'],
      Expert: ['اكتشف البطل قلعة مخفية.','تحمي الساحرة المملكة المسحورة.','يعبر تنين شجاع الجبل العالي.','وجد المستكشفون خريطة قديمة.','يرشد ضوء النجوم الفارس الشجاع.','يصلح الروبوت برج البلور الكبير.']
    }
  },

  text() {
    const language = Player.data.settings.language || 'en';
    return ({
      en: { games:'← Games', title:'Typing Fortress', wave:'Wave', boss:'BOSS', lives:'Castle Lives:', defeatedTitle:'Castle Defeated!', defeatedStart:'You defeated', defeatedEnd:'monsters.', retry:'Try Again', placeholder:'Type the word…', inputLabel:'Type enemy word', wpm:'WPM', accuracy:'Accuracy', defeated:'Defeated', combo:'Combo', note:'Every monster receives a different word. Each castle breach removes one life.' },
      fr: { games:'← Jeux', title:'Forteresse de frappe', wave:'Vague', boss:'BOSS', lives:'Vies du château :', defeatedTitle:'Château vaincu !', defeatedStart:'Tu as vaincu', defeatedEnd:'monstres.', retry:'Réessayer', placeholder:'Tape le mot…', inputLabel:'Taper le mot de l’ennemi', wpm:'MPM', accuracy:'Précision', defeated:'Vaincus', combo:'Combo', note:'Chaque monstre reçoit un mot différent. Chaque attaque du château enlève une vie.' },
      ar: { games:'الألعاب →', title:'حصن الكتابة', wave:'الموجة', boss:'الزعيم', lives:'أرواح القلعة:', defeatedTitle:'هُزمت القلعة!', defeatedStart:'هزمت', defeatedEnd:'وحوش.', retry:'حاول مجددًا', placeholder:'اكتب الكلمة…', inputLabel:'اكتب كلمة العدو', wpm:'كلمة/د', accuracy:'الدقة', defeated:'المهزومون', combo:'التتابع', note:'لكل وحش كلمة مختلفة. كل وصول إلى القلعة يزيل روحًا واحدة.' }
    })[language] || null;
  },

  parts: {
    adjectives: ['brave', 'bright', 'clever', 'cosmic', 'crystal', 'daring', 'electric', 'enchanted', 'flying', 'friendly', 'golden', 'hidden', 'icy', 'little', 'magic', 'mighty', 'mystic', 'quick', 'royal', 'secret', 'silver', 'sleepy', 'solar', 'sparkling', 'swift'],
    nouns: ['badger', 'castle', 'comet', 'dragon', 'falcon', 'forest', 'fox', 'garden', 'griffin', 'hero', 'island', 'jungle', 'knight', 'lantern', 'lion', 'meteor', 'owl', 'panda', 'planet', 'rabbit', 'robot', 'rocket', 'tiger', 'tower', 'wizard'],
    verbs: ['crossed', 'defended', 'discovered', 'explored', 'followed', 'guarded', 'helped', 'invented', 'mapped', 'opened', 'protected', 'repaired', 'rescued', 'searched', 'studied', 'unlocked', 'visited'],
    places: ['ancient castle', 'crystal cave', 'enchanted forest', 'floating island', 'forgotten library', 'golden kingdom', 'hidden temple', 'icy mountain', 'moonlit valley', 'mysterious tower', 'secret garden', 'silver fortress'],
  },

  start() {
    clearInterval(this.timer);
    this.state = { word: '', x: 85, start: Date.now(), keys: 0, correct: 0, errors: 0, defeated: 0, combo: 0, lives: 5, gameOver: false, recent: [] };
    this.next();
    this.timer = setInterval(() => this.tick(), 500);
    App.renderGame('typing');
  },

  random(list) {
    return list[Math.floor(Math.random() * list.length)];
  },

  generateWord() {
    const difficulty = Player.data.settings.difficulty;
    const language = Player.data.settings.language || 'en';
    let result = '';
    let attempts = 0;

    do {
      if (language !== 'en' && this.localizedWords[language]) {
        result = this.random(this.localizedWords[language][difficulty] || this.localizedWords[language].Normal);
        attempts++;
        continue;
      }
      if (difficulty === 'Easy') {
        result = this.random(this.words.Easy);
      } else if (difficulty === 'Normal') {
        result = Math.random() < 0.55
          ? this.random(this.words.Normal)
          : this.random(this.parts.adjectives) + this.random(this.parts.nouns);
      } else if (difficulty === 'Hard') {
        result = Math.random() < 0.45
          ? this.random(this.words.Hard)
          : this.random(this.parts.adjectives) + this.random(this.parts.nouns) + this.random(['s', 'ing', 'er', 'ly']);
      } else {
        const hero = `The ${this.random(this.parts.adjectives)} ${this.random(this.parts.nouns)}`;
        const action = `${this.random(this.parts.verbs)} the ${this.random(this.parts.places)}`;
        const endings = ['before sunrise.', 'with great courage.', 'to complete the quest.', 'and found a secret map.', 'while the stars were shining.', 'to protect the kingdom.'];
        result = `${hero} ${action} ${this.random(endings)}`;
      }
      attempts++;
    } while (this.state.recent.includes(result) && attempts < 60);

    this.state.recent.push(result);
    if (this.state.recent.length > 100) this.state.recent.shift();
    return result;
  },

  next() {
    this.state.word = this.generateWord();
    this.state.x = 85;
  },

  tick() {
    if (App.current !== 'typing' || this.state.gameOver) {
      clearInterval(this.timer);
      return;
    }
    this.state.x -= 1 + Player.data.wave * .12;
    if (this.state.x <= 12) {
      this.state.errors += this.state.word.length;
      this.state.combo = 0;
      this.state.lives--;
      Rewards.sound('bad');
      if (this.state.lives <= 0) {
        this.state.gameOver = true;
        clearInterval(this.timer);
      } else {
        this.next();
      }
      App.renderGame('typing');
      return;
    }
    const invader = document.querySelector('.invader');
    if (invader) invader.style.setProperty('--x', this.state.x + '%');
  },

  input(value) {
    const s = this.state;
    if (!s || s.gameOver) return;
    s.keys++;
    if (!s.word.startsWith(value)) s.errors++;
    if (value === s.word) {
      s.correct += s.word.length;
      s.defeated++;
      s.combo++;
      Player.data.wordsTyped++;
      Player.data.daily.typing++;
      if (s.defeated % 5 === 0) Player.data.wave++;
      const mins = (Date.now() - s.start) / 60000;
      const wpm = Math.round((s.correct / 5) / Math.max(mins, .05));
      const accuracy = Math.round(s.correct / Math.max(1, s.correct + s.errors) * 100);
      Player.data.bestWpm = Math.max(Player.data.bestWpm, wpm);
      Player.data.bestAccuracy = Math.max(Player.data.bestAccuracy, accuracy);
      Player.save();
      Rewards.sound('good');
      this.next();
      App.renderGame('typing');
    }
  },

  render() {
    const s = this.state;
    const t = this.text();
    const mins = (Date.now() - s.start) / 60000;
    const wpm = Math.round((s.correct / 5) / Math.max(mins, .05));
    const accuracy = Math.round(s.correct / Math.max(1, s.correct + s.errors) * 100);
    const hearts = '❤️'.repeat(s.lives) + '🖤'.repeat(5 - s.lives);
    const enemy = s.gameOver
      ? `<div class="game-over card"><h2>🏰 ${t.defeatedTitle}</h2><p>${t.defeatedStart} ${s.defeated} ${t.defeatedEnd}</p><button class="btn primary" onclick="TypingDefense.start()">${t.retry}</button></div>`
      : `<div class="invader" style="--x:${s.x}%"><b>${s.word}</b>${Player.data.wave % 5 === 0 ? '🐲' : '👾'}</div>`;
    const input = s.gameOver ? '' : `<div class="answer-row"><input id="typing-input" class="text-input" autocomplete="off" value="" placeholder="${t.placeholder}" aria-label="${t.inputLabel}"></div>`;

    return `<section class="game-shell card"><div class="game-hud"><button class="btn ghost" data-page="games">${t.games}</button><h2>⌨️ ${t.title}</h2><b>${t.wave} ${Player.data.wave}${Player.data.wave % 5 === 0 ? ` 👑 ${t.boss}` : ''}</b></div><div class="center castle-lives"><b>${t.lives}</b> ${hearts}</div><div class="typing-field"><div class="castle">🏰</div>${enemy}</div><div class="typing-stats"><div class="stat card"><strong>${wpm}</strong><small>${t.wpm}</small></div><div class="stat card"><strong>${accuracy}%</strong><small>${t.accuracy}</small></div><div class="stat card"><strong>${s.defeated}</strong><small>${t.defeated}</small></div><div class="stat card"><strong>🔥 ${s.combo}</strong><small>${t.combo}</small></div><div class="stat card"><strong>${Player.data.wave}</strong><small>${t.wave}</small></div></div>${input}<div class="center muted">${t.note}</div></section>`;
  }
};
