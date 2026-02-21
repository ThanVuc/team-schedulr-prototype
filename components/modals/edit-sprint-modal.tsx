'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

interface EditSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  sprint?: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  };
}

export function EditSprintModal({ isOpen, onClose, sprint }: EditSprintModalProps) {
  const [formData, setFormData] = useState({
    name: sprint?.name || '',
    startDate: sprint?.startDate || '',
    endDate: sprint?.endDate || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sprint updated:', formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Sprint</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sprint Name */}
          <div className="space-y-2">
            <Label htmlFor="sprint-name">Sprint Name</Label>
            <Input
              id="sprint-name"
              name="name"
              placeholder="e.g., Sprint 1 - Design System"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-input border-border"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              className="bg-input border-border"
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              className="bg-input border-border"
            />
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
