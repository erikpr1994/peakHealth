import { useState } from "react";
import { Plus, Minus, MessageCircle, Camera, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import RestTimer, { RestType } from "./RestTimer";

interface SetData {
  id: string;
  exerciseId: string;
  setNumber: number;
  targetReps?: string;
  actualReps?: number;
  targetWeight?: string;
  actualWeight?: number;
  targetDuration?: string;
  actualDuration?: number;
  restTime: number;
  notes?: string;
  completed: boolean;
}

interface RestViewProps {
  setData?: SetData;
  nextExercise?: {
    id: string;
    name: string;
    sets: any[];
  };
  nextSetNumber: number;
  restTime: number; // in seconds
  restType?: RestType;
  onRestCompleted: () => void;
  customTitle?: string;
  customSubtitle?: string;
}

export default function RestView({
  setData,
  nextExercise,
  nextSetNumber,
  restTime,
  restType = "set",
  onRestCompleted,
  customTitle,
  customSubtitle,
}: RestViewProps) {
  const [actualReps, setActualReps] = useState(setData?.actualReps || 0);
  const [actualWeight, setActualWeight] = useState(setData?.actualWeight || 0);
  const [actualDuration, setActualDuration] = useState(
    setData?.actualDuration || 0
  );
  const [notes, setNotes] = useState(setData?.notes || "");
  const [mediaFiles, setMediaFiles] = useState<
    Array<{ id: string; type: "photo" | "video"; url: string }>
  >([]);

  const handleRestCompleted = () => {
    // Save the set data with actual values (only if we have set data)
    if (setData) {
      console.log("Set completed with data:", {
        actualReps,
        actualWeight,
        actualDuration,
        notes,
        mediaFiles,
      });
    }
    onRestCompleted();
  };

  const addMedia = (type: "photo" | "video") => {
    // Mock media upload - in real app, this would handle file upload
    const mockId = Date.now().toString();
    const mockUrl = `mock-${type}-url-${mockId}`;
    setMediaFiles((prev) => [...prev, { id: mockId, type, url: mockUrl }]);
  };

  const removeMedia = (id: string) => {
    setMediaFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const getNextInfo = () => {
    if (restType === "set" && nextExercise) {
      return `${nextExercise.name} - Set ${nextSetNumber}`;
    }
    if (restType === "exercise") {
      return nextExercise ? `Next: ${nextExercise.name}` : "Next Exercise";
    }
    if (restType === "section") {
      return "Next Section";
    }
    if (restType === "workout") {
      return "Next Workout";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Rest Timer */}
        <RestTimer
          restType={restType}
          initialTime={restTime}
          title={customTitle}
          subtitle={customSubtitle}
          onComplete={handleRestCompleted}
          showCustomTimer={true}
          isAutoStart={true}
        />

        {/* Set Data Input - Only show for set rest */}
        {restType === "set" && setData && (
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold mb-4">How did that set go?</h3>

            <div className="space-y-4">
              {setData.targetReps && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div>
                    <Label>Target Reps</Label>
                    <div className="mt-1 p-2 bg-gray-100 rounded text-center">
                      {setData.targetReps}
                    </div>
                  </div>
                  <div>
                    <Label>Actual Reps</Label>
                    <div className="flex items-center mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setActualReps(Math.max(0, actualReps - 1))
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Input
                        type="number"
                        value={actualReps}
                        onChange={(e) =>
                          setActualReps(parseInt(e.target.value) || 0)
                        }
                        className="mx-2 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActualReps(actualReps + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    {actualReps >= parseInt(setData.targetReps) ? (
                      <Badge className="bg-green-500">Target Hit! 🎯</Badge>
                    ) : (
                      <Badge variant="secondary">Keep Going!</Badge>
                    )}
                  </div>
                </div>
              )}

              {setData.targetWeight &&
                setData.targetWeight !== "Bodyweight" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Target Weight</Label>
                      <div className="mt-1 p-2 bg-gray-100 rounded text-center">
                        {setData.targetWeight}
                      </div>
                    </div>
                    <div>
                      <Label>Actual Weight (lbs)</Label>
                      <Input
                        type="number"
                        value={actualWeight}
                        onChange={(e) =>
                          setActualWeight(parseInt(e.target.value) || 0)
                        }
                        placeholder="Weight used"
                      />
                    </div>
                  </div>
                )}

              {setData.targetDuration && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Target Duration</Label>
                    <div className="mt-1 p-2 bg-gray-100 rounded text-center">
                      {setData.targetDuration}
                    </div>
                  </div>
                  <div>
                    <Label>Actual Duration (seconds)</Label>
                    <Input
                      type="number"
                      value={actualDuration}
                      onChange={(e) =>
                        setActualDuration(parseInt(e.target.value) || 0)
                      }
                      placeholder="Duration held"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Notes and Media - Only show for set rest */}
        {restType === "set" && setData && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Notes & Media
            </h3>

            <Textarea
              placeholder="How did this set feel? Any observations or adjustments..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mb-4"
              rows={3}
            />

            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addMedia("photo")}
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addMedia("video")}
                className="flex-1"
              >
                <Video className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </div>

            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {mediaFiles.map((file) => (
                  <div
                    key={file.id}
                    className="relative bg-gray-100 rounded-lg aspect-square flex items-center justify-center"
                  >
                    {file.type === "photo" ? (
                      <Camera className="w-6 h-6 text-gray-400" />
                    ) : (
                      <Video className="w-6 h-6 text-gray-400" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedia(file.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white p-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Next Exercise/Section Preview */}
        {getNextInfo() && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2">Up Next:</h3>
            <div className="text-gray-700">{getNextInfo()}</div>
          </Card>
        )}
      </div>
    </div>
  );
}
