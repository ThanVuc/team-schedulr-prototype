'use client';

import { GroupDetailPage } from '@/components/pages/group-detail-page';
import { AppShell } from '@/components/app-shell';

interface GroupDetailRouteProps {
  params: {
    id: string;
  };
}

export default function GroupDetailRoute({ params }: GroupDetailRouteProps) {
  return (
    <AppShell currentPage="groups">
      <GroupDetailPage groupId={params.id} />
    </AppShell>
  );
}
