import { useState } from "react";
import { ArrowLeft, Send, MapPin, Clock, AlertCircle } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

type Page =
  | "dashboard"
  | "exercises"
  | "exercise-detail"
  | "routines"
  | "routine-detail"
  | "edit-routine"
  | "create-routine"
  | "calendar"
  | "statistics"
  | "profile"
  | "gyms"
  | "suggest-gym"
  | "edit-gym"
  | "gym-detail"
  | "equipment"
  | "suggest-equipment"
  | "edit-equipment"
  | "equipment-detail"
  | "suggestions"
  | "suggest-exercise"
  | "account-settings"
  | "app-settings"
  | "workout-tracker";

interface SuggestGymProps {
  onNavigate: (page: Page, id?: string) => void;
}

interface GymSuggestion {
  name: string;
  type:
    | "commercial"
    | "boutique"
    | "home"
    | "outdoor"
    | "university"
    | "community";
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  website?: string;
  email?: string;
  description: string;
  amenities: string[];
  operatingHours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
  membershipTypes: string[];
  priceRange: "budget" | "mid-range" | "premium" | "luxury";
  equipment: string[];
  specialties: string[];
  reasonForSuggestion: string;
}

export default function SuggestGym({ onNavigate }: SuggestGymProps) {
  const [gymData, setGymData] = useState<GymSuggestion>({
    name: "",
    type: "commercial",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    website: "",
    email: "",
    description: "",
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
    membershipTypes: [],
    priceRange: "mid-range",
    equipment: [],
    specialties: [],
    reasonForSuggestion: "",
  });

  const gymTypes = [
    {
      id: "commercial",
      name: "Commercial Gym",
      description: "Large chain or franchise gym",
    },
    {
      id: "boutique",
      name: "Boutique Studio",
      description: "Specialized fitness studio",
    },
    { id: "home", name: "Home Gym", description: "Private home setup" },
    {
      id: "outdoor",
      name: "Outdoor Facility",
      description: "Parks, trails, outdoor equipment",
    },
    {
      id: "university",
      name: "University Gym",
      description: "College or university facility",
    },
    {
      id: "community",
      name: "Community Center",
      description: "Public recreation center",
    },
  ];

  const priceRanges = [
    {
      id: "budget",
      name: "Budget ($10-30/month)",
      description: "Basic facilities, good value",
    },
    {
      id: "mid-range",
      name: "Mid-Range ($30-80/month)",
      description: "Good facilities and amenities",
    },
    {
      id: "premium",
      name: "Premium ($80-150/month)",
      description: "High-end facilities and services",
    },
    {
      id: "luxury",
      name: "Luxury ($150+/month)",
      description: "Luxury amenities and exclusive services",
    },
  ];

  const commonAmenities = [
    "Parking",
    "Locker Rooms",
    "Showers",
    "Towel Service",
    "WiFi",
    "Personal Training",
    "Group Classes",
    "Sauna",
    "Steam Room",
    "Pool",
    "Hot Tub",
    "Massage Therapy",
    "Nutrition Counseling",
    "Childcare",
    "Café/Smoothie Bar",
    "24/7 Access",
    "Guest Passes",
    "Multiple Locations",
  ];

  const membershipOptions = [
    "Monthly",
    "Annual",
    "Day Pass",
    "Punch Card",
    "Student Discount",
    "Senior Discount",
    "Family Plans",
    "Corporate Rates",
    "Trial Membership",
  ];

  const specialtyAreas = [
    "CrossFit",
    "Yoga",
    "Pilates",
    "Martial Arts",
    "Boxing",
    "Rock Climbing",
    "Swimming",
    "Basketball",
    "Racquet Sports",
    "Group Fitness",
    "Powerlifting",
    "Olympic Lifting",
    "Functional Training",
    "Rehabilitation",
    "Sports Performance",
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

  const handleAmenityToggle = (amenity: string) => {
    setGymData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleMembershipToggle = (membership: string) => {
    setGymData((prev) => ({
      ...prev,
      membershipTypes: prev.membershipTypes.includes(membership)
        ? prev.membershipTypes.filter((m) => m !== membership)
        : [...prev.membershipTypes, membership],
    }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setGymData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleSubmitSuggestion = () => {
    // In a real app, this would submit to an API for professional review
    console.log("Submitting gym suggestion:", gymData);
    onNavigate("suggestions");
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
            <h1 className="text-3xl font-bold text-gray-800">Suggest a Gym</h1>
            <p className="text-gray-500 mt-2">
              Help the community by suggesting a new gym location
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onNavigate("gyms")}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitSuggestion}
            className="bg-primary text-primary-foreground"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Suggestion
          </Button>
        </div>
      </div>

      {/* Information Alert */}
      <Alert className="mb-8 border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Your suggestion will be reviewed by our team before being added to the
          database. Please provide accurate and detailed information to help
          with the review process.
        </AlertDescription>
      </Alert>

      <div className="max-w-4xl space-y-8">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="name">Gym Name *</Label>
              <Input
                id="name"
                value={gymData.name}
                onChange={(e) =>
                  setGymData({ ...gymData, name: e.target.value })
                }
                placeholder="e.g., Gold's Gym, CrossFit Downtown"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="type">Gym Type *</Label>
              <Select
                value={gymData.type}
                onValueChange={(value: GymSuggestion["type"]) =>
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

            <div>
              <Label htmlFor="priceRange">Price Range</Label>
              <Select
                value={gymData.priceRange}
                onValueChange={(value: GymSuggestion["priceRange"]) =>
                  setGymData({ ...gymData, priceRange: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      <div>
                        <div className="font-medium">{range.name}</div>
                        <div className="text-xs text-gray-500">
                          {range.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={gymData.description}
                onChange={(e) =>
                  setGymData({ ...gymData, description: e.target.value })
                }
                placeholder="Describe the gym, its atmosphere, target clientele, and what makes it unique..."
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={gymData.address}
                onChange={(e) =>
                  setGymData({ ...gymData, address: e.target.value })
                }
                placeholder="123 Fitness Street"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="city">City *</Label>
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
              <Label htmlFor="state">State/Province *</Label>
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

            <div>
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                value={gymData.zipCode}
                onChange={(e) =>
                  setGymData({ ...gymData, zipCode: e.target.value })
                }
                placeholder="94105"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Contact Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={gymData.phone}
                onChange={(e) =>
                  setGymData({ ...gymData, phone: e.target.value })
                }
                placeholder="(555) 123-4567"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={gymData.website}
                onChange={(e) =>
                  setGymData({ ...gymData, website: e.target.value })
                }
                placeholder="https://www.gymname.com"
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={gymData.email}
                onChange={(e) =>
                  setGymData({ ...gymData, email: e.target.value })
                }
                placeholder="info@gymname.com"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Operating Hours */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Operating Hours
          </h3>

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
                  <span className="text-gray-500 text-sm">Closed</span>
                )}
              </div>
            ))}
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

        {/* Membership & Pricing */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Membership Options</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {membershipOptions.map((membership) => (
              <div key={membership} className="flex items-center space-x-2">
                <Checkbox
                  id={membership}
                  checked={gymData.membershipTypes.includes(membership)}
                  onCheckedChange={() => handleMembershipToggle(membership)}
                />
                <Label htmlFor={membership} className="text-sm cursor-pointer">
                  {membership}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* Specialties */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">
            Specialties & Focus Areas
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {specialtyAreas.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={specialty}
                  checked={gymData.specialties.includes(specialty)}
                  onCheckedChange={() => handleSpecialtyToggle(specialty)}
                />
                <Label htmlFor={specialty} className="text-sm cursor-pointer">
                  {specialty}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* Reason for Suggestion */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Why suggest this gym?</h3>

          <Textarea
            value={gymData.reasonForSuggestion}
            onChange={(e) =>
              setGymData({ ...gymData, reasonForSuggestion: e.target.value })
            }
            placeholder="Help our team understand why this gym should be added. Is it popular in your area? Does it offer unique services? Would it benefit the community?"
            rows={4}
            className="mb-4"
          />

          <div className="text-sm text-gray-600">
            This information helps our review team prioritize and validate
            suggestions.
          </div>
        </Card>
      </div>
    </div>
  );
}
