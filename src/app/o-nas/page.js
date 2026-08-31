'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wrench, ShieldCheck, Award, X } from 'lucide-react';

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sledování skrolování pro zmenšení lišty
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

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop",
      title: "Naše dílna"
    },
    {
      url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=800&auto=format&fit=crop",
      title: "Diagnostika motoru"
    },
    {
      url: "https://images.unsplash.com/photo-1600792535783-8d69287a9003?q=80&w=800&auto=format&fit=crop",
      title: "Servis brzd"
    },
    {
      url: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=800&auto=format&fit=crop",
      title: "Mechanické práce"
    },
    {
      url: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=800&auto=format&fit=crop",
      title: "Pneuservis a přezouvání"
    },
    {
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      title: "Příprava na STK"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">

      {/* Dynamic Header - přesunutý nadpis doprostřed a zmenšující se při scrollování */}
      <header className="bg-[#0b1321] text-white border-b border-slate-800 sticky top-0 z-40 transition-all duration-300">
        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-1 sm:py-2' : 'py-6 sm:py-8'
        }`}>
          {/* Levá část: Tlačítko zpět */}
          <a href="/" className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-300 hover:text-white transition shrink-0">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">ZPĚT NA HLAVNÍ STRÁNKU</span>
            <span className="sm:hidden">ZPĚT</span>
          </a>

          {/* Střední část: Nadpis a podnadpis */}
          <div className="text-center px-4">
            <h1 className={`font-extrabold uppercase tracking-tight transition-all duration-300 ${
              isScrolled ? 'text-lg sm:text-xl' : 'text-2xl sm:text-4xl'
            }`}>
              O NAŠEM <span className="text-blue-500">SERVISU</span>
            </h1>
            <p className={`text-gray-400 text-xs sm:text-sm transition-all duration-300 ${
              isScrolled ? 'hidden opacity-0 max-h-0' : 'block opacity-100 max-h-10 mt-1'
            }`}>
              Poctivá řemeslná práce, osobní přístup a moderní technické vybavení ve Vratimově.
            </p>
          </div>

          {/* Pravá část: Logo */}
          <a href="/" className="flex items-center overflow-hidden shrink-0">
            <img
              src="/logo.png"
              alt="AUTO KLÍMEK"
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-14 sm:h-16' : 'h-24 sm:h-28'
              }`}
            />
          </a>
        </div>
      </header>

      {/* Podrobný popis - začíná hned pod lištou */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold uppercase text-slate-900 mb-6">NÁŠ PŘÍBĚH A FILOZOFIE</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            <p>
              Vítáme vás v autoservisu <strong>AUTO KLÍMEK</strong>. Jsme nezávislý autoservis zaměřený na kompletní údržbu a opravy osobních i užitkových vozidel všech značek.
            </p>
            <p>
              Naše práce stojí na jednoduchých zásadách: <strong>férové jednání, transparentní ceník a maximální důraz na bezpečnost vašich vozidel</strong>. Vždy s vámi předem zkonzultujeme rozsah opravy i předpokládanou cenu, takže vás nečekají žádná nepříjemná překvapení při přebírání vozu.
            </p>
            <p>
              Používáme kvalitní náhradní díly od prověřených dodavatelů a nejmodernější diagnostickou techniku, abychom dokázali přesně odhalit i složitější elektronické závady.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <Wrench className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 uppercase text-sm mb-1">Špičkové vybavení</h3>
              <p className="text-xs text-gray-600">Nejmodernější diagnostické přístroje pro všechny značky.</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 uppercase text-sm mb-1">Záruka na práce</h3>
              <p className="text-xs text-gray-600">Na všechny provedené opravy a díly poskytujeme plnou záruku.</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 uppercase text-sm mb-1">Osobní přístup</h3>
              <p className="text-xs text-gray-600">Každé auto i přání zákazníka řešíme individuálně.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold uppercase text-slate-900">GALERIE SERVISU</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-2"></div>
            <p className="text-gray-600 text-sm mt-3">Nahlédněte do prostor naší dílny a ukázky naší práce.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className="group relative h-60 bg-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md cursor-pointer border border-gray-300"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <span className="text-white text-sm font-semibold uppercase">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal pro zvětšení fotky */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={selectedImage.url} alt={selectedImage.title} className="w-full max-h-[75vh] object-contain" />
            <div className="p-4 bg-slate-900 text-white text-center font-bold uppercase text-sm">
              {selectedImage.title}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0b1321] text-gray-400 text-xs py-6 text-center border-t border-slate-800">
        <p>© {new Date().getFullYear()} AUTO KLÍMEK. Všechna práva vyhrazena.</p>
      </footer>

    </div>
  );
}