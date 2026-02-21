'use client';

import { GroupsPage } from '@/components/pages/groups-page';
import { AppShell } from '@/components/app-shell';

export default function GroupsRoute() {
  return (
    <AppShell currentPage="groups">
      <GroupsPage />
    </AppShell>
  );
}
