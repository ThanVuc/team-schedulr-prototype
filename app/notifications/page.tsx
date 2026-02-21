'use client';

import { NotificationsPage } from '@/components/pages/notifications-page';
import { AppShell } from '@/components/app-shell';

export default function NotificationsRoute() {
  return (
    <AppShell currentPage="notifications">
      <NotificationsPage />
    </AppShell>
  );
}
