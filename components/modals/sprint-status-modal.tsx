'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

interface SprintStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'activate' | 'complete' | 'cancel';
  sprintName: string;
  onConfirm: () => void;
}

const actionConfig = {
  activate: {
    title: 'Activate Sprint',
    description: 'Are you sure you want to activate this sprint? It will become the active sprint for your group.',
    confirmLabel: 'Activate',
    isDangerous: false,
  },
  complete: {
    title: 'Complete Sprint',
    description: 'Are you sure you want to complete this sprint? It will be marked as completed and sprint data will become read-only.',
    confirmLabel: 'Complete',
    isDangerous: false,
  },
  cancel: {
    title: 'Cancel Sprint',
    description: 'Are you sure you want to cancel this sprint? It will be marked as cancelled and sprint data will become read-only.',
    confirmLabel: 'Cancel',
    isDangerous: true,
  },
};

export function SprintStatusModal({
  isOpen,
  onClose,
  action,
  sprintName,
  onConfirm,
}: SprintStatusModalProps) {
  const config = actionConfig[action];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-foreground mb-2">
            <span className="font-semibold">{sprintName}</span>
          </p>
          <p className="text-muted-foreground">{config.description}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            variant={config.isDangerous ? 'destructive' : 'default'}
          >
            {config.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
