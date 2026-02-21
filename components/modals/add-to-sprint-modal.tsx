'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface AddToSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (sprintId: string) => void;
}

const sprints = [
  { id: 'sprint-1', name: 'Sprint 1', isActive: true },
  { id: 'sprint-2', name: 'Sprint 2', isActive: false },
  { id: 'sprint-3', name: 'Sprint 3', isActive: false },
];

export function AddToSprintModal({
  isOpen,
  onClose,
  onConfirm,
}: AddToSprintModalProps) {
  const [selectedSprint, setSelectedSprint] = useState(sprints.find(s => s.isActive)?.id || '');

  const handleConfirm = () => {
    if (selectedSprint) {
      onConfirm(selectedSprint);
      setSelectedSprint(sprints.find(s => s.isActive)?.id || '');
    }
  };

  const handleClose = () => {
    setSelectedSprint(sprints.find(s => s.isActive)?.id || '');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Sprint</DialogTitle>
          <DialogDescription>
            Select a sprint to move this item
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Sprint Selector */}
          <div className="space-y-2">
            <Label htmlFor="sprint">Sprint</Label>
            <Select value={selectedSprint} onValueChange={setSelectedSprint}>
              <SelectTrigger id="sprint">
                <SelectValue placeholder="Select a sprint..." />
              </SelectTrigger>
              <SelectContent>
                {sprints.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    {sprint.name} {sprint.isActive ? '(Active)' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedSprint}
          >
            Add to Sprint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
