'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuPlus, LuMinus } from 'react-icons/lu';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What services do you offer?',
    answer:
      'We specialize in UI/UX design, website development, mobile applications, SaaS platforms, AI automation, branding, dashboards, and custom digital solutions tailored to your business goals.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines depend on complexity. Landing pages usually take 1–2 weeks, business websites 3–6 weeks, and larger platforms such as SaaS applications or custom systems can take several months.',
  },
  {
    question: 'Do you design before development?',
    answer:
      'Yes. Every project begins with research, wireframes, and high-fidelity UI/UX design to ensure the final product is intuitive, scalable, and aligned with your business objectives.',
  },
  {
    question: 'Can you redesign an existing website or application?',
    answer:
      'Absolutely. We can modernize outdated websites, improve user experience, enhance performance, and create a fresh visual identity while preserving your existing functionality.',
  },
  {
    question: 'Do you build responsive websites?',
    answer:
      'Yes. Every website and application is designed to work seamlessly across desktops, tablets, and mobile devices with a consistent user experience.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'We work with modern technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, Supabase, FastAPI, Framer Motion, and AI-powered automation tools to build fast, scalable digital products.',
  },
  {
    question: 'Will my website be optimized for SEO?',
    answer:
      'Yes. We implement technical SEO best practices, optimize performance, improve accessibility, and ensure your website is structured for better search engine visibility.',
  },
  {
    question: 'Do you provide maintenance after launch?',
    answer:
      'Yes. We offer ongoing support, maintenance, performance monitoring, feature enhancements, and security updates to keep your product running smoothly.',
  },
  {
    question: 'Can you integrate third-party services?',
    answer:
      'Yes. We can integrate payment gateways, CRMs, APIs, authentication systems, analytics, AI services, automation platforms, and other third-party tools based on your requirements.',
  },
  {
    question: 'How do we get started?',
    answer:
      "Simply reach out through the contact form or schedule a consultation. We'll discuss your goals, define the project scope, provide a clear roadmap, and begin building your solution.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-white text-[#181538] py-20 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="w-full max-w-[1100px] mx-auto">
        {/* Section Heading */}
        <h2 className="font-sora font-semibold text-4xl sm:text-5xl lg:text-[64px] tracking-tight text-[#181538] mb-12 sm:mb-16 leading-[1.1] text-center">
          Frequently Asked Question
        </h2>

        {/* FAQ Accordion List */}
        <div className="flex flex-col w-full">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-[#181538] py-6 sm:py-7 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none gap-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-xl sm:text-2xl lg:text-[26px] font-medium text-[#181538] tracking-tight leading-snug">
                    {item.question}
                  </span>
                  <span className="text-2xl sm:text-3xl font-light text-[#181538] shrink-0 transition-transform duration-200">
                    {isOpen ? (
                      <LuMinus className="w-6 h-6 sm:w-7 sm:h-7" />
                    ) : (
                      <LuPlus className="w-6 h-6 sm:w-7 sm:h-7" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden transform-gpu"
                    >
                      <p className="pt-4 pb-2 text-sm sm:text-base lg:text-[17px] text-neutral-800 leading-relaxed font-normal max-w-[950px]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
