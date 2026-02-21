'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

interface AssignWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  workName: string;
  onAssign: (memberId: string) => void;
}

const mockMembers = [
  { id: '1', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john' },
  { id: '2', name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane' },
  { id: '3', name: 'Bob Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob' },
  { id: '4', name: 'Alice Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice' },
  { id: '5', name: 'Charlie Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie' },
];

export function AssignWorkModal({
  isOpen,
  onClose,
  workName,
  onAssign,
}: AssignWorkModalProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string>('');

  const filteredMembers = mockMembers.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selected) {
      onAssign(selected);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Assign Work</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Assign <span className="font-semibold text-foreground">{workName}</span> to a team member
          </p>

          <Input
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-input border-border"
          />

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {/* Unassign Option */}
            <button
              onClick={() => setSelected('')}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                selected === ''
                  ? 'bg-primary/10 border-primary'
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">Unassigned</p>
              </div>
            </button>

            {/* Member List */}
            {filteredMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelected(member.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  selected === member.id
                    ? 'bg-primary/10 border-primary'
                    : 'border-border hover:bg-secondary'
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Assign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
