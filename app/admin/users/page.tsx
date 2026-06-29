import { AdminShell } from "@/components/AdminShell";
import { getUsers } from "@/lib/admin";
import { InviteUserForm } from "./InviteUserForm";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <AdminShell active="/admin/users" title="Users" subtitle="Manage team member accounts">
      <div className="space-y-8">
        <section className="max-w-lg rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Invite Team Member</h2>
          <InviteUserForm />
        </section>

        <section className="rounded border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-400">
                      No team members yet.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-slate-900">{u.full_name}</td>
                      <td className="px-5 py-3 text-slate-600">{u.email ?? "—"}</td>
                      <td className="px-5 py-3">
                        <span className="inline-block rounded bg-orange-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-orange-700">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
