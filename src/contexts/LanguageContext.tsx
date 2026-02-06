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
    "portfolio.viewAll": "View all work",
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
    "faq.q1": "How does the collaboration work?",
    "faq.a1": "We start with a short strategy call, align goals and positioning, then build a repeatable content system. You get clear deliverables, deadlines, and a monthly performance loop.",
    "faq.q2": "Do you need footage from us, or can you work with client materials?",
    "faq.a2": "Both. We can shoot on location (Munich + travel) or work remotely using your materials. We also provide clear shooting direction if you want to film in-house.",
    "faq.q3": "How long does production take?",
    "faq.a3": "Typical turnaround is 3–7 days per batch depending on volume. We optimize for consistency and speed without sacrificing quality.",
    "faq.q4": "Which niches do you work with?",
    "faq.a4": "Premium services, real estate, hospitality, personal brands, product launches — any business that wants trust + leads through short-form.",
    "faq.q5": "Is there a minimum commitment period?",
    "faq.a5": "Recommended minimum is 2–3 months to build momentum. Longer collaboration produces stronger compounding results.",
    
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
    "contact.goal": "Goal",
    "contact.budget": "Monthly budget",
    "contact.timeline": "Timeline",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me what you sell and what result you want.",
    "contact.select": "Select",
    "contact.cta": "Request a strategy call",
    "contact.microcopy": "No spam. We only use your details to reply within 24–48 hours.",
    "contact.success.title": "Request received",
    "contact.success.body": "We'll get back to you within 24–48 hours.",
    "contact.sending": "Sending...",
    
    // Footer
    "footer.tagline": "Premium content systems for modern businesses.",
    "footer.location": "Munich • Worldwide",
    "footer.nav": "Navigation",
    "footer.legal": "Legal",
    "footer.social": "Social",
    "footer.impressum": "Impressum",
    "footer.privacy": "Privacy",
    "footer.copyright": "All rights reserved.",
    "footer.trust": "Based in Munich • Available worldwide • Reply within 24–48 hours",
    
    // About
    "about.headline": "Founder-led. Crafted in Munich.",
    "about.p1": "I'm a content creator from Ukraine, relocated to Munich because of the war.",
    "about.p2": "I worked in employment and then built my own content agency.",
    "about.p3": "I'm also a sponsor-backed professional cyclist, which shaped my taste for dynamic, stylish content.",
    "about.p4": "My approach: stylish, honest, fast execution, premium look.",
    "about.closing": "If you want premium short-form content with a clear system — ELEDEN builds it for you.",
    "about.photoPlaceholder": "Add your photo here",
  },
  
  DE: {
    // Header
    "nav.work": "Arbeiten",
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
    "portfolio.viewAll": "Alle Arbeiten ansehen",
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
    "faq.q1": "Wie funktioniert die Zusammenarbeit?",
    "faq.a1": "Wir starten mit einem kurzen Strategiegespräch, stimmen Ziele und Positionierung ab und bauen dann ein wiederholbares Content-System. Sie bekommen klare Deliverables, Deadlines und eine monatliche Performance-Schleife.",
    "faq.q2": "Brauchen Sie Material von uns, oder können Sie mit Kundenmaterial arbeiten?",
    "faq.a2": "Beides. Wir können vor Ort drehen (München + Reise) oder remote mit Ihrem Material arbeiten. Wir bieten auch klare Drehanweisungen, wenn Sie selbst filmen möchten.",
    "faq.q3": "Wie lange dauert die Produktion?",
    "faq.a3": "Typische Lieferzeit ist 3–7 Tage pro Batch je nach Volumen. Wir optimieren für Konsistenz und Geschwindigkeit ohne Qualitätseinbußen.",
    "faq.q4": "Mit welchen Nischen arbeiten Sie?",
    "faq.a4": "Premium-Dienstleistungen, Immobilien, Hospitality, Personal Brands, Produktlaunches — jedes Unternehmen, das Vertrauen + Leads durch Kurzform will.",
    "faq.q5": "Gibt es eine Mindestvertragslaufzeit?",
    "faq.a5": "Empfohlenes Minimum ist 2–3 Monate um Momentum aufzubauen. Längere Zusammenarbeit produziert stärkere Compound-Effekte.",
    
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
    "contact.goal": "Ziel",
    "contact.budget": "Monatliches Budget",
    "contact.timeline": "Zeitrahmen",
    "contact.message": "Nachricht",
    "contact.messagePlaceholder": "Erzählen Sie mir, was Sie verkaufen und welches Ergebnis Sie wollen.",
    "contact.select": "Auswählen",
    "contact.cta": "Strategiegespräch anfragen",
    "contact.microcopy": "Kein Spam. Wir nutzen Ihre Daten nur zur Antwort innerhalb von 24–48 Stunden.",
    "contact.success.title": "Anfrage erhalten",
    "contact.success.body": "Wir melden uns innerhalb von 24–48 Stunden.",
    "contact.sending": "Wird gesendet...",
    
    // Footer
    "footer.tagline": "Premium Content-Systeme für moderne Unternehmen.",
    "footer.location": "München • Weltweit",
    "footer.nav": "Navigation",
    "footer.legal": "Rechtliches",
    "footer.social": "Soziale Medien",
    "footer.impressum": "Impressum",
    "footer.privacy": "Datenschutz",
    "footer.copyright": "Alle Rechte vorbehalten.",
    "footer.trust": "Standort München • Weltweit verfügbar • Antwort innerhalb von 24–48 Stunden",
    
    // About
    "about.headline": "Gründergeführt. Gefertigt in München.",
    "about.p1": "Ich bin ein Content Creator aus der Ukraine, nach München umgezogen wegen des Krieges.",
    "about.p2": "Ich war angestellt und habe dann meine eigene Content-Agentur aufgebaut.",
    "about.p3": "Ich bin auch ein sponsorunterstützter Profi-Radfahrer, was meinen Geschmack für dynamische, stilvolle Inhalte geprägt hat.",
    "about.p4": "Mein Ansatz: stilvoll, ehrlich, schnelle Umsetzung, Premium-Look.",
    "about.closing": "Wenn Sie Premium-Kurzform-Content mit einem klaren System wollen — ELEDEN baut es für Sie.",
    "about.photoPlaceholder": "Fügen Sie Ihr Foto hier ein",
  },
  
  UA: {
    // Header
    "nav.work": "Роботи",
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
    "portfolio.viewAll": "Переглянути всі роботи",
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
    "faq.q1": "Як працює співпраця?",
    "faq.a1": "Ми починаємо з короткого стратегічного дзвінка, узгоджуємо цілі та позиціонування, потім будуємо повторювану контент-систему. Ви отримуєте чіткі результати, дедлайни та щомісячний цикл ефективності.",
    "faq.q2": "Вам потрібен матеріал від нас, чи ви можете працювати з матеріалами клієнта?",
    "faq.a2": "Обидва варіанти. Ми можемо знімати на локації (Мюнхен + подорожі) або працювати віддалено з вашими матеріалами. Ми також надаємо чіткі інструкції для зйомки, якщо ви хочете знімати самостійно.",
    "faq.q3": "Скільки часу займає виробництво?",
    "faq.a3": "Типовий термін — 3–7 днів на партію залежно від обсягу. Ми оптимізуємо для послідовності та швидкості без шкоди якості.",
    "faq.q4": "З якими нішами ви працюєте?",
    "faq.a4": "Преміум-послуги, нерухомість, готельний бізнес, персональні бренди, запуски продуктів — будь-який бізнес, який хоче довіру + ліди через короткий формат.",
    "faq.q5": "Чи є мінімальний термін співпраці?",
    "faq.a5": "Рекомендований мінімум — 2–3 місяці для набору імпульсу. Довша співпраця дає сильніші накопичувальні результати.",
    
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
    "contact.goal": "Мета",
    "contact.budget": "Місячний бюджет",
    "contact.timeline": "Терміни",
    "contact.message": "Повідомлення",
    "contact.messagePlaceholder": "Розкажіть, що ви продаєте і який результат хочете.",
    "contact.select": "Обрати",
    "contact.cta": "Запросити стратегічний дзвінок",
    "contact.microcopy": "Без спаму. Ми використовуємо ваші дані лише для відповіді протягом 24–48 годин.",
    "contact.success.title": "Запит отримано",
    "contact.success.body": "Ми зв'яжемося з вами протягом 24–48 годин.",
    "contact.sending": "Надсилаємо...",
    
    // Footer
    "footer.tagline": "Преміальні контент-системи для сучасного бізнесу.",
    "footer.location": "Мюнхен • По всьому світу",
    "footer.nav": "Навігація",
    "footer.legal": "Правова інформація",
    "footer.social": "Соціальні мережі",
    "footer.impressum": "Імпресум",
    "footer.privacy": "Конфіденційність",
    "footer.copyright": "Всі права захищені.",
    "footer.trust": "Мюнхен • Доступні по всьому світу • Відповідь протягом 24–48 годин",
    
    // About
    "about.headline": "Засновник на чолі. Створено в Мюнхені.",
    "about.p1": "Я контент-креатор з України, переїхав до Мюнхена через війну.",
    "about.p2": "Я працював за наймом, а потім побудував власну контент-агенцію.",
    "about.p3": "Я також професійний велогонщик зі спонсорською підтримкою, що сформувало мій смак до динамічного, стильного контенту.",
    "about.p4": "Мій підхід: стильно, чесно, швидке виконання, преміальний вигляд.",
    "about.closing": "Якщо ви хочете преміальний короткометражний контент з чіткою системою — ELEDEN створить його для вас.",
    "about.photoPlaceholder": "Додайте своє фото сюди",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("EN");

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
