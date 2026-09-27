import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Check, Loader2, Search, X } from 'lucide-react';
import { getMediaList, uploadImage } from '../services/api';
import { Modal } from './Modal';

export const MediaPickerModal = ({ isOpen, onClose, onSelect }) => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await getMediaList();
      if (res.data) setMediaList(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('altText', file.name);

    setUploading(true);
    try {
      const res = await uploadImage(formData);
      if (res.data) {
        onSelect(res.data.url);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const filteredMedia = mediaList.filter(
    (m) =>
      m.originalName?.toLowerCase().includes(search.toLowerCase()) ||
      m.altText?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select or Upload Media" maxWidth="max-w-4xl">
      <div className="space-y-6">
        {/* Upload Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-md shadow-indigo-600/20 transition-all">
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload New Image'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        {/* Media Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-xs">
            <ImageIcon className="w-10 h-10 mx-auto mb-2 text-slate-600" />
            <p>No media files found. Upload your first image!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto pr-1">
            {filteredMedia.map((media) => (
              <div
                key={media.id}
                onClick={() => {
                  onSelect(media.url);
                  onClose();
                }}
                className="group relative aspect-video rounded-xl bg-slate-800 border border-slate-700 overflow-hidden cursor-pointer hover:border-indigo-500 transition-all shadow-sm"
              >
                <img
                  src={media.url}
                  alt={media.altText || media.originalName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-[11px] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Select
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 px-2 py-1 truncate text-[10px] text-slate-300">
                  {media.originalName}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
