import React, { useState, useEffect } from 'react';
import banner from '../assets/header-banner2.jpg';
import { Shield, Mail, Moon, Sun, Database, FileText, Users, Lock, Eye, AlertTriangle, Printer } from 'lucide-react';

const TEXT = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'How Rakshaniti collects, uses and protects your information',
    intro: 'Rakshaniti is committed to providing secure, transparent access to government schemes. This policy explains what we collect, why, and how you can control your data.',
    toc: 'Contents',
    sections: [
      { id: 'collect', title: 'Information We Collect', body: 'We collect minimal personal information necessary to provide services: name, contact details, identity numbers (when required), application documents, and limited technical data for security.' },
      { id: 'use', title: 'How We Use Data', body: 'We use data to process applications, verify eligibility, transfer benefits, send status updates, detect fraud, and improve the platform. Aggregated data is used for analytics.' },
      { id: 'share', title: 'Sharing & Disclosure', body: 'We share data with government departments and banking partners strictly for service delivery. We disclose data only when required by law or to protect rights and safety.' },
      { id: 'security', title: 'Security & Storage', body: 'We use encryption, access control and audits to protect data. Sensitive documents are processed per government guidelines and access is restricted.' },
      { id: 'rights', title: 'Your Rights', body: 'You can access, correct, or request deletion of your personal data where allowed by law. You may opt-out of non-essential communications and raise grievances via the platform.' },
      { id: 'contact', title: 'Contact', body: 'Privacy Officer — privacy@Rakshaniti.gov.in | Toll Free: 1800-XXX-XXXX' },
    ],
    footer: '🇮🇳 Proudly Indian • Digital India Initiative',
  },
  hi: {
    title: 'गोपनीयता नीति',
    subtitle: 'Rakshaniti आपकी जानकारी को कैसे एकत्र, उपयोग और सुरक्षित करता है',
    intro: 'Rakshaniti सुरक्षित और पारदर्शी रूप से सरकारी योजनाओं तक पहुंच प्रदान करने के लिए प्रतिबद्ध है। यह नीति बताती है कि हम क्या एकत्र करते हैं, क्यों और आप अपने डेटा को कैसे नियंत्रित कर सकते हैं।',
    toc: 'अनुक्रमणिका',
    sections: [
      { id: 'collect', title: 'हम जो जानकारी एकत्र करते हैं', body: 'हम सेवाएँ प्रदान करने के लिए न्यूनतम व्यक्तिगत जानकारी एकत्र करते हैं: नाम, संपर्क विवरण, पहचान संख्या (जब आवश्यक हो), आवेदन दस्तावेज़ और सुरक्षा हेतु सीमित तकनीकी डेटा।' },
      { id: 'use', title: 'हम डेटा का उपयोग कैसे करते हैं', body: 'हम डेटा का उपयोग आवेदन प्रोसेस करने, पात्रता सत्यापित करने, लाभ ट्रांसफर करने, स्थिति अपडेट भेजने, धोखाधड़ी का पता लगाने और प्लेटफ़ॉर्म को बेहतर बनाने के लिए करते हैं। समेकित डेटा विश्लेषण के लिए उपयोग किया जाता है।' },
      { id: 'share', title: 'साझा करना और प्रकटीकरण', body: 'हम सेवा प्रदान करने के लिए डेटा सरकारी विभागों और बैंकिंग भागीदारों के साथ साझा करते हैं। केवल कानूनी आवश्यकता या अधिकारों/सुरक्षा की रक्षा के लिए ही डेटा साझा किया जाता है।' },
      { id: 'security', title: 'सुरक्षा और भंडारण', body: 'हम डेटा की सुरक्षा के लिए एन्क्रिप्शन, एक्सेस नियंत्रण और ऑडिट का उपयोग करते हैं। संवेदनशील दस्तावेज़ सरकारी दिशानिर्देशों के अनुसार संसाधित किए जाते हैं।' },
      { id: 'rights', title: 'आपके अधिकार', body: 'आप कानूनी तौर पर जहाँ संभव हो अपने व्यक्तिगत डेटा तक पहुँच, उसे सुधारने या हटाने का अनुरोध कर सकते हैं। आप गैर-आवश्यक संचार से ऑप्ट-आउट कर सकते हैं और प्लेटफ़ॉर्म पर शिकायत दर्ज कर सकते हैं।' },
      { id: 'contact', title: 'संपर्क', body: 'गोपनीयता अधिकारी — privacy@Rakshaniti.gov.in | टोल फ्री: 1800-XXX-XXXX' },
    ],
    footer: '🇮🇳 गर्व से भारतीय • डिजिटल इंडिया पहल',
  },
};

export default function PrivacyPolicy() {
  const [lang, setLang] = useState('en');
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const data = TEXT[lang];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <header className="relative h-56 md:h-72 lg:h-96 overflow-hidden rounded-b-lg mb-8">
        <img src={banner} alt="Privacy banner" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">{data.title}</h1>
            <p className="mt-2 text-sm md:text-base text-white/90">{data.subtitle}</p>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-3">
            <label className="text-sm text-white">EN</label>
            <input type="radio" name="pp-lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm text-white">HI</label>
            <input type="radio" name="pp-lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
            <button
              onClick={() => window.print()}
              title={lang === 'hi' ? 'छापें' : 'Print'}
              className="bg-white/10 hover:bg-white/20 text-white rounded px-2 py-1 text-sm flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 gap-8">
          <section>

            <div className="space-y-6">
              {data.sections.map((s) => (
                <article id={s.id} key={s.id} className="relative overflow-hidden rounded-lg p-6 shadow-sm ring-1 ring-gray-100 dark:ring-0 bg-white dark:bg-[#071322]">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" aria-hidden />
                  <div className="flex items-start gap-4 ml-4">
                    <div className="flex-shrink-0 text-amber-500 mt-1">
                      {s.id === 'collect' && <Database className="w-6 h-6 text-amber-500" />}
                      {s.id === 'use' && <FileText className="w-6 h-6 text-amber-500" />}
                      {s.id === 'share' && <Users className="w-6 h-6 text-amber-500" />}
                      {s.id === 'security' && <Lock className="w-6 h-6 text-amber-500" />}
                      {s.id === 'rights' && <Eye className="w-6 h-6 text-amber-500" />}
                      {s.id === 'contact' && <Mail className="w-6 h-6 text-amber-500" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{s.title}</h4>
                      <p className="text-gray-700 dark:text-gray-200 mb-3">{s.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-sm text-center text-gray-600 dark:text-gray-300">{data.footer}</div>
          </section>
        </div>
      </main>
    </div>
  );
}

