import { Construction } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UnderConstructionProps {
  featureName: string;
  onGoToFallback?: () => void;
}

const UnderConstruction = ({
  featureName,
  onGoToFallback,
}: UnderConstructionProps) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Construction className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">
            Under Construction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            The {featureName} feature is currently being developed and will be
            available soon.
          </p>
          <p className="text-sm text-gray-500">
            We're working hard to bring you the best experience possible.
          </p>
          {onGoToFallback && (
            <Button onClick={onGoToFallback} className="w-full">
              Go to Profile
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderConstruction;
