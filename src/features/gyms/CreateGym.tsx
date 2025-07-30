import { useState } from "react";
import {
  ArrowLeft,
  Save,
  MapPin,
  Clock,
  Plus,
  X,
  Home,
  Dumbbell,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { Page } from "@/types/app";

interface CreateGymProps {
  onNavigate: (page: Page, id?: string) => void;
}

interface PrivateGym {
  name: string;
  type: "home" | "garage" | "basement" | "spare_room" | "outdoor" | "other";
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description: string;
  selectedEquipment: string[];
  customEquipment: string[];
  amenities: string[];
  operatingHours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
}

export default function CreateGym({ onNavigate }: CreateGymProps) {
  const [gymData, setGymData] = useState<PrivateGym>({
    name: "",
    type: "home",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    description: "",
    selectedEquipment: [],
    customEquipment: [],
    amenities: [],
    operatingHours: {
      monday: { open: "06:00", close: "22:00", closed: false },
      tuesday: { open: "06:00", close: "22:00", closed: false },
      wednesday: { open: "06:00", close: "22:00", closed: false },
      thursday: { open: "06:00", close: "22:00", closed: false },
      friday: { open: "06:00", close: "22:00", closed: false },
      saturday: { open: "08:00", close: "20:00", closed: false },
      sunday: { open: "08:00", close: "20:00", closed: false },
    },
  });

  const [newCustomEquipment, setNewCustomEquipment] = useState("");

  const gymTypes = [
    { id: "home", name: "Home Gym", description: "Main living space setup" },
    { id: "garage", name: "Garage Gym", description: "Converted garage space" },
    {
      id: "basement",
      name: "Basement Gym",
      description: "Basement workout area",
    },
    {
      id: "spare_room",
      name: "Spare Room",
      description: "Dedicated room for workouts",
    },
    {
      id: "outdoor",
      name: "Outdoor Space",
      description: "Backyard or patio setup",
    },
    { id: "other", name: "Other", description: "Custom setup location" },
  ];

  const availableEquipment = [
    // Cardio
    "Treadmill",
    "Stationary Bike",
    "Elliptical",
    "Rowing Machine",
    "Jump Rope",
    // Strength
    "Adjustable Dumbbells",
    "Fixed Dumbbells",
    "Barbell",
    "Weight Plates",
    "Kettlebells",
    "Resistance Bands",
    "Pull-up Bar",
    "Dip Station",
    "Power Rack",
    "Squat Rack",
    "Bench (Flat)",
    "Bench (Adjustable)",
    "Cable Machine",
    // Functional
    "Yoga Mat",
    "Foam Roller",
    "Medicine Ball",
    "Swiss Ball",
    "TRX Suspension Trainer",
    "Parallette Bars",
    "Plyo Box",
    "Battle Ropes",
    "Landmine",
    // Accessories
    "Mirrors",
    "Storage Rack",
    "Weight Tree",
    "Resistance Band Anchor",
  ];

  const commonAmenities = [
    "Climate Control",
    "Ventilation",
    "Music System",
    "TV/Entertainment",
    "Rubber Flooring",
    "Carpet",
    "Mirrors",
    "Storage Space",
    "Water Access",
    "Natural Light",
    "Artificial Lighting",
    "Safety Equipment",
  ];

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const handleEquipmentToggle = (equipment: string) => {
    setGymData((prev) => ({
      ...prev,
      selectedEquipment: prev.selectedEquipment.includes(equipment)
        ? prev.selectedEquipment.filter((e) => e !== equipment)
        : [...prev.selectedEquipment, equipment],
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setGymData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleAddCustomEquipment = () => {
    if (
      newCustomEquipment &&
      !gymData.customEquipment.includes(newCustomEquipment)
    ) {
      setGymData((prev) => ({
        ...prev,
        customEquipment: [...prev.customEquipment, newCustomEquipment],
      }));
      setNewCustomEquipment("");
    }
  };

  const handleRemoveCustomEquipment = (equipment: string) => {
    setGymData((prev) => ({
      ...prev,
      customEquipment: prev.customEquipment.filter((e) => e !== equipment),
    }));
  };

  const handleCreateGym = () => {
    // In a real app, this would save to the database immediately
    console.log("Creating private gym:", gymData);
    onNavigate("gyms");
  };

  const updateOperatingHours = (
    day: string,
    field: "open" | "close" | "closed",
    value: string | boolean
  ) => {
    setGymData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate("gyms")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create Private Gym
            </h1>
            <p className="text-gray-500 mt-2">
              Set up your personal workout space
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onNavigate("gyms")}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateGym}
            className="bg-primary text-primary-foreground"
          >
            <Save className="w-4 h-4 mr-2" />
            Create Gym
          </Button>
        </div>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Home className="w-5 h-5" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="name">Gym Name *</Label>
              <Input
                id="name"
                value={gymData.name}
                onChange={(e) =>
                  setGymData({ ...gymData, name: e.target.value })
                }
                placeholder="e.g., My Home Gym, Garage Workout Space"
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="type">Gym Type *</Label>
              <Select
                value={gymData.type}
                onValueChange={(value: any) =>
                  setGymData({ ...gymData, type: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gymTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-xs text-gray-500">
                          {type.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={gymData.description}
                onChange={(e) =>
                  setGymData({ ...gymData, description: e.target.value })
                }
                placeholder="Describe your gym setup, atmosphere, and what makes it special for your workouts..."
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        </Card>

        {/* Location (Optional) */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location (Optional)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Add location information if you want to track your workouts by
            location or share with family members.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={gymData.address}
                onChange={(e) =>
                  setGymData({ ...gymData, address: e.target.value })
                }
                placeholder="123 Fitness Street (optional)"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={gymData.city}
                onChange={(e) =>
                  setGymData({ ...gymData, city: e.target.value })
                }
                placeholder="San Francisco"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={gymData.state}
                onChange={(e) =>
                  setGymData({ ...gymData, state: e.target.value })
                }
                placeholder="CA"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Equipment Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            Equipment
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Select the equipment available in your gym to get accurate workout
            recommendations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {availableEquipment.map((equipment) => (
              <div key={equipment} className="flex items-center space-x-2">
                <Checkbox
                  id={equipment}
                  checked={gymData.selectedEquipment.includes(equipment)}
                  onCheckedChange={() => handleEquipmentToggle(equipment)}
                />
                <Label htmlFor={equipment} className="text-sm cursor-pointer">
                  {equipment}
                </Label>
              </div>
            ))}
          </div>

          {/* Custom Equipment */}
          <div>
            <Label htmlFor="customEquipment">Add Custom Equipment</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="customEquipment"
                value={newCustomEquipment}
                onChange={(e) => setNewCustomEquipment(e.target.value)}
                placeholder="Enter custom equipment name"
                onKeyPress={(e) =>
                  e.key === "Enter" && handleAddCustomEquipment()
                }
              />
              <Button type="button" onClick={handleAddCustomEquipment}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {gymData.customEquipment.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {gymData.customEquipment.map((equipment) => (
                  <Badge
                    key={equipment}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1"
                  >
                    {equipment}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCustomEquipment(equipment)}
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Amenities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Amenities & Features</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {commonAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={gymData.amenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
                />
                <Label htmlFor={amenity} className="text-sm cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* Operating Hours */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Available Hours
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Set when your gym space is typically available for workouts.
          </p>

          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium capitalize">{day}</div>
                <Checkbox
                  checked={!gymData.operatingHours[day].closed}
                  onCheckedChange={(checked) =>
                    updateOperatingHours(day, "closed", !checked)
                  }
                />
                {!gymData.operatingHours[day].closed ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={gymData.operatingHours[day].open}
                      onChange={(e) =>
                        updateOperatingHours(day, "open", e.target.value)
                      }
                      className="w-24"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="time"
                      value={gymData.operatingHours[day].close}
                      onChange={(e) =>
                        updateOperatingHours(day, "close", e.target.value)
                      }
                      className="w-24"
                    />
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">Not available</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
