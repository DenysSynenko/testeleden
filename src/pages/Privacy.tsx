import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/eleden/Header";

const Privacy = () => {
  const { language } = useLanguage();

  const content = {
    EN: {
      title: "Privacy Policy",
      backText: "Back to home",
      lastUpdated: "Last updated: February 2025",
      sections: [
        {
          title: "1. Data Controller",
          content: `The data controller responsible for data processing on this website is:

Denys Synenko Medienproduktion
Berg-am-Laim-Str. 73
81673 München, Germany
Email: denissinenko31@gmail.com`
        },
        {
          title: "2. Data Collection via Contact Form",
          content: `When you submit an inquiry through our contact form, we collect and process the following personal data:

• First name (required)
• Last name (optional)
• Company name (required)
• Instagram handle (required)
• Email address (required)
• Website (optional)
• Goal — Brand / Leads / Both (required)
• Monthly budget (required)
• Timeline (required)
• Message content (required)

This data is collected solely for the purpose of responding to your inquiry and providing our services.`
        },
        {
          title: "3. Purpose and Legal Basis",
          content: `We process your personal data for the following purposes:

• Responding to your inquiries and requests
• Evaluating potential collaboration opportunities
• Providing our content creation services

Legal basis for processing:
• GDPR Art. 6(1)(b): Processing necessary for the performance of a contract or pre-contractual measures
• GDPR Art. 6(1)(f): Processing based on our legitimate interest in responding to business inquiries

We will only use your data for marketing purposes with your explicit consent.`
        },
        {
          title: "4. Data Retention",
          content: `We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:

• Contact form submissions: Retained for the duration of our business relationship, plus any legally required retention period (typically 6–10 years for business correspondence under German commercial law)
• If no business relationship is established: Data is deleted within 6 months after the last contact

You may request earlier deletion at any time, subject to legal retention requirements.`
        },
        {
          title: "5. Your Rights",
          content: `Under GDPR, you have the following rights:

• Right of access (Art. 15): Obtain information about your stored data
• Right to rectification (Art. 16): Correct inaccurate data
• Right to erasure (Art. 17): Request deletion of your data ("right to be forgotten")
• Right to restriction (Art. 18): Limit the processing of your data
• Right to data portability (Art. 20): Receive your data in a structured format
• Right to object (Art. 21): Object to processing based on legitimate interests

To exercise any of these rights, please contact us at denissinenko31@gmail.com. We will respond within 30 days.`
        },
        {
          title: "6. Data Security",
          content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Data transmission via our contact form is encrypted using TLS/SSL technology.`
        },
        {
          title: "7. Cookies",
          content: `This website uses only technically necessary cookies that are essential for the functioning of the website. We do not use tracking or marketing cookies. No consent is required for these essential cookies under GDPR.`
        },
        {
          title: "8. Third-Party Services",
          content: `This website may use third-party services for hosting and functionality. These services may process your data as described in their respective privacy policies. We ensure that any third-party processors comply with GDPR requirements.`
        },
        {
          title: "9. Right to Lodge a Complaint",
          content: `You have the right to lodge a complaint with a supervisory authority if you believe that the processing of your personal data violates data protection regulations.

The competent supervisory authority for Bavaria is:
Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
Promenade 18, 91522 Ansbach, Germany
Website: www.lda.bayern.de`
        },
        {
          title: "10. Contact",
          content: `If you have any questions about this privacy policy or our data practices, please contact us at:

Email: denissinenko31@gmail.com`
        }
      ]
    },
    DE: {
      title: "Datenschutzerklärung",
      backText: "Zurück zur Startseite",
      lastUpdated: "Zuletzt aktualisiert: Februar 2025",
      sections: [
        {
          title: "1. Verantwortlicher",
          content: `Verantwortlicher für die Datenverarbeitung auf dieser Website ist:

Denys Synenko Medienproduktion
Berg-am-Laim-Str. 73
81673 München, Deutschland
E-Mail: denissinenko31@gmail.com`
        },
        {
          title: "2. Datenerfassung über das Kontaktformular",
          content: `Wenn Sie eine Anfrage über unser Kontaktformular senden, erheben und verarbeiten wir folgende personenbezogene Daten:

• Vorname (Pflichtfeld)
• Nachname (optional)
• Firmenname (Pflichtfeld)
• Instagram-Handle (Pflichtfeld)
• E-Mail-Adresse (Pflichtfeld)
• Website (optional)
• Ziel — Marke / Leads / Beides (Pflichtfeld)
• Monatliches Budget (Pflichtfeld)
• Zeitrahmen (Pflichtfeld)
• Nachrichteninhalt (Pflichtfeld)

Diese Daten werden ausschließlich zum Zweck der Beantwortung Ihrer Anfrage und zur Erbringung unserer Dienstleistungen erhoben.`
        },
        {
          title: "3. Zweck und Rechtsgrundlage",
          content: `Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken:

• Beantwortung Ihrer Anfragen
• Bewertung potenzieller Zusammenarbeitsmöglichkeiten
• Erbringung unserer Content-Erstellungsdienstleistungen

Rechtsgrundlage der Verarbeitung:
• DSGVO Art. 6 Abs. 1 lit. b: Verarbeitung zur Durchführung vorvertraglicher Maßnahmen oder Vertragserfüllung
• DSGVO Art. 6 Abs. 1 lit. f: Verarbeitung auf Grundlage unseres berechtigten Interesses an der Beantwortung geschäftlicher Anfragen

Für Marketingzwecke verwenden wir Ihre Daten nur mit Ihrer ausdrücklichen Einwilligung.`
        },
        {
          title: "4. Datenspeicherung",
          content: `Wir speichern Ihre personenbezogenen Daten nur so lange, wie es zur Erfüllung der Zwecke erforderlich ist:

• Kontaktformular-Anfragen: Aufbewahrung für die Dauer der Geschäftsbeziehung, zuzüglich gesetzlich vorgeschriebener Aufbewahrungsfristen (typischerweise 6–10 Jahre für Geschäftskorrespondenz nach deutschem Handelsrecht)
• Bei Nichtzustandekommen einer Geschäftsbeziehung: Löschung innerhalb von 6 Monaten nach dem letzten Kontakt

Sie können jederzeit eine frühere Löschung verlangen, vorbehaltlich gesetzlicher Aufbewahrungspflichten.`
        },
        {
          title: "5. Ihre Rechte",
          content: `Nach der DSGVO haben Sie folgende Rechte:

• Auskunftsrecht (Art. 15): Informationen über Ihre gespeicherten Daten erhalten
• Recht auf Berichtigung (Art. 16): Unrichtige Daten korrigieren
• Recht auf Löschung (Art. 17): Löschung Ihrer Daten verlangen („Recht auf Vergessenwerden")
• Recht auf Einschränkung (Art. 18): Verarbeitung Ihrer Daten einschränken
• Recht auf Datenübertragbarkeit (Art. 20): Ihre Daten in strukturiertem Format erhalten
• Widerspruchsrecht (Art. 21): Verarbeitung auf Grundlage berechtigter Interessen widersprechen

Um eines dieser Rechte auszuüben, kontaktieren Sie uns bitte unter denissinenko31@gmail.com. Wir werden innerhalb von 30 Tagen antworten.`
        },
        {
          title: "6. Datensicherheit",
          content: `Wir setzen angemessene technische und organisatorische Maßnahmen um, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen. Die Datenübertragung über unser Kontaktformular ist mittels TLS/SSL-Technologie verschlüsselt.`
        },
        {
          title: "7. Cookies",
          content: `Diese Website verwendet nur technisch notwendige Cookies, die für das Funktionieren der Website unerlässlich sind. Wir verwenden keine Tracking- oder Marketing-Cookies. Für diese essenziellen Cookies ist nach DSGVO keine Einwilligung erforderlich.`
        },
        {
          title: "8. Drittanbieter-Dienste",
          content: `Diese Website kann Drittanbieter-Dienste für Hosting und Funktionalität nutzen. Diese Dienste können Ihre Daten gemäß ihren jeweiligen Datenschutzrichtlinien verarbeiten. Wir stellen sicher, dass alle Drittanbieter-Auftragsverarbeiter die DSGVO-Anforderungen erfüllen.`
        },
        {
          title: "9. Beschwerderecht",
          content: `Sie haben das Recht, bei einer Aufsichtsbehörde Beschwerde einzulegen, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzvorschriften verstößt.

Die zuständige Aufsichtsbehörde für Bayern ist:
Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
Promenade 18, 91522 Ansbach, Deutschland
Website: www.lda.bayern.de`
        },
        {
          title: "10. Kontakt",
          content: `Wenn Sie Fragen zu dieser Datenschutzerklärung oder unseren Datenpraktiken haben, kontaktieren Sie uns bitte unter:

E-Mail: denissinenko31@gmail.com`
        }
      ]
    },
    UA: {
      title: "Політика конфіденційності",
      backText: "Назад на головну",
      lastUpdated: "Останнє оновлення: лютий 2025",
      sections: [
        {
          title: "1. Контролер даних",
          content: `Контролером даних, відповідальним за обробку даних на цьому веб-сайті, є:

Denys Synenko Medienproduktion
Berg-am-Laim-Str. 73
81673 Мюнхен, Німеччина
Email: denissinenko31@gmail.com`
        },
        {
          title: "2. Збір даних через контактну форму",
          content: `Коли ви надсилаєте запит через нашу контактну форму, ми збираємо та обробляємо такі персональні дані:

• Ім'я (обов'язково)
• Прізвище (необов'язково)
• Назва компанії (обов'язково)
• Instagram (обов'язково)
• Електронна адреса (обов'язково)
• Веб-сайт (необов'язково)
• Мета — Бренд / Ліди / Обидва (обов'язково)
• Місячний бюджет (обов'язково)
• Терміни (обов'язково)
• Зміст повідомлення (обов'язково)

Ці дані збираються виключно для відповіді на ваш запит та надання наших послуг.`
        },
        {
          title: "3. Мета та правова основа",
          content: `Ми обробляємо ваші персональні дані з такою метою:

• Відповіді на ваші запити
• Оцінка потенційних можливостей співпраці
• Надання послуг зі створення контенту

Правова основа обробки:
• GDPR Ст. 6(1)(b): Обробка, необхідна для виконання договору або переддоговірних заходів
• GDPR Ст. 6(1)(f): Обробка на основі нашого законного інтересу у відповіді на бізнес-запити

Ми використовуватимемо ваші дані для маркетингових цілей лише за вашою явною згодою.`
        },
        {
          title: "4. Зберігання даних",
          content: `Ми зберігаємо ваші персональні дані лише стільки, скільки необхідно для досягнення цілей:

• Запити через контактну форму: зберігаються протягом ділових відносин, плюс законодавчо встановлений термін зберігання (зазвичай 6–10 років для ділового листування за німецьким торговим правом)
• Якщо ділові відносини не встановлено: дані видаляються протягом 6 місяців після останнього контакту

Ви можете в будь-який час запитати дострокове видалення, з урахуванням вимог законодавства щодо зберігання.`
        },
        {
          title: "5. Ваші права",
          content: `Згідно з GDPR, ви маєте такі права:

• Право доступу (Ст. 15): отримати інформацію про ваші збережені дані
• Право на виправлення (Ст. 16): виправити неточні дані
• Право на видалення (Ст. 17): запитати видалення ваших даних («право бути забутим»)
• Право на обмеження (Ст. 18): обмежити обробку ваших даних
• Право на перенесення даних (Ст. 20): отримати ваші дані у структурованому форматі
• Право на заперечення (Ст. 21): заперечувати обробку на основі законних інтересів

Щоб скористатися будь-яким з цих прав, зв'яжіться з нами за адресою denissinenko31@gmail.com. Ми відповімо протягом 30 днів.`
        },
        {
          title: "6. Безпека даних",
          content: `Ми впроваджуємо відповідні технічні та організаційні заходи для захисту ваших персональних даних від несанкціонованого доступу, зміни, розкриття або знищення. Передача даних через нашу контактну форму шифрується за допомогою технології TLS/SSL.`
        },
        {
          title: "7. Файли cookie",
          content: `Цей веб-сайт використовує лише технічно необхідні файли cookie, які є важливими для функціонування веб-сайту. Ми не використовуємо файли cookie для відстеження або маркетингу. Для цих основних файлів cookie згода за GDPR не потрібна.`
        },
        {
          title: "8. Сторонні сервіси",
          content: `Цей веб-сайт може використовувати сторонні сервіси для хостингу та функціональності. Ці сервіси можуть обробляти ваші дані відповідно до їхніх політик конфіденційності. Ми забезпечуємо, що всі сторонні обробники відповідають вимогам GDPR.`
        },
        {
          title: "9. Право на скаргу",
          content: `Ви маєте право подати скаргу до наглядового органу, якщо вважаєте, що обробка ваших персональних даних порушує законодавство про захист даних.

Компетентний наглядовий орган для Баварії:
Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
Promenade 18, 91522 Ansbach, Німеччина
Веб-сайт: www.lda.bayern.de`
        },
        {
          title: "10. Контакт",
          content: `Якщо у вас є запитання щодо цієї політики конфіденційності або наших практик роботи з даними, зв'яжіться з нами:

Email: denissinenko31@gmail.com`
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="noise-overlay" />
      <Header />
      
      {/* Background glows */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-glow-mint opacity-15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-glow-champagne opacity-10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-32">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{currentContent.backText}</span>
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-4"
        >
          {currentContent.title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground mb-16"
        >
          {currentContent.lastUpdated}
        </motion.p>

        {/* Sections */}
        <div className="space-y-8">
          {currentContent.sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="border-b border-white/[0.06] pb-8 last:border-0"
            >
              <h2 className="font-display text-xl font-semibold mb-4 text-foreground">
                {section.title}
              </h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
