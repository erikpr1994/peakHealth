import { ProductRoadmap } from '@/components/ProductRoadmap';

export default function RoadmapPage() {
  return (
    <ProductRoadmap
      scopeInfo={{
        scope: 'platform',
        label: 'Platform Wide',
        color: 'default',
      }}
    />
  );
}
