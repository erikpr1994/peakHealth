import { FileText, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (notes: string) => void;
  initialNotes?: string;
  title?: string;
  placeholder?: string;
}

const NotesModal = ({
  isOpen,
  onClose,
  onSave,
  initialNotes = '',
  title = 'Edit Notes',
  placeholder = 'Add your notes here...',
}: NotesModalProps) => {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes, isOpen]);

  const handleSave = () => {
    onSave(notes);
    onClose();
  };

  const handleCancel = () => {
    setNotes(initialNotes);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Add notes to track form cues, personal records, modifications, or
            any other relevant information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={placeholder}
              className="min-h-[200px] resize-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{notes.length} characters</span>
            <span>
              Tip: Use these notes to track form cues, personal records, or
              modifications
            </span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleCancel} variant="outline" className="flex-1">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Notes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotesModal;
