"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Heart,
  Trophy,
  Target,
  Settings,
  Weight,
  Wrench,
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

interface EquipmentSpecs {
  weightRange?: { min: number; max: number; increment: number };
  resistanceType?:
    | "weight_stack"
    | "weight_plates"
    | "pneumatic"
    | "magnetic"
    | "hydraulic";
  conversionFactor?: number; // For weight conversions between equipment
  pulleyRatio?: number;
  leverageRatio?: number;
  resistanceCurve?: "linear" | "ascending" | "descending" | "bell_curve";
  availableWeights?: number[]; // For free weights
  notes?: string;
}

interface Equipment {
  id: string;
  name: string;
  brand: string;
  model: string;
  category:
    | "Cardio"
    | "Strength"
    | "Free Weights"
    | "Functional"
    | "Accessories";
  type: "custom" | "standard"; // custom = user created, standard = from database
  description?: string;
  imageUrl?: string;
  specs: EquipmentSpecs;
  isPopular?: boolean;
  createdBy?: string; // user ID
  usageCount?: number; // how many gyms use this equipment
}

export default function EquipmentPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock equipment data with detailed specifications
  const [equipment, setEquipment] = useState<Equipment[]>([
    // Standard Database Equipment
    {
      id: "1",
      name: "Olympic Barbell",
      brand: "Rogue",
      model: "Ohio Bar",
      category: "Free Weights",
      type: "standard",
      description: "45lb Olympic barbell with aggressive knurling",
      specs: {
        weightRange: { min: 45, max: 500, increment: 2.5 },
        resistanceType: "weight_plates",
        availableWeights: [45], // Base bar weight
      },
      isPopular: true,
      usageCount: 25,
    },
    {
      id: "2",
      name: "Adjustable Dumbbells",
      brand: "PowerBlock",
      model: "Elite EXP",
      category: "Free Weights",
      type: "standard",
      description: "Adjustable dumbbells with quick-change system",
      specs: {
        weightRange: { min: 5, max: 90, increment: 2.5 },
        resistanceType: "weight_plates",
        availableWeights: [
          5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
        ],
      },
      isPopular: true,
      usageCount: 18,
    },
    {
      id: "3",
      name: "Chest Press Machine",
      brand: "Hammer Strength",
      model: "ISO-Lateral",
      category: "Strength",
      type: "standard",
      description: "Plate-loaded chest press with independent arm movement",
      specs: {
        weightRange: { min: 0, max: 720, increment: 45 },
        resistanceType: "weight_plates",
        conversionFactor: 0.85, // Due to leverage mechanics
        leverageRatio: 0.85,
        resistanceCurve: "ascending",
      },
      usageCount: 12,
    },
    {
      id: "4",
      name: "Leg Press",
      brand: "Life Fitness",
      model: "Signature Series",
      category: "Strength",
      type: "standard",
      description: "45-degree leg press with smooth linear bearings",
      specs: {
        weightRange: { min: 90, max: 1000, increment: 45 },
        resistanceType: "weight_plates",
        conversionFactor: 0.7, // Due to 45-degree angle
        leverageRatio: 0.7,
        resistanceCurve: "linear",
      },
      usageCount: 8,
    },
    {
      id: "5",
      name: "Cable Crossover",
      brand: "Freemotion",
      model: "Genesis",
      category: "Strength",
      type: "standard",
      description: "Dual adjustable pulleys with 360-degree rotation",
      specs: {
        weightRange: { min: 10, max: 300, increment: 10 },
        resistanceType: "weight_stack",
        pulleyRatio: 2.0, // 2:1 pulley system
        conversionFactor: 0.5,
        resistanceCurve: "linear",
      },
      usageCount: 15,
    },
    // Custom User Equipment
    {
      id: "6",
      name: "Home Gym Dumbbells",
      brand: "CAP Barbell",
      model: "Cast Iron Hex",
      category: "Free Weights",
      type: "custom",
      description: "Personal set of hex dumbbells for home workouts",
      specs: {
        resistanceType: "weight_plates",
        availableWeights: [10, 15, 20, 25, 30, 35, 40, 45, 50],
      },
      createdBy: "user-123",
      usageCount: 1,
    },
    {
      id: "7",
      name: "Garage Pull-up Bar",
      brand: "Iron Gym",
      model: "Total Upper Body",
      category: "Functional",
      type: "custom",
      description: "Doorway pull-up bar with multiple grip positions",
      specs: {
        resistanceType: "weight_plates", // bodyweight + added weight
        weightRange: { min: 0, max: 100, increment: 5 },
      },
      createdBy: "user-123",
      usageCount: 1,
    },
  ]);

  const categories = [
    { id: "all", name: "All Categories", icon: Wrench },
    { id: "Cardio", name: "Cardio", icon: Heart },
    { id: "Strength", name: "Strength", icon: Trophy },
    { id: "Free Weights", name: "Free Weights", icon: Weight },
    { id: "Functional", name: "Functional", icon: Target },
    { id: "Accessories", name: "Accessories", icon: Settings },
  ];

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDelete = (equipmentId: string) => {
    setEquipment(equipment.filter((item) => item.id !== equipmentId));
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.id === categoryName);
    return category ? category.icon : Wrench;
  };

  const getResistanceTypeDisplay = (type: string) => {
    const types = {
      weight_stack: "Weight Stack",
      weight_plates: "Weight Plates",
      pneumatic: "Pneumatic",
      magnetic: "Magnetic",
      hydraulic: "Hydraulic",
    };
    return types[type as keyof typeof types] || type;
  };

  const EquipmentCard = ({ item }: { item: Equipment }) => {
    const Icon = getCategoryIcon(item.category);

    return (
      <Card className="p-6 hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-gray-100">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <Badge
                  variant={item.type === "custom" ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {item.type === "custom" ? "Custom" : "Standard"}
                </Badge>
                {item.isPopular && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    Popular
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {item.brand} - {item.model}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/equipment/${item.id}`)}
              className="h-8 w-8 p-0"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/equipment/${item.id}/edit`)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            {item.type === "custom" && (
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
                    <AlertDialogTitle>Delete Equipment</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{item.name}"? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Specifications */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
          </div>

          {item.specs.resistanceType && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Resistance:</span>
              <span className="text-gray-900">
                {getResistanceTypeDisplay(item.specs.resistanceType)}
              </span>
            </div>
          )}

          {item.specs.weightRange && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Weight Range:</span>
              <span className="text-gray-900">
                {item.specs.weightRange.min}-{item.specs.weightRange.max} lbs
              </span>
            </div>
          )}

          {item.specs.availableWeights && item.category === "Free Weights" && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Available Weights:</span>
              <span className="text-gray-900">
                {item.specs.availableWeights.length} weights
              </span>
            </div>
          )}

          {item.specs.conversionFactor && item.specs.conversionFactor !== 1 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Effective Load:</span>
              <span className="text-gray-900">
                {Math.round(item.specs.conversionFactor * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            {item.usageCount && (
              <span>
                {item.usageCount} gym{item.usageCount !== 1 ? "s" : ""}
              </span>
            )}
            {item.specs.pulleyRatio && item.specs.pulleyRatio !== 1 && (
              <span>{item.specs.pulleyRatio}:1 ratio</span>
            )}
          </div>
          {item.type === "custom" && <span>Personal Equipment</span>}
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Equipment</h1>
          <p className="text-gray-500 mt-2">
            Manage your equipment database and specifications
          </p>
        </div>

        <Button
          onClick={() => router.push("/equipment/suggest")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Suggest Equipment
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search equipment by name, brand, model, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No Equipment Found
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchQuery || categoryFilter !== "all" || typeFilter !== "all"
              ? "Try adjusting your search criteria or filters."
              : "Create your first piece of equipment to get started."}
          </p>
          {!searchQuery && categoryFilter === "all" && typeFilter === "all" && (
            <Button onClick={() => router.push("/equipment/suggest")}>
              <Plus className="w-4 h-4 mr-2" />
              Suggest Your First Equipment
            </Button>
          )}
        </div>
      )}

      {/* Summary */}
      {filteredEquipment.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredEquipment.length}
              </div>
              <div className="text-sm text-gray-500">Equipment Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredEquipment.filter((e) => e.type === "custom").length}
              </div>
              <div className="text-sm text-gray-500">Custom Equipment</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {
                  filteredEquipment.filter((e) => e.category === "Free Weights")
                    .length
                }
              </div>
              <div className="text-sm text-gray-500">Free Weights</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {filteredEquipment.reduce(
                  (sum, e) => sum + (e.usageCount || 0),
                  0
                )}
              </div>
              <div className="text-sm text-gray-500">Total Usage</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
