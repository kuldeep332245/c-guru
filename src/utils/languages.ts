export interface IndianLanguage {
  code: string;
  name: string;
  native: string;
  popular?: boolean;
}

export const ALL_INDIAN_LANGUAGES: IndianLanguage[] = [
  // 1. Most Popular & Widely Spoken (Top)
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', popular: true },
  { code: 'en', name: 'English', native: 'English', popular: true },
  { code: 'mr', name: 'Marathi', native: 'मराठी', popular: true },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', popular: true },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', popular: true },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', popular: true },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', popular: true },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', popular: true },
  { code: 'ur', name: 'Urdu', native: 'اردو', popular: true },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', popular: true },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', popular: true },
  { code: 'bho', name: 'Bhojpuri', native: 'भोजपुरी', popular: true },
  { code: 'raj', name: 'Rajasthani', native: 'राजस्थानी', popular: true },
  { code: 'bgc', name: 'Haryanvi', native: 'हरियाणवी', popular: true },

  // 2. Other Regional Languages
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', popular: false },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', popular: false },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृत', popular: false },
  { code: 'mai', name: 'Maithili', native: 'मैथिली', popular: false },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', popular: false },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी', popular: false },
  { code: 'ks', name: 'Kashmiri', native: 'कश्मीरी', popular: false },
  { code: 'sd', name: 'Sindhi', native: 'सिंधी', popular: false }
];

export interface NavLabels {
  home: string;
  topics: string;
  tutorials: string;
  compiler: string;
  quiz: string;
  unlockPass: string;
  proActive: string;
  signIn: string;
  profile: string;
  allAccess: string;
}

export const NAV_TRANSLATIONS: Record<string, NavLabels> = {
  hi: {
    home: 'होम',
    topics: 'टॉपिक्स',
    tutorials: 'ट्यूटोरियल्स',
    compiler: 'कम्पाइलर',
    quiz: 'क्विज़',
    unlockPass: 'पास अनलॉक करें',
    proActive: 'प्रो एक्टिव',
    signIn: 'लॉगिन करें',
    profile: 'विद्यार्थी प्रोफ़ाइल',
    allAccess: 'सम्पूर्ण C कोर्स पास'
  },
  en: {
    home: 'Home',
    topics: 'Topics',
    tutorials: 'Chapters',
    compiler: 'Compiler',
    quiz: 'Quizzes',
    unlockPass: 'Unlock Pass',
    proActive: 'Pro Active',
    signIn: 'Sign In',
    profile: 'Student Profile',
    allAccess: 'Full Access Pass'
  },
  bn: {
    home: 'হোম',
    topics: 'টপিকস',
    tutorials: 'টিউটোরিয়াল',
    compiler: 'কম্পাইলার',
    quiz: 'কুইজ',
    unlockPass: 'পাস আনলক করুন',
    proActive: 'প্রো অ্যাক্টিভ',
    signIn: 'লগইন করুন',
    profile: 'প্রোফাইল',
    allAccess: 'সম্পূর্ণ C কোর্স'
  },
  mr: {
    home: 'मुख्यपृष्ठ',
    topics: 'विषय',
    tutorials: 'धडे (ट्यूटोरियल)',
    compiler: 'कंपाइलर',
    quiz: 'चाचणी (क्विझ)',
    unlockPass: 'पास अनलॉक करा',
    proActive: 'प्रो ॲक्टिव्ह',
    signIn: 'लॉगिन करा',
    profile: 'विद्यार्थी प्रोफाईल',
    allAccess: 'संपूर्ण C कोर्स'
  },
  te: {
    home: 'హోమ్',
    topics: 'టాపిక్స్',
    tutorials: 'పాఠాలు',
    compiler: 'కంపైలర్',
    quiz: 'క్విజ్',
    unlockPass: 'పాస్ అన్‌లాక్ చేయండి',
    proActive: 'ప్రో యాక్టివ్',
    signIn: 'లాగిన్ చేయండి',
    profile: 'ప్రొఫైల్',
    allAccess: 'పూర్తి C కోర్సు'
  },
  ta: {
    home: 'முகப்பு',
    topics: 'பாடங்கள்',
    tutorials: 'டுடோரியல்',
    compiler: 'கம்பைலர்',
    quiz: 'வினாடி வினா',
    unlockPass: 'பாஸ் திறக்கவும்',
    proActive: 'ப்ரோ செயலில்',
    signIn: 'உள்நுழைய',
    profile: 'சுயவிவரம்',
    allAccess: 'முழு C படிப்பு'
  },
  gu: {
    home: 'હોમ',
    topics: 'વિષયો',
    tutorials: 'ટ્યુટોરિયલ્સ',
    compiler: 'કમ્પાઇલર',
    quiz: 'ક્વિઝ',
    unlockPass: 'પાસ અનલૉક કરો',
    proActive: 'પ્રો એક્ટિવ',
    signIn: 'લૉગિન કરો',
    profile: 'પ્રોફાઇલ',
    allAccess: 'સંપૂર્ણ C કોર્સ'
  },
  ur: {
    home: 'ہوم',
    topics: 'موضوعات',
    tutorials: 'اسباق',
    compiler: 'کمپائلر',
    quiz: 'کوئز',
    unlockPass: 'پاس انلاک کریں',
    proActive: 'پرو ایکٹو',
    signIn: 'لاگ ان کریں',
    profile: 'پروفائل',
    allAccess: 'مکمل C کورس'
  },
  kn: {
    home: 'ಮುಖಪುಟ',
    topics: 'ವಿಷಯಗಳು',
    tutorials: 'ಪಾಠಗಳು',
    compiler: 'ಕಂಪೈಲರ್',
    quiz: 'ಕ್ವಿಜ್',
    unlockPass: 'ಪಾಸ್ ಅನ್‌ಲಾಕ್ ಮಾಡಿ',
    proActive: 'ಪ್ರೊ ಸಕ್ರಿಯ',
    signIn: 'ಲಾಗಿನ್ ಮಾಡಿ',
    profile: 'ಪ್ರೊಫೈಲ್',
    allAccess: 'ಸಂಪೂರ್ಣ C ಕೋರ್ಸ್'
  },
  ml: {
    home: 'ഹോം',
    topics: 'വിഷയങ്ങൾ',
    tutorials: 'പാഠങ്ങൾ',
    compiler: 'കംപൈലർ',
    quiz: 'ക്വിസ്',
    unlockPass: 'പാസ് അൺലോക്ക് ചെയ്യുക',
    proActive: 'പ്രോ ആക്ടീവ്',
    signIn: 'ലോഗിൻ ചെയ്യുക',
    profile: 'പ്രൊഫൈൽ',
    allAccess: 'പൂർണ്ണ C കോഴ്സ്'
  },
  pa: {
    home: 'ਮੁੱਖ ਪੰਨਾ',
    topics: 'ਵਿਸ਼ੇ',
    tutorials: 'ਪਾਠ (ਟਿਊਟੋਰੀਅਲ)',
    compiler: 'ਕੰਪਾਈਲਰ',
    quiz: 'ਕਵਿਜ਼',
    unlockPass: 'ਪਾਸ ਅਨਲੌਕ ਕਰੋ',
    proActive: 'ਪ੍ਰੋ ਐਕਟਿਵ',
    signIn: 'ਲਾਗਇਨ ਕਰੋ',
    profile: 'ਵਿਦਿਆਰਥੀ ਪ੍ਰੋਫਾਈਲ',
    allAccess: 'ਪੂਰਾ C ਕੋਰਸ'
  },
  or: {
    home: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    topics: 'ବିଷୟବସ୍ତୁ',
    tutorials: 'ପାଠ୍ୟକ୍ରମ',
    compiler: 'କମ୍ପାଇଲର',
    quiz: 'କ୍ୱିଜ୍',
    unlockPass: 'ପାସ୍ ଅନଲକ୍ କରନ୍ତୁ',
    proActive: 'ପ୍ରୋ ସକ୍ରିୟ',
    signIn: 'ଲଗ୍ ଇନ୍ କରନ୍ତୁ',
    profile: 'ପ୍ରୋଫାଇଲ୍',
    allAccess: 'ସମ୍ପୂର୍ଣ୍ଣ C କୋର୍ସ'
  },
  as: {
    home: 'মূল পৃষ্ঠা',
    topics: 'বিষয়সমূহ',
    tutorials: 'পাঠ্যক্রম',
    compiler: 'কম্পাইলাৰ',
    quiz: 'কুইজ',
    unlockPass: 'পাছ আনলক কৰক',
    proActive: 'প্ৰ\' সক্ৰিয়',
    signIn: 'লগ ইন কৰক',
    profile: 'প্ৰ\'ফাইল',
    allAccess: 'সম্পূৰ্ণ C পাঠ্যক্ৰম'
  },
  sa: {
    home: 'गृहम्',
    topics: 'विषयाः',
    tutorials: 'पाठाः',
    compiler: 'कम्पैलर',
    quiz: 'प्रश्नोत्तरी',
    unlockPass: 'प्रवेशम् उद्घाटयतु',
    proActive: 'प्रो सक्रियः',
    signIn: 'प्रविशतु',
    profile: 'छात्रविवरणम्',
    allAccess: 'संपूर्ण C पाठ्यक्रमः'
  },
  bho: {
    home: 'होम',
    topics: 'सभ टॉपिक्स',
    tutorials: 'पाठ (ट्यूटोरियल)',
    compiler: 'कम्पाइलर',
    quiz: 'क्विज',
    unlockPass: 'पास अनलॉक करीं',
    proActive: 'प्रो एक्टिव',
    signIn: 'लॉगिन करीं',
    profile: 'छात्र प्रोफाइल',
    allAccess: 'पूरा C कोर्स पास'
  },
  raj: {
    home: 'होम (घर)',
    topics: 'सगळा विषय',
    tutorials: 'सीखण रा पाठ',
    compiler: 'कम्पाइलर',
    quiz: 'क्विज (सवालात)',
    unlockPass: 'पास अनलॉक करो',
    proActive: 'प्रो एक्टिव',
    signIn: 'लॉगिन करो',
    profile: 'विद्यार्थी प्रोफाइल',
    allAccess: 'पूरौ C कोर्स'
  },
  bgc: {
    home: 'होम',
    topics: 'सारे टॉपिक्स',
    tutorials: 'सीखण के पाठ',
    compiler: 'कम्पाइलर',
    quiz: 'क्विज',
    unlockPass: 'पास अनलॉक करो',
    proActive: 'प्रो एक्टिव',
    signIn: 'लॉगिन करो',
    profile: 'प्रोफाइल',
    allAccess: 'पूरा C कोर्स'
  }
};

export function getNavLabels(langCode: string): NavLabels {
  if (NAV_TRANSLATIONS[langCode]) {
    return NAV_TRANSLATIONS[langCode];
  }
  // If another Indian language, default to Hindi labels
  if (langCode !== 'en') {
    return NAV_TRANSLATIONS['hi'];
  }
  return NAV_TRANSLATIONS['en'];
}

export function getLanguageName(code: string): string {
  const found = ALL_INDIAN_LANGUAGES.find((l) => l.code === code);
  if (!found) return code;
  if (found.code === 'en') return 'English';
  return `${found.native} (${found.name})`;
}
