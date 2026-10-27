import { AssessmentQuestion } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Category A: Farmer and farm details — 4 questions
  {
    id: 1,
    category: 'A',
    categoryName: {
      en: 'Farmer & Farm Details',
      mr: 'शेतकरी व शेताचा तपशील',
      hi: 'किसान व खेत का विवरण',
    },
    question: {
      en: 'Which state and district is your farm located in?',
      mr: 'तुमची शेती कोणत्या राज्यात आणि जिल्ह्यात आहे?',
      hi: 'आपका खेत किस राज्य और जिले में स्थित है?',
    },
    type: 'select',
    required: true,
    options: [
      {
        value: 'MH-Pune',
        label: { en: 'Maharashtra — Pune / Haveli / Shirur', mr: 'महाराष्ट्र — पुणे / हवेली / शिरूर', hi: 'महाराष्ट्र — पुणे / हवेली / शिरूर' },
      },
      {
        value: 'MH-Nashik',
        label: { en: 'Maharashtra — Nashik / Niphad / Yeola', mr: 'महाराष्ट्र — नाशिक / निफाड / येवला', hi: 'महाराष्ट्र — नाशिक / निफाड / येवला' },
      },
      {
        value: 'MH-Satara',
        label: { en: 'Maharashtra — Satara / Karad / Phaltan', mr: 'महाराष्ट्र — सातारा / कराड / फलटण', hi: 'महाराष्ट्र — सातारा / कराड / फलटण' },
      },
      {
        value: 'MH-Nagpur',
        label: { en: 'Maharashtra — Nagpur / Wardha / Amravati', mr: 'महाराष्ट्र — नागपूर / वर्धा / अमरावती', hi: 'महाराष्ट्र — नागपूर / वर्धा / अमरावती' },
      },
      {
        value: 'MH-Solapur',
        label: { en: 'Maharashtra — Solapur / Pandharpur / Barshi', mr: 'महाराष्ट्र — सोलापूर / पंढरपूर / बार्शी', hi: 'महाराष्ट्र — सोलापूर / पंढरपूर / बार्शी' },
      },
      {
        value: 'MH-Ahmednagar',
        label: { en: 'Maharashtra — Ahmednagar / Rahuri / Shirdi', mr: 'महाराष्ट्र — अहमदनगर / राहुरी / शिर्डी', hi: 'महाराष्ट्र — अहमदनगर / राहुरी / शिर्डी' },
      },
      {
        value: 'GJ-Anand',
        label: { en: 'Gujarat — Anand / Vadodara / Rajkot', mr: 'गुजरात — आणंद / वडोदरा / राजकोट', hi: 'गुजरात — आणंद / वडोदरा / राजकोट' },
      },
      {
        value: 'MP-Indore',
        label: { en: 'Madhya Pradesh — Indore / Ujjain / Dhar', mr: 'मध्य प्रदेश — इंदूर / उज्जैन / धार', hi: 'मध्य प्रदेश — इंदौर / उज्जैन / धार' },
      },
      {
        value: 'KA-Belagavi',
        label: { en: 'Karnataka — Belagavi / Dharwad / Vijayapura', mr: 'कर्नाटक — बेळगाव / धारवाड / विजापूर', hi: 'कर्नाटक — बेलगावी / धारवाड़ / विजयपुरा' },
      },
      {
        value: 'Other-India',
        label: { en: 'Other State / District in India', mr: 'भारतातील इतर राज्य / जिल्हा', hi: 'भारत में अन्य राज्य / जिला' },
      },
    ],
  },
  {
    id: 2,
    category: 'A',
    categoryName: {
      en: 'Farmer & Farm Details',
      mr: 'शेतकरी व शेताचा तपशील',
      hi: 'किसान व खेत का विवरण',
    },
    question: {
      en: 'What is the size of your cultivated land?',
      mr: 'तुमच्या लागवडीखालील एकूण शेतजमिनीचे क्षेत्र किती आहे?',
      hi: 'आपकी कुल खेती योग्य भूमि का क्षेत्रफल कितना है?',
    },
    type: 'select',
    required: true,
    options: [
      {
        value: 'marginal',
        label: { en: 'Marginal: Less than 1 Acre (< 40 Gunthas)', mr: 'अत्यल्पभूधारक: १ एकरापेक्षा कमी (< ४० गुंठे)', hi: 'सीमांत: १ एकड़ से कम' },
      },
      {
        value: 'small',
        label: { en: 'Small: 1 to 2 Acres', mr: 'अल्पभूधारक: १ ते २ एकर', hi: 'लघु किसान: १ से २ एकड़' },
      },
      {
        value: 'semi_medium',
        label: { en: 'Semi-Medium: 2 to 5 Acres', mr: 'मध्यम: २ ते ५ एकर', hi: 'मध्यम: २ से ५ एकड़' },
      },
      {
        value: 'medium_large',
        label: { en: 'Large: More than 5 Acres', mr: 'मोठे क्षेत्र: ५ एकरांपेक्षा जास्त', hi: 'बड़े किसान: ५ एकड़ से अधिक' },
      },
    ],
  },
  {
    id: 3,
    category: 'A',
    categoryName: {
      en: 'Farmer & Farm Details',
      mr: 'शेतकरी व शेताचा तपशील',
      hi: 'किसान व खेत का विवरण',
    },
    question: {
      en: 'Which type of farming do you primarily practise?',
      mr: 'तुम्ही प्रामुख्याने कोणत्या प्रकारची शेती करता?',
      hi: 'आप मुख्य रूप से किस प्रकार की खेती करते हैं?',
    },
    type: 'select',
    required: true,
    options: [
      {
        value: 'conventional',
        label: { en: 'Conventional Farming (Synthetic fertilisers & sprays)', mr: 'पारंपारिक रासायनिक शेती (खते व कीटकनाशके)', hi: 'पारंपरिक रासायनिक खेती (उर्वरक व रसायन)' },
      },
      {
        value: 'ipm_mixed',
        label: { en: 'Integrated / Mixed (Chemical + Organic / Bio-inputs)', mr: 'एकात्मिक शेती (रासायनिक + सेंद्रिय निविष्ठा)', hi: 'एकीकृत खेती (रासायनिक + जैविक)' },
      },
      {
        value: 'organic_natural',
        label: { en: 'Organic / Natural Farming (Cow-dung, Bio-fertilisers)', mr: 'सेंद्रिय / नैसर्गिक शेती (गोमूत्र, शेणखत, जिवाणू)', hi: 'जैविक / प्राकृतिक खेती (गोमूत्र, केंचुआ खाद)' },
      },
      {
        value: 'rainfed_subsistence',
        label: { en: 'Rainfed / Low-input Subsistence', mr: 'कोरडवाहू / कमी खर्चाची जिरायती शेती', hi: 'बारानी / कम लागत वाली खेती' },
      },
    ],
  },
  {
    id: 4,
    category: 'A',
    categoryName: {
      en: 'Farmer & Farm Details',
      mr: 'शेतकरी व शेताचा तपशील',
      hi: 'किसान व खेत का विवरण',
    },
    question: {
      en: 'What is your preferred language?',
      mr: 'तुमची पसंतीची भाषा कोणती आहे?',
      hi: 'आपकी पसंदीदा भाषा कौन सी है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'mr', label: { en: 'मराठी (Marathi)', mr: 'मराठी (Marathi)', hi: 'मराठी (Marathi)' } },
      { value: 'hi', label: { en: 'हिन्दी (Hindi)', mr: 'हिन्दी (Hindi)', hi: 'हिन्दी (Hindi)' } },
      { value: 'en', label: { en: 'English', mr: 'English', hi: 'English' } },
    ],
  },

  // Category B: Crop details — 5 questions
  {
    id: 5,
    category: 'B',
    categoryName: {
      en: 'Crop Details',
      mr: 'पिकाचा तपशील',
      hi: 'फसल का विवरण',
    },
    question: {
      en: 'Which crop are you growing?',
      mr: 'तुम्ही सध्या कोणते पीक घेत आहात?',
      hi: 'आप वर्तमान में कौन सी फसल उगा रहे हैं?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'Tomato', label: { en: 'Tomato (टोमॅटो)', mr: 'टोमॅटो (Tomato)', hi: 'टमाटर (Tomato)' } },
      { value: 'Rice', label: { en: 'Rice / Paddy (भात / धान)', mr: 'भात (Paddy / Rice)', hi: 'धान / चावल (Paddy / Rice)' } },
      { value: 'Onion', label: { en: 'Onion (कांदा)', mr: 'कांदा (Onion)', hi: 'प्याज (Onion)' } },
      { value: 'Cotton', label: { en: 'Cotton (कापूस)', mr: 'कापूस (Cotton)', hi: 'कपास (Cotton)' } },
      { value: 'Chilli', label: { en: 'Chilli (मिरची)', mr: 'मिरची (Chilli)', hi: 'मिर्च (Chilli)' } },
      { value: 'Wheat', label: { en: 'Wheat (गहू)', mr: 'गहू (Wheat)', hi: 'गेहूं (Wheat)' } },
      { value: 'Soybean', label: { en: 'Soybean (सोयाबीन)', mr: 'सोयाबीन (Soybean)', hi: 'सोयाबीन (Soybean)' } },
    ],
  },
  {
    id: 6,
    category: 'B',
    categoryName: {
      en: 'Crop Details',
      mr: 'पिकाचा तपशील',
      hi: 'फसल का विवरण',
    },
    question: {
      en: 'Which variety of the crop are you growing, if known?',
      mr: 'तुम्ही पिकाची कोणती जात / वाण लावले आहे?',
      hi: 'आप फसल की कौन सी किस्म / वैरायटी उगा रहे हैं?',
    },
    type: 'select',
    required: false,
    options: [
      { value: 'hybrid_commercial', label: { en: 'Hybrid Commercial (Abhinav, US 440, Bhima Super, RCH-2)', mr: 'हायब्रिड व्यावसायिक वाण (अभिनव, युएस ४४०, भीमा सुपर)', hi: 'हाइब्रिड व्यावसायिक किस्म (अभिनव, भीमा सुपर, आदि)' } },
      { value: 'desi_indigenous', label: { en: 'Traditional / Desi / Indigenous Variety', mr: 'पारंपारिक देशी वाण / स्थानिक बियाणे', hi: 'पारंपरिक / देशी स्थानीय बीज' } },
      { value: 'university_released', label: { en: 'Agriculture University / ICAR Released Variety', mr: 'कृषी विद्यापीठ / ICAR शिफारसीत वाण', hi: 'कृषि विश्वविद्यालय / ICAR अनुशंसित किस्म' } },
      { value: 'not_sure', label: { en: "I don't know / Not sure of exact variety", mr: 'मला वाणाचे नाव नक्की माहित नाही', hi: 'मुझे सटीक किस्म का नाम पता नहीं' } },
    ],
  },
  {
    id: 7,
    category: 'B',
    categoryName: {
      en: 'Crop Details',
      mr: 'पिकाचा तपशील',
      hi: 'फसल का विवरण',
    },
    question: {
      en: 'At what growth stage is your crop?',
      mr: 'तुमचे पीक सध्या कोणत्या वाढीच्या अवस्थेत आहे?',
      hi: 'आपकी फसल वर्तमान में किस विकास अवस्था में है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'seedling_nursery', label: { en: 'Seedling / Nursery (0-20 Days)', mr: 'रोपवाटिका / रोप अवस्था (०-२० दिवस)', hi: 'अंकुरण / नर्सरी अवस्था (०-२० दिन)' } },
      { value: 'vegetative', label: { en: 'Vegetative Growth / Tillering (20-45 Days)', mr: 'शाकीय वाढीची अवस्था (२०-४५ दिवस)', hi: 'वानस्पतिक वृद्धि अवस्था (२०-४५ दिन)' } },
      { value: 'flowering', label: { en: 'Flowering & Budding Stage (45-65 Days)', mr: 'फुलधारणा अवस्था (४५-६५ दिवस)', hi: 'फूल आने की अवस्था (४५-६५ दिन)' } },
      { value: 'fruiting_grain', label: { en: 'Fruit Formation / Grain Filling (65-90 Days)', mr: 'फळधारणा / दाणे भरण्याची अवस्था (६५-९० दिवस)', hi: 'फल विकास / दाना भरने की अवस्था' } },
      { value: 'maturity_harvest', label: { en: 'Maturity / Near Harvest (> 90 Days)', mr: 'पक्वता / काढणीची वेळ (> ९० दिवस)', hi: 'परिपक्वता / कटाई की स्थिति' } },
    ],
  },
  {
    id: 8,
    category: 'B',
    categoryName: {
      en: 'Crop Details',
      mr: 'पिकाचा तपशील',
      hi: 'फसल का विवरण',
    },
    question: {
      en: 'When did you sow or transplant the crop?',
      mr: 'तुम्ही पिकाची पेरणी किंवा पुनर्लागवड कधी केली?',
      hi: 'आपने फसल की बुवाई या रोपाई कब की थी?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'recent_2weeks', label: { en: 'Recent: Within the past 15 days', mr: 'नुकतीच: मागील १५ दिवसांत', hi: 'हाल ही में: पिछले १५ दिनों में' } },
      { value: '1month_ago', label: { en: 'About 1 month ago (15-35 days)', mr: 'सुमारे १ महिन्यापूर्वी (१५ ते ३५ दिवस)', hi: 'लगभग १ महीने पहले (१५ से ३५ दिन)' } },
      { value: '2months_ago', label: { en: 'About 2 months ago (35-65 days)', mr: 'सुमारे २ महिन्यांपूर्वी (३५ ते ६५ दिवस)', hi: 'लगभग २ महीने पहले (३५ से ६५ दिन)' } },
      { value: 'more_than_2months', label: { en: 'More than 2 months ago (> 65 days)', mr: '२ महिन्यांपेक्षा जास्त कालावधी झाला', hi: '२ महीने से अधिक समय हो गया' } },
    ],
  },
  {
    id: 9,
    category: 'B',
    categoryName: {
      en: 'Crop Details',
      mr: 'पिकाचा तपशील',
      hi: 'फसल का विवरण',
    },
    question: {
      en: 'What is the approximate area cultivated with this specific crop?',
      mr: 'या विशिष्ट पिकाची लागवड अंदाजे किती क्षेत्रावर केली आहे?',
      hi: 'इस विशिष्ट फसल की खेती लगभग कितने क्षेत्र में की गई है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: '0.5_acre', label: { en: 'Half Acre (20 Gunthas / 0.2 Hectare)', mr: 'अर्धा एकर (२० गुंठे)', hi: 'आधा एकड़ (२० गुंठा)' } },
      { value: '1_acre', label: { en: '1 Acre (40 Gunthas / 0.4 Hectare)', mr: '१ एकर (४० गुंठे)', hi: '१ एकड़' } },
      { value: '2_acres', label: { en: '2 Acres', mr: '२ एकर', hi: '२ एकड़' } },
      { value: '3_to_5_acres', label: { en: '3 to 5 Acres', mr: '३ ते ५ एकर', hi: '३ से ५ एकड़' } },
      { value: 'more_5_acres', label: { en: 'More than 5 Acres', mr: '५ एकरांपेक्षा जास्त', hi: '५ एकड़ से अधिक' } },
    ],
  },

  // Category C: Soil and irrigation — 5 questions
  {
    id: 10,
    category: 'C',
    categoryName: {
      en: 'Soil & Irrigation',
      mr: 'माती व सिंचन',
      hi: 'मिट्टी और सिंचाई',
    },
    question: {
      en: 'What type of soil is present in your field?',
      mr: 'तुमच्या शेतात कोणत्या प्रकारची माती आहे?',
      hi: 'आपके खेत में किस प्रकार की मिट्टी है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'black_cotton', label: { en: 'Deep Black Cotton Soil (काळी कसदार माती - Heavy clay)', mr: 'काळी कसदार / रेगूर माती (पाणी धरून ठेवणारी)', hi: 'काली कपास मिट्टी (पानी रोकने वाली भारी मिट्टी)' } },
      { value: 'red_loamy', label: { en: 'Red Loamy Soil (तांबडी पोयटा माती)', mr: 'तांबडी / पोयटा माती (मध्यम निचरा)', hi: 'लाल दोमट मिट्टी (मध्यम जल निकास)' } },
      { value: 'alluvial', label: { en: 'Alluvial / Riverbed Soil (गाळाची सुपीक माती)', mr: 'गाळाची सुपीक माती (नदीकाठची जमीन)', hi: 'जलोढ़ / कछारी उपजाऊ मिट्टी' } },
      { value: 'sandy_loam', label: { en: 'Sandy Loam (हलकी वाळूमिश्रित / मुरमाड माती)', mr: 'हलकी मुरमाड / वालुकामय माती', hi: 'बलुई दोमट / हल्की कंकड़ वाली मिट्टी' } },
      { value: 'not_sure', label: { en: "I don't know / Mixed soil", mr: 'मला नक्की माहित नाही / मिश्र माती', hi: 'मुझे पक्का पता नहीं / मिश्रित मिट्टी' } },
    ],
  },
  {
    id: 11,
    category: 'C',
    categoryName: {
      en: 'Soil & Irrigation',
      mr: 'माती व सिंचन',
      hi: 'मिट्टी और सिंचाई',
    },
    question: {
      en: 'Do you know the soil pH or have a soil-test report?',
      mr: 'तुम्हाला तुमच्या मातीचा सामू (pH) माहित आहे किंवा माती परीक्षण केले आहे का?',
      hi: 'क्या आपको अपनी मिट्टी का pH पता है अथवा मृदा परीक्षण कराया है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'neutral', label: { en: 'Neutral (Optimal pH 6.5 to 7.5)', mr: 'योग्य सामू (उदासीन pH ६.५ ते ७.५)', hi: 'तटस्थ / उत्तम (pH ६.५ से ७.५)' } },
      { value: 'alkaline_saline', label: { en: 'Alkaline / Saline (High pH > 7.5, White salt crust)', mr: 'चोपण / क्षारपड माती (pH ७.५ पेक्षा जास्त, पांढरा क्षार)', hi: 'क्षारीय / लवणीय (pH ७.५ से अधिक, सफेद पपड़ी)' } },
      { value: 'acidic', label: { en: 'Acidic (Low pH < 6.5)', mr: 'आम्लयुक्त माती (pH ६.५ पेक्षा कमी)', hi: 'अम्लीय मिट्टी (pH ६.५ से कम)' } },
      { value: 'no_test', label: { en: 'No Soil Test Done / I do not know', mr: 'माती परीक्षण केलेले नाही / माहिती नाही', hi: 'मृदा परीक्षण नहीं कराया / जानकारी नहीं' } },
    ],
  },
  {
    id: 12,
    category: 'C',
    categoryName: {
      en: 'Soil & Irrigation',
      mr: 'माती व सिंचन',
      hi: 'मिट्टी और सिंचाई',
    },
    question: {
      en: 'Which irrigation method do you use?',
      mr: 'तुम्ही सिंचनाची कोणती पद्धत वापरता?',
      hi: 'आप सिंचाई की कौन सी विधि का उपयोग करते हैं?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'drip', label: { en: 'Drip Irrigation (ठिबक सिंचन - Water efficient)', mr: 'ठिबक सिंचन (Drip)', hi: 'टपक / ड्रिप सिंचाई' } },
      { value: 'sprinkler', label: { en: 'Sprinkler System (तुषार सिंचन)', mr: 'तुषार सिंचन (Sprinkler)', hi: 'फव्वारा / स्प्रिंकलर सिंचाई' } },
      { value: 'flood_furrow', label: { en: 'Furrow / Flood Irrigation (पाटपाणी / मोकाट सिंचन)', mr: 'पाटपाणी / सरी-वरंबा सिंचन', hi: 'नाली / खुला पानी (फ्लड इरीगेशन)' } },
      { value: 'rainfed_only', label: { en: 'Rainfed Only (केवळ पावसाचे पाणी - No irrigation source)', mr: 'केवळ पावसाच्या पाण्यावर (जिरायती)', hi: 'केवल वर्षा पर निर्भर (बारानी)' } },
    ],
  },
  {
    id: 13,
    category: 'C',
    categoryName: {
      en: 'Soil & Irrigation',
      mr: 'माती व सिंचन',
      hi: 'मिट्टी और सिंचाई',
    },
    question: {
      en: 'How frequently do you irrigate?',
      mr: 'तुम्ही पिकाला किती दिवसांनी पाणी देता?',
      hi: 'आप फसल को कितने अंतराल पर पानी देते हैं?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'daily_alternate', label: { en: 'Daily or Alternate Days (1-2 Hours drip)', mr: 'रोज किंवा एक दिवसाआड (ठिबकद्वारे)', hi: 'प्रतिदिन या एक दिन छोड़कर' } },
      { value: 'weekly', label: { en: 'Once in 5 to 7 Days (आठवड्यातून एकदा)', mr: 'आठवड्यातून एकदा (५ ते ७ दिवसांनी)', hi: 'सप्ताह में एक बार (५ से ७ दिन)' } },
      { value: 'fortnightly', label: { en: 'Once in 10 to 15 Days (१०-१५ दिवसांनी)', mr: '१० ते १५ दिवसांनी एकदा', hi: '१० से १५ दिनों में एक बार' } },
      { value: 'rainfall_dependent', label: { en: 'Dependent solely on monsoon rains', mr: 'पावसावर अवलंबून (गरज भासेल तेव्हा)', hi: 'वर्षा और नमी की उपलब्धता अनुसार' } },
    ],
  },
  {
    id: 14,
    category: 'C',
    categoryName: {
      en: 'Soil & Irrigation',
      mr: 'माती व सिंचन',
      hi: 'मिट्टी और सिंचाई',
    },
    question: {
      en: 'Have you noticed waterlogging, unusually dry soil, or drainage problems?',
      mr: 'शेतात पाणी साचणे, पाण्याचा निचरा न होणे किंवा जमीन कोरडी पडण्याची समस्या आहे का?',
      hi: 'क्या खेत में पानी ठहरने (जलभराव), जल निकासी की समस्या या अत्यधिक सूखा देखा गया है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'none_good_drainage', label: { en: 'No problems — Good aeration & normal drainage', mr: 'कोणतीही समस्या नाही — चांगला निचरा व वाफसा', hi: 'कोई समस्या नहीं — जल निकास सामान्य और अच्छा है' } },
      { value: 'waterlogging', label: { en: 'Water stagnation / Poor drainage after rain or watering', mr: 'पाणी साचून राहते / पाण्याचा निचरा नीट होत नाही', hi: 'पानी ठहर जाता है / भारी बारिश में जलभराव' } },
      { value: 'excessive_dryness', label: { en: 'Rapid moisture loss / Hard crusting & crack formation', mr: 'जमीन लवकर सुकते / भेगा पडतात व कडक होते', hi: 'मिट्टी जल्दी सूख जाती है / पपड़ी और दरारें पड़ती हैं' } },
      { value: 'not_sure', label: { en: 'Not sure / Varies across different parts of field', mr: 'नक्की सांगता येत नाही / शेताच्या काही भागातच अडचण', hi: 'निश्चित नहीं / खेत के कुछ हिस्सों में' } },
    ],
  },

  // Category D: Crop symptoms and disease history — 6 questions
  {
    id: 15,
    category: 'D',
    categoryName: {
      en: 'Symptoms & History',
      mr: 'पिकाची लक्षणे व इतिहास',
      hi: 'फसल लक्षण व इतिहास',
    },
    question: {
      en: 'Have you noticed any unusual symptoms in the crop?',
      mr: 'तुम्हाला पिकावर काही असामान्य लक्षणे किंवा आजाराची लक्षणे दिसत आहेत का?',
      hi: 'क्या आपको फसल में कोई असामान्य लक्षण या बीमारी के संकेत दिखाई दे रहे हैं?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'yes_active', label: { en: 'Yes, clear symptoms are actively visible', mr: 'होय, झाडांवर स्पष्ट लक्षणे दिसत आहेत', hi: 'हाँ, स्पष्ट लक्षण दिखाई दे रहे हैं' } },
      { value: 'mild_early', label: { en: 'Mild / Early suspicion on a few isolated plants', mr: 'थोडीशी शंका आहे / काही रोपांवर सुरुवातीची लक्षणे आहेत', hi: 'हल्का संदेह / कुछ ही पौधों पर शुरुआती लक्षण' } },
      { value: 'no_preventive', label: { en: 'No, crop looks healthy — Need preventive guidance', mr: 'नाही, पीक निरोगी आहे — मला प्रतिबंधात्मक काळजी हवी आहे', hi: 'नहीं, फसल स्वस्थ है — मुझे केवल रोकथाम की सलाह चाहिए' } },
    ],
  },
  {
    id: 16,
    category: 'D',
    categoryName: {
      en: 'Symptoms & History',
      mr: 'पिकाची लक्षणे व इतिहास',
      hi: 'फसल लक्षण व इतिहास',
    },
    question: {
      en: 'Which symptoms are visible?',
      mr: 'कोणती लक्षणे प्रामुख्याने दिसत आहेत?',
      hi: 'कौन से लक्षण मुख्य रूप से दिखाई दे रहे हैं?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'spots_lesions', label: { en: 'Brown / black circular spots or lesions on leaves', mr: 'पानांवर तपकिरी / काळे गोलाकार डाग किंवा करपा', hi: 'पत्तियों पर भूरे या काले धब्बे / झुलसा' } },
      { value: 'yellowing_chlorosis', label: { en: 'Yellowing of leaves (chlorosis / pale veins)', mr: 'पाने पिवळी पडणे / शिरांमधील हिरवा रंग जाणे', hi: 'पत्तियों का पीला पड़ना / क्लोरोसिस' } },
      { value: 'leaf_curling', label: { en: 'Leaf curling, cupping, or wrinkling (आकसणे / चुरडा-मुरडा)', mr: 'पाने आकसणे, चुरमुरणे (चुरडा-मुरडा रोग)', hi: 'पत्तियों का मुड़ना या सिकुड़ना (मरोड़िया रोग)' } },
      { value: 'wilting_drying', label: { en: 'Sudden wilting or drooping despite moist soil', mr: 'जमिनीत ओलावा असतानाही झाड कोमेजणे / सुकणे', hi: 'नमी होने के बावजूद पौधे का मुरझाना / सूखना' } },
      { value: 'rotting_canker', label: { en: 'Fruit rotting, stem canker, or collar decay', mr: 'फळ सडणे, खोडावर जखमा किंवा मान कुजणे', hi: 'फल सड़न, तने पर सड़न या कॉलर रॉट' } },
      { value: 'none_healthy', label: { en: 'None — Normal healthy green foliage', mr: 'काहीही नाही — झाड निरोगी आहे', hi: 'कोई नहीं — सामान्य स्वस्थ पत्तियां' } },
    ],
  },
  {
    id: 17,
    category: 'D',
    categoryName: {
      en: 'Symptoms & History',
      mr: 'पिकाची लक्षणे व इतिहास',
      hi: 'फसल लक्षण व इतिहास',
    },
    question: {
      en: 'Which part of the plant is affected?',
      mr: 'झाडाचा कोणता भाग बाधित झाला आहे?',
      hi: 'पौधे का कौन सा भाग प्रभावित हुआ है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'lower_older_leaves', label: { en: 'Lower / Older bottom leaves first', mr: 'खालची जुनी पाने (तळाकडील भाग आधी बाधित)', hi: 'निचली / पुरानी पत्तियां पहले' } },
      { value: 'upper_new_shoots', label: { en: 'Upper new tender leaves and growing tips', mr: 'वरची नवीन कोवळी पाने आणि शेंडा', hi: 'ऊपरी नई कोमल पत्तियां और शीर्ष' } },
      { value: 'stem_branches', label: { en: 'Stem, main collar, or branches', mr: 'मुख्य खोड, जमिनीलगतचा भाग किंवा फांद्या', hi: 'तना, शाखाएं या मुख्य तना' } },
      { value: 'fruit_flowers', label: { en: 'Flowers, fruit, pods, or grain earheads', mr: 'फुले, फळे, शेंगा किंवा कणसे', hi: 'फूल, फल, फलियां या बालियां' } },
      { value: 'roots_collar', label: { en: 'Root zone / below-ground collar', mr: 'मुळे / जमिनीलगतचा मूळ भाग', hi: 'जड़ क्षेत्र / भूमिगत भाग' } },
      { value: 'whole_plant', label: { en: 'Entire plant appears collapsed or stunted', mr: 'संपूर्ण रोपच खुंटलेले किंवा वाळलेले दिसते', hi: 'पूरा पौधा रुका हुआ या सूखा हुआ' } },
      { value: 'not_applicable', label: { en: 'Not applicable (No visible infection)', mr: 'लागू नाही (कोणतीही लक्षणे नाहीत)', hi: 'लागू नहीं (स्वस्थ फसल)' } },
    ],
  },
  {
    id: 18,
    category: 'D',
    categoryName: {
      en: 'Symptoms & History',
      mr: 'पिकाची लक्षणे व इतिहास',
      hi: 'फसल लक्षण व इतिहास',
    },
    question: {
      en: 'What percentage of the crop appears affected?',
      mr: 'अंदाजे किती टक्के पीक बाधित झालेले दिसते?',
      hi: 'अनुमानतः कितने प्रतिशत फसल प्रभावित प्रतीत होती है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'isolated_under5', label: { en: 'Very Low: Under 5% (Just a few scattered plants)', mr: 'अतिशय कमी: ५% पेक्षा कमी (काही तुरळक झाडे)', hi: 'बहुत कम: ५% से कम (कुछ ही छिटपुट पौधे)' } },
      { value: 'mild_5_to_15', label: { en: 'Mild: 5% to 15% of the plot', mr: 'कमी: ५ ते १५% क्षेत्रात लक्षणे आहेत', hi: 'हल्का: ५% से १५% तक' } },
      { value: 'moderate_15_to_30', label: { en: 'Moderate: 15% to 30% of the plants affected', mr: 'मध्यम: १५ ते ३०% झाडे बाधित झाली आहेत', hi: 'मध्यम: १५% से ३०% पौधे' } },
      { value: 'severe_over30', label: { en: 'High / Severe: More than 30% of the entire field', mr: 'गंभीर: ३०% पेक्षा जास्त शेत बाधित झाले आहे', hi: 'गंभीर: ३०% से अधिक खेत प्रभावित' } },
      { value: 'zero_healthy', label: { en: '0% (Completely healthy)', mr: '०% (पूर्णपणे निरोगी)', hi: '०% (पूरी तरह स्वस्थ)' } },
    ],
  },
  {
    id: 19,
    category: 'D',
    categoryName: {
      en: 'Symptoms & History',
      mr: 'पिकाची लक्षणे व इतिहास',
      hi: 'फसल लक्षण व इतिहास',
    },
    question: {
      en: 'When did the symptoms first appear?',
      mr: 'ही लक्षणे सर्वात आधी कधी दिसून आली?',
      hi: 'ये लक्षण सबसे पहले कब दिखाई दिए थे?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'recent_2_3days', label: { en: 'Just 2 to 3 days ago (Sudden outbreak)', mr: 'अगदी २ ते ३ दिवसांपूर्वीच (अचानक प्रादुर्भाव)', hi: 'अभी २ से ३ दिन पहले (अचानक फैलाव)' } },
      { value: '1_to_2weeks', label: { en: 'About 1 to 2 weeks ago', mr: 'सुमारे १ ते २ आठवड्यांपूर्वी', hi: 'लगभग १ से २ सप्ताह पहले' } },
      { value: 'over_month', label: { en: 'More than a month ago / Slow chronic problem', mr: '१ महिन्यापेक्षा जास्त कालावधीपासून हळूहळू वाढतेय', hi: 'एक महीने से अधिक समय से' } },
      { value: 'not_applicable', label: { en: 'Not applicable (No disease observed)', mr: 'लागू नाही (रोग नाही)', hi: 'लागू नहीं (रोग नहीं)' } },
    ],
  },
  {
    id: 20,
    category: 'D',
    categoryName: {
      en: 'Symptoms & History',
      mr: 'पिकाची लक्षणे व इतिहास',
      hi: 'फसल लक्षण व इतिहास',
    },
    question: {
      en: 'Have you observed similar problems in previous seasons?',
      mr: 'मागील हंगामात किंवा वर्षात याच शेतात अशीच समस्या आली होती का?',
      hi: 'क्या पिछले मौसम या वर्ष में इसी खेत में ऐसी समस्या आई थी?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'every_season', label: { en: 'Yes, occurs repeatedly in this field almost every season', mr: 'होय, याच शेतात जवळजवळ प्रत्येक हंगामात ही अडचण येते', hi: 'हाँ, लगभग हर मौसम में इसी खेत में यह समस्या आती है' } },
      { value: 'occasional', label: { en: 'Occurred once or twice in the past', mr: 'भूतकाळात १-२ वेळा असा प्रकार घडला होता', hi: 'अतीत में एक या दो बार देखा गया था' } },
      { value: 'first_time', label: { en: 'First time seeing this problem here', mr: 'पहिल्यांदाच असा प्रकार पाहत आहे', hi: 'पहली बार यह समस्या देख रहे हैं' } },
      { value: 'new_field', label: { en: 'New field / Leased land — Not sure of previous history', mr: 'नवीन शेत / भाडेपट्टा जमीन — इतिहास माहित नाही', hi: 'नया खेत — पिछला इतिहास ज्ञात नहीं' } },
    ],
  },

  // Category E: Crop management — 4 questions
  {
    id: 21,
    category: 'E',
    categoryName: {
      en: 'Crop Management',
      mr: 'पीक व्यवस्थापन व फवारणी',
      hi: 'फसल प्रबंधन व छिड़काव',
    },
    question: {
      en: 'Which fertilisers have you used recently?',
      mr: 'तुम्ही अलीकडे कोणती खते शेतात वापरली आहेत?',
      hi: 'आपने हाल ही में खेत में कौन से उर्वरक उपयोग किए हैं?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'chemical_npk_urea', label: { en: 'Chemical NPK / Urea / DAP broadcasted', mr: 'रासायनिक खते: युरिया / डीएपी / १०:२६:२६ / १२:३२:१६', hi: 'रासायनिक: यूरिया / डीएपी / १०:२६:२६' } },
      { value: 'organic_fym_vermi', label: { en: 'Farmyard Manure (शेणखत) / Vermicompost', mr: 'शेणखत / गांडूळ खत / लेंडी खत', hi: 'गोबर की सड़ी खाद / केंचुआ खाद' } },
      { value: 'bio_fertigation', label: { en: 'Water Soluble Fertigation (19:19:19 / 0:52:34) via drip', mr: 'ठिबकद्वारे विद्राव्य खते (१९:१९:१९ / १२:६१:०)', hi: 'ड्रिप द्वारा घुलनशील खाद (१९:१९:१९ आदि)' } },
      { value: 'none_recent', label: { en: 'No fertilisers applied in the last 3-4 weeks', mr: 'मागील ३-४ आठवड्यांत कोणतेही खत दिलेले नाही', hi: 'पिछले ३-४ हफ्तों में कोई खाद नहीं दी' } },
    ],
  },
  {
    id: 22,
    category: 'E',
    categoryName: {
      en: 'Crop Management',
      mr: 'पीक व्यवस्थापन व फवारणी',
      hi: 'फसल प्रबंधन व छिड़काव',
    },
    question: {
      en: 'Have you used any pesticides, fungicides, or biological treatments recently?',
      mr: 'तुम्ही अलीकडे कोणती कीटकनाशके, बुरशीनाशके किंवा जैविक फवारणी केली आहे का?',
      hi: 'क्या आपने हाल ही में कोई कीटनाशक, फफूंदनाशक या जैविक उपचार किया है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'chemical_fungicide', label: { en: 'Chemical Fungicide / Insecticide sprayed recently', mr: 'रासायनिक बुरशीनाशक / कीटकनाशक फवारले आहे', hi: 'रासायनिक फफूंदनाशक या कीटनाशक छिड़का गया है' } },
      { value: 'neem_biocontrol', label: { en: 'Neem oil / Trichoderma / Pseudomonas bio-treatment', mr: 'निंबोळी अर्क / ट्रायकोडर्मा / सुडोमोनास जैविक उपाय', hi: 'नीम तेल / ट्राइकोडर्मा / जैविक उपचार किया गया' } },
      { value: 'home_concoction', label: { en: 'Traditional preparation (Dashaparni ark, buttermilk spray)', mr: 'दशपर्णी अर्क / आंबट ताकाची फवारणी / जीवामृत', hi: 'दशपर्णी काढ़ा / छाछ का छिड़काव / जीवामृत' } },
      { value: 'none_yet', label: { en: 'None yet — Have not sprayed anything', mr: 'अद्याप काहीही फवारलेले नाही', hi: 'अभी तक कोई छिड़काव नहीं किया गया' } },
    ],
  },
  {
    id: 23,
    category: 'E',
    categoryName: {
      en: 'Crop Management',
      mr: 'पीक व्यवस्थापन व फवारणी',
      hi: 'फसल प्रबंधन व छिड़काव',
    },
    question: {
      en: 'Have you noticed insects, weeds, or other pest-related problems?',
      mr: 'शेतात किडींचा, तणांचा किंवा इतर किटकांचा उपद्रव दिसून येत आहे का?',
      hi: 'क्या खेत में कीट, खरपतवार या अन्य कीड़ों का प्रकोप देखा गया है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'sucking_pests', label: { en: 'Sucking Pests: Thrips, Aphids, Whiteflies, or Jassids (मावा, तुडतुडे, फुलकिडे)', mr: 'रसशोषक किडी: मावा, तुडतुडे, पांढरी माशी किंवा फुलकिडे (थ्रिप्स)', hi: 'रस चूसक कीट: थ्रिप्स, माहू, सफेद मक्खी या जैसिड्स' } },
      { value: 'caterpillars_borers', label: { en: 'Chewing Pests: Fruit borers, bollworms, or leaf eating caterpillars', mr: 'अळ्या: फळपोखरणाऱ्या अळ्या / बोंडअळी / पाने खाणाऱ्या अळ्या', hi: 'इल्ली / सुंडी: फल छेदक, तना छेदक या पत्ती खाने वाली सुंडी' } },
      { value: 'heavy_weeds', label: { en: 'Heavy weed infestation competing for nutrients', mr: 'तणांचा अति उपद्रव (खत व पाण्यासाठी स्पर्धा)', hi: 'अत्यधिक खरपतवार की समस्या' } },
      { value: 'no_pest_issues', label: { en: 'No significant insect or weed pressure', mr: 'किडींचा किंवा तणांचा कोणताही मोठा उपद्रव नाही', hi: 'कीट या खरपतवार का कोई गंभीर प्रभाव नहीं' } },
    ],
  },
  {
    id: 24,
    category: 'E',
    categoryName: {
      en: 'Crop Management',
      mr: 'पीक व्यवस्थापन व फवारणी',
      hi: 'फसल प्रबंधन व छिड़काव',
    },
    question: {
      en: 'What crop rotation or previous crop did you use in this field?',
      mr: 'या शेतात याआधी कोणते पीक घेतले होते (पीक फेरपालट)?',
      hi: 'इस खेत में आपने पहले कौन सी फसल ली थी (फसल चक्र)?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'legume_pulses', label: { en: 'Legumes / Pulses (Gram, Soybean, Moong, Urad — Soil enriching)', mr: 'कडधान्ये / डाळवर्गीय पिके (हरभरा, मूग, उडीद, सोयाबीन)', hi: 'दलहनी फसलें (चना, मूंग, उड़द, सोयाबीन)' } },
      { value: 'cereals_grasses', label: { en: 'Cereal / Fodder (Wheat, Maize, Bajra, Jowar)', mr: 'तृणधान्ये / वैरण पिके (गहू, मका, बाजरी, ज्वारी)', hi: 'अनाज / चारा (गेहूं, मक्का, बाजरा, ज्वार)' } },
      { value: 'continuous_same', label: { en: 'Same crop repeated continuously for 2+ seasons', mr: 'तेच पीक सलग २ किंवा अधिक हंगामात घेतले', hi: 'लगातार वही फसल पिछले २ मौसमों से ले रहे हैं' } },
      { value: 'fallow_rested', label: { en: 'Land was kept fallow / green manuring (ताग / धैंचा)', mr: 'जमीन मोकळी ठेवली होती / हिरवळीचे खत (ताग, धैंचा)', hi: 'खेत खाली छोड़ा था / हरी खाद (ढैंचा, सनई)' } },
    ],
  },

  // Category F: Budget and treatment preferences — 4 questions
  {
    id: 25,
    category: 'F',
    categoryName: {
      en: 'Budget & Preferences',
      mr: 'बजेट व उपायांची पसंती',
      hi: 'बजट और प्राथमिकताएं',
    },
    question: {
      en: 'What is your approximate budget for crop treatment per acre?',
      mr: 'प्रति एकर उपचारासाठी तुमचे अंदाजे बजेट किती आहे?',
      hi: 'प्रति एकड़ फसल उपचार के लिए आपका अनुमानित बजट कितना है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'minimal_under500', label: { en: 'Ultra Low-Cost: Less than ₹500 per acre (Essential basics)', mr: 'अतिशय कमी खर्च: ₹५०० प्रति एकरापेक्षा कमी', hi: 'अत्यंत कम लागत: ₹५०० प्रति एकड़ से कम' } },
      { value: 'moderate_500_1500', label: { en: 'Balanced: ₹500 to ₹1,500 per acre (Recommended value)', mr: 'मध्यम / संतुलित: ₹५०० ते ₹१,५०० प्रति एकर', hi: 'संतुलित: ₹५०० से ₹१,५०० प्रति एकड़' } },
      { value: 'flexible_1500_3000', label: { en: 'Flexible: ₹1,500 to ₹3,000 per acre (Comprehensive care)', mr: 'लवचिक बजेट: ₹१,५०० ते ₹३,००० प्रति एकर', hi: 'लचीला: ₹१,५०० से ₹३,००० प्रति एकड़' } },
      { value: 'zero_home_inputs', label: { en: 'Zero Cash Expense: Prefer only on-farm homemade concoctions', mr: 'शून्य रोकड खर्च: केवळ घरच्या घरी तयार होणारे उपाय हवेत', hi: 'शून्य नकद खर्च: केवल खेत में बनने वाले घरेलू उपाय' } },
    ],
  },
  {
    id: 26,
    category: 'F',
    categoryName: {
      en: 'Budget & Preferences',
      mr: 'बजेट व उपायांची पसंती',
      hi: 'बजट और प्राथमिकताएं',
    },
    question: {
      en: 'Would you prefer biological, conventional, or integrated pest management options?',
      mr: 'तुम्हाला जैविक, रासायनिक की एकात्मिक (IPM) उपाय हवे आहेत?',
      hi: 'आप जैविक, पारंपरिक रासायनिक या एकीकृत (IPM) विकल्पों में से क्या पसंद करेंगे?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'ipm_balanced', label: { en: 'Integrated Pest Management (IPM: Non-chemical first, safe sprays if necessary)', mr: 'एकात्मिक कीड व्यवस्थापन (IPM: आधी जैविक उपाय, गरज पडल्यास सुरक्षित फवारणी)', hi: 'एकीकृत कीट प्रबंधन (IPM: पहले जैविक, आवश्यकता पड़ने पर सुरक्षित रसायन)' } },
      { value: 'pure_biological', label: { en: '100% Biological & Organic only (No synthetic chemicals)', mr: '१००% जैविक व सेंद्रिय उपाय (कोणतीही विषारी रसायने नकोत)', hi: '१००% जैविक एवं प्राकृतिक उपाय' } },
      { value: 'lowest_cost_any', label: { en: 'Whichever is the most cost-effective and legally registered', mr: 'जे सर्वात कमी खर्चात आणि अधिकृत परिणामकारक असेल ते', hi: 'जो सबसे कम खर्चीला और प्रमाणित हो' } },
    ],
  },
  {
    id: 27,
    category: 'F',
    categoryName: {
      en: 'Budget & Preferences',
      mr: 'बजेट व उपायांची पसंती',
      hi: 'बजट और प्राथमिकताएं',
    },
    question: {
      en: 'Which agricultural products or treatments are already available to you on your farm?',
      mr: 'तुमच्याकडे शेतात कोणती साधने किंवा उत्पादने आधीपासून उपलब्ध आहेत?',
      hi: 'आपके पास खेत में कौन सी सामग्री पहले से उपलब्ध है?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'dung_neem_pump', label: { en: 'Cow dung / Desi cows + Neem leaves + Knapsack spray pump', mr: 'शेणखत / देशी गाय + कडुलिंब + पाठीवरचा फवारणी पंप', hi: 'गोबर की खाद + नीम के पत्ते + स्प्रे पंप' } },
      { value: 'basic_spray_pump_only', label: { en: 'Only knapsack spray pump is available', mr: 'फक्त पाठीवरचा फवारणी पंप उपलब्ध आहे', hi: 'केवल सामान्य स्प्रे पंप उपलब्ध है' } },
      { value: 'trichoderma_neem_stock', label: { en: 'Some bio-agents (Trichoderma / Neem oil) already in stock', mr: 'काही जैविक औषधे (ट्रायकोडर्मा / निंबोळी अर्क) शिल्लक आहेत', hi: 'कुछ जैविक उत्पाद (ट्राइकोडर्मा / नीम तेल) पहले से मौजूद हैं' } },
      { value: 'none_available', label: { en: 'None — Need to arrange or prepare everything', mr: 'काहीही नाही — सर्व नव्याने घ्यावे लागेल', hi: 'कुछ नहीं — सब नया लेना होगा' } },
    ],
  },
  {
    id: 28,
    category: 'F',
    categoryName: {
      en: 'Budget & Preferences',
      mr: 'बजेट व उपायांची पसंती',
      hi: 'बजट और प्राथमिकताएं',
    },
    question: {
      en: 'Would you prefer the lowest-cost effective option, a balanced option, or a longer-term preventive approach?',
      mr: 'तुम्हाला तातडीचा सर्वात कमी खर्चाचा पर्याय हवा, संतुलित पर्याय, की दीर्घकालीन प्रतिबंधात्मक उपाय?',
      hi: 'आप सबसे कम लागत वाला प्रभावी विकल्प, संतुलित विकल्प, या दीर्घकालिक निवारक दृष्टिकोण पसंद करेंगे?',
    },
    type: 'select',
    required: true,
    options: [
      { value: 'balanced_kit', label: { en: 'Balanced Option — Practical combination of immediate control and prevention', mr: 'संतुलित पर्याय — तात्काळ नियंत्रण आणि पुढील संरक्षणाचा योग्य मेळ', hi: 'संतुलित विकल्प — तत्काल नियंत्रण और रोकथाम का व्यावहारिक मिश्रण' } },
      { value: 'lowest_cost', label: { en: 'Lowest-Cost Option — Essential minimum steps within tightest budget', mr: 'सर्वात कमी खर्चिक पर्याय — अत्यंत कमी खर्चात प्राथमिक उपाय', hi: 'न्यूनतम लागत विकल्प — सीमित बजट में आवश्यक बुनियादी कदम' } },
      { value: 'long_term_soil', label: { en: 'Long-term Preventive Approach — Strengthen soil biology and crop immunity', mr: 'दीर्घकालीन प्रतिबंधात्मक — मातीचे आरोग्य व पिकाची प्रतिकारशक्ती वाढवणे', hi: 'दीर्घकालिक निवारक — मिट्टी की उर्वरता और फसल की रोग प्रतिरोधक क्षमता' } },
    ],
  },

  // Category G: Additional information — 2 questions
  {
    id: 29,
    category: 'G',
    categoryName: {
      en: 'Additional Information',
      mr: 'अतिरिक्त माहिती व नोंदी',
      hi: 'अतिरिक्त खेत टिप्पणियां',
    },
    question: {
      en: 'Would you like to upload a soil-test report or additional crop photographs?',
      mr: 'तुम्हाला माती परीक्षण अहवाल किंवा पिकाचे इतर फोटो अपलोड करायचे आहेत का?',
      hi: 'क्या आप मृदा परीक्षण रिपोर्ट या फसल की अतिरिक्त तस्वीरें अपलोड करना चाहते हैं?',
    },
    type: 'file',
    required: false,
    description: {
      en: 'Optional: Upload PDF report or image files (Max 5MB).',
      mr: 'ऐच्छिक: PDF अहवाल किंवा फोटो अपलोड करा (कमाल ५ MB).',
      hi: 'वैकल्पिक: PDF रिपोर्ट या फोटो अपलोड करें (अधिकतम ५ MB)।',
    },
  },
  {
    id: 30,
    category: 'G',
    categoryName: {
      en: 'Additional Information',
      mr: 'अतिरिक्त माहिती व नोंदी',
      hi: 'अतिरिक्त खेत टिप्पणियां',
    },
    question: {
      en: 'Is there any other information about your crop, weather conditions, or field that you would like to share?',
      mr: 'तुमच्या शेताविषयी, नुकत्याच झालेल्या हवामान बदलाविषयी (उदा. अवकाळी पाऊस, धुके) काही सांगायचे आहे का?',
      hi: 'क्या आप अपनी फसल, मौसम की स्थिति (जैसे बेमौसम बारिश, कोहरा) या खेत के बारे में कुछ और बताना चाहते हैं?',
    },
    type: 'text',
    required: false,
    placeholder: {
      en: 'E.g., Cloudy weather for 4 days, sudden humidity, unseasonal shower last weekend...',
      mr: 'उदा. मागील ४ दिवस ढगाळ हवामान, जास्त दमटपणा, काल रात्री हलका अवकाळी पाऊस...',
      hi: 'उदा. पिछले ४ दिनों से बादल छाए हैं, अधिक नमी, पिछले सप्ताहांत बेमौसम बारिश...',
    },
  },
];
