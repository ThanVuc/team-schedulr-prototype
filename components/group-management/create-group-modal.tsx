'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CreateGroupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (name: string) => void
}

export function CreateGroupModal({ open, onOpenChange, onCreate }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    if (!groupName.trim()) return
    
    setIsLoading(true)
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onCreate(groupName)
    setGroupName('')
    setIsLoading(false)
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setGroupName('')
    }
    onOpenChange(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create New Group</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new group to organize your team members and collaborate together.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="group-name" className="text-foreground">
              Group Name
            </Label>
            <Input
              id="group-name"
              placeholder="Enter group name..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="border-border text-foreground hover:bg-muted"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleCreate}
            disabled={!groupName.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
