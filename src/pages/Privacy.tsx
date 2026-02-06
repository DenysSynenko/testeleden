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
Email: aiproductionsub@gmail.com`
        },
        {
          title: "2. Data Collection",
          content: `We collect personal data only when you voluntarily provide it to us (e.g., when filling out a contact form). The types of data we may collect include:

• Name
• Email address
• Company name / Instagram handle
• Information about your business`
        },
        {
          title: "3. Purpose of Data Processing",
          content: `We use your personal data solely for the purpose of:

• Responding to your inquiries
• Providing our services
• Sending relevant information about our services (only with your consent)`
        },
        {
          title: "4. Data Retention",
          content: `We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Contact form submissions are typically retained for the duration of our business relationship plus any legally required retention period.`
        },
        {
          title: "5. Your Rights",
          content: `Under GDPR, you have the following rights:

• Right of access to your personal data
• Right to rectification of inaccurate data
• Right to erasure ("right to be forgotten")
• Right to restriction of processing
• Right to data portability
• Right to object to processing

To exercise any of these rights, please contact us at aiproductionsub@gmail.com.`
        },
        {
          title: "6. Cookies",
          content: `This website uses only technically necessary cookies that are essential for the functioning of the website. We do not use tracking or marketing cookies.`
        },
        {
          title: "7. Third-Party Services",
          content: `This website may use third-party services for hosting and functionality. These services may process your data as described in their respective privacy policies.`
        },
        {
          title: "8. Contact",
          content: `If you have any questions about this privacy policy or our data practices, please contact us at:

Email: aiproductionsub@gmail.com`
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
E-Mail: aiproductionsub@gmail.com`
        },
        {
          title: "2. Datenerfassung",
          content: `Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig mitteilen (z.B. beim Ausfüllen eines Kontaktformulars). Die Arten von Daten, die wir erheben können, umfassen:

• Name
• E-Mail-Adresse
• Firmenname / Instagram-Handle
• Informationen über Ihr Unternehmen`
        },
        {
          title: "3. Zweck der Datenverarbeitung",
          content: `Wir verwenden Ihre personenbezogenen Daten ausschließlich zum Zweck:

• Ihrer Anfragen zu beantworten
• Unsere Dienstleistungen zu erbringen
• Relevante Informationen über unsere Dienstleistungen zu senden (nur mit Ihrer Zustimmung)`
        },
        {
          title: "4. Datenspeicherung",
          content: `Wir speichern Ihre personenbezogenen Daten nur so lange, wie es zur Erfüllung der Zwecke, für die sie erhoben wurden, erforderlich ist, oder wie es gesetzlich vorgeschrieben ist.`
        },
        {
          title: "5. Ihre Rechte",
          content: `Nach der DSGVO haben Sie folgende Rechte:

• Recht auf Auskunft über Ihre personenbezogenen Daten
• Recht auf Berichtigung unrichtiger Daten
• Recht auf Löschung ("Recht auf Vergessenwerden")
• Recht auf Einschränkung der Verarbeitung
• Recht auf Datenübertragbarkeit
• Widerspruchsrecht gegen die Verarbeitung

Um eines dieser Rechte auszuüben, kontaktieren Sie uns bitte unter aiproductionsub@gmail.com.`
        },
        {
          title: "6. Cookies",
          content: `Diese Website verwendet nur technisch notwendige Cookies, die für das Funktionieren der Website unerlässlich sind. Wir verwenden keine Tracking- oder Marketing-Cookies.`
        },
        {
          title: "7. Drittanbieter-Dienste",
          content: `Diese Website kann Drittanbieter-Dienste für Hosting und Funktionalität nutzen. Diese Dienste können Ihre Daten gemäß ihren jeweiligen Datenschutzrichtlinien verarbeiten.`
        },
        {
          title: "8. Kontakt",
          content: `Wenn Sie Fragen zu dieser Datenschutzerklärung oder unseren Datenpraktiken haben, kontaktieren Sie uns bitte unter:

E-Mail: aiproductionsub@gmail.com`
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
Email: aiproductionsub@gmail.com`
        },
        {
          title: "2. Збір даних",
          content: `Ми збираємо персональні дані лише тоді, коли ви добровільно надаєте їх нам (наприклад, при заповненні контактної форми). Типи даних, які ми можемо збирати:

• Ім'я
• Електронна адреса
• Назва компанії / Instagram
• Інформація про ваш бізнес`
        },
        {
          title: "3. Мета обробки даних",
          content: `Ми використовуємо ваші персональні дані виключно з метою:

• Відповіді на ваші запити
• Надання наших послуг
• Надсилання відповідної інформації про наші послуги (лише за вашою згодою)`
        },
        {
          title: "4. Зберігання даних",
          content: `Ми зберігаємо ваші персональні дані лише стільки, скільки необхідно для виконання цілей, для яких вони були зібрані, або як вимагається законом.`
        },
        {
          title: "5. Ваші права",
          content: `Згідно з GDPR, ви маєте такі права:

• Право доступу до ваших персональних даних
• Право на виправлення неточних даних
• Право на видалення ("право бути забутим")
• Право на обмеження обробки
• Право на перенесення даних
• Право заперечувати проти обробки

Щоб скористатися будь-яким з цих прав, будь ласка, зв'яжіться з нами за адресою aiproductionsub@gmail.com.`
        },
        {
          title: "6. Файли cookie",
          content: `Цей веб-сайт використовує лише технічно необхідні файли cookie, які є важливими для функціонування веб-сайту. Ми не використовуємо файли cookie для відстеження або маркетингу.`
        },
        {
          title: "7. Сторонні сервіси",
          content: `Цей веб-сайт може використовувати сторонні сервіси для хостингу та функціональності. Ці сервіси можуть обробляти ваші дані, як описано в їхніх відповідних політиках конфіденційності.`
        },
        {
          title: "8. Контакт",
          content: `Якщо у вас є запитання щодо цієї політики конфіденційності або наших практик роботи з даними, будь ласка, зв'яжіться з нами:

Email: aiproductionsub@gmail.com`
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
