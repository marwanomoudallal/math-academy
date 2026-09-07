// French and Arabic localization for Space Mission and Nature Rescue.
(() => {
  const questions={
    fr:{
      space:[
        ['Quelle planète est la plus proche du Soleil ?',['Mercure','Terre','Mars','Jupiter'],0,'Mercure est la première planète à partir du Soleil.'],
        ['Comment appelle-t-on une personne qui voyage dans l’espace ?',['Astronaute','Marin','Géologue','Plongeur'],0,'Les astronautes apprennent à vivre et travailler dans l’espace.'],
        ['Qu’est-ce qui maintient les planètes autour du Soleil ?',['La gravité','Le vent','Le son','La pluie'],0,'La gravité du Soleil maintient les planètes sur leur orbite.'],
        ['Quelle planète est célèbre pour ses anneaux ?',['Saturne','Vénus','Terre','Mars'],0,'Saturne possède de grands anneaux de glace.'],
        ['Quel est le satellite naturel de la Terre ?',['La Lune','Le Soleil','Mars','Une comète'],0,'La Lune tourne autour de la Terre.'],
        ['Quelle est la plus grande planète ?',['Jupiter','Terre','Mercure','Neptune'],0,'Jupiter est la plus grande planète du système solaire.'],
        ['Pourquoi les astronautes portent-ils une combinaison ?',['Pour respirer et se protéger','Pour nager','Pour devenir invisibles','Pour diriger les planètes'],0,'La combinaison fournit de l’air et protège les astronautes.'],
        ['Un rover parcourt 4 km par jour pendant 3 jours. Quelle distance parcourt-il ?',['12 km','7 km','4 km','1 km'],0,'4 × 3 = 12 kilomètres.']
      ],
      nature:[
        ['Que libèrent les arbres que les humains respirent ?',['De l’oxygène','Du plastique','De la fumée','Du sel'],0,'Les plantes libèrent de l’oxygène pendant la photosynthèse.'],
        ['Où faut-il mettre une boîte en carton propre ?',['Dans le bac de recyclage','Dans la rivière','Sur la route','Dans une gamelle'],0,'Le papier et le carton propres peuvent souvent être recyclés.'],
        ['Que faut-il faire avec un robinet qui coule ?',['Le fermer','Le laisser couler','Ajouter du savon','L’ouvrir davantage'],0,'Fermer les fuites aide à économiser l’eau.'],
        ['Quelle énergie utilise la lumière du Soleil ?',['L’énergie solaire','Le charbon','L’essence','Le diesel'],0,'Les panneaux solaires transforment la lumière en électricité.'],
        ['Pourquoi les abeilles sont-elles importantes ?',['Elles pollinisent les fleurs','Elles font tomber la pluie','Elles nettoient les océans','Elles déplacent les montagnes'],0,'La pollinisation aide les plantes à produire des graines et des fruits.'],
        ['Quelle action aide les animaux sauvages ?',['Protéger les habitats','Jeter des déchets','Gaspiller l’eau','Couper tous les arbres'],0,'Les habitats sains fournissent nourriture, eau et abri.'],
        ['Que réduisent les bouteilles réutilisables ?',['Les déchets plastiques','La lumière','L’air frais','La croissance des plantes'],0,'Réutiliser une bouteille évite de nombreux objets jetables.'],
        ['Une classe plante 5 rangées de 4 arbres. Combien d’arbres ?',['20','9','15','25'],0,'5 × 4 = 20 arbres.']
      ]
    },
    ar:{
      space:[
        ['ما الكوكب الأقرب إلى الشمس؟',['عطارد','الأرض','المريخ','المشتري'],0,'عطارد هو أول كوكب من الشمس.'],
        ['ماذا نسمّي الشخص الذي يسافر في الفضاء؟',['رائد فضاء','بحّار','جيولوجي','غواص'],0,'يتدرّب رواد الفضاء على العيش والعمل في الفضاء.'],
        ['ما الذي يُبقي الكواكب حول الشمس؟',['الجاذبية','الرياح','الصوت','المطر'],0,'تحافظ جاذبية الشمس على مدارات الكواكب.'],
        ['أي كوكب مشهور بحلقاته؟',['زحل','الزهرة','الأرض','المريخ'],0,'لدى زحل حلقات كبيرة مكوّنة من الجليد.'],
        ['ما القمر الطبيعي للأرض؟',['القمر','الشمس','المريخ','مذنب'],0,'يدور القمر حول الأرض.'],
        ['ما أكبر كوكب؟',['المشتري','الأرض','عطارد','نبتون'],0,'المشتري هو أكبر كوكب في نظامنا الشمسي.'],
        ['لماذا يرتدي رواد الفضاء بدلات فضائية؟',['للتنفس والحماية','للسباحة','ليصبحوا غير مرئيين','للتحكم بالكواكب'],0,'توفر البدلة الهواء وتحمي رائد الفضاء.'],
        ['تسير مركبة 4 كم يوميًا لمدة 3 أيام. كم تقطع؟',['12 كم','7 كم','4 كم','1 كم'],0,'4 × 3 = 12 كيلومترًا.']
      ],
      nature:[
        ['ماذا تطلق الأشجار ويتنفسه الناس؟',['الأكسجين','البلاستيك','الدخان','الملح'],0,'تطلق النباتات الأكسجين أثناء البناء الضوئي.'],
        ['أين نضع صندوقًا ورقيًا نظيفًا؟',['حاوية إعادة التدوير','النهر','الطريق','وعاء الطعام'],0,'يمكن إعادة تدوير الورق والكرتون النظيفين.'],
        ['ماذا نفعل بصنبور يسرّب الماء؟',['نغلقه','نتركه مفتوحًا','نضيف الصابون','نفتحه أكثر'],0,'إغلاق التسرب يساعد على توفير الماء.'],
        ['أي مصدر للطاقة يستخدم ضوء الشمس؟',['الطاقة الشمسية','الفحم','البنزين','الديزل'],0,'تحول الألواح الشمسية الضوء إلى كهرباء.'],
        ['لماذا النحل مهم للنباتات؟',['يلقّح الأزهار','يصنع المطر','ينظف المحيط','يحرك الجبال'],0,'يساعد التلقيح النباتات على صنع البذور والثمار.'],
        ['أي عمل يساعد الحيوانات البرية؟',['حماية المواطن الطبيعية','رمي النفايات','هدر الماء','قطع كل الأشجار'],0,'توفر المواطن السليمة الغذاء والماء والمأوى.'],
        ['ماذا تقلل الزجاجات القابلة لإعادة الاستخدام؟',['النفايات البلاستيكية','ضوء الشمس','الهواء النقي','نمو النباتات'],0,'إعادة الاستخدام تقلل الأدوات البلاستيكية ذات الاستعمال الواحد.'],
        ['زرع صف 5 مجموعات من 4 أشجار. كم شجرة؟',['20','9','15','25'],0,'5 × 4 = 20 شجرة.']
      ]
    }
  };
  const copy={fr:{'Space Mission':'Mission spatiale','Nature Rescue':'Sauvetage de la nature','Explore planets, rockets, and our solar system.':'Explore les planètes, les fusées et notre système solaire.','Protect wildlife and care for our planet.':'Protège les animaux et prends soin de notre planète.','Commander Nova':'Commandante Nova','Ranger Fern':'Garde forestier Fern','Explore planets, rockets, gravity, and the solar system.':'Explore les planètes, les fusées, la gravité et le système solaire.','Protect habitats, save resources, and learn how nature works.':'Protège les habitats, économise les ressources et découvre la nature.','← Games':'← Jeux'},ar:{'Space Mission':'مهمة فضائية','Nature Rescue':'إنقاذ الطبيعة','Explore planets, rockets, and our solar system.':'استكشف الكواكب والصواريخ ونظامنا الشمسي.','Protect wildlife and care for our planet.':'احمِ الحيوانات واعتنِ بكوكبنا.','Commander Nova':'القائدة نوفا','Ranger Fern':'الحارس فيرن','Explore planets, rockets, gravity, and the solar system.':'استكشف الكواكب والصواريخ والجاذبية والنظام الشمسي.','Protect habitats, save resources, and learn how nature works.':'احمِ المواطن الطبيعية ووفر الموارد وتعلم كيف تعمل الطبيعة.','← Games':'← الألعاب'}};
  const extra=realm=>realm==='space'||realm==='nature',shuffle=list=>[...list].sort(()=>Math.random()-.5),oldNext=FutureRealms.next.bind(FutureRealms),oldTitle=FutureRealms.title.bind(FutureRealms),oldRender=FutureRealms.render.bind(FutureRealms);
  FutureRealms.next=function localizedExtraNext(){const language=Player.data.settings.language||'en';if(!extra(this.current)||language==='en'||!questions[language]){oldNext();if(extra(this.current))this.extraQuestionLanguage=language;return}const bank=questions[language][this.current],raw=bank[Math.floor(Math.random()*bank.length)],answer=raw[1][raw[2]];this.question={text:raw[0],options:shuffle(raw[1]),answer,explain:raw[3],code:''};this.feedback='';this.explanation='';this.extraQuestionLanguage=language};
  FutureRealms.title=function localizedExtraTitle(){const title=oldTitle(),dictionary=copy[Player.data.settings.language||'en'];return dictionary?.[title]||title};
  FutureRealms.render=function localizedExtraRender(){const language=Player.data.settings.language||'en';if(extra(this.current)&&this.extraQuestionLanguage!==language)this.next();let html=oldRender(),dictionary=copy[language];if(!dictionary||!extra(this.current))return html;Object.entries(dictionary).forEach(([from,to])=>html=html.split(from).join(to));if(language==='fr')html=html.replace(/Level (\d+)/g,'Niveau $1').replace('✅ Correct!','✅ Correct !').replace('❌ Correct answer:','❌ Bonne réponse :');if(language==='ar')html=html.replace(/Level (\d+)/g,'المستوى $1').replace('✅ Correct!','✅ صحيح!').replace('❌ Correct answer:','❌ الإجابة الصحيحة:');return html};
  const oldCards=App.gameCards.bind(App);App.gameCards=function localizedExtraCards(){let html=oldCards(),dictionary=copy[Player.data.settings.language||'en'];if(dictionary)Object.entries(dictionary).forEach(([from,to])=>html=html.split(`>${from}<`).join(`>${to}<`));return html};
})();
