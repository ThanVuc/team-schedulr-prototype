'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreateGroupModal } from './create-group-modal'
import { Users, Plus } from 'lucide-react'

interface GroupCardProps {
  id: string
  name: string
  memberCount: number
  userRole: 'Owner' | 'Manager' | 'Member' | 'Viewer'
  onClick: (id: string) => void
}

function GroupCard({ id, name, memberCount, userRole, onClick }: GroupCardProps) {
  return (
    <Card 
      className="p-6 cursor-pointer hover:border-primary transition-all duration-200 border-2 hover:shadow-lg hover:shadow-primary/20"
      onClick={() => onClick(id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
          {userRole}
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{name}</h3>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Users className="w-4 h-4" />
        <span className="text-sm">{memberCount} members</span>
      </div>
    </Card>
  )
}

interface GroupBoardProps {
  onSelectGroup: (groupId: string) => void
}

export function GroupBoard({ onSelectGroup }: GroupBoardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [groups, setGroups] = useState([
    { id: '1', name: 'Design Team', memberCount: 8, userRole: 'Owner' as const },
    { id: '2', name: 'Engineering Squad', memberCount: 12, userRole: 'Manager' as const },
    { id: '3', name: 'Product Management', memberCount: 5, userRole: 'Member' as const },
    { id: '4', name: 'Marketing & Growth', memberCount: 6, userRole: 'Viewer' as const },
  ])

  const handleCreateGroup = (name: string) => {
    const newGroup = {
      id: Date.now().toString(),
      name,
      memberCount: 1,
      userRole: 'Owner' as const
    }
    setGroups([newGroup, ...groups])
    setShowCreateModal(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Groups</h1>
              <p className="text-muted-foreground mt-1">Manage your team groups and collaborations</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Group
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groups.map(group => (
              <GroupCard
                key={group.id}
                {...group}
                onClick={onSelectGroup}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">No groups yet</h2>
            <p className="text-muted-foreground mb-6 max-w-sm text-center">
              Create your first group to start collaborating with your team
            </p>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Group
            </Button>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal 
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onCreate={handleCreateGroup}
      />
    </div>
  )
}
