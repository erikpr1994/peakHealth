import { ArrowLeft, Save, Plus, X, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

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
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Page } from '@/types/app';

interface EditEquipmentProps {
  onNavigate: (page: Page, id?: string) => void;
  equipmentId: string;
}

interface EquipmentSpecs {
  weightRange?: { min: number; max: number; increment: number };
  resistanceType?:
    | 'weight_stack'
    | 'weight_plates'
    | 'pneumatic'
    | 'magnetic'
    | 'hydraulic'
    | 'bodyweight';
  conversionFactor?: number;
  pulleyRatio?: number;
  leverageRatio?: number;
  resistanceCurve?: 'linear' | 'ascending' | 'descending' | 'bell_curve';
  availableWeights?: number[];
  notes?: string;
}

interface EquipmentData {
  name: string;
  brand: string;
  model: string;
  category:
    | 'Cardio'
    | 'Strength'
    | 'Free Weights'
    | 'Functional'
    | 'Accessories'
    | '';
  description: string;
  imageUrl: string;
  specs: EquipmentSpecs;
  type: 'custom' | 'standard';
}

const EditEquipment = ({ onNavigate, equipmentId }: EditEquipmentProps) => {
  const [equipmentData, setEquipmentData] = useState<EquipmentData>({
    name: '',
    brand: '',
    model: '',
    category: '',
    description: '',
    imageUrl: '',
    type: 'custom',
    specs: {
      resistanceType: 'weight_plates',
      conversionFactor: 1.0,
      pulleyRatio: 1.0,
      leverageRatio: 1.0,
      resistanceCurve: 'linear',
      availableWeights: [],
      notes: '',
    },
  });

  const [newWeight, setNewWeight] = useState('');

  // Load existing equipment data
  useEffect(() => {
    // Mock data - in a real app, this would be fetched based on equipmentId
    const existingEquipment = {
      name: 'Home Gym Dumbbells',
      brand: 'CAP Barbell',
      model: 'Cast Iron Hex',
      category: 'Free Weights' as const,
      description: 'Personal set of hex dumbbells for home workouts',
      imageUrl: '',
      type: 'custom' as const,
      specs: {
        resistanceType: 'weight_plates' as const,
        conversionFactor: 1.0,
        pulleyRatio: 1.0,
        leverageRatio: 1.0,
        resistanceCurve: 'linear' as const,
        availableWeights: [10, 15, 20, 25, 30, 35, 40, 45, 50],
        weightRange: { min: 10, max: 50, increment: 5 },
        notes:
          'Personal collection built over time. Good condition, stored in dry garage.',
      },
    };

    setEquipmentData(existingEquipment);
  }, [equipmentId]);

  const categories = [
    {
      id: 'Cardio',
      name: 'Cardio',
      description: 'Treadmills, bikes, ellipticals',
    },
    {
      id: 'Strength',
      name: 'Strength Machines',
      description: 'Cable machines, press machines',
    },
    {
      id: 'Free Weights',
      name: 'Free Weights',
      description: 'Dumbbells, barbells, plates',
    },
    {
      id: 'Functional',
      name: 'Functional',
      description: 'Pull-up bars, suspension trainers',
    },
    {
      id: 'Accessories',
      name: 'Accessories',
      description: 'Mats, belts, straps',
    },
  ];

  const resistanceTypes = [
    {
      id: 'weight_plates',
      name: 'Weight Plates',
      description: 'Uses removable weight plates',
    },
    {
      id: 'weight_stack',
      name: 'Weight Stack',
      description: 'Pin-selected weight stack',
    },
    {
      id: 'pneumatic',
      name: 'Pneumatic',
      description: 'Air pressure resistance',
    },
    { id: 'magnetic', name: 'Magnetic', description: 'Magnetic resistance' },
    { id: 'hydraulic', name: 'Hydraulic', description: 'Hydraulic resistance' },
    {
      id: 'bodyweight',
      name: 'Bodyweight',
      description: 'Body weight + optional added weight',
    },
  ];

  const resistanceCurves = [
    {
      id: 'linear',
      name: 'Linear',
      description: 'Consistent resistance throughout range',
    },
    {
      id: 'ascending',
      name: 'Ascending',
      description: 'Resistance increases through range',
    },
    {
      id: 'descending',
      name: 'Descending',
      description: 'Resistance decreases through range',
    },
    {
      id: 'bell_curve',
      name: 'Bell Curve',
      description: 'Peak resistance in middle of range',
    },
  ];

  const commonWeightSets = {
    'dumbbell-light': [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    'dumbbell-heavy': [
      5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
      100,
    ],
    'dumbbell-commercial': Array.from({ length: 40 }, (_, i) => 5 + i * 2.5),
    'plates-standard': [2.5, 5, 10, 25, 35, 45],
    'plates-olympic': [2.5, 5, 10, 25, 35, 45, 100],
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
      setNewWeight('');
    }
  };

  const handleRemoveWeight = (weight: number) => {
    const updatedWeights =
      equipmentData.specs.availableWeights?.filter(w => w !== weight) || [];
    setEquipmentData({
      ...equipmentData,
      specs: {
        ...equipmentData.specs,
        availableWeights: updatedWeights,
      },
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

  const handleSave = () => {
    // In a real app, this would update the database
    console.log('Updating equipment:', { id: equipmentId, ...equipmentData });
    onNavigate('equipment-detail', equipmentId);
  };

  const handleDelete = () => {
    // In a real app, this would delete from database
    console.log('Deleting equipment:', equipmentId);
    onNavigate('equipment');
  };

  const updateSpecs = (
    key: keyof EquipmentSpecs,
    value: string | number | boolean | EquipmentSpecs[keyof EquipmentSpecs]
  ) => {
    setEquipmentData({
      ...equipmentData,
      specs: {
        ...equipmentData.specs,
        [key]: value,
      },
    });
  };

  const updateWeightRange = (
    updates: Partial<{ min: number; max: number; increment: number }>
  ) => {
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
          <Button
            variant="ghost"
            onClick={() => onNavigate('equipment-detail', equipmentId)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Equipment</h1>
            <p className="text-gray-500 mt-2">
              Update equipment specifications and details
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {equipmentData.type === 'custom' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Equipment
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Equipment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this equipment? This action
                    cannot be undone and will remove it from all associated
                    gyms.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Equipment
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            variant="outline"
            onClick={() => onNavigate('equipment-detail', equipmentId)}
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
              <Label htmlFor="name">Equipment Name *</Label>
              <Input
                id="name"
                value={equipmentData.name}
                onChange={e =>
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
                    | 'Cardio'
                    | 'Strength'
                    | 'Free Weights'
                    | 'Functional'
                    | 'Accessories'
                ) => setEquipmentData({ ...equipmentData, category: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
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
                onChange={e =>
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
                onChange={e =>
                  setEquipmentData({ ...equipmentData, model: e.target.value })
                }
                placeholder="e.g., Ohio Bar, ISO-Lateral"
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={equipmentData.description}
                onChange={e =>
                  setEquipmentData({
                    ...equipmentData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the equipment, its features, and any important details..."
                className="mt-2"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                value={equipmentData.imageUrl}
                onChange={e =>
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

        {/* Technical Specifications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">
            Technical Specifications
          </h3>

          <Tabs defaultValue="resistance" className="space-y-6">
            <TabsList>
              <TabsTrigger value="resistance">Resistance</TabsTrigger>
              <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
              {equipmentData.category === 'Free Weights' && (
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
                    onValueChange={value =>
                      updateSpecs('resistanceType', value)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resistanceTypes.map(type => (
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
                    onValueChange={value =>
                      updateSpecs('resistanceCurve', value)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resistanceCurves.map(curve => (
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
                    value={equipmentData.specs.weightRange?.min || ''}
                    onChange={e =>
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
                    value={equipmentData.specs.weightRange?.max || ''}
                    onChange={e =>
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
                    value={equipmentData.specs.weightRange?.increment || ''}
                    onChange={e =>
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
                  <Label htmlFor="conversionFactor">Conversion Factor</Label>
                  <Input
                    id="conversionFactor"
                    type="number"
                    step="0.01"
                    value={equipmentData.specs.conversionFactor || ''}
                    onChange={e =>
                      updateSpecs(
                        'conversionFactor',
                        parseFloat(e.target.value) || 1.0
                      )
                    }
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    How much actual resistance per displayed weight
                  </p>
                </div>

                <div>
                  <Label htmlFor="pulleyRatio">Pulley Ratio</Label>
                  <Input
                    id="pulleyRatio"
                    type="number"
                    step="0.1"
                    value={equipmentData.specs.pulleyRatio || ''}
                    onChange={e =>
                      updateSpecs(
                        'pulleyRatio',
                        parseFloat(e.target.value) || 1.0
                      )
                    }
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mechanical advantage ratio
                  </p>
                </div>

                <div>
                  <Label htmlFor="leverageRatio">Leverage Ratio</Label>
                  <Input
                    id="leverageRatio"
                    type="number"
                    step="0.01"
                    value={equipmentData.specs.leverageRatio || ''}
                    onChange={e =>
                      updateSpecs(
                        'leverageRatio',
                        parseFloat(e.target.value) || 1.0
                      )
                    }
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leverage mechanical advantage
                  </p>
                </div>
              </div>
            </TabsContent>

            {equipmentData.category === 'Free Weights' && (
              <TabsContent value="weights" className="space-y-6">
                {/* Quick Add Common Sets */}
                <div>
                  <Label>Quick Add Common Sets</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddWeightSet('dumbbell-light')}
                    >
                      Light Dumbbells (5-50 lbs)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddWeightSet('dumbbell-heavy')}
                    >
                      Heavy Dumbbells (5-100 lbs)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddWeightSet('plates-standard')}
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
                      onChange={e => setNewWeight(e.target.value)}
                      placeholder="Weight in lbs"
                      onKeyPress={e => e.key === 'Enter' && handleAddWeight()}
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
                        {equipmentData.specs.availableWeights.map(weight => (
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
                  value={equipmentData.specs.notes || ''}
                  onChange={e => updateSpecs('notes', e.target.value)}
                  placeholder="Any additional specifications, maintenance notes, or usage tips..."
                  className="mt-2"
                  rows={6}
                />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default EditEquipment;
