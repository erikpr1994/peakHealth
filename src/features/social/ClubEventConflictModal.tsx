import { AlertTriangle, Users, Clock, Calendar } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ClubEvent {
  id: string;
  name: string;
  club: string;
  date: string;
  time: string;
  duration: string;
  difficulty?: string;
  participants?: number;
}

interface ConflictingWorkout {
  id: string;
  name: string;
  time: string;
  duration: string;
  type: string;
}

interface ClubEventConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ClubEvent | null;
  hasTrainer: boolean;
  onConfirm: (
    action: "notify-trainer" | "cancel-workout" | "reschedule-workout",
    message?: string
  ) => void;
}

export default function ClubEventConflictModal({
  isOpen,
  onClose,
  event,
  hasTrainer,
  onConfirm,
}: ClubEventConflictModalProps) {
  const [selectedAction, setSelectedAction] = useState<
    "notify-trainer" | "cancel-workout" | "reschedule-workout" | null
  >(null);
  const [message, setMessage] = useState("");

  // Mock conflicting workout - in a real app, this would be determined by checking the user's schedule
  const conflictingWorkout: ConflictingWorkout = {
    id: "workout-1",
    name: "Upper Body Strength",
    time: "7:30 AM",
    duration: "45 min",
    type: "Strength Training",
  };

  const handleConfirm = () => {
    if (selectedAction) {
      onConfirm(selectedAction, message);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedAction(null);
    setMessage("");
    onClose();
  };

  // Don't render if no event is provided
  if (!event) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Schedule Conflict Detected
          </DialogTitle>
          <DialogDescription>
            The club event you want to join conflicts with an existing workout
            in your schedule.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Club Event Details */}
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-800">{event.name}</h3>
                <p className="text-sm text-blue-600 mb-2">{event.club}</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </div>
                </div>
                {event.duration && (
                  <div className="text-sm text-blue-700 mt-1">
                    Duration: {event.duration}
                  </div>
                )}
                {event.difficulty && (
                  <div className="text-sm text-blue-700 mt-1">
                    Difficulty: {event.difficulty}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Conflicting Workout */}
          <Card className="p-4 border-red-200 bg-red-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-red-800">
                  Conflicting Workout
                </h3>
                <p className="text-sm text-red-600 mb-2">
                  {conflictingWorkout.name}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-red-700">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {conflictingWorkout.time}
                  </div>
                  <div>Duration: {conflictingWorkout.duration}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Selection */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">
              How would you like to resolve this conflict?
            </h4>

            <div className="space-y-3">
              {hasTrainer && (
                <Card
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedAction === "notify-trainer"
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedAction("notify-trainer")}
                >
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-800">
                        Notify Your Trainer
                      </h5>
                      <p className="text-sm text-gray-600">
                        Let your trainer know about the club event and ask for
                        their guidance on rescheduling.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  selectedAction === "cancel-workout"
                    ? "ring-2 ring-primary bg-primary/5"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedAction("cancel-workout")}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-gray-800">
                      Cancel Scheduled Workout
                    </h5>
                    <p className="text-sm text-gray-600">
                      Remove the conflicting workout from your schedule to make
                      room for the club event.
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  selectedAction === "reschedule-workout"
                    ? "ring-2 ring-primary bg-primary/5"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedAction("reschedule-workout")}
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-gray-800">
                      Reschedule Workout
                    </h5>
                    <p className="text-sm text-gray-600">
                      Move the conflicting workout to a different time slot.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Message Input */}
            {selectedAction && (
              <div className="space-y-2">
                <Label htmlFor="message">
                  {selectedAction === "notify-trainer"
                    ? "Message to Trainer (Optional)"
                    : "Additional Notes (Optional)"}
                </Label>
                <Textarea
                  id="message"
                  placeholder={
                    selectedAction === "notify-trainer"
                      ? "Let your trainer know why you want to join this club event..."
                      : "Add any notes about this change..."
                  }
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedAction}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Confirm & Join Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
