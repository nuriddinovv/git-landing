"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { translations } from "../../translations";
import { formatPrice } from "../lib/currency";

type Language = "en" | "ru" | "uz";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "success">(
    "idle",
  );

  // Load language from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem("guds_lang");
    if (saved === "ru" || saved === "en" || saved === "uz") {
      setLang(saved as Language);
    }
  }, []);

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem("guds_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () =>
    setLang((l) => {
      if (l === "en") return "ru";
      if (l === "ru") return "uz";
      return "en";
    });

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistStatus("success");
    setTimeout(() => {
      setWaitlistStatus("idle");
      setIsModalOpen(false);
    }, 3000);
  };

  const navLinks = [
    { href: "#workers", label: t.nav.workers },
    { href: "#employers", label: t.nav.employers },
    { href: "#how", label: t.nav.how },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <div className="relative overflow-hidden selection:bg-[#1BADAC] selection:text-white font-[family-name:var(--font-plus-jakarta-sans)]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo/logo.png"
              alt="GUDS Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-2xl font-extrabold tracking-tighter text-near-black">
              GUDS
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-secondary hover:text-teal-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-xs font-bold px-3 py-1.5 rounded-full hover:bg-black/5 uppercase tracking-wider transition-all"
            >
              {lang === "en" ? "EN" : lang === "ru" ? "RU" : "UZ"}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:block bg-teal-accent hover:bg-[#158f90] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-teal-accent/20 transition-all transform hover:scale-105 active:scale-95"
            >
              {t.nav.join}
            </button>
            <button
              className="lg:hidden p-2 text-near-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl py-6 px-4 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-bold text-near-black py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-teal-accent text-white py-4 rounded-2xl font-extrabold shadow-lg"
              >
                {t.nav.join}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
          <div className="inline-block bg-orange-accent text-white text-[10px] md:text-xs font-extrabold px-4 py-1.5 rounded-full mb-8 tracking-[0.2em] uppercase">
            {t.hero.badge}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-near-black mb-10 leading-[1.05]">
            {t.hero.title}
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-14 text-secondary font-medium md:text-lg max-w-4xl mx-auto px-4">
            <div className="flex items-start gap-3 text-left">
              <span className="w-2 h-2 rounded-full bg-teal-accent flex-shrink-0 mt-2"></span>
              <p className="leading-tight">{t.hero.wText}</p>
            </div>
            <div className="flex items-start gap-3 text-left">
              <span className="w-2 h-2 rounded-full bg-orange-accent flex-shrink-0 mt-2"></span>
              <p className="leading-tight">{t.hero.eText}</p>
            </div>
            <div className="flex items-start gap-3 text-left">
              <span className="w-2 h-2 rounded-full bg-teal-accent opacity-50 flex-shrink-0 mt-2"></span>
              <p className="leading-tight">{t.hero.noInter}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-near-black text-white px-10 py-5 rounded-full font-extrabold text-lg hover:bg-black transition-all transform hover:-translate-y-1 shadow-2xl shadow-black/10"
            >
              {t.hero.ctaPrimary}
            </button>
            <a
              href="#contact"
              className="w-full sm:w-auto glass px-10 py-5 rounded-full font-extrabold text-lg text-near-black hover:bg-white transition-all transform hover:-translate-y-1"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 md:-mt-16 mb-24 relative z-10">
        <div className="glass rounded-[32px] p-8 md:p-12 shadow-2xl flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {t.trust.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${idx % 2 === 0 ? "bg-teal-accent" : "bg-orange-accent"}`}
              ></div>
              <span className="font-extrabold text-near-black tracking-wide text-xs md:text-sm uppercase">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <section id="workers" className="py-24 px-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          <div className="glass p-10 md:p-14 rounded-[40px] shadow-xl border-t-4 border-teal-accent">
            <h2 className="text-3xl font-extrabold text-near-black mb-8">
              {t.benefits.workers.title}
            </h2>
            <ul className="space-y-6">
              {t.benefits.workers.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-teal-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-3.5 h-3.5 text-teal-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={4}
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-secondary font-semibold text-lg">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="employers"
            className="glass p-10 md:p-14 rounded-[40px] shadow-xl border-t-4 border-orange-accent scroll-mt-20"
          >
            <h2 className="text-3xl font-extrabold text-near-black mb-8">
              {t.benefits.employers.title}
            </h2>
            <ul className="space-y-6">
              {t.benefits.employers.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-orange-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-3.5 h-3.5 text-orange-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={4}
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-secondary font-semibold text-lg">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 px-4 bg-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-near-black text-center mb-20">
            {t.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {t.howItWorks.steps.map((step, idx) => (
              <div key={idx} className="relative group">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-[2px] bg-black/5 -translate-x-1/2"></div>
                )}
                <div className="glass p-10 rounded-[32px] text-center relative z-10 transition-transform group-hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-near-black text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-xl">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-near-black mb-4">
                    {step.t}
                  </h3>
                  <p className="text-secondary font-medium">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GTM Section */}
      <section className="py-24 px-4 bg-black/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-near-black text-center mb-16">
            {t.gtm.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {[t.gtm.social, t.gtm.ads, t.gtm.google].map((text, i) => (
              <div
                key={i}
                className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[32px] shadow-sm flex items-center gap-4 md:gap-6"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#CDE5F3] rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-teal-accent rounded-full animate-pulse"></div>
                </div>
                <span className="font-bold text-near-black leading-tight text-sm md:text-base">
                  {text}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center p-8 bg-teal-accent/10 rounded-[32px]">
            <p className="text-secondary font-bold italic text-lg">
              “{t.gtm.keywords}”
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-near-black mb-6">
              {t.pricing.title}
            </h2>
            <p className="text-secondary font-semibold">{t.pricing.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-12 rounded-[40px] opacity-70 cursor-not-allowed">
              <h3 className="text-2xl font-bold text-near-black mb-2">
                {t.pricing.free}
              </h3>
              <p className="text-secondary mb-10">{t.pricing.freeDesc}</p>
              <div className="text-5xl font-black text-near-black mb-12">
                {formatPrice(t.pricing.freePrice as number, lang)}
                <span className="text-xl text-secondary font-bold ml-2">
                  {t.pricing.freePriceUnit}
                </span>
              </div>
              <div className="bg-black/5 py-4 rounded-2xl text-center font-bold text-gray-400 uppercase tracking-widest">
                {t.nav.comingSoon}
              </div>
            </div>
            <div className="glass p-12 rounded-[40px] relative overflow-hidden transform scale-105 shadow-2xl">
              <div className="absolute top-8 right-[-32px] bg-orange-accent text-white py-1.5 px-10 rotate-45 font-black text-[10px] tracking-widest">
                {t.pricing.pricingNote}
              </div>
              <h3 className="text-2xl font-bold text-near-black mb-2">
                {t.pricing.business}
              </h3>
              <p className="text-secondary mb-10">{t.pricing.businessDesc}</p>
              <div className="text-5xl font-black text-near-black mb-12">
                {t.pricing.businessPrice as string}
                <span className="text-xl text-secondary font-bold ml-2">
                  {t.pricing.businessPriceUnit}
                </span>
              </div>
              <div className="bg-black/5 py-4 rounded-2xl text-center font-bold text-gray-400 uppercase tracking-widest">
                {t.nav.comingSoon}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 bg-white/20 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-near-black text-center mb-16">
            {t.faq.title}
          </h2>
          <div className="space-y-4">
            {t.faq.items.map((item, i) => (
              <details key={i} className="glass rounded-3xl group">
                <summary className="list-none p-8 flex items-center justify-between cursor-pointer font-bold text-lg text-near-black">
                  <span>{item.q}</span>
                  <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center transition-transform group-open:rotate-180">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-8 pb-8 text-secondary font-medium leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-near-black mb-6">
              {t.contact.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
              className="glass p-10 rounded-[32px] text-center hover:scale-[1.02] transition-all group"
            >
              <div className="w-14 h-14 bg-teal-accent/10 text-teal-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-accent group-hover:text-white transition-colors">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <p className="text-xs font-black text-secondary tracking-widest uppercase mb-2">
                {t.contact.phoneLabel}
              </p>
              <p className="text-xl font-extrabold text-near-black">
                {t.contact.phone}
              </p>
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.contact.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-10 rounded-[32px] text-center hover:scale-[1.02] transition-all group"
            >
              <div className="w-14 h-14 bg-orange-accent/10 text-orange-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-accent group-hover:text-white transition-colors">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-xs font-black text-secondary tracking-widest uppercase mb-2">
                {t.contact.locationLabel}
              </p>
              <p className="text-xl font-extrabold text-near-black">
                {t.contact.location}
              </p>
            </a>
            <a
              href={`mailto:${t.contact.email}`}
              className="glass p-10 rounded-[32px] text-center hover:scale-[1.02] transition-all group"
            >
              <div className="w-14 h-14 bg-teal-accent/10 text-teal-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-accent group-hover:text-white transition-colors">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-xs font-black text-secondary tracking-widest uppercase mb-2">
                {t.contact.emailLabel}
              </p>
              <p className="text-xl font-extrabold text-near-black">
                {t.contact.email}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <Image
                  src="/logo/fullLogo.png"
                  alt="GUDS Full Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-secondary text-lg max-w-sm font-medium leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 text-near-black">GUDS</h4>
              <ul className="space-y-4 text-secondary font-semibold">
                <li>
                  <a
                    href="#workers"
                    className="hover:text-teal-accent transition-colors"
                  >
                    {t.nav.workers}
                  </a>
                </li>
                <li>
                  <a
                    href="#employers"
                    className="hover:text-teal-accent transition-colors"
                  >
                    {t.nav.employers}
                  </a>
                </li>
                <li>
                  <a
                    href="#how"
                    className="hover:text-teal-accent transition-colors"
                  >
                    {t.nav.how}
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-teal-accent transition-colors"
                  >
                    {t.nav.pricing}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-8 text-near-black">LEGAL</h4>
              <ul className="space-y-4 text-secondary font-semibold">
                {t.footer.legal.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="hover:text-teal-accent transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#faq"
                    className="hover:text-teal-accent transition-colors"
                  >
                    {t.nav.faq}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-secondary font-bold text-sm">
            <p>
              © {new Date().getFullYear()} GUDS App. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative glass bg-white w-full max-w-md rounded-[40px] p-8 md:p-12 shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-secondary hover:text-near-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {waitlistStatus === "success" ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={4}
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-near-black mb-2">
                  {t.waitlist.success}
                </h3>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-black text-near-black mb-10">
                  {t.waitlist.title}
                </h3>
                <form onSubmit={handleWaitlistSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-secondary tracking-widest uppercase mb-2">
                      {t.waitlist.name}
                    </label>
                    <input
                      required
                      className="w-full bg-black/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-teal-accent/50 font-bold text-near-black"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-secondary tracking-widest uppercase mb-2">
                      {t.waitlist.contact}
                    </label>
                    <input
                      required
                      className="w-full bg-black/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-teal-accent/50 font-bold text-near-black"
                      placeholder="name@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-secondary tracking-widest uppercase mb-3">
                      {t.waitlist.role}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="cursor-pointer relative group">
                        <input
                          type="radio"
                          name="role"
                          className="peer hidden"
                          defaultChecked
                        />
                        <div className="bg-black/5 text-center py-4 rounded-2xl font-black peer-checked:bg-teal-accent peer-checked:text-white transition-all">
                          {t.waitlist.worker}
                        </div>
                      </label>
                      <label className="cursor-pointer relative group">
                        <input
                          type="radio"
                          name="role"
                          className="peer hidden"
                        />
                        <div className="bg-black/5 text-center py-4 rounded-2xl font-black peer-checked:bg-orange-accent peer-checked:text-white transition-all">
                          {t.waitlist.employer}
                        </div>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-near-black text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {t.waitlist.submit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
