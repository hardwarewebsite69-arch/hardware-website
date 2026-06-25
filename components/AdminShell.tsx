import { getCurrentUserProfile } from "@/lib/admin";
import { AdminShellClient } from "@/components/AdminShellClient";

export async function AdminShell({
  active,
  children,
  title,
  subtitle,
}: {
  active: string;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const userProfile = await getCurrentUserProfile();
  const fallbackUser = { id: "", email: "admin@amroz.com", full_name: "Amroz Admin", role: "admin" };
  const user = userProfile ?? fallbackUser;

  return (
    <AdminShellClient
      title={title}
      subtitle={subtitle}
      user={user}
    >
      {children}
    </AdminShellClient>
  );
}

