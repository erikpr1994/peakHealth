import {
  ArrowLeft,
  Edit2,
  Share2,
  Weight,
  Zap,
  Gauge,
  Settings,
  MapPin,
  TrendingUp,
  Calculator,
} from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Page } from '@/types/app';

interface EquipmentDetailProps {
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

interface Equipment {
  id: string;
  name: string;
  brand: string;
  model: string;
  category:
    | 'Cardio'
    | 'Strength'
    | 'Free Weights'
    | 'Functional'
    | 'Accessories';
  type: 'custom' | 'standard';
  description?: string;
  imageUrl?: string;
  specs: EquipmentSpecs;
  isPopular?: boolean;
  createdBy?: string;
  usageCount?: number;
  gyms?: { id: string; name: string }[];
  userHistory?: {
    lastUsed: string;
    totalSessions: number;
    averageWeight: number;
    personalRecord: number;
    progressTrend: 'up' | 'down' | 'stable';
  };
}

const EquipmentDetail = ({ onNavigate, equipmentId }: EquipmentDetailProps) => {
  // Mock data - in a real app, this would be fetched based on equipmentId
  const equipment: Equipment = {
    id: equipmentId,
    name: 'Olympic Barbell',
    brand: 'Rogue',
    model: 'Ohio Bar',
    category: 'Free Weights',
    type: 'standard',
    description:
      '45lb Olympic barbell with aggressive knurling and dual markings. Built to IPF and IWF specifications with excellent whip and spin.',
    imageUrl: '/api/placeholder/400/300',
    specs: {
      weightRange: { min: 45, max: 500, increment: 2.5 },
      resistanceType: 'weight_plates',
      conversionFactor: 1.0,
      resistanceCurve: 'linear',
      availableWeights: [45],
      notes:
        'Standard Olympic barbell weight is 45 lbs (20kg). Compatible with 2-inch Olympic plates only.',
    },
    isPopular: true,
    usageCount: 25,
    gyms: [
      { id: '1', name: 'Downtown Fitness Center' },
      { id: '2', name: 'Iron Temple Gym' },
      { id: '3', name: 'My Home Gym' },
    ],
    userHistory: {
      lastUsed: '2 days ago',
      totalSessions: 45,
      averageWeight: 185,
      personalRecord: 225,
      progressTrend: 'up',
    },
  };

  const getResistanceTypeDisplay = (type: string) => {
    const types = {
      weight_stack: 'Weight Stack',
      weight_plates: 'Weight Plates',
      pneumatic: 'Pneumatic',
      magnetic: 'Magnetic',
      hydraulic: 'Hydraulic',
      bodyweight: 'Bodyweight',
    };
    return types[type as keyof typeof types] || type;
  };

  const getCurveDisplay = (curve: string) => {
    const curves = {
      linear: 'Linear',
      ascending: 'Ascending',
      descending: 'Descending',
      bell_curve: 'Bell Curve',
    };
    return curves[curve as keyof typeof curves] || curve;
  };

  const SpecCard = ({
    icon: Icon,
    label,
    value,
    description,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
    description?: string;
  }) => (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
      {description && (
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      )}
    </div>
  );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate('equipment')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {equipment.name}
              </h1>
              <Badge
                variant={equipment.type === 'custom' ? 'secondary' : 'outline'}
              >
                {equipment.type === 'custom' ? 'Custom' : 'Standard'}
              </Badge>
              {equipment.isPopular && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  Popular
                </Badge>
              )}
            </div>
            <p className="text-gray-600 mt-1">
              {equipment.brand} - {equipment.model}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => onNavigate('edit-equipment', equipment.id)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Equipment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Overview</h3>

            {equipment.imageUrl && (
              <div className="mb-6">
                <Image
                  src={equipment.imageUrl}
                  alt={equipment.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {equipment.usageCount}
                </div>
                <div className="text-sm text-gray-500">Gyms Using</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {equipment.category}
                </div>
                <div className="text-sm text-gray-500">Category</div>
              </div>

              {equipment.userHistory && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {equipment.userHistory.totalSessions}
                    </div>
                    <div className="text-sm text-gray-500">Your Sessions</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {equipment.userHistory.personalRecord}
                      </span>
                      <TrendingUp
                        className={`w-4 h-4 ${
                          equipment.userHistory.progressTrend === 'up'
                            ? 'text-green-500'
                            : equipment.userHistory.progressTrend === 'down'
                              ? 'text-red-500'
                              : 'text-gray-500'
                        }`}
                      />
                    </div>
                    <div className="text-sm text-gray-500">Personal Record</div>
                  </div>
                </>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {equipment.description}
            </p>
          </Card>

          {/* Specifications */}
          <Card className="p-6">
            <Tabs defaultValue="technical" className="space-y-4">
              <TabsList>
                <TabsTrigger value="technical">Technical Specs</TabsTrigger>
                <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
                {equipment.specs.availableWeights &&
                  equipment.specs.availableWeights.length > 0 && (
                    <TabsTrigger value="weights">Available Weights</TabsTrigger>
                  )}
                {equipment.specs.notes && (
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="technical" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SpecCard
                    icon={Zap}
                    label="Resistance Type"
                    value={getResistanceTypeDisplay(
                      equipment.specs.resistanceType || ''
                    )}
                    description="Type of resistance mechanism"
                  />

                  <SpecCard
                    icon={TrendingUp}
                    label="Resistance Curve"
                    value={getCurveDisplay(
                      equipment.specs.resistanceCurve || ''
                    )}
                    description="How resistance varies through range of motion"
                  />

                  {equipment.specs.weightRange && (
                    <SpecCard
                      icon={Weight}
                      label="Weight Range"
                      value={`${equipment.specs.weightRange.min}-${equipment.specs.weightRange.max} lbs`}
                      description={`Increments of ${equipment.specs.weightRange.increment} lbs`}
                    />
                  )}

                  {equipment.specs.conversionFactor &&
                    equipment.specs.conversionFactor !== 1 && (
                      <SpecCard
                        icon={Calculator}
                        label="Effective Load"
                        value={`${Math.round(
                          equipment.specs.conversionFactor * 100
                        )}%`}
                        description="Actual resistance per displayed weight"
                      />
                    )}
                </div>
              </TabsContent>

              <TabsContent value="mechanics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {equipment.specs.conversionFactor && (
                    <SpecCard
                      icon={Gauge}
                      label="Conversion Factor"
                      value={equipment.specs.conversionFactor.toFixed(2)}
                      description="Weight conversion multiplier"
                    />
                  )}

                  {equipment.specs.pulleyRatio &&
                    equipment.specs.pulleyRatio !== 1 && (
                      <SpecCard
                        icon={Settings}
                        label="Pulley Ratio"
                        value={`${equipment.specs.pulleyRatio}:1`}
                        description="Mechanical advantage from pulleys"
                      />
                    )}

                  {equipment.specs.leverageRatio &&
                    equipment.specs.leverageRatio !== 1 && (
                      <SpecCard
                        icon={Gauge}
                        label="Leverage Ratio"
                        value={equipment.specs.leverageRatio.toFixed(2)}
                        description="Leverage mechanical advantage"
                      />
                    )}
                </div>

                {/* Weight Conversion Calculator */}
                {equipment.specs.conversionFactor &&
                  equipment.specs.conversionFactor !== 1 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Weight Conversion
                      </h4>
                      <p className="text-sm text-blue-700">
                        Due to the mechanical design, this equipment provides{' '}
                        {Math.round(equipment.specs.conversionFactor * 100)}% of
                        the displayed weight as actual resistance. For example,
                        selecting 100 lbs will provide approximately{' '}
                        {Math.round(100 * equipment.specs.conversionFactor)} lbs
                        of actual resistance.
                      </p>
                    </div>
                  )}
              </TabsContent>

              {equipment.specs.availableWeights &&
                equipment.specs.availableWeights.length > 0 && (
                  <TabsContent value="weights">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Available Weights (
                        {equipment.specs.availableWeights.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {equipment.specs.availableWeights.map(weight => (
                          <Badge
                            key={weight}
                            variant="outline"
                            className="px-3 py-1"
                          >
                            {weight} lbs
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                )}

              {equipment.specs.notes && (
                <TabsContent value="notes">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {equipment.specs.notes}
                    </p>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Usage Stats */}
          {equipment.userHistory && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Usage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Last Used</span>
                    <span className="text-sm font-medium">
                      {equipment.userHistory.lastUsed}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">
                      Total Sessions
                    </span>
                    <span className="text-sm font-medium">
                      {equipment.userHistory.totalSessions}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">
                      Average Weight
                    </span>
                    <span className="text-sm font-medium">
                      {equipment.userHistory.averageWeight} lbs
                    </span>
                  </div>
                  <Progress
                    value={
                      (equipment.userHistory.averageWeight /
                        equipment.userHistory.personalRecord) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">
                      Personal Record
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {equipment.userHistory.personalRecord} lbs
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Gyms Using This Equipment */}
          {equipment.gyms && equipment.gyms.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Available At</h3>
              <div className="space-y-3">
                {equipment.gyms.map(gym => (
                  <div
                    key={gym.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {gym.name}
                      </div>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-xs text-blue-600"
                        onClick={() => onNavigate('gym-detail', gym.id)}
                      >
                        View Gym Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => onNavigate('create-routine')}
              >
                <Weight className="w-4 h-4 mr-2" />
                Use in Routine
              </Button>

              <Button variant="outline" className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                Weight Calculator
              </Button>

              <Button variant="outline" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Progress
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
