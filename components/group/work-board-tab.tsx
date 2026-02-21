'use client';

import { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { CreateTaskModal } from '../modals/create-task-modal';
import { EditWorkModal } from '../modals/edit-work-modal';
import { DeleteWorkModal } from '../modals/delete-work-modal';
import { AssignWorkModal } from '../modals/assign-work-modal';
import { TaskDetailPanel } from '../task/task-detail-panel';
import "../css/scroll-bar-customize.css";

const mockTasks = {
  'todo': [
    {
      id: '1',
      title: 'Design login page',
      assignee: { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane' },
      priority: 'High',
      dueDate: '2024-02-20',
      storyPoints: 8,
      status: 'todo',
      sprint: 'Sprint 1',
    },
    {
      id: '2',
      title: 'Create API documentation',
      assignee: { name: 'Bob Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
      priority: 'Medium',
      dueDate: '2024-02-25',
      storyPoints: 5,
      status: 'todo',
      sprint: 'Sprint 2',
    },
        {
      id: '11',
      title: 'Design login page',
      assignee: { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane' },
      priority: 'High',
      dueDate: '2024-02-20',
      storyPoints: 8,
      status: 'todo',
      sprint: 'Sprint 1',
    },
    {
      id: '12',
      title: 'Create API documentation',
      assignee: { name: 'Bob Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
      priority: 'Medium',
      dueDate: '2024-02-25',
      storyPoints: 5,
      status: 'todo',
      sprint: 'Sprint 2',
    },
        {
      id: '13',
      title: 'Design login page',
      assignee: { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane' },
      priority: 'High',
      dueDate: '2024-02-20',
      storyPoints: 8,
      status: 'todo',
      sprint: 'Sprint 1',
    },
    {
      id: '14',
      title: 'Create API documentation',
      assignee: { name: 'Bob Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
      priority: 'Medium',
      dueDate: '2024-02-25',
      storyPoints: 5,
      status: 'todo',
      sprint: 'Sprint 2',
    },
        {
      id: '15',
      title: 'Design login page',
      assignee: { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane' },
      priority: 'High',
      dueDate: '2024-02-20',
      storyPoints: 8,
      status: 'todo',
      sprint: 'Sprint 1',
    },
    {
      id: '16',
      title: 'Create API documentation',
      assignee: { name: 'Bob Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
      priority: 'Medium',
      dueDate: '2024-02-25',
      storyPoints: 5,
      status: 'todo',
      sprint: 'Sprint 2',
    },
  ],
  'in-progress': [
    {
      id: '3',
      title: 'Setup database schema',
      assignee: { name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john' },
      priority: 'High',
      dueDate: '2024-02-18',
      storyPoints: 13,
      status: 'in-progress',
      sprint: 'Sprint 1',
    },
    {
      id: '4',
      title: 'Implement authentication',
      assignee: { name: 'Alice Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice' },
      priority: 'High',
      dueDate: '2024-02-22',
      storyPoints: 21,
      status: 'in-progress',
      sprint: 'Backlog',
    },
  ],
  'review': [
    {
      id: '5',
      title: 'Dashboard component review',
      assignee: { name: 'Charlie Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie' },
      priority: 'Medium',
      dueDate: '2024-02-19',
      storyPoints: 8,
      status: 'review',
      sprint: 'Sprint 1',
    },
  ],
  'completed': [
    {
      id: '6',
      title: 'Project setup and scaffolding',
      assignee: { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane' },
      priority: 'Medium',
      dueDate: '2024-02-12',
      storyPoints: 3,
      status: 'completed',
      sprint: 'Sprint 1',
    },
  ],
};

const statusColors: Record<string, string> = {
  todo: 'bg-secondary text-secondary-foreground',
  'in-progress': 'bg-primary text-primary-foreground',
  review: 'bg-accent text-accent-foreground',
  completed: 'bg-green-600 text-white',
};

const priorityColors: Record<string, string> = {
  High: 'bg-destructive text-destructive-foreground',
  Medium: 'bg-accent text-accent-foreground',
  Low: 'bg-secondary text-secondary-foreground',
};

interface KanbanColumnProps {
  title: string;
  columnId: string;
  tasks: (typeof mockTasks)['todo'];
  onTaskSelect: (taskId: string) => void;
  onEditTask: (task: any) => void;
  onDeleteTask: (task: any) => void;
  onAssignTask: (task: any) => void;
}

function KanbanColumn({
  title,
  columnId,
  tasks,
  onTaskSelect,
  onEditTask,
  onDeleteTask,
  onAssignTask,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col min-w-80 max-h-85 bg-background rounded-lg border border-border p-4 space-y-4 overflow-y-auto custom-scroll">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="text-sm text-muted-foreground bg-card px-2 py-1 rounded">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3 flex-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-card border border-border rounded-lg p-3 hover:border-primary hover:shadow-md transition-all group"
          >
            {/* Title with Menu */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <p
                onClick={() => onTaskSelect(task.id)}
                className="font-semibold text-foreground cursor-pointer flex-1 hover:text-primary transition-colors text-sm line-clamp-2"
              >
                {task.title}
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  >
                    <MoreVertical size={12} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onAssignTask(task)}>
                    Assign
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDeleteTask(task)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Status - First Line */}
            <div className="mb-2">
              <Badge
                className={`${statusColors[task.status]} text-xs font-medium`}
              >
                {task.status
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Badge>
            </div>

            {/* Assignee, Story Points, Due Date - Second Line */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback className="text-xs">
                    {task.assignee.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground hidden sm:inline max-w-20 truncate">
                  {task.assignee.name.split(' ')[0]}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-medium px-1.5">
                  {task.storyPoints}
                </Badge>

                <span className="text-muted-foreground whitespace-nowrap">
                  {new Date(task.dueDate).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const sprints = ['All Sprints', 'Sprint 1', 'Sprint 2', 'Backlog'];

export function WorkBoardTab() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedSprint, setSelectedSprint] = useState('All Sprints');
  const [editWork, setEditWork] = useState<{ isOpen: boolean; work?: any }>({
    isOpen: false,
  });
  const [deleteWork, setDeleteWork] = useState<{ isOpen: boolean; work?: any }>({
    isOpen: false,
  });
  const [assignWork, setAssignWork] = useState<{ isOpen: boolean; work?: any }>({
    isOpen: false,
  });

  const columns = [
    { id: 'todo', title: 'Todo' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'completed', title: 'Completed' },
  ];

  const getFilteredTasks = () => {
    const allTasks = Object.values(mockTasks).flat();
    if (selectedSprint === 'All Sprints') {
      return allTasks;
    }
    return allTasks.filter((task) => task.sprint === selectedSprint);
  };

  const filteredTasksByStatus = {
    'todo': getFilteredTasks().filter((t) => t.status === 'todo'),
    'in-progress': getFilteredTasks().filter((t) => t.status === 'in-progress'),
    'review': getFilteredTasks().filter((t) => t.status === 'review'),
    'completed': getFilteredTasks().filter((t) => t.status === 'completed'),
  };

  return (
    <div className="flex flex-col overflow-auto">
      {/* Fixed Header */}
      <div className="bg-background border-b border-border p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Work Board</h2>
          <Button className="gap-2" onClick={() => setIsCreateTaskModalOpen(true)}>
            <Plus size={18} />
            Create Work
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Filter by sprint:</span>
          <Select value={selectedSprint} onValueChange={setSelectedSprint}>
            <SelectTrigger className="w-40 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sprints.map((sprint) => (
                <SelectItem key={sprint} value={sprint}>
                  {sprint}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="px-8 py-6 overflow-x-auto custom-scroll">
        <div className="flex gap-6 min-w-min">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              columnId={column.id}
              tasks={filteredTasksByStatus[column.id as keyof typeof filteredTasksByStatus]}
              onTaskSelect={setSelectedTaskId}
              onEditTask={(task) => setEditWork({ isOpen: true, work: task })}
              onDeleteTask={(task) => setDeleteWork({ isOpen: true, work: task })}
              onAssignTask={(task) => setAssignWork({ isOpen: true, work: task })}
            />
          ))}
        </div>
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
      />

      {/* Edit Work Modal */}
      <EditWorkModal
        isOpen={editWork.isOpen}
        onClose={() => setEditWork({ isOpen: false })}
        work={editWork.work}
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
