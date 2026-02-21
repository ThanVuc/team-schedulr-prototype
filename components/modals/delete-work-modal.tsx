'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

interface DeleteWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  workName: string;
  onConfirm: () => void;
}

export function DeleteWorkModal({
  isOpen,
  onClose,
  workName,
  onConfirm,
}: DeleteWorkModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete Work</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-foreground mb-2">
            Are you sure you want to delete <span className="font-semibold">{workName}</span>?
          </p>
          <p className="text-muted-foreground text-sm">
            This action cannot be undone. The work will be permanently removed from the sprint.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete Work
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
