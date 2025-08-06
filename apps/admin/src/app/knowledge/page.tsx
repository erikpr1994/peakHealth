import { KnowledgeBase } from '@/components/KnowledgeBase';

export default function KnowledgePage() {
  return (
    <KnowledgeBase
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
