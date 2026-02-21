'use client';

import { useState } from 'react';
import { UserPlus, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { InviteMemberModal } from '../modals/invite-member-modal';
import { ChangeRoleModal } from '../modals/change-role-modal';
import { ConfirmationDialog } from '../modals/confirmation-dialog';

const mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Owner',
    joinedDate: '2024-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    joinedDate: '2024-01-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Member',
    joinedDate: '2024-02-01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'Member',
    joinedDate: '2024-02-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Viewer',
    joinedDate: '2024-02-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
  },
];

const roleColors: Record<string, string> = {
  Owner: 'bg-accent text-accent-foreground',
  Manager: 'bg-primary text-primary-foreground',
  Member: 'bg-secondary text-secondary-foreground',
  Viewer: 'bg-muted text-muted-foreground',
};

export function MembersTab() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [changeRoleModal, setChangeRoleModal] = useState<{
    isOpen: boolean;
    member?: (typeof mockMembers)[0];
  }>({ isOpen: false });
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    memberId?: string;
  }>({ isOpen: false });

  const handleChangeRole = (newRole: string) => {
    console.log('Member role changed:', changeRoleModal.member?.id, 'to', newRole);
    setChangeRoleModal({ isOpen: false });
  };

  const handleRemoveConfirm = () => {
    console.log('Member removed:', confirmDialog.memberId);
    setConfirmDialog({ isOpen: false });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Members</h2>
          <p className="text-muted-foreground">
            Manage group members and their roles
          </p>
        </div>

        <Button className="gap-2" onClick={() => setIsInviteModalOpen(true)}>
          <UserPlus size={18} />
          Invite Member
        </Button>
      </div>

      {/* Members Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{member.email}</TableCell>
                <TableCell>
                  <Badge className={roleColors[member.role]}>{member.role}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(member.joinedDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setChangeRoleModal({ isOpen: true, member })}
                  >
                    Change Role
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() =>
                      setConfirmDialog({ isOpen: true, memberId: member.id })
                    }
                  >
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Invite Member Modal */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      {/* Change Role Modal */}
      {changeRoleModal.member && (
        <ChangeRoleModal
          isOpen={changeRoleModal.isOpen}
          onClose={() => setChangeRoleModal({ isOpen: false })}
          memberName={changeRoleModal.member.name}
          currentRole={changeRoleModal.member.role}
          onConfirm={handleChangeRole}
        />
      )}

      {/* Remove Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        title="Remove Member"
        description="Are you sure you want to remove this member from the group? This action cannot be undone."
        actionLabel="Remove"
        isDangerous={true}
        onConfirm={handleRemoveConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false })}
      />
    </div>
  );
}
