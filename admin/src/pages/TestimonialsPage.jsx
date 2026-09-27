import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Quote, Star, Image as ImageIcon, Loader2 } from 'lucide-react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../services/api';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Toast } from '../components/Toast';
import { MediaPickerModal } from '../components/MediaPickerModal';

export const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: '',
    clientCompany: '',
    clientAvatar: '',
    rating: 5,
    content: '',
    projectTitle: '',
    order: 0
  });

  // Action states
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchTestimonialsList = async () => {
    try {
      const res = await getTestimonials();
      if (res.data) setTestimonials(res.data);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonialsList();
  }, []);

  const openAddModal = () => {
    setEditingTestimonial(null);
    setFormData({
      clientName: '',
      clientRole: 'VP of Engineering',
      clientCompany: 'Tech Corp',
      clientAvatar: '',
      rating: 5,
      content: '',
      projectTitle: '',
      order: testimonials.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingTestimonial(t);
    setFormData({
      clientName: t.clientName,
      clientRole: t.clientRole,
      clientCompany: t.clientCompany,
      clientAvatar: t.clientAvatar || '',
      rating: t.rating || 5,
      content: t.content,
      projectTitle: t.projectTitle || '',
      order: t.order || 0
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, formData);
        setToast({ message: 'Testimonial updated successfully!', type: 'success' });
      } else {
        await createTestimonial(formData);
        setToast({ message: 'Testimonial added successfully!', type: 'success' });
      }
      setIsModalOpen(false);
      fetchTestimonialsList();
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
      await deleteTestimonial(deleteTarget.id);
      setToast({ message: 'Testimonial deleted successfully!', type: 'success' });
      setDeleteTarget(null);
      fetchTestimonialsList();
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

      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => setFormData((prev) => ({ ...prev, clientAvatar: url }))}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Client Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage endorsements, recommendations, and reviews from leaders and clients.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-indigo-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-xs">
            <Quote className="w-10 h-10 mx-auto mb-2 text-slate-600" />
            <p>No testimonials added yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Testimonial Quote</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                          {t.clientAvatar ? (
                            <img src={t.clientAvatar} alt={t.clientName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">
                              {t.clientName?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{t.clientName}</p>
                          <p className="text-slate-500 text-[11px]">{t.clientRole} at <span className="text-slate-300">{t.clientCompany}</span></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-slate-300 line-clamp-2 italic">"{t.content}"</p>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(t)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                        title="Edit Testimonial"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(t)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Testimonial"
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

      {/* Add / Edit Testimonial Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Client Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Sarah Jenkins"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Client Role / Position *
              </label>
              <input
                type="text"
                required
                value={formData.clientRole}
                onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                placeholder="VP of Engineering"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.clientCompany}
                onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                placeholder="CloudScale Technologies"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Rating (1 to 5 Stars)
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value={5}>5 Stars (Exceptional)</option>
                <option value={4}>4 Stars (Great)</option>
                <option value={3}>3 Stars (Good)</option>
              </select>
            </div>
          </div>

          {/* Client Avatar URL with Media Picker */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Avatar Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.clientAvatar}
                onChange={(e) => setFormData({ ...formData, clientAvatar: e.target.value })}
                placeholder="https://... or choose media"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setMediaPickerOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-slate-700 shrink-0"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Choose</span>
              </button>
            </div>
          </div>

          {/* Quote Content */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Testimonial Quote / Endorsement *
            </label>
            <textarea
              rows={4}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Vamsi is an exceptional software engineer who transformed our complex legacy platform..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
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
              <span>{editingTestimonial ? 'Update Testimonial' : 'Save Testimonial'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${deleteTarget?.clientName}"?`}
        loading={actionLoading}
      />
    </div>
  );
};
