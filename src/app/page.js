'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Wrench,
  ShieldCheck,
  Clock,
  Building2,
  ThumbsUp,
  Phone,
  MapPin,
  Mail,
  Users,
  Car,
  Award,
  ChevronRight,
  ChevronDown,
  Gauge,
  Droplet,
  Disc,
  Disc3,
  Wind,
  Settings,
  Check,
  X,
  Send,
  Info,
  Menu
} from 'lucide-react';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('DIAGNOSTIKA');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedServices, setExpandedServices] = useState({});
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();

  // Automatické otevření modálu, pokud uživatel přišel z detailu služby
  useEffect(() => {
    const poptatSsluzba = searchParams.get('poptat');
    if (poptatSsluzba && typeof handleOpenModal === 'function') {
      handleOpenModal(poptatSsluzba);
    }
  }, [searchParams]);

 // === ÚPRAVA NA RESEND: Odesílání přes vlastní API route
 const onSubmit = async (event) => {
   event.preventDefault();
   setIsSubmitting(true);
   setResult("Odesílám...");

   const formData = new FormData(event.target);

   const emailData = {
       email: formData.get("email"),
       phone: formData.get("phone"), // Tady ho bereme přímo z formuláře
       service: selectedService,
       message: formData.get("message") || "",
     };

   try {
     const response = await fetch('/api/send', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(emailData),
     });

     const data = await response.json();

     if (response.ok) {
       setResult("Poptávka byla úspěšně odeslána!");
       setIsSubmitted(true);
       // Případně vyčištění formuláře
       setEmail('');
       setPhone('');
       setDescription('');
     } else {
       setResult(data.error || "Něco se pokazilo, zkuste to znovu.");
     }
   } catch (error) {
     setResult("Chyba při odesílání.");
   } finally {
     setIsSubmitting(false);
   }
 };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 const services = [
     {
       slug: "diagnostika",
       title: "DIAGNOSTIKA",
       desc: "Kompletní diagnostika vozidel všech značek.",
       moreInfo: "Používáme profesionální diagnostické přístroje pro čtení i mazání chybových kódů, živá data z řídicích jednotek, kódování modulů a kontrolu snímačů motoru i podvozku.",
       icon: <Gauge className="w-6 h-6 text-blue-600" />,
       image: "/diagnostika.png"
     },
     {
       slug: "olej",
       title: "VÝMĚNA OLEJE",
       desc: "Výměna motorového oleje a všech filtrů.",
       icon: <Droplet className="w-6 h-6 text-blue-600" />,
       moreInfo: "Používáme kvalitní doporučené oleje dle specifikací výrobce vašeho vozu. Provádíme výměnu motorového i převodového oleje včetně výměny olejového, vzduchového, kabinového a palivového filtru.",
       image: "/olej.png"
     },
     {
       slug: "brzdy",
       title: "BRZDY",
       desc: "Kontrola, oprava a výměna brzdových systémů.",
       icon: <Disc className="w-6 h-6 text-blue-600" />,
       moreInfo: "Kompletní servis brzdového systému: výměna brzdových destiček, kotoučů, brzdové kapaliny, kontrola a oprava brzdových třmenů, vedení a testování účinnosti.",
       image: "/brzdy.png"
     },
     {
       slug: "pneuservis",
       title: "PNEUSERVIS",
       desc: "Přezutí, vyvážení a opravy pneumatik.",
       icon: <Disc3 className="w-6 h-6 text-blue-600" />,
       moreInfo: "Kompletní sezónní přezutí pneumatik, přesné vyvážení kol, oprava defektů, kontrola tlaku a stavu vzorku, ekologická likvidace starých pneumatik.",
       image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=600&auto=format&fit=crop"
     },
     {
       slug: "mechanicke",
       title: "MECHANICKÉ PRÁCE",
       desc: "Opravy motoru, převodovky a dalších komponentů.",
       icon: <Settings className="w-6 h-6 text-blue-600" />,
       moreInfo: "Opravy podvozků, výměny tlumičů, čepů, ramen, výfukových systémů, rozvodů, spojek, vodních čerpadel a rozsáhlé opravy motorových částí.",
       image: "/mechanika.png"
     },
     {
       slug: "stk",
       title: "STK A EMISE",
       desc: "Zařízení STK a EMISÍ.",
       icon: <Disc3 className="w-6 h-6 text-blue-600" />,
       moreInfo: "Zprostředkování a příprava vozidla na STK a měření emisí, kontrola technického stavu před samotnou prohlídkou.",
       image: "/stk.png"
     },
   ];

  const pricing = [
    { service: "Počítačová diagnostika motoru a elektroniky", price: "od 500 Kč" },
    { service: "Výměna motorového oleje + filtru (bez materiálu)", price: "400 Kč" },
    { service: "Přezutí a vyvážení kol (sada 4 ks)", price: "od 800 Kč" },
    { service: "Kontrola a údržba brzdového systému (jedna náprava)", price: "od 600 Kč" },
    { service: "Plnění a dezinfekce klimatizace", price: "od 900 Kč" },
    { service: "Hodinová sazba mechanických prací", price: "600 Kč / hod" }
  ];

  const toggleMoreInfo = (id) => {
    setExpandedServices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleOpenModal = (serviceName = 'DIAGNOSTIKA') => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
    setIsSubmitted(false);
    setResult("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">

      {/* Navigation Header */}
      <header className="bg-[#0b1321] text-white border-b border-slate-800 sticky top-0 z-50 transition-all duration-300">
        <div className="flex md:hidden items-center justify-between px-4 py-3">
          <a href="#domu" className="flex items-center overflow-hidden">
            <img
              src="/logo.png"
              alt="AUTO KLÍMEK"
              className="h-12 w-auto object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </a>
          <div className="flex items-center space-x-3">
            <a
              href="tel:+420736153774"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition"
              aria-label="Zavolat"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-1 focus:outline-none"
              aria-label="Otevřít menu"
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#0e1726] border-t border-slate-800 px-6 py-6 space-y-4">
            <a href="#domu" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-white hover:text-blue-400 border-b border-slate-800/60 pb-3">DOMŮ</a>
            <a href="#sluzby" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-200 hover:text-blue-400 border-b border-slate-800/60 pb-3">SLUŽBY</a>
            <Link href="/o-nas" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-200 hover:text-blue-400 border-b border-slate-800/60 pb-3">O NÁS</Link>
            <a href="#cenik" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-200 hover:text-blue-400 border-b border-slate-800/60 pb-3">CENÍK</a>
            <a href="#kontakt" onClick={() => setIsMenuOpen(false)} className="block text-base font-semibold text-gray-200 hover:text-blue-400 border-b border-slate-800/60 pb-3">KONTAKT</a>
            <a href="tel:+420736153774" className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-bold text-sm uppercase tracking-wider transition flex items-center justify-center space-x-2 mt-2">
              <Phone className="w-4 h-4" />
              <span>+420 736 153 774</span>
            </a>
          </div>
        )}

        <div className={`hidden md:flex max-w-7xl mx-auto px-6 items-center justify-between transition-all duration-300 ${isScrolled ? 'py-1' : 'py-3'}`}>
          <a href="#domu" className="flex items-center overflow-hidden">
            <img
              src="/logo.png"
              alt="AUTO KLÍMEK"
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-14 scale-100' : 'h-28 scale-110'}`}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </a>

          <nav className="flex-1 flex justify-around max-w-xl mx-8 text-sm font-semibold tracking-wide">
            <a href="#domu" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500 pb-1 transition-all">DOMŮ</a>
            <a href="#sluzby" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500 pb-1 transition-all">SLUŽBY</a>
            <Link href="/o-nas" className="text-gray-300 hover:text-white transition-all">O NÁS</Link>
            <a href="#cenik" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500 pb-1 transition-all">CENÍK</a>
            <a href="#kontakt" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500 pb-1 transition-all">KONTAKT</a>
          </nav>

          <a
            href="tel:+420736153774"
            className={`bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold text-sm flex items-center space-x-2 transition-all duration-300 shrink-0 ${isScrolled ? 'px-4 py-1.5' : 'px-5 py-2.5'}`}
          >
            <Phone className="w-4 h-4" />
            <span>+420 736 153 774</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="domu" className="relative bg-[#0b1321] text-white py-24 md:py-32 overflow-hidden">

        <div
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('/autoplocha1.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1321] via-[#0b1321]/80 to-transparent z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-tight mb-4">
              PROFESIONÁLNÍ <br />
              <span className="text-blue-500">SERVIS</span> PRO VAŠE AUTO
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Kvalitní péče, férové ceny a spokojenost zákazníků jsou pro nás na prvním místě.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#sluzby" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-md font-semibold text-sm flex items-center justify-center space-x-2 transition">
                <span>NAŠE SLUŽBY</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleOpenModal('JINÉ')}
                className="border border-gray-600 hover:border-gray-400 bg-black/30 hover:bg-black/50 text-white px-6 py-3.5 rounded-md font-semibold text-sm flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <span>KONTAKTUJTE NÁS</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-[#0f1a2e] text-white border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-900/40 rounded-full border border-blue-500/30">
              <Wrench className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold uppercase text-sm tracking-wide mb-1">KVALITNÍ SERVIS</h4>
              <p className="text-xs text-gray-400">Používáme moderní technologie a nástroje.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-900/40 rounded-full border border-blue-500/30">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold uppercase text-sm tracking-wide mb-1">RYCHLOST</h4>
              <p className="text-xs text-gray-400">Zakládáme si na rychlém a efektivním servisu.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-900/40 rounded-full border border-blue-500/30">
              <ThumbsUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold uppercase text-sm tracking-wide mb-1">ZÁRUKA KVALITY</h4>
              <p className="text-xs text-gray-400">Na všechny práce a díly poskytujeme záruku.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="sluzby" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">NAŠE SLUŽBY</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {services.map((service) => {
              return (
                <div key={service.slug} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group border border-gray-200 flex flex-col h-full">

                  {/* Obrázek je nyní klikací odkaz na podstránku */}
                  <Link href={`/sluzby/${service.slug}`} className="block relative h-48 overflow-hidden bg-gray-950 cursor-pointer">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-white p-2 rounded-full shadow">
                      {service.icon}
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <Link href={`/sluzby/${service.slug}`} className="block">
                      <h3 className="font-bold text-lg text-slate-900 mb-2 uppercase hover:text-blue-600 transition">
                        {service.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">{service.desc}</p>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                      {/* Tlačítko VÍCE INFO odkazuje na dynamickou podstránku */}
                      <Link
                        href={`/sluzby/${service.slug}`}
                        className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-slate-800 uppercase tracking-wider space-x-1 transition"
                      >
                        <span>VÍCE INFO</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>

                      <button
                        onClick={() => handleOpenModal(service.title)}
                        className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider space-x-1 cursor-pointer"
                      >
                        <span>POPTAT SLUŽBU</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="cenik" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">CENÍK SLUŽEB</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 mb-4"></div>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Ceny jsou orientační. Přesnou cenovou kalkulaci vám rádi sdělíme po prohlídce vozidla.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="divide-y divide-gray-200">
              {pricing.map((item, index) => (
                <div key={index} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gray-100/80 transition">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-800 text-sm sm:text-base">{item.service}</span>
                  </div>
                  <span className="font-bold text-blue-600 text-base sm:text-lg sm:text-right shrink-0 pl-8 sm:pl-0">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-4">Všechny ceny jsou uvedeny včetně DPH.</p>
            <button
              onClick={() => handleOpenModal('DIAGNOSTIKA')}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-sm transition space-x-2 cursor-pointer"
            >
              <span>NEZÁVAZNĚ POPTAT SERVIS</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* About & Contact Section */}
      <section id="o-nas" className="py-16 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-slate-900">O NÁS</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Jsme menší autoservis s osobním přístupem a důrazem na kvalitu. Naším cílem je, aby se k nám zákazníci rádi vraceli.
            </p>
            <a
              href="/o-nas"
              className="inline-flex items-center border border-gray-300 hover:bg-gray-50 text-slate-800 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider space-x-2 transition cursor-pointer"
            >
              <span>VÍCE O NÁS</span>
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center border-y lg:border-y-0 lg:border-x border-gray-200 py-8 lg:py-0">
            <div>
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-slate-900">5+</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">LET PRAXE</div>
            </div>
            <div>
              <Car className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-slate-900">100+</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase">SPOKOJENÝCH ZÁKAZNÍKŮ</div>
            </div>
          </div>

          <div id="kontakt" className="flex flex-col md:flex-row lg:flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-slate-900">KONTAKT</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Na Zadkách 128/19, 739 32 Vratimov 1, Česko</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>+420 736 153 774</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>autoklimek@outlook.cz</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Po – Pá: 7:00 – 17:00</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>IČO: 29866898</span>
                </li>
              </ul>
            </div>

            <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden relative border border-gray-300">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Na Zadkách+128/19+Vratimov&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale opacity-80"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup Window */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-slate-800 transition p-1"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Poptávka byla odeslána!</h3>
                <p className="text-gray-600 text-sm">Brzy se vám ozveme na zadaný e-mail.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold uppercase text-slate-900 tracking-tight">NEZÁVAZNÁ POPTÁVKA</h3>
                  <div className="w-12 h-1 bg-blue-600 mt-2"></div>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Váš E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jan.novak@email.cz"
                      className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                    />
                  </div>

                  {/* TADY JE PŘIDANÉ POLÍČKO PRO TELEFON */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Telefonní číslo
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Např. +420 123 456 789"
                      className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Vybraná služba
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm bg-white"
                    >
                      {services.map((item, idx) => (
                        <option key={idx} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                      <option value="JINÉ">JINÉ / JINÝ DOTAZ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Poznámka / Závada
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Napište např. značku a model auta, r.v. nebo popis závady..."
                      className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition text-sm flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'ODESÍLÁM...' : 'ODESLAT POPTÁVKU'}</span>
                  </button>

                  {result && (
                    <p className={`text-xs text-center mt-2 font-semibold ${result.includes("chyb") || result.includes("Chyba") ? "text-red-500" : "text-green-600"}`}>
                      {result}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0b1321] text-gray-400 text-xs py-6 border-t border-slate-800 text-center">
        <p>© {new Date().getFullYear()} AUTO KLÍMEK. Všechna práva vyhrazena.</p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Načítám...</div>}>
      <HomeContent />
    </Suspense>
  );
}