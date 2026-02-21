'use client';

import { SettingsPage } from '@/components/pages/settings-page';
import { AppShell } from '@/components/app-shell';

export default function SettingsRoute() {
  return (
    <AppShell currentPage="settings">
      <SettingsPage />
    </AppShell>
  );
}
