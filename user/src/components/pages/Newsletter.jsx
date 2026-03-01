import React, { useState, useMemo } from 'react';
import banner from '../../assets/header-banner2.jpg';
import DropdownSelect from '../DropdownSelect';

export default function Newsletter() {
  const [lang, setLang] = useState('en');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('IN');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [showNotice, setShowNotice] = useState(true);

  const countries = [
    { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
    { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  ];

  const strings = useMemo(
    () => ({
      en: {
        title: 'Newsletter Signup',
        subtitle: 'Get monthly updates about new schemes, guides and community news.',
        noticeTitle: 'Newsletter notice',
        noticeText: 'Subscribe to receive important updates and new scheme alerts. You can unsubscribe anytime.',
        name: 'Full name (optional)',
        email: 'Email address',
        phone: 'Phone (optional)',
        phonePlaceholder: 'Enter phone number',
        country: 'Country',
        consent: 'I agree to receive emails from Rakshaniti.',
        submit: 'Subscribe',
        success: 'Thank you — you are subscribed!',
        sending: 'Sending...',
        invalidEmail: 'Please enter a valid email address.',
        requireConsent: 'Please agree to receive emails.',
        invalidPhone: 'Please enter a valid phone number.',
      },
      hi: {
        title: 'न्यूज़लैटर साइनअप',
        subtitle: 'नए योजनाओं, मार्गदर्शिकाओं और समुदाय समाचारों के मासिक अपडेट पाएं।',
        noticeTitle: 'न्यूज़लैटर सूचना',
        noticeText: 'महत्वपूर्ण अपडेट और नई योजना सूचनाएं प्राप्त करने के लिए सदस्यता लें। आप कभी भी अनसब्सक्राइब कर सकते हैं।',
        name: 'पूरा नाम (वैकल्पिक)',
        email: 'ईमेल पता',
        phone: 'फ़ोन (वैकल्पिक)',
        phonePlaceholder: 'फ़ोन नंबर दर्ज करें',
        country: 'देश',
        consent: 'मुझे Rakshaniti से ईमेल प्राप्त करने की सहमति है।',
        submit: 'सब्सक्राइब करें',
        success: 'शुक्रिया — आप सब्सक्राइब हो गए हैं!',
        sending: 'भेजा जा रहा है...',
        invalidEmail: 'कृपया मान्य ईमेल पता दर्ज करें।',
        requireConsent: 'कृपया ईमेल प्राप्त करने की सहमति दें।',
        invalidPhone: 'कृपया मान्य फ़ोन नंबर दर्ज करें।',
      },
    }),
    []
  );

  function validateEmail(e) {
    return /\S+@\S+\.\S+/.test(e);
  }

  function validatePhone(number) {
    const digits = (number || '').replace(/\D/g, '');
    return digits.length === 0 || (digits.length >= 6 && digits.length <= 15);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setStatus(null);

    if (!validateEmail(email)) {
      setStatus({ ok: false, msg: strings[lang].invalidEmail });
      return;
    }
    if (!consent) {
      setStatus({ ok: false, msg: strings[lang].requireConsent });
      return;
    }
    if (!validatePhone(phone)) {
      setStatus({ ok: false, msg: strings[lang].invalidPhone });
      return;
    }

    const payload = {
      name: name.trim() || undefined,
      email: email.trim(),
      phone: phone.trim()
        ? `${countries.find((c) => c.code === country).dial} ${phone.trim()}`
        : undefined,
      country: country,
      consent: !!consent,
    };

    setIsSubmitting(true);
    setStatus({ ok: null, msg: strings[lang].sending });

    try {
      const base = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${base}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => 'Server error');
        throw new Error(text || 'Server error');
      }

      setStatus({ ok: true, msg: strings[lang].success });
      setName('');
      setEmail('');
      setPhone('');
      setConsent(false);
    } catch (err) {
      setStatus({ ok: false, msg: err.message || 'Failed to subscribe' });
    } finally {
      setIsSubmitting(false);
    }
  }

  const selectedDial = countries.find((c) => c.code === country)?.dial || '';

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative h-56 md:h-72 lg:h-96 w-full overflow-hidden rounded-b-lg">
        <img src={banner} alt="banner" className="absolute inset-0 w-full h-full object-cover brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto h-full flex items-center justify-center">
          <div className="text-white py-6 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold">{strings[lang].title}</h1>
            <p className="mt-2 text-sm md:text-base max-w-2xl mx-auto">{strings[lang].subtitle}</p>

            <fieldset className="mt-4 flex flex-row items-center gap-3 justify-center" aria-label="Language selection">
              <legend className="sr-only">Language</legend>
              <label
                className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer ${lang === 'en' ? 'bg-white/10' : 'bg-transparent'}`}
              >
                <input type="radio" name="newsletter-lang" className="accent-amber-500" checked={lang === 'en'} onChange={() => setLang('en')} />
                <span className="text-sm text-white">EN</span>
              </label>

              <label
                className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer ${lang === 'hi' ? 'bg-white/10' : 'bg-transparent'}`}
              >
                <input type="radio" name="newsletter-lang" className="accent-amber-500" checked={lang === 'hi'} onChange={() => setLang('hi')} />
                <span className="text-sm text-white">HI</span>
              </label>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Notice Bar */}
        {showNotice && (
          <div className="mx-auto max-w-3xl mb-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-md flex items-start justify-between">
            <div>
              <div className="font-semibold">{strings[lang].noticeTitle}</div>
              <div className="text-sm text-gray-700 dark:text-gray-200">{strings[lang].noticeText}</div>
            </div>
            <button onClick={() => setShowNotice(false)} className="text-sm px-3 py-1 rounded-md border bg-white/0">
              Dismiss
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium mb-1">{strings[lang].name}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={strings[lang].name}
                className="w-full px-3 py-2 border rounded-md bg-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">{strings[lang].email}</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={strings[lang].email}
                required
                className="w-full px-3 py-2 border rounded-md bg-transparent"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-1">{strings[lang].country}</label>
              <DropdownSelect
                options={countries.map(c => `${c.flag} ${c.name} (${c.dial})`)}
                selectedOption={`${countries.find((c) => c.code === country)?.flag} ${countries.find((c) => c.code === country)?.name} (${countries.find((c) => c.code === country)?.dial})`}
                onSelect={(option) => {
                  const selectedCountry = countries.find((c) => `${c.flag} ${c.name} (${c.dial})` === option);
                  if (selectedCountry) setCountry(selectedCountry.code);
                }}
                label={strings[lang].country}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">{strings[lang].phone}</label>
              <div className="flex gap-2">
                <div className="px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 flex items-center text-sm text-gray-700 dark:text-gray-200">
                  {selectedDial}
                </div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={strings[lang].phonePlaceholder}
                  className="flex-1 px-3 py-2 border rounded-md bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="mt-4 flex items-center gap-3">
            <input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="w-4 h-4 accent-amber-500" />
            <label htmlFor="consent" className="text-sm">{strings[lang].consent}</label>
          </div>

          {/* Submit */}
          <div className="mt-6 flex items-center gap-4">
            <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-amber-500 disabled:opacity-60 text-white rounded-md">
              {isSubmitting ? strings[lang].sending : strings[lang].submit}
            </button>

            {status && (
              <div className={`text-sm ${status.ok ? 'text-green-500' : 'text-red-500'}`}>{status.msg}</div>
            )}
          </div>

          {/* Privacy Note */}
          <p className="mt-4 text-xs text-gray-500">
            {lang === 'en'
              ? 'We respect your privacy. You can unsubscribe anytime.'
              : 'हम आपकी गोपनीयता का सम्मान करते हैं। आप कभी भी अनसब्सक्राइब कर सकते हैं।'}
          </p>
        </form>
      </div>
    </div>
  );
}
