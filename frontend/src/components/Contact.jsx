import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { submitContact } from '../services/api';
import { Toast } from './Toast';

export const Contact = ({ about }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await submitContact(formData);
      setToast({
        message: response.message || 'Thank you! Your message was received successfully.',
        type: 'success'
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setFieldErrors({});
    } catch (error) {
      setToast({
        message: error.message || 'Unable to send your message. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      {/* Toast popup */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's Build Something Exceptional Together
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Have a project in mind, an engineering opening, or just want to connect? Send a message below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Direct Inquiries & Office
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  I typically respond within 24 hours. Feel free to reach out via form or direct channels.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {about?.email && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-300 uppercase tracking-wider">Email</span>
                      <a
                        href={`mailto:${about.email}`}
                        className="block text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {about.email}
                      </a>
                    </div>
                  </div>
                )}

                {about?.location && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-300 uppercase tracking-wider">Location</span>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {about.location}
                      </p>
                    </div>
                  </div>
                )}

                {about?.phone && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-300 uppercase tracking-wider">Phone</span>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {about.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Indicator */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  Currently accepting new consulting & engineering projects.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name and Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      disabled={loading}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        fieldErrors.name
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-xs text-rose-500">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={loading}
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        fieldErrors.email
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-rose-500">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity / Architecture Review"
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      fieldErrors.subject
                        ? 'border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                    }`}
                  />
                  {fieldErrors.subject && (
                    <p className="text-xs text-rose-500">{fieldErrors.subject}</p>
                  )}
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project scope, timeline, and goals..."
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800/80 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                      fieldErrors.message
                        ? 'border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                    }`}
                  ></textarea>
                  {fieldErrors.message && (
                    <p className="text-xs text-rose-500">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
