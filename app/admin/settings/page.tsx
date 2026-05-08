import { AdminPlaceholder } from "@/components/admin/admin-placeholder";

export default function AdminSettingsPage() {
  return (
    <AdminPlaceholder
      title="Admin Settings"
      description="This module will eventually manage platform settings, payment display configuration, upload provider settings, maintenance mode, and support contact values."
      nextStep="Deployment preparation and production hardening steps will define which settings should be database-backed versus environment-variable based."
    />
  );
}
