'use client';

import { useState } from 'react';
import { Plus, MoreVertical, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { CreateSprintModal } from '../modals/create-sprint-modal';
import { EditSprintModal } from '../modals/edit-sprint-modal';
import { SprintStatusModal } from '../modals/sprint-status-modal';
import { AISprintGeneratorModal } from '../modals/ai-sprint-generator-modal';
import { ConfirmationDialog } from '../modals/confirmation-dialog';

const mockSprints = [
  {
    id: '1',
    name: 'Sprint 1 - Design System',
    status: 'Active',
    startDate: '2024-02-12',
    endDate: '2024-02-26',
    progress: 65,
  },
  {
    id: '2',
    name: 'Sprint 2 - User Dashboard',
    status: 'Draft',
    startDate: '2024-02-26',
    endDate: '2024-03-11',
    progress: 0,
  },
  {
    id: '3',
    name: 'Sprint 0 - Foundation',
    status: 'Completed',
    startDate: '2024-01-29',
    endDate: '2024-02-12',
    progress: 100,
  },
];

const statusColors: Record<string, string> = {
  Active: 'bg-primary text-primary-foreground',
  Draft: 'bg-muted text-muted-foreground',
  Completed: 'bg-accent text-accent-foreground',
};

export function SprintsTab() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [editSprint, setEditSprint] = useState<{ isOpen: boolean; sprint?: any }>({
    isOpen: false,
  });
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    action?: 'activate' | 'complete' | 'cancel';
    sprint?: any;
  }>({ isOpen: false });
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    sprintId?: string;
  }>({ isOpen: false });

  const handleDeleteConfirm = () => {
    console.log('Sprint deleted:', confirmDialog.sprintId);
    setConfirmDialog({ isOpen: false });
  };

  const handleStatusAction = (action: 'activate' | 'complete' | 'cancel', sprint: any) => {
    setStatusModal({ isOpen: true, action, sprint });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sprints</h2>
          <p className="text-muted-foreground">
            Manage and track your team's sprints
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setIsAIGeneratorOpen(true)}
          >
            <Zap size={18} />
            Generate with AI
          </Button>
          <Button className="gap-2" onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={18} />
            Create Sprint
          </Button>
        </div>
      </div>

      {/* Sprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockSprints.map((sprint) => (
          <div
            key={sprint.id}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{sprint.name}</h3>
                <Badge className={statusColors[sprint.status]}>{sprint.status}</Badge>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditSprint({ isOpen: true, sprint })}>
                    Edit Sprint
                  </DropdownMenuItem>
                  {sprint.status === 'Draft' && (
                    <DropdownMenuItem onClick={() => handleStatusAction('activate', sprint)}>
                      Activate Sprint
                    </DropdownMenuItem>
                  )}
                  {sprint.status === 'Active' && (
                    <>
                      <DropdownMenuItem onClick={() => handleStatusAction('complete', sprint)}>
                        Complete Sprint
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusAction('cancel', sprint)}>
                        Cancel Sprint
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() =>
                      setConfirmDialog({ isOpen: true, sprintId: sprint.id })
                    }
                  >
                    Delete Sprint
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>
                  {new Date(sprint.startDate).toLocaleDateString()} -{' '}
                  {new Date(sprint.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{sprint.progress}%</span>
                </div>
                <Progress value={sprint.progress} className="h-2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Sprint Modal */}
      <CreateSprintModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Edit Sprint Modal */}
      <EditSprintModal
        isOpen={editSprint.isOpen}
        onClose={() => setEditSprint({ isOpen: false })}
        sprint={editSprint.sprint}
      />

      {/* AI Generator Modal */}
      <AISprintGeneratorModal
        isOpen={isAIGeneratorOpen}
        onClose={() => setIsAIGeneratorOpen(false)}
      />

      {/* Sprint Status Modal */}
      {statusModal.action && (
        <SprintStatusModal
          isOpen={statusModal.isOpen}
          onClose={() => setStatusModal({ isOpen: false })}
          action={statusModal.action}
          sprintName={statusModal.sprint?.name || ''}
          onConfirm={() => {
            console.log(`Sprint ${statusModal.action}:`, statusModal.sprint?.id);
            setStatusModal({ isOpen: false });
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Sprint"
        description="Are you sure you want to delete this sprint? This action cannot be undone."
        actionLabel="Delete"
        isDangerous={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false })}
      />
    </div>
  );
}
