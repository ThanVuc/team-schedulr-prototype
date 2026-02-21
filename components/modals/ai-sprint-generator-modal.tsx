'use client';

import { useState } from 'react';
import { Upload, Zap, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

interface AISprintGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AISprintGeneratorModal({ isOpen, onClose }: AISprintGeneratorModalProps) {
  const [step, setStep] = useState<'input' | 'structured' | 'preview'>('input');
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleGenerateClick = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setStep('preview');
      setIsGenerating(false);
    }, 2000);
  };

  const handleConfirm = () => {
    console.log('Sprint created with AI');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap size={20} className="text-accent" />
            Generate Sprint with AI
          </DialogTitle>
        </DialogHeader>

        {step === 'input' && (
          <div className="space-y-6 py-4">
            <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as 'text' | 'file')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">Text Input</TabsTrigger>
                <TabsTrigger value="file">Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">Planning Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your planning document, requirements, or goals here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[300px] bg-input border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Include sprint goals, features, tasks, or any planning information
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="file" className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload size={32} className="mx-auto mb-3 text-muted-foreground" />
                  <div className="space-y-2 mb-4">
                    <p className="font-medium text-foreground">Upload planning file</p>
                    <p className="text-sm text-muted-foreground">
                      Supports TXT, PDF, DOC documents
                    </p>
                  </div>
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".txt,.pdf,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button asChild variant="outline">
                      <span>Select File</span>
                    </Button>
                  </Label>
                  {fileName && (
                    <p className="text-sm text-accent mt-2 font-medium">{fileName}</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleGenerateClick}
                disabled={!content.trim()}
                className="gap-2"
              >
                <Zap size={16} />
                Generate with AI
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-6 py-4">
            <div className="bg-secondary/30 border border-border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-foreground">AI Generated Preview</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Sprint Name</p>
                  <p className="font-medium text-foreground">Sprint AI-Generated - Q1 Planning</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium text-foreground">2 weeks (14 days)</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Tasks</p>
                  <p className="font-medium text-foreground">12 tasks identified</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setStep('input')}
              >
                Back
              </Button>
              <Button onClick={handleConfirm} className="gap-2">
                <ChevronRight size={16} />
                Create Sprint
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
