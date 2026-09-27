import React, { useState } from 'react';
import { Lock, Shield, Server, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { changePassword } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/Toast';

export const SettingsPage = () => {
  const { user, logoutUser } = useAuth();

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword.length < 6) {
      setToast({ message: 'New password must be at least 6 characters.', type: 'error' });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setToast({ message: 'New password and confirmation do not match.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setToast({ message: 'Password updated successfully! Logging out...', type: 'success' });
      setTimeout(() => {
        logoutUser();
      }, 1500);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Admin Account & Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your credentials, authentication session, and system configurations.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          <span>Authenticated Administrator Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-mono text-slate-500 uppercase text-[10px]">Name</span>
            <p className="text-sm font-bold text-white">{user?.name || 'Administrator'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-mono text-slate-500 uppercase text-[10px]">Email Address</span>
            <p className="text-sm font-bold text-indigo-400 font-mono">{user?.email || 'admin@portfolio.local'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-mono text-slate-500 uppercase text-[10px]">Access Role</span>
            <p className="text-sm font-bold text-emerald-400 font-mono">ROLE_ADMIN</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-mono text-slate-500 uppercase text-[10px]">Session Status</span>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Active JWT Token Session</span>
            </p>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-purple-400" />
          <span>Update Admin Password</span>
        </h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              New Password (Min. 6 chars) *
            </label>
            <input
              type="password"
              required
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 disabled:opacity-50 transition-all mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Change Password</span>
            )}
          </button>
        </form>
      </div>

      {/* System Architecture & Health Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-400" />
          <span>System Environment & Ports</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 block">Frontend Web</span>
            <span className="text-slate-200 font-bold">http://localhost:5173</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 block">Admin CMS Panel</span>
            <span className="text-slate-200 font-bold">http://localhost:5174</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 block">Express Backend API</span>
            <span className="text-slate-200 font-bold">http://localhost:5000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
