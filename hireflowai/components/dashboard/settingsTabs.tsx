"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyProfileForm } from "@/components/dashboard/companyProfileForm";
import { ApplicationSettingsForm } from "@/components/dashboard/applicationSettingsForm";
import { DefaultPromptForm } from "@/components/dashboard/defaultPromptForm";

interface Props {
  settings: {
    companyName: string;
    address: string | null;
    email: string;
    applicationCooldownDays: number;
    rejectionThreshold: number;
    recommendedThreshold: number;
    aiDefaultPrompt: string | null;
  };
}

export function SettingsTabs({ settings }: Props) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList>
        <TabsTrigger value="profile">Company Profile</TabsTrigger>
        <TabsTrigger value="application">Application Settings</TabsTrigger>
        <TabsTrigger value="prompt">AI Evaluation</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <CompanyProfileForm
          companyName={settings.companyName}
          address={settings.address ?? ""}
          email={settings.email}
        />
      </TabsContent>

      <TabsContent value="application" className="mt-6">
        <ApplicationSettingsForm
          applicationCooldownDays={settings.applicationCooldownDays}
          rejectionThreshold={settings.rejectionThreshold}
          recommendedThreshold={settings.recommendedThreshold}
        />
      </TabsContent>

      <TabsContent value="prompt" className="mt-6">
        <DefaultPromptForm aiDefaultPrompt={settings.aiDefaultPrompt ?? ""} />
      </TabsContent>
    </Tabs>
  );
}
