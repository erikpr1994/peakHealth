'use client';

import type { AssignProgramData, Client } from '../types';

import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { assignProgram } from '../api/clients';

interface AssignProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClient?: Client;
  onProgramAssigned: () => void;
}

export const AssignProgramDialog = ({
  onOpenChange,
  onProgramAssigned,
  open,
  selectedClient,
}: AssignProgramDialogProps): React.JSX.Element => {
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [goals, setGoals] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const mockPrograms = [
    {
      description:
        'Comprehensive weight loss program with cardio and strength training',
      difficulty: 'Beginner',
      duration: '8 weeks',
      id: 1,
      name: 'Weight Loss Program',
    },
    {
      description: 'Progressive strength training program for muscle building',
      difficulty: 'Intermediate',
      duration: '12 weeks',
      id: 2,
      name: 'Strength Building',
    },
    {
      description: 'High-intensity cardio workouts for cardiovascular health',
      difficulty: 'Beginner',
      duration: '6 weeks',
      id: 3,
      name: 'Cardio Focus',
    },
    {
      description:
        'Complete body transformation with strength, cardio, and flexibility',
      difficulty: 'Advanced',
      duration: '16 weeks',
      id: 4,
      name: 'Full Body Transformation',
    },
  ];

  const handleAssign = async (): Promise<void> => {
    if (!selectedClient || !selectedProgram || !startDate) return;

    setIsLoading(true);
    try {
      const programData: AssignProgramData = {
        client_id: selectedClient.id,
        goals: goals ? goals.split('\n').filter(g => g.trim()) : undefined,
        notes: notes || undefined,
        program_name: selectedProgram,
        start_date: startDate,
      };

      await assignProgram(programData);
      setSelectedProgram('');
      setStartDate('');
      setGoals('');
      setNotes('');
      onOpenChange(false);
      onProgramAssigned();
    } catch (error) {
      console.error('Error assigning program:', error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Program to {selectedClient?.email}</DialogTitle>
          <DialogDescription>
            Select a workout program and configure the assignment settings for
            this client.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="program">Select Program</Label>
              <Select
                value={selectedProgram}
                onValueChange={setSelectedProgram}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a program" />
                </SelectTrigger>
                <SelectContent>
                  {mockPrograms.map(program => (
                    <SelectItem key={program.id} value={program.name}>
                      <div className="flex flex-col">
                        <span className="font-medium">{program.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {program.duration} • {program.difficulty}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStartDate(e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="goals">Client Goals (one per line)</Label>
            <Textarea
              id="goals"
              placeholder="e.g., Lose 10 lbs&#10;Improve cardiovascular health&#10;Build strength"
              value={goals}
              onChange={e => setGoals(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes or considerations..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAssign}
              disabled={!selectedProgram || !startDate || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Assigning...
                </>
              ) : (
                'Assign Program'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
