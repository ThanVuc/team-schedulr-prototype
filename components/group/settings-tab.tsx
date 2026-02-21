'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { ConfirmationDialog } from '../modals/confirmation-dialog';

const mockGroupData = {
  id: 'grp_abc123xyz',
  name: 'Product Team',
  description: 'Core product development team',
  createdAt: '2024-01-15',
  memberCount: 8,
  userRole: 'Owner',
};

export function SettingsTab() {
  const [groupName, setGroupName] = useState(mockGroupData.name);
  const [groupDescription, setGroupDescription] = useState(mockGroupData.description);
  const [isSaved, setIsSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleSave = () => {
    console.log('Saving group settings:', { groupName, groupDescription });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDeleteGroup = () => {
    console.log('Group deleted');
    setDeleteConfirm(false);
  };

  const isOwner = mockGroupData.userRole === 'Owner';

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Success Message */}
      {isSaved && (
        <Alert className="bg-primary/10 border-primary text-primary">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Group settings have been saved successfully.</AlertDescription>
        </Alert>
      )}

      {/* Basic Settings */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Basic Settings</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                disabled={!isOwner}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="group-description">Description</Label>
              <Textarea
                id="group-description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                disabled={!isOwner}
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Group Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Group Information</h3>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Group ID</p>
              <p className="font-mono text-sm bg-card p-3 rounded border border-border text-foreground">
                {mockGroupData.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Created</p>
              <p className="font-mono text-sm bg-card p-3 rounded border border-border text-foreground">
                {new Date(mockGroupData.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Members</p>
              <p className="font-mono text-sm bg-card p-3 rounded border border-border text-foreground">
                {mockGroupData.memberCount}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Role</p>
              <p className="font-mono text-sm bg-card p-3 rounded border border-border text-foreground">
                {mockGroupData.userRole}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isOwner && (
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}

      {/* Danger Zone */}
      {isOwner && (
        <div className="border-t border-border pt-8">
          <div className="space-y-4 p-6 border border-destructive/30 rounded-lg bg-destructive/5">
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-1">Danger Zone</h3>
              <p className="text-sm text-muted-foreground">
                These actions cannot be undone. Please be careful.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-destructive/20">
              <div>
                <p className="font-medium text-foreground">Delete Group</p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete this group and all associated data
                </p>
              </div>

              <Button
                variant="destructive"
                onClick={() => setDeleteConfirm(true)}
              >
                Delete Group
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={deleteConfirm}
        title="Delete Group"
        description="Are you sure you want to delete this group? This action will permanently delete the group and all associated data. This cannot be undone."
        actionLabel="Delete Group"
        isDangerous={true}
        onConfirm={handleDeleteGroup}
        onCancel={() => setDeleteConfirm(false)}
      />
    </div>
  );
}
