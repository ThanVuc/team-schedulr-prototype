'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Trash2, Save } from 'lucide-react'

interface GroupSettingsProps {
  groupId: string
  groupData: {
    id: string
    name: string
    description: string
    memberCount: number
    userRole: string
    createdAt: string
  }
}

export function GroupSettings({ groupId, groupData }: GroupSettingsProps) {
  const [groupName, setGroupName] = useState(groupData.name)
  const [description, setDescription] = useState(groupData.description)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleNameChange = (value: string) => {
    setGroupName(value)
    setHasChanges(true)
  }

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate async save
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsSaving(false)
    setHasChanges(false)
  }

  const handleDeleteClick = () => {
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (verificationEmail !== groupData.description) {
      return // Should show error
    }
    
    setIsDeleting(true)
    // Simulate async delete
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsDeleting(false)
    setShowDeleteDialog(false)
    // Redirect back to groups list
  }

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-bold text-foreground mb-4">General Settings</h2>
        
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="group-name" className="text-foreground">
              Group Name
            </Label>
            <Input
              id="group-name"
              value={groupName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="Enter group name"
            />
            <p className="text-xs text-muted-foreground">The name of your group</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Add a description for your group"
              rows={4}
              className="w-full px-3 py-2 bg-input border border-border text-foreground placeholder:text-muted-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground">Brief description of the group's purpose</p>
          </div>

          {hasChanges && (
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90 text-white gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                onClick={() => {
                  setGroupName(groupData.name)
                  setDescription(groupData.description)
                  setHasChanges(false)
                }}
                variant="outline"
                className="border-border text-foreground hover:bg-muted"
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Group Information */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-bold text-foreground mb-4">Group Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Group ID</p>
            <p className="font-mono text-sm text-foreground bg-muted/50 p-3 rounded-md border border-border">
              {groupId}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Created On</p>
            <p className="font-mono text-sm text-foreground bg-muted/50 p-3 rounded-md border border-border">
              {new Date(groupData.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Members</p>
            <p className="font-mono text-sm text-foreground bg-muted/50 p-3 rounded-md border border-border">
              {groupData.memberCount}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Your Role</p>
            <p className="font-mono text-sm text-foreground bg-muted/50 p-3 rounded-md border border-border">
              {groupData.userRole}
            </p>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-500/30 bg-red-500/5">
        <h2 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Delete Group</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete this group and all associated data. This action cannot be undone.
            </p>
            <Button
              onClick={handleDeleteClick}
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 text-white gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Group
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Group?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. All group data and member information will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {!showEmailVerification ? (
            <div className="space-y-4 py-4">
              <p className="text-sm text-foreground font-semibold">
                Type your group description to confirm deletion:
              </p>
              <p className="text-sm text-muted-foreground italic">
                "{groupData.description}"
              </p>
              <Input
                type="text"
                placeholder="Enter group description"
                value={verificationEmail}
                onChange={(e) => setVerificationEmail(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-red-500"
              />
            </div>
          ) : null}

          <AlertDialogFooter>
            <AlertDialogCancel className="border-border text-foreground hover:bg-muted">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={verificationEmail !== groupData.description || isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
