'use client';

import { Users, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface GroupCardProps {
  id: string;
  name: string;
  memberCount: number;
  userRole: 'Owner' | 'Manager' | 'Member' | 'Viewer';
  lastUpdated: string;
  avatar?: string;
  onClick?: () => void;
}

export function GroupCard({
  id,
  name,
  memberCount,
  userRole,
  lastUpdated,
  avatar,
  onClick,
}: GroupCardProps) {
  const roleColors: Record<string, string> = {
    Owner: 'bg-accent text-accent-foreground',
    Manager: 'bg-primary text-primary-foreground',
    Member: 'bg-secondary text-secondary-foreground',
    Viewer: 'bg-muted text-muted-foreground',
  };

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${id}`}
          />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="p-1 hover:bg-background rounded transition-colors">
              <MoreVertical size={16} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Group</DropdownMenuItem>
            <DropdownMenuItem>Leave Group</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete Group</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">Updated {lastUpdated}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users size={16} />
          <span>{memberCount} members</span>
        </div>

        <Badge className={roleColors[userRole]}>{userRole}</Badge>
      </div>
    </div>
  );
}
