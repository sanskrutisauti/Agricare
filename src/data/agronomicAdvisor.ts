import { Language } from '../types';

export interface ScanContext {
  id?: string;
  cropName?: string;
  identifiedCrop?: string;
  mostLikelyDisease?: string;
  scientificName?: string;
  severity?: string;
  confidenceLevel?: string;
  immediateSteps?: string[];
  culturalAndPreventivePractices?: string[];
  biologicalOrIPMOptions?: string[];
  fertilizerNutrientCorrection?: string;
  indicatedProducts?: Array<{
    name: string;
    type: string;
    purpose: string;
    approximatePriceINR: number;
    safeUsage: string;
  }>;
}

export function detectLanguage(text: string, fallback: Language = 'en'): Language {
  // Devanagari detection
  const devanagariRegex = /[\u0900-\u097F]/;
  if (devanagariRegex.test(text)) {
    // Check for Marathi-specific markers
    const marathiMarkers = ['आहे', 'नाही', 'करावे', 'करावा', 'पाहिजे', 'शेती', 'कांदा', 'टोमॅटो', 'कापूस', 'भात', 'फवारणी', 'पाने', 'पिकात', 'झाड', 'काय'];
    const isMarathi = marathiMarkers.some((word) => text.includes(word));
    return isMarathi ? 'mr' : 'hi';
  }
  return fallback;
}

export function generateAgronomicAdvisorReply(
  query: string,
  preferredLanguage: Language = 'en',
  scanContext?: ScanContext
): string {
  const lang = detectLanguage(query, preferredLanguage);
  const q = query.toLowerCase();

  // 1. If user specifically asks about the scanned crop / recent diagnosis
  if (scanContext && (
    q.includes('scan') ||
    q.includes('diagnosis') ||
    q.includes('result') ||
    q.includes('हे रोग') ||
    q.includes('हा रोग') ||
    q.includes('उपाय') ||
    q.includes('फवारणी') ||
    q.includes('दवा') ||
    q.includes('दवा सांगा') ||
    q.includes('treatment') ||
    q.includes('cure') ||
    (scanContext.cropName && q.includes(scanContext.cropName.toLowerCase())) ||
    (scanContext.mostLikelyDisease && q.includes(scanContext.mostLikelyDisease.toLowerCase()))
  )) {
    return formatScanSpecificAdvisory(scanContext, lang);
  }

  // 2. Yellow Leaves / Chlorosis / पिवळे पाने / पीली पत्तियां
  if (
    q.includes('yellow') ||
    q.includes('पिवळ') ||
    q.includes('पीली') ||
    q.includes('chlorosis') ||
    q.includes('pale leaf')
  ) {
    if (lang === 'mr') {
      return `🌱 **पाने पिवळी पडण्यावरील शास्त्रीय निदान व कृषी उपाय (ICAR मार्गदर्शक तत्त्वे):**

१. **नत्राची (Nitrogen) कमतरता (खालची पाने पिवळी पडणे):**
   • जुनी पाने फिकट हिरवी किंवा पिवळी पडत असल्यास आणि झाडाची वाढ खुंटल्यास, १९:१९:१९ विद्राव्य खत (५ ग्रॅम/लिटर) फवारा किंवा एकरी ५० किलो गांडूळ खत बेसल डोस द्या.

२. **लोहाची (Iron) किंवा झिंकची (Zinc) कमतरता (नवीन शेंड्याची पाने पिवळी):**
   • नवीन पालवी शिरा सोडून पिवळी पडल्यास चिलेटेड झिंक (१२% EDTA - १ ग्रॅम/लिटर) + फेरस सल्फेट (२ ग्रॅम/लिटर) सोबत ०.५ ग्रॅम सायट्रिक ॲसिड मिसळून फवारणी करा.

३. **मॅग्नेशियम कमतरता (पानांच्या शिरांमधील भाग पिवळा, कडा तांबूस):**
   • मॅग्नेशियम सल्फेट (५ ग्रॅम/लिटर) फवारणी केल्यास ३ ते ५ दिवसांत हरितद्रव्य पुनर्प्रस्थापित होते.

४. **पाण्याचा ताण किंवा दलदल (Waterlogging):**
   • मुळांजवळ पाणी साचल्यास मुळांना ऑक्सिजन मिळत नाही. वाफ्यातील पाण्याचा त्वरित निचरा करा आणि ड्रिपचे प्रमाण नियंत्रित ठेवा.

💡 **त्वरित जैविक कृती:** १ लिटर पाण्यात ५० मिली आंबट ताक + ५ ग्रॅम हळद मिसळून संध्याकाळी फवारा.`;
    }
    if (lang === 'hi') {
      return `🌱 **पत्तियों के पीलेपन का वैज्ञानिक निदान एवं व्यावहारिक उपाय (ICAR संदर्शिका):**

१. **नाइट्रोजन की कमी (निचली पुरानी पत्तियों का पीला पड़ना):**
   • यदि पुरानी पत्तियां हल्की हरी व पीली हो रही हैं, तो पानी में घुलनशील NPK 19:19:19 (5 ग्राम/लीटर) का पर्णीय छिड़काव करें या प्रति एकड़ 1 बैग वर्मीकम्पोस्ट दें।

२. **लौह (Iron) अथवा जिंक (Zinc) की कमी (ऊपरी नई पत्तियों का पीलापन):**
   • नई पत्तियों की नसें हरी और बीच का भाग पीला हो तो चिलिटेड जिंक 12% (1 ग्राम/लीटर) एवं फेरस सल्फेट (2 ग्राम/लीटर) का छिड़काव करें।

३. **मैग्नीशियम की कमी (पत्तियों का शिरा-मध्य पीलापन):**
   • मैग्नीशियम सल्फेट (5 ग्राम/लीटर) का छिड़काव पत्तियों में क्लोरोफिल को तेजी से पुनः सक्रिय करता है।

४. **जड़ों में जलभराव अथवा अधिक सिंचाई:**
   • खेत में पानी रुकने से जड़ें सड़ने लगती हैं। जल निकासी सुनिश्चित करें तथा हल्की निराई-गुड़ाई कर जड़ों तक हवा पहुंचने दें।

💡 **किफायती जैविक उपचार:** 50 मिली खट्टी छाछ + 5 ग्राम हल्दी प्रति लीटर पानी में मिलाकर शाम के समय छिड़कें।`;
    }
    return `🌱 **Scientific Advisory for Yellowing Leaves (Chlorosis) — ICAR Guidelines:**

1. **Nitrogen Deficiency (Older lower leaves yellow first):**
   • Foliar spray of water-soluble NPK 19:19:19 @ 5 g/litre or top-dress 1 bag of enriched vermicompost per acre to quickly restore dark green vigor.

2. **Micronutrient Deficiency (Iron / Zinc - Young upper leaves yellowing):**
   • If veins remain green while tissue turns pale yellow, spray Chelated Zinc (12% EDTA @ 1 g/L) + Ferrous Sulphate (2 g/L) mixed with 0.5 g citric acid.

3. **Magnesium Deficiency (Interveinal chlorosis with reddish margins):**
   • Apply Magnesium Sulphate @ 5 g/litre foliar spray during active growth stage.

4. **Moisture Stress or Poor Drainage:**
   • Waterlogging suffocates feeder roots. Regulate drip irrigation intervals and ensure rapid drainage after heavy rains.

💡 **Immediate Low-Cost Farmer Action:** Spray aged sour buttermilk (50 ml/L) mixed with 5g turmeric powder to provide natural micronutrients and lactic foliar protection.`;
  }

  // 3. Tomato Early Blight / Late Blight / करपा / झुलसा
  if (
    q.includes('early blight') ||
    q.includes('late blight') ||
    q.includes('blight') ||
    q.includes('करपा') ||
    q.includes('झुलसा') ||
    (q.includes('tomato') && (q.includes('spot') || q.includes('leaf')))
  ) {
    if (lang === 'mr') {
      return `🍅 **टोमॅटो करपा (Early / Late Blight) संपूर्ण नियंत्रण उपाय:**

• **लक्षणे:** पानांवर काळे-तपकिरी गोलाकार चक्राकार (Target board) ठिपके पडतात आणि पाने खालून करपत वर जातात.
• **तातडीची कृती (Cultural Sanitation):** जमिनीलगतची बाधित खालची पाने (तळापासून १५ सें.मी.) त्वरित खुडून शेताबाहेर नष्ट करा, जेणेकरून मातीतील बुरशीचे बीजाणू वर उडणार नाहीत.
• **कमी खर्चाचे जैविक नियंत्रण:** ट्रायकोडर्मा व्हिरिडी (Trichoderma viride - ५ ग्रॅम/लिटर) + स्युडोमोनास फ्लुरोसेन्स (५ ग्रॅम/लिटर) चे संध्याकाळच्या वेळी फवारणी करा.
• **रासायनिक संरक्षण (संसर्ग २०% पेक्षा जास्त असल्यास):**
   - कॉपर ऑक्सिक्लोराईड ५०% WP (२.५ ग्रॅम/लिटर) किंवा मॅन्कोझेब ७५% WP (२.५ ग्रॅम/लिटर) चा स्टिकरसह वापर करा.
• **महत्त्वाची काळजी:** फवारणी करताना संरक्षक मास्क व हातमोजे वापरा. काढणीपूर्वी किमान ७ दिवस रासायनिक फवारणी थांबवा.`;
    }
    if (lang === 'hi') {
      return `🍅 **टमाटर अगेती / पछेती झुलसा (Early / Late Blight) का संपूर्ण प्रबंधन:**

• **पहचान:** पत्तियों पर कत्थई-काले गोल छल्लेदार (टारगेट बोर्ड) धब्बे बनते हैं, निचली पत्तियां सूखने लगती हैं।
• **तत्काल खेत प्रबंधन:** पौधे की जमीन से सटी निचली पत्तियों को तोड़कर खेत से दूर गड्ढे में दबाएं।
• **सस्ता व असरदार जैविक उपाय:** ट्राइकोडर्मा विरिडी (5 ग्राम/लीटर) अथवा स्यूडोमोनास (5 मिली/लीटर) शाम के समय स्प्रे करें।
• **रासायनिक सुरक्षा (गंभीर स्थिति में):**
   - कॉपर ऑक्सीक्लोराइड 50% WP (2.5 ग्राम/लीटर) अथवा मैंकोज़ेब 75% WP (2.5 ग्राम/लीटर) का स्टिकर के साथ छिड़काव करें।
• **सुरक्षा सलाह:** छिड़काव के समय मास्क पहनें तथा फल तुड़ाई से 7 दिन पूर्व रासायनिक छिड़काव बंद करें।`;
    }
    return `🍅 **Tomato Blight (Early / Late Blight) Integrated Management:**

• **Diagnostic Cues:** Concentric dark brown target-board rings on foliage starting from bottom canopy upward.
• **Immediate Cultural Action:** Prune off all affected lower foliage up to 15 cm above ground and burn/bury off-field to prevent rain-splash reinfection.
• **Biological / IPM Solution:** Spray *Trichoderma viride* 1% WP @ 5 g/litre mixed with *Pseudomonas fluorescens* @ 5 g/litre during cool evening hours.
• **Justified Protective Fungicide (if disease incidence exceeds 15-20%):**
   - Copper Oxychloride 50% WP @ 2.5 g/L OR Mancozeb 75% WP @ 2.5 g/L with non-ionic sticker.
• **Farmer Safety Note:** Use protective face mask; maintain minimum 7-day pre-harvest interval (PHI) before picking ripe tomatoes.`;
  }

  // 4. Tomato Leaf Curl / Whitefly / चुरडा-मुरडा
  if (
    q.includes('leaf curl') ||
    q.includes('curl') ||
    q.includes('चुरडा') ||
    q.includes('मुरडा') ||
    q.includes('whitefly') ||
    q.includes('पांढरी माशी') ||
    q.includes('सफेद मक्खी')
  ) {
    if (lang === 'mr') {
      return `🍅 **टोमॅटो चुरडा-मुरडा (Leaf Curl Virus) आणि पांढरी माशी नियंत्रण:**

• **कारण:** हा विषाणूजन्य रोग असून पांढऱ्या माशीद्वारे (Bemisia tabaci) पसरतो.
• **सापळा तंत्रज्ञान (IPM):** शेतात एकरी १५ ते २० **पिवळे चिकट सापळे (Yellow Sticky Traps)** पिकाच्या उंचीवर लावा. यामुळे पांढऱ्या माशा मोठ्या प्रमाणात अडकून नष्ट होतात.
• **सेंद्रिय फवारणी:** १०,००० ppm निंबोळी अर्क/नीम ऑईल (२ ते ३ मिली/लिटर) + १ मिली शाम्पू किंवा साबणाचे पाणी मिसळून फवारा.
• **रासायनिक उपाय (प्रमाण जास्त असल्यास):** ॲसिटामिप्रीड २०% SP (०.५ ग्रॅम/लिटर) किंवा डायफेंथियुरॉन ५०% WP (१.२ ग्रॅम/लिटर) चा बदलून वापर करा.
• **टीप:** विषाणूग्रस्त झालेली सुरुवातीची २-३ झाडे मुळासकट उपटून नष्ट करावीत.`;
    }
    if (lang === 'hi') {
      return `🍅 **टमाटर पर्ण कुंचन (Leaf Curl Virus) एवं सफेद मक्खी नियंत्रण:**

• **कारण:** यह रोग सफेद मक्खी (Whitefly) कीट द्वारा फैलाया जाने वाला वायरल रोग है।
• **चिपचिपे कार्ड (IPM ट्रैप):** प्रति एकड़ 15-20 पीले चिपचिपे ट्रैप (Yellow Sticky Traps) फसल की ऊंचाई पर लगाएं।
• **प्राकृतिक स्प्रे:** 10,000 ppm नीम तेल (2-3 मिली/लीटर) पानी में मिलाकर शाम को छिड़कें।
• **रासायनिक उपचार (संक्रमण अधिक होने पर):** एसीटामिप्रिड 20% SP (0.5 ग्राम/लीटर) का छिड़काव करें।
• **महत्वपूर्ण:** अत्यधिक मुड़ी हुई और ठूंठ बनी रोगी शुरुआती पौधों को उखाड़कर नष्ट करें।`;
    }
    return `🍅 **Tomato Leaf Curl Virus (ToLCV) & Whitefly Vector Management:**

• **Etiology:** Viral condition vectored by whiteflies (*Bemisia tabaci*).
• **IPM Mechanical Control:** Install 15–20 **Yellow Sticky Traps** per acre at canopy level to monitor and mass-trap adult whiteflies.
• **Organic Spray:** Cold-pressed Neem oil (10,000 ppm) @ 2.5–3 ml/litre with 1 ml liquid surfactant.
• **Chemical Option (if threshold exceeds 5 whiteflies/leaf):** Acetamiprid 20% SP @ 0.5 g/litre or Diafenthiuron 50% WP @ 1.2 g/litre.
• **Critical Hygiene:** Roguing out and burning initial 1-2 virus-stunted plants immediately prevents secondary field-wide outbreak.`;
  }

  // 5. Rice / Paddy Blast / BLB / Stem Borer / भात / धान
  if (
    q.includes('rice') ||
    q.includes('paddy') ||
    q.includes('भात') ||
    q.includes('धान') ||
    q.includes('blast') ||
    q.includes('stem borer') ||
    q.includes('खोडकिडा')
  ) {
    if (lang === 'mr') {
      return `🌾 **भात (धान) पीक संरक्षण सल्लागार (ICAR / Dr. BSKKV Dapoli):**

१. **पान करपा / ब्लास्ट (Leaf Blast):**
   • पानांवर दोन्ही टोकांना टोकदार (डोळ्यासारखे/हवेच्या आकाराचे) करडे ठिपके पडतात.
   • अतिरिक्त युरिया देणे त्वरित थांबवा. ट्रायसायक्लॅझोल ७५% WP (०.६ ग्रॅम/लिटर) किंवा स्युडोमोनास (५ ग्रॅम/लिटर) फवारा.

२. **जिवाणू करपा (Bacterial Leaf Blight - BLB):**
   • पानाच्या कडा पिवळ्या पडून वाळतात. शेतातील पाणी २ दिवस बाहेर काढून जमीन कोरडी करा. स्ट्रेप्टोसायक्लिन (१ ग्रॅम/१० लिटर) + कॉपर ऑक्सिक्लोराईड (२५ ग्रॅम/१० लिटर) फवारा.

३. **खोडकिडा (Yellow Stem Borer):**
   • फुटवे फुटताना 'मृत गाभा' (Dead heart) आणि लोंबी भरताना 'पांढरी लोंबी' (White earhead) दिसते.
   • एकरी ५ कामगंध सापळे (Pheromone traps with Scirpophaga lure) लावा. क्लोरांट्रानिलीप्रोल ०.४% GR (४ किलो/एकर) वाळूमध्ये मिसळून मुळांशी टाका.`;
    }
    if (lang === 'hi') {
      return `🌾 **धान (चावल) फसल स्वास्थ्य एवं कीट-रोग नियंत्रण (ICAR दिशानिर्देश):**

१. **धान का झुलसा / ब्लास्ट (Blast Disease):**
   • पत्तियों पर नाव या आंख के आकार के धब्बे बनते हैं। यूरिया का अत्यधिक प्रयोग न करें। ट्राइसाइक्लाजोल 75% WP (0.6 ग्राम/लीटर) का छिड़काव करें।

२. **जीवाणु पत्ती झुलसा (Bacterial Leaf Blight):**
   • पत्तियों के किनारे पीले-भूरे होकर सूखने लगते हैं। खेत से 2 दिन के लिए पानी निकाल दें तथा स्ट्रेप्टोसाइक्लिन (1 ग्राम प्रति 10 लीटर) + कॉपर ऑक्सीक्लोराइड (25 ग्राम/10 लीटर) का छिड़काव करें।

३. **तना छेदक (Yellow Stem Borer):**
   • तने के अंदर इल्ली घुसने से 'डेड हार्ट' या सफेद बालियां निकलती हैं। प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं। गंभीर दशा में कार्टाप हाइड्रोक्लोराइड 4G (7.5-10 किग्रा/एकड़) डालें।`;
    }
    return `🌾 **Rice (Paddy) Protection & Health Advisory — ICAR & TNAU Standards:**

1. **Leaf & Neck Blast (*Magnaporthe oryzae*):**
   • Spindle/diamond-shaped lesions with ash-grey centers. Strictly avoid excessive top-dressing of urea. Spray Tricyclazole 75% WP @ 0.6 g/litre or bio-agent *Pseudomonas fluorescens* @ 5 g/L.

2. **Bacterial Leaf Blight (BLB - *Xanthomonas oryzae*):**
   • Wavy yellow marginal drying of leaves. Drain field standing water for 48 hours to aerate root beds. Spray Streptocycline @ 1 g in 10 L water + Copper Oxychloride @ 25 g in 10 L water.

3. **Yellow Stem Borer (*Scirpophaga incertulas*):**
   • Symptoms include vegetative 'dead hearts' and post-flowering 'white earheads'. Install 5 pheromone traps with lure per acre. Apply Chlorantraniliprole 18.5% SC @ 0.3 ml/L or Cartap Hydrochloride 4G @ 8 kg/acre.`;
  }

  // 6. Onion Purple Blotch / Thrips / कांदा / प्याज
  if (
    q.includes('onion') ||
    q.includes('कांदा') ||
    q.includes('प्याज') ||
    q.includes('thrip') ||
    q.includes('purple blotch')
  ) {
    if (lang === 'mr') {
      return `🧅 **कांदा जांभळा करपा (Purple Blotch) आणि थ्रिप्स (फुलकिडे) नियंत्रण:**

१. **थ्रिप्स / फुलकिडे (Thrips tabaci):**
   • पानांवर चंदेरी डाग पडतात व पात्या वाकड्या होतात.
   • एकरी २५ **निळे व पिवळे चिकट सापळे (Blue & Yellow Traps)** लावा.
   • ५% निंबोळी अर्क (५० मिली/लिटर) किंवा फिप्रोनिल ५% SC (१.५ मिली/लिटर) + स्टिकर मिसळून संध्याकाळी फवारा.

२. **जांभळा करपा (Purple Blotch बुरशी):**
   • पात्यांवर खोलगट जांभळट-तपकिरी रंगाचे डाग पडतात.
   • मॅन्कोझेब ७५% WP (२.५ ग्रॅम/लिटर) किंवा प्रोपिकोनेझोल २५% EC (१ मिली/लिटर) सोबत २ मिली ॲग्रो स्टिकर मिसळून फवारा. कांद्याच्या पात्या गुळगुळीत असल्याने स्टिकर आवश्यक आहे.

💡 **खत व्यवस्थापन:** कांद्याला गंधक (Sulphur 90% WDG - १० किलो/एकर) दिल्यास कांद्याचा आकार, रंग आणि साठवण क्षमता वाढते.`;
    }
    if (lang === 'hi') {
      return `🧅 **प्याज का बैंगनी धब्बा (Purple Blotch) एवं थ्रिप्स (चुरडा) नियंत्रण:**

१. **थ्रिप्स कीट नियंत्रण:**
   • पत्तियों पर सफेद-चांदी जैसे धब्बे दिखते हैं। प्रति एकड़ 20 नीले एवं पीले स्टिकी कार्ड लगाएं।
   • नीम का तेल 10,000 ppm (2-3 मिली/लीटर) अथवा फिप्रोनिल 5% SC (1.5 मिली/लीटर) स्टिकर मिलाकर छिड़कें।

२. **बैंगनी धब्बा रोग (Purple Blotch):**
   • पत्तियों पर बैंगनी-भूरे धब्बे बनते हैं। मैंकोजेब 75% WP (2.5 ग्राम/लीटर) अथवा टेबुकोनाजोल 25.9% EC (1 मिली/लीटर) का छिड़काव करें। ध्यान रहे, प्याज की पत्ती चिकनी होती है इसलिए स्टिकर अवश्य मिलाएं।

💡 **पोषण टिप:** कंद बनते समय सल्फर (10 किलो/एकड़) का प्रयोग करने से प्याज में चमक, तीखापन और भंडारण क्षमता दोगुनी होती है।`;
    }
    return `🧅 **Onion Purple Blotch (*Alternaria porri*) & Thrips Comprehensive IPM:**

1. **Onion Thrips (*Thrips tabaci*):**
   • Foliage develops silvery mottled patches with crinkled tips. Install 20 **Blue and Yellow Sticky Traps** per acre. Spray 5% Neem Seed Kernel Extract (NSKE) @ 50 ml/L or Fipronil 5% SC @ 1.5 ml/L with adjuvant.

2. **Purple Blotch Management:**
   • Sunken oval purple lesions with yellow margins. Spray Mancozeb 75% WP @ 2.5 g/L or Propiconazole 25% EC @ 1 ml/L. Always mix a non-ionic spreader/sticker (0.5 ml/L) as waxy onion leaves shed spray droplets easily.

💡 **Nutrient Booster:** Soil application of Sulphur 90% WDG @ 10 kg/acre boosts bulb pungent aroma, firm scale development, and storage longevity.`;
  }

  // 7. Cotton / कापूस / कपास / Pink Bollworm / Angular Blight
  if (
    q.includes('cotton') ||
    q.includes('कापूस') ||
    q.includes('कपास') ||
    q.includes('bollworm') ||
    q.includes('बोंडअळी') ||
    q.includes('गुलाबी')
  ) {
    if (lang === 'mr') {
      return `🌱 **कापूस पीक सल्लागार — गुलाबी बोंडअळी व जिवाणू करपा नियंत्रण:**

१. **गुलाबी बोंडअळी (Pink Bollworm - Pectinophora gossypiella):**
   • लक्षणे: फुले अर्धवट उमललेली (गुलाबी बोंडअळीमुळे रोसेट फुले), बोंडांवर बारीक छिद्रे.
   • **कामगंध सापळे (Pheromone Traps):** एकरी ८ फेरोमोन ट्रॅप्स पिकाच्या उंचीपेक्षा १ फूट उंच लावा. आठवड्याला ल्यूर तपासा.
   • **जैविक फवारणी:** बेसिलस थुरिन्जिनेन्सिस (Bt Formulation - २ ग्रॅम/लिटर) किंवा बिव्हेरिया बॅसियाना (५ ग्रॅम/लिटर).
   • **रासायनिक संरक्षण:** इमामेक्टिन बेन्झोएट ५% SG (०.५ ग्रॅम/लिटर) किंवा क्लोरपायरीफॉस २०% EC (२ मिली/लिटर).

२. **पाने लाल पडणे (Magnesium Deficiency / Leaf Reddening):**
   • मॅग्नेशियम सल्फेट (१० ग्रॅम/लिटर) + १९:१९:१९ (५ ग्रॅम/लिटर) फवारणी करा.

३. **जिवाणू करपा (Angular Leaf Spot):**
   • कॉपर ऑक्सिक्लोराईड (२.५ ग्रॅम/लिटर) + स्ट्रेप्टोसायक्लिन (१ ग्रॅम/१० लिटर) फवारा.`;
    }
    if (lang === 'hi') {
      return `🌱 **कपास फसल सलाह — गुलाबी सुंडी (Pink Bollworm) एवं लाल पत्ती प्रबंधन:**

१. **गुलाबी सुंडी (Pink Bollworm):**
   • पहचान: गुलाब जैसी मुड़ी हुई कलियां (Rosette flowers) एवं डोडों में छिद्र।
   • **फेरोमोन ट्रैप:** प्रति एकड़ 8 फेरोमोन ट्रैप लगाएं।
   • **जैविक नियंत्रण:** ब्युवेरिया बेसियाना (5 ग्राम/लीटर) या नीम तेल (3 मिली/लीटर) का शाम को छिड़काव।
   • **रासायनिक विकल्प:** इमामेक्टिन बेंजोएट 5% SG (0.5 ग्राम/लीटर)।

२. **कपास की पत्तियों का लाल होना (Magnesium deficiency):**
   • मैग्नीशियम सल्फेट (10 ग्राम/लीटर) + 19:19:19 (5 ग्राम/लीटर) का पर्णीय छिड़काव करें।

३. **जीवाणु अंगमारी:**
   • कॉपर ऑक्सीक्लोराइड (2.5 ग्राम/लीटर) + स्ट्रेप्टोसाइक्लिन (1 ग्राम प्रति 10 लीटर पानी) का छिड़काव करें।`;
    }
    return `🌱 **Cotton Crop Advisory — Pink Bollworm & Foliar Reddening Management:**

1. **Pink Bollworm (*Pectinophora gossypiella*):**
   • Visual signs: Rosette flowers, premature boll opening, and internal fiber staining.
   • **Pheromone Trapping:** Erect 8 pheromone traps per acre with Gossyplure septa at 30 cm above crop canopy.
   • **Biopesticide Option:** *Beauveria bassiana* @ 5 g/L or *Bacillus thuringiensis* (Bt) wettable powder @ 2 g/L.
   • **Chemical Intervention:** Emamectin Benzoate 5% SG @ 0.5 g/L or Chlorpyrifos 20% EC @ 2 ml/L during twilight.

2. **Leaf Reddening (Magnesium & Soil Aeration Stress):**
   • Foliar spray of Magnesium Sulphate @ 10 g/litre + NPK 19:19:19 @ 5 g/litre during square and boll development.

3. **Angular Leaf Blight (*Xanthomonas campestris* pv. *malvacearum*):**
   • Copper Oxychloride @ 2.5 g/L + Streptocycline @ 1 g/10L water.`;
  }

  // 8. Organic / Biological / Neem Oil / Buttermilk Sprays / सेंद्रिय कीटकनाशक
  if (
    q.includes('neem') ||
    q.includes('निंबोळी') ||
    q.includes('नीम') ||
    q.includes('organic') ||
    q.includes('सेंद्रिय') ||
    q.includes('जैविक') ||
    q.includes('buttermilk') ||
    q.includes('ताक') ||
    q.includes('छाछ') ||
    q.includes('dashaparni') ||
    q.includes('दशपर्णी')
  ) {
    if (lang === 'mr') {
      return `🌿 **कमी खर्चाचे घरगुती व जैविक सेंद्रिय फवारणी उपाय:**

१. **आंबट ताक व हळद फवारणी (नैसर्गिक बुरशीनाशक):**
   • साहित्य: ५ ते ७ दिवस जुने आंबट ताक १ लिटर + १०० ग्रॅम हळद पावडर.
   • प्रमाण: २० लिटर पाण्यात १ लिटर द्रावण मिसळून फवारल्यास भुरी, करपा व पानावरील डाग त्वरित नियंत्रणात येतात.

२. **नीम ऑईल / निंबोळी अर्क (कीड प्रतिबंधक):**
   • १०,००० ppm निंबोळी तेल २ ते ३ मिली प्रति लिटर पाण्यात मिसळावे.
   • तेल पाण्यात मिसळण्यासाठी १ मिली निरमा लिक्विड किंवा शाम्पू टाकणे आवश्यक आहे.

३. **दशपर्णी अर्क (सर्व प्रकारच्या किडींवर रामबाण):**
   • कडुलिंब, कण्हेर, घाणेरी, पपई, एरंड आदी १० झाडांच्या पानांपासून तयार केलेला अर्क (२५ मिली/लिटर). रसशोषक किडी व अळ्यांवर उत्तम काम करतो.

४. **ट्रायकोडर्मा व्हिरिडी (जैविक मित्र बुरशी):**
   • ५ ग्रॅम प्रति लिटर पाणी किंवा एकरी २ किलो शेणखतात मिसळून दिल्यास जमिनीतील मर रोग (Wilt) व मूळकुज कायमस्वरूपी थांबते.`;
    }
    if (lang === 'hi') {
      return `🌿 **सस्ते व प्रभावी प्राकृतिक / जैविक कीटनाशक व फफूंदनाशक:**

१. **खट्टी छाछ एवं हल्दी का घोल (प्राकृतिक फफूंदनाशक):**
   • सामग्री: 5-7 दिन पुरानी खट्टी छाछ (मट्ठा) 1 लीटर + 50 ग्राम पिसी हल्दी।
   • मात्रा: 15 लीटर पानी में 1 लीटर घोल मिलाकर स्प्रे करें। यह चूर्णिल आसिता (भभूतिया) व पत्तियों के धब्बों को तुरंत रोकता है।

२. **नीम तेल (कीट विकर्षक):**
   • 10,000 ppm नीम तेल (2.5 से 3 मिली प्रति लीटर पानी)। तेल को घोलने हेतु 1 मिली लिक्विड साबुन या शैम्पू अवश्य मिलाएं।

३. **दशपर्णी अर्क (प्राकृतिक कीटनाशक):**
   • 25 मिली प्रति लीटर पानी की दर से छिड़काव करें। माहू, चेपा, सफेद मक्खी और छोटी इल्लियों पर अत्यंत प्रभावी है।

४. **ट्राइकोडर्मा विरिडी (मित्र फफूंद):**
   • 5 ग्राम प्रति लीटर पानी का छिड़काव या 2 किग्रा ट्राइकोडर्मा को 100 किग्रा सड़ी गोबर की खाद में मिलाकर खेत में डालने से उकठा (मुरझान) रोग जड़ से खत्म होता है।`;
    }
    return `🌿 **Low-Cost Organic & Bio-Foliar Formulations (KVK Validated):**

1. **Aged Sour Buttermilk & Turmeric (Bio-Foliar Fungicide):**
   • Recipe: 1 litre 5-day fermented sour buttermilk + 50g pure turmeric powder.
   • Dilution: Mix into 15 litres clean water. Highly potent against powdery mildews, leaf spot fungi, and strengthens surface cuticles.

2. **Cold-Pressed Neem Oil Emulsion (10,000 ppm):**
   • Dosage: 2.5–3 ml per litre of water.
   • Emulsifier: Always add 1 ml liquid dishwash/soap per litre so oil disperses uniformly in water droplets without burning leaves.

3. **Dashaparni Ark (Broad-Spectrum Botanical Pest Repellent):**
   • Dosage: 20–25 ml per litre of water. Suppresses whiteflies, aphids, jassids, and early instar caterpillars safely.

4. **Trichoderma viride Enrichment:**
   • Mix 2 kg *Trichoderma* into 100 kg moist farmyard manure under shade for 7 days, then apply as basal soil inoculant to eradicate Fusarium wilt and root rot.`;
  }

  // 9. Flower & Fruit Drop / फळगळ / फूल गिरना
  if (
    q.includes('flower drop') ||
    q.includes('fruit drop') ||
    q.includes('गळ') ||
    q.includes('गिरना') ||
    q.includes('blossom')
  ) {
    if (lang === 'mr') {
      return `🌸 **फूल व फळ गळतीची मुख्य कारणे व कृषी उपाय:**

१. **बोरॉनची (Boron) कमतरता:**
   • बोरॉन फुलांमधील परागीभवन (Pollination) घडवण्यासाठी अत्यावश्यक आहे. विद्राव्य बोरॉन २०% (१ ग्रॅम/लिटर) फुलोरा अवस्थेत फवारावे.

२. **पाण्याचा ताण किंवा अतिपाणी:**
   • फुलोऱ्याच्या काळात शेतात अचानक पाणी साचणे किंवा जास्त दिवस कोरडे राहणे यामुळे झाड फुले टाकून देते. पाणी देण्याचे वेळापत्रक नियमित ठेवा.

३. **हार्मोन्स असंतुलन:**
   • प्लॅनोफिक्स (Planofix - Alpha Naphthyl Acetic Acid) ०.२५ मिली प्रति ४.५ लिटर पाण्यात मिसळून फवारल्यास फूलगळ त्वरित थांबते. (टीप: प्रमाण कधीही वाढवू नये).

४. **कॅल्शियमची कमतरता:**
   • टोमॅटो, मिरचीच्या फळांची खालची बाजू काळी पडून गळत असल्यास कॅल्शियम नायट्रेट (४ ग्रॅम/लिटर) फवारा.`;
    }
    if (lang === 'hi') {
      return `🌸 **फूल एवं फल गिरने की रोकथाम हेतु संपूर्ण उपाय:**

१. **बोरॉन (Boron) की कमी:**
   • फूल आते समय परागण हेतु बोरॉन अनिवार्य है। चिलिटेड बोरॉन 20% (1 ग्राम/लीटर) का छिड़काव करें।

२. **सिंचाई में उतार-चढ़ाव:**
   • फूल खिलने के समय खेत में न तो सूखा पड़ने दें और न ही अधिक जलभराव होने दें। नियमित हल्की सिंचाई करें।

३. **प्लानोफिक्स (PGR स्प्रे):**
   • प्लानोफिक्स (Planofix) 1 मिली प्रति 4.5 लीटर पानी में मिलाकर छिड़कें। यह फूलों और छोटे फलों का गिरना तुरंत रोकता है।

४. **कैल्शियम की आपूर्ति:**
   • फलों के नीचे काले धब्बे व सड़न रोकने के लिए कैल्शियम नाइट्रेट (3-4 ग्राम/लीटर) का छिड़काव करें।`;
    }
    return `🌸 **Preventing Flower & Fruit Drop — Proven Agronomic Solutions:**

1. **Boron Micronutrient Deficiency:**
   • Boron is essential for pollen tube growth and successful pollination. Spray Soluble Boron 20% @ 1 g/litre during flower bud initiation.

2. **Irrigation Fluctuations:**
   • Moisture swings trigger sudden abscission of flower clusters. Maintain consistent soil moisture via regulated drip irrigation rather than heavy flooding.

3. **Hormonal Regulation (Plant Growth Regulator):**
   • Apply Planofix (Alpha Naphthyl Acetic Acid) @ 0.25 ml per 4.5 litres of water during peak flowering to prevent drop. *Never exceed recommended dosage.*

4. **Calcium Nutrition:**
   • For blossom-end rot and fruit drop in solanaceous crops, apply Calcium Nitrate @ 4 g/litre.`;
  }

  // 10. Fertilizer Schedules / खते / उर्वरक / NPK
  if (
    q.includes('fertilizer') ||
    q.includes('खत') ||
    q.includes('उर्वरक') ||
    q.includes('npk') ||
    q.includes('dap') ||
    q.includes('urea')
  ) {
    if (lang === 'mr') {
      return `🌾 **पिकाच्या वाढीच्या अवस्थेनुसार योग्य खत व्यवस्थापन वेळापत्रक:**

१. **लागवड / पेरणी वेळ (Basal Dose):**
   • शेणखत किंवा गांडूळ खत + सिंगल सुपर फॉस्फेट (SSP) किंवा DAP + म्युरिएट ऑफ पोटॅश (MOP) + निंबोळी पेंड.

२. **शाकीय वाढीची अवस्था (Vegetative Stage - १५ ते ४० दिवस):**
   • नत्र व पांढऱ्या मुळ्यांच्या वाढीसाठी १९:१९:१९ विद्राव्य खत (५ ग्रॅम/लिटर) + ह्युमिक ॲसिड (२ मिली/लिटर).

३. **फुलोरा अवस्था (Flowering Stage):**
   • भरपूर कळ्या व फुलांसाठी १२:६१:०० (मोनो अमोनियम फॉस्फेट - ४ ग्रॅम/लिटर) + बोरॉन (१ ग्रॅम/लिटर).

४. **फळ / दाणे भरण्याची अवस्था (Fruiting / Grain filling):**
   • फळांचा आकार, चकाकी व वजन वाढण्यासाठी ०:५२:३४ (मोनो पोटॅशियम फॉस्फेट - ५ ग्रॅम/लिटर) आणि ०:०:५० (पोटॅशियम सल्फेट - ४ ग्रॅम/लिटर).`;
    }
    if (lang === 'hi') {
      return `🌾 **फसल की विभिन्न अवस्थाओं हेतु संतुलित उर्वरक समय सारणी:**

१. **बुआई/रोपाई के समय (बेसल खुराक):**
   • गोबर की खाद/वर्मीकम्पोस्ट + DAP या SSP + पोटाश (MOP) + नीम खली।

२. **शुरुआती वानस्पतिक बढ़वार (15-35 दिन):**
   • मजबूत जड़ों एवं हरी बढ़वार हेतु 19:19:19 (5 ग्राम/लीटर) + ह्यूमिक एसिड (2 मिली/लीटर)।

३. **फूल आने की अवस्था (Flowering Stage):**
   • अधिक फूलों हेतु 12:61:00 (4 ग्राम/लीटर) + बोरॉन 20% (1 ग्राम/लीटर)।

४. **फल/दाना विकास अवस्था (Fruiting Stage):**
   • फलों के आकार, चमक व मिठास हेतु 0:52:34 (5 ग्राम/लीटर) और 0:0:50 (पोटैशियम सल्फेट 4-5 ग्राम/लीटर)।`;
    }
    return `🌾 **Growth Stage-Wise Balanced Nutrition Schedule (ICAR Aligned):**

1. **Basal Stage (Transplanting/Sowing):**
   • Decomposed FYM/Vermicompost + SSP or DAP + Muriate of Potash + Neem Seed Cake.

2. **Early Vegetative Stage (15–35 Days):**
   • Water-soluble NPK 19:19:19 @ 5 g/litre + Liquid Humic Acid @ 2 ml/litre to stimulate feeder roots.

3. **Flowering Stage:**
   • Water-soluble 12:61:00 (Mono Ammonium Phosphate) @ 4 g/litre + Boron 20% @ 1 g/litre.

4. **Fruit & Grain Filling Stage:**
   • Water-soluble 0:52:34 (MKP) @ 5 g/litre followed by 0:0:50 (Potassium Sulphate) @ 4 g/litre for weight, size, and shelf-life.`;
  }

  // 11. Mandi Prices & Govt Schemes / भाव / योजना
  if (
    q.includes('mandi') ||
    q.includes('market') ||
    q.includes('scheme') ||
    q.includes('योजना') ||
    q.includes('भाव') ||
    q.includes('दर') ||
    q.includes('pm kisan')
  ) {
    if (lang === 'mr') {
      return `🏛️ **शासकीय कृषी योजना व शेतमाल बाजारभाव माहिती:**

१. **पीएम-किसान सन्मान निधी (PM-Kisan):** पात्र शेतकऱ्यांना दरवर्षी ₹६,००० (₹२,००० चे ३ हप्ते) थेट बँक खात्यात मिळतात. ई-केवायसी (e-KYC) जवळच्या सीएससी केंद्रात किंवा pmkisan.gov.in वर पूर्ण करा.

२. **पंतप्रधान पीक विमा योजना (PMFBY):** नैसर्गिक आपत्ती, दुष्काळ किंवा अवकाळी पावसामुळे पिकाचे नुकसान झाल्यास ७२ तासांच्या आत विमा कंपनीस किंवा कृषी सहाय्यकास पंचनाम्यासाठी कळवा.

३. **ई-नाम (e-NAM) बाजारभाव:** आपल्या तालुक्यातील कृषी उत्पन्न बाजार समिती (APMC) चे दैनंदिन आवक व बाजारभाव जाणून घेण्यासाठी enam.gov.in पोर्टलचा वापर करा.

४. **माती आरोग्य पत्रिका (Soil Health Card):** जवळच्या केव्हीके (KVK) कडे माती नमुना दिल्यास मातीतील सूक्ष्मअन्नद्रव्यांची मोफत तपासणी होते.`;
    }
    if (lang === 'hi') {
      return `🏛️ **प्रमुख सरकारी योजनाएं एवं मंडी भाव जानकारी:**

१. **पीएम-किसान सम्मान निधि (PM-Kisan):** प्रतिवर्ष पात्र किसानों को ₹6,000 (₹2,000 की 3 किस्तें) डीबीटी द्वारा सीधे खाते में। ई-केवाईसी pmkisan.gov.in पर कराएं।

२. **प्रधानमंत्री फसल बीमा योजना (PMFBY):** ओलावृष्टि, सूखा अथवा कीट प्रकोप से नुकसान होने पर 72 घंटे के अंदर हेल्पलाइन 14447 या कृषि विभाग में सूचना दें।

३. **राष्ट्रीय कृषि बाजार (e-NAM):** विभिन्न मंडियों के ताजा न्यूनतम व अधिकतम भाव enam.gov.in पर देखें।

४. **मृदा स्वास्थ्य कार्ड (Soil Health Card):** नजदीकी कृषि विज्ञान केंद्र (KVK) से मिट्टी की जांच करवाकर अनावश्यक खाद का खर्च बचाएं।`;
    }
    return `🏛️ **Government Agricultural Schemes & Mandi Guidance:**

1. **PM-Kisan Samman Nidhi:** Direct income support of ₹6,000/year (3 tranches of ₹2,000) for eligible landholding farmer families. Ensure e-KYC is active on pmkisan.gov.in.

2. **Pradhan Mantri Fasal Bima Yojana (PMFBY):** Crop insurance coverage against localized calamities, unseasonal rains, and post-harvest losses. Report within 72 hours via crop insurance app or toll-free 14447.

3. **e-NAM (National Agriculture Market):** Unified national electronic trading portal (enam.gov.in) to check live commodity modal rates and daily arrivals.

4. **Soil Health Card Scheme:** Submit soil samples at your nearest Krishi Vigyan Kendra (KVK) to optimize fertilizer spending.`;
  }

  // 12. General Greeting or Default Advisory
  if (lang === 'mr') {
    return `🙏 **नमस्कार शेतकरी बंधूंनो! मी ॲग्रीकेअर सहाय्यक (AgriCare Sahayak) आहे.**

मी आपल्याला खालील विषयांवर तज्ज्ञ कृषी सल्ला देऊ शकतो:
• पिकांवरील रोग (करपा, चुरडा-मुरडा, खोडकीड, भुरी) व योग्य औषध फवारणी
• कमी खर्चाचे सेंद्रिय उपाय (आंबट ताक, हळद, निंबोळी अर्क, ट्रायकोडर्मा)
• रासायनिक व विद्राव्य खतांचे (१९:१९:१९, ०:५२:३४) योग्य प्रमाण
• टोमॅटो, कांदा, कापूस व भात पिकाचे संपूर्ण संरक्षण
• तुषार व ठिबक सिंचन आणि मातीचे आरोग्य

कृपया आपल्या पिकाचे नाव व नेमकी समस्या सांगा, मी लगेच योग्य मार्गदर्शन करेन!`;
  }
  if (lang === 'hi') {
    return `🙏 **नमस्ते किसान भाइयों! मैं एग्रीकेयर सहायक (AgriCare Sahayak) हूँ।**

मैं आपकी खेती से जुड़ी हर समस्या में सटीक एवं कम लागत वाली सलाह दे सकता हूँ:
• फसलों के रोग (झुलसा, पत्ती मरोड़, तना छेदक, बैंगनी धब्बा) एवं उपचार
• प्राकृतिक व जैविक उपाय (नीम का तेल, खट्टी छाछ, हल्दी, ट्राइकोडर्मा)
• संतुलित उर्वरक एवं खाद की मात्रा (19:19:19, बोरॉन, जिंक)
• टमाटर, धान, प्याज, कपास व अन्य फसलों की देखभाल
• सिंचाई एवं मिट्टी की उर्वरता सुधार

कृपया अपनी फसल का नाम और जो लक्षण दिख रहे हैं, विस्तार से बताएं!`;
  }

  return `🙏 **Namaste! I am AgriCare Sahayak, your AI Agricultural Advisor.**

I am ready to assist you with ICAR-grounded farm guidance on:
• Crop disease diagnosis (Blights, Leaf Curl, Blast, Purple Blotch, Stem Borer)
• Low-cost organic solutions (Sour Buttermilk, Turmeric, Cold-Pressed Neem Oil, Trichoderma)
• Optimal fertilizer schedules (19:19:19, 0:52:34, Micronutrient Zinc & Boron ratios)
• Step-by-step remedies for Tomato, Rice, Onion, Cotton, and other crops
• Irrigation management, soil health, and safety protocols

Please specify your crop and what symptoms or questions you have!`;
}

function formatScanSpecificAdvisory(scan: ScanContext, lang: Language): string {
  const crop = scan.identifiedCrop || scan.cropName || 'Crop';
  const disease = scan.mostLikelyDisease || 'Health Issue';
  const severity = scan.severity || 'Moderate';

  if (lang === 'mr') {
    return `🔍 **आपल्या नुकत्याच केलेल्या स्कॅनवर आधारित सल्लागार अहवाल:**
🌱 **पीक:** ${crop}
⚠️ **निदान झालेला आजार:** ${disease} (तीव्रता: ${severity})

📋 **त्वरित करावयाचे उपाय (Immediate Steps):**
${(scan.immediateSteps || [
  'बाधित पाने त्वरित खुडून शेताबाहेर नष्ट करा.',
  'संध्याकाळी ट्रायकोडर्मा व्हिरिडी (५ ग्रॅम/लिटर) चा फवारा द्या.'
]).map((s) => `• ${s}`).join('\n')}

🌿 **कमी खर्चाचे जैविक व मशागतीचे उपाय (Low-Cost IPM):**
${(scan.biologicalOrIPMOptions || [
  '१०,००० ppm निंबोळी तेल (२.५ मिली/लिटर) स्टिकरसह फवारा.',
  'शेतात पिवळे/निळे चिकट सापळे लावा.'
]).map((b) => `• ${b}`).join('\n')}

💊 **शिफारस केलेली कृषी उत्पादने:**
${(scan.indicatedProducts || []).slice(0, 2).map((p) => `• **${p.name}** (~₹${p.approximatePriceINR}): ${p.safeUsage}`).join('\n') || '• ट्रायकोडर्मा बुरशीनाशक व निंबोळी अर्क वापरणे पुरेसे आहे.'}

💡 **शेतकरी बंधूंसाठी सूचना:** फवारणी करताना मास्क व हातमोजे वापरा. रोग २०% पेक्षा जास्त पसरल्यास स्थानिक कृषी अधिकाऱ्यांचा प्रत्यक्ष सल्ला घ्या.`;
  }

  if (lang === 'hi') {
    return `🔍 **आपकी हालिया स्कैन रिपोर्ट पर आधारित कृषि सलाह:**
🌱 **फसल:** ${crop}
⚠️ **पहचाना गया रोग:** ${disease} (गंभीरता: ${severity})

📋 **तत्काल उठाए जाने वाले कदम (Immediate Actions):**
${(scan.immediateSteps || [
  'संक्रमित पत्तियों को तोड़कर खेत से दूर नष्ट करें।',
  'ट्राइकोडर्मा विरिडी (5 ग्राम/लीटर) का छिड़काव करें।'
]).map((s) => `• ${s}`).join('\n')}

🌿 **जैविक व कम लागत वाले उपाय (Organic & IPM):**
${(scan.biologicalOrIPMOptions || [
  'नीम तेल 10,000 ppm (3 मिली/लीटर) का शाम को छिड़काव करें।',
  'खेत में स्टिकी ट्रैप लगाएं।'
]).map((b) => `• ${b}`).join('\n')}

💊 **अनुशंसित कृषि उत्पाद:**
${(scan.indicatedProducts || []).slice(0, 2).map((p) => `• **${p.name}** (~₹${p.approximatePriceINR}): ${p.safeUsage}`).join('\n') || '• ट्राइकोडर्मा और नीम आधारित उत्पाद प्रयोग करें।'}

💡 **सुरक्षा सलाह:** छिड़काव के समय मास्क पहनें तथा फल तुड़ाई से पूर्व निर्धारित दिनों का अंतर (PHI) रखें।`;
  }

  return `🔍 **Advisory Grounded in Your Recent Diagnostic Scan:**
🌱 **Crop:** ${crop}
⚠️ **Identified Issue:** ${disease} (Severity: ${severity})

📋 **Immediate Practical Steps:**
${(scan.immediateSteps || [
  'Prune off all affected lower leaves and dispose away from the field.',
  'Apply *Trichoderma viride* foliar drench during cool evening hours.'
]).map((s) => `• ${s}`).join('\n')}

🌿 **Low-Cost Biological / IPM Options:**
${(scan.biologicalOrIPMOptions || [
  'Spray cold-pressed Neem oil (10,000 ppm) @ 2.5 ml/L with surfactant.',
  'Erect yellow/blue sticky cards to prevent vector buildup.'
]).map((b) => `• ${b}`).join('\n')}

💊 **Indicated Agricultural Formulations:**
${(scan.indicatedProducts || []).slice(0, 2).map((p) => `• **${p.name}** (~₹${p.approximatePriceINR}): ${p.safeUsage}`).join('\n') || '• Trichoderma bio-fungicide and neem extract are indicated.'}

💡 **Safety Note:** Always wear protective gear during spraying. If spread exceeds 20%, consult your block Agriculture Officer.`;
}
