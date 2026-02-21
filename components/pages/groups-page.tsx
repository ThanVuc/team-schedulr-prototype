'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { GroupCard } from '../saas/group-card';
import { CreateGroupModal } from '../modals/create-group-modal';
import { useRouter } from 'next/navigation';

const mockGroups = [
  {
    id: '1',
    name: 'Product Team',
    memberCount: 8,
    userRole: 'Owner' as const,
    lastUpdated: '2 hours ago',
  },
  {
    id: '2',
    name: 'Engineering',
    memberCount: 12,
    userRole: 'Manager' as const,
    lastUpdated: '1 day ago',
  },
  {
    id: '3',
    name: 'Design System',
    memberCount: 5,
    userRole: 'Member' as const,
    lastUpdated: '3 days ago',
  },
  {
    id: '4',
    name: 'Marketing',
    memberCount: 6,
    userRole: 'Viewer' as const,
    lastUpdated: 'Yesterday',
  },
];

export function GroupsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const handleSelectGroup = (groupId: string) => {
    router.push(`/group/${groupId}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="border-b border-border p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Groups</h1>
            <p className="text-muted-foreground">
              Manage and collaborate with your teams. You have {mockGroups.length} groups.
            </p>
          </div>

          <Button
            size="lg"
            className="gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={20} />
            Create Group
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-auto p-8">
        {mockGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGroups.map((group) => (
              <GroupCard
                key={group.id}
                {...group}
                onClick={() => handleSelectGroup(group.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-96 text-center">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-muted-foreground opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 19H9a6 6 0 016-6h0a6 6 0 016 6v1a6 6 0 01-6 6H9a6 6 0 01-6-6v-1a6 6 0 016-6h0a6 6 0 016 6Z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No groups yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first group to get started collaborating with your team.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              Create your first group
            </Button>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
