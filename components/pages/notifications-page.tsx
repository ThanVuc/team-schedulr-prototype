'use client';

import { Bell, MessageSquare, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import "../css/scroll-bar-customize.css";

interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    icon: <Users className="w-5 h-5 text-primary" />,
    title: 'Jane Smith invited you',
    description: 'to join the Product Team group',
    timestamp: '2 hours ago',
    read: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
  },
  {
    id: '2',
    icon: <CheckCircle className="w-5 h-5 text-accent" />,
    title: 'Task completed',
    description: 'Design login page has been marked as completed',
    timestamp: '4 hours ago',
    read: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
  },
  {
    id: '3',
    icon: <MessageSquare className="w-5 h-5 text-primary" />,
    title: 'New comment on your task',
    description: 'John Doe commented on "Setup database schema"',
    timestamp: '1 day ago',
    read: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
  },
  {
    id: '4',
    icon: <AlertCircle className="w-5 h-5 text-destructive" />,
    title: 'Sprint ending soon',
    description: 'Sprint 1 will end in 2 days',
    timestamp: '2 days ago',
    read: true,
  },
  {
    id: '5',
    icon: <Users className="w-5 h-5 text-primary" />,
    title: 'New member joined',
    description: 'Alice Williams has joined the Engineering group',
    timestamp: '3 days ago',
    read: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
  },
];

export function NotificationsPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Bell size={32} />
              Notifications
            </h1>
            <p className="text-muted-foreground">
              Stay updated with your team's activities
            </p>
          </div>

          <Button variant="outline">Mark all as read</Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-auto custom-scroll">
        <div className="divide-y divide-border w-auto">
          {mockNotifications.length > 0 ? (
            mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-card/50 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon or Avatar */}
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="p-2 bg-background rounded-lg">
                        {notification.icon}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.description}
                        </p>
                      </div>

                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center min-h-96 text-center p-8">
              <div className="mb-4">
                <Bell className="w-16 h-16 text-muted-foreground opacity-50 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                No notifications
              </h2>
              <p className="text-muted-foreground">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
