import {
  ArrowLeft,
  Edit2,
  Star,
  Users,
  Clock,
  MapPin,
  Phone,
  Globe,
  Dumbbell,
  Heart,
  Trophy,
  Target,
  Settings,
  Calendar,
  Share2,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Page } from '@/types/app';

interface GymDetailProps {
  onNavigate: (page: Page, id?: string) => void;
  gymId: string;
}

interface Equipment {
  id: string;
  name: string;
  category:
    | 'Cardio'
    | 'Strength'
    | 'Free Weights'
    | 'Functional'
    | 'Accessories';
  brand?: string;
  notes?: string;
  description?: string;
}

interface Gym {
  id: string;
  name: string;
  address: string;
  type: 'public' | 'private';
  isJoined: boolean;
  isOwner?: boolean;
  members?: number;
  rating?: number;
  hours?: string;
  description?: string;
  equipment: Equipment[];
  amenities: string[];
  photos?: string[];
  phone?: string;
  website?: string;
  reviews?: {
    id: string;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function GymDetail({ onNavigate, gymId }: GymDetailProps) {
  // Mock data - in a real app, this would be fetched based on gymId
  const gym: Gym = {
    id: gymId,
    name: 'Downtown Fitness Center',
    address: '123 Main St, San Francisco, CA 94105',
    type: 'public',
    isJoined: true,
    isOwner: false,
    members: 1250,
    rating: 4.6,
    hours: '5:00 AM - 11:00 PM',
    phone: '(555) 123-4567',
    website: 'https://downtownfitness.com',
    description:
      'A state-of-the-art fitness center in the heart of downtown San Francisco. We offer top-quality equipment, expert personal training, and a welcoming community atmosphere. Perfect for professionals looking to maintain their fitness routine.',
    equipment: [
      {
        id: '1',
        name: 'Treadmill',
        category: 'Cardio',
        brand: 'Life Fitness',
        description: 'Commercial-grade treadmills with entertainment systems',
      },
      {
        id: '2',
        name: 'Elliptical Machine',
        category: 'Cardio',
        brand: 'Precor',
        description: 'Low-impact cardio with upper body engagement',
      },
      {
        id: '3',
        name: 'Bench Press',
        category: 'Strength',
        brand: 'Hammer Strength',
        description: 'Olympic bench press with safety spotters',
      },
      {
        id: '4',
        name: 'Squat Rack',
        category: 'Strength',
        brand: 'Rogue',
        description: 'Power rack with pull-up bar and safety bars',
      },
      {
        id: '5',
        name: 'Cable Machine',
        category: 'Strength',
        brand: 'Life Fitness',
        description: 'Dual adjustable cable system',
      },
      {
        id: '6',
        name: 'Dumbbells (5-100 lbs)',
        category: 'Free Weights',
        brand: 'Hammer Strength',
        description: 'Complete set of rubber-coated dumbbells',
      },
      {
        id: '7',
        name: 'Olympic Barbells',
        category: 'Free Weights',
        brand: 'Rogue',
        description: '45lb Olympic barbells with knurled grips',
      },
      {
        id: '8',
        name: 'Pull-up Bar',
        category: 'Functional',
        description: 'Multi-grip pull-up station',
      },
      {
        id: '9',
        name: 'TRX Suspension Trainer',
        category: 'Functional',
        brand: 'TRX',
        description: 'Suspension training system',
      },
      {
        id: '10',
        name: 'Yoga Mats',
        category: 'Accessories',
        description: 'Premium non-slip yoga mats',
      },
    ],
    amenities: [
      'Locker Rooms',
      'Showers',
      'WiFi',
      'Parking',
      'Personal Training',
      'Group Classes',
      'Towel Service',
    ],
    reviews: [
      {
        id: '1',
        user: 'Sarah Chen',
        avatar: '/api/placeholder/40/40',
        rating: 5,
        comment:
          'Amazing gym with excellent equipment. The staff is super friendly and helpful!',
        date: '2 days ago',
      },
      {
        id: '2',
        user: 'Mike Rodriguez',
        avatar: '/api/placeholder/40/40',
        rating: 4,
        comment:
          'Great location and facilities. Can get crowded during peak hours but overall very satisfied.',
        date: '1 week ago',
      },
      {
        id: '3',
        user: 'Jennifer Kim',
        avatar: '/api/placeholder/40/40',
        rating: 5,
        comment:
          'Love the variety of classes and the modern equipment. Worth every penny!',
        date: '2 weeks ago',
      },
    ],
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      Cardio: Heart,
      Strength: Trophy,
      'Free Weights': Dumbbell,
      Functional: Target,
      Accessories: Settings,
    };
    return icons[category as keyof typeof icons] || Dumbbell;
  };

  const groupedEquipment = gym.equipment.reduce(
    (acc, equipment) => {
      if (!acc[equipment.category]) {
        acc[equipment.category] = [];
      }
      acc[equipment.category].push(equipment);
      return acc;
    },
    {} as Record<string, Equipment[]>
  );

  const categories = Object.keys(groupedEquipment);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate('gyms')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{gym.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{gym.address}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          {gym.isOwner && (
            <Button onClick={() => onNavigate('edit-gym', gym.id)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Gym
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Overview</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {gym.rating && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xl font-semibold">{gym.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
              )}

              {gym.members && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-xl font-semibold">
                      {gym.members.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">Members</div>
                </div>
              )}

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Dumbbell className="w-5 h-5 text-green-500" />
                  <span className="text-xl font-semibold">
                    {gym.equipment.length}
                  </span>
                </div>
                <div className="text-sm text-gray-500">Equipment</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Settings className="w-5 h-5 text-purple-500" />
                  <span className="text-xl font-semibold">
                    {gym.amenities.length}
                  </span>
                </div>
                <div className="text-sm text-gray-500">Amenities</div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{gym.description}</p>
          </Card>

          {/* Equipment & Amenities Tabs */}
          <Card className="p-6">
            <Tabs defaultValue="equipment" className="space-y-4">
              <TabsList>
                <TabsTrigger value="equipment">
                  Equipment ({gym.equipment.length})
                </TabsTrigger>
                <TabsTrigger value="amenities">
                  Amenities ({gym.amenities.length})
                </TabsTrigger>
                {gym.reviews && (
                  <TabsTrigger value="reviews">
                    Reviews ({gym.reviews.length})
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="equipment" className="space-y-6">
                {categories.map(category => {
                  const Icon = getCategoryIcon(category);
                  return (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900">
                          {category}
                        </h4>
                        <Badge variant="outline" className="ml-2">
                          {groupedEquipment[category].length}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {groupedEquipment[category].map(equipment => (
                          <div
                            key={equipment.id}
                            className="p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="font-medium text-gray-900 mb-1">
                              {equipment.name}
                            </div>
                            {equipment.brand && (
                              <div className="text-sm text-gray-600 mb-1">
                                Brand: {equipment.brand}
                              </div>
                            )}
                            {equipment.description && (
                              <div className="text-sm text-gray-500">
                                {equipment.description}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="amenities">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gym.amenities.map(amenity => (
                    <div
                      key={amenity}
                      className="p-3 bg-gray-50 rounded-lg text-center"
                    >
                      <div className="font-medium text-gray-900">{amenity}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {gym.reviews && (
                <TabsContent value="reviews" className="space-y-4">
                  {gym.reviews.map(review => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.avatar} alt={review.user} />
                          <AvatarFallback>
                            {review.user
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-medium text-gray-900">
                              {review.user}
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.date}
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              )}
            </Tabs>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              {gym.hours && (
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">Hours</div>
                    <div className="text-sm text-gray-600">{gym.hours}</div>
                  </div>
                </div>
              )}

              {gym.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-sm text-gray-600">{gym.phone}</div>
                  </div>
                </div>
              )}

              {gym.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">Website</div>
                    <a
                      href={gym.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      {gym.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => onNavigate('create-routine')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Plan Workout Here
              </Button>

              <Button variant="outline" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>

              {gym.type === 'public' && !gym.isJoined && (
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Join Gym
                </Button>
              )}
            </div>
          </Card>

          {/* Equipment Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Equipment Summary</h3>
            <div className="space-y-3">
              {categories.map(category => {
                const Icon = getCategoryIcon(category);
                return (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{category}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {groupedEquipment[category].length}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
