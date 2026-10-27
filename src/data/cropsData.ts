import { CropInfo } from '../types';

export const CROPS_DATA: CropInfo[] = [
  // 1. TOMATO
  {
    id: 'tomato',
    commonName: {
      en: 'Tomato',
      mr: 'टोमॅटो',
      hi: 'टमाटर',
    },
    scientificName: 'Solanum lycopersicum',
    cropType: {
      en: 'Solanaceous Vegetable',
      mr: 'भाजीपाला पीक (सोलेनेसी कुल)',
      hi: 'सब्जी फसल (सोलेनेसी कुल)',
    },
    image: '/images/crops/tomato_field.jpg',
    climate: {
      en: 'Warm season crop, sensitive to severe frost. Thrives in moderate humidity with ample sunshine.',
      mr: 'उष्ण व दमट हवामान; अति थंडी व दाट धुके पिकास मानवत नाही. भरपूर सूर्यप्रकाश आवश्यक.',
      hi: 'गर्म मौसम की फसल, अत्यधिक पाले के प्रति संवेदनशील। अच्छी धूप और मध्यम आर्द्रता उपयुक्त।',
    },
    temperature: '21°C – 29°C (Optimum: 24°C)',
    soilPreferences: {
      en: 'Deep, well-drained sandy loam or medium black soil rich in organic matter. Avoid poorly drained clay.',
      mr: 'पाण्याचा चांगला निचरा होणारी पोयट्याची किंवा मध्यम काळी कसदार जमीन. सेंद्रिय पदार्थांचे प्रमाण चांगले असावे.',
      hi: 'अच्छे जल निकास वाली दोमट या मध्यम काली मिट्टी, जिसमें जीवांश पर्याप्त हो।',
    },
    soilPHRange: '6.0 – 6.8',
    sowingTransplanting: {
      en: 'Kharif: June-July nursery, July-August transplanting. Rabi: September-October. Summer: Jan-Feb.',
      mr: 'खरीप: जून-जुलै पुनर्लागवड; रब्बी: सप्टेंबर-ऑक्टोबर; उन्हाळी: जानेवारी-फेब्रुवारी.',
      hi: 'खरीफ: जुलाई-अगस्त रोपाई; रबी: अक्टूबर-नवंबर; ग्रीष्म: जनवरी-फरवरी।',
    },
    growthDurationDays: '110 – 140 days',
    irrigation: {
      en: 'Drip irrigation recommended. Water at 3-4 day intervals during fruit setting. Avoid overhead wetting to minimize fungal foliar diseases.',
      mr: 'ठिबक सिंचन उत्तम. फळधारणेच्या काळात नियमित पाणी द्यावे. पानांवरून पाणी फवारणे टाळावे जेणेकरून बुरशीजन्य रोग वाढणार नाहीत.',
      hi: 'ड्रिप सिंचाई सर्वोत्तम। फल लगने के समय ३-४ दिन के अंतराल पर सिंचाई करें। पत्तियों पर पानी छिड़कने से बचें।',
    },
    nutrients: {
      en: 'NPK 100:50:50 kg/ha for general varieties (200:100:100 for hybrids). Calcium and Boron are critical to prevent blossom end rot and fruit cracking.',
      mr: 'हायब्रिडसाठी २००:१००:१०० किलो नत्र, स्फुरद व पालाश प्रति हेक्टर. फळे तडकणे व काजळी रोखण्यासाठी कॅल्शियम व बोरॉन अत्यंत आवश्यक.',
      hi: 'संतुलित NPK के साथ कैल्शियम और बोरॉन का प्रयोग फल फटने व ब्लॉसम एंड रॉट से बचाव के लिए अनिवार्य है।',
    },
    harvesting: {
      en: 'Harvest at breaker stage for distant transport, and full red ripe stage for local fresh markets or processing.',
      mr: 'दूरच्या बाजारपेठेसाठी गुलाबी किंवा पिवळसर छटा आल्यावर, स्थानिक बाजारासाठी पूर्ण लाल झाल्यावर काढणी करावी.',
      hi: 'दूर के बाज़ार के लिए गुलाबी अवस्था पर और स्थानीय बाज़ार के लिए पूर्ण लाल पकने पर तुड़ाई करें।',
    },
    generalPrevention: {
      en: 'Follow 3-year crop rotation (avoid potato/brinjal before tomato). Use raised beds with silver-black mulch, install yellow sticky traps (15/acre), and apply Trichoderma enriched farmyard manure.',
      mr: 'गादीवाफ्यावर लागवड, चंदेरी-काळी मल्चिंग पेपर, पिवळे चिकट सापळे (१५/एकर) आणि ट्रायकोडर्मायुक्त शेणखताचा बेसल डोस वापरावा. वांगी व बटाट्यानंतर टोमॅटो घेणे टाळावे.',
      hi: 'उठी हुई क्यारियों पर रोपाई, मल्चिंग, पीले चिपचिपे कार्ड (१५/एकड़) और ट्राइकोडर्मा युक्त गोबर की खाद का प्रयोग करें।',
    },
    diseases: [
      {
        id: 'tomato-early-blight',
        commonName: {
          en: 'Early Blight (Alternaria Leaf Spot)',
          mr: 'अर्ली ब्लाइट (करपा रोग)',
          hi: 'अगेती झुलसा (अर्ली ब्लाइट)',
        },
        scientificName: 'Alternaria solani',
        type: 'fungal',
        image: '/images/crops/tomato_early_blight.jpg',
        causes: {
          en: 'Fungus Alternaria solani surviving in soil debris and infected seeds. Favoured by alternating warm and humid conditions.',
          mr: 'अल्टर्नारिया सोलानी बुरशी. जमिनीतील जुने अवशेष आणि हवेतील आर्द्रतेमुळे फैलाव होतो.',
          hi: 'अल्टरनेरिया सोलानी कवक, जो मिट्टी में बचे पौधों के अवशेषों और बीज से फैलता है।',
        },
        symptoms: {
          en: 'Concentric dark brown rings ("target-board" spots) starting on bottom older leaves. Leaf margins turn yellow and wither.',
          mr: 'खालच्या जुन्या पानांवर लक्षवेधक गोलाकार काळे-तपकिरी डाग (टार्गेट बोर्डसारखी वलये), कडा पिवळ्या पडून सुकणे.',
          hi: 'निचली पत्तियों पर गोल संकेन्द्री छल्ले (टारगेट बोर्ड जैसे धब्बे), पत्तियों का पीला पड़कर सूखना।',
        },
        favouringConditions: {
          en: 'Temperatures between 24°C–30°C with heavy morning dew, intermittent showers, and humid microclimates.',
          mr: 'तापमान २४°ते ३०°सेल्सिअस, सकाळचे धुके, ढगाळ वातावरण आणि उच्च आर्द्रता.',
          hi: '२४° से ३०° सेल्सियस तापमान, सुबह की ओस और उच्च आर्द्रता।',
        },
        howItSpreads: {
          en: 'Wind-blown spores and rain splashes from the soil onto lower foliage.',
          mr: 'वाऱ्याद्वारे बुरशीचे बीजाणू आणि पावसाच्या पाण्याचे शिंतोडे उडाल्यामुळे.',
          hi: 'हवा और बारिश की बूंदों के छींटों द्वारा निचली पत्तियों पर।',
        },
        distinguishFromLookalikes: {
          en: 'Unlike Late Blight, lesions have sharp concentric rings and do not produce white cottony fungal growth under the leaf surface.',
          mr: 'लेट ब्लाइटसारखी पानाच्या मागे पांढरी बुरशी दिसत नाही, तर स्पष्ट गोलाकार कडी (वलये) दिसतात.',
          hi: 'पत्तियों के नीचे सफेद कवक नहीं दिखता, बल्कि स्पष्ट संकेन्द्री गोल छल्ले बनते हैं।',
        },
        preventionAndCulture: {
          en: 'Prune bottom 6-8 inches of leaves near ground level. Use drip irrigation. Mulch soil to prevent soil splashing.',
          mr: 'जमिनीलगतची खालची ६-८ इंचांची पाने छाटून नष्ट करावीत. मल्चिंगचा वापर करावा. पाणी जमिनीवरून उडणार नाही याची काळजी घ्यावी.',
          hi: 'जमीन से सती निचली ६-८ इंच पत्तियों को हटा दें। मल्चिंग का प्रयोग करें ताकि मिट्टी के छींटे न उड़ें।',
        },
        biologicalControl: {
          en: 'Foliar spray of Trichoderma harzianum (5g/L) or Bacillus subtilis (3g/L) at 10-day intervals. Sour buttermilk spray (50ml/L).',
          mr: 'ट्रायकोडर्मा व्हिरीडी (५ ग्रॅम/लिटर) किंवा सुडोमोनास (५ ग्रॅम/लिटर) ची फवारणी. जुने आंबट ताक (५० मिली/लिटर) उपयुक्त.',
          hi: 'ट्राइकोडर्मा हरजिएनम (५ ग्राम/लीटर) या खट्टी छाछ (५० मिली/लीटर) का छिड़काव करें।',
        },
        treatmentApproach: {
          en: 'If severity exceeds 10%, apply Copper Oxychloride 50% WP (2.5g/L) or Mancozeb 75% WP (2g/L). Strictly follow pre-harvest intervals.',
          mr: 'प्रादुर्भाव वाढल्यास कॉपर ऑक्सिक्लोराईड (२.५ ग्रॅम/लिटर) किंवा मॅन्कोझेब (२ ग्रॅम/लिटर). काढणीच्या आधी किमान ७ दिवस फवारणी थांबवावी.',
          hi: 'संक्रमण अधिक होने पर कॉपर ऑक्सीक्लोराइड (२.५ ग्राम/लीटर) या मैंकोजेब का छिड़काव करें।',
        },
        safetyPrecautions: {
          en: 'Wear mask and protective clothing when spraying. Never spray against the wind direction. Keep livestock away for 48 hours.',
          mr: 'फवारणी करताना तोंड झाकावे, वाऱ्याच्या उलट दिशेने फवारणी करू नये. जनावरांना लांब ठेवावे.',
          hi: 'सुरक्षात्मक मास्क पहनें। हवा की उल्टी दिशा में छिड़काव न करें।',
        },
        expertAssistanceThreshold: {
          en: 'When more than 25% foliage is defoliated or lesions spread to stem collars and green fruit.',
          mr: '२५% पेक्षा जास्त झाडे वाळल्यास किंवा खोडावर जखमा होऊन झाड मोडू लागल्यास कृषी विस्तार अधिकाऱ्यांचा सल्ला घ्यावा.',
          hi: 'यदि २५% से अधिक पत्तियां सूखने लगें या तने पर काले धब्बे बनने लगें तो KVK से परामर्श करें।',
        },
      },
      {
        id: 'tomato-leaf-curl',
        commonName: {
          en: 'Tomato Leaf Curl Virus (ToLCV)',
          mr: 'टोमॅटो पर्णगुच्छ रोग (चुरडा-मुरडा)',
          hi: 'पत्ती मरोड़ रोग (लीफ कर्ल वायरस)',
        },
        scientificName: 'Begomovirus (transmitted by Bemisia tabaci)',
        type: 'viral',
        image: '/images/crops/tomato_leaf_curl.jpg',
        causes: {
          en: 'Begomovirus transmitted by the silverleaf whitefly (Bemisia tabaci). Not seed-transmitted.',
          mr: 'पांढऱ्या माशीद्वारे (Bemisia tabaci) पसरणारा विषाणू. बियाण्यातून हा रोग पसरत नाही.',
          hi: 'सफेद मक्खी (बेमिसिया तबासी) द्वारा फैलने वाला बेगोमोवायरस।',
        },
        symptoms: {
          en: 'Severe upward curling and puckering of young leaves, stunted bushy appearance, thickening of veins, flower drop.',
          mr: 'नवीन कोवळी पाने वरच्या बाजूला वाटीसारखी आकसणे, झाडाची वाढ खुंटून झुडपासारखे दिसणे, फुले गळणे.',
          hi: 'पत्तियों का ऊपर की ओर मुड़ना, पौधा बौना व झाड़ीनुमा होना, नसों का मोटा होना व फूल गिरना।',
        },
        favouringConditions: {
          en: 'Hot, dry spells during vegetative stage that promote rapid whitefly population explosion.',
          mr: 'कोरडे व उबदार हवामान, ज्यामध्ये पांढऱ्या माशीची झपाट्याने पैदास होते.',
          hi: 'गर्म और शुष्क मौसम, जिससे सफेद मक्खी की संख्या बहुत तेजी से बढ़ती है।',
        },
        howItSpreads: {
          en: 'Vector-borne: Whiteflies feeding on infected weeds or crops acquire and transmit the virus within 30 minutes.',
          mr: 'पांढरी माशी आजारी झाडाचा रस शोषून निरोगी झाडावर बसल्यावर विषाणूचा प्रसार करते.',
          hi: 'सफेद मक्खी द्वारा रस चूसने के माध्यम से।',
        },
        distinguishFromLookalikes: {
          en: 'Unlike mite damage (downward curling), virus curling is predominantly upward with vein clearing and extreme stunting.',
          mr: 'लाल कोळीच्या त्रासात पाने खालच्या बाजूला वळतात (उलट वाटी), तर व्हायरसमध्ये पाने वरच्या बाजूला चुरमुरतात.',
          hi: 'माइट्स में पत्तियां नीचे मुड़ती हैं, जबकि लीफ कर्ल में पत्तियां ऊपर की ओर मुड़ती हैं।',
        },
        preventionAndCulture: {
          en: 'Cover nursery beds with 40-50 mesh nylon insect netting for 25 days. Install 20 yellow sticky traps per acre.',
          mr: 'रोपवाटिका ४०-५० मेशच्या नायलॉन जाळीने झाकून ठेवावी. शेतात एकरी २० पिवळे चिकट सापळे लावावेत.',
          hi: 'नर्सरी को ४० मेश नेट से ढकें। खेत में २० पीले चिपचिपे कार्ड प्रति एकड़ लगाएं।',
        },
        biologicalControl: {
          en: 'Neem seed kernel extract (NSKE 5%) or 10,000 ppm cold-pressed Neem oil (2-3 ml/L). Spray Lecanicillium lecanii (5g/L).',
          mr: '५% निंबोळी अर्क किंवा कोल्ड प्रेस्ड नीम ऑइल (२-३ मिली/लिटर). लेकॅनीसिलियम लेकॅनी जैविक बुरशीची फवारणी.',
          hi: 'नीम का तेल (३ मिली/लीटर) या लेकैनिसिलियम लेकानी (५ ग्राम/लीटर) का छिड़काव करें।',
        },
        treatmentApproach: {
          en: 'No chemical can cure an already infected viral plant. Rogue out and bury severely infected plants immediately. Target vector with safe systemic insect growth regulators if critical.',
          mr: 'विषाणू बाधित झाड औषधाने बरे होत नाही. बाधित रोपे उपटून जमिनीत गाडून टाकावीत जेणेकरून इतर झाडांना धोका होणार नाही.',
          hi: 'वायरस से प्रभावित पौधों को उखाड़कर तुरंत नष्ट करें ताकि संक्रमण न फैले। सफेद मक्खी को नियंत्रित रखें।',
        },
        safetyPrecautions: {
          en: 'Do not handle healthy plants immediately after touching diseased plants. Wash hands with soap.',
          mr: 'रोगट झाडाला स्पर्श केल्यानंतर हात साबणाने स्वच्छ धुवावेत.',
          hi: 'संक्रमित पौधों को छूने के बाद हाथ अच्छी तरह धोएं।',
        },
        expertAssistanceThreshold: {
          en: 'When whitefly count exceeds 5 per leaf or more than 10% of field shows curling in first 30 days.',
          mr: 'लागवडीनंतर पहिल्या ३० दिवसांत ५ पेक्षा जास्त झाडांवर लक्षणे दिसल्यास ताबडतोब कृषी सहाय्यकांशी संपर्क साधावा.',
          hi: 'बुवाई के ३० दिनों के भीतर १०% से अधिक पौधों में लक्षण दिखने पर विशेषज्ञ से सलाह लें।',
        },
      },
    ],
    pests: [
      {
        id: 'tomato-fruit-borer',
        commonName: {
          en: 'Tomato Fruit Borer',
          mr: 'टोमॅटो फळपोखरणारी अळी',
          hi: 'टमाटर फल छेदक (हेलिकोवर्पा)',
        },
        scientificName: 'Helicoverpa armigera',
        type: 'pest',
        image: '/images/crops/tomato_fruit_borer.jpg',
        causes: {
          en: 'Caterpillars bore holes into developing green and ripe tomatoes, feeding internally and introducing secondary rot.',
          mr: 'हेलिकोव्हर्पा पतंगाची अळी फळामध्ये गोल छिद्र करून आतला गर खाते. परिणामी फळे कुजतात.',
          hi: 'हेलिकोवर्पा की इल्ली फलों में गोल छेद बनाकर अंदर का गूदा खाती है।',
        },
        symptoms: {
          en: 'Circular entry holes on fruit with caterpillar excreta (frass) around the perimeter. Premature fruit dropping.',
          mr: 'फळावर गोलाकार छिद्र आणि छिद्राभोवती विष्ठा, फळे अर्धवट सडणे आणि गळणे.',
          hi: 'फलों पर गोल छेद और मल की उपस्थिति, फलों का समय से पहले गिरना।',
        },
        favouringConditions: {
          en: 'Warm humid spells following monsoons; presence of alternate hosts like gram and cotton nearby.',
          mr: 'उष्ण व ढगाळ हवामान; शेजारी हरभरा किंवा कापूस पीक असल्यास प्रादुर्भाव वेगाने वाढतो.',
          hi: 'उष्ण आर्द्र मौसम और आस-पास चना या कपास की फसल की उपस्थिति।',
        },
        howItSpreads: {
          en: 'Adult moths fly actively at night, depositing hundreds of single spherical yellowish eggs on leaves and tender sepals.',
          mr: 'रात्रीच्या वेळी पतंग पानांवर व कळ्यांवर एकेकटी अंडी घालतात.',
          hi: 'वयस्क पतंग रात में पत्तियों और फूलों पर अंडे देते हैं।',
        },
        distinguishFromLookalikes: {
          en: 'Distinct neat circular bore-holes compared to irregular chewing damage from armyworms.',
          mr: 'इतर किडींपेक्षा या अळीचे छिद्र अगदी गोलाकार आणि फळाच्या एकाच भागावर असते.',
          hi: 'साफ सुथरा गोल छेद, अनियमित चबाने के निशान नहीं।',
        },
        preventionAndCulture: {
          en: 'Plant African marigold as a trap crop (1 row for every 16 rows of tomato). Install Helicoverpa pheromone traps (5/acre).',
          mr: 'झेंडूची सापळा पीक म्हणून लागवड (१६ ओळी टोमॅटोमागे १ ओळ झेंडू). एकरी ५ कामगंध सापळे लावावेत.',
          hi: 'गेंदे को ट्रैप क्रॉप के रूप में लगाएं। ५ फेरोमोन ट्रैप प्रति एकड़ स्थापित करें।',
        },
        biologicalControl: {
          en: 'Release Trichogramma pretiosum egg parasitoid (50,000/ha). Spray Bacillus thuringiensis (Bt @ 1.5g/L) or HaNPV (250 LE/ha).',
          mr: 'ट्रायकोग्रामा परोपजीवी कीटक सोडावेत. बॅसिलस थुरिंनजिएन्सिस (Bt २ ग्रॅम/लिटर) ची फवारणी करावी.',
          hi: 'ट्राइकोग्रामा कार्ड का उपयोग करें और बीटी (Bt २ ग्राम/लीटर) का छिड़काव करें।',
        },
        treatmentApproach: {
          en: 'If 1 larva per plant or 5% fruit damage occurs, use Azadirachtin 1% (2ml/L) or Emamectin Benzoate 5% SG (0.4g/L) strictly at recommended doses.',
          mr: 'नुकसान ५% च्या पुढे गेल्यास इमामेक्टिन बेन्झोएट (०.४ ग्रॅम/लिटर) ची फवारणी. काढणीच्या ५ दिवस आधी फवारणी थांबवावी.',
          hi: 'आवश्यक होने पर इमामेक्टिन बेंजोएट ५% एसजी (०.४ ग्राम/लीटर) का छिड़काव करें।',
        },
        safetyPrecautions: {
          en: 'Never spray while honeybees are actively foraging in morning hours. Follow 3-day waiting period before picking fruit.',
          mr: 'सकाळी मधमाश्या असताना फवारणी करू नये. फवारणीनंतर ३ दिवस फळे तोडू नयेत.',
          hi: 'सुबह मधुमक्खियों की गतिविधि के समय छिड़काव न करें। फल तुड़ाई से पहले ३ दिन की प्रतीक्षा अवधि रखें।',
        },
        expertAssistanceThreshold: {
          en: 'When pheromone trap catch exceeds 8-10 moths per trap per day for 3 consecutive nights.',
          mr: 'कामगंध सापळ्यात सलग ३ दिवस दररोज ८ ते १० पेक्षा जास्त पतंग सापडल्यास तत्काळ सल्ला घ्यावा.',
          hi: 'फेरोमोन ट्रैप में लगातार ३ दिन तक ८-१० पतंगे प्रति ट्रैप मिलने पर तुरंत उपाय करें।',
        },
      },
    ],
  },

  // 2. RICE
  {
    id: 'rice',
    commonName: {
      en: 'Rice / Paddy',
      mr: 'भात / धान',
      hi: 'धान (चावल)',
    },
    scientificName: 'Oryza sativa',
    cropType: {
      en: 'Cereal Grain (Kharif / Rabi)',
      mr: 'तृणधान्य पीक (खरीप / रब्बी)',
      hi: 'अनाज फसल (खरीफ / रबी)',
    },
    image: '/images/crops/rice_field.jpg',
    climate: {
      en: 'Hot, humid subtropical/tropical monsoon climate. High water requirement and abundant sunshine during grain filling.',
      mr: 'उष्ण व दमट मान्सून हवामान; दाणे भरण्याच्या काळात भरपूर ऊन व पाण्याची उपलब्धता आवश्यक.',
      hi: 'गर्म और आर्द्र मानसूनी जलवायु। दाना भरते समय प्रचुर धूप और पानी की आवश्यकता।',
    },
    temperature: '22°C – 32°C (Optimum: 28°C)',
    soilPreferences: {
      en: 'Clayey loam and heavy alluvial soils with low water permeability and high moisture-holding capacity.',
      mr: 'गाळाची, चिकनमातीयुक्त जमीन; पाणी साठवून ठेवण्याची क्षमता जास्त असणारी माती.',
      hi: 'मटियार दोमट और जलोढ़ मिट्टी, जिसमें जल धारण क्षमता अधिक हो।',
    },
    soilPHRange: '5.5 – 6.5 (Tolerates 5.0 to 7.5)',
    sowingTransplanting: {
      en: 'Nursery: June; Transplanting 20-25 days after sowing (July). System of Rice Intensification (SRI) uses 10-14 day seedlings.',
      mr: 'रोपवाटिका: जून; पुनर्लागवड: जुलै (२०-२५ दिवसांची रोपे). चारसूत्री किंवा एसआरआय पद्धतीसाठी १२-१४ दिवसांची रोपे.',
      hi: 'नर्सरी: जून; रोपाई: जुलाई (२०-२५ दिन के पौधे)। श्री (SRI) विधि में १०-१२ दिन की पौध।',
    },
    growthDurationDays: '115 – 150 days (depending on variety)',
    irrigation: {
      en: 'Maintain 2-5 cm standing water during tillering and panicle initiation. Alternate Wetting and Drying (AWD) saves 30% water and reduces root fungal rot.',
      mr: 'फुटवे येताना व पोटरीच्या वेळी २-५ सेंमी पाणी साठवणे. अधूनमधून पाणी कमी-जास्त (AWD) केल्याने मुळांची कूज टळते.',
      hi: 'कल्ले फूटने और बाली निकलते समय २-५ सेमी पानी रखें। जल निकास का ध्यान रखें।',
    },
    nutrients: {
      en: 'General recommendation 100:50:50 kg NPK/ha. Split Nitrogen: 50% basal, 25% active tillering, 25% panicle initiation. Zinc Sulphate (25 kg/ha) is vital to prevent Khaira disease.',
      mr: '१००:५०:५० किलो नत्र, स्फुरद व पालाश प्रति हेक्टर. युरिया ३ हप्त्यांत द्यावा. खैरा रोग टाळण्यासाठी झिंक सल्फेट (२५ किलो/हेक्टर) देणे आवश्यक.',
      hi: '१००:५०:५० NPK प्रति हेक्टेयर। जिंक की कमी से खैरा रोग होता है, अतः जिंक सल्फेट (२५ किग्रा/हेक्टेयर) अवश्य डालें।',
    },
    harvesting: {
      en: 'Harvest when 80-85% grains in panicles turn golden straw-yellow and moisture drops to 20-22%.',
      mr: 'कणसातील ८०-८५% दाणे पिवळे-सोनेरी झाल्यावर आणि दाण्यातील ओलावा २०-२२% असताना काढणी करावी.',
      hi: 'जब बालियों के ८०-८५% दाने सुनहरे पीले हो जाएं और नमी २०% रह जाए तब कटाई करें।',
    },
    generalPrevention: {
      en: 'Treat seeds with Trichoderma (10g/kg) or Carbendazim (2g/kg) before nursery sowing. Avoid excessive chemical nitrogen application which triggers blast.',
      mr: 'पेरणीपूर्वी बियाण्यास ट्रायकोडर्मा (१० ग्रॅम/किलो) ची बीजप्रक्रिया करा. युरियाचा अतिवापर टाळावा, कारण जास्त युरियामुळे करपा वाढतो.',
      hi: 'बुवाई से पहले ट्राइकोडर्मा (१० ग्राम/किग्रा) से बीज उपचार करें। यूरिया का अत्यधिक प्रयोग न करें।',
    },
    diseases: [
      {
        id: 'rice-blast',
        commonName: {
          en: 'Rice Blast (Leaf & Neck Blast)',
          mr: 'भातावरील करपा (Rice Blast)',
          hi: 'धान का झोंका रोग (ब्लास्ट)',
        },
        scientificName: 'Magnaporthe oryzae (Pyricularia oryzae)',
        type: 'fungal',
        image: '/images/crops/rice_leaf_blast.jpg',
        causes: {
          en: 'Airborne fungal spores thriving in high nitrogen conditions with intermittent dry spells followed by rain.',
          mr: 'हवेतून पसरणारी मॅग्नापोर्थे बुरशी. जास्त युरिया आणि दमट हवामानात वेगाने वाढते.',
          hi: 'मैग्नापोर्थे कवक, जो अधिक यूरिया और उच्च आर्द्रता में तेजी से पनपता है।',
        },
        symptoms: {
          en: 'Spindle-shaped / diamond-shaped lesions on leaves with grey/white centers and reddish-brown borders. In neck blast, panicle base turns black and breaks.',
          mr: 'पानांवर डोळ्याच्या किंवा बोटीच्या आकाराचे मधोमध राखाडी व कडेला तपकिरी डाग. मानमोडी अवस्थेत कणसाचा देठ काळा पडून कणीस लोंबकळते.',
          hi: 'पत्तियों पर नाव या धुरी के आकार के धब्बे (मध्य में राख जैसा रंग, किनारों पर भूरा)। गर्दन टूटने पर बाली खाली रह जाती है।',
        },
        favouringConditions: {
          en: 'Relative humidity > 90%, night temperature 20°C–24°C, prolonged leaf wetness, and excessive nitrogen fertilizer.',
          mr: 'हवेतील आर्द्रता ९०% पेक्षा जास्त, रात्रीचे थंड हवामान आणि युरियाचा अमर्याद वापर.',
          hi: '९०% से अधिक आर्द्रता, २०°-२४°C रात का तापमान और यूरिया का अधिक उपयोग।',
        },
        howItSpreads: {
          en: 'Wind dispersal of millions of microscopic conidia over kilometers during foggy mornings.',
          mr: 'वाऱ्याच्या वेगाने बुरशीचे बीजाणू शेकडो मीटर दूर पसरतात.',
          hi: 'हवा के द्वारा कई किलोमीटर दूर तक।',
        },
        distinguishFromLookalikes: {
          en: 'Rice Brown Spot produces smaller oval spots without the pronounced pointed spindle ends seen in Blast.',
          mr: 'तपकिरी ठिपके (ब्राउन स्पॉट) गोल असतात, तर ब्लास्टचे डाग दोन्ही टोकांना टोकदार (बोटीसारखे) असतात.',
          hi: 'ब्राउन स्पॉट के धब्बे अंडाकार होते हैं, जबकि ब्लास्ट के धब्बे दोनों सिरों पर नुकीले होते हैं।',
        },
        preventionAndCulture: {
          en: 'Balanced split application of Nitrogen (never apply heavy single doses). Drain standing water for 2-3 days during infection onset.',
          mr: 'युरिया विभागून द्यावा. प्रादुर्भाव दिसताच शेतातील पाणी २-३ दिवस काढून देऊन जमीन उघडी करावी.',
          hi: 'यूरिया को ३ किस्तों में दें। रोग की शुरुआत में खेत से पानी निकाल दें।',
        },
        biologicalControl: {
          en: 'Pseudomonas fluorescens seed treatment (10g/kg) followed by foliar spray at tillering (2.5g/L).',
          mr: 'सुडोमोनास फ्लुरोसन्स (१० ग्रॅम/किलो) बीजप्रक्रिया आणि फुटवे येताना फवारणी (५ ग्रॅम/लिटर).',
          hi: 'स्यूडोमोनास फ्लोरोसेंस का बीज उपचार और पत्तियों पर छिड़काव।',
        },
        treatmentApproach: {
          en: 'If diamond lesions exceed 2-5% of leaf area at boot stage, spray Tricyclazole 75% WP (0.6g/L) or Kasugamycin 3% SL (2ml/L) as per university package of practices.',
          mr: 'प्रादुर्भाव जास्त असल्यास ट्रायसायक्लॅझोल ७५% WP (०.६ ग्रॅम/लिटर) ची फवारणी. दाणे भरताना मानमोडी रोखण्यासाठी पोटरीच्या वेळी वेळेत नियोजन करावे.',
          hi: 'गंभीर स्थिति में ट्राईसाइक्लाजोल ७५% डब्ल्यूपी (०.६ ग्राम/लीटर) का छिड़काव करें।',
        },
        safetyPrecautions: {
          en: 'Ensure spray reaches the inner tillers and leaf sheaths. Avoid water source contamination.',
          mr: 'फवारणी करताना पाणी शेतातील पाण्याच्या मुख्य स्त्रोतात जाऊ नये.',
          hi: 'छिड़काव के समय सुरक्षात्मक मास्क का उपयोग करें।',
        },
        expertAssistanceThreshold: {
          en: 'When neck blast lesions appear at panicle emergence (white ears formation).',
          mr: 'कणसे बाहेर पडताना ५% पेक्षा जास्त कणसांचे देठ काळे पडून कणीस पांढरे पडल्यास ताबडतोब कृषी विज्ञान केंद्राशी संपर्क साधावा.',
          hi: 'बाली निकलते समय ५% से अधिक बालियां सूखकर सफेद दिखने लगें तो तुरंत संपर्क करें।',
        },
      },
      {
        id: 'rice-bacterial-leaf-blight',
        commonName: {
          en: 'Bacterial Leaf Blight (BLB)',
          mr: 'भातावरील जिवाणूजन्य करपा (BLB)',
          hi: 'जीवाणु पत्ती झुलसा (BLB)',
        },
        scientificName: 'Xanthomonas oryzae pv. oryzae',
        type: 'bacterial',
        image: '/images/crops/rice_bacterial_blight.jpg',
        causes: {
          en: 'Bacterium Xanthomonas oryzae entering through leaf hydathodes and wind/storm wounds.',
          mr: 'झँथोमोनास ओरायझी हा जिवाणू. वादळी वाऱ्यामुळे पानांना झालेल्या जखमांमधून प्रवेश करतो.',
          hi: 'जैंथोमोनास ओराइजी जीवाणु, जो हवा व बारिश से पत्ती के घावों में प्रवेश करता है।',
        },
        symptoms: {
          en: 'Water-soaked translucent stripes on leaf margins from leaf tip downwards, turning straw-yellow with wavy irregular margins. Bacterial milky ooze drops on morning leaves.',
          mr: 'पानाच्या टोकाकडून कडेने खाली येणारे नागमोडी पिवळे-तपकिरी पट्टे, सकाळी पानांवर जिवाणूंचे चिकट पिवळे थेंब दिसणे.',
          hi: 'पत्तियों के सिरों से नीचे की ओर लहरदार पीले-सफेद सूखते हुए किनारे। सुबह के समय पत्तियों पर चिपचिपा स्राव।',
        },
        favouringConditions: {
          en: 'High rainfall with strong monsoon winds, typhoons, flooding, and excess urea application.',
          mr: 'मुसळधार पाऊस, सोसाट्याचा वारा, शेतात पाणी साचून राहणे आणि युरियाचा अतिरेक.',
          hi: 'तेज हवा, भारी बारिश और अत्यधिक यूरिया।',
        },
        howItSpreads: {
          en: 'Irrigation water from field to field and wind-driven rain droplets.',
          mr: 'एका शेतातून दुसऱ्या शेतात वाहणारे पाणी आणि पावसाचे थेंब.',
          hi: 'सिंचाई के पानी और बारिश के छींटों द्वारा।',
        },
        distinguishFromLookalikes: {
          en: 'BLB has distinctive wavy margins along leaf borders; blast lesions are spindle-shaped.',
          mr: 'ब्लास्टचे डाग बोटीसारखे मधोमध असतात, तर जिवाणू करपा पानाच्या कडेने नागमोडी रेषेत खाली येतो.',
          hi: 'बीएलबी के किनारे लहरदार होते हैं और पत्ती के किनारे से शुरू होते हैं।',
        },
        preventionAndCulture: {
          en: 'Clip off seedling tips before transplanting is strictly prohibited (creates entry wounds). Stop top-dressing Nitrogen immediately upon symptom appearance.',
          mr: 'पुनर्लागवडीच्या वेळी रोपांचे शेंडे कापू नयेत (जखमेतून जिवाणू शिरतात). लक्षणे दिसताच युरिया देणे त्वरित थांबवावे.',
          hi: 'रोपाई के समय पौध की पत्तियां न काटें। लक्षण दिखते ही यूरिया देना बंद कर दें।',
        },
        biologicalControl: {
          en: 'Foliar spray of fresh cow dung slurry supernatant (20%) mixed with lime or Pseudomonas fluorescens.',
          mr: 'शेणखताचे पाणी (ताजे शेण पाण्यात कालवून वस्त्रगाळ केलेले पाणी ५%) किंवा सुडोमोनासची फवारणी.',
          hi: 'ताजे गोबर का छना हुआ पानी (५%) या स्यूडोमोनास का छिड़काव।',
        },
        treatmentApproach: {
          en: 'Apply Copper Hydroxide (2g/L) or Copper Oxychloride (2.5g/L) with Streptocycline (1g in 10L water) where registered and recommended by state university.',
          mr: 'कॉपर ऑक्सिक्लोराईड (२.५ ग्रॅम/लिटर) + स्ट्रेप्टोसायक्लिन (१ ग्रॅम प्रति १० लिटर पाणी) विद्यापीठाच्या शिफारशीनुसार.',
          hi: 'कॉपर ऑक्सीक्लोराइड और स्ट्रेप्टोसाइक्लिन का छिड़काव अनुशंसित मात्रा में करें।',
        },
        safetyPrecautions: {
          en: 'Do not drain infected water into downstream healthy paddy plots.',
          mr: 'बाधित शेतातील पाणी निरोगी शेतामध्ये वाहू देऊ नका.',
          hi: 'संक्रमित खेत का पानी स्वस्थ खेतों में न जाने दें।',
        },
        expertAssistanceThreshold: {
          en: 'When kresek (complete seedling wilting) stage occurs in young crop within 3 weeks of transplanting.',
          mr: 'लागवडीनंतर ३ आठवड्यांत रोपे वाळू लागल्यास (क्रेसेक अवस्था) त्वरित कृषी अधिकाऱ्यांना दाखवावे.',
          hi: 'रोपाई के ३ सप्ताह के भीतर पौधे मुरझाने लगें तो तुरंत संपर्क करें।',
        },
      },
    ],
    pests: [
      {
        id: 'rice-stem-borer',
        commonName: {
          en: 'Yellow Stem Borer',
          mr: 'भातावरील खोडकीड',
          hi: 'धान का तना छेदक (स्टेम बोरर)',
        },
        scientificName: 'Scirpophaga incertulas',
        type: 'pest',
        image: '/images/crops/rice_stem_borer.jpg',
        causes: {
          en: 'Larva bores inside the central rice stem, severing the vascular bundle from inside.',
          mr: 'अळी मुख्य खोडामध्ये शिरून आतील गाभा खाते.',
          hi: 'सफेद-पीली इल्ली मुख्य तने के अंदर घुसकर भोजन करती है।',
        },
        symptoms: {
          en: '"Dead heart" (drying of central shoot) in vegetative stage; "White earhead" (empty chaffy white panicle) in reproductive stage.',
          mr: 'वाढीच्या अवस्थेत मधला कोंब वाळतो (डेड हार्ट); लोंब्या निघताना कणीस पांढरे व पोचट पडते (व्हाईट इअरहेड).',
          hi: 'वानस्पतिक अवस्था में बीच की गोभ सूख जाती है (डेड हार्ट); बाली अवस्था में सफेद दाना-रहित बालियां (सफेद बाली)।',
        },
        favouringConditions: {
          en: 'Warm humid weather with excessive vegetative lushness from surplus urea.',
          mr: 'उबदार हवामान आणि युरियाच्या अतिवापरामुळे रोपे जास्त लुसलुशीत असणे.',
          hi: 'उष्ण आर्द्र मौसम और अत्यधिक यूरिया से पौधों का अधिक रसीला होना।',
        },
        howItSpreads: {
          en: 'Female moths lay eggs covered in buff-coloured hair scales on the upper surface of leaves near the tip.',
          mr: 'मादी पतंग पानाच्या टोकाजवळ केसाळ पिवळसर अंड्यांचे पुंजके घालते.',
          hi: 'मादा पतंग पत्तियों की नोक पर बालों से ढके अंडों के समूह देती है।',
        },
        distinguishFromLookalikes: {
          en: 'The dried central shoot can be pulled out effortlessly with fingers and reveals caterpillar frass inside.',
          mr: 'वाळलेला मधला कोंब बोटांनी वर ओढल्यास सहजासहजी हातात येतो आणि तळाशी खाल्लेल्या खुणा दिसतात.',
          hi: 'सूखा हुआ कल्ला खींचने पर आसानी से बाहर निकल आता है और नीचे सड़ाव दिखता है।',
        },
        preventionAndCulture: {
          en: 'Clip leaf tips before nursery transplanting to destroy egg masses. Install 8 light traps and 5 pheromone traps per acre.',
          mr: 'रोपांची पुनर्लागवड करताना पानाच्या टोकावरील अंड्यांचे पुंजके हाताने काढून टाकावेत. प्रकाश सापळे लावावेत.',
          hi: 'पौध रोपाई से पहले पत्तियों की नोक काट दें। ५ फेरोमोन ट्रैप प्रति एकड़ लगाएं।',
        },
        biologicalControl: {
          en: 'Release egg parasitoid Trichogramma japonicum (100,000/ha) at weekly intervals.',
          mr: 'ट्रायकोग्रामा जापोनिकमचे ट्रायको-कार्ड शेतात लावावेत (दर आठवड्याला).',
          hi: 'ट्राइकोग्रामा जपोनिकम का प्रयोग करें।',
        },
        treatmentApproach: {
          en: 'Apply Neem extract (1500 ppm @ 3ml/L) or Chlorantraniliprole 0.4% GR granules (4 kg/acre) only when economic threshold (5% dead hearts) is crossed.',
          mr: 'आर्थिक नुकसान मर्यादा (५% डेड हार्ट्स) ओलांडल्यास निंबोळी अर्क किंवा शिफारसीत दाणेदार कीटकनाशक वापरावे.',
          hi: 'आर्थिक नुकसान सीमा (५% मृत कल्ले) पार होने पर नीम तेल या दानेदार कीटनाशक का प्रयोग करें।',
        },
        safetyPrecautions: {
          en: 'Do not handle granules with bare hands. Maintain shallow water layer when applying granules.',
          mr: 'दाणेदार औषध हाताळताना हातमोजे वापरावेत.',
          hi: 'दानेदार कीटनाशक का प्रयोग करते समय दस्ताने पहनें।',
        },
        expertAssistanceThreshold: {
          en: 'When dead hearts exceed 10% in tillering or 2% white ears at flowering.',
          mr: '१०% पेक्षा जास्त कोंब वाळल्यास त्वरित कृषी तज्ज्ञांचा सल्ला घ्यावा.',
          hi: '१०% से अधिक मृत कल्ले दिखने पर विशेषज्ञ से परामर्श करें।',
        },
      },
    ],
  },

  // 3. ONION
  {
    id: 'onion',
    commonName: {
      en: 'Onion',
      mr: 'कांदा',
      hi: 'प्याज',
    },
    scientificName: 'Allium cepa',
    cropType: {
      en: 'Bulb Vegetable',
      mr: 'कंद भाजीपाला पीक',
      hi: 'कंद सब्जी फसल',
    },
    image: '/images/crops/onion_field.jpg',
    climate: {
      en: 'Cooler vegetative stage with mild temperatures, followed by warm, dry weather during bulb development and harvest.',
      mr: 'सुरुवातीच्या वाढीसाठी थंड हवामान, कंद पोसण्यासाठी व काढणीसाठी कोरडे व उष्ण हवामान.',
      hi: 'शुरुआती वृद्धि के लिए हल्की ठंडक तथा कंद बनने व पकने के समय शुष्क व गर्म मौसम।',
    },
    temperature: '13°C – 24°C during growth; 25°C – 32°C during bulb maturity',
    soilPreferences: {
      en: 'Friable sandy loam or medium black soil with high organic matter. Heavy clay soils cause misshapen, deformed bulbs.',
      mr: 'उत्तम निचरा होणारी भुसभुशीत पोयटा किंवा हलकी ते मध्यम काळी जमीन. जड जमिनीत कांद्याचा आकार वेडावाकडा होतो.',
      hi: 'भुरभुरी दोमट या मध्यम काली मिट्टी जिसमें जीवांश प्रचुर हो। भारी मिट्टी में कंद का आकार बिगड़ जाता है।',
    },
    soilPHRange: '6.0 – 7.2',
    sowingTransplanting: {
      en: 'Kharif: Seedbed May-June, transplanting July-August. Late Kharif (Rangada): Aug-Sept. Rabi: Oct-Nov nursery, Dec transplanting.',
      mr: 'खरीप कांदा: जून-जुलै लागवड; रांगडा कांदा: ऑगस्ट-सप्टेंबर; रब्बी (उन्हाळी) कांदा: नोव्हेंबर-डिसेंबर पुनर्लागवड.',
      hi: 'खरीफ: जुलाई-अगस्त रोपाई; रबी (ग्रीष्मकालीन): दिसंबर-जनवरी रोपाई।',
    },
    growthDurationDays: '120 – 150 days from transplanting',
    irrigation: {
      en: 'Shallow root system requires frequent light irrigations (every 5-7 days in winter, 3-4 days in summer). Stop watering 10-15 days before harvest to cure bulbs.',
      mr: 'कांद्याची मुळे उथळ असल्याने हलके व नियमित पाणी द्यावे. काढणीच्या १०-१५ दिवस आधी पाणी बंद करावे जेणेकरून कांदा सडत नाही व टिकवणक्षमता वाढते.',
      hi: 'उथली जड़ों के कारण हल्की व नियमित सिंचाई करें। खुदाई से १०-१५ दिन पहले पानी बंद कर दें।',
    },
    nutrients: {
      en: '100:50:50 kg NPK + 40 kg Sulphur per hectare. Sulphur is essential for pungency, bulb firmness, and long storage life.',
      mr: '१००:५०:५० किलो NPK सोबत एकरी १५-२० किलो गंधक (सल्फर) देणे अत्यंत महत्त्वाचे आहे, ज्यामुळे कांद्याचा रंग, तिखटपणा व टिकवणक्षमता सुधारते.',
      hi: '१००:५०:५० NPK के साथ ४० किग्रा सल्फर प्रति हेक्टेयर। सल्फर प्याज के तीखेपन और भंडारण क्षमता के लिए अनिवार्य है।',
    },
    harvesting: {
      en: 'Harvest when 50% of the plant tops collapse naturally (neck fall). Field cure under shade for 3-5 days before detopping.',
      mr: 'शेतातील ५०% कांद्याची पात नैसर्गिकरीत्या वाकून पडल्यावर (मान पडणे) काढणी करावी. काढणीनंतर ३-५ दिवस सावलीत सुकवून मगच पात कापावी.',
      hi: 'जब ५०% पौधों की पत्तियां नीचे झुक जाएं (नेक फॉल), तब खुदाई करें। ३-५ दिन छाया में सुखाएं।',
    },
    generalPrevention: {
      en: 'Raise seedbeds to avoid damping off. Plant on broad bed furrows (BBF) with drip. Add Sulfur and Trichoderma in soil preparation. Install blue sticky traps for thrips.',
      mr: 'बीबीएफ (रुंद वरंबा) गादीवाफ्यावर लागवड करावी. जमिनीची मशागत करताना गंधक व ट्रायकोडर्माचा वापर करावा. निळे चिकट सापळे लावावेत.',
      hi: 'बीबीएफ क्यारियों पर रोपाई, सल्फर का प्रयोग और थ्रिप्स के लिए नीले चिपचिपे कार्ड लगाएं।',
    },
    diseases: [
      {
        id: 'onion-purple-blotch',
        commonName: {
          en: 'Purple Blotch',
          mr: 'कांद्यावरील जांभळा करपा',
          hi: 'प्याज का बैंगनी धब्बा रोग (पर्पल ब्लॉच)',
        },
        scientificName: 'Alternaria porri',
        type: 'fungal',
        image: '/images/crops/onion_purple_blotch.jpg',
        causes: {
          en: 'Fungus Alternaria porri entering through wounds caused by thrips feeding or mechanical damage.',
          mr: 'अल्टर्नारिया पोरी ही बुरशी. फुलकिड्यांनी (थ्रिप्स) ओरखडलेल्या जखमांमधून ही बुरशी पात्यांमध्ये शिरते.',
          hi: 'अल्टरनेरिया पोरी कवक, जो थ्रिप्स द्वारा खुरची गई पत्तियों के घावों से प्रवेश करता है।',
        },
        symptoms: {
          en: 'Water-soaked sunken lesions on leaves turning purplish with brown borders and yellow chlorotic halos. Leaves break at lesion points.',
          mr: 'पातीवर पांढरट खोलगट डाग, जे नंतर जांभळट-तपकिरी रंगाचे होतात. डागाच्या जागी पात वाकते किंवा मोडून पडते.',
          hi: 'पत्तियों पर छोटे पानी जैसे धब्बे जो बाद में गहरे बैंगनी हो जाते हैं और पत्ती वहां से टूटकर गिर जाती है।',
        },
        favouringConditions: {
          en: 'Warm temperatures (25°C–30°C) with high relative humidity (80-90%), frequent dew, and high thrips infestation.',
          mr: '२५° ते ३०° से. तापमान, सतत ढगाळ वातावरण, रात्रीचे धुके आणि फुलकिड्यांचा प्रादुर्भाव.',
          hi: '२५° से ३०°C तापमान, सुबह की ओस और थ्रिप्स का प्रकोप।',
        },
        howItSpreads: {
          en: 'Wind-blown airborne spores and splashing irrigation water.',
          mr: 'हवेतून आणि पावसाच्या पाण्यामुळे एका पात्यावरून दुसऱ्या पात्यावर पसरते.',
          hi: 'हवा और पानी के छींटों द्वारा।',
        },
        distinguishFromLookalikes: {
          en: 'Distinct dark purple center compared to Stemphylium blight which produces yellow-brown elongated lesions.',
          mr: 'स्टेमफिलियम करप्यात पट्टे पिवळे असतात, तर जांभळ्या करप्यात डागाचा मध्यभाग स्पष्ट जांभळा दिसतो.',
          hi: 'पर्पल ब्लॉच में धब्बे का मध्य भाग गहरा बैंगनी होता है।',
        },
        preventionAndCulture: {
          en: 'Control thrips diligently as their feeding creates fungal entry holes. Provide balanced nutrition with adequate potassium and sulphur.',
          mr: 'फुलकिड्यांचा (थ्रिप्स) बंदोबस्त करणे सर्वात महत्त्वाचे आहे, कारण त्यांच्या ओरखड्यांमुळेच हा रोग होतो. पालाश व गंधकाचा योग्य वापर करावा.',
          hi: 'थ्रिप्स का नियंत्रण सबसे पहले करें। पोटाश और सल्फर का संतुलित प्रयोग करें।',
        },
        biologicalControl: {
          en: 'Spray Trichoderma harzianum (5g/L) or Pseudomonas (5g/L) with agricultural sticker (spreader). Sour buttermilk (50ml/L).',
          mr: 'ट्रायकोडर्मा (५ ग्रॅम/लिटर) + चिकट द्रवासह (स्टिकर) फवारणी. जुने आंबट ताक (५० मिली/लिटर) प्रभावी ठरते.',
          hi: 'ट्राइकोडर्मा (५ ग्राम/लीटर) को स्टिकर के साथ मिलाकर छिड़कें। खट्टी छाछ का छिड़काव उपयोगी।',
        },
        treatmentApproach: {
          en: 'Spray Mancozeb 75% WP (2.5g/L) or Propiconazole 25% EC (1ml/L) with sticking agent (0.5ml/L) to adhere to waxy onion foliage.',
          mr: 'मॅन्कोझेब (२.५ ग्रॅम/लिटर) किंवा प्रोपिकोनाझोल (१ मिली/लिटर) सोबत स्टिकर (०.५ मिली/लिटर) आवर्जून वापरावा, कारण कांद्याची पात गुळगुळीत असते.',
          hi: 'मैंकोजेब (२.५ ग्राम/लीटर) या प्रोपिकोनाजोल (१ मिली/लीटर) में स्टिकर मिलाकर छिड़काव करें।',
        },
        safetyPrecautions: {
          en: 'Always use sticker/spreader; otherwise spray rolls off slippery leaves onto soil.',
          mr: 'स्टिकर (फिक्सर) शिवाय फवारणी करू नये, अन्यथा औषध पात्यांवरून खाली गळून वाया जाते.',
          hi: 'स्टिकर के बिना छिड़काव न करें, अन्यथा दवा फिसलकर गिर जाएगी।',
        },
        expertAssistanceThreshold: {
          en: 'When more than 20% leaves have collapsed or purple blotches girdled the seed stalk (umbel) in seed production.',
          mr: '२०% पेक्षा जास्त पात मोडून पडल्यास किंवा बियाण्याच्या दांड्यावर करपा आल्यास ताबडतोब कृषी तज्ज्ञांना दाखवावे.',
          hi: '२०% से अधिक पत्तियां टूटने लगें तो तुरंत KVK विशेषज्ञों से संपर्क करें।',
        },
      },
    ],
    pests: [
      {
        id: 'onion-thrips',
        commonName: {
          en: 'Onion Thrips',
          mr: 'कांद्यावरील फुलकिडे (थ्रिप्स)',
          hi: 'प्याज के थ्रिप्स (चूसक कीट)',
        },
        scientificName: 'Thrips tabaci',
        type: 'pest',
        image: '/images/crops/onion_thrips_damage.jpg',
        causes: {
          en: 'Minute slender insects scraping the leaf surface and sucking sap in the inner central whorls.',
          mr: 'बारीक पिवळसर-तपकिरी किडे कांद्याच्या पातीच्या बेचक्यात (गाभ्यात) लपून रस शोषतात.',
          hi: 'बारीक पीले-भूरे कीट जो पत्तियों के जोड़ में छिपकर रस चूसते हैं।',
        },
        symptoms: {
          en: 'Silvering or whitish streaks on leaves, curler distorted leaves, dried leaf tips (blasting), stunted bulbs.',
          mr: 'पातीवर पांढुरके चंदेरी ठिपके व ओरखडे, पातीचे टोक करपणे व वाकणे, कांदा लहान राहणे.',
          hi: 'पत्तियों पर सफेद-चांदी जैसे धब्बे, पत्तियों का मुड़ना और ऊपर से सूखना।',
        },
        favouringConditions: {
          en: 'Dry, warm weather with low relative humidity. Rainfall drastically washes off thrips.',
          mr: 'कोरडे व उबदार हवामान, पाऊस नसणे. पावसाने थ्रिप्स धुतले जातात.',
          hi: 'गर्म और सूखा मौसम। बारिश होने पर थ्रिप्स धुल जाते हैं।',
        },
        howItSpreads: {
          en: 'Nymphs crawl inside leaf bases; adults with fringed wings flutter between adjacent fields.',
          mr: 'पिले पानाच्या बेचक्यात लपून राहतात, तर पंख असलेले प्रौढ हवेद्वारे शेतात पसरतात.',
          hi: 'हवा के झोंकों द्वारा खेत में तेजी से फैलते हैं।',
        },
        distinguishFromLookalikes: {
          en: 'Examine leaf axils with a 10x hand lens: visible fast-moving minute yellow nymphs confirm thrips.',
          mr: 'पातीचा बेचका उघडून पाहिल्यास पिवळसर बारीक किडे हालचाल करताना दिसतात.',
          hi: 'पत्तियों के जोड़ को खोलने पर बारीक पीले कीट चलते हुए दिखाई देते हैं।',
        },
        preventionAndCulture: {
          en: 'Install Blue Sticky Traps (20/acre) at leaf height (thrips are intensely attracted to blue). Overhead sprinkler wash reduces population by 50%.',
          mr: 'निळे चिकट सापळे एकरी २० लावावेत (थ्रिप्स निळ्या रंगाकडे जास्त आकर्षित होतात). तुषार सिंचनाने पाणी दिल्यास ५०% थ्रिप्स धुतले जातात.',
          hi: 'नीले चिपचिपे कार्ड (२०/एकड़) लगाएं। स्प्रिंकलर से पानी देने पर थ्रिप्स धुल जाते हैं।',
        },
        biologicalControl: {
          en: 'Spray Beauveria bassiana or Verticillium lecanii (5g/L) during late evening with 5% Neem oil.',
          mr: 'बिव्हेरिया बॅसियाना किंवा व्हर्टिसिलियम लेकॅनी (५ ग्रॅम/लिटर) + ५% निंबोळी अर्क संध्याकाळच्या वेळी फवारावा.',
          hi: 'व्यूवेरिया बासियाना (५ ग्राम/लीटर) और नीम तेल का शाम के समय छिड़काव करें।',
        },
        treatmentApproach: {
          en: 'If population exceeds 30 thrips per plant, spray Fipronil 5% SC (1ml/L) or Spinosad 45% SC (0.3ml/L) along with wetting agent.',
          mr: 'एका रोपावर ३० पेक्षा जास्त किडे आढळल्यास फिप्रोनिल (१ मिली/लिटर) ची शिफारसीनुसार फवारणी.',
          hi: 'संक्रमण अधिक होने पर अनुशंसित कीटनाशक का स्टिकर के साथ छिड़काव करें।',
        },
        safetyPrecautions: {
          en: 'Rotate chemical groups to avoid resistance build-up. Never spray during hot noon sun.',
          mr: 'वारंवार एकाच औषधाची फवारणी करू नये, औषधे बदलून वापरावीत. दुपारच्या उन्हात फवारू नये.',
          hi: 'कीटनाशक बदलते रहें ताकि कीटों में प्रतिरोधक क्षमता न बने। तेज धूप में छिड़काव न करें।',
        },
        expertAssistanceThreshold: {
          en: 'When more than 60 thrips per plant persist after 2 consecutive sprays.',
          mr: 'फवारणी करूनही संख्या कमी न झाल्यास किंवा कांद्याची वाढ पूर्ण थांबल्यास कृषी सहाय्यकांना दाखवावे.',
          hi: 'छिड़काव के बाद भी कीटों की संख्या नियंत्रित न हो तो तुरंत विशेषज्ञ की सलाह लें।',
        },
      },
    ],
  },

  // 4. COTTON
  {
    id: 'cotton',
    commonName: {
      en: 'Cotton (White Gold)',
      mr: 'कापूस (पांढरे सोने)',
      hi: 'कपास (सफेद सोना)',
    },
    scientificName: 'Gossypium hirsutum',
    cropType: {
      en: 'Fibre & Cash Crop',
      mr: 'नगदी तंतू पीक (नगदी पीक)',
      hi: 'नकदी रेशा फसल',
    },
    image: '/images/crops/cotton_field.jpg',
    climate: {
      en: 'Warm tropical/subtropical climate with long frost-free periods (at least 180-200 days) and bright sunshine.',
      mr: 'उष्ण व कोरडे हवामान, दीर्घकाळ स्वच्छ सूर्यप्रकाश. किमान १८० ते २०० दिवस थंडीमुक्त वातावरण आवश्यक.',
      hi: 'उष्ण और शुष्क जलवायु, पर्याप्त धूप और कम से कम १८० दिन ठंड-मुक्त मौसम।',
    },
    temperature: '21°C – 35°C (Optimum: 27°C–32°C)',
    soilPreferences: {
      en: 'Deep black cotton soils (Vertisols) with excellent water-holding capacity or fertile alluvial loams.',
      mr: 'भारी काळी कसदार रेगूर जमीन किंवा गाळाची पोयटा जमीन, ज्यामध्ये ओलावा धरून ठेवण्याची क्षमता जास्त असते.',
      hi: 'गहरी काली कपास मिट्टी (रेगुर) या उपजाऊ जलोढ़ दोमट मिट्टी।',
    },
    soilPHRange: '6.5 – 8.0',
    sowingTransplanting: {
      en: 'Kharif: Pre-monsoon sowing with irrigation (late May) or with onset of monsoon (June-July). Spacing 90x60 cm or 120x45 cm.',
      mr: 'खरीप: मान्सूनपूर्व बागायती पेरणी (मे अखेर) किंवा मान्सून सुरू होताच (जून-जुलै). अंतर ९०x६० सेंमी किंवा १२०x४५ सेंमी.',
      hi: 'खरीफ: मानसून पूर्व या मानसून आते ही (जून-जुलाई)। दूरी ९०x६० सेमी।',
    },
    growthDurationDays: '150 – 180 days',
    irrigation: {
      en: 'Drip fertigation yields highest water-use efficiency. Critical stages: square formation, flowering, and boll development.',
      mr: 'पात्या लागणे, फुलधारणा आणि बोंडे भरण्याच्या नाजूक अवस्थेत पाण्याचा ताण पडू देऊ नये. ठिबक सिंचन अत्यंत फायदेशीर ठरते.',
      hi: 'फूल आते समय और गूलर (बोंड) बनते समय सिंचाई का विशेष ध्यान रखें।',
    },
    nutrients: {
      en: '120:60:60 kg NPK/ha. Top-dress Nitrogen in 3-4 splits. Foliar sprays of 2% DAP or 19:19:19 + 1% Magnesium Sulphate prevent leaf reddening (Lalya disease).',
      mr: '१२०:६०:६० किलो NPK प्रति हेक्टर. लाल्या रोग टाळण्यासाठी मॅग्नेशियम सल्फेट (१%) + १९:१९:१९ ची फुलधारणेच्या वेळी फवारणी करावी.',
      hi: 'संतुलित NPK के साथ मैग्नीशियम सल्फेट (१%) का छिड़काव पत्तियों को लाल होने (लाल्या रोग) से बचाता है।',
    },
    harvesting: {
      en: 'Pick clean, dry, well-burst bolls in early morning hours. Store free of moisture, leaves, and trash.',
      mr: 'चांगल्या उमललेल्या स्वच्छ बोंडांची सकाळी वेचणी करावी. काडीकचरा न मिसळता कोरड्या जागी साठवण करावी.',
      hi: 'पूरी तरह खिली हुई साफ रुई की सुबह के समय तुड़ाई करें। पत्ती और कचरा अलग रखें।',
    },
    generalPrevention: {
      en: 'Strictly avoid extending the cotton crop into summer (terminating by December/January breaks Pink Bollworm life cycle). Install 5 pheromone traps per acre from 45 days after sowing.',
      mr: 'डिसेंबर/जानेवारीनंतर फरदड (खोडवा) घेणे पूर्णपणे टाळावे, जेणेकरून गुलाबी बोंडअळीचा जीवनक्रम तुटतो. एकरी ५ फेरोमोन सापळे लावावेत.',
      hi: 'दिसंबर के बाद फरदड़ (खूंट) फसल न लें ताकि गुलाबी सुंडी का जीवन चक्र टूट सके। ५ फेरोमोन ट्रैप लगाएं।',
    },
    diseases: [
      {
        id: 'cotton-bacterial-blight',
        commonName: {
          en: 'Bacterial Blight (Angular Leaf Spot / Blackarm)',
          mr: 'कपाशीवरील जिवाणूजन्य करपा (अँग्युलर लीफ स्पॉट)',
          hi: 'कपास का जीवाणु झुलसा (कोणीय पत्ती धब्बा / ब्लैकआर्म)',
        },
        scientificName: 'Xanthomonas citri pv. malvacearum',
        type: 'bacterial',
        image: '/images/crops/cotton_angular_blight.jpg',
        causes: {
          en: 'Bacterium Xanthomonas citri pv. malvacearum, seed-borne and surviving in infected crop residue.',
          mr: 'झँथोमोनास जिवाणू. बियाण्यातून आणि मागील वर्षाच्या अवशेषांतून पसरतो.',
          hi: 'जैंथोमोनास जीवाणु, जो बीज और मिट्टी में बचे अवशेषों से फैलता है।',
        },
        symptoms: {
          en: 'Water-soaked angular spots bounded by leaf veins; lesions on stems turn black and encircle branch causing breakage ("Blackarm"); round water-soaked spots on bolls.',
          mr: 'पानांच्या शिरांमुळे बांधलेले त्रिकोणी / कोनात्मक काळे डाग, फांद्या काळ्या पडून मोडणे (ब्लॅकआर्म) आणि बोंडांवर खोलगट डाग.',
          hi: 'पत्तियों की नसों के बीच कोणीय पानी जैसे धब्बे; तने व शाखाओं का काला पड़कर टूटना (ब्लैकआर्म)।',
        },
        favouringConditions: {
          en: 'High humidity (> 85%) with warm temperatures (28°C–32°C) and cloudy rainy weather.',
          mr: '२८° ते ३२° से. तापमान, सतत रिमझिम पाऊस आणि हवेतील उच्च आर्द्रता.',
          hi: 'उच्च आर्द्रता, रुक-रुक कर बारिश और गर्म मौसम।',
        },
        howItSpreads: {
          en: 'Rain splashes and wind-driven rain droplets carrying bacteria from leaf to leaf.',
          mr: 'पावसाचे पाण्याचे शिंतोडे आणि वाऱ्याद्वारे एका झाडावरून दुसऱ्या झाडावर.',
          hi: 'बारिश के पानी के छींटों द्वारा।',
        },
        distinguishFromLookalikes: {
          en: 'Angular sharp borders restricted strictly by fine leaf veinlets, unlike fungal leaf spots which are round.',
          mr: 'याचे डाग पानाच्या शिरांमध्ये अडकल्यामुळे टोकदार/त्रिकोणी असतात, गोल नसतात.',
          hi: 'धब्बे गोल न होकर नसों द्वारा सीमित कोणीय होते हैं।',
        },
        preventionAndCulture: {
          en: 'Acid delinting of seed followed by seed treatment. Collect and burn infected plant debris after harvest.',
          mr: 'बियाण्यास बीजप्रक्रिया करावी. शेतातील काडीकचरा जाळून नष्ट करावा.',
          hi: 'प्रमाणित रोगमुक्त बीज का उपयोग करें और फसल अवशेषों को नष्ट करें।',
        },
        biologicalControl: {
          en: 'Seed bio-priming with Pseudomonas fluorescens (10g/kg) and foliar spray at square formation (2.5g/L).',
          mr: 'सुडोमोनास फ्लुरोसन्स (१० ग्रॅम/किलो) ची बीजप्रक्रिया आणि पाते धरताना फवारणी.',
          hi: 'स्यूडोमोनास फ्लोरोसेंस का बीज उपचार और छिड़काव।',
        },
        treatmentApproach: {
          en: 'Spray Copper Oxychloride 50% WP (2.5g/L) mixed with Streptocycline (1g in 10L water) as per agricultural university guidelines.',
          mr: 'कॉपर ऑक्सिक्लोराईड (२.५ ग्रॅम/लिटर) + स्ट्रेप्टोसायक्लिन (१ ग्रॅम/१० लिटर) ची फवारणी कृषी विद्यापीठाच्या शिफारशीनुसार करावी.',
          hi: 'कॉपर ऑक्सीक्लोराइड और स्ट्रेप्टोसाइक्लिन का अनुशंसित छिड़काव करें।',
        },
        safetyPrecautions: {
          en: 'Do not spray when temperatures exceed 35°C in midday sun.',
          mr: 'दुपारच्या कडक उन्हात फवारणी करू नये.',
          hi: 'तेज धूप में छिड़काव से बचें।',
        },
        expertAssistanceThreshold: {
          en: 'When blackarm stage snaps more than 5% fruiting branches.',
          mr: '५% पेक्षा जास्त फांद्या काळ्या पडून मोडू लागल्यास कृषी विस्तार अधिकाऱ्यांना शेत दाखवावे.',
          hi: '५% से अधिक शाखाएं काली पड़कर टूटने लगें तो तुरंत कृषि अधिकारी से संपर्क करें।',
        },
      },
    ],
    pests: [
      {
        id: 'cotton-pink-bollworm',
        commonName: {
          en: 'Pink Bollworm',
          mr: 'गुलाबी बोंडअळी',
          hi: 'गुलाबी सुंडी (पिंक बॉलवर्म)',
        },
        scientificName: 'Pectinophora gossypiella',
        type: 'pest',
        image: '/images/crops/cotton_pink_bollworm.jpg',
        causes: {
          en: 'Larva enters young squares or bolls and seals the entrance hole with silk and frass, feeding entirely within.',
          mr: 'अळी लहान बोंडामध्ये शिरून प्रवेशद्वार विष्ठेने बंद करते आणि आतून बिया व रुई कुरतडते.',
          hi: 'इल्ली छोटे गूलर में घुसकर छेद बंद कर देती है और अंदर के बीजों व रुई को खाती है।',
        },
        symptoms: {
          en: '"Rosetted flowers" (petals twist together in rosette pattern), premature opening of stained stained bolls, damaged seeds (locules).',
          mr: 'डोम कळी (फुलांच्या पाकळ्या एकमेकांना गुंडाळून गुलाबासारख्या दिसणे), बोंडे अर्धवट व अकाली फुटणे, रुई पिवळी पडणे.',
          hi: 'गुलाब जैसे मुड़े हुए फूल (रोसेट फ्लावर), गूलरों का असमय व अधूरा खुलना, बदरंग रुई।',
        },
        favouringConditions: {
          en: 'Extending the crop beyond December (ratooning / fardad), high humidity during boll formation.',
          mr: 'डिसेंबरनंतर कपाशीचे पीक शेतात तसेच ठेवणे (फरदड घेणे) आणि बोंडधारणेच्या काळात दमट हवामान.',
          hi: 'दिसंबर के बाद फसल को खेत में बनाए रखना और नम मौसम।',
        },
        howItSpreads: {
          en: 'Moths emerge from diapausing larvae in stored cotton seed or un-terminated fields.',
          mr: 'घरातील किंवा जिनिंगमधील साठवलेल्या बियाण्यांमधून पतंग बाहेर पडून शेतात पसरतात.',
          hi: 'घरों या गोदामों में रखे बीजों से पतंगे निकलकर खेतों में फैलते हैं।',
        },
        distinguishFromLookalikes: {
          en: 'Pinkish body colour with prominent brown head capsule found concealed strictly inside seeds or unopened bolls.',
          mr: 'अळीचा रंग गुलाबी असतो आणि ती बोंडाच्या आत बियाण्यामध्ये लपलेली असते.',
          hi: 'इल्ली का रंग गुलाबी होता है और यह गूलर के अंदर बीजों में मिलती है।',
        },
        preventionAndCulture: {
          en: 'Strictly terminate cotton by end of December. Install 5 pheromone traps per acre at 45 days. Collect and destroy rosetted flowers daily.',
          mr: 'डिसेंबर अखेरपर्यंत कपाशीचे पीक उपटून शेत मोकळे करावे. एकरी ५ फेरोमोन सापळे लावावेत. डोम कळ्या हाताने गोळा करून नष्ट कराव्यात.',
          hi: 'दिसंबर तक फसल समाप्त करें। ५ फेरोमोन ट्रैप लगाएं। रोसेट फूलों को इकट्ठा करके नष्ट करें।',
        },
        biologicalControl: {
          en: 'Release Trichogramma bactrae (50,000/ha) every 10 days during flowering. Spray 5% Neem seed kernel extract (NSKE).',
          mr: 'ट्रायकोग्रामा बॅक्ट्री परोपजीवी कीटक सोडावेत. ५% निंबोळी अर्काची नियमित फवारणी करावी.',
          hi: 'ट्राइकोग्रामा कार्ड लगाएं और ५% नीम काढ़े का छिड़काव करें।',
        },
        treatmentApproach: {
          en: 'If 8 moths/trap/day for 3 consecutive days or 10% green boll damage occurs, apply Profenofos 50% EC (2ml/L) or Emamectin Benzoate (0.5g/L) strictly at university recommended rates.',
          mr: 'फेरोमोन सापळ्यात सलग ३ दिवस दररोज ८ पतंग किंवा १०% बोंडे बाधित दिसल्यास शिफारसीत कीटकनाशकाची फवारणी करावी.',
          hi: 'आर्थिक नुकसान सीमा पार होने पर अनुशंसित कीटनाशक का छिड़काव करें।',
        },
        safetyPrecautions: {
          en: 'Never spray near open water bodies or fish ponds. Wear full face protection and gloves.',
          mr: 'विहीर, तळे किंवा पाण्याच्या साठ्याजवळ फवारणी करू नका. संपूर्ण सुरक्षा किट वापरा.',
          hi: 'जलाशयों के पास छिड़काव न करें। सुरक्षात्मक कपड़े पहनें।',
        },
        expertAssistanceThreshold: {
          en: 'When more than 10% of green bolls sampled across the field contain live pink bollworm larvae.',
          mr: '२० बोंडे फोडून पाहिल्यास त्यापैकी २ पेक्षा जास्त बोंडांत गुलाबी अळी आढळल्यास तत्काळ कृषी विज्ञान केंद्राशी संपर्क साधावा.',
          hi: 'खेत में १०% से अधिक हरे गूलरों में जीवित गुलाबी सुंडी मिलने पर तुरंत कृषि विशेषज्ञ से संपर्क करें।',
        },
      },
    ],
  },
];
