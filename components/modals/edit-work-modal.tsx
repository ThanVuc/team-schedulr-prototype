'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

const fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 200];

interface EditWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  work?: {
    id: string;
    name: string;
    description: string;
    estimate: string;
    assignee: string;
    sprint: string;
  };
}

const mockMembers = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Bob Johnson' },
  { id: '4', name: 'Alice Williams' },
];

const mockSprints = [
  { id: 'backlog', name: 'Backlog' },
  { id: '1', name: 'Sprint 1 - Design System' },
  { id: '2', name: 'Sprint 2 - User Dashboard' },
];

export function EditWorkModal({ isOpen, onClose, work }: EditWorkModalProps) {
  const [formData, setFormData] = useState({
    name: work?.name || '',
    description: work?.description || '',
    storyPoints: work?.estimate || '8',
    assignee: work?.assignee || '',
    sprint: work?.sprint || 'backlog',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Work updated:', formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Work</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Work Name */}
          <div className="space-y-2">
            <Label htmlFor="work-name">Work Name *</Label>
            <Input
              id="work-name"
              name="name"
              placeholder="e.g., Design login page"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-input border-border"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add more details about this work..."
              value={formData.description}
              onChange={handleInputChange}
              className="min-h-[100px] bg-input border-border"
            />
          </div>

          {/* Story Points */}
          <div className="space-y-2">
            <Label htmlFor="story-points">Story Points</Label>
            <Select value={formData.storyPoints} onValueChange={(v) => handleSelectChange('storyPoints', v)}>
              <SelectTrigger id="story-points" className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fibonacciNumbers.map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assignee */}
          <div className="space-y-2">
            <Label htmlFor="assignee">Assign To</Label>
            <Select value={formData.assignee} onValueChange={(v) => handleSelectChange('assignee', v)}>
              <SelectTrigger id="assignee" className="bg-input border-border">
                <SelectValue placeholder="Select member..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Unassigned</SelectItem>
                {mockMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sprint */}
          <div className="space-y-2">
            <Label htmlFor="sprint">Sprint</Label>
            <Select value={formData.sprint} onValueChange={(v) => handleSelectChange('sprint', v)}>
              <SelectTrigger id="sprint" className="bg-input border-border">
                <SelectValue placeholder="Select sprint..." />
              </SelectTrigger>
              <SelectContent>
                {mockSprints.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
