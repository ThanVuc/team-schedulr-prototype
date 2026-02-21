'use client';

import { GripVertical, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface WorkItem {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  assignee?: { name: string; avatar: string };
  dueDate?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
}

interface BacklogListProps {
  items: WorkItem[];
  userRole?: 'viewer' | 'member' | 'manager' | 'owner';
  onAddToSprint: (workId: string) => void;
  onEdit: (workId: string) => void;
  onDelete: (workId: string) => void;
}

const priorityColors: Record<string, string> = {
  Low: 'bg-slate-100 text-slate-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-red-100 text-red-700',
};

const statusColors: Record<string, string> = {
  todo: 'bg-slate-500 text-white',
  'in-progress': 'bg-blue-500 text-white',
  review: 'bg-amber-500 text-white',
  completed: 'bg-green-600 text-white',
};

const statusLabels: Record<string, string> = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  review: 'Review',
  completed: 'Completed',
};

export function BacklogList({
  items,
  userRole = 'member',
  onAddToSprint,
  onEdit,
  onDelete,
}: BacklogListProps) {
  const canReorder = userRole !== 'viewer';
  const canModify = userRole !== 'viewer';

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-primary hover:shadow-sm transition-all group"
        >
          {/* Drag Handle */}
          {canReorder && (
            <div className="flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
              <GripVertical size={18} />
            </div>
          )}

          {/* Work ID */}
          <span className="text-xs font-mono text-muted-foreground flex-shrink-0 w-12">
            WRK-{item.id}
          </span>

          {/* Work Title */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate text-sm hover:text-primary transition-colors cursor-pointer">
              {item.title}
            </p>
          </div>

          {/* Priority Badge */}
          <Badge className={`${priorityColors[item.priority]} text-xs font-medium flex-shrink-0`}>
            {item.priority}
          </Badge>

          {/* Assignee Avatar */}
          {item.assignee && (
            <Avatar className="h-6 w-6 flex-shrink-0">
              <AvatarImage src={item.assignee.avatar} />
              <AvatarFallback className="text-xs">
                {item.assignee.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          )}

          {/* Due Date */}
          {item.dueDate && (
            <span className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">
              {new Date(item.dueDate).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}

          {/* Status Badge */}
          <Badge
            className={`${statusColors[item.status]} text-xs font-medium flex-shrink-0`}
          >
            {statusLabels[item.status]}
          </Badge>

          {/* Actions Menu */}
          {canModify && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                >
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onAddToSprint(item.id)}>
                  Add to Sprint
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(item.id)}>
                  Edit Work
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(item.id)}
                >
                  Delete Work
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ))}
    </div>
  );
}
