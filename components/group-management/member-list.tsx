'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { InviteMemberModal } from './invite-member-modal'
import { MoreVertical, Plus, LogOut, X, Avatar } from 'lucide-react'

interface Member {
  id: string
  name: string
  email: string
  role: 'Owner' | 'Manager' | 'Member' | 'Viewer'
  avatar?: string
  joinedAt: string
}

interface MemberListProps {
  groupId: string
  userRole: string
}

export function MemberList({ groupId, userRole }: MemberListProps) {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Owner',
      joinedAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Manager',
      joinedAt: '2024-01-20',
    },
    {
      id: '3',
      name: 'Emma Williams',
      email: 'emma.williams@company.com',
      role: 'Member',
      joinedAt: '2024-02-01',
    },
    {
      id: '4',
      name: 'David Rodriguez',
      email: 'david.rodriguez@company.com',
      role: 'Member',
      joinedAt: '2024-02-05',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@company.com',
      role: 'Viewer',
      joinedAt: '2024-02-10',
    },
  ])

  const handleInviteMember = (email: string, role: string) => {
    const newMember: Member = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role: role as Member['role'],
      joinedAt: new Date().toISOString().split('T')[0],
    }
    setMembers([...members, newMember])
    setShowInviteModal(false)
  }

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId))
  }

  const canManageMembers = userRole === 'Owner' || userRole === 'Manager'
  const canRemoveMembers = userRole === 'Owner'

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'bg-accent/10 text-accent border-accent/30'
      case 'Manager':
        return 'bg-primary/10 text-primary border-primary/30'
      case 'Member':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      case 'Viewer':
        return 'bg-muted text-muted-foreground border-border'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  return (
    <div className="space-y-6">
      {/* Invite Button */}
      {canManageMembers && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-foreground">Team Members</h2>
            <p className="text-sm text-muted-foreground mt-1">{members.length} members in this group</p>
          </div>
          <Button 
            onClick={() => setShowInviteModal(true)}
            className="bg-primary hover:bg-primary/90 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Invite Member
          </Button>
        </div>
      )}

      {/* Members Table */}
      <Card className="border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Joined</th>
                {canManageMembers && (
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr 
                  key={member.id} 
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{member.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">
                    {new Date(member.joinedAt).toLocaleDateString()}
                  </td>
                  {canManageMembers && (
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          {member.role !== 'Owner' && canRemoveMembers && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleRemoveMember(member.id)}
                                className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Remove Member
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-border" />
                            </>
                          )}
                          <DropdownMenuItem className="text-muted-foreground cursor-pointer">
                            View Profile
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Invite Modal */}
      <InviteMemberModal 
        open={showInviteModal}
        onOpenChange={setShowInviteModal}
        onInvite={handleInviteMember}
        currentRole={userRole}
      />
    </div>
  )
}
