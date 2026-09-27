import React, { useState, useEffect } from 'react';
import { Save, Loader2, Image as ImageIcon, MapPin, Mail, Phone, Award, CheckCircle2 } from 'lucide-react';
import { getAbout, updateAbout } from '../services/api';
import { Toast } from '../components/Toast';
import { MediaPickerModal } from '../components/MediaPickerModal';

export const AboutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    shortBio: '',
    fullBio: '',
    avatarUrl: '',
    resumeUrl: '',
    email: '',
    phone: '',
    location: '',
    yearsExperience: 0,
    completedProjects: 0,
    happyClients: 0,
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
    leetcodeUrl: '',
    isAvailable: true
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await getAbout();
        if (res.data) {
          setFormData({
            name: res.data.name || '',
            title: res.data.title || '',
            shortBio: res.data.shortBio || '',
            fullBio: res.data.fullBio || '',
            avatarUrl: res.data.avatarUrl || '',
            resumeUrl: res.data.resumeUrl || '',
            email: res.data.email || '',
            phone: res.data.phone || '',
            location: res.data.location || '',
            yearsExperience: res.data.yearsExperience || 0,
            completedProjects: res.data.completedProjects || 0,
            happyClients: res.data.happyClients || 0,
            githubUrl: res.data.githubUrl || '',
            linkedinUrl: res.data.linkedinUrl || '',
            twitterUrl: res.data.twitterUrl || '',
            leetcodeUrl: res.data.leetcodeUrl || '',
            isAvailable: res.data.isAvailable !== undefined ? res.data.isAvailable : true
          });
        }
      } catch (err) {
        setToast({ message: err.message, type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? parseInt(value, 10) || 0
          : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAbout(formData);
      setToast({ message: 'About information updated successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-indigo-400">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => setFormData((prev) => ({ ...prev, avatarUrl: url }))}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Manage About Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Update personal bio, headline, contact coordinates, metrics, and social profiles.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Form Inputs */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Basic Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Professional Title
              </label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Senior Full-Stack Engineer"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Avatar URL with picker */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Avatar Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setMediaPickerOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-slate-700 shrink-0"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Choose Media</span>
              </button>
            </div>
          </div>

          {/* Short Bio */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Short Elevator Pitch (Hero Section)
            </label>
            <textarea
              name="shortBio"
              rows={2}
              required
              value={formData.shortBio}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Full Bio */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Full Narrative Bio (About Section)
            </label>
            <textarea
              name="fullBio"
              rows={5}
              required
              value={formData.fullBio}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Contact Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Numbers / Stats Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Years Exp
              </label>
              <input
                type="number"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Projects Completed
              </label>
              <input
                type="number"
                name="completedProjects"
                value={formData.completedProjects}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Happy Clients
              </label>
              <input
                type="number"
                name="happyClients"
                value={formData.happyClients}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Twitter / X URL
              </label>
              <input
                type="url"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
                placeholder="https://x.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Resume and Availability Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Resume Download Link / URL
              </label>
              <input
                type="text"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                placeholder="https://... or /resume.pdf"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isAvailable"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
              />
              <label htmlFor="isAvailable" className="text-xs font-medium text-slate-200 cursor-pointer">
                Available for hire / accepting new client opportunities
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 disabled:opacity-50 transition-all"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save About Profile</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right: Live Preview Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 text-center">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 text-left">
              Live Profile Preview
            </h3>

            <div className="relative mx-auto w-28 h-28 rounded-2xl overflow-hidden bg-slate-800 p-0.5 border-2 border-indigo-500">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt={formData.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">{formData.name || 'Your Name'}</h4>
              <p className="text-xs font-mono text-indigo-400">{formData.title || 'Your Title'}</p>
            </div>

            <p className="text-xs text-slate-400 line-clamp-3 text-left">
              {formData.shortBio || 'Short elevator description will appear here.'}
            </p>

            <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-4 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-950">
                <p className="text-base font-bold text-indigo-400">{formData.yearsExperience}+</p>
                <p className="text-[10px] text-slate-500">Years</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-950">
                <p className="text-base font-bold text-purple-400">{formData.completedProjects}+</p>
                <p className="text-[10px] text-slate-500">Projects</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-950">
                <p className="text-base font-bold text-emerald-400">{formData.happyClients}+</p>
                <p className="text-[10px] text-slate-500">Clients</p>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
