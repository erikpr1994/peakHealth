import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  MapPin,
  Plus,
  Search,
  Check,
  Trash2,
  Dumbbell,
  Heart,
  Trophy,
  Settings,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { Page } from "@/types/app";

interface EditGymProps {
  onNavigate: (page: Page, id?: string) => void;
  gymId: string;
}

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
  description?: string;
  isPopular?: boolean;
}

export default function EditGym({ onNavigate, gymId }: EditGymProps) {
  const [gymData, setGymData] = useState({
    name: "",
    address: "",
    type: "private" as "public" | "private",
    description: "",
    hours: "",
    website: "",
    phone: "",
  });

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [activeEquipmentCategory, setActiveEquipmentCategory] = useState("all");

  // Load existing gym data
  useEffect(() => {
    // Mock data - in a real app, this would be fetched based on gymId
    const existingGym = {
      name: "My Home Gym",
      address: "Home",
      type: "private" as "public" | "private",
      description:
        "Personal home gym setup in garage with carefully selected equipment for strength training and cardio.",
      hours: "",
      website: "",
      phone: "",
      equipment: [
        {
          id: "5",
          name: "Adjustable Dumbbells",
          category: "Free Weights" as const,
          brand: "PowerBlocks",
        },
        { id: "6", name: "Pull-up Bar", category: "Functional" as const },
        { id: "7", name: "Yoga Mat", category: "Accessories" as const },
      ],
      amenities: ["Climate Control", "Music System"],
    };

    setGymData({
      name: existingGym.name,
      address: existingGym.address,
      type: existingGym.type,
      description: existingGym.description,
      hours: existingGym.hours,
      website: existingGym.website,
      phone: existingGym.phone,
    });
    setSelectedEquipment(existingGym.equipment);
    setSelectedAmenities(existingGym.amenities);
  }, [gymId]);

  // Equipment database (same as CreateGym)
  const equipmentDatabase: Equipment[] = [
    // Cardio
    {
      id: "1",
      name: "Treadmill",
      category: "Cardio",
      description: "Motorized running belt",
      isPopular: true,
    },
    {
      id: "2",
      name: "Elliptical Machine",
      category: "Cardio",
      description: "Low-impact cardio machine",
    },
    {
      id: "3",
      name: "Stationary Bike",
      category: "Cardio",
      description: "Upright or recumbent bike",
      isPopular: true,
    },
    {
      id: "4",
      name: "Rowing Machine",
      category: "Cardio",
      description: "Full-body cardio workout",
    },
    {
      id: "5",
      name: "StairMaster",
      category: "Cardio",
      description: "Stair climbing machine",
    },
    {
      id: "6",
      name: "Arc Trainer",
      category: "Cardio",
      description: "Adaptive motion trainer",
    },

    // Strength
    {
      id: "10",
      name: "Bench Press",
      category: "Strength",
      description: "Flat/incline/decline bench",
      isPopular: true,
    },
    {
      id: "11",
      name: "Squat Rack",
      category: "Strength",
      description: "Power rack with safety bars",
      isPopular: true,
    },
    {
      id: "12",
      name: "Leg Press",
      category: "Strength",
      description: "45-degree leg press machine",
    },
    {
      id: "13",
      name: "Lat Pulldown",
      category: "Strength",
      description: "Cable lat pulldown machine",
    },
    {
      id: "14",
      name: "Cable Machine",
      category: "Strength",
      description: "Adjustable cable system",
      isPopular: true,
    },
    {
      id: "15",
      name: "Smith Machine",
      category: "Strength",
      description: "Guided barbell system",
    },
    {
      id: "16",
      name: "Leg Curl Machine",
      category: "Strength",
      description: "Seated or lying leg curls",
    },
    {
      id: "17",
      name: "Chest Press Machine",
      category: "Strength",
      description: "Seated chest press",
    },
    {
      id: "18",
      name: "Shoulder Press Machine",
      category: "Strength",
      description: "Seated shoulder press",
    },

    // Free Weights
    {
      id: "20",
      name: "Dumbbells (5-100 lbs)",
      category: "Free Weights",
      description: "Complete dumbbell set",
      isPopular: true,
    },
    {
      id: "21",
      name: "Adjustable Dumbbells",
      category: "Free Weights",
      description: "Space-saving adjustable weights",
    },
    {
      id: "22",
      name: "Olympic Barbells",
      category: "Free Weights",
      description: "45lb Olympic barbells",
      isPopular: true,
    },
    {
      id: "23",
      name: "Weight Plates",
      category: "Free Weights",
      description: "Olympic weight plates set",
    },
    {
      id: "24",
      name: "EZ Curl Bar",
      category: "Free Weights",
      description: "Angled barbell for curls",
    },
    {
      id: "25",
      name: "Kettlebells",
      category: "Free Weights",
      description: "Various weight kettlebells",
      isPopular: true,
    },
    {
      id: "26",
      name: "Medicine Balls",
      category: "Free Weights",
      description: "Weighted medicine balls",
    },

    // Functional
    {
      id: "30",
      name: "Pull-up Bar",
      category: "Functional",
      description: "Chin-up/pull-up station",
      isPopular: true,
    },
    {
      id: "31",
      name: "Dip Station",
      category: "Functional",
      description: "Parallel bars for dips",
    },
    {
      id: "32",
      name: "Battle Ropes",
      category: "Functional",
      description: "Heavy training ropes",
    },
    {
      id: "33",
      name: "TRX Suspension Trainer",
      category: "Functional",
      description: "Bodyweight training system",
    },
    {
      id: "34",
      name: "Plyo Boxes",
      category: "Functional",
      description: "Jump training boxes",
    },
    {
      id: "35",
      name: "Agility Ladder",
      category: "Functional",
      description: "Speed and agility training",
    },
    {
      id: "36",
      name: "Resistance Bands",
      category: "Functional",
      description: "Various resistance levels",
    },

    // Accessories
    {
      id: "40",
      name: "Yoga Mats",
      category: "Accessories",
      description: "Non-slip exercise mats",
      isPopular: true,
    },
    {
      id: "41",
      name: "Foam Rollers",
      category: "Accessories",
      description: "Muscle recovery rollers",
    },
    {
      id: "42",
      name: "Exercise Balls",
      category: "Accessories",
      description: "Stability/Swiss balls",
    },
    {
      id: "43",
      name: "Weight Belts",
      category: "Accessories",
      description: "Lifting support belts",
    },
    {
      id: "44",
      name: "Lifting Straps",
      category: "Accessories",
      description: "Grip assistance straps",
    },
    {
      id: "45",
      name: "Mirrors",
      category: "Accessories",
      description: "Wall-mounted gym mirrors",
    },
    {
      id: "46",
      name: "Sound System",
      category: "Accessories",
      description: "Audio equipment",
    },
  ];

  const availableAmenities = [
    "Locker Rooms",
    "Showers",
    "Parking",
    "WiFi",
    "Air Conditioning",
    "Personal Training",
    "Group Classes",
    "Sauna",
    "Steam Room",
    "Pool",
    "Juice Bar",
    "Towel Service",
    "24/7 Access",
    "Security System",
    "Childcare",
    "Massage Therapy",
    "Nutrition Counseling",
  ];

  const categories = [
    { id: "all", name: "All Equipment", icon: Dumbbell },
    { id: "Cardio", name: "Cardio", icon: Heart },
    { id: "Strength", name: "Strength", icon: Trophy },
    { id: "Free Weights", name: "Free Weights", icon: Dumbbell },
    { id: "Functional", name: "Functional", icon: Target },
    { id: "Accessories", name: "Accessories", icon: Settings },
  ];

  const filteredEquipment = equipmentDatabase.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(equipmentSearch.toLowerCase()) ||
      (equipment.description &&
        equipment.description
          .toLowerCase()
          .includes(equipmentSearch.toLowerCase()));
    const matchesCategory =
      activeEquipmentCategory === "all" ||
      equipment.category === activeEquipmentCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEquipmentToggle = (equipment: Equipment) => {
    const isSelected = selectedEquipment.some((eq) => eq.id === equipment.id);
    if (isSelected) {
      setSelectedEquipment(
        selectedEquipment.filter((eq) => eq.id !== equipment.id)
      );
    } else {
      setSelectedEquipment([...selectedEquipment, equipment]);
    }
  };

  const handleEquipmentRemove = (equipmentId: string) => {
    setSelectedEquipment(
      selectedEquipment.filter((eq) => eq.id !== equipmentId)
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSave = () => {
    // In a real app, this would update the database
    console.log("Updating gym:", {
      id: gymId,
      ...gymData,
      equipment: selectedEquipment,
      amenities: selectedAmenities,
    });
    onNavigate("gym-detail", gymId);
  };

  const handleDelete = () => {
    // In a real app, this would delete from database
    console.log("Deleting gym:", gymId);
    onNavigate("gyms");
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.id === categoryName);
    return category ? category.icon : Dumbbell;
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate("gym-detail", gymId)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Gym</h1>
            <p className="text-gray-500 mt-2">
              Update your gym information and equipment
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Gym
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Gym</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this gym? This action cannot
                  be undone and will remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Gym
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="outline"
            onClick={() => onNavigate("gym-detail", gymId)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="gymName">Gym Name *</Label>
              <Input
                id="gymName"
                value={gymData.name}
                onChange={(e) =>
                  setGymData({ ...gymData, name: e.target.value })
                }
                placeholder="e.g., My Home Gym, Downtown Fitness"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="gymType">Type *</Label>
              <Select
                value={gymData.type}
                onValueChange={(value: "public" | "private") =>
                  setGymData({ ...gymData, type: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">
                    Private (Only you can see)
                  </SelectItem>
                  <SelectItem value="public">
                    Public (Others can join)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Address/Location *</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="address"
                  value={gymData.address}
                  onChange={(e) =>
                    setGymData({ ...gymData, address: e.target.value })
                  }
                  placeholder="e.g., Home, 123 Main St, San Francisco, CA"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={gymData.description}
                onChange={(e) =>
                  setGymData({ ...gymData, description: e.target.value })
                }
                placeholder="Describe your gym and what makes it special..."
                className="mt-2"
                rows={3}
              />
            </div>

            {gymData.type === "public" && (
              <>
                <div>
                  <Label htmlFor="hours">Operating Hours</Label>
                  <Input
                    id="hours"
                    value={gymData.hours}
                    onChange={(e) =>
                      setGymData({ ...gymData, hours: e.target.value })
                    }
                    placeholder="e.g., 6:00 AM - 10:00 PM, 24/7"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={gymData.phone}
                    onChange={(e) =>
                      setGymData({ ...gymData, phone: e.target.value })
                    }
                    placeholder="e.g., (555) 123-4567"
                    className="mt-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={gymData.website}
                    onChange={(e) =>
                      setGymData({ ...gymData, website: e.target.value })
                    }
                    placeholder="e.g., https://mygym.com"
                    className="mt-2"
                  />
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Equipment Management */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Equipment</h3>
              <p className="text-sm text-gray-500">
                Manage the equipment available at your gym
              </p>
            </div>
            <Dialog
              open={isEquipmentModalOpen}
              onOpenChange={setIsEquipmentModalOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Equipment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                  <DialogTitle>Add Equipment</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                  {/* Search */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search equipment..."
                        value={equipmentSearch}
                        onChange={(e) => setEquipmentSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <Tabs
                    value={activeEquipmentCategory}
                    onValueChange={setActiveEquipmentCategory}
                    className="space-y-4"
                  >
                    <TabsList className="grid grid-cols-6 w-full">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <TabsTrigger
                            key={category.id}
                            value={category.id}
                            className="flex items-center gap-1"
                          >
                            <Icon className="w-3 h-3" />
                            <span className="hidden sm:inline">
                              {category.name}
                            </span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredEquipment.map((equipment) => {
                          const isSelected = selectedEquipment.some(
                            (eq) => eq.id === equipment.id
                          );
                          const Icon = getCategoryIcon(equipment.category);

                          return (
                            <div
                              key={equipment.id}
                              onClick={() => handleEquipmentToggle(equipment)}
                              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-md ${
                                    isSelected ? "bg-primary/10" : "bg-gray-100"
                                  }`}
                                >
                                  <Icon
                                    className={`w-4 h-4 ${
                                      isSelected
                                        ? "text-primary"
                                        : "text-gray-600"
                                    }`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <div className="font-medium text-sm">
                                      {equipment.name}
                                    </div>
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-primary" />
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {equipment.description}
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="text-xs mt-1"
                                  >
                                    {equipment.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </TabsContent>

                    {/* Category-specific tabs */}
                    {categories.slice(1).map((category) => (
                      <TabsContent key={category.id} value={category.id}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {filteredEquipment
                            .filter((eq) => eq.category === category.id)
                            .map((equipment) => {
                              const isSelected = selectedEquipment.some(
                                (eq) => eq.id === equipment.id
                              );
                              const Icon = category.icon;

                              return (
                                <div
                                  key={equipment.id}
                                  onClick={() =>
                                    handleEquipmentToggle(equipment)
                                  }
                                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                    isSelected
                                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`p-2 rounded-md ${
                                        isSelected
                                          ? "bg-primary/10"
                                          : "bg-gray-100"
                                      }`}
                                    >
                                      <Icon
                                        className={`w-4 h-4 ${
                                          isSelected
                                            ? "text-primary"
                                            : "text-gray-600"
                                        }`}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <div className="font-medium text-sm">
                                          {equipment.name}
                                        </div>
                                        {isSelected && (
                                          <Check className="w-4 h-4 text-primary" />
                                        )}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {equipment.description}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    {selectedEquipment.length} equipment selected
                  </div>
                  <Button onClick={() => setIsEquipmentModalOpen(false)}>
                    Done
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Current Equipment */}
          {selectedEquipment.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedEquipment.map((equipment) => (
                  <div
                    key={equipment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-sm">
                        {equipment.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {equipment.category}
                        </Badge>
                        {equipment.brand && <span>• {equipment.brand}</span>}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEquipmentRemove(equipment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                {selectedEquipment.length} equipment configured
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Dumbbell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No equipment configured</p>
              <p className="text-sm">
                Click &quot;Add Equipment&quot; to get started
              </p>
            </div>
          )}
        </Card>

        {/* Amenities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
                />
                <Label htmlFor={amenity} className="text-sm cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
