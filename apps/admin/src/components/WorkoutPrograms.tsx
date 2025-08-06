import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Filter, Plus, Users, Clock, Target, Edit, Copy, Trash2 } from "lucide-react";

const mockPrograms = [
  {
    id: 1,
    name: "Full Body Transformation",
    description: "A comprehensive 12-week program designed to build strength and muscle while burning fat.",
    duration: "12 weeks",
    difficulty: "Intermediate",
    clientsAssigned: 8,
    workoutsPerWeek: 4,
    avgDuration: "60 min",
    category: "Strength & Conditioning",
    status: "active",
    created: "2024-01-10"
  },
  {
    id: 2,
    name: "Weight Loss Kickstart",
    description: "High-intensity program focused on burning calories and jumpstarting weight loss.",
    duration: "8 weeks",
    difficulty: "Beginner",
    clientsAssigned: 12,
    workoutsPerWeek: 5,
    avgDuration: "45 min",
    category: "Weight Loss",
    status: "active",
    created: "2024-02-15"
  },
  {
    id: 3,
    name: "Strength Building Basics",
    description: "Foundation program for building core strength and proper movement patterns.",
    duration: "10 weeks",
    difficulty: "Beginner",
    clientsAssigned: 6,
    workoutsPerWeek: 3,
    avgDuration: "50 min",
    category: "Strength Training",
    status: "active",
    created: "2024-01-25"
  },
  {
    id: 4,
    name: "Advanced HIIT Protocol",
    description: "High-intensity interval training for experienced athletes looking to improve performance.",
    duration: "6 weeks",
    difficulty: "Advanced",
    clientsAssigned: 4,
    workoutsPerWeek: 4,
    avgDuration: "40 min",
    category: "HIIT",
    status: "draft",
    created: "2024-03-01"
  }
];

const categories = ["All Categories", "Strength Training", "Weight Loss", "HIIT", "Cardio", "Flexibility"];

export function WorkoutPrograms() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Workout Programs</h1>
          <p className="text-muted-foreground">Create and manage workout programs for your clients</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Program
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input placeholder="Search programs..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Programs ({mockPrograms.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({mockPrograms.filter(p => p.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({mockPrograms.filter(p => p.status === 'draft').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge variant={program.status === 'active' ? 'default' : 'secondary'} className="mt-2">
                        {program.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{program.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{program.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Difficulty</p>
                      <p className="font-medium">{program.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{program.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Duration</p>
                      <p className="font-medium">{program.avgDuration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{program.clientsAssigned} clients</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>{program.workoutsPerWeek}/week</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockPrograms.filter(program => program.status === 'active').map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge variant="default" className="mt-2">Active</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{program.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{program.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Difficulty</p>
                      <p className="font-medium">{program.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{program.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Duration</p>
                      <p className="font-medium">{program.avgDuration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{program.clientsAssigned} clients</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>{program.workoutsPerWeek}/week</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {mockPrograms.filter(program => program.status === 'draft').map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">Draft</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{program.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{program.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Difficulty</p>
                      <p className="font-medium">{program.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{program.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Duration</p>
                      <p className="font-medium">{program.avgDuration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{program.clientsAssigned} clients</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>{program.workoutsPerWeek}/week</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}