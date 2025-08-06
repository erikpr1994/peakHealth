import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Calendar, 
  TrendingUp, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Activity,
  Award,
  Zap
} from "lucide-react";

// Mock data for programs
const mockPrograms = [
  {
    id: 1,
    name: "Weight Loss Program",
    duration: "8 weeks",
    difficulty: "Beginner",
    description: "Comprehensive weight loss program with cardio and strength training"
  },
  {
    id: 2,
    name: "Strength Building",
    duration: "12 weeks",
    difficulty: "Intermediate",
    description: "Progressive strength training program for muscle building"
  },
  {
    id: 3,
    name: "Cardio Focus",
    duration: "6 weeks",
    difficulty: "Beginner",
    description: "High-intensity cardio workouts for cardiovascular health"
  },
  {
    id: 4,
    name: "Full Body Transformation",
    duration: "16 weeks",
    difficulty: "Advanced",
    description: "Complete body transformation with strength, cardio, and flexibility"
  }
];

// Mock data for client assignments
const mockClientAssignments = [
  {
    id: 1,
    clientId: 1,
    clientName: "Sarah Johnson",
    clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b96b61d4?w=150&h=150&fit=crop&crop=face",
    programId: 1,
    programName: "Weight Loss Program",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    currentWeek: 6,
    totalWeeks: 8,
    completedWorkouts: 24,
    totalWorkouts: 32,
    lastWorkout: "2024-01-20",
    adherenceRate: 85,
    status: "active",
    notes: "Making excellent progress, very motivated",
    goals: ["Lose 10 lbs", "Improve cardiovascular health", "Build strength"]
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Mike Chen",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    programId: 2,
    programName: "Strength Building",
    startDate: "2024-02-20",
    endDate: "2024-05-20",
    currentWeek: 4,
    totalWeeks: 12,
    completedWorkouts: 18,
    totalWorkouts: 48,
    lastWorkout: "2024-01-19",
    adherenceRate: 92,
    status: "active",
    notes: "Excellent form and consistency",
    goals: ["Increase bench press by 50 lbs", "Build muscle mass", "Improve overall strength"]
  },
  {
    id: 3,
    clientId: 3,
    clientName: "Emma Davis",
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    programId: 3,
    programName: "Cardio Focus",
    startDate: "2023-12-10",
    endDate: "2024-01-21",
    currentWeek: 6,
    totalWeeks: 6,
    completedWorkouts: 20,
    totalWorkouts: 24,
    lastWorkout: "2024-01-14",
    adherenceRate: 65,
    status: "at_risk",
    notes: "Missing sessions, needs motivation",
    goals: ["Improve endurance", "Lose weight", "Feel more energetic"]
  },
  {
    id: 4,
    clientId: 4,
    clientName: "Alex Rodriguez",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    programId: 4,
    programName: "Full Body Transformation",
    startDate: "2024-03-05",
    endDate: "2024-06-26",
    currentWeek: 2,
    totalWeeks: 16,
    completedWorkouts: 8,
    totalWorkouts: 64,
    lastWorkout: "2024-01-20",
    adherenceRate: 100,
    status: "active",
    notes: "Highly motivated and consistent",
    goals: ["Complete body transformation", "Lose 20 lbs", "Build lean muscle"]
  }
];

interface AssignProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClient?: any;
}

function AssignProgramDialog({ open, onOpenChange, selectedClient }: AssignProgramDialogProps) {
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [goals, setGoals] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const handleAssign = () => {
    // Here you would typically call an API to assign the program
    console.log("Assigning program:", {
      clientId: selectedClient?.id,
      programId: selectedProgram,
      startDate,
      goals: goals.split('\n').filter(g => g.trim()),
      notes
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Program to {selectedClient?.name}</DialogTitle>
          <DialogDescription>
            Select a workout program and configure the assignment settings for this client.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="program">Select Program</Label>
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a program" />
                </SelectTrigger>
                <SelectContent>
                  {mockPrograms.map((program) => (
                    <SelectItem key={program.id} value={program.id.toString()}>
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
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="goals">Client Goals (one per line)</Label>
            <Textarea
              id="goals"
              placeholder="e.g., Lose 10 lbs&#10;Improve cardiovascular health&#10;Build strength"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes or considerations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedProgram || !startDate}>
              Assign Program
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ClientProgressTracking() {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'at_risk': return 'destructive';
      case 'completed': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="h-4 w-4" />;
      case 'at_risk': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleAssignProgram = (client: any) => {
    setSelectedClient(client);
    setAssignDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Client Progress Tracking</h1>
          <p className="text-muted-foreground">
            Monitor client program assignments and track their progress
          </p>
        </div>
        <Button onClick={() => setAssignDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Assign Program
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Assignments</p>
                <p className="text-2xl font-semibold">
                  {mockClientAssignments.filter(a => a.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Adherence</p>
                <p className="text-2xl font-semibold">
                  {Math.round(mockClientAssignments.reduce((acc, curr) => acc + curr.adherenceRate, 0) / mockClientAssignments.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-2xl font-semibold">
                  {mockClientAssignments.filter(a => a.status === 'at_risk').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-semibold">
                  {mockClientAssignments.filter(a => a.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Program Assignments */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Assignments ({mockClientAssignments.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({mockClientAssignments.filter(a => a.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="at_risk">At Risk ({mockClientAssignments.filter(a => a.status === 'at_risk').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockClientAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={assignment.clientAvatar} alt={assignment.clientName} />
                      <AvatarFallback>
                        {assignment.clientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{assignment.clientName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{assignment.programName}</p>
                    </div>
                    <Badge variant={getStatusColor(assignment.status)}>
                      {getStatusIcon(assignment.status)}
                      <span className="ml-1 capitalize">{assignment.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progress Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Week Progress</p>
                      <p className="font-medium">{assignment.currentWeek} / {assignment.totalWeeks}</p>
                      <Progress value={(assignment.currentWeek / assignment.totalWeeks) * 100} className="mt-1" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Workout Progress</p>
                      <p className="font-medium">{assignment.completedWorkouts} / {assignment.totalWorkouts}</p>
                      <Progress value={(assignment.completedWorkouts / assignment.totalWorkouts) * 100} className="mt-1" />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Adherence</p>
                      <p className="font-medium flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {assignment.adherenceRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Workout</p>
                      <p className="font-medium">{new Date(assignment.lastWorkout).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-medium">{new Date(assignment.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Goals Preview */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Goals</p>
                    <div className="flex flex-wrap gap-1">
                      {assignment.goals.slice(0, 2).map((goal, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Target className="h-3 w-3 mr-1" />
                          {goal}
                        </Badge>
                      ))}
                      {assignment.goals.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{assignment.goals.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockClientAssignments
              .filter(assignment => assignment.status === 'active')
              .map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={assignment.clientAvatar} alt={assignment.clientName} />
                        <AvatarFallback>
                          {assignment.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-base">{assignment.clientName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{assignment.programName}</p>
                      </div>
                      <Badge variant="default">
                        <Activity className="h-4 w-4 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress Overview */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Week Progress</p>
                        <p className="font-medium">{assignment.currentWeek} / {assignment.totalWeeks}</p>
                        <Progress value={(assignment.currentWeek / assignment.totalWeeks) * 100} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Workout Progress</p>
                        <p className="font-medium">{assignment.completedWorkouts} / {assignment.totalWorkouts}</p>
                        <Progress value={(assignment.completedWorkouts / assignment.totalWorkouts) * 100} className="mt-1" />
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Adherence</p>
                        <p className="font-medium flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          {assignment.adherenceRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Workout</p>
                        <p className="font-medium">{new Date(assignment.lastWorkout).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">End Date</p>
                        <p className="font-medium">{new Date(assignment.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Goals Preview */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Goals</p>
                      <div className="flex flex-wrap gap-1">
                        {assignment.goals.slice(0, 2).map((goal, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Target className="h-3 w-3 mr-1" />
                            {goal}
                          </Badge>
                        ))}
                        {assignment.goals.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{assignment.goals.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="at_risk" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockClientAssignments
              .filter(assignment => assignment.status === 'at_risk')
              .map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow border-destructive/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={assignment.clientAvatar} alt={assignment.clientName} />
                        <AvatarFallback>
                          {assignment.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-base">{assignment.clientName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{assignment.programName}</p>
                      </div>
                      <Badge variant="destructive">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        At Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress Overview */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Week Progress</p>
                        <p className="font-medium">{assignment.currentWeek} / {assignment.totalWeeks}</p>
                        <Progress value={(assignment.currentWeek / assignment.totalWeeks) * 100} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Workout Progress</p>
                        <p className="font-medium">{assignment.completedWorkouts} / {assignment.totalWorkouts}</p>
                        <Progress value={(assignment.completedWorkouts / assignment.totalWorkouts) * 100} className="mt-1" />
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Adherence</p>
                        <p className="font-medium flex items-center gap-1 text-destructive">
                          <Zap className="h-3 w-3" />
                          {assignment.adherenceRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Workout</p>
                        <p className="font-medium">{new Date(assignment.lastWorkout).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">End Date</p>
                        <p className="font-medium">{new Date(assignment.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Goals Preview */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Goals</p>
                      <div className="flex flex-wrap gap-1">
                        {assignment.goals.slice(0, 2).map((goal, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Target className="h-3 w-3 mr-1" />
                            {goal}
                          </Badge>
                        ))}
                        {assignment.goals.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{assignment.goals.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Assign Program Dialog */}
      <AssignProgramDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        selectedClient={selectedClient}
      />
    </div>
  );
}