'use client';

import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { BacklogList } from '../backlog/backlog-list';
import { BacklogEmptyState } from '../backlog/backlog-empty-state';
import { AddToSprintModal } from '../modals/add-to-sprint-modal';
import { CreateTaskModal } from '../modals/create-task-modal';
import { DeleteWorkModal } from '../modals/delete-work-modal';

interface WorkItem {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  assignee?: { name: string; avatar: string };
  dueDate?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
}

const mockBacklogItems: WorkItem[] = [
  {
    id: '7',
    title: 'Implement user profile page',
    priority: 'High',
    assignee: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    },
    dueDate: '2024-03-10',
    status: 'todo',
  },
  {
    id: '8',
    title: 'Add email verification flow',
    priority: 'High',
    assignee: {
      name: 'Alice Williams',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
    },
    dueDate: '2024-03-15',
    status: 'todo',
  },
  {
    id: '9',
    title: 'Setup analytics dashboard',
    priority: 'Medium',
    assignee: undefined,
    dueDate: undefined,
    status: 'todo',
  },
  {
    id: '10',
    title: 'Create error logging system',
    priority: 'Medium',
    assignee: {
      name: 'Bob Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    },
    dueDate: '2024-03-20',
    status: 'todo',
  },
  {
    id: '11',
    title: 'Implement two-factor authentication',
    priority: 'High',
    assignee: undefined,
    dueDate: undefined,
    status: 'todo',
  },
];

interface BacklogPageProps {
  userRole?: 'viewer' | 'member' | 'manager' | 'owner';
}

export function BacklogPage({ userRole = 'member' }: BacklogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToSprintModalOpen, setIsAddToSprintModalOpen] = useState(false);
  const [deleteWork, setDeleteWork] = useState<{ isOpen: boolean; work?: WorkItem }>({
    isOpen: false,
  });

  // Filter items
  const filteredItems = mockBacklogItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority =
      priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleAddToSprint = (workId: string) => {
    const work = mockBacklogItems.find((item) => item.id === workId);
    if (work) {
      setSelectedWork(work);
      setIsAddToSprintModalOpen(true);
    }
  };

  const handleConfirmAddToSprint = (sprintId: string) => {
    console.log('Added work to sprint:', selectedWork?.id, 'sprint:', sprintId);
    setIsAddToSprintModalOpen(false);
    setSelectedWork(null);
  };

  const handleDeleteWork = (workId: string) => {
    const work = mockBacklogItems.find((item) => item.id === workId);
    if (work) {
      setDeleteWork({ isOpen: true, work });
    }
  };

  return (
    <div className="space-y-6 flex-1">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Backlog</h1>
        <p className="text-sm text-muted-foreground">
          Work items not assigned to any sprint
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center gap-2">
          <Input
            placeholder="Search backlog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {userRole !== 'viewer' && (
          <Button
            className="gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={18} />
            Create Work
          </Button>
        )}
      </div>

      {/* Content */}
      {filteredItems.length === 0 && searchQuery === '' && priorityFilter === 'all' ? (
        <BacklogEmptyState
          onCreateWork={() => setIsCreateModalOpen(true)}
          userRole={userRole}
        />
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No work items match your filters
          </p>
        </div>
      ) : (
        <BacklogList
          items={filteredItems}
          userRole={userRole}
          onAddToSprint={handleAddToSprint}
          onEdit={(workId) => console.log('Edit work:', workId)}
          onDelete={handleDeleteWork}
        />
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Add to Sprint Modal */}
      {selectedWork && (
        <AddToSprintModal
          isOpen={isAddToSprintModalOpen}
          onClose={() => {
            setIsAddToSprintModalOpen(false);
            setSelectedWork(null);
          }}
          workTitle={selectedWork.title}
          onConfirm={handleConfirmAddToSprint}
        />
      )}

      {/* Delete Work Modal */}
      {deleteWork.work && (
        <DeleteWorkModal
          isOpen={deleteWork.isOpen}
          onClose={() => setDeleteWork({ isOpen: false })}
          workName={deleteWork.work.title}
          onConfirm={() => {
            console.log('Deleted work:', deleteWork.work?.id);
            setDeleteWork({ isOpen: false });
          }}
        />
      )}
    </div>
  );
}
