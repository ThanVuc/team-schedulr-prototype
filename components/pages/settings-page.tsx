'use client';

import { useState } from 'react';
import { Settings, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';

export function SettingsPage() {
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [theme, setTheme] = useState('dark');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [activityNotifications, setActivityNotifications] = useState(true);

  const handleSave = () => {
    console.log('Saving profile settings:', {
      fullName,
      email,
      theme,
      emailNotifications,
      activityNotifications,
    });
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="border-b border-border p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Settings size={32} />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Profile Settings */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Profile Information</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notification Settings */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Notifications</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your groups and tasks
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Activity Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when team members are active in your groups
                    </p>
                  </div>
                  <Switch
                    checked={activityNotifications}
                    onCheckedChange={setActivityNotifications}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Settings */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Account</h2>

              <div className="space-y-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="font-medium text-foreground mb-1">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    January 15, 2024
                  </p>
                </div>

                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="font-medium text-foreground mb-1">Account Status</p>
                  <p className="text-sm text-accent font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
