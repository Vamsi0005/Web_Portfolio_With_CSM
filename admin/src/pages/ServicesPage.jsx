import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Layout, Sliders, Cpu, CloudLightning, Loader2, Check } from 'lucide-react';
import { getServices, createService, updateService, deleteService } from '../services/api';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Toast } from '../components/Toast';

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Layout',
    features: '',
    order: 0
  });

  // Action states
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchServicesList = async () => {
    try {
      const res = await getServices();
      if (res.data) setServices(res.data);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesList();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      icon: 'Layout',
      features: 'Full-Stack Architecture, RESTful APIs, Database Design, Scalability Audits',
      order: services.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (svc) => {
    setEditingService(svc);
    setFormData({
      title: svc.title,
      description: svc.description,
      icon: svc.icon || 'Layout',
      features: svc.features || '',
      order: svc.order || 0
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      if (editingService) {
        await updateService(editingService.id, formData);
        setToast({ message: 'Service updated successfully!', type: 'success' });
      } else {
        await createService(formData);
        setToast({ message: 'Service offering created successfully!', type: 'success' });
      }
      setIsModalOpen(false);
      fetchServicesList();
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
      await deleteService(deleteTarget.id);
      setToast({ message: 'Service deleted successfully!', type: 'success' });
      setDeleteTarget(null);
      fetchServicesList();
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
            Engineering & Consulting Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure client service offerings, feature breakdowns, and specialties.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-indigo-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-xs">
            <Layout className="w-10 h-10 mx-auto mb-2 text-slate-600" />
            <p>No services configured yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Service Title</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Features List</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <Layout className="w-4 h-4" />
                      </div>
                      <span>{svc.title}</span>
                    </td>
                    <td className="px-6 py-4 max-w-xs text-slate-400">
                      <p className="line-clamp-2">{svc.description}</p>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {svc.features?.split(',').slice(0, 2).map((f, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                            {f.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(svc)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(svc)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Service"
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

      {/* Add / Edit Service Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Add Service'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Service Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Full-Stack Web Development"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Service Icon
            </label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Layout">Layout / Web</option>
              <option value="Sliders">Sliders / Custom CMS</option>
              <option value="Cpu">Cpu / Microservices & API</option>
              <option value="CloudLightning">CloudLightning / DevOps & Cloud</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Service Description *
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="End-to-end web application engineering from responsive frontend interfaces..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Key Features / Deliverables (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="React SPAs, GraphQL APIs, Database Modeling, Cloud Deployments"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
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
              <span>{editingService ? 'Update Service' : 'Save Service'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        loading={actionLoading}
      />
    </div>
  );
};
