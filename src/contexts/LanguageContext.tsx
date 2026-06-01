import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "EN" | "DE" | "UA";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Header
    "nav.work": "Work",
   "nav.services": "Services",
    "nav.contact": "Contact",
    
    // Hero
    "hero.headline1": "ELEDEN — premium",
    "hero.headline2": "content systems for",
    "hero.headline3": "modern businesses.",
    "hero.subhead": "We turn scattered ideas into short-form video systems that build brand trust and generate qualified inquiries.",
    "hero.trust": "Based in Munich • Available worldwide • Reply within 24–48 hours",
    "hero.cta.primary": "Request a strategy call",
    "hero.cta.secondary": "View selected work",
    
    // Outcomes
    "outcomes.title": "What you get",
    "outcomes.01.title": "Brand Presence",
    "outcomes.01.body": "A premium visual identity in motion — consistent content that makes your business look established.",
    "outcomes.02.title": "Content System",
    "outcomes.02.body": "A repeatable production pipeline: ideas, scripts, shooting direction, editing — delivered consistently.",
    "outcomes.03.title": "Leads",
    "outcomes.03.body": "Short-form content built for conversion — turning attention into qualified inquiries.",
    "outcomes.badge": "Most requested",
    
    // Portfolio
    "portfolio.title": "Selected work",
    "portfolio.subtitle": "Vertical reels, designed to sell the feeling — and the result.",
    "portfolio.viewAll": "More work coming soon",
    "portfolio.outcomes": "Key Outcomes",
    "portfolio.services": "What we did",
    "portfolio.cta": "Request similar system",
    
    // System
    "system.title": "Our system",
    "system.subtitle": "A clear pipeline that turns content into a predictable asset.",
    "system.01.title": "Strategy",
    "system.01.desc": "Goals, audience, positioning, and the content angle that sells.",
    "system.02.title": "Concept",
    "system.02.desc": "Weekly ideas engineered for retention and trust.",
    "system.03.title": "Production",
    "system.03.desc": "Shoot days or remote content direction — designed for speed and quality.",
    "system.04.title": "Editing",
    "system.04.desc": "Cinematic pacing, premium color, clean sound, platform-ready formats.",
    "system.05.title": "Iteration",
    "system.05.desc": "Performance review, adjustments, and scaling what works.",
    "system.badge": "Quality control",
    
    // Packages
    "packages.title": "Packages",
    "packages.subtitle": "Choose your content intensity.",
    "packages.includes": "Includes:",
    "packages.notIncluded": "Not included:",
    "packages.recommended": "Recommended",
    "packages.custom.title": "Individual",
    "packages.custom.desc": "Fully customized per client after the first discovery call. For clients who need daily content and long-term social media direction.",
    "packages.cta.s": "Request Package S",
    "packages.cta.m": "Request Package M",
    "packages.cta.l": "Request Package L",
    "packages.cta.custom": "Request a custom plan",
    "packages.note": "Every package can be customized and extended after the first call.",
    "packages.filming": "Filming included. Locally in Munich at no extra cost. Outside Munich — +€100 for shoot organization; the videographer is paid by the client.",
    
    // Package S
    "packages.s.name": "Package S",
    "packages.s.price": "from €480 (plus VAT)",
    "packages.s.tagline": "Shortform videos (up to 1 minute). Client films content themselves.",
    "packages.s.inc1": "1 Start Strategy Call",
    "packages.s.inc2": "Concept development + video strategy",
    "packages.s.inc3": "1 social media channel",
    "packages.s.inc4": "4 videos per month",
    "packages.s.inc5": "Video editing incl. subtitles, sound effects, video effects, transitions",
    "packages.s.inc6": "1 revision round per video",
    "packages.s.inc7": "1 intermediate strategy call",
    "packages.s.not1": "Editorial plan (scenario, storyboard)",
    "packages.s.not2": "Social media activities (2 hours per month)",
    "packages.s.not3": "Competitor & niche analysis, optimization (1.5 hours per month)",
    
    // Package M
    "packages.m.name": "Package M",
    "packages.m.price": "from €870 (plus VAT)",
    "packages.m.tagline": "For consistent content and real lead generation.",
    "packages.m.inc1": "1 Start Strategy Call",
    "packages.m.inc2": "Concept development + video strategy",
    "packages.m.inc3": "1 social media channel",
    "packages.m.inc4": "6 videos per month",
    "packages.m.inc5": "Video editing incl. subtitles, sound effects, video effects, transitions",
    "packages.m.inc6": "1 revision round per video",
    "packages.m.inc7": "1 intermediate strategy call",
    "packages.m.inc8": "Editorial plan (scenario, storyboard)",
    "packages.m.inc9": "Social media activities (2 hours per month)",
    "packages.m.not1": "Competitor & niche analysis, optimization (1.5 hours per month)",
    
    // Package L
    "packages.l.name": "Package L",
    "packages.l.price": "from €1,260 (plus VAT)",
    "packages.l.tagline": "Maximum growth impact — full system.",
    "packages.l.inc1": "1 Start Strategy Call",
    "packages.l.inc2": "Concept development + video strategy",
    "packages.l.inc3": "1 social media channel",
    "packages.l.inc4": "8 videos per month",
    "packages.l.inc5": "Video editing incl. subtitles, sound effects, video effects, transitions",
    "packages.l.inc6": "1 revision round per video",
    "packages.l.inc7": "1 intermediate strategy call",
    "packages.l.inc8": "Editorial plan (scenario, storyboard)",
    "packages.l.inc9": "Social media activities (4 hours per month)",
    "packages.l.inc10": "Competitor & niche analysis, optimization (1.5 hours per month)",
    
    // Package Individual
    "packages.individual.name": "Individual",
    "packages.individual.price": "from €2,000 (plus VAT)",
    "packages.individual.tagline": "Fully customized per client after the first discovery call. For clients who need daily content and long-term social media direction.",
    
    // FAQ
    "faq.title": "Frequently asked questions",
    // Leadroom partnership
    "leadroom.title": "Full-funnel. Content meets performance.",
    "leadroom.subtitle": "ELEDEN partners with Leadroom — a performance marketing agency — to offer a complete growth system: premium content production combined with targeted paid advertising.",
    "leadroom.eleden.label": "ELEDEN",
    "leadroom.eleden.heading": "Content Production",
    "leadroom.eleden.desc": "Short-form video, brand storytelling, and content systems that build trust and authority on social media.",
    "leadroom.eleden.tag": "Strategy · Production · Editing",
    "leadroom.leadroom.label": "Leadroom",
    "leadroom.leadroom.heading": "Performance Marketing",
    "leadroom.leadroom.desc": "Meta Ads, Google Ads, and paid social campaigns — engineered to convert attention into qualified leads.",
    "leadroom.leadroom.tag": "Meta Ads · Google Ads · Retargeting",
    "leadroom.connector": "Together: content that converts + ads that scale",
    "leadroom.cta.title": "Want the full system?",
    "leadroom.cta.subtitle": "Book a strategy call — we'll assess whether a combined approach fits your goals.",
    "leadroom.cta.button": "Request a strategy call",
    "faq.q1": "How does the collaboration work?",
    "faq.a1": "We start with a short strategy call, align goals and positioning, then build a repeatable content system. You get clear deliverables, deadlines, and a monthly performance loop.",
    "faq.q2": "How does payment work?",
    "faq.a2": "Payment is made upfront for the upcoming month. Once the invoice is settled, we begin production for that cycle. All prices are stated excluding VAT.",
    "faq.q3": "Is there a minimum contract length?",
    "faq.a3": "We recommend a 3-month minimum to build real momentum and see compounding results, but it's not mandatory — you can also work with us month-to-month if you prefer to stay flexible.",
    "faq.q4": "How does shooting work and where do you film?",
    "faq.a4": "Shooting and organization are included locally within Munich. For locations beyond 100 km we add a small organization fee and bill travel time at our hourly rate (transport costs at actual). You can also book us to organize a shoot with an external videographer paid by you.",
    "faq.q5": "How long does production take?",
    "faq.a5": "Typical turnaround is 3–7 days per batch depending on volume. We optimize for consistency and speed without sacrificing quality.",
    "faq.q6": "Which niches do you work with?",
    "faq.a6": "Premium services, real estate, hospitality, personal brands, product launches — any business that wants trust + leads through short-form content.",
    "faq.q7": "Do you need footage from us, or can you work with client materials?",
    "faq.a7": "Both. We can shoot on location or work remotely using your existing materials. We also provide clear shooting direction if you want to film in-house.",
    
    // Contact
    "contact.headline1": "Ready to build a premium",
    "contact.headline2": "content system?",
    "contact.subline": "Send a request — we'll reply within 24–48 hours.",
    "contact.firstName": "First name",
    "contact.lastName": "Last name",
    "contact.lastNameOptional": "Last name (optional)",
    "contact.companyName": "Company name",
    "contact.instagram": "Instagram handle",
    "contact.email": "Email",
    "contact.website": "Website",
    "contact.websiteOptional": "Website (optional)",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell us briefly about your brand and what you'd like to achieve...",
    "contact.phone": "Phone",
    "contact.phoneOptional": "Phone (optional)",
    "contact.cta": "Request a strategy call",
    "contact.microcopy": "No spam. We only use your details to reply within 24–48 hours.",
    "contact.success.title": "Request received",
    "contact.success.body": "We'll get back to you within 24–48 hours.",
    "contact.sending": "Sending...",
    "cookies.title": "Your privacy choice",
    "cookies.body": "This site uses only strictly necessary cookies required for the site to function. We do not set marketing, advertising or tracking cookies, and we do not share data with third parties without your consent.",
    "cookies.legal": "By choosing \"Accept\" you confirm this notice. You can withdraw consent at any time. Details:",
    "cookies.privacy": "Privacy Policy",
    "cookies.impressum": "Impressum",
    "cookies.accept": "Accept",
    "cookies.decline": "Decline non-essential",
    
    // Footer
    "footer.tagline": "Premium content systems for modern businesses.",
    "footer.location": "Munich • Worldwide",
    "footer.nav": "Navigation",
    "footer.legal": "Legal",
    "footer.social": "Social",
    "footer.impressum": "Impressum",
    "footer.privacy": "Privacy",
    "footer.copyright": "All rights reserved.",
    "footer.cookieSettings": "Cookie settings",
    "footer.trust": "Based in Munich • Available worldwide • Reply within 24–48 hours",
    
    // About
    "about.headline": "Founder-led. Crafted in Munich.",
    "about.p1": "I'm a content creator from Ukraine, relocated to Munich because of the war.",
    "about.p2": "I worked in employment and then built my own content agency.",
    "about.p3": "I'm also a sponsor-backed professional cyclist, which shaped my taste for dynamic, stylish content.",
    "about.p4": "My approach: stylish, honest, fast execution, premium look.",
    "about.closing": "If you want premium short-form content with a clear system — ELEDEN builds it for you.",
    "about.photoPlaceholder": "Add your photo here",

    // Meta Ads Packages
    "meta.title": "Meta Ads Packages",
    "meta.subtitle": "Choose how far you want to go — content alone, or a complete system that runs your ads end-to-end.",
    "meta.toggle.content": "Content Only",
    "meta.toggle.full": "Full System",
    "meta.popular": "Most Popular",
    "meta.cta": "Request Package",
    "meta.month": "/month",
    "meta.note.terms": "All prices exclude VAT. Filming in Munich included. Outside Munich +€100. Videographer paid by client. 3-month minimum term.",
    "meta.note.together": "{leadroom} manages your ad campaigns. {eleden} produces your content. Together — one system.",
    "meta.spark.tagline": "Launch your first ad system with intent.",
    "meta.spark.features": "5 Reels / month|Shooting + editing included|Basic ad strategy|1 platform (Meta)|Monthly strategy call",
    "meta.surge.tagline": "Scale creative output and reach across channels.",
    "meta.surge.features": "10 Reels / month|Shooting + editing included|Full ad strategy + scripting|2 platforms (Meta + Google)|Weekly optimization calls|A/B testing concepts",
    "meta.storm.tagline": "A complete content & performance engine.",
    "meta.storm.features": "20 Reels / month|Shooting + editing included|Full strategy + A/B testing|Up to 4 platforms|Daily monitoring|Dedicated Slack channel",

    // Build Your System
    "bys.title": "Build Your System",
    "bys.subtitle": "Three steps to your custom content & ads engine.",
    "bys.step1.title": "Step 1 — Choose your content package",
    "bys.step2.title": "Step 2 — Add Leadroom ad management?",
    "bys.continue": "Continue",
    "bys.back": "← Back",
    "bys.summary": "See Summary",
    "bys.startover": "Start over",
    "bys.request": "Request This Package",
    "bys.your_system": "Your System",
    "bys.month": "/month",
    "bys.popular": "Most Popular",
    "bys.recommended": "Recommended",
    "bys.mode.content": "Content Only",
    "bys.mode.full": "Content + Ads",
    "bys.mode.content.desc": "{name} package only — your content engine.",
    "bys.mode.full.desc": "{name} + {leadroom} — content & ad system.",
    "bys.note.filming": "Filming in Munich included at no extra cost. Outside Munich +€100 for shoot organization (videographer paid by client).",
    "bys.note.vat": "All prices exclude VAT. 3-month minimum recommended.",
    "bys.spark.reels": "5 Reels / month",
    "bys.spark.features": "5 Reels / month|Shooting + editing included|Ad-focused scripting|Basic strategy call",
    "bys.spark.lr.features": "1 platform|Campaign setup|Conversion tracking|Weekly optimization|Monthly reporting",
    "bys.surge.reels": "10 Reels / month",
    "bys.surge.features": "10 Reels / month|Shooting + editing included|Full ad strategy + scripting|A/B concept variations|Weekly strategy call",
    "bys.surge.lr.features": "2 platforms (Meta + Google)|Full-funnel strategy|Server-side tracking (CAPI)|Weekly optimization & calls|Landing page recommendations",
    "bys.storm.reels": "20 Reels / month",
    "bys.storm.features": "20 Reels / month|Shooting + editing included|Full strategy + A/B testing|Daily content pipeline|Dedicated strategy sessions",
    "bys.storm.lr.features": "Up to 4 platforms|Full-funnel + retention strategy|Server-side tracking & GA4|Daily monitoring & weekly calls|CRO & landing page tests|Live dashboard & Slack channel",

    // Why ELEDEN & Leadroom
    "why.title": "Why ELEDEN & Leadroom?",
    "why.subtitle": "Two specialists. One system. Real results.",
    "why.1.title": "Results you can see",
    "why.1.text": "We don't just produce content — we build systems that generate leads. Our case study with Almeno Immobilien: 200+ qualified leads in 2 months on a modest ad budget.",
    "why.2.title": "Price that makes sense",
    "why.2.text": "Full-system packages starting at €999/month. Comparable agencies in Germany charge €2,500–4,500 for the same scope. You get more, you pay less.",
    "why.3.title": "World-class standards",
    "why.3.text": "We operate by the same production and performance standards used by top global agencies — applied to your budget and your market.",
    "why.4.title": "Two specialists, zero gaps",
    "why.4.text": "ELEDEN handles content. Leadroom handles ads. No hand-offs, no miscommunication — one integrated team working toward your growth.",
    "why.case.lead": "200+ qualified leads",
    "why.case.mid": " · 2 months · modest ad budget — ",
    "why.case.tail": "Almeno Immobilien",
  },
  
  DE: {
    // Header
    "nav.work": "Arbeiten",
   "nav.services": "Leistungen",
    "nav.contact": "Kontakt",
    
    // Hero
    "hero.headline1": "ELEDEN — Premium",
    "hero.headline2": "Content-Systeme für",
    "hero.headline3": "moderne Unternehmen.",
    "hero.subhead": "Wir verwandeln verstreute Ideen in Kurzform-Video-Systeme, die Markenvertrauen aufbauen und qualifizierte Anfragen generieren.",
    "hero.trust": "Standort München • Weltweit verfügbar • Antwort innerhalb von 24–48 Stunden",
    "hero.cta.primary": "Strategiegespräch anfragen",
    "hero.cta.secondary": "Ausgewählte Arbeiten",
    
    // Outcomes
    "outcomes.title": "Was Sie bekommen",
    "outcomes.01.title": "Markenpräsenz",
    "outcomes.01.body": "Eine Premium-Markenidentität in Bewegung — konsistenter Content, der Ihr Unternehmen etabliert aussehen lässt.",
    "outcomes.02.title": "Content-System",
    "outcomes.02.body": "Eine wiederholbare Produktionspipeline: Ideen, Skripte, Drehanweisungen, Schnitt — konstant geliefert.",
    "outcomes.03.title": "Leads",
    "outcomes.03.body": "Kurzform-Content für Konversion — Aufmerksamkeit wird zu qualifizierten Anfragen.",
    "outcomes.badge": "Am meisten angefragt",
    
    // Portfolio
    "portfolio.title": "Ausgewählte Arbeiten",
    "portfolio.subtitle": "Vertikale Reels, designed um das Gefühl zu verkaufen — und das Ergebnis.",
    "portfolio.viewAll": "Weitere Arbeiten in Kürze",
    "portfolio.outcomes": "Wichtige Ergebnisse",
    "portfolio.services": "Was wir gemacht haben",
    "portfolio.cta": "Ähnliches System anfragen",
    
    // System
    "system.title": "Unser System",
    "system.subtitle": "Eine klare Pipeline, die Content in ein berechenbares Asset verwandelt.",
    "system.01.title": "Strategie",
    "system.01.desc": "Ziele, Zielgruppe, Positionierung und der Content-Winkel der verkauft.",
    "system.02.title": "Konzept",
    "system.02.desc": "Wöchentliche Ideen entwickelt für Retention und Vertrauen.",
    "system.03.title": "Produktion",
    "system.03.desc": "Drehtage oder Remote Content-Direction — designed für Geschwindigkeit und Qualität.",
    "system.04.title": "Schnitt",
    "system.04.desc": "Filmisches Pacing, Premium-Farben, sauberer Sound, plattformfertige Formate.",
    "system.05.title": "Iteration",
    "system.05.desc": "Performance-Review, Anpassungen und Skalierung dessen was funktioniert.",
    "system.badge": "Qualitätskontrolle",
    
    // Packages
    "packages.title": "Pakete",
    "packages.subtitle": "Wählen Sie Ihre Content-Intensität.",
    "packages.includes": "Inklusive:",
    "packages.notIncluded": "Nicht enthalten:",
    "packages.recommended": "Empfohlen",
    "packages.custom.title": "Individuell",
    "packages.custom.desc": "Nach dem ersten Gespräch vollständig auf den Kunden zugeschnitten. Für Kunden, die täglichen Content und langfristige Social-Media-Betreuung benötigen.",
    "packages.cta.s": "Paket S anfragen",
    "packages.cta.m": "Paket M anfragen",
    "packages.cta.l": "Paket L anfragen",
    "packages.cta.custom": "Individuelles Angebot anfragen",
    "packages.note": "Jedes Paket kann nach dem ersten Gespräch angepasst und erweitert werden.",
    "packages.filming": "Dreh inklusive. Lokal in München ohne Aufpreis. Außerhalb Münchens — +100 € für die Drehorganisation; der Videograf wird vom Kunden bezahlt.",
    
    // Package S
    "packages.s.name": "Paket S",
    "packages.s.price": "ab €480 (zzgl. MwSt.)",
    "packages.s.tagline": "Kurzform-Videos (bis 1 Minute). Kunde filmt Content selbst.",
    "packages.s.inc1": "1 Start-Strategiegespräch",
    "packages.s.inc2": "Konzeptentwicklung + Video-Strategie",
    "packages.s.inc3": "1 Social-Media-Kanal",
    "packages.s.inc4": "4 Videos pro Monat",
    "packages.s.inc5": "Videoschnitt inkl. Untertitel, Soundeffekte, Videoeffekte, Übergänge",
    "packages.s.inc6": "1 Korrekturschleife pro Video",
    "packages.s.inc7": "1 Zwischen-Strategiegespräch",
    "packages.s.not1": "Redaktionsplan (Szenario, Storyboard)",
    "packages.s.not2": "Social-Media-Aktivitäten (2 Stunden pro Monat)",
    "packages.s.not3": "Wettbewerbs- & Nischenanalyse, Optimierung (1,5 Stunden pro Monat)",
    
    // Package M
    "packages.m.name": "Paket M",
    "packages.m.price": "ab €870 (zzgl. MwSt.)",
    "packages.m.tagline": "Für konsistenten Content und echte Lead-Generierung.",
    "packages.m.inc1": "1 Start-Strategiegespräch",
    "packages.m.inc2": "Konzeptentwicklung + Video-Strategie",
    "packages.m.inc3": "1 Social-Media-Kanal",
    "packages.m.inc4": "6 Videos pro Monat",
    "packages.m.inc5": "Videoschnitt inkl. Untertitel, Soundeffekte, Videoeffekte, Übergänge",
    "packages.m.inc6": "1 Korrekturschleife pro Video",
    "packages.m.inc7": "1 Zwischen-Strategiegespräch",
    "packages.m.inc8": "Redaktionsplan (Szenario, Storyboard)",
    "packages.m.inc9": "Social-Media-Aktivitäten (2 Stunden pro Monat)",
    "packages.m.not1": "Wettbewerbs- & Nischenanalyse, Optimierung (1,5 Stunden pro Monat)",
    
    // Package L
    "packages.l.name": "Paket L",
    "packages.l.price": "ab €1.260 (zzgl. MwSt.)",
    "packages.l.tagline": "Maximaler Wachstumsimpact — volles System.",
    "packages.l.inc1": "1 Start-Strategiegespräch",
    "packages.l.inc2": "Konzeptentwicklung + Video-Strategie",
    "packages.l.inc3": "1 Social-Media-Kanal",
    "packages.l.inc4": "8 Videos pro Monat",
    "packages.l.inc5": "Videoschnitt inkl. Untertitel, Soundeffekte, Videoeffekte, Übergänge",
    "packages.l.inc6": "1 Korrekturschleife pro Video",
    "packages.l.inc7": "1 Zwischen-Strategiegespräch",
    "packages.l.inc8": "Redaktionsplan (Szenario, Storyboard)",
    "packages.l.inc9": "Social-Media-Aktivitäten (4 Stunden pro Monat)",
    "packages.l.inc10": "Wettbewerbs- & Nischenanalyse, Optimierung (1,5 Stunden pro Monat)",
    
    // Package Individual
    "packages.individual.name": "Individuell",
    "packages.individual.price": "ab €2.000 (zzgl. MwSt.)",
    "packages.individual.tagline": "Nach dem ersten Gespräch vollständig auf den Kunden zugeschnitten. Für Kunden, die täglichen Content und langfristige Social-Media-Betreuung benötigen.",
    
    // FAQ
    "faq.title": "Häufig gestellte Fragen",
    // Leadroom partnership
    "leadroom.title": "Full-Funnel. Content trifft Performance.",
    "leadroom.subtitle": "ELEDEN arbeitet mit Leadroom — einer Performance-Marketing-Agentur — zusammen, um ein komplettes Wachstumssystem anzubieten: Premium-Content-Produktion kombiniert mit gezielter bezahlter Werbung.",
    "leadroom.eleden.label": "ELEDEN",
    "leadroom.eleden.heading": "Content-Produktion",
    "leadroom.eleden.desc": "Short-Form-Videos, Brand Storytelling und Content-Systeme, die Vertrauen und Autorität in Social Media aufbauen.",
    "leadroom.eleden.tag": "Strategie · Produktion · Schnitt",
    "leadroom.leadroom.label": "Leadroom",
    "leadroom.leadroom.heading": "Performance-Marketing",
    "leadroom.leadroom.desc": "Meta Ads, Google Ads und bezahlte Social-Kampagnen — darauf ausgelegt, Aufmerksamkeit in qualifizierte Leads zu verwandeln.",
    "leadroom.leadroom.tag": "Meta Ads · Google Ads · Retargeting",
    "leadroom.connector": "Zusammen: Content, der konvertiert + Ads, die skalieren",
    "leadroom.cta.title": "Möchten Sie das komplette System?",
    "leadroom.cta.subtitle": "Buchen Sie ein Strategiegespräch — wir prüfen, ob ein kombinierter Ansatz zu Ihren Zielen passt.",
    "leadroom.cta.button": "Strategiegespräch anfragen",
    "faq.q1": "Wie funktioniert die Zusammenarbeit?",
    "faq.a1": "Wir starten mit einem kurzen Strategiegespräch, stimmen Ziele und Positionierung ab und bauen dann ein wiederholbares Content-System. Sie bekommen klare Deliverables, Deadlines und eine monatliche Performance-Schleife.",
    "faq.q2": "Wie läuft die Bezahlung ab?",
    "faq.a2": "Die Zahlung erfolgt im Voraus für den kommenden Monat. Sobald die Rechnung beglichen ist, starten wir die Produktion für diesen Zyklus. Alle Preise verstehen sich zuzüglich Mehrwertsteuer.",
    "faq.q3": "Gibt es eine Mindestvertragslaufzeit?",
    "faq.a3": "Wir empfehlen mindestens 3 Monate, um echtes Momentum und nachhaltige Ergebnisse aufzubauen — verpflichtend ist das aber nicht. Eine monatliche Zusammenarbeit ist ebenfalls möglich, wenn Sie flexibel bleiben möchten.",
    "faq.q4": "Wie funktionieren die Drehs und wo wird gefilmt?",
    "faq.a4": "Dreh und Organisation sind innerhalb Münchens inklusive. Für Orte über 100 km berechnen wir eine kleine Organisationspauschale sowie die Reisezeit zum Stundensatz (Transportkosten nach Aufwand). Auf Wunsch organisieren wir auch einen externen Videografen, den der Kunde direkt bezahlt.",
    "faq.q5": "Wie lange dauert die Produktion?",
    "faq.a5": "Typische Lieferzeit ist 3–7 Tage pro Batch je nach Volumen. Wir optimieren für Konsistenz und Geschwindigkeit ohne Qualitätseinbußen.",
    "faq.q6": "Mit welchen Nischen arbeiten Sie?",
    "faq.a6": "Premium-Dienstleistungen, Immobilien, Hospitality, Personal Brands, Produktlaunches — jedes Unternehmen, das Vertrauen + Leads durch Kurzform will.",
    "faq.q7": "Brauchen Sie Material von uns, oder können Sie mit Kundenmaterial arbeiten?",
    "faq.a7": "Beides. Wir können vor Ort drehen oder remote mit Ihrem vorhandenen Material arbeiten. Wir liefern auch klare Drehanweisungen, wenn Sie selbst filmen möchten.",
    
    // Contact
    "contact.headline1": "Bereit ein Premium",
    "contact.headline2": "Content-System aufzubauen?",
    "contact.subline": "Senden Sie eine Anfrage — wir antworten innerhalb von 24–48 Stunden.",
    "contact.firstName": "Vorname",
    "contact.lastName": "Nachname",
    "contact.lastNameOptional": "Nachname (optional)",
    "contact.companyName": "Firmenname",
    "contact.instagram": "Instagram-Handle",
    "contact.email": "E-Mail",
    "contact.website": "Website",
    "contact.websiteOptional": "Website (optional)",
    "contact.message": "Nachricht",
    "contact.messagePlaceholder": "Erzählen Sie uns kurz von Ihrer Marke und was Sie erreichen möchten...",
    "contact.phone": "Telefon",
    "contact.phoneOptional": "Telefon (optional)",
    "contact.cta": "Strategiegespräch anfragen",
    "contact.microcopy": "Kein Spam. Wir nutzen Ihre Daten nur zur Antwort innerhalb von 24–48 Stunden.",
    "contact.success.title": "Anfrage erhalten",
    "contact.success.body": "Wir melden uns innerhalb von 24–48 Stunden.",
    "contact.sending": "Wird gesendet...",
    "cookies.title": "Ihre Datenschutz-Auswahl",
    "cookies.body": "Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb erforderlich sind. Es werden keine Marketing-, Werbe- oder Tracking-Cookies gesetzt und keine Daten ohne Ihre Einwilligung an Dritte weitergegeben.",
    "cookies.legal": "Mit „Akzeptieren\" bestätigen Sie diesen Hinweis gemäß DSGVO und §25 TTDSG. Die Einwilligung können Sie jederzeit widerrufen. Details:",
    "cookies.privacy": "Datenschutzerklärung",
    "cookies.impressum": "Impressum",
    "cookies.accept": "Akzeptieren",
    "cookies.decline": "Nicht notwendige ablehnen",
    
    // Footer
    "footer.tagline": "Premium Content-Systeme für moderne Unternehmen.",
    "footer.location": "München • Weltweit",
    "footer.nav": "Navigation",
    "footer.legal": "Rechtliches",
    "footer.social": "Soziale Medien",
    "footer.impressum": "Impressum",
    "footer.privacy": "Datenschutz",
    "footer.copyright": "Alle Rechte vorbehalten.",
    "footer.cookieSettings": "Cookie-Einstellungen",
    "footer.trust": "Standort München • Weltweit verfügbar • Antwort innerhalb von 24–48 Stunden",
    
    // About
    "about.headline": "Gründergeführt. Gefertigt in München.",
    "about.p1": "Ich bin ein Content Creator aus der Ukraine, nach München umgezogen wegen des Krieges.",
    "about.p2": "Ich war angestellt und habe dann meine eigene Content-Agentur aufgebaut.",
    "about.p3": "Ich bin auch ein sponsorunterstützter Profi-Radfahrer, was meinen Geschmack für dynamische, stilvolle Inhalte geprägt hat.",
    "about.p4": "Mein Ansatz: stilvoll, ehrlich, schnelle Umsetzung, Premium-Look.",
    "about.closing": "Wenn Sie Premium-Kurzform-Content mit einem klaren System wollen — ELEDEN baut es für Sie.",
    "about.photoPlaceholder": "Fügen Sie Ihr Foto hier ein",

    // Meta Ads Packages
    "meta.title": "Meta-Ads-Pakete",
    "meta.subtitle": "Wählen Sie, wie weit Sie gehen wollen — nur Content oder ein komplettes System, das Ihre Ads von A bis Z betreibt.",
    "meta.toggle.content": "Nur Content",
    "meta.toggle.full": "Komplettes System",
    "meta.popular": "Am beliebtesten",
    "meta.cta": "Paket anfragen",
    "meta.month": "/Monat",
    "meta.note.terms": "Alle Preise zzgl. MwSt. Dreh in München inklusive. Außerhalb Münchens +€100. Videograf wird vom Kunden bezahlt. Mindestlaufzeit 3 Monate.",
    "meta.note.together": "{leadroom} betreibt Ihre Werbekampagnen. {eleden} produziert Ihren Content. Zusammen — ein System.",
    "meta.spark.tagline": "Starten Sie Ihr erstes Ad-System mit klarer Absicht.",
    "meta.spark.features": "5 Reels / Monat|Dreh + Schnitt inklusive|Basis-Werbestrategie|1 Plattform (Meta)|Monatliches Strategiegespräch",
    "meta.surge.tagline": "Skalieren Sie Kreativoutput und Reichweite über Kanäle hinweg.",
    "meta.surge.features": "10 Reels / Monat|Dreh + Schnitt inklusive|Volle Ad-Strategie + Skripting|2 Plattformen (Meta + Google)|Wöchentliche Optimierungs-Calls|A/B-Test-Konzepte",
    "meta.storm.tagline": "Eine komplette Content- & Performance-Maschine.",
    "meta.storm.features": "20 Reels / Monat|Dreh + Schnitt inklusive|Volle Strategie + A/B-Tests|Bis zu 4 Plattformen|Tägliches Monitoring|Eigener Slack-Channel",

    // Build Your System
    "bys.title": "Bauen Sie Ihr System",
    "bys.subtitle": "Drei Schritte zu Ihrer maßgeschneiderten Content- & Ads-Engine.",
    "bys.step1.title": "Schritt 1 — Wählen Sie Ihr Content-Paket",
    "bys.step2.title": "Schritt 2 — Leadroom Ad-Management dazu?",
    "bys.continue": "Weiter",
    "bys.back": "← Zurück",
    "bys.summary": "Zusammenfassung",
    "bys.startover": "Neu starten",
    "bys.request": "Dieses Paket anfragen",
    "bys.your_system": "Ihr System",
    "bys.month": "/Monat",
    "bys.popular": "Am beliebtesten",
    "bys.recommended": "Empfohlen",
    "bys.mode.content": "Nur Content",
    "bys.mode.full": "Content + Ads",
    "bys.mode.content.desc": "Nur Paket {name} — Ihre Content-Engine.",
    "bys.mode.full.desc": "{name} + {leadroom} — Content- & Ad-System.",
    "bys.note.filming": "Dreh in München inklusive ohne Aufpreis. Außerhalb Münchens +€100 für die Drehorganisation (Videograf wird vom Kunden bezahlt).",
    "bys.note.vat": "Alle Preise zzgl. MwSt. Empfohlene Mindestlaufzeit 3 Monate.",
    "bys.spark.reels": "5 Reels / Monat",
    "bys.spark.features": "5 Reels / Monat|Dreh + Schnitt inklusive|Ad-fokussiertes Skripting|Basis-Strategiegespräch",
    "bys.spark.lr.features": "1 Plattform|Kampagnen-Setup|Conversion-Tracking|Wöchentliche Optimierung|Monatliches Reporting",
    "bys.surge.reels": "10 Reels / Monat",
    "bys.surge.features": "10 Reels / Monat|Dreh + Schnitt inklusive|Volle Ad-Strategie + Skripting|A/B-Konzept-Varianten|Wöchentliches Strategiegespräch",
    "bys.surge.lr.features": "2 Plattformen (Meta + Google)|Full-Funnel-Strategie|Server-side Tracking (CAPI)|Wöchentliche Optimierung & Calls|Landingpage-Empfehlungen",
    "bys.storm.reels": "20 Reels / Monat",
    "bys.storm.features": "20 Reels / Monat|Dreh + Schnitt inklusive|Volle Strategie + A/B-Tests|Tägliche Content-Pipeline|Eigene Strategie-Sessions",
    "bys.storm.lr.features": "Bis zu 4 Plattformen|Full-Funnel + Retention-Strategie|Server-side Tracking & GA4|Tägliches Monitoring & wöchentliche Calls|CRO & Landingpage-Tests|Live-Dashboard & Slack-Channel",

    // Why ELEDEN & Leadroom
    "why.title": "Warum ELEDEN & Leadroom?",
    "why.subtitle": "Zwei Spezialisten. Ein System. Echte Ergebnisse.",
    "why.1.title": "Sichtbare Ergebnisse",
    "why.1.text": "Wir produzieren nicht nur Content — wir bauen Systeme, die Leads generieren. Unsere Case Study mit Almeno Immobilien: 200+ qualifizierte Leads in 2 Monaten bei moderatem Werbebudget.",
    "why.2.title": "Preis, der Sinn ergibt",
    "why.2.text": "Komplettpakete ab €999/Monat. Vergleichbare Agenturen in Deutschland verlangen €2.500–4.500 für denselben Umfang. Sie bekommen mehr und zahlen weniger.",
    "why.3.title": "Weltklasse-Standards",
    "why.3.text": "Wir arbeiten nach denselben Produktions- und Performance-Standards wie führende globale Agenturen — angewendet auf Ihr Budget und Ihren Markt.",
    "why.4.title": "Zwei Spezialisten, null Lücken",
    "why.4.text": "ELEDEN kümmert sich um Content. Leadroom um Ads. Keine Übergaben, keine Missverständnisse — ein integriertes Team, das auf Ihr Wachstum hinarbeitet.",
    "why.case.lead": "200+ qualifizierte Leads",
    "why.case.mid": " · 2 Monate · moderates Werbebudget — ",
    "why.case.tail": "Almeno Immobilien",
  },
  
  UA: {
    // Header
    "nav.work": "Роботи",
   "nav.services": "Послуги",
    "nav.contact": "Контакт",
    
    // Hero
    "hero.headline1": "ELEDEN — преміальні",
    "hero.headline2": "контент-системи для",
    "hero.headline3": "сучасного бізнесу.",
    "hero.subhead": "Ми перетворюємо розрізнені ідеї на системи короткометражного відео, що будують довіру до бренду та генерують кваліфіковані запити.",
    "hero.trust": "Мюнхен • Доступні по всьому світу • Відповідь протягом 24–48 годин",
    "hero.cta.primary": "Запросити стратегічний дзвінок",
    "hero.cta.secondary": "Переглянути роботи",
    
    // Outcomes
    "outcomes.title": "Що ви отримуєте",
    "outcomes.01.title": "Присутність бренду",
    "outcomes.01.body": "Преміальна візуальна ідентичність у русі — послідовний контент, що робить ваш бізнес усталеним.",
    "outcomes.02.title": "Контент-система",
    "outcomes.02.body": "Повторюваний виробничий процес: ідеї, сценарії, режисура, монтаж — стабільна доставка.",
    "outcomes.03.title": "Ліди",
    "outcomes.03.body": "Короткометражний контент для конверсії — перетворення уваги на кваліфіковані запити.",
    "outcomes.badge": "Найбільш запитуване",
    
    // Portfolio
    "portfolio.title": "Вибрані роботи",
    "portfolio.subtitle": "Вертикальні рілси, створені щоб продати відчуття — і результат.",
    "portfolio.viewAll": "Більше робіт скоро",
    "portfolio.outcomes": "Ключові результати",
    "portfolio.services": "Що ми зробили",
    "portfolio.cta": "Запросити подібну систему",
    
    // System
    "system.title": "Наша система",
    "system.subtitle": "Чіткий процес, що перетворює контент на передбачуваний актив.",
    "system.01.title": "Стратегія",
    "system.01.desc": "Цілі, аудиторія, позиціонування та кут контенту, що продає.",
    "system.02.title": "Концепція",
    "system.02.desc": "Щотижневі ідеї, розроблені для утримання та довіри.",
    "system.03.title": "Виробництво",
    "system.03.desc": "Зйомки або віддалена режисура — спроектовано для швидкості та якості.",
    "system.04.title": "Монтаж",
    "system.04.desc": "Кінематографічний темп, преміальний колір, чистий звук, готові формати.",
    "system.05.title": "Ітерація",
    "system.05.desc": "Огляд ефективності, коригування та масштабування того, що працює.",
    "system.badge": "Контроль якості",
    
    // Packages
    "packages.title": "Пакети",
    "packages.subtitle": "Оберіть інтенсивність вашого контенту.",
    "packages.includes": "Включено:",
    "packages.notIncluded": "Не включено:",
    "packages.recommended": "Рекомендовано",
    "packages.custom.title": "Індивідуально",
    "packages.custom.desc": "Повністю індивідуально після першого дзвінка. Для клієнтів, яким потрібен щоденний контент та довгострокове ведення соціальних мереж.",
    "packages.cta.s": "Запросити Пакет S",
    "packages.cta.m": "Запросити Пакет M",
    "packages.cta.l": "Запросити Пакет L",
    "packages.cta.custom": "Запросити індивідуальний план",
    "packages.note": "Кожен пакет може бути налаштований та розширений після першого дзвінка.",
    "packages.filming": "Зйомка включена. Локально в Мюнхені — без доплати. Поза Мюнхеном — +100 € за організацію зйомки; відеограф оплачується клієнтом окремо.",
    
    // Package S
    "packages.s.name": "Пакет S",
    "packages.s.price": "від €480 (плюс ПДВ)",
    "packages.s.tagline": "Короткометражні відео (до 1 хвилини). Клієнт знімає контент самостійно.",
    "packages.s.inc1": "1 стартовий стратегічний дзвінок",
    "packages.s.inc2": "Розробка концепції + відео-стратегія",
    "packages.s.inc3": "1 канал соціальних мереж",
    "packages.s.inc4": "4 відео на місяць",
    "packages.s.inc5": "Відеомонтаж вкл. субтитри, звукові ефекти, відеоефекти, переходи",
    "packages.s.inc6": "1 раунд правок на відео",
    "packages.s.inc7": "1 проміжний стратегічний дзвінок",
    "packages.s.not1": "Редакційний план (сценарій, розкадровка)",
    "packages.s.not2": "Активності в соціальних мережах (2 години на місяць)",
    "packages.s.not3": "Аналіз конкурентів та ніші, оптимізація (1,5 години на місяць)",
    
    // Package M
    "packages.m.name": "Пакет M",
    "packages.m.price": "від €870 (плюс ПДВ)",
    "packages.m.tagline": "Для послідовного контенту та реальної генерації лідів.",
    "packages.m.inc1": "1 стартовий стратегічний дзвінок",
    "packages.m.inc2": "Розробка концепції + відео-стратегія",
    "packages.m.inc3": "1 канал соціальних мереж",
    "packages.m.inc4": "6 відео на місяць",
    "packages.m.inc5": "Відеомонтаж вкл. субтитри, звукові ефекти, відеоефекти, переходи",
    "packages.m.inc6": "1 раунд правок на відео",
    "packages.m.inc7": "1 проміжний стратегічний дзвінок",
    "packages.m.inc8": "Редакційний план (сценарій, розкадровка)",
    "packages.m.inc9": "Активності в соціальних мережах (2 години на місяць)",
    "packages.m.not1": "Аналіз конкурентів та ніші, оптимізація (1,5 години на місяць)",
    
    // Package L
    "packages.l.name": "Пакет L",
    "packages.l.price": "від €1260 (плюс ПДВ)",
    "packages.l.tagline": "Максимальний вплив на зростання — повна система.",
    "packages.l.inc1": "1 стартовий стратегічний дзвінок",
    "packages.l.inc2": "Розробка концепції + відео-стратегія",
    "packages.l.inc3": "1 канал соціальних мереж",
    "packages.l.inc4": "8 відео на місяць",
    "packages.l.inc5": "Відеомонтаж вкл. субтитри, звукові ефекти, відеоефекти, переходи",
    "packages.l.inc6": "1 раунд правок на відео",
    "packages.l.inc7": "1 проміжний стратегічний дзвінок",
    "packages.l.inc8": "Редакційний план (сценарій, розкадровка)",
    "packages.l.inc9": "Активності в соціальних мережах (4 години на місяць)",
    "packages.l.inc10": "Аналіз конкурентів та ніші, оптимізація (1,5 години на місяць)",
    
    // Package Individual
    "packages.individual.name": "Індивідуально",
    "packages.individual.price": "від €2000 (плюс ПДВ)",
    "packages.individual.tagline": "Повністю індивідуально після першого дзвінка. Для клієнтів, яким потрібен щоденний контент та довгострокове ведення соціальних мереж.",
    
    // FAQ
    "faq.title": "Часті запитання",
    // Leadroom partnership
    "leadroom.title": "Повна воронка. Контент зустрічає перформанс.",
    "leadroom.subtitle": "ELEDEN співпрацює з Leadroom — агенцією перформанс-маркетингу — щоб запропонувати повну систему росту: преміальне виробництво контенту в поєднанні з таргетованою платною рекламою.",
    "leadroom.eleden.label": "ELEDEN",
    "leadroom.eleden.heading": "Виробництво контенту",
    "leadroom.eleden.desc": "Короткі відео, бренд-сторітелінг і контент-системи, які будують довіру та авторитет у соціальних мережах.",
    "leadroom.eleden.tag": "Стратегія · Продакшн · Монтаж",
    "leadroom.leadroom.label": "Leadroom",
    "leadroom.leadroom.heading": "Перформанс-маркетинг",
    "leadroom.leadroom.desc": "Meta Ads, Google Ads і платні соціальні кампанії — створені, щоб перетворити увагу на кваліфіковані ліди.",
    "leadroom.leadroom.tag": "Meta Ads · Google Ads · Ретаргетинг",
    "leadroom.connector": "Разом: контент, що конвертує + реклама, що масштабує",
    "leadroom.cta.title": "Хочете повну систему?",
    "leadroom.cta.subtitle": "Забронюйте стратегічний дзвінок — ми оцінимо, чи комбінований підхід підходить вашим цілям.",
    "leadroom.cta.button": "Замовити стратегічний дзвінок",
    "faq.q1": "Як працює співпраця?",
    "faq.a1": "Ми починаємо з короткого стратегічного дзвінка, узгоджуємо цілі та позиціонування, потім будуємо повторювану контент-систему. Ви отримуєте чіткі результати, дедлайни та щомісячний цикл ефективності.",
    "faq.q2": "Як відбувається оплата?",
    "faq.a2": "Оплата здійснюється наперед за наступний місяць. Після отримання оплати ми стартуємо виробництво на цей цикл. Усі ціни вказані без ПДВ.",
    "faq.q3": "Чи є мінімальний термін контракту?",
    "faq.a3": "Ми рекомендуємо мінімум 3 місяці, щоб набрати реальний імпульс і побачити накопичувальний ефект — але це не обовʼязково. Можна працювати й помісячно, якщо ви хочете залишатися гнучкими.",
    "faq.q4": "Як відбуваються зйомки і де ви знімаєте?",
    "faq.a4": "Зйомка та її організація включені локально по Мюнхену. Для локацій понад 100 км ми додаємо невелику плату за організацію та оплачуємо час у дорозі за годинною ставкою (транспортні витрати за фактом). За бажанням можемо організувати зйомку з зовнішнім відеографом, оплату якого клієнт здійснює напряму.",
    "faq.q5": "Скільки часу займає виробництво?",
    "faq.a5": "Типовий термін — 3–7 днів на партію залежно від обсягу. Ми оптимізуємо для послідовності та швидкості без шкоди якості.",
    "faq.q6": "З якими нішами ви працюєте?",
    "faq.a6": "Преміум-послуги, нерухомість, готельний бізнес, персональні бренди, запуски продуктів — будь-який бізнес, який хоче довіру + ліди через короткий формат.",
    "faq.q7": "Вам потрібен матеріал від нас, чи ви можете працювати з матеріалами клієнта?",
    "faq.a7": "Обидва варіанти. Ми можемо знімати на локації або працювати віддалено з вашими наявними матеріалами. Ми також надаємо чіткі інструкції для зйомки, якщо ви хочете знімати самостійно.",
    
    // Contact
    "contact.headline1": "Готові побудувати преміальну",
    "contact.headline2": "контент-систему?",
    "contact.subline": "Надішліть запит — ми відповімо протягом 24–48 годин.",
    "contact.firstName": "Ім'я",
    "contact.lastName": "Прізвище",
    "contact.lastNameOptional": "Прізвище (необов'язково)",
    "contact.companyName": "Назва компанії",
    "contact.instagram": "Instagram",
    "contact.email": "Email",
    "contact.website": "Веб-сайт",
    "contact.websiteOptional": "Веб-сайт (необов'язково)",
    "contact.message": "Повідомлення",
    "contact.messagePlaceholder": "Розкажіть коротко про ваш бренд і чого ви хочете досягти...",
    "contact.phone": "Телефон",
    "contact.phoneOptional": "Телефон (необов'язково)",
    "contact.cta": "Запросити стратегічний дзвінок",
    "contact.microcopy": "Без спаму. Ми використовуємо ваші дані лише для відповіді протягом 24–48 годин.",
    "contact.success.title": "Запит отримано",
    "contact.success.body": "Ми зв'яжемося з вами протягом 24–48 годин.",
    "contact.sending": "Надсилаємо...",
    "cookies.title": "Ваш вибір приватності",
    "cookies.body": "Цей сайт використовує лише суворо необхідні cookies для роботи сайту. Ми не встановлюємо маркетингові, рекламні чи трекінгові cookies та не передаємо дані третім сторонам без вашої згоди.",
    "cookies.legal": "Натискаючи „Прийняти\", ви підтверджуєте це повідомлення. Згоду можна відкликати будь-коли. Деталі:",
    "cookies.privacy": "Політика конфіденційності",
    "cookies.impressum": "Імпресум",
    "cookies.accept": "Прийняти",
    "cookies.decline": "Відхилити необов'язкові",
    
    // Footer
    "footer.tagline": "Преміальні контент-системи для сучасного бізнесу.",
    "footer.location": "Мюнхен • По всьому світу",
    "footer.nav": "Навігація",
    "footer.legal": "Правова інформація",
    "footer.social": "Соціальні мережі",
    "footer.impressum": "Імпресум",
    "footer.privacy": "Конфіденційність",
    "footer.copyright": "Всі права захищені.",
    "footer.cookieSettings": "Налаштування cookies",
    "footer.trust": "Мюнхен • Доступні по всьому світу • Відповідь протягом 24–48 годин",
    
    // About
    "about.headline": "Засновник на чолі. Створено в Мюнхені.",
    "about.p1": "Я контент-креатор з України, переїхав до Мюнхена через війну.",
    "about.p2": "Я працював за наймом, а потім побудував власну контент-агенцію.",
    "about.p3": "Я також професійний велогонщик зі спонсорською підтримкою, що сформувало мій смак до динамічного, стильного контенту.",
    "about.p4": "Мій підхід: стильно, чесно, швидке виконання, преміальний вигляд.",
    "about.closing": "Якщо ви хочете преміальний короткометражний контент з чіткою системою — ELEDEN створить його для вас.",
    "about.photoPlaceholder": "Додайте своє фото сюди",

    // Meta Ads Packages
    "meta.title": "Пакети Meta Ads",
    "meta.subtitle": "Оберіть, як далеко ви хочете піти — лише контент чи повна система, що веде ваші рекламні кампанії від А до Я.",
    "meta.toggle.content": "Тільки контент",
    "meta.toggle.full": "Повна система",
    "meta.popular": "Найпопулярніше",
    "meta.cta": "Замовити пакет",
    "meta.month": "/місяць",
    "meta.note.terms": "Усі ціни без ПДВ. Зйомка в Мюнхені включена. Поза Мюнхеном +€100. Відеограф оплачується клієнтом. Мінімум 3 місяці.",
    "meta.note.together": "{leadroom} веде ваші рекламні кампанії. {eleden} створює ваш контент. Разом — одна система.",
    "meta.spark.tagline": "Запустіть свою першу рекламну систему з чіткою метою.",
    "meta.spark.features": "5 Reels / місяць|Зйомка + монтаж включені|Базова рекламна стратегія|1 платформа (Meta)|Щомісячний стратегічний дзвінок",
    "meta.surge.tagline": "Масштабуйте креативний вихід і охоплення по каналах.",
    "meta.surge.features": "10 Reels / місяць|Зйомка + монтаж включені|Повна рекламна стратегія + сценарії|2 платформи (Meta + Google)|Щотижневі дзвінки з оптимізації|A/B-тестування концепцій",
    "meta.storm.tagline": "Повноцінна машина контенту та перформансу.",
    "meta.storm.features": "20 Reels / місяць|Зйомка + монтаж включені|Повна стратегія + A/B-тести|До 4 платформ|Щоденний моніторинг|Виділений Slack-канал",

    // Build Your System
    "bys.title": "Зберіть свою систему",
    "bys.subtitle": "Три кроки до вашої власної контент- та рекламної системи.",
    "bys.step1.title": "Крок 1 — Оберіть контент-пакет",
    "bys.step2.title": "Крок 2 — Додати керування рекламою від Leadroom?",
    "bys.continue": "Далі",
    "bys.back": "← Назад",
    "bys.summary": "Підсумок",
    "bys.startover": "Почати спочатку",
    "bys.request": "Замовити цей пакет",
    "bys.your_system": "Ваша система",
    "bys.month": "/місяць",
    "bys.popular": "Найпопулярніше",
    "bys.recommended": "Рекомендовано",
    "bys.mode.content": "Тільки контент",
    "bys.mode.full": "Контент + Реклама",
    "bys.mode.content.desc": "Лише пакет {name} — ваша контент-система.",
    "bys.mode.full.desc": "{name} + {leadroom} — контент- та рекламна система.",
    "bys.note.filming": "Зйомка по Мюнхену включена без доплат. Поза Мюнхеном +€100 за організацію зйомки (відеограф оплачується клієнтом).",
    "bys.note.vat": "Усі ціни без ПДВ. Рекомендований мінімум — 3 місяці.",
    "bys.spark.reels": "5 Reels / місяць",
    "bys.spark.features": "5 Reels / місяць|Зйомка + монтаж включені|Сценарії під рекламу|Базовий стратегічний дзвінок",
    "bys.spark.lr.features": "1 платформа|Налаштування кампаній|Трекінг конверсій|Щотижнева оптимізація|Щомісячний звіт",
    "bys.surge.reels": "10 Reels / місяць",
    "bys.surge.features": "10 Reels / місяць|Зйомка + монтаж включені|Повна рекламна стратегія + сценарії|A/B-варіації концепцій|Щотижневий стратегічний дзвінок",
    "bys.surge.lr.features": "2 платформи (Meta + Google)|Стратегія повної воронки|Серверний трекінг (CAPI)|Щотижнева оптимізація та дзвінки|Рекомендації по лендингах",
    "bys.storm.reels": "20 Reels / місяць",
    "bys.storm.features": "20 Reels / місяць|Зйомка + монтаж включені|Повна стратегія + A/B-тести|Щоденний контент-пайплайн|Виділені стратегічні сесії",
    "bys.storm.lr.features": "До 4 платформ|Повна воронка + стратегія утримання|Серверний трекінг та GA4|Щоденний моніторинг та щотижневі дзвінки|CRO та тести лендингів|Live-дашборд та Slack-канал",

    // Why ELEDEN & Leadroom
    "why.title": "Чому ELEDEN & Leadroom?",
    "why.subtitle": "Два спеціалісти. Одна система. Реальні результати.",
    "why.1.title": "Результати, які видно",
    "why.1.text": "Ми не просто виробляємо контент — ми будуємо системи, які генерують ліди. Наш кейс із Almeno Immobilien: 200+ кваліфікованих лідів за 2 місяці на скромному рекламному бюджеті.",
    "why.2.title": "Ціна, яка має сенс",
    "why.2.text": "Пакети повної системи від €999/місяць. Порівнянні агенції в Німеччині беруть €2 500–4 500 за той самий обсяг. Ви отримуєте більше, платите менше.",
    "why.3.title": "Стандарти світового рівня",
    "why.3.text": "Ми працюємо за тими ж стандартами продакшну та перформансу, що й топові глобальні агенції — адаптованими до вашого бюджету та ринку.",
    "why.4.title": "Два спеціалісти, нуль розривів",
    "why.4.text": "ELEDEN відповідає за контент. Leadroom — за рекламу. Без передач, без непорозумінь — одна інтегрована команда, яка працює на ваш ріст.",
    "why.case.lead": "200+ кваліфікованих лідів",
    "why.case.mid": " · 2 місяці · скромний рекламний бюджет — ",
    "why.case.tail": "Almeno Immobilien",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_KEY = "eleden_lang";

const detectLanguage = (): Language => {
  if (typeof window === "undefined") return "EN";
  try {
    const stored = localStorage.getItem(LANG_KEY) as Language | null;
    if (stored === "EN" || stored === "DE" || stored === "UA") return stored;
  } catch { /* ignore */ }
  const langs = (navigator.languages?.length ? navigator.languages : [navigator.language]) || [];
  for (const raw of langs) {
    const l = (raw || "").toLowerCase();
    if (l.startsWith("de")) return "DE";
    if (l.startsWith("uk") || l.startsWith("ua") || l.startsWith("ru")) return "UA";
    if (l.startsWith("en")) return "EN";
  }
  return "EN";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  const setLanguage = (lang: Language) => {
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
