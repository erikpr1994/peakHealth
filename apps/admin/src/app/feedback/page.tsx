import { UserFeedback } from '@/components/UserFeedback';

export default function FeedbackPage() {
  return (
    <UserFeedback
      scopeInfo={{
        scope: 'platform',
        label: 'Platform Wide',
        color: 'default',
      }}
    />
  );
}
