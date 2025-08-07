'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Dumbbell,
  Target,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface ContentManagementProps {
  userRole: 'admin' | 'external_trainer';
  scopeInfo?: any;
}

const mockExercises = [
  {
    id: 1,
    name: 'Barbell Squat',
    category: 'Legs',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Squat Rack'],
    difficulty: 'Intermediate',
    instructions:
      'Stand with feet shoulder-width apart, lower into squat position...',
    videoUrl: 'https://example.com/squat-video',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    status: 'approved',
  },
  {
    id: 2,
    name: 'Push-up',
    category: 'Chest',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    instructions: 'Start in plank position, lower body to ground...',
    videoUrl: 'https://example.com/pushup-video',
    image:
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop',
    status: 'approved',
  },
];

const mockEquipment = [
  {
    id: 1,
    name: 'Barbell',
    category: 'Free Weights',
    description:
      'Standard Olympic barbell for various strength training exercises',
    image:
      'https://images.unsplash.com/photo-1517963879433-488ba2d69ceb?w=300&h=200&fit=crop',
    status: 'active',
    gyms: ['Downtown Fitness', 'Elite Gym'],
  },
  {
    id: 2,
    name: 'Treadmill',
    category: 'Cardio',
    description: 'Motorized treadmill for running and walking exercises',
    image:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=200&fit=crop',
    status: 'active',
    gyms: ['Downtown Fitness', 'City Sports Center'],
  },
];

const mockGyms = [
  {
    id: 1,
    name: 'Downtown Fitness',
    address: '123 Main St, Downtown',
    phone: '(555) 123-4567',
    email: 'info@downtownfitness.com',
    hours: '5AM - 11PM',
    amenities: ['Pool', 'Sauna', 'Group Classes'],
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
    status: 'active',
  },
  {
    id: 2,
    name: 'Elite Gym',
    address: '456 Oak Ave, Uptown',
    phone: '(555) 987-6543',
    email: 'contact@elitegym.com',
    hours: '24/7',
    amenities: ['Personal Training', 'Spa', 'Juice Bar'],
    image:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=200&fit=crop',
    status: 'active',
  },
];

const mockCategories = [
  { id: 1, name: 'Chest', type: 'muscle_group', exerciseCount: 15 },
  { id: 2, name: 'Legs', type: 'muscle_group', exerciseCount: 22 },
  { id: 3, name: 'Cardio', type: 'exercise_type', exerciseCount: 18 },
  { id: 4, name: 'Free Weights', type: 'equipment_category', itemCount: 12 },
];

export function ContentManagement({
  userRole,
  scopeInfo,
}: ContentManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('exercises');

  const isAdmin = userRole === 'admin';

  const ExerciseCard = ({ exercise }: { exercise: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base">{exercise.name}</CardTitle>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline">{exercise.category}</Badge>
              <Badge variant="secondary">{exercise.difficulty}</Badge>
            </div>
          </div>
          <Badge
            variant={exercise.status === 'approved' ? 'default' : 'secondary'}
          >
            {exercise.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Muscle Groups</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {exercise.muscleGroups.map((muscle: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {muscle}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Equipment</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {exercise.equipment.map((equip: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {equip}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          {isAdmin ? (
            <>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="flex-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              Suggest Change
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const EquipmentCard = ({ equipment }: { equipment: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
            <img
              src={equipment.image}
              alt={equipment.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base">{equipment.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {equipment.category}
            </p>
          </div>
          <Badge
            variant={equipment.status === 'active' ? 'default' : 'secondary'}
          >
            {equipment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{equipment.description}</p>
        <div>
          <p className="text-sm text-muted-foreground">Available at</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {equipment.gyms.map((gym: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {gym}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          {isAdmin ? (
            <>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="flex-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              Suggest Change
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const GymCard = ({ gym }: { gym: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
            <img
              src={gym.image}
              alt={gym.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base">{gym.name}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {gym.address}
            </p>
          </div>
          <Badge variant={gym.status === 'active' ? 'default' : 'secondary'}>
            {gym.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Hours</p>
            <p className="font-medium">{gym.hours}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Phone</p>
            <p className="font-medium">{gym.phone}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Amenities</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {gym.amenities.map((amenity: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          {isAdmin ? (
            <>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" className="flex-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              Suggest Change
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Content Management</h1>
          <p className="text-muted-foreground">
            {isAdmin
              ? 'Manage exercises, equipment, gyms, and categories'
              : 'View content and suggest changes'}
          </p>
          {!isAdmin && (
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              You have view-only access. Contact admin to modify content.
            </div>
          )}
        </div>
        {isAdmin && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New {activeTab.slice(0, -1)}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New {activeTab.slice(0, -1)}</DialogTitle>
                <DialogDescription>
                  Create a new {activeTab.slice(0, -1)} by filling out the form
                  below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input placeholder="Enter name..." />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chest">Chest</SelectItem>
                        <SelectItem value="legs">Legs</SelectItem>
                        <SelectItem value="back">Back</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Enter description..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Save {activeTab.slice(0, -1)}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            className="pl-9"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="exercises">
            Exercises ({mockExercises.length})
          </TabsTrigger>
          <TabsTrigger value="equipment">
            Equipment ({mockEquipment.length})
          </TabsTrigger>
          <TabsTrigger value="gyms">Gyms ({mockGyms.length})</TabsTrigger>
          <TabsTrigger value="categories">
            Categories ({mockCategories.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockExercises.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockEquipment.map(equipment => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gyms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGyms.map(gym => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCategories.map(category => (
              <Card
                key={category.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">
                        {category.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground capitalize">
                        {category.type.replace('_', ' ')}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {category.exerciseCount || category.itemCount} items
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {isAdmin ? (
                      <>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" className="flex-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Suggest Change
                      </Button>
                    )}
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
