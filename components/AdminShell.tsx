import { redirect } from "next/navigation";
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

  if (!userProfile) {
    redirect("/login");
  }

  return (
    <AdminShellClient
      title={title}
      subtitle={subtitle}
      user={userProfile}
    >
      {children}
    </AdminShellClient>
  );
}

