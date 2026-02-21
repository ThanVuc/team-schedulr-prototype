'use client';

import { Plus, Inbox } from 'lucide-react';
import { Button } from '../ui/button';

interface BacklogEmptyStateProps {
  onCreateWork: () => void;
  userRole?: 'viewer' | 'member' | 'manager' | 'owner';
}

export function BacklogEmptyState({
  onCreateWork,
  userRole = 'member',
}: BacklogEmptyStateProps) {
  const canCreate = userRole !== 'viewer';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Inbox size={40} className="text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 text-center">
        No work items in backlog
      </h3>

      <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
        Your backlog is empty. Create a new work item or move items from sprints
        to get started.
      </p>

      {canCreate && (
        <Button onClick={onCreateWork} className="gap-2">
          <Plus size={18} />
          Create Work
        </Button>
      )}
    </div>
  );
}
