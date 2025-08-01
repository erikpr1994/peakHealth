"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Plus,
  Search,
  Star,
  Users,
  Clock,
  Dumbbell,
  Edit2,
  Trash2,
  Eye,
  Lock,
  Globe,
  Heart,
  Navigation,
  Filter,
  Home,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Equipment {
  id: string;
  name: string;
  category:
    | "Cardio"
    | "Strength"
    | "Free Weights"
    | "Functional"
    | "Accessories";
  brand?: string;
  notes?: string;
}

interface Gym {
  id: string;
  name: string;
  address: string;
  type: "public" | "private";
  isJoined: boolean;
  isOwner?: boolean;
  isFavorited?: boolean;
  members?: number;
  rating?: number;
  hours?: string;
  description?: string;
  equipment: Equipment[];
  amenities: string[];
  photos?: string[];
  distance?: string; // Distance from user location
}

export default function Gyms() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  // Mock data for personal gyms (owned or private)
  const [personalGyms, setPersonalGyms] = useState<Gym[]>([
    {
      id: "1",
      name: "My Home Gym",
      address: "Home",
      type: "private",
      isJoined: true,
      isOwner: true,
      description:
        "Personal home gym setup in garage with carefully selected equipment for strength training and cardio.",
      equipment: [
        {
          id: "5",
          name: "Adjustable Dumbbells",
          category: "Free Weights",
          brand: "PowerBlocks",
        },
        { id: "6", name: "Pull-up Bar", category: "Functional" },
        { id: "7", name: "Yoga Mat", category: "Accessories" },
      ],
      amenities: ["Climate Control", "Music System"],
    },
    {
      id: "2",
      name: "Garage Workout Space",
      address: "456 Oak Street, San Francisco, CA",
      type: "private",
      isJoined: true,
      isOwner: true,
      description:
        "Converted garage with essential equipment for daily workouts.",
      equipment: [
        {
          id: "8",
          name: "Kettlebells",
          category: "Free Weights",
          brand: "Rogue",
        },
        { id: "9", name: "Resistance Bands", category: "Functional" },
      ],
      amenities: ["Ventilation", "Rubber Flooring"],
    },
  ]);

  // Mock data for favorited gyms
  const [favoritedGyms, setFavoritedGyms] = useState<Gym[]>([
    {
      id: "3",
      name: "Downtown Fitness Center",
      address: "123 Main St, San Francisco, CA",
      type: "public",
      isJoined: true,
      isFavorited: true,
      members: 1250,
      rating: 4.6,
      hours: "5:00 AM - 11:00 PM",
      distance: "0.3 miles away",
      description: "A fully equipped fitness center in the heart of downtown.",
      equipment: [
        {
          id: "1",
          name: "Bench Press",
          category: "Strength",
          brand: "Hammer Strength",
        },
        {
          id: "2",
          name: "Treadmill",
          category: "Cardio",
          brand: "Life Fitness",
        },
        { id: "3", name: "Squat Rack", category: "Strength", brand: "Rogue" },
        { id: "4", name: "Dumbbells (5-100 lbs)", category: "Free Weights" },
      ],
      amenities: [
        "Locker Rooms",
        "Showers",
        "WiFi",
        "Parking",
        "Personal Training",
      ],
    },
  ]);

  // Mock data for nearby public gyms
  const [nearbyGyms] = useState<Gym[]>([
    {
      id: "4",
      name: "Iron Temple Gym",
      address: "456 Oak Ave, San Francisco, CA",
      type: "public",
      isJoined: false,
      isFavorited: false,
      members: 850,
      rating: 4.8,
      hours: "24/7",
      distance: "0.8 miles away",
      description: "Hardcore powerlifting and bodybuilding gym.",
      equipment: [
        {
          id: "10",
          name: "Competition Bench",
          category: "Strength",
          brand: "Eleiko",
        },
        {
          id: "11",
          name: "Olympic Bars",
          category: "Free Weights",
          brand: "Eleiko",
        },
        {
          id: "12",
          name: "Leg Press",
          category: "Strength",
          brand: "Hammer Strength",
        },
      ],
      amenities: [
        "24/7 Access",
        "Powerlifting Platform",
        "Chalk",
        "Lifting Belts",
      ],
    },
    {
      id: "5",
      name: "Sunset Wellness Club",
      address: "789 Beach Blvd, San Francisco, CA",
      type: "public",
      isJoined: false,
      isFavorited: false,
      members: 2100,
      rating: 4.4,
      hours: "6:00 AM - 10:00 PM",
      distance: "1.2 miles away",
      description: "Premium wellness club with spa services.",
      equipment: [
        {
          id: "13",
          name: "Elliptical Machines",
          category: "Cardio",
          brand: "Precor",
        },
        {
          id: "14",
          name: "Cable Machines",
          category: "Strength",
          brand: "Life Fitness",
        },
        { id: "15", name: "Free Weight Area", category: "Free Weights" },
      ],
      amenities: [
        "Pool",
        "Spa",
        "Sauna",
        "Group Classes",
        "Nutrition Counseling",
      ],
    },
    {
      id: "6",
      name: "FitZone Express",
      address: "321 Mission St, San Francisco, CA",
      type: "public",
      isJoined: false,
      isFavorited: false,
      members: 680,
      rating: 4.2,
      hours: "5:30 AM - 11:00 PM",
      distance: "1.5 miles away",
      description:
        "24/7 access gym with modern equipment and flexible membership options.",
      equipment: [
        { id: "16", name: "Cardio Equipment", category: "Cardio" },
        { id: "17", name: "Strength Machines", category: "Strength" },
      ],
      amenities: ["24/7 Access", "Mobile App", "Group Classes"],
    },
  ]);

  const handleJoinGym = (gymId: string) => {
    // In a real app, this would make an API call
    console.log("Joining gym:", gymId);
  };

  const handleFavoriteToggle = (gymId: string) => {
    // In a real app, this would update the database
    setFavoritedGyms((prevFavorited) => {
      const gym = [...nearbyGyms, ...favoritedGyms].find((g) => g.id === gymId);
      if (!gym) return prevFavorited;

      const isCurrentlyFavorited = prevFavorited.some((g) => g.id === gymId);
      if (isCurrentlyFavorited) {
        return prevFavorited.filter((g) => g.id !== gymId);
      } else {
        return [...prevFavorited, { ...gym, isFavorited: true }];
      }
    });
  };

  const handleDeleteGym = (gymId: string) => {
    setPersonalGyms(personalGyms.filter((gym) => gym.id !== gymId));
  };

  const filteredNearbyGyms = nearbyGyms.filter((gym) => {
    const matchesSearch =
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "nearby" &&
        gym.distance &&
        parseFloat(gym.distance) <= 2) ||
      (locationFilter === "walking" &&
        gym.distance &&
        parseFloat(gym.distance) <= 1);
    return (
      matchesSearch &&
      matchesLocation &&
      !favoritedGyms.some((fav) => fav.id === gym.id)
    );
  });

  const GymCard = ({
    gym,
    showJoinButton = false,
    showActions = true,
  }: {
    gym: Gym;
    showJoinButton?: boolean;
    showActions?: boolean;
  }) => (
    <Card className="p-6 hover:shadow-md transition-shadow">
      {/* Header with equipment/amenities count and action buttons */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Dumbbell className="w-4 h-4" />
            <span>{gym.equipment.length} equipment</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{gym.amenities.length} amenities</span>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/gyms/${gym.id}`)}
              className="h-8 w-8 p-0"
            >
              <Eye className="w-4 h-4" />
            </Button>

            {gym.isOwner ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/gyms/${gym.id}/edit`)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Gym</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{gym.name}&quot;?
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteGym(gym.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              gym.type === "public" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFavoriteToggle(gym.id)}
                  className={`h-8 w-8 p-0 ${
                    gym.isFavorited
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      gym.isFavorited ? "fill-current" : ""
                    }`}
                  />
                </Button>
              )
            )}
          </div>
        )}
      </div>

      {/* Gym name and type */}
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{gym.name}</h3>
          {gym.type === "public" ? (
            <Badge
              variant="secondary"
              className="text-xs bg-blue-50 text-blue-600 border-blue-200"
            >
              <Globe className="w-3 h-3 mr-1" />
              Public
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="text-xs bg-gray-50 text-gray-600 border-gray-200"
            >
              <Lock className="w-3 h-3 mr-1" />
              Private
            </Badge>
          )}
          {gym.isOwner && (
            <Badge variant="outline" className="text-xs">
              Owner
            </Badge>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
        <MapPin className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{gym.address}</span>
        {gym.distance && (
          <span className="text-blue-600 ml-auto flex-shrink-0">
            • {gym.distance}
          </span>
        )}
      </div>

      {/* Description */}
      {gym.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {gym.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        {gym.rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{gym.rating}</span>
          </div>
        )}
        {gym.members && (
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{gym.members.toLocaleString()} members</span>
          </div>
        )}
        {gym.hours && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{gym.hours}</span>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-end">
        {showJoinButton && (
          <Button
            size="sm"
            onClick={() => handleJoinGym(gym.id)}
            className="bg-primary text-primary-foreground"
          >
            Join Gym
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gyms</h1>
          <p className="text-gray-500 mt-2">
            Discover and manage your workout locations
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => router.push("/gyms/create")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Create Private Gym
          </Button>
          <Button
            onClick={() => router.push("/gyms/suggest")}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            Suggest Public Gym
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search gyms by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="walking">Walking Distance</SelectItem>
              <SelectItem value="nearby">Nearby (2mi)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-12">
        {/* Personal Gyms Section */}
        {personalGyms.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Personal Gyms
              </h2>
              <Badge variant="secondary">{personalGyms.length}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalGyms.map((gym) => (
                <GymCard key={gym.id} gym={gym} />
              ))}
            </div>
          </section>
        )}

        {/* Favorited Gyms Section */}
        {favoritedGyms.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Favorited Gyms
              </h2>
              <Badge variant="secondary">{favoritedGyms.length}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritedGyms.map((gym) => (
                <GymCard key={gym.id} gym={gym} />
              ))}
            </div>
          </section>
        )}

        {/* Discover Nearby Gyms Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Navigation className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              Discover Nearby Gyms
            </h2>
            <Badge variant="secondary">{filteredNearbyGyms.length}</Badge>
          </div>

          {filteredNearbyGyms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNearbyGyms.map((gym) => (
                <GymCard key={gym.id} gym={gym} showJoinButton />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Navigation className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No gyms found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery
                  ? "Try adjusting your search criteria or location filter."
                  : "No gyms available in your selected area."}
              </p>
            </div>
          )}
        </section>

        {/* Empty State for New Users */}
        {personalGyms.length === 0 &&
          favoritedGyms.length === 0 &&
          filteredNearbyGyms.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Get Started with Gyms
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Create your first private gym or discover nearby fitness centers
                to start tracking your workouts.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={() => router.push("/gyms/create")}
                  variant="outline"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Create Private Gym
                </Button>
                <Button onClick={() => router.push("/gyms/suggest")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Suggest Public Gym
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
