'use client';

import { useState } from 'react';
import { X, Send, Check, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';

interface TaskDetailPanelProps {
  taskId: string;
  onClose: () => void;
}

const fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 200];

const sprints = ['Sprint 1', 'Sprint 2', 'Backlog'];

const statusLabels: Record<string, string> = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  review: 'Review',
  completed: 'Completed',
};

const mockTask = {
  id: '1',
  title: 'Design login page',
  description: 'Create a modern and user-friendly login page with email and password fields, forgot password link, and sign-up option.',
  assignee: {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
  },
  status: 'todo',
  priority: 'High',
  dueDate: '2024-02-20',
  storyPoints: 8,
  sprint: 'Sprint 1',
  checklist: [
    { id: '1', label: 'Create wireframe', completed: true },
    { id: '2', label: 'Design mockup', completed: true },
    { id: '3', label: 'Get approval', completed: false },
    { id: '4', label: 'Hand off to development', completed: false },
  ],
  comments: [
    {
      id: '1',
      author: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      text: 'Looking good! Please make sure to follow our design system guidelines.',
      timestamp: '2024-02-12T10:30:00',
    },
    {
      id: '2',
      author: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
      text: 'Thanks for the feedback! I\'ve updated the design to match the system.',
      timestamp: '2024-02-12T14:15:00',
    },
  ],
};

const priorityColors: Record<string, string> = {
  High: 'bg-destructive text-destructive-foreground',
  Medium: 'bg-accent text-accent-foreground',
  Low: 'bg-secondary text-secondary-foreground',
};

export function TaskDetailPanel({ taskId, onClose }: TaskDetailPanelProps) {
  const [title, setTitle] = useState(mockTask.title);
  const [description, setDescription] = useState(mockTask.description);
  const [status, setStatus] = useState(mockTask.status);
  const [priority, setPriority] = useState(mockTask.priority);
  const [dueDate, setDueDate] = useState(mockTask.dueDate);
  const [storyPoints, setStoryPoints] = useState(mockTask.storyPoints);
  const [sprint, setSprint] = useState(mockTask.sprint);
  const [checklist, setChecklist] = useState(mockTask.checklist);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(mockTask.comments);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleChecklistToggle = (checklistId: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === checklistId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      console.log('Adding comment:', comment);
      setComment('');
    }
  };

  const handleEditComment = (commentId: string, text: string) => {
    setEditingCommentId(commentId);
    setEditingCommentText(text);
  };

  const handleSaveComment = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, text: editingCommentText } : c
      )
    );
    setEditingCommentId(null);
    setEditingCommentText('');
    console.log('Comment updated:', commentId);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId));
    console.log('Comment deleted:', commentId);
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklist([
        ...checklist,
        { id: String(Date.now()), label: newChecklistItem, completed: false },
      ]);
      setNewChecklistItem('');
    }
  };

  const handleDeleteChecklistItem = (checklistId: string) => {
    setChecklist(checklist.filter((item) => item.id !== checklistId));
  };

  const handleAddCommentWithEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && comment.trim()) {
      handleAddComment();
      e.preventDefault();
    }
  };

  const handleEditCommentWithEnter = (e: React.KeyboardEvent, commentId: string) => {
    if (e.key === 'Enter' && editingCommentText.trim()) {
      handleSaveComment(commentId);
      e.preventDefault();
    }
  };

  const completedCount = checklist.filter((item) => item.completed).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-screen w-96 bg-card border-l border-border overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Task Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-background rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title and Description */}
          <div className="space-y-4">
            {editingTitle ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setEditingTitle(false)}
                autoFocus
                className="text-xl font-semibold"
              />
            ) : (
              <h3
                onClick={() => setEditingTitle(true)}
                className="text-xl font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                title="Double click to edit"
              >
                {title}
              </h3>
            )}

            {editingDescription ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setEditingDescription(false)}
                autoFocus
                className="w-full text-sm text-foreground leading-relaxed bg-input border border-border rounded p-2 resize-none"
                rows={4}
              />
            ) : (
              <p
                onClick={() => setEditingDescription(true)}
                className="text-sm text-muted-foreground leading-relaxed cursor-pointer hover:text-foreground transition-colors"
                title="Double click to edit"
              >
                {description}
              </p>
            )}
          </div>

          <Separator />

          {/* Assignee */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Assignee</label>
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src={mockTask.assignee.avatar} />
                <AvatarFallback>
                  {mockTask.assignee.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">
                {mockTask.assignee.name}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority, Due Date, Story Points, and Sprint */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Due Date</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-8"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Story Points</label>
              <Select value={String(storyPoints)} onValueChange={(val) => setStoryPoints(Number(val))}>
                <SelectTrigger className="w-full h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fibonacciNumbers.map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Sprint</label>
              <Select value={sprint} onValueChange={setSprint}>
                <SelectTrigger className="w-full h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sprints.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Checklist</label>
              <span className="text-xs text-muted-foreground">
                {completedCount}/{checklist.length}
              </span>
            </div>

            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 hover:bg-background rounded transition-colors group"
                >
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => handleChecklistToggle(item.id)}
                  />
                  <span
                    className={`text-sm flex-1 ${
                      item.completed
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteChecklistItem(item.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add Checklist Item */}
            <div className="flex gap-2">
              <Input
                placeholder="Add checklist item..."
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddChecklistItem();
                  }
                }}
                className="h-8 text-sm"
              />
              <Button
                size="sm"
                onClick={handleAddChecklistItem}
                disabled={!newChecklistItem.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          <Separator />

          {/* Comments */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">Comments</label>

            {/* Comment List */}
            <div className="space-y-4 max-h-48 overflow-y-auto">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3 p-3 bg-background rounded-lg hover:bg-background/80 transition-colors group">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={c.avatar} />
                    <AvatarFallback>
                      {c.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {c.author}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {new Date(c.timestamp).toLocaleDateString()}
                        </span>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={() => handleEditComment(c.id, c.text)}
                          >
                            <Edit2 size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteComment(c.id)}
                          >
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {editingCommentId === c.id ? (
                      <Input
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        onKeyDown={(e) => handleEditCommentWithEnter(e, c.id)}
                        onBlur={() => setEditingCommentId(null)}
                        className="bg-input border-border mt-1 text-sm"
                        autoFocus
                        placeholder="Press Enter to save..."
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{c.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Add a comment... (Enter to send)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleAddCommentWithEnter}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleAddComment}
                disabled={!comment.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
