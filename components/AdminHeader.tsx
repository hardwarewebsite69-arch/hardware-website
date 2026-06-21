"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCurrentUserProfile, signOutAction } from "@/lib/admin";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  user: {
    id: string;
    email: string | undefined;
    full_name: string;
    role: string;
  };
  onMenuClick?: () => void;
}

export function AdminHeader({ title, subtitle, user, onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user.full_name);
  const [isSavingName, setIsSavingName] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || newName === user.full_name) {
      setIsEditingName(false);
      return;
    }
    setIsSavingName(true);
    try {
      await updateCurrentUserProfile(newName.trim());
      setIsEditingName(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile name.");
    } finally {
      setIsSavingName(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutAction();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to sign out.");
    }
  };

  // Get user initials for profile avatar
  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "A";

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8 relative z-30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Toggle on Mobile */}
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-label="Open sidebar"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-normal text-slate-950">{title}</h1>
            {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex min-w-0 flex-1 items-center rounded border border-slate-200 bg-slate-50 px-3 w-64 md:w-80">
            <span className="material-symbols-outlined text-slate-500">search</span>
            <input
              className="w-full bg-transparent px-3 py-2 text-sm outline-none text-slate-900 placeholder-slate-400"
              placeholder="Search admin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Profile Action Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors"
              type="button"
              aria-label="Profile menu"
            >
              <span className="text-sm font-bold text-slate-700">{initials}</span>
            </button>

            {/* Profile Dropdown Card */}
            {isDropdownOpen && (
              <>
                {/* Backdrop click shield to close dropdown */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsEditingName(false);
                  }}
                />

                <div className="absolute right-0 mt-2 w-80 rounded-lg border border-slate-200 bg-white p-5 shadow-xl z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-extrabold text-lg">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-extrabold text-slate-950">{user.full_name}</p>
                      <p className="truncate text-xs text-slate-500">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-700 px-2 py-0.5 rounded">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Dropdown Options */}
                  <div className="pt-4 space-y-3">
                    {isEditingName ? (
                      <form onSubmit={handleSaveName} className="space-y-2">
                        <label htmlFor="edit-name-input" className="block text-xs font-bold text-slate-500 uppercase">
                          Full Name
                        </label>
                        <input
                          id="edit-name-input"
                          type="text"
                          required
                          className="w-full px-3 py-1.5 border border-slate-300 rounded text-sm outline-none focus:border-orange-500"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setIsEditingName(false)}
                            className="px-2.5 py-1.5 border border-slate-200 rounded font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSavingName}
                            className="px-2.5 py-1.5 bg-orange-600 text-white rounded font-semibold hover:bg-orange-500 disabled:opacity-50"
                          >
                            {isSavingName ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditingName(true)}
                        className="w-full flex items-center gap-2 rounded px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-950 text-left transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                        Edit Profile Name
                      </button>
                    )}

                    <hr className="border-slate-100" />

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 rounded px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 text-left transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
