'use client';

import { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { CreateTaskModal } from '../modals/create-task-modal';
import { DeleteWorkModal } from '../modals/delete-work-modal';
import { AddToSprintModal } from '../modals/add-to-sprint-modal';
import { AssignWorkModal } from '../modals/assign-work-modal';
import { TaskDetailPanel } from '../task/task-detail-panel';

const mockBacklogItems = [
  {
    id: '7',
    title: 'Implement user profile page',
    priority: 'High',
    assignee: { name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john' },
    dueDate: '2024-03-10',
    storyPoints: 13,
  },
  {
    id: '8',
    title: 'Add email verification flow',
    priority: 'High',
    assignee: { name: 'Alice Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice' },
    dueDate: '2024-03-15',
    storyPoints: 8,
  },
  {
    id: '9',
    title: 'Setup analytics dashboard',
    priority: 'Medium',
    assignee: undefined,
    dueDate: undefined,
    storyPoints: 5,
  },
  {
    id: '10',
    title: 'Create notification system',
    priority: 'High',
    assignee: { name: 'Bob Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
    dueDate: '2024-03-20',
    storyPoints: 21,
  },
  {
    id: '11',
    title: 'Refactor authentication module',
    priority: 'Medium',
    assignee: undefined,
    dueDate: '2024-03-25',
    storyPoints: 13,
  },
  {
    id: '12',
    title: 'Implement payment integration',
    priority: 'High',
    assignee: { name: 'Charlie Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie' },
    dueDate: '2024-03-30',
    storyPoints: 34,
  },
];

const priorityColors: Record<string, string> = {
  Low: 'bg-slate-600 text-white',
  Medium: 'bg-amber-600 text-white',
  High: 'bg-red-600 text-white',
};

export function BacklogTab() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isAddToSprintModalOpen, setIsAddToSprintModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [deleteWork, setDeleteWork] = useState<{ isOpen: boolean; work?: any }>({
    isOpen: false,
  });
  const [assignWork, setAssignWork] = useState<{ isOpen: boolean; work?: any }>({
    isOpen: false,
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Backlog</h2>
        <Button className="gap-2" onClick={() => setIsCreateTaskModalOpen(true)}>
          <Plus size={18} />
          Create Work
        </Button>
      </div>

      {/* Backlog Grid */}
      <div>
        {mockBacklogItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No backlog items yet</p>
            <Button onClick={() => setIsCreateTaskModalOpen(true)}>
              Create First Item
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {mockBacklogItems.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all group flex flex-col"
              >
                {/* Header with Title and Menu */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  {/* Title - Clickable */}
                  <h3 
                    onClick={() => setSelectedTaskId(item.id)}
                    className="font-semibold text-foreground text-sm leading-tight cursor-pointer hover:text-primary transition-colors line-clamp-2 flex-1"
                  >
                    {item.title}
                  </h3>

                  {/* Menu - Top Right */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setAssignWork({ isOpen: true, work: item })}>
                        Assign
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsAddToSprintModalOpen(true)}>
                        Add to Sprint
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteWork({ isOpen: true, work: item })}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Priority Badge */}
                <div className="mb-3">
                  <Badge className={`${priorityColors[item.priority]} text-xs font-medium`}>
                    {item.priority}
                  </Badge>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    {item.assignee ? (
                      <>
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={item.assignee.avatar} />
                          <AvatarFallback className="text-xs">
                            {item.assignee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground hidden sm:inline max-w-20 truncate">
                          {item.assignee.name.split(' ')[0]}
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-foreground text-xs">Unassigned</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-medium px-1.5">
                      {item.storyPoints}
                    </Badge>

                    {item.dueDate && (
                      <span className="text-muted-foreground whitespace-nowrap">
                        {new Date(item.dueDate).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
      />

      {/* Add to Sprint Modal */}
      <AddToSprintModal
        isOpen={isAddToSprintModalOpen}
        onClose={() => setIsAddToSprintModalOpen(false)}
        onConfirm={(sprintId) => {
          console.log('Added to sprint:', sprintId);
          setIsAddToSprintModalOpen(false);
        }}
      />

      {/* Assign Work Modal */}
      <AssignWorkModal
        isOpen={assignWork.isOpen}
        onClose={() => setAssignWork({ isOpen: false })}
        workName={assignWork.work?.title || ''}
        onAssign={(memberId) => {
          console.log('Work assigned:', assignWork.work?.id, 'to member:', memberId);
          setAssignWork({ isOpen: false });
        }}
      />

      {/* Delete Work Modal */}
      <DeleteWorkModal
        isOpen={deleteWork.isOpen}
        onClose={() => setDeleteWork({ isOpen: false })}
        workName={deleteWork.work?.title || ''}
        onConfirm={() => {
          console.log('Work deleted:', deleteWork.work?.id);
          setDeleteWork({ isOpen: false });
        }}
      />

      {/* Task Detail Panel */}
      {selectedTaskId && (
        <TaskDetailPanel
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
