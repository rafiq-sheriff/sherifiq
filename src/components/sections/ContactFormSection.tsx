'use client';

import React, { useState } from 'react';
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

export default function ContactFormSection() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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

                    {/* Phone Number (Optional) */}
                    <div>
                      <label className="block font-sora font-semibold text-sm text-[#181538] mb-2.5">
                        Phone Number <span className="text-neutral-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border border-neutral-200 focus:border-[#5b72ff] focus:bg-white focus:ring-4 focus:ring-[#5b72ff]/10 text-[#181538] placeholder-neutral-400 font-sans text-base focus:outline-none transition-all duration-200"
                      />
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

                    {/* Project Section Style Action Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex items-center justify-between gap-4 sm:gap-6 bg-[#5b72ff] text-white hover:bg-[#4760ff] transition-all duration-300 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-[18px] active:scale-95 cursor-pointer shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <span className="font-sans font-medium tracking-tight text-white">
                          {isSubmitting ? 'Sending Message...' : 'Send Message'}
                        </span>
                        <span className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-[#5b72ff] shrink-0 group-hover:bg-neutral-100 transition-colors duration-200 shadow-sm overflow-hidden">
                          {isSubmitting ? (
                            <svg className="w-5 h-5 animate-spin text-[#5b72ff]" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
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
