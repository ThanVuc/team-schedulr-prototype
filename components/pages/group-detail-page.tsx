'use client';

import { useState } from 'react';
import { ArrowLeft, Settings, UserPlus, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MembersTab } from '../group/members-tab';
import { SprintsTab } from '../group/sprints-tab';
import { WorkBoardTab } from '../group/work-board-tab';
import { BacklogTab } from '../group/backlog-tab';
import { SettingsTab } from '../group/settings-tab';
import "../css/scroll-bar-customize.css";

interface GroupDetailPageProps {
  groupId: string;
}

const mockGroupData = {
  id: '1',
  name: 'Product Team',
  memberCount: 8,
  userRole: 'Owner' as const,
  avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=product-team',
};

export function GroupDetailPage({ groupId }: GroupDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('members');

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-card rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mockGroupData.avatar} />
                <AvatarFallback>{mockGroupData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-3xl font-bold text-foreground">{mockGroupData.name}</h1>
                <p className="text-muted-foreground">{mockGroupData.memberCount} members</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-auto custom-scroll">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="border-b border-border rounded-none px-8 py-0 h-auto bg-background">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="sprints">Sprints</TabsTrigger>
            <TabsTrigger value="work-board">Work Board</TabsTrigger>
            <TabsTrigger value="backlog">Backlog</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="flex-1 overflow-auto p-8">
            <MembersTab />
          </TabsContent>

          <TabsContent value="sprints" className="flex-1 overflow-auto p-8">
            <SprintsTab />
          </TabsContent>

          <TabsContent value="work-board" className="flex-1 overflow-auto">
            <WorkBoardTab />
          </TabsContent>

          <TabsContent value="backlog" className="flex-1 overflow-auto">
            <BacklogTab />
          </TabsContent>

          <TabsContent value="settings" className="flex-1 overflow-auto p-8">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
