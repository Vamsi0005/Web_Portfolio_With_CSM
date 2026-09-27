import React, { useState, useEffect } from 'react';
import { Mail, Search, CheckCircle2, Circle, Trash2, Eye, Reply, Loader2 } from 'lucide-react';
import { getMessages, markMessageRead, deleteMessage } from '../services/api';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Toast } from '../components/Toast';

export const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRead, setFilterRead] = useState('all');
  const [search, setSearch] = useState('');

  // Selected for View Modal
  const [viewingMessage, setViewingMessage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchMessagesList = async () => {
    try {
      const params = {};
      if (filterRead === 'unread') params.isRead = 'false';
      if (filterRead === 'read') params.isRead = 'true';
      if (search) params.search = search;

      const res = await getMessages(params);
      if (res.data) setMessages(res.data);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesList();
  }, [filterRead, search]);

  const handleToggleRead = async (msg, e) => {
    if (e) e.stopPropagation();
    try {
      await markMessageRead(msg.id, !msg.isRead);
      setToast({
        message: `Message marked as ${!msg.isRead ? 'read' : 'unread'}`,
        type: 'success'
      });
      fetchMessagesList();
      if (viewingMessage && viewingMessage.id === msg.id) {
        setViewingMessage((prev) => ({ ...prev, isRead: !msg.isRead }));
      }
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const handleOpenView = async (msg) => {
    setViewingMessage(msg);
    if (!msg.isRead) {
      // Auto mark as read when opened
      try {
        await markMessageRead(msg.id, true);
        fetchMessagesList();
      } catch (e) {}
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);

    try {
      await deleteMessage(deleteTarget.id);
      setToast({ message: 'Inquiry deleted successfully!', type: 'success' });
      setDeleteTarget(null);
      if (viewingMessage?.id === deleteTarget.id) {
        setViewingMessage(null);
      }
      fetchMessagesList();
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
            Client Inquiries & Messages
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review contact form submissions, manage status, and reply directly.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setFilterRead('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
              filterRead === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Messages
          </button>
          <button
            onClick={() => setFilterRead('unread')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
              filterRead === 'unread' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilterRead('read')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
              filterRead === 'read' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Read
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by sender, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-indigo-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-xs">
            <Mail className="w-10 h-10 mx-auto mb-2 text-slate-600" />
            <p>No messages found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 w-12">Status</th>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Subject & Excerpt</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => handleOpenView(msg)}
                    className={`cursor-pointer transition-colors ${
                      msg.isRead ? 'hover:bg-slate-800/40 text-slate-400' : 'bg-indigo-950/15 hover:bg-indigo-950/30 text-white font-medium'
                    }`}
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleToggleRead(msg, e)}
                        className="p-1 rounded text-slate-500 hover:text-indigo-400"
                        title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                      >
                        {msg.isRead ? (
                          <CheckCircle2 className="w-4 h-4 text-slate-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`font-bold ${msg.isRead ? 'text-slate-300' : 'text-white'}`}>{msg.name}</p>
                        <p className="text-slate-500 text-[11px] font-mono">{msg.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <p className={`font-semibold ${msg.isRead ? 'text-slate-300' : 'text-indigo-300'}`}>{msg.subject}</p>
                      <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">{msg.message}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500 text-[11px]">
                      {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenView(msg)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10"
                        title="View Full Message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="inline-block p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                        title="Reply by Email"
                      >
                        <Reply className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setDeleteTarget(msg)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                        title="Delete Message"
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

      {/* View Message Modal */}
      {viewingMessage && (
        <Modal
          isOpen={Boolean(viewingMessage)}
          onClose={() => setViewingMessage(null)}
          title="Inquiry Details"
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 text-xs">
            {/* Sender summary */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono">From:</span>
                <span className="font-mono text-slate-500">
                  {new Date(viewingMessage.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm font-bold text-white">{viewingMessage.name}</p>
              <p className="font-mono text-indigo-400">{viewingMessage.email}</p>
            </div>

            {/* Subject & Body */}
            <div className="space-y-2">
              <span className="text-slate-400 font-mono uppercase text-[10px]">Subject</span>
              <h3 className="text-base font-bold text-white">{viewingMessage.subject}</h3>
            </div>

            <div className="space-y-2">
              <span className="text-slate-400 font-mono uppercase text-[10px]">Message Content</span>
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                {viewingMessage.message}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => handleToggleRead(viewingMessage)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Mark as {viewingMessage.isRead ? 'Unread' : 'Read'}
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setDeleteTarget(viewingMessage);
                  }}
                  className="px-3.5 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 font-semibold"
                >
                  Delete
                </button>
                <a
                  href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(viewingMessage.subject)}`}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md"
                >
                  <Reply className="w-4 h-4" />
                  <span>Reply by Email</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Inquiry Message"
        message={`Are you sure you want to delete the message from "${deleteTarget?.name}"?`}
        loading={actionLoading}
      />
    </div>
  );
};
