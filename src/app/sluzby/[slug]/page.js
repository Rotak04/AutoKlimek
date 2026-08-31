'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';

// Databáze detailů pro jednotlivé služby
const servicesDetails = {
  diagnostika: {
    title: "DIAGNOSTIKA",
    desc: "Kompletní diagnostika vozidel všech značek.",
    fullText: "Používáme profesionální diagnostické přístroje pro čtení i mazání chybových kódů, živá data z řídicích jednotek, kódování modulů a kontrolu snímačů motoru i podvozku. Rychle a přesně odhalíme skryté závady elektroniky vašeho vozu.",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=600&auto=format&fit=crop"
    ]
  },
  olej: {
    title: "VÝMĚNA OLEJE",
    desc: "Výměna motorového oleje a všech filtrů.",
    fullText: "Používáme kvalitní doporučené oleje dle přesných specifikací výrobce vašeho vozu. Provádíme výměnu motorového i převodového oleje včetně výměny olejového, vzduchového, kabinového a palivového filtru.",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop"
    ]
  },
  brzdy: {
    title: "BRZDY",
    desc: "Kontrola, oprava a výměna brzdových systémů.",
    fullText: "Kompletní servis brzdového systému: výměna brzdových destiček, kotoučů, brzdové kapaliny, kontrola a oprava brzdových třmenů, vedení a testování účinnosti na brzdové stolici.",
    image: "https://images.unsplash.com/photo-1600792535783-8d69287a9003?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600792535783-8d69287a9003?q=80&w=600&auto=format&fit=crop"
    ]
  },
  pneuservis: {
    title: "PNEUSERVIS",
    desc: "Přezutí, vyvážení a opravy pneumatik.",
    fullText: "Kompletní sezónní přezutí pneumatik, přesné elektronické vyvážení kol, oprava defektů, kontrola tlaku a stavu dezénu, ekologická likvidace starých pneumatik.",
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=600&auto=format&fit=crop"
    ]
  },
  mechanicke: {
    title: "MECHANICKÉ PRÁCE",
    desc: "Opravy motoru, převodovky a dalších komponentů.",
    fullText: "Opravy podvozků, výměny tlumičů, čepů, ramen, výfukových systémů, rozvodů, spojek, vodních čerpadel a rozsáhlé opravy motorových částí.",
    image: "/mechanika.png",
    gallery: [
      "/mechanika.png",
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=600&auto=format&fit=crop"
    ]
  },
  stk: {
    title: "STK A EMISE",
    desc: "Zařízení STK a EMISÍ.",
    fullText: "Zprostředkování a kompletní předstkčková příprava vozidla včetně měření emisí a důkladné kontroly technického stavu před samotnou prohlídkou na STK.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS10zueqyhzhCmiL5KTPl9gPijYIvzENvRZeq1ArJzq75gjbyCKhVztZM0AHSMGwZunczW50w6F8LWS_Ow22ZsOj9ySuQ0Mw3T_SMBA9NE&s=10",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS10zueqyhzhCmiL5KTPl9gPijYIvzENvRZeq1ArJzq75gjbyCKhVztZM0AHSMGwZunczW50w6F8LWS_Ow22ZsOj9ySuQ0Mw3T_SMBA9NE&s=10"
    ]
  }
};

export default function ServiceDetail() {
  const params = useParams();
  const service = servicesDetails[params.slug];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-slate-800">
        <h1 className="text-2xl font-bold mb-4">Služba nebyla nalezena</h1>
        <Link href="/" className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-sm font-semibold">
          Zpět na hlavní stránku
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      {/* Horní lišta */}
      <header className="bg-[#0b1321] text-white border-b border-slate-800 sticky top-0 z-40 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span>ZPĚT NA HLAVNÍ STRÁNKU</span>
          </Link>
          <span className="text-xs text-blue-400 font-semibold tracking-wider uppercase hidden sm:inline">Auto Klímek - Detail služby</span>
        </div>
      </header>

      {/* Hlavní obsah */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase text-slate-900 mb-3">{service.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{service.desc}</p>

        {/* Hlavní foto */}
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-md mb-10 bg-gray-950 border border-gray-200">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Podrobný popis */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-12">
          <h2 className="text-xl font-bold uppercase text-slate-900 mb-4">Podrobnosti o službě</h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{service.fullText}</p>
        </div>

        {/* Galerie ukázek */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold uppercase text-slate-900 mb-6">Fotogalerie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.gallery.map((imgSrc, idx) => (
              <div key={idx} className="relative h-60 rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-gray-900">
                <Image
                  src={imgSrc}
                  alt={`${service.title} - foto ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Poptávkové tlačítko */}
        <div className="text-center bg-blue-50 border border-blue-100 p-8 rounded-xl">
          <h3 className="font-bold uppercase text-slate-900 mb-2">Máte zájem o tuto službu?</h3>
          <p className="text-xs text-gray-600 mb-6">Rádi vám sdělíme předběžnou cenu a domluvíme termín návštěvy.</p>
          <Link
            href={`/?poptat=${encodeURIComponent(service.title)}`}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase px-8 py-3.5 rounded-md text-sm tracking-wider transition shadow-md"
          >
            <span>Poptat servis</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b1321] text-gray-400 text-xs py-6 text-center border-t border-slate-800">
        <p>© {new Date().getFullYear()} AUTO KLÍMEK. Všechna práva vyhrazena.</p>
      </footer>
    </div>
  );
}