'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '../ui/BrandLogo';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  customService: string;
  message: string;
}

export interface CountryCodeItem {
  code: string;
  country: string;
  flag: string;
  name: string;
}

const SERVICES = [
  'Portfolio',
  'landing page',
  'Website',
  'AI Automation',
  'Saas Product',
  'Web Application',
  'Branding',
  'Consulting',
  'Other',
];

const COUNTRY_CODES: CountryCodeItem[] = [
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
  { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+41', country: 'CH', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar' },
  { code: '+968', country: 'OM', flag: '🇴🇲', name: 'Oman' },
  { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+973', country: 'BH', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+92', country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+94', country: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+977', country: 'NP', flag: '🇳🇵', name: 'Nepal' },
  { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: '+54', country: 'AR', flag: '🇦🇷', name: 'Argentina' },
  { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Colombia' },
  { code: '+64', country: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: '+46', country: 'SE', flag: '🇸🇪', name: 'Sweden' },
  { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norway' },
  { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finland' },
  { code: '+353', country: 'IE', flag: '🇮🇪', name: 'Ireland' },
  { code: '+43', country: 'AT', flag: '🇦🇹', name: 'Austria' },
  { code: '+32', country: 'BE', flag: '🇧🇪', name: 'Belgium' },
  { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal' },
  { code: '+30', country: 'GR', flag: '🇬🇷', name: 'Greece' },
  { code: '+48', country: 'PL', flag: '🇵🇱', name: 'Poland' },
  { code: '+90', country: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
  { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
];

export default function ContactFormSection() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeItem>(COUNTRY_CODES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus search input when dropdown opens
  useEffect(() => {
    if (isCountryDropdownOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isCountryDropdownOpen]);

  const filteredCountries = COUNTRY_CODES.filter((item) => {
    const q = countrySearchQuery.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.code.includes(q) ||
      item.country.toLowerCase().includes(q)
    );
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: 'Portfolio',
    customService: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.service === 'Other' && !formData.customService.trim()) {
      newErrors.customService = 'Please specify your requirement';
    }
    if (!formData.message.trim()) newErrors.message = 'Please provide details about your project';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const endpoint =
        import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
        'https://script.google.com/macros/s/AKfycbwXPvTa3A0UpYlynTWfAXqqXEnFfz-vhYilkMGHnauzoRJIokbCqGa0P1HqUaGCfyu9/exec';

      const finalService =
        formData.service === 'Other' && formData.customService.trim()
          ? formData.customService.trim()
          : formData.service;

      const formattedPhone = formData.phone.trim()
        ? `'${selectedCountry.code} ${formData.phone.trim()}`
        : '';

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formattedPhone,
        service: finalService,
        message: formData.message.trim(),
      };

      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Form submission error:', err);
      setIsSubmitting(false);
      setSubmitError(
        'Failed to submit form. Please try again or email directly at rafiqsheriffs@gmail.com'
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Portfolio',
      customService: '',
      message: '',
    });
    setErrors({});
    setSubmitError(null);
    setIsSubmitted(false);
  };

  return (
    <section className="relative z-10 pb-20 sm:pb-28 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full"
      >
        {/* Main Card Container with Title Inside */}
        <div className="w-full bg-white rounded-[28px] sm:rounded-[40px] border border-neutral-200/90 p-6 sm:p-12 lg:p-16 shadow-sm">
          {/* Title inside the Contact Form card */}
          <div className="mb-10 sm:mb-14 pb-8 border-b border-neutral-200/90">
            <span className="inline-block font-sans text-xs uppercase tracking-widest text-[#5b72ff] font-semibold mb-3">
              Get In Touch
            </span>
            <h2 className="font-sora font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#181538] leading-tight mb-4">
              Start a Project, Send a Message
            </h2>
            <p className="font-sans text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed">
              Have an idea or vision? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Direct Contact Info */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
              <div>
                <h3 className="font-sora font-semibold text-2xl sm:text-3xl text-[#181538] mb-3">
                  Let’s collaborate
                </h3>
                <p className="font-sans text-base text-neutral-600 leading-relaxed font-normal">
                  We work with ambitious clients to design and build high-impact web products.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-6 pt-6 border-t border-neutral-200/90">
                <div>
                  <h4 className="font-sora font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Direct Email
                  </h4>
                  <a
                    href="mailto:rafiqsheriffs@gmail.com"
                    className="font-sans text-base sm:text-lg text-[#181538] hover:text-[#5b72ff] transition-colors font-medium block"
                  >
                    rafiqsheriffs@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="font-sora font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Location
                  </h4>
                  <p className="font-sans text-base sm:text-lg text-[#181538] font-medium">
                    Chennai, India
                  </p>
                </div>

                <div>
                  <h4 className="font-sora font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Response
                  </h4>
                  <p className="font-sans text-base sm:text-lg text-[#181538] font-medium">
                    Within 24 Hours
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="py-12 px-6 rounded-[24px] bg-[#F8F9FA] border border-neutral-200/80 text-center flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#181538] text-white flex items-center justify-center mb-6 shadow-md">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-sora font-semibold text-2xl sm:text-3xl text-[#181538] mb-3">
                      Thank You!
                    </h3>
                    <p className="font-sans text-neutral-600 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
                      Your message has been sent successfully. <span className="font-medium text-[#181538]">{formData.name}</span>, we will get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="group inline-flex items-center justify-between gap-4 sm:gap-6 bg-[#5b72ff] text-white hover:bg-[#4760ff] transition-all duration-300 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-[18px] active:scale-95 cursor-pointer shadow-lg shadow-blue-500/20"
                    >
                      <span className="font-sans font-medium tracking-tight text-white">
                        Send Another Message
                      </span>
                      <span className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-[#5b72ff] shrink-0 group-hover:bg-neutral-100 transition-colors duration-200 shadow-sm overflow-hidden">
                        <BrandLogo
                          className="h-4 sm:h-5 w-auto text-[#5b72ff] transition-transform duration-500 ease-out group-hover:rotate-45"
                          fill="#5b72ff"
                          useGradient={false}
                        />
                      </span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label className="block font-sora font-semibold text-sm text-[#181538] mb-2.5">
                          Your Name <span className="text-[#5b72ff]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                          }}
                          className={`w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border ${
                            errors.name ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:border-[#5b72ff] focus:bg-white focus:ring-4 focus:ring-[#5b72ff]/10'
                          } text-[#181538] placeholder-neutral-400 font-sans text-base focus:outline-none transition-all duration-200`}
                        />
                        {errors.name && (
                          <span className="block mt-1.5 text-xs text-red-500 font-medium">{errors.name}</span>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block font-sora font-semibold text-sm text-[#181538] mb-2.5">
                          Email Address <span className="text-[#5b72ff]">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          className={`w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border ${
                            errors.email ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:border-[#5b72ff] focus:bg-white focus:ring-4 focus:ring-[#5b72ff]/10'
                          } text-[#181538] placeholder-neutral-400 font-sans text-base focus:outline-none transition-all duration-200`}
                        />
                        {errors.email && (
                          <span className="block mt-1.5 text-xs text-red-500 font-medium">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Phone Number (Optional) with Searchable Country Code Dropdown */}
                    <div>
                      <label className="block font-sora font-semibold text-sm text-[#181538] mb-2.5">
                        Phone Number <span className="text-neutral-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative flex items-stretch rounded-2xl bg-[#F8F9FA] border border-neutral-200 focus-within:border-[#5b72ff] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#5b72ff]/10 transition-all duration-200">
                        {/* Custom Searchable Country Code Button & Dropdown */}
                        <div ref={dropdownRef} className="relative shrink-0 flex items-center">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCountryDropdownOpen(!isCountryDropdownOpen);
                              setCountrySearchQuery('');
                            }}
                            className="h-full px-4 border-r border-neutral-200/90 flex items-center gap-2 bg-neutral-100/60 hover:bg-neutral-200/60 transition-colors text-[#181538] font-sans font-medium text-base rounded-l-2xl cursor-pointer select-none"
                          >
                            <span className="text-lg leading-none">{selectedCountry.flag}</span>
                            <span>{selectedCountry.code}</span>
                            <svg
                              className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
                                isCountryDropdownOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Searchable Dropdown Popover */}
                          <AnimatePresence>
                            {isCountryDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-neutral-200 shadow-xl z-50 overflow-hidden"
                              >
                                {/* Search Input Container */}
                                <div className="p-3 border-b border-neutral-100 bg-neutral-50/70">
                                  <div className="relative flex items-center">
                                    <svg
                                      className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                      />
                                    </svg>
                                    <input
                                      ref={searchInputRef}
                                      type="text"
                                      placeholder="Search country or code..."
                                      value={countrySearchQuery}
                                      onChange={(e) => setCountrySearchQuery(e.target.value)}
                                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-neutral-200 text-sm text-[#181538] placeholder-neutral-400 font-sans focus:outline-none focus:border-[#5b72ff]"
                                    />
                                  </div>
                                </div>

                                {/* Filtered Country Options List */}
                                <div className="max-h-56 overflow-y-auto divide-y divide-neutral-100 p-1">
                                  {filteredCountries.length > 0 ? (
                                    filteredCountries.map((c) => {
                                      const isSelected = selectedCountry.code === c.code && selectedCountry.country === c.country;
                                      return (
                                        <button
                                          key={`${c.country}-${c.code}`}
                                          type="button"
                                          onClick={() => {
                                            setSelectedCountry(c);
                                            setIsCountryDropdownOpen(false);
                                          }}
                                          className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left text-sm font-sans transition-colors cursor-pointer ${
                                            isSelected
                                              ? 'bg-[#5b72ff]/10 text-[#5b72ff] font-semibold'
                                              : 'hover:bg-neutral-100 text-neutral-800'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5 truncate">
                                            <span className="text-base">{c.flag}</span>
                                            <span className="truncate">{c.name}</span>
                                          </div>
                                          <span className="text-xs font-mono font-medium text-neutral-500 shrink-0 ml-2">
                                            {c.code}
                                          </span>
                                        </button>
                                      );
                                    })
                                  ) : (
                                    <div className="px-4 py-6 text-center text-xs text-neutral-400">
                                      No country found
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Phone Input */}
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 sm:px-5 py-4 bg-transparent text-[#181538] placeholder-neutral-400 font-sans text-base focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Service Selection Chips */}
                    <div>
                      <label className="block font-sora font-semibold text-sm text-[#181538] mb-3">
                        What service do you need?
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {SERVICES.map((item) => {
                          const isSelected = formData.service === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, service: item });
                                if (errors.customService) setErrors({ ...errors, customService: '' });
                              }}
                              className={`px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#5b72ff] text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                                  : 'bg-[#F8F9FA] hover:bg-neutral-200/70 text-neutral-700 border border-neutral-200/80'
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Input for 'Other' */}
                      <AnimatePresence>
                        {formData.service === 'Other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <input
                              type="text"
                              placeholder="Please specify your service or requirement..."
                              value={formData.customService}
                              onChange={(e) => {
                                setFormData({ ...formData, customService: e.target.value });
                                if (errors.customService) setErrors({ ...errors, customService: '' });
                              }}
                              className={`w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border ${
                                errors.customService ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:border-[#5b72ff] focus:bg-white focus:ring-4 focus:ring-[#5b72ff]/10'
                              } text-[#181538] placeholder-neutral-400 font-sans text-base focus:outline-none transition-all duration-200`}
                            />
                            {errors.customService && (
                              <span className="block mt-1.5 text-xs text-red-500 font-medium">{errors.customService}</span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message Details */}
                    <div>
                      <label className="block font-sora font-semibold text-sm text-[#181538] mb-2.5">
                        Project Details / Message <span className="text-[#5b72ff]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your project goals, timelines, or requirements..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        className={`w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border ${
                          errors.message ? 'border-red-500 focus:ring-red-200' : 'border-neutral-200 focus:border-[#5b72ff] focus:bg-white focus:ring-4 focus:ring-[#5b72ff]/10'
                        } text-[#181538] placeholder-neutral-400 font-sans text-base focus:outline-none transition-all duration-200 resize-none`}
                      />
                      {errors.message && (
                        <span className="block mt-1.5 text-xs text-red-500 font-medium">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Error Notification */}
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-red-50 border border-red-200/90 text-red-700 text-sm font-medium flex items-center justify-between gap-3 shadow-sm"
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="leading-snug">{submitError}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSubmitError(null)}
                          className="text-red-400 hover:text-red-700 font-bold text-xl leading-none transition-colors p-1"
                          aria-label="Dismiss error"
                        >
                          &times;
                        </button>
                      </motion.div>
                    )}

                    {/* Project Section Style Action Button */}
                    <div className="pt-2 flex justify-center sm:justify-start w-full">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex items-center justify-between gap-4 sm:gap-6 bg-[#5b72ff] text-white hover:bg-[#4760ff] transition-all duration-300 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-[18px] active:scale-95 cursor-pointer shadow-lg shadow-blue-500/20 disabled:opacity-90 disabled:cursor-wait"
                      >
                        <span className="font-sans font-medium tracking-tight text-white flex items-center gap-2">
                          {isSubmitting ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span>Sending Message</span>
                              <span className="inline-flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                              </span>
                            </span>
                          ) : (
                            'Send Message'
                          )}
                        </span>
                        <span className="relative w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-[#5b72ff] shrink-0 group-hover:bg-neutral-100 transition-colors duration-200 shadow-sm overflow-hidden">
                          {isSubmitting ? (
                            <>
                              {/* Spinning gradient ring accent */}
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                className="absolute inset-0.5 rounded-full border-2 border-transparent border-t-[#5b72ff] border-r-[#8b5cf6]"
                              />
                              {/* BrandLogo continuous rotation and pulsing scale animation */}
                              <motion.div
                                animate={{
                                  rotate: 360,
                                  scale: [0.85, 1.12, 0.85],
                                }}
                                transition={{
                                  rotate: { repeat: Infinity, duration: 1.4, ease: 'linear' },
                                  scale: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
                                }}
                                className="relative z-10 flex items-center justify-center"
                              >
                                <BrandLogo
                                  className="h-4 sm:h-5 w-auto text-[#5b72ff]"
                                  fill="#5b72ff"
                                  useGradient={false}
                                />
                              </motion.div>
                            </>
                          ) : (
                            <BrandLogo
                              className="h-4 sm:h-5 w-auto text-[#5b72ff] transition-transform duration-500 ease-out group-hover:rotate-45"
                              fill="#5b72ff"
                              useGradient={false}
                            />
                          )}
                        </span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
