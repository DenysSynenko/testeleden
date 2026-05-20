import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/eleden/Header";

const Impressum = () => {
  const { language } = useLanguage();

  const content = {
    EN: {
      title: "Impressum",
      backText: "Back to home",
      sections: [
        {
          title: "Information according to § 5 TMG",
          content: `Denys Synenko Medienproduktion
Berg-am-Laim-Str. 73
81673 München
Germany`
        },
        {
          title: "Contact",
          content: `Email: denissinenko31@gmail.com`
        },
        {
          title: "Legal Form",
          content: `Einzelunternehmer`
        },
        {
          title: "Tax Information",
          content: `Steuernummer: 146/226/30614
(Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG wird nachgetragen, sobald erteilt)`
        },
        {
          title: "Responsible for content according to § 55 Abs. 2 RStV",
          content: `Denys Synenko
Berg-am-Laim-Str. 73
81673 München`
        },
        {
          title: "Liability Disclaimer",
          content: `The contents of this website have been created with the utmost care. However, we assume no liability for the accuracy, completeness, or timeliness of the content provided.`
        },
        {
          title: "Dispute Resolution",
          content: `The European Commission provides a platform for online dispute resolution (OS): https://ec.europa.eu/consumers/odr
We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.`
        }
      ]
    },
    DE: {
      title: "Impressum",
      backText: "Zurück zur Startseite",
      sections: [
        {
          title: "Angaben gemäß § 5 TMG",
          content: `Denys Synenko Medienproduktion
Berg-am-Laim-Str. 73
81673 München
Deutschland`
        },
        {
          title: "Kontakt",
          content: `E-Mail: denissinenko31@gmail.com`
        },
        {
          title: "Rechtsform",
          content: `Einzelunternehmer`
        },
        {
          title: "Steuerangaben",
          content: `Steuernummer: 146/226/30614
(Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG wird nachgetragen, sobald erteilt)`
        },
        {
          title: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
          content: `Denys Synenko
Berg-am-Laim-Str. 73
81673 München`
        },
        {
          title: "Haftungsausschluss",
          content: `Die Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.`
        },
        {
          title: "Streitschlichtung",
          content: `Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr
Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`
        }
      ]
    },
    UA: {
      title: "Імпресум",
      backText: "Назад на головну",
      sections: [
        {
          title: "Інформація згідно з § 5 TMG",
          content: `Denys Synenko Medienproduktion
Berg-am-Laim-Str. 73
81673 Мюнхен
Німеччина`
        },
        {
          title: "Контакт",
          content: `Email: denissinenko31@gmail.com`
        },
        {
          title: "Правова форма",
          content: `Einzelunternehmer (Індивідуальний підприємець)`
        },
        {
          title: "Податкова інформація",
          content: `Steuernummer (податковий номер): 146/226/30614
(Ідентифікаційний номер платника ПДВ згідно з § 27a UStG буде додано після отримання)`
        },
        {
          title: "Відповідальний за контент згідно з § 55 Abs. 2 RStV",
          content: `Denys Synenko
Berg-am-Laim-Str. 73
81673 Мюнхен`
        },
        {
          title: "Відмова від відповідальності",
          content: `Вміст цього веб-сайту створено з максимальною ретельністю. Однак ми не несемо відповідальності за точність, повноту чи актуальність наданої інформації.`
        },
        {
          title: "Вирішення спорів",
          content: `Європейська Комісія надає платформу для онлайн вирішення спорів (OS): https://ec.europa.eu/consumers/odr
Ми не готові або не зобов'язані брати участь у процедурах вирішення спорів перед споживчою арбітражною радою.`
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
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-glow-mint opacity-15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-glow-champagne opacity-10 rounded-full blur-3xl" />
      
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
          className="section-title mb-16"
        >
          {currentContent.title}
        </motion.h1>

        {/* Sections */}
        <div className="space-y-12">
          {currentContent.sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="premium-card"
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

export default Impressum;
