import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { translations, languageNames } from '../data/mockData';

const contextTerms = [
  { term_en: "Repo Rate", explanation: { en: "The interest rate at which RBI lends to banks", hi: "वह दर जिस पर RBI बैंकों को पैसा उधार देता है", mr: "RBI बँकांना कर्ज देण्याचा व्याज दर", ta: "ரிசர்வ் வங்கி வங்கிகளுக்கு கடன் தரும் வட்டி விகிதம்", te: "రిజర్వ్ బ్యాంక్ బ్యాంకులకు అప్పిచ్చే వడ్డీ రేటు", bn: "যে হারে রিজার্ভ ব্যাংক বাণিজ্যিক ব্যাংককে ঋণ দেয়" } },
  { term_en: "Fiscal Deficit", explanation: { en: "When government spending exceeds its revenue", hi: "जब सरकारी खर्च उसकी आय से अधिक हो", mr: "सरकारचा खर्च उत्पन्नापेक्षा जास्त असेल तेव्हा", ta: "அரசாங்கச் செலவு வருவாயை விட அதிகமாக இருக்கும்போது", te: "ప్రభుత్వ వ్యయం దాని ఆదాయం కంటే ఎక్కువైనప్పుడు", bn: "যখন সরকারের ব্যয় তার রাজস্বকে ছাড়িয়ে যায়" } },
  { term_en: "EMI", explanation: { en: "Equated Monthly Installment — fixed monthly loan repayment", hi: "समान मासिक किस्त — निश्चित मासिक लोन भुगतान", mr: "समान मासिक हप्ता — निश्चित मासिक कर्ज परतफेड", ta: "சமன் மாதாந்திர தவணை — நிலையான மாத கடன் திருப்பிச் செலுத்துதல்", te: "సమాన నెలవారీ వాయిదా — నిర్ణీత నెలవారీ రుణ చెల్లింపు", bn: "সমান মাসিক কিস্তি — নির্দিষ্ট মাসিক ঋণ পরিশোধ" } },
];

const articles = [
  {
    id: 1,
    headline_en: "RBI may cut repo rate to stimulate economy",
    body_en: "The Reserve Bank of India is widely expected to reduce its benchmark lending rate by 25 basis points in its upcoming monetary policy committee meeting, as inflation has eased to its lowest level in 18 months. Analysts at major brokerages say the rate cut will provide relief to home loan borrowers and boost consumption.",
    headline_translated: { hi: "RBI अर्थव्यवस्था को गति देने के लिए रेपो रेट घटा सकता है", mr: "RBI अर्थव्यवस्थेला चालना देण्यासाठी रेपो दर कमी करू शकतो", ta: "பொருளாதாரத்தை தூண்ட RBI ரெப்போ விகிதத்தை குறைக்கலாம்", te: "ఆర్థిక వ్యవస్థను ప్రోత్సహించడానికి RBI రెపో రేటును తగ్గించవచ్చు", bn: "অর্থনীতিকে উদ্দীপিত করতে RBI রেপো রেট কমাতে পারে" },
    body_translated: { hi: "भारतीय रिज़र्व बैंक अपनी आगामी मौद्रिक नीति समिति की बैठक में बेंचमार्क उधार दर को 25 आधार अंकों से घटाने की उम्मीद है। महंगाई 18 महीनों के सबसे निचले स्तर पर आ गई है। विश्लेषकों का कहना है कि इससे होम लोन की EMI कम होगी और खपत को बढ़ावा मिलेगा।", mr: "रिझर्व्ह बँक आगामी बैठकीत व्याजदर 25 आधार अंकांनी कमी करण्याची अपेक्षा आहे. महागाई 18 महिन्यांच्या नीचांकावर आली आहे. विश्लेषकांच्या मते गृहकर्ज EMI कमी होईल.", ta: "இந்திய ரிசர்வ் வங்கி வரும் கூட்டத்தில் ரெப்போ விகிதத்தை 25 புள்ளிகளால் குறைக்கும் என எதிர்பார்க்கப்படுகிறது. பணவீக்கம் 18 மாத தாழ்வில் உள்ளது.", te: "భారత రిజర్వ్ బ్యాంక్ రెపో రేటును 25 బేసిస్ పాయింట్లు తగ్గించాలని అంచనా. ద్రవ్యోల్బణం 18 నెలల కనిష్ఠానికి వచ్చింది.", bn: "রিজার্ভ ব্যাংক রেপো রেট ২৫ বেসিস পয়েন্ট কমাতে পারে। মুদ্রাস্ফীতি ১৮ মাসের সর্বনিম্নে পৌঁছেছে।" },
    ai_explainer: { en: "A repo rate cut means banks can borrow from RBI at cheaper rates, which they then pass on to you as lower home loan and car loan EMIs.", hi: "रेपो रेट कटौती का मतलब है कि बैंक RBI से सस्ती दर पर उधार ले सकते हैं। इससे होम लोन और कार लोन की EMI कम होगी।", mr: "रेपो दर कपात म्हणजे बँका RBI कडून स्वस्त दरात कर्ज घेऊ शकतात. त्याचा फायदा ग्राहकांना कमी EMI रूपात मिळतो.", ta: "ரெப்போ விகிதம் குறைந்தால் வங்கிகள் RBI இடமிருந்து குறைவான வட்டிக்கு கடன் பெறலாம், இது உங்கள் EMI குறைக்கும்.", te: "రెపో రేటు తగ్గితే బ్యాంకులు RBI నుండి తక్కువ ధరకు రుణాలు పొందవచ్చు, ఇది మీ EMI తగ్గిస్తుంది.", bn: "রেপো রেট কমলে ব্যাংকগুলো কম সুদে RBI থেকে ঋণ নেয়, ফলে আপনার EMI কমে।" },
  },
  {
    id: 2,
    headline_en: "Budget 2026: Startup Tax Holiday Extended to 15 Years",
    body_en: "In a major relief for the startup ecosystem, Finance Minister announced that the income tax holiday for recognized startups will be extended from 10 to 15 years. This move is expected to significantly boost venture capital activity and encourage more founders to incorporate in India.",
    headline_translated: { hi: "बजट 2026: स्टार्टअप टैक्स छूट 15 साल तक बढ़ाई गई", mr: "अर्थसंकल्प 2026: स्टार्टअप कर सुट्टी 15 वर्षांपर्यंत वाढवली", ta: "பட்ஜெட் 2026: ஸ்டார்ட்அப் வரி விடுமுறை 15 ஆண்டுகளுக்கு நீட்டிக்கப்பட்டது", te: "బడ్జెట్ 2026: స్టార్టప్ పన్ను సెలవు 15 సంవత్సరాలకు పొారడింది", bn: "বাজেট ২০২৬: স্টার্টআপ ট্যাক্স ছুটি ১৫ বছরে বাড়ানো হয়েছে" },
    body_translated: { hi: "वित्त मंत्री ने घोषणा की है कि मान्यता प्राप्त स्टार्टअप के लिए आयकर छूट 10 से बढ़ाकर 15 साल की जाएगी। इससे वेंचर कैपिटल गतिविधि में खासा उछाल आएगा।", mr: "अर्थमंत्र्यांनी मान्यताप्राप्त स्टार्टअपसाठी आयकर सुट्टी 10 वरून 15 वर्षांपर्यंत वाढवण्याची घोषणा केली.", ta: "நிதியமைச்சர் அங்கீகரிக்கப்பட்ட ஸ்டார்ட்அப்கள் வருமான வரி விடுமுறையை 10 இல் இருந்து 15 ஆண்டுகளுக்கு நீட்டிப்பதாக அறிவித்தார்.", te: "ఆర్థిక మంత్రి గుర్తింపు పొందిన స్టార్టప్‌లకు ఆదాయపు పన్ను సెలవును 10 నుండి 15 సంవత్సరాలకు పొడిగించినట్లు ప్రకటించారు.", bn: "অর্থমন্ত্রী ঘোষণা করেছেন যে স্বীকৃত স্টার্টআপের জন্য আয়কর ছুটি ১০ থেকে ১৫ বছরে বাড়ানো হবে।" },
    ai_explainer: { en: "A 15-year tax holiday means startups keep all profits for 15 years — this is a massive incentive to start, scale, and list in India.", hi: "15 साल की टैक्स छूट का मतलब है कि स्टार्टअप 15 साल तक अपना पूरा मुनाफा रख सकता है — यह भारत में स्टार्टअप बनाने का बड़ा प्रोत्साहन है।", mr: "15 वर्षांची सुट्टी म्हणजे स्टार्टअप 15 वर्षे सर्व नफा ठेवू शकतो — हे भारतात स्टार्टअप सुरू करण्यासाठी मोठे प्रोत्साहन आहे.", ta: "15 ஆண்டு வரி விடுமுறை என்பது ஸ்டார்ட்அப்கள் 15 ஆண்டுகள் முழு லாபத்தையும் வைத்திருக்கலாம்.", te: "15 సంవత్సరాల పన్ను సెలవు అంటే స్టార్టప్‌లు 15 సంవత్సరాలు పూర్తి లాభాన్ని ఉంచుకోవచ్చు.", bn: "১৫ বছরের ট্যাক্স ছুটি মানে স্টার্টআপগুলো ১৫ বছর সম্পূর্ণ মুনাফা রাখতে পারবে।" },
  },
];

export default function Vernacular() {
  const { language, updateLanguage } = useUser();
  const [activeArticle, setActiveArticle] = useState(0);
  const [switching, setSwitching] = useState(false);

  const article = articles[activeArticle];
  const lang = language === 'en' ? 'hi' : language;

  const switchLang = async (code) => {
    setSwitching(true);
    await new Promise(r => setTimeout(r, 300));
    updateLanguage(code);
    setSwitching(false);
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ padding: '28px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div className="ai-pulse" style={{ marginBottom: 8 }}>Vernacular AI Engine</div>
          <h1 style={{ fontSize: 28, fontFamily: 'Space Grotesk', marginBottom: 8 }}>
            🌏 AI in Your <span className="gradient-text">Language</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            News explained in your mother tongue — with AI context injection
          </p>
        </div>

        {/* Language selector */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          {Object.entries(languageNames).map(([code, name]) => (
            <button key={code} onClick={() => switchLang(code)} className={`chip ${language === code ? 'active' : ''}`} style={{ fontSize: 14, padding: '8px 18px' }}>
              {name}
            </button>
          ))}
        </div>

        {/* Article selector */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {articles.map((a, i) => (
            <button key={a.id} onClick={() => setActiveArticle(i)} className={`chip ${activeArticle === i ? 'active' : ''}`}>
              Article {i + 1}
            </button>
          ))}
        </div>

        {/* Side-by-side translation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28, opacity: switching ? 0 : 1, transition: 'opacity 0.3s' }}>
          {/* English */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>🇬🇧 English</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>{article.headline_en}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{article.body_en}</p>
          </div>

          {/* Translated */}
          <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05))', border: '1px solid rgba(59,130,246,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)' }}>
                🌐 {languageNames[language]}
              </div>
              <div className="ai-pulse" style={{ fontSize: 11 }}>AI Translated</div>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>
              {language === 'en' ? article.headline_en : (article.headline_translated[language] || article.headline_en)}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {language === 'en' ? article.body_en : (article.body_translated[language] || article.body_en)}
            </p>
          </div>
        </div>

        {/* AI Context Injection */}
        <div className="card" style={{
          padding: '20px 24px', marginBottom: 28,
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(6,182,212,0.06))',
          border: '1px solid rgba(16,185,129,0.2)',
          opacity: switching ? 0 : 1, transition: 'opacity 0.3s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>🤖</span>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#10b981' }}>AI Explainer — {languageNames[language]}</div>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-primary)' }}>
            {language === 'en' ? article.ai_explainer.en : (article.ai_explainer[language] || article.ai_explainer.en)}
          </p>
        </div>

        {/* Context Terms */}
        <div>
          <div className="section-label">📖 Smart Context — Key Terms Explained</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {contextTerms.map(t => (
              <div key={t.term_en} className="glass-card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#93c5fd', marginBottom: 6 }}>{t.term_en}</div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {language === 'en' ? t.explanation.en : (t.explanation[language] || t.explanation.en)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
