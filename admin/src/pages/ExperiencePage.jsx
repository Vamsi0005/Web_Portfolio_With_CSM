import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Briefcase, Calendar, MapPin, Loader2, Building2 } from 'lucide-react';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../services/api';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Toast } from '../components/Toast';

export const ExperiencePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    companyUrl: '',
    location: '',
    type: 'Full-time',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    achievements: '',
    technologies: '',
    order: 0
  });

  // Action states
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchExperienceList = async () => {
    try {
      const res = await getExperience();
      if (res.data) setExperiences(res.data);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperienceList();
  }, []);

  const openAddModal = () => {
    setEditingExp(null);
    setFormData({
      role: '',
      company: '',
      companyUrl: '',
      location: 'San Francisco, CA',
      type: 'Full-time',
      startDate: '2023',
      endDate: 'Present',
      isCurrent: true,
      description: '',
      achievements: '["Shipped core feature with 99.9% uptime", "Led team of 5 engineers"]',
      technologies: 'React, Node.js, PostgreSQL',
      order: experiences.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setEditingExp(exp);
    setFormData({
      role: exp.role,
      company: exp.company,
      companyUrl: exp.companyUrl || '',
      location: exp.location || '',
      type: exp.type || 'Full-time',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      isCurrent: exp.isCurrent,
      description: exp.description,
      achievements: exp.achievements || '',
      technologies: exp.technologies || '',
      order: exp.order || 0
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      if (editingExp) {
        await updateExperience(editingExp.id, formData);
        setToast({ message: 'Experience record updated successfully!', type: 'success' });
      } else {
        await createExperience(formData);
        setToast({ message: 'Experience record added successfully!', type: 'success' });
      }
      setIsModalOpen(false);
      fetchExperienceList();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);

    try {
      await deleteExperience(deleteTarget.id);
      setToast({ message: 'Experience record deleted successfully!', type: 'success' });
      setDeleteTarget(null);
      fetchExperienceList();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Career & Work Experience
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Maintain your chronological work timeline, positions, achievements, and impact.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {/* Experience Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-indigo-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-xs">
            <Briefcase className="w-10 h-10 mx-auto mb-2 text-slate-600" />
            <p>No work history records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Role & Company</th>
                  <th className="px-6 py-4">Period</th>
                  <th className="px-6 py-4">Type / Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {experiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-white text-sm">{exp.role}</p>
                        <p className="text-indigo-400 font-semibold text-xs mt-0.5">{exp.company}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-300">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <div>
                        <span className="font-semibold text-slate-300">{exp.type}</span>
                        {exp.location && <span className="block text-[11px] text-slate-500">{exp.location}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {exp.isCurrent ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Current
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">
                          Past
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(exp)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                        title="Edit Position"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(exp)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Position"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Experience Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExp ? 'Edit Position' : 'Add Work Experience'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Job Title / Role *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Senior Full-Stack Engineer"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Apex Cloud Systems"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Company Website
              </label>
              <input
                type="url"
                value={formData.companyUrl}
                onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                placeholder="https://company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="San Francisco, CA / Remote"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Employment Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Start Date (e.g. 2023 or Jan 2023) *
              </label>
              <input
                type="text"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                End Date (e.g. Present or Dec 2024)
              </label>
              <input
                type="text"
                disabled={formData.isCurrent}
                value={formData.isCurrent ? 'Present' : formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isCurrent"
              checked={formData.isCurrent}
              onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
            />
            <label htmlFor="isCurrent" className="text-xs font-semibold text-slate-200 cursor-pointer">
              I currently work here in this position
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Role Description *
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summary of responsibilities and architectural scope..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Key Achievements / Highlights (JSON or new line separated)
            </label>
            <textarea
              rows={3}
              value={formData.achievements}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
              placeholder='["Reduced latency by 40%", "Migrated microservices to Docker"]'
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Technologies (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, TypeScript, Node.js, PostgreSQL, AWS"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50"
            >
              {actionLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{editingExp ? 'Update Position' : 'Save Position'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Experience Record"
        message={`Are you sure you want to delete "${deleteTarget?.role} at ${deleteTarget?.company}"?`}
        loading={actionLoading}
      />
    </div>
  );
};
