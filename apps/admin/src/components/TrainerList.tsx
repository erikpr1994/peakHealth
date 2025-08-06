'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  UserCheck,
  Search,
  Plus,
  Filter,
  User,
  Calendar,
  TrendingUp,
  Users,
  Eye,
  DollarSign,
  Star,
  MapPin,
  Briefcase,
  Settings,
  ChevronRight,
} from 'lucide-react';

// Mock trainers data
const trainers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    specialization: 'Strength Training',
    certifications: ['NASM-CPT', 'CSCS'],
    experience: '5 years',
    location: 'New York, NY',
    rating: 4.8,
    clients: 24,
    monthlyRevenue: 4200,
    status: 'active',
    joinedDate: '2023-01-15',
    lastActive: '2024-12-22T10:30:00Z',
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    email: 'sarah.m@email.com',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b96b61d4?w=150&h=150&fit=crop&crop=face',
    specialization: 'Yoga & Pilates',
    certifications: ['RYT-500', 'PMA-CPT'],
    experience: '8 years',
    location: 'Los Angeles, CA',
    rating: 4.9,
    clients: 32,
    monthlyRevenue: 5800,
    status: 'active',
    joinedDate: '2022-08-20',
    lastActive: '2024-12-22T14:15:00Z',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.j@email.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    specialization: 'CrossFit',
    certifications: ['CF-L2', 'ACSM-CPT'],
    experience: '6 years',
    location: 'Austin, TX',
    rating: 4.7,
    clients: 18,
    monthlyRevenue: 3600,
    status: 'active',
    joinedDate: '2023-03-10',
    lastActive: '2024-12-21T16:45:00Z',
  },
  {
    id: 4,
    name: 'Emily Chen',
    email: 'emily.c@email.com',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    specialization: 'Nutrition Coaching',
    certifications: ['RD', 'NASM-CPT'],
    experience: '4 years',
    location: 'Seattle, WA',
    rating: 4.6,
    clients: 28,
    monthlyRevenue: 4800,
    status: 'active',
    joinedDate: '2023-06-05',
    lastActive: '2024-12-22T08:20:00Z',
  },
  {
    id: 5,
    name: 'David Rodriguez',
    email: 'david.r@email.com',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    specialization: 'HIIT Training',
    certifications: ['NASM-CPT'],
    experience: '3 years',
    location: 'Miami, FL',
    rating: 4.5,
    clients: 15,
    monthlyRevenue: 2800,
    status: 'pending',
    joinedDate: '2024-01-12',
    lastActive: '2024-12-20T12:30:00Z',
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    email: 'lisa.t@email.com',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    specialization: 'Rehabilitation',
    certifications: ['DPT', 'CSCS'],
    experience: '10 years',
    location: 'Chicago, IL',
    rating: 4.9,
    clients: 35,
    monthlyRevenue: 6200,
    status: 'active',
    joinedDate: '2022-04-18',
    lastActive: '2024-12-22T11:45:00Z',
  },
];

const specializations = [
  { value: 'all', label: 'All Specializations' },
  { value: 'strength', label: 'Strength Training' },
  { value: 'yoga', label: 'Yoga & Pilates' },
  { value: 'crossfit', label: 'CrossFit' },
  { value: 'nutrition', label: 'Nutrition Coaching' },
  { value: 'hiit', label: 'HIIT Training' },
  { value: 'rehab', label: 'Rehabilitation' },
];

const statuses = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active', color: 'default' },
  { value: 'pending', label: 'Pending Review', color: 'secondary' },
  { value: 'suspended', label: 'Suspended', color: 'destructive' },
];

interface TrainerListProps {
  scopeInfo: any;
  onViewTrainer: (trainerId: number) => void;
}

const getStatusColor = (status: string) => {
  const statusObj = statuses.find(s => s.value === status);
  return statusObj?.color || 'outline';
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const renderStars = (rating: number) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`h-3 w-3 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">{rating}</span>
    </div>
  );
};

export function TrainerList({ scopeInfo, onViewTrainer }: TrainerListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization =
      selectedSpecialization === 'all' ||
      trainer.specialization.toLowerCase().includes(selectedSpecialization);
    const matchesStatus =
      selectedStatus === 'all' || trainer.status === selectedStatus;
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const totalRevenue = trainers.reduce(
    (sum, trainer) => sum + trainer.monthlyRevenue,
    0
  );
  const totalClients = trainers.reduce(
    (sum, trainer) => sum + trainer.clients,
    0
  );
  const averageRating =
    trainers.reduce((sum, trainer) => sum + trainer.rating, 0) /
    trainers.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Badge variant={scopeInfo.color}>
            <Settings className="h-3 w-3 mr-1" />
            {scopeInfo.label}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <h1>Trainer Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Trainer
          </Button>
        </div>
      </div>

      <div>
        <p className="text-muted-foreground">
          Manage trainer profiles, monitor performance, and oversee service
          offerings across your platform.
        </p>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Trainers</p>
                <p className="text-2xl font-semibold">{trainers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-semibold">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-semibold">{totalClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-semibold">
                  {averageRating.toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search trainers, specializations, or locations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={selectedSpecialization}
          onValueChange={setSelectedSpecialization}
        >
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {specializations.map(specialization => (
              <SelectItem
                key={specialization.value}
                value={specialization.value}
              >
                {specialization.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map(trainer => (
          <Card key={trainer.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={trainer.avatar} alt={trainer.name} />
                    <AvatarFallback className="text-sm">
                      {trainer.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{trainer.name}</h3>
                      <Badge
                        variant={getStatusColor(trainer.status) as any}
                        className="text-xs"
                      >
                        {trainer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {trainer.email}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {trainer.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {trainer.specialization}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {trainer.certifications.map(cert => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Rating</p>
                  {renderStars(trainer.rating)}
                </div>
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium">{trainer.experience}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Clients</p>
                  <p className="font-medium">{trainer.clients}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Revenue</p>
                  <p className="font-medium">
                    {formatCurrency(trainer.monthlyRevenue)}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>Joined {formatDate(trainer.joinedDate)}</span>
                  <span>
                    Last active:{' '}
                    {new Date(trainer.lastActive).toLocaleDateString()}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onViewTrainer(trainer.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTrainers.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3>No trainers found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search criteria or add a new trainer.
          </p>
        </div>
      )}
    </div>
  );
}
