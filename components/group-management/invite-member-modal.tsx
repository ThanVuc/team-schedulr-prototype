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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Copy, CheckCircle2 } from 'lucide-react'

interface InviteMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvite: (email: string, role: string) => void
  currentRole: string
}

export function InviteMemberModal({
  open,
  onOpenChange,
  onInvite,
  currentRole,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Member')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const inviteLink = `https://app.example.com/invite/${Math.random().toString(36).substr(2, 9)}`

  const handleInvite = async () => {
    if (!email.trim() || !role) return

    setIsLoading(true)
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500))

    onInvite(email, role)
    setEmail('')
    setRole('Member')
    setIsLoading(false)
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setEmail('')
      setRole('Member')
    }
    onOpenChange(value)
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const availableRoles = currentRole === 'Owner'
    ? ['Viewer', 'Member', 'Manager']
    : ['Viewer', 'Member']

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Invite Member to Group</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add new members to your group by email or share an invite link
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Email Invite */}
          <div className="space-y-4 pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Send Invite by Email</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="member@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role" className="text-foreground">
                Role
              </Label>
              <Select value={role} onValueChange={setRole} disabled={isLoading}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {availableRoles.map(r => (
                    <SelectItem key={r} value={r} className="cursor-pointer">
                      <span className="text-foreground">{r}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {role === 'Viewer' && (
              <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
                Viewers can only view the group and members. They cannot make any changes.
              </p>
            )}
            {role === 'Member' && (
              <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
                Members can view and participate in group activities.
              </p>
            )}
            {role === 'Manager' && (
              <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
                Managers can invite members, assign roles, and manage basic group settings.
              </p>
            )}
          </div>

          {/* Invite Link */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Or Share Invite Link</h3>
            <div className="flex gap-2">
              <Input
                type="text"
                value={inviteLink}
                readOnly
                className="bg-input border-border text-muted-foreground text-sm"
              />
              <Button
                type="button"
                size="icon"
                onClick={copyInviteLink}
                variant="outline"
                className="border-border hover:bg-muted text-foreground flex-shrink-0"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
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
            onClick={handleInvite}
            disabled={!email.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isLoading ? 'Inviting...' : 'Send Invite'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
