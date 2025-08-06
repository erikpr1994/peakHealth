import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Separator } from "./ui/separator";
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Clock, 
  Target, 
  BookOpen,
  Save,
  Eye,
  Copy,
  ChevronDown,
  ChevronUp,
  Timer,
  Weight,
  RotateCcw,
  Zap
} from "lucide-react";


interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  equipment: string[];
  restPeriod: string;
  sets: {
    id: string;
    reps: string;
    weight: string;
    rpe: string;
    notes: string;
  }[];
  notes: string;
}

interface Workout {
  id: string;
  name: string;
  objective: string;
  description: string;
  estimatedDuration: string;
  exercises: Exercise[];
  isExpanded: boolean;
}

interface Program {
  id: string;
  name: string;
  duration: string;
  difficulty: string;
  description: string;
  workouts: Workout[];
}

export function ProgramBuilder() {
  const [program, setProgram] = useState<Program>({
    id: '1',
    name: '',
    duration: '4',
    difficulty: 'Beginner',
    description: '',
    workouts: []
  });

  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>('');
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    objective: '',
    description: '',
    estimatedDuration: '60'
  });

  const mockExercises = [
    {
      id: '1',
      name: 'Barbell Squat',
      muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
      equipment: ['Barbell', 'Squat Rack'],
      category: 'Compound'
    },
    {
      id: '2',
      name: 'Dynamic Stretching',
      muscleGroups: ['Full Body'],
      equipment: ['Bodyweight'],
      category: 'Warm-up'
    },
    {
      id: '3',
      name: 'Battle Ropes',
      muscleGroups: ['Arms', 'Core', 'Shoulders'],
      equipment: ['Battle Ropes'],
      category: 'Cardio'
    },
    {
      id: '4',
      name: 'Bench Press',
      muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
      equipment: ['Barbell', 'Bench'],
      category: 'Compound'
    },
    {
      id: '5',
      name: 'Deadlift',
      muscleGroups: ['Hamstrings', 'Glutes', 'Lower Back'],
      equipment: ['Barbell'],
      category: 'Compound'
    },
    {
      id: '6',
      name: 'Pull-ups',
      muscleGroups: ['Lats', 'Biceps', 'Rhomboids'],
      equipment: ['Pull-up Bar'],
      category: 'Compound'
    },
    {
      id: '7',
      name: 'Dumbbell Shoulder Press',
      muscleGroups: ['Shoulders', 'Triceps'],
      equipment: ['Dumbbells'],
      category: 'Isolation'
    },
    {
      id: '8',
      name: 'Plank',
      muscleGroups: ['Core', 'Shoulders'],
      equipment: ['Bodyweight'],
      category: 'Isometric'
    },
    {
      id: '9',
      name: 'Treadmill Run',
      muscleGroups: ['Legs', 'Cardiovascular'],
      equipment: ['Treadmill'],
      category: 'Cardio'
    },
    {
      id: '10',
      name: 'Bicep Curls',
      muscleGroups: ['Biceps'],
      equipment: ['Dumbbells'],
      category: 'Isolation'
    }
  ];

  const addWorkout = () => {
    const workout: Workout = {
      id: Date.now().toString(),
      name: newWorkout.name,
      objective: newWorkout.objective,
      description: newWorkout.description,
      estimatedDuration: newWorkout.estimatedDuration,
      exercises: [],
      isExpanded: true
    };

    setProgram(prev => ({
      ...prev,
      workouts: [...prev.workouts, workout]
    }));

    setNewWorkout({
      name: '',
      objective: '',
      description: '',
      estimatedDuration: '60'
    });
    setIsAddWorkoutOpen(false);
  };

  const addExerciseToWorkout = (workoutId: string, exerciseData: any) => {
    const exercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseData.name,
      muscleGroups: exerciseData.muscleGroups,
      equipment: exerciseData.equipment,
      restPeriod: '90',
      sets: [
        {
          id: Date.now().toString(),
          reps: '',
          weight: '',
          rpe: '',
          notes: ''
        }
      ],
      notes: ''
    };

    setProgram(prev => ({
      ...prev,
      workouts: prev.workouts.map(workout => 
        workout.id === workoutId 
          ? { ...workout, exercises: [...workout.exercises, exercise] }
          : workout
      )
    }));
  };

  const addSetToExercise = (workoutId: string, exerciseId: string) => {
    const newSet = {
      id: Date.now().toString(),
      reps: '',
      weight: '',
      rpe: '',
      notes: ''
    };

    setProgram(prev => ({
      ...prev,
      workouts: prev.workouts.map(workout => 
        workout.id === workoutId 
          ? {
              ...workout,
              exercises: workout.exercises.map(exercise =>
                exercise.id === exerciseId
                  ? { ...exercise, sets: [...exercise.sets, newSet] }
                  : exercise
              )
            }
          : workout
      )
    }));
  };

  const updateSetData = (workoutId: string, exerciseId: string, setId: string, field: string, value: string) => {
    setProgram(prev => ({
      ...prev,
      workouts: prev.workouts.map(workout => 
        workout.id === workoutId 
          ? {
              ...workout,
              exercises: workout.exercises.map(exercise =>
                exercise.id === exerciseId
                  ? {
                      ...exercise,
                      sets: exercise.sets.map(set =>
                        set.id === setId
                          ? { ...set, [field]: value }
                          : set
                      )
                    }
                  : exercise
              )
            }
          : workout
      )
    }));
  };

  const toggleWorkoutExpansion = (workoutId: string) => {
    setProgram(prev => ({
      ...prev,
      workouts: prev.workouts.map(workout => 
        workout.id === workoutId 
          ? { ...workout, isExpanded: !workout.isExpanded }
          : workout
      )
    }));
  };

  const removeExercise = (workoutId: string, exerciseId: string) => {
    setProgram(prev => ({
      ...prev,
      workouts: prev.workouts.map(workout => 
        workout.id === workoutId 
          ? { ...workout, exercises: workout.exercises.filter(ex => ex.id !== exerciseId) }
          : workout
      )
    }));
  };

  const removeSet = (workoutId: string, exerciseId: string, setId: string) => {
    setProgram(prev => ({
      ...prev,
      workouts: prev.workouts.map(workout => 
        workout.id === workoutId 
          ? {
              ...workout,
              exercises: workout.exercises.map(exercise =>
                exercise.id === exerciseId
                  ? { ...exercise, sets: exercise.sets.filter(set => set.id !== setId) }
                  : exercise
              )
            }
          : workout
      )
    }));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Program Builder</h1>
          <p className="text-muted-foreground">Create detailed workout programs for your clients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Program
          </Button>
        </div>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Program Settings */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Program Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Program Name</Label>
              <Input 
                placeholder="e.g. Full Body Transformation"
                value={program.name}
                onChange={(e) => setProgram(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Duration (weeks)</Label>
                <Select value={program.duration} onValueChange={(value) => setProgram(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 weeks</SelectItem>
                    <SelectItem value="6">6 weeks</SelectItem>
                    <SelectItem value="8">8 weeks</SelectItem>
                    <SelectItem value="12">12 weeks</SelectItem>
                    <SelectItem value="16">16 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Difficulty Level</Label>
                <Select value={program.difficulty} onValueChange={(value) => setProgram(prev => ({ ...prev, difficulty: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea 
                placeholder="Describe your routine goals and who you want to achieve..."
                value={program.description}
                onChange={(e) => setProgram(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Workouts Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Workouts</CardTitle>
              <Dialog open={isAddWorkoutOpen} onOpenChange={setIsAddWorkoutOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Workout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Workout</DialogTitle>
                    <DialogDescription>
                      Create a new workout by providing the basic information below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Workout Name</Label>
                      <Input 
                        placeholder="e.g. Full Body Strength A"
                        value={newWorkout.name}
                        onChange={(e) => setNewWorkout(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Workout Objective</Label>
                      <Input 
                        placeholder="e.g. Build foundational strength across all major muscle groups..."
                        value={newWorkout.objective}
                        onChange={(e) => setNewWorkout(prev => ({ ...prev, objective: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Detailed description of the workout..."
                        value={newWorkout.description}
                        onChange={(e) => setNewWorkout(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Estimated Duration (minutes)</Label>
                      <Input 
                        type="number"
                        value={newWorkout.estimatedDuration}
                        onChange={(e) => setNewWorkout(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addWorkout} className="flex-1">Add Workout</Button>
                      <Button variant="outline" onClick={() => setIsAddWorkoutOpen(false)} className="flex-1">Cancel</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {program.workouts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No workouts added yet</p>
                <p className="text-sm">Click "Add Workout" to get started</p>
              </div>
            ) : (
              program.workouts.map((workout) => (
                <Card key={workout.id} className="border-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleWorkoutExpansion(workout.id)}
                        >
                          {workout.isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                        <div>
                          <CardTitle className="text-lg">{workout.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{workout.objective}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {workout.estimatedDuration}m
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {workout.isExpanded && (
                    <CardContent className="space-y-4">
                      <p className="text-sm">{workout.description}</p>
                      <Separator />
                      
                      {/* Exercises */}
                      <div className="space-y-4">
                        {workout.exercises.map((exercise, exerciseIndex) => (
                          <Card key={exercise.id} className="bg-muted/50">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <CardTitle className="text-base">{exercise.name}</CardTitle>
                                    <div className="flex gap-2 mt-1">
                                      {exercise.muscleGroups.map((muscle, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">{muscle}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-2">
                                    <Timer className="h-3 w-3 text-muted-foreground" />
                                    <Input 
                                      className="w-16 h-6 text-xs"
                                      value={exercise.restPeriod}
                                      onChange={(e) => {
                                        setProgram(prev => ({
                                          ...prev,
                                          workouts: prev.workouts.map(w => 
                                            w.id === workout.id 
                                              ? {
                                                  ...w,
                                                  exercises: w.exercises.map(ex =>
                                                    ex.id === exercise.id
                                                      ? { ...ex, restPeriod: e.target.value }
                                                      : ex
                                                  )
                                                }
                                              : w
                                          )
                                        }))
                                      }}
                                    />
                                    <span className="text-xs text-muted-foreground">sec</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeExercise(workout.id, exercise.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {exercise.notes && (
                                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                                  <p className="text-sm text-blue-700 dark:text-blue-300">{exercise.notes}</p>
                                </div>
                              )}
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-12">SET</TableHead>
                                    <TableHead>REPS</TableHead>
                                    <TableHead>WEIGHT (KG)</TableHead>
                                    <TableHead>RPE</TableHead>
                                    <TableHead>NOTES</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {exercise.sets.map((set, setIndex) => (
                                    <TableRow key={set.id}>
                                      <TableCell className="font-medium">{setIndex + 1}</TableCell>
                                      <TableCell>
                                        <Input 
                                          className="w-20"
                                          value={set.reps}
                                          onChange={(e) => updateSetData(workout.id, exercise.id, set.id, 'reps', e.target.value)}
                                          placeholder="12"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          className="w-20"
                                          value={set.weight}
                                          onChange={(e) => updateSetData(workout.id, exercise.id, set.id, 'weight', e.target.value)}
                                          placeholder="50"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          className="w-16"
                                          value={set.rpe}
                                          onChange={(e) => updateSetData(workout.id, exercise.id, set.id, 'rpe', e.target.value)}
                                          placeholder="8"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          value={set.notes}
                                          onChange={(e) => updateSetData(workout.id, exercise.id, set.id, 'notes', e.target.value)}
                                          placeholder="Add notes..."
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeSet(workout.id, exercise.id, set.id)}
                                          disabled={exercise.sets.length === 1}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                              
                              <div className="flex justify-between items-center mt-3">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => addSetToExercise(workout.id, exercise.id)}
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Set
                                </Button>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="ghost">
                                    <BookOpen className="h-4 w-4 mr-1" />
                                    Add Notes
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {/* Add Exercise Button */}
                        <Dialog open={isAddExerciseOpen} onOpenChange={setIsAddExerciseOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="dashed" 
                              className="w-full h-16 border-2 border-dashed"
                              onClick={() => setSelectedWorkoutId(workout.id)}
                            >
                              <Plus className="h-6 w-6 mr-2" />
                              Add Exercise
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Add Exercise</DialogTitle>
                              <DialogDescription>
                                Select an exercise from the library to add to this workout.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                                {mockExercises.map((exercise) => (
                                  <Card 
                                    key={exercise.id} 
                                    className="cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => {
                                      addExerciseToWorkout(selectedWorkoutId, exercise);
                                      setIsAddExerciseOpen(false);
                                    }}
                                  >
                                    <CardContent className="p-4">
                                      <h4 className="font-medium">{exercise.name}</h4>
                                      <div className="flex gap-2 mt-2">
                                        {exercise.muscleGroups.map((muscle, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs">{muscle}</Badge>
                                        ))}
                                      </div>
                                      <div className="flex gap-2 mt-2">
                                        {exercise.equipment.map((equip, idx) => (
                                          <Badge key={idx} variant="secondary" className="text-xs">{equip}</Badge>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}