'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MemberList } from './member-list'
import { GroupSettings } from './group-settings'
import { ChevronLeft, Users, Settings } from 'lucide-react'

interface GroupDetailProps {
  groupId: string
  onBack: () => void
}

export function GroupDetail({ groupId, onBack }: GroupDetailProps) {
  const [groupData] = useState({
    id: groupId,
    name: 'Design Team',
    description: 'Creative and design professionals',
    memberCount: 8,
    userRole: 'Owner',
    createdAt: '2024-01-15',
  })

  const [activeTab, setActiveTab] = useState('members')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-foreground hover:bg-muted"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{groupData.name}</h1>
              <p className="text-muted-foreground text-sm mt-0.5">{groupData.description}</p>
            </div>
          </div>

          {/* Group Header Stats */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{groupData.memberCount}</span> members
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
                {groupData.userRole}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-card border-b border-border rounded-none w-full justify-start h-auto p-0">
            <TabsTrigger 
              value="members" 
              className="rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground"
            >
              <Users className="w-4 h-4 mr-2" />
              Members
            </TabsTrigger>
            {groupData.userRole === 'Owner' && (
              <TabsTrigger 
                value="settings"
                className="rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="members" className="mt-6">
            <MemberList 
              groupId={groupId} 
              userRole={groupData.userRole}
            />
          </TabsContent>

          {groupData.userRole === 'Owner' && (
            <TabsContent value="settings" className="mt-6">
              <GroupSettings 
                groupId={groupId}
                groupData={groupData}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
