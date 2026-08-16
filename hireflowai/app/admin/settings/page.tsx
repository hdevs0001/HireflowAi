import { getCompanySettings } from "@/action/settings";
import { SettingsTabs } from "@/components/dashboard/settingsTabs";

export default async function SettingsPage() {
  const settings = await getCompanySettings();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your company profile, application rules, and AI evaluation
          defaults.
        </p>
      </div>

      <SettingsTabs settings={settings} />
    </div>
  );
}
