import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Search, 
  Filter, 
  Plus, 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Target,
  Activity,
  AlertCircle,
  CheckCircle,
  Zap,
  Edit,
  Eye,
  BarChart3,
  UserPlus,
  ChevronRight,
  User
} from "lucide-react";

const mockClients = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    joinDate: "2024-01-15",
    currentProgram: "Weight Loss Program",
    progress: 75,
    lastWorkout: "2 days ago",
    totalWorkouts: 24,
    adherenceRate: 85,
    programStatus: "active",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b96b61d4?w=150&h=150&fit=crop&crop=face",
    goals: ["Lose 10 lbs", "Improve cardiovascular health"],
    notes: "Very motivated and consistent with workouts"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    joinDate: "2024-02-20",
    currentProgram: "Strength Building",
    progress: 60,
    lastWorkout: "1 day ago",
    totalWorkouts: 18,
    adherenceRate: 92,
    programStatus: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    goals: ["Build muscle mass", "Increase strength"],
    notes: "Excellent form and dedication"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    joinDate: "2023-12-10",
    currentProgram: "Cardio Focus",
    progress: 45,
    lastWorkout: "1 week ago",
    totalWorkouts: 32,
    adherenceRate: 65,
    programStatus: "at_risk",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    goals: ["Improve endurance", "Lose weight"],
    notes: "Needs motivation and support"
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex.r@email.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    joinDate: "2024-03-05",
    currentProgram: "Full Body Transformation",
    progress: 85,
    lastWorkout: "Today",
    totalWorkouts: 15,
    adherenceRate: 100,
    programStatus: "active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    goals: ["Complete transformation", "Build lean muscle"],
    notes: "Highly motivated and consistent"
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    phone: "+1 (555) 567-8901",
    status: "inactive",
    joinDate: "2023-11-15",
    currentProgram: null,
    progress: 0,
    lastWorkout: "3 weeks ago",
    totalWorkouts: 8,
    adherenceRate: 30,
    programStatus: "none",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    goals: [],
    notes: "Taking a break from training"
  }
];

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

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AddClientDialog({ open, onOpenChange }: AddClientDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goals: '',
    notes: ''
  });

  const handleSubmit = () => {
    console.log('Adding new client:', formData);
    setFormData({ name: '', email: '', phone: '', goals: '', notes: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Create a new client profile by entering their basic information and initial goals.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter client's full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="client@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <Label htmlFor="goals">Initial Goals (one per line)</Label>
            <Textarea
              id="goals"
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              placeholder="e.g., Lose 10 lbs&#10;Improve cardiovascular health&#10;Build strength"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any additional notes about the client..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.name || !formData.email}>
              Add Client
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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

interface ClientManagementProps {
  scopeInfo: any;
  onSelectClient?: (client: any) => void;
  onViewClient?: (clientId: number) => void;
}

export function ClientManagement({ scopeInfo, onSelectClient, onViewClient }: ClientManagementProps) {
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [assignProgramOpen, setAssignProgramOpen] = useState(false);
  const [selectedClientForAssign, setSelectedClientForAssign] = useState<any>(null);

  const getProgramStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'at_risk': return 'destructive';
      case 'completed': return 'secondary';
      case 'none': return 'outline';
      default: return 'secondary';
    }
  };

  const getProgramStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="h-3 w-3" />;
      case 'at_risk': return <AlertCircle className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'none': return <Target className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const handleAssignProgram = (client: any) => {
    setSelectedClientForAssign(client);
    setAssignProgramOpen(true);
  };

  const handleViewClientDetails = (client: any) => {
    if (onViewClient) {
      onViewClient(client.id);
    }
  };

  const renderClientCard = (client: any) => (
    <Card key={client.id} className="hover:shadow-lg transition-all duration-200 border-0 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {client.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{client.name}</h4>
              <p className="text-sm text-muted-foreground">{client.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge 
              variant={client.status === 'active' ? 'default' : 'secondary'}
              className="text-xs px-2 py-1"
            >
              {client.status}
            </Badge>
            <Badge 
              variant={getProgramStatusColor(client.programStatus)}
              className="text-xs px-2 py-1"
            >
              {getProgramStatusIcon(client.programStatus)}
              <span className="ml-1">
                {client.programStatus === 'none' ? 'No Program' : 
                 client.programStatus === 'at_risk' ? 'At Risk' :
                 client.programStatus.charAt(0).toUpperCase() + client.programStatus.slice(1)}
              </span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5 pt-0">
        {client.currentProgram && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Program Progress</span>
              <span className="text-sm font-semibold text-foreground">{client.progress}%</span>
            </div>
            <Progress 
              value={client.progress} 
              className="h-2" 
            />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current Program</p>
            <p className="font-semibold text-sm text-foreground">
              {client.currentProgram || 'None assigned'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Workouts</p>
            <p className="font-semibold text-sm text-foreground">{client.totalWorkouts}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Last Workout</p>
            <p className="font-semibold text-sm text-foreground">{client.lastWorkout}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Adherence</p>
            <p className="font-semibold text-sm text-foreground flex items-center gap-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              {client.adherenceRate}%
            </p>
          </div>
        </div>

        {client.goals.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Goals</p>
            <div className="space-y-1">
              {client.goals.map((goal, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full flex-shrink-0"></div>
                  <span className="text-foreground">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 h-8"
            onClick={() => handleViewClientDetails(client)}
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 h-8"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Message
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 px-3"
            onClick={() => handleAssignProgram(client)}
          >
            {client.currentProgram ? 'Reassign' : 'Assign'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header with Data Scope */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {(() => {
              const IconComponent = scopeInfo.icon;
              return (
                <Badge variant={scopeInfo.color}>
                  <IconComponent className="h-3 w-3 mr-1" />
                  {scopeInfo.label}
                </Badge>
              );
            })()}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <h1>Client Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setAssignProgramOpen(true)}>
            <Target className="h-4 w-4 mr-2" />
            Assign Program
          </Button>
          <Button onClick={() => setAddClientOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </div>
      </div>

      <div>
        <p className="text-muted-foreground">Manage your client roster, track program assignments, and monitor overall client health.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-semibold">{mockClients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Programs</p>
                <p className="text-2xl font-semibold">
                  {mockClients.filter(c => c.programStatus === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-2xl font-semibold">
                  {mockClients.filter(c => c.programStatus === 'at_risk').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Adherence</p>
                <p className="text-2xl font-semibold">
                  {Math.round(mockClients.reduce((acc, curr) => acc + curr.adherenceRate, 0) / mockClients.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Clients ({mockClients.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({mockClients.filter(c => c.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({mockClients.filter(c => c.status === 'inactive').length})</TabsTrigger>
          <TabsTrigger value="no_program">No Program ({mockClients.filter(c => c.programStatus === 'none').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockClients.map(renderClientCard)}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockClients.filter(client => client.status === 'active').map(renderClientCard)}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockClients.filter(client => client.status === 'inactive').map(renderClientCard)}
          </div>
        </TabsContent>

        <TabsContent value="no_program" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockClients.filter(client => client.programStatus === 'none').map(renderClientCard)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddClientDialog open={addClientOpen} onOpenChange={setAddClientOpen} />
      <AssignProgramDialog 
        open={assignProgramOpen} 
        onOpenChange={setAssignProgramOpen}
        selectedClient={selectedClientForAssign}
      />
    </div>
  );
}