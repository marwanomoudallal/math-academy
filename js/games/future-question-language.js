// Translates the procedurally generated Geography questions and their answers.
(() => {
  const originalNext = FutureRealms.next.bind(FutureRealms);
  const hemispheres = {
    fr: { 'Northern Hemisphere':'Hémisphère Nord', 'Southern Hemisphere':'Hémisphère Sud', 'Eastern Hemisphere':'Hémisphère Est', 'Western Hemisphere':'Hémisphère Ouest', Northeast:'Nord-est', Northwest:'Nord-ouest', Southeast:'Sud-est', Southwest:'Sud-ouest' },
    ar: { 'Northern Hemisphere':'نصف الكرة الشمالي', 'Southern Hemisphere':'نصف الكرة الجنوبي', 'Eastern Hemisphere':'نصف الكرة الشرقي', 'Western Hemisphere':'نصف الكرة الغربي', Northeast:'الشمال الشرقي', Northwest:'الشمال الغربي', Southeast:'الجنوب الشرقي', Southwest:'الجنوب الغربي' }
  };

  function translateGeneratedGeography(question, language) {
    const labels = hemispheres[language];
    if (!labels) return;
    const originalAnswer = question.answer;
    const staticQuestions = {
      fr: {
        'What is the capital of France?':'Quelle est la capitale de la France ?', 'Egypt is located on which continent?':'Sur quel continent se trouve l’Égypte ?',
        'Which is the largest ocean?':'Quel est le plus grand océan ?', 'What is the capital of Japan?':'Quelle est la capitale du Japon ?',
        'The Amazon rainforest is mainly in which country?':'Dans quel pays se trouve principalement la forêt amazonienne ?', 'Which continent is the coldest?':'Quel est le continent le plus froid ?',
        'Mount Everest belongs to which mountain range?':'À quelle chaîne de montagnes appartient l’Everest ?', 'What is the capital of Lebanon?':'Quelle est la capitale du Liban ?',
        'Which imaginary line divides Earth into north and south?':'Quelle ligne imaginaire sépare la Terre entre le nord et le sud ?', 'Which country has the shape of a boot?':'Quel pays a la forme d’une botte ?',
        'The Nile River flows into which sea?':'Dans quelle mer se jette le Nil ?', 'What is the capital of Australia?':'Quelle est la capitale de l’Australie ?'
      },
      ar: {
        'What is the capital of France?':'ما عاصمة فرنسا؟', 'Egypt is located on which continent?':'في أي قارة تقع مصر؟',
        'Which is the largest ocean?':'ما أكبر محيط؟', 'What is the capital of Japan?':'ما عاصمة اليابان؟',
        'The Amazon rainforest is mainly in which country?':'في أي دولة تقع معظم غابات الأمازون؟', 'Which continent is the coldest?':'ما أبرد قارة؟',
        'Mount Everest belongs to which mountain range?':'إلى أي سلسلة جبلية ينتمي جبل إيفرست؟', 'What is the capital of Lebanon?':'ما عاصمة لبنان؟',
        'Which imaginary line divides Earth into north and south?':'ما الخط الوهمي الذي يقسم الأرض إلى شمال وجنوب؟', 'Which country has the shape of a boot?':'أي دولة تشبه في شكلها الحذاء؟',
        'The Nile River flows into which sea?':'في أي بحر يصب نهر النيل؟', 'What is the capital of Australia?':'ما عاصمة أستراليا؟'
      }
    };
    const terms = {
      fr: {Paris:'Paris',Rome:'Rome',Madrid:'Madrid',Berlin:'Berlin',Africa:'Afrique',Asia:'Asie',Europe:'Europe','South America':'Amérique du Sud','Pacific Ocean':'Océan Pacifique','Atlantic Ocean':'Océan Atlantique','Indian Ocean':'Océan Indien','Arctic Ocean':'Océan Arctique',Tokyo:'Tokyo',Kyoto:'Kyoto',Seoul:'Séoul',Beijing:'Pékin',Brazil:'Brésil',Canada:'Canada',India:'Inde',Australia:'Australie',Antarctica:'Antarctique','North America':'Amérique du Nord',Himalayas:'Himalaya',Andes:'Andes',Alps:'Alpes',Rockies:'Rocheuses',Beirut:'Beyrouth',Tripoli:'Tripoli',Byblos:'Byblos',Sidon:'Sidon',Equator:'Équateur','Prime Meridian':'Méridien de Greenwich','Tropic of Cancer':'Tropique du Cancer','Date Line':'Ligne de changement de date',Italy:'Italie',Greece:'Grèce',Portugal:'Portugal',Norway:'Norvège','Mediterranean Sea':'Mer Méditerranée','Red Sea':'Mer Rouge','Black Sea':'Mer Noire','Arabian Sea':'Mer d’Arabie',Canberra:'Canberra',Sydney:'Sydney',Melbourne:'Melbourne',Perth:'Perth'},
      ar: {Paris:'باريس',Rome:'روما',Madrid:'مدريد',Berlin:'برلين',Africa:'أفريقيا',Asia:'آسيا',Europe:'أوروبا','South America':'أمريكا الجنوبية','Pacific Ocean':'المحيط الهادئ','Atlantic Ocean':'المحيط الأطلسي','Indian Ocean':'المحيط الهندي','Arctic Ocean':'المحيط المتجمد الشمالي',Tokyo:'طوكيو',Kyoto:'كيوتو',Seoul:'سيول',Beijing:'بكين',Brazil:'البرازيل',Canada:'كندا',India:'الهند',Australia:'أستراليا',Antarctica:'القارة القطبية الجنوبية','North America':'أمريكا الشمالية',Himalayas:'الهيمالايا',Andes:'الأنديز',Alps:'الألب',Rockies:'الروكي',Beirut:'بيروت',Tripoli:'طرابلس',Byblos:'جبيل',Sidon:'صيدا',Equator:'خط الاستواء','Prime Meridian':'خط غرينتش','Tropic of Cancer':'مدار السرطان','Date Line':'خط التاريخ الدولي',Italy:'إيطاليا',Greece:'اليونان',Portugal:'البرتغال',Norway:'النرويج','Mediterranean Sea':'البحر المتوسط','Red Sea':'البحر الأحمر','Black Sea':'البحر الأسود','Arabian Sea':'بحر العرب',Canberra:'كانبرا',Sydney:'سيدني',Melbourne:'ملبورن',Perth:'بيرث'}
    };
    if (staticQuestions[language][question.text]) {
      question.text = staticQuestions[language][question.text];
      question.options = question.options.map(option => terms[language][option] || option);
      question.answer = terms[language][originalAnswer] || originalAnswer;
      question.explain = language === 'fr' ? `La bonne réponse est ${question.answer}.` : `الإجابة الصحيحة هي ${question.answer}.`;
      return;
    }
    const latitude = question.text.match(/^A place is at (\d+).*? ([NS])\. Which hemisphere is it in\?$/);
    const longitude = question.text.match(/^A city is at (\d+).*? ([EW])\. Which hemisphere is it in\?$/);
    const scale = question.text.match(/^On a map, 1 cm represents (\d+) km\. How far is (\d+) cm\?$/);
    const direction = question.text.match(/^An explorer travels (\d+) km north and (\d+) km east\./);

    if (latitude) {
      const side = latitude[2] === 'N';
      question.text = language === 'fr'
        ? `Un lieu se trouve à ${latitude[1]}° ${side?'N':'S'}. Dans quel hémisphère est-il ?`
        : `يقع مكان عند ${latitude[1]}° ${side?'شمالاً':'جنوباً'}. في أي نصف من الكرة الأرضية يقع؟`;
      question.explain = language === 'fr' ? `${side?'N':'S'} signifie ${labels[originalAnswer]}.` : `${side?'شمال':'جنوب'} يعني ${labels[originalAnswer]}.`;
    } else if (longitude) {
      const side = longitude[2] === 'E';
      question.text = language === 'fr'
        ? `Une ville se trouve à ${longitude[1]}° ${side?'E':'O'}. Dans quel hémisphère est-elle ?`
        : `تقع مدينة عند ${longitude[1]}° ${side?'شرقاً':'غرباً'}. في أي نصف من الكرة الأرضية تقع؟`;
      question.explain = language === 'fr' ? `${side?'E':'O'} signifie ${labels[originalAnswer]}.` : `${side?'الشرق':'الغرب'} يعني ${labels[originalAnswer]}.`;
    } else if (scale) {
      question.text = language === 'fr' ? `Sur une carte, 1 cm représente ${scale[1]} km. Quelle distance représentent ${scale[2]} cm ?` : `على الخريطة، يمثل 1 سم ${scale[1]} كم. ما المسافة التي يمثلها ${scale[2]} سم؟`;
      question.explain = language === 'fr' ? `${scale[2]} × ${scale[1]} donne la distance en kilomètres.` : `${scale[2]} × ${scale[1]} يعطي المسافة بالكيلومترات.`;
    } else if (direction) {
      question.text = language === 'fr' ? `Un explorateur parcourt ${direction[1]} km vers le nord et ${direction[2]} km vers l’est. Dans quelle direction générale s’est-il déplacé ?` : `سافر مستكشف ${direction[1]} كم شمالاً و${direction[2]} كم شرقاً. ما اتجاه حركته العام؟`;
      question.explain = language === 'fr' ? 'Se déplacer vers le nord et l’est donne la direction nord-est.' : 'الحركة شمالاً وشرقاً تعطي اتجاه الشمال الشرقي.';
    } else {
      // Answer choices must still be localized if punctuation or browser
      // character encoding makes a generated question miss a text pattern.
      question.options = question.options.map(option => labels[option] || option);
      question.answer = labels[originalAnswer] || originalAnswer;
      return;
    }

    question.options = question.options.map(option => labels[option] || option);
    question.answer = labels[originalAnswer] || originalAnswer;
  }

  function translateGeneratedScience(question, language) {
    if (language === 'en' || !question?.text) return;
    const text = question.text;
    let match = text.match(/^A rover travels (\d+) meters in (\d+) seconds\. What is its speed\?$/);
    if (match) {
      question.text = language === 'fr' ? `Un rover parcourt ${match[1]} mètres en ${match[2]} secondes. Quelle est sa vitesse ?` : `تقطع مركبة ${match[1]} متراً خلال ${match[2]} ثوانٍ. ما سرعتها؟`;
      question.explain = language === 'fr' ? `La vitesse est la distance divisée par le temps : ${match[1]} ÷ ${match[2]}.` : `السرعة تساوي المسافة مقسومة على الزمن: ${match[1]} ÷ ${match[2]}.`;
      return;
    }
    match = text.match(/^A scientist places (\d+) seeds in each of (\d+) trays\. How many seeds are there altogether\?$/);
    if (match) question.text = language === 'fr' ? `Un scientifique place ${match[1]} graines dans chacun de ${match[2]} plateaux. Combien y a-t-il de graines au total ?` : `يضع عالم ${match[1]} بذرة في كل واحد من ${match[2]} صوانٍ. كم بذرة توجد إجمالاً؟`;
    match = question.text.match(/^A liquid warms from ([-\d]+)°C by (\d+)°C\. What is its final temperature\?$/);
    if (match) question.text = language === 'fr' ? `Un liquide se réchauffe de ${match[1]}°C de ${match[2]}°C. Quelle est sa température finale ?` : `يسخن سائل من ${match[1]}°C بمقدار ${match[2]}°C. ما درجة حرارته النهائية؟`;
  }

  FutureRealms.next = function localizedFutureQuestion() {
    originalNext();
    const language = Player.data.settings.language || 'en';
    if (this.current === 'geography') translateGeneratedGeography(this.question, language);
    if (this.current === 'science') translateGeneratedScience(this.question, language);
  };
})();
