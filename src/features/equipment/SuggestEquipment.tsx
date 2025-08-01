import { useState } from "react";
import { ArrowLeft, Send, Plus, X, Info, AlertCircle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Page } from "@/types/app";

interface SuggestEquipmentProps {
  onNavigate: (page: Page, id?: string) => void;
}

interface EquipmentSpecs {
  weightRange?: { min: number; max: number; increment: number };
  resistanceType?:
    | "weight_stack"
    | "weight_plates"
    | "pneumatic"
    | "magnetic"
    | "hydraulic"
    | "bodyweight";
  conversionFactor?: number;
  pulleyRatio?: number;
  leverageRatio?: number;
  resistanceCurve?: "linear" | "ascending" | "descending" | "bell_curve";
  availableWeights?: number[];
  notes?: string;
}

interface EquipmentSuggestion {
  name: string;
  brand: string;
  model: string;
  category:
    | "Cardio"
    | "Strength"
    | "Free Weights"
    | "Functional"
    | "Accessories"
    | "";
  description: string;
  imageUrl: string;
  specs: EquipmentSpecs;
  reasonForSuggestion: string;
  whereFound: string;
  alternativeNames: string[];
  estimatedPrice?: string;
  manufacturer?: string;
}

export default function SuggestEquipment({
  onNavigate,
}: SuggestEquipmentProps) {
  const [equipmentData, setEquipmentData] = useState<EquipmentSuggestion>({
    name: "",
    brand: "",
    model: "",
    category: "",
    description: "",
    imageUrl: "",
    specs: {
      resistanceType: "weight_plates",
      conversionFactor: 1.0,
      pulleyRatio: 1.0,
      leverageRatio: 1.0,
      resistanceCurve: "linear",
      availableWeights: [],
      notes: "",
    },
    reasonForSuggestion: "",
    whereFound: "",
    alternativeNames: [],
    estimatedPrice: "",
    manufacturer: "",
  });

  const [newWeight, setNewWeight] = useState("");
  const [newAlternateName, setNewAlternateName] = useState("");

  const categories = [
    {
      id: "Cardio",
      name: "Cardio",
      description: "Treadmills, bikes, ellipticals",
    },
    {
      id: "Strength",
      name: "Strength Machines",
      description: "Cable machines, press machines",
    },
    {
      id: "Free Weights",
      name: "Free Weights",
      description: "Dumbbells, barbells, plates",
    },
    {
      id: "Functional",
      name: "Functional",
      description: "Pull-up bars, suspension trainers",
    },
    {
      id: "Accessories",
      name: "Accessories",
      description: "Mats, belts, straps",
    },
  ];

  const resistanceTypes = [
    {
      id: "weight_plates",
      name: "Weight Plates",
      description: "Uses removable weight plates",
    },
    {
      id: "weight_stack",
      name: "Weight Stack",
      description: "Pin-selected weight stack",
    },
    {
      id: "pneumatic",
      name: "Pneumatic",
      description: "Air pressure resistance",
    },
    { id: "magnetic", name: "Magnetic", description: "Magnetic resistance" },
    { id: "hydraulic", name: "Hydraulic", description: "Hydraulic resistance" },
    {
      id: "bodyweight",
      name: "Bodyweight",
      description: "Body weight + optional added weight",
    },
  ];

  const resistanceCurves = [
    {
      id: "linear",
      name: "Linear",
      description: "Consistent resistance throughout range",
    },
    {
      id: "ascending",
      name: "Ascending",
      description: "Resistance increases through range",
    },
    {
      id: "descending",
      name: "Descending",
      description: "Resistance decreases through range",
    },
    {
      id: "bell_curve",
      name: "Bell Curve",
      description: "Peak resistance in middle of range",
    },
  ];

  const commonWeightSets = {
    "dumbbell-light": [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    "dumbbell-heavy": [
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
      100,
    ],
    "plates-standard": [2.5, 5, 10, 25, 35, 45],
    "plates-olympic": [2.5, 5, 10, 25, 35, 45, 100],
    kettlebell: [10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80],
  };

  const handleAddWeight = () => {
    const weight = parseFloat(newWeight);
    if (weight && !equipmentData.specs.availableWeights?.includes(weight)) {
      const updatedWeights = [
        ...(equipmentData.specs.availableWeights || []),
        weight,
      ].sort((a, b) => a - b);
      setEquipmentData({
        ...equipmentData,
        specs: {
          ...equipmentData.specs,
          availableWeights: updatedWeights,
        },
      });
      setNewWeight("");
    }
  };

  const handleRemoveWeight = (weight: number) => {
    const updatedWeights =
      equipmentData.specs.availableWeights?.filter((w) => w !== weight) || [];
    setEquipmentData({
      ...equipmentData,
      specs: {
        ...equipmentData.specs,
        availableWeights: updatedWeights,
      },
    });
  };

  const handleAddAlternateName = () => {
    if (
      newAlternateName &&
      !equipmentData.alternativeNames.includes(newAlternateName)
    ) {
      setEquipmentData({
        ...equipmentData,
        alternativeNames: [...equipmentData.alternativeNames, newAlternateName],
      });
      setNewAlternateName("");
    }
  };

  const handleRemoveAlternateName = (name: string) => {
    setEquipmentData({
      ...equipmentData,
      alternativeNames: equipmentData.alternativeNames.filter(
        (n) => n !== name
      ),
    });
  };

  const handleAddWeightSet = (setKey: string) => {
    const weights = commonWeightSets[setKey as keyof typeof commonWeightSets];
    const existingWeights = equipmentData.specs.availableWeights || [];
    const combinedWeights = [...new Set([...existingWeights, ...weights])].sort(
      (a, b) => a - b
    );

    setEquipmentData({
      ...equipmentData,
      specs: {
        ...equipmentData.specs,
        availableWeights: combinedWeights,
      },
    });
  };

  const handleSubmitSuggestion = () => {
    // In a real app, this would submit to an API for professional review
    console.log("Submitting equipment suggestion:", equipmentData);
    onNavigate("suggestions");
  };

  const updateSpecs = (key: keyof EquipmentSpecs, value: string | number | boolean | EquipmentSpecs[keyof EquipmentSpecs]) => {
    setEquipmentData({
      ...equipmentData,
      specs: {
        ...equipmentData.specs,
        [key]: value,
      },
    });
  };

  const updateWeightRange = (updates: Partial<{ min: number; max: number; increment: number }>) => {
    setEquipmentData({
      ...equipmentData,
      specs: {
        ...equipmentData.specs,
        weightRange: {
          ...equipmentData.specs.weightRange,
          ...updates,
        } as { min: number; max: number; increment: number },
      },
    });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate("equipment")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Suggest Equipment
            </h1>
            <p className="text-gray-500 mt-2">
              Help expand our equipment database with detailed specifications
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onNavigate("equipment")}>
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
          Equipment suggestions help build a comprehensive database for accurate
          workout tracking and cross-gym compatibility. Detailed specifications
          are especially valuable for professional review.
        </AlertDescription>
      </Alert>

      <div className="max-w-4xl space-y-8">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Equipment Name *</Label>
              <Input
                id="name"
                value={equipmentData.name}
                onChange={(e) =>
                  setEquipmentData({ ...equipmentData, name: e.target.value })
                }
                placeholder="e.g., Olympic Barbell, Chest Press"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={equipmentData.category}
                onValueChange={(
                  value:
                    | "Cardio"
                    | "Strength"
                    | "Free Weights"
                    | "Functional"
                    | "Accessories"
                ) => setEquipmentData({ ...equipmentData, category: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div>
                        <div className="font-medium">{cat.name}</div>
                        <div className="text-xs text-gray-500">
                          {cat.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={equipmentData.brand}
                onChange={(e) =>
                  setEquipmentData({ ...equipmentData, brand: e.target.value })
                }
                placeholder="e.g., Rogue, Hammer Strength"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={equipmentData.model}
                onChange={(e) =>
                  setEquipmentData({ ...equipmentData, model: e.target.value })
                }
                placeholder="e.g., Ohio Bar, ISO-Lateral"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="manufacturer">
                Manufacturer (if different from brand)
              </Label>
              <Input
                id="manufacturer"
                value={equipmentData.manufacturer}
                onChange={(e) =>
                  setEquipmentData({
                    ...equipmentData,
                    manufacturer: e.target.value,
                  })
                }
                placeholder="e.g., Matrix Fitness"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="estimatedPrice">Estimated Price Range</Label>
              <Input
                id="estimatedPrice"
                value={equipmentData.estimatedPrice}
                onChange={(e) =>
                  setEquipmentData({
                    ...equipmentData,
                    estimatedPrice: e.target.value,
                  })
                }
                placeholder="e.g., $500-800, $2000+"
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={equipmentData.description}
                onChange={(e) =>
                  setEquipmentData({
                    ...equipmentData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the equipment, its features, intended use, and any important details..."
                className="mt-2"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                value={equipmentData.imageUrl}
                onChange={(e) =>
                  setEquipmentData({
                    ...equipmentData,
                    imageUrl: e.target.value,
                  })
                }
                placeholder="https://example.com/equipment-image.jpg"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Alternative Names */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">
            Alternative Names & Variations
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            List other names this equipment might be known by to improve
            searchability.
          </p>

          <div className="mb-4">
            <Label htmlFor="alternateName">Add Alternative Name</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="alternateName"
                value={newAlternateName}
                onChange={(e) => setNewAlternateName(e.target.value)}
                placeholder="e.g., T-Bar Row, Cable Cross"
                onKeyPress={(e) =>
                  e.key === "Enter" && handleAddAlternateName()
                }
              />
              <Button type="button" onClick={handleAddAlternateName}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {equipmentData.alternativeNames.length > 0 && (
            <div>
              <Label>Alternative Names</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {equipmentData.alternativeNames.map((name) => (
                  <Badge
                    key={name}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1"
                  >
                    {name}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAlternateName(name)}
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Technical Specifications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">
            Technical Specifications
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Detailed specs help with accurate workout tracking and cross-gym
            equipment compatibility.
          </p>

          <Tabs defaultValue="resistance" className="space-y-6">
            <TabsList>
              <TabsTrigger value="resistance">Resistance</TabsTrigger>
              <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
              {equipmentData.category === "Free Weights" && (
                <TabsTrigger value="weights">Available Weights</TabsTrigger>
              )}
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="resistance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="resistanceType">Resistance Type</Label>
                  <Select
                    value={equipmentData.specs.resistanceType}
                    onValueChange={(value) =>
                      updateSpecs("resistanceType", value)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resistanceTypes.map((type) => (
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
                  <Label htmlFor="resistanceCurve">Resistance Curve</Label>
                  <Select
                    value={equipmentData.specs.resistanceCurve}
                    onValueChange={(value) =>
                      updateSpecs("resistanceCurve", value)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resistanceCurves.map((curve) => (
                        <SelectItem key={curve.id} value={curve.id}>
                          <div>
                            <div className="font-medium">{curve.name}</div>
                            <div className="text-xs text-gray-500">
                              {curve.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="minWeight">Min Weight (lbs)</Label>
                  <Input
                    id="minWeight"
                    type="number"
                    value={equipmentData.specs.weightRange?.min || ""}
                    onChange={(e) =>
                      updateWeightRange({
                        min: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="maxWeight">Max Weight (lbs)</Label>
                  <Input
                    id="maxWeight"
                    type="number"
                    value={equipmentData.specs.weightRange?.max || ""}
                    onChange={(e) =>
                      updateWeightRange({
                        max: parseFloat(e.target.value) || 100,
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="increment">Increment (lbs)</Label>
                  <Input
                    id="increment"
                    type="number"
                    step="0.5"
                    value={equipmentData.specs.weightRange?.increment || ""}
                    onChange={(e) =>
                      updateWeightRange({
                        increment: parseFloat(e.target.value) || 5,
                      })
                    }
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mechanics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="conversionFactor">
                    Conversion Factor
                    <Info className="w-4 h-4 inline ml-1 text-gray-400" />
                  </Label>
                  <Input
                    id="conversionFactor"
                    type="number"
                    step="0.01"
                    value={equipmentData.specs.conversionFactor || ""}
                    onChange={(e) =>
                      updateSpecs(
                        "conversionFactor",
                        parseFloat(e.target.value) || 1.0
                      )
                    }
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    How much actual resistance per displayed weight (e.g., 0.85
                    = 85% of displayed weight)
                  </p>
                </div>

                <div>
                  <Label htmlFor="pulleyRatio">Pulley Ratio</Label>
                  <Input
                    id="pulleyRatio"
                    type="number"
                    step="0.1"
                    value={equipmentData.specs.pulleyRatio || ""}
                    onChange={(e) =>
                      updateSpecs(
                        "pulleyRatio",
                        parseFloat(e.target.value) || 1.0
                      )
                    }
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mechanical advantage ratio (e.g., 2.0 = 2:1 pulley system)
                  </p>
                </div>

                <div>
                  <Label htmlFor="leverageRatio">Leverage Ratio</Label>
                  <Input
                    id="leverageRatio"
                    type="number"
                    step="0.01"
                    value={equipmentData.specs.leverageRatio || ""}
                    onChange={(e) =>
                      updateSpecs(
                        "leverageRatio",
                        parseFloat(e.target.value) || 1.0
                      )
                    }
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leverage mechanical advantage (affects effective resistance)
                  </p>
                </div>
              </div>
            </TabsContent>

            {equipmentData.category === "Free Weights" && (
              <TabsContent value="weights" className="space-y-6">
                {/* Quick Add Common Sets */}
                <div>
                  <Label>Quick Add Common Weight Sets</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddWeightSet("dumbbell-light")}
                    >
                      Light Dumbbells (5-50 lbs)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddWeightSet("dumbbell-heavy")}
                    >
                      Heavy Dumbbells (5-100 lbs)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddWeightSet("plates-standard")}
                    >
                      Standard Plates
                    </Button>
                  </div>
                </div>

                {/* Manual Weight Addition */}
                <div>
                  <Label htmlFor="newWeight">Add Individual Weight</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="newWeight"
                      type="number"
                      step="0.5"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      placeholder="Weight in lbs"
                      onKeyPress={(e) => e.key === "Enter" && handleAddWeight()}
                    />
                    <Button type="button" onClick={handleAddWeight}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Display Available Weights */}
                {equipmentData.specs.availableWeights &&
                  equipmentData.specs.availableWeights.length > 0 && (
                    <div>
                      <Label>
                        Available Weights (
                        {equipmentData.specs.availableWeights.length})
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-2 p-4 bg-gray-50 rounded-lg max-h-40 overflow-y-auto">
                        {equipmentData.specs.availableWeights.map((weight) => (
                          <Badge
                            key={weight}
                            variant="secondary"
                            className="flex items-center gap-1 px-2 py-1"
                          >
                            {weight} lbs
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveWeight(weight)}
                              className="h-auto p-0 ml-1 hover:bg-transparent"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </TabsContent>
            )}

            <TabsContent value="notes">
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={equipmentData.specs.notes || ""}
                  onChange={(e) => updateSpecs("notes", e.target.value)}
                  placeholder="Any additional specifications, unique features, maintenance notes, or usage tips..."
                  className="mt-2"
                  rows={6}
                />
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Where Found & Reason */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Suggestion Details</h3>

          <div className="space-y-6">
            <div>
              <Label htmlFor="whereFound">
                Where did you encounter this equipment? *
              </Label>
              <Input
                id="whereFound"
                value={equipmentData.whereFound}
                onChange={(e) =>
                  setEquipmentData({
                    ...equipmentData,
                    whereFound: e.target.value,
                  })
                }
                placeholder="e.g., Gold's Gym Downtown, Crossfit Box, Home gym setup"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="reasonForSuggestion">
                Why suggest this equipment? *
              </Label>
              <Textarea
                id="reasonForSuggestion"
                value={equipmentData.reasonForSuggestion}
                onChange={(e) =>
                  setEquipmentData({
                    ...equipmentData,
                    reasonForSuggestion: e.target.value,
                  })
                }
                placeholder="Help our team understand why this equipment should be added. Is it commonly found in gyms? Does it offer unique features? Would it improve workout tracking accuracy?"
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
