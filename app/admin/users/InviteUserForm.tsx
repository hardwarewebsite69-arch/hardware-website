"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inviteUserByEmail } from "@/lib/admin";

export function InviteUserForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("staff");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await inviteUserByEmail(email, fullName, role);
      setMessage({ type: "success", text: `Invitation sent to ${email}` });
      setEmail("");
      setFullName("");
      setRole("staff");
      router.refresh();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Full Name
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Jane Doe"
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Email Address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {message && (
        <div
          className={`rounded px-3 py-2 text-xs font-semibold ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-orange-600 px-4 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition hover:bg-orange-500 disabled:opacity-50"
      >
        {loading ? "Sending Invitation..." : "Send Invitation"}
      </button>
    </form>
  );
}
