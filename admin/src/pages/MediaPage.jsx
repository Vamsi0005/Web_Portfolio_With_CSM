import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Copy, Check, Eye, Image as ImageIcon, Search, Loader2, ExternalLink } from 'lucide-react';
import { getMediaList, uploadImage, deleteMedia } from '../services/api';
import { Modal } from '../components/Modal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Toast } from '../components/Toast';

export const MediaPage = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');

  // Preview & Delete States
  const [previewMedia, setPreviewMedia] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchMedia = async () => {
    try {
      const res = await getMediaList();
      if (res.data) setMediaList(res.data);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('altText', file.name);

    setUploading(true);
    try {
      const res = await uploadImage(formData);
      setToast({ message: 'Image uploaded successfully!', type: 'success' });
      fetchMedia();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setToast({ message: 'Media URL copied to clipboard!', type: 'success' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);

    try {
      await deleteMedia(deleteTarget.id);
      setToast({ message: 'Media deleted successfully!', type: 'success' });
      setDeleteTarget(null);
      fetchMedia();
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const filteredMedia = mediaList.filter(
    (m) =>
      m.originalName.toLowerCase().includes(search.toLowerCase()) ||
      (m.altText && m.altText.toLowerCase().includes(search.toLowerCase()))
  );

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
            Media Library & Assets
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Upload, browse, inspect metadata, copy public URLs, and manage portfolio media assets.
          </p>
        </div>

        {/* Upload Button */}
        <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 cursor-pointer transition-all self-start sm:self-auto">
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{uploading ? 'Uploading File...' : 'Upload Image'}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media by filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-indigo-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm font-semibold">No media files found</p>
          <p className="text-slate-500 text-xs mt-1">Upload your first image above to use across projects and blogs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((m) => (
            <div
              key={m.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
            >
              {/* Image Thumbnail */}
              <div
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => setPreviewMedia(m)}
              >
                <img
                  src={m.url}
                  alt={m.altText || m.originalName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewMedia(m);
                    }}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/40 text-white backdrop-blur-md"
                    title="Preview Image"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyUrl(m.url, m.id);
                    }}
                    className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                    title="Copy URL"
                  >
                    {copiedId === m.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* File Info */}
              <div className="p-4 space-y-2 text-xs">
                <p className="font-bold text-white truncate" title={m.originalName}>
                  {m.originalName}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{(m.size / 1024).toFixed(1)} KB</span>
                  <span>{m.mimeType.split('/')[1]?.toUpperCase()}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyUrl(m.url, m.id)}
                    className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === m.id ? 'Copied' : 'Copy URL'}</span>
                  </button>

                  <button
                    onClick={() => setDeleteTarget(m)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Delete Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewMedia && (
        <Modal
          isOpen={Boolean(previewMedia)}
          onClose={() => setPreviewMedia(null)}
          title={previewMedia.originalName}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4">
            <div className="w-full max-h-[60vh] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center p-2">
              <img
                src={previewMedia.url}
                alt={previewMedia.altText}
                className="max-h-[55vh] object-contain rounded-xl"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-400">Public URL:</span>
                <button
                  onClick={() => handleCopyUrl(previewMedia.url, previewMedia.id)}
                  className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
              <p className="font-mono text-slate-300 break-all bg-slate-900 p-2 rounded-lg border border-slate-800">
                {previewMedia.url}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Media File"
        message={`Are you sure you want to delete "${deleteTarget?.originalName}"? This will remove the file from storage.`}
        loading={actionLoading}
      />
    </div>
  );
};
