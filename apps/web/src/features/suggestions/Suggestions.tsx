'use client';

import {
  FileCheck,
  Plus,
  ThumbsUp,
  MessageSquare,
  Filter,
  Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SuggestionStatus = 'pending' | 'approved' | 'rejected' | 'under_review';
type SuggestionType = 'gym' | 'equipment' | 'exercise';

interface Suggestion {
  id: string;
  type: SuggestionType;
  title: string;
  description: string;
  status: SuggestionStatus;
  submittedAt: Date;
  submittedBy: string;
  upvotes: number;
  hasUserUpvoted: boolean;
  reviewNotes?: string;
  reviewedAt?: Date;
  reviewedBy?: string;
  category?: string;
  tags?: string[];
}

export default function Suggestions() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock suggestion data
  const [suggestions] = useState<Suggestion[]>([
    {
      id: '1',
      type: 'exercise',
      title: 'Bulgarian Split Squat Variations',
      description:
        'A single-leg exercise that targets quads, glutes, and improves balance. Multiple variations including elevated rear foot, jumping, and weighted versions.',
      status: 'approved',
      submittedAt: new Date('2024-01-15'),
      submittedBy: 'Alex Johnson',
      upvotes: 24,
      hasUserUpvoted: true,
      reviewedAt: new Date('2024-01-18'),
      reviewedBy: 'Fitness Team',
      category: 'Legs',
      tags: ['unilateral', 'balance', 'functional'],
    },
    {
      id: '2',
      type: 'gym',
      title: 'CrossFit Downtown',
      description:
        'New CrossFit gym in downtown area with Olympic lifting platforms, rings, and functional fitness equipment.',
      status: 'pending',
      submittedAt: new Date('2024-01-20'),
      submittedBy: 'Alex Johnson',
      upvotes: 8,
      hasUserUpvoted: false,
      category: 'CrossFit',
      tags: ['crossfit', 'olympic', 'functional'],
    },
    {
      id: '3',
      type: 'equipment',
      title: 'Concept2 Model E Rower',
      description:
        'Premium rowing machine with advanced performance monitor and smooth flywheel design.',
      status: 'under_review',
      submittedAt: new Date('2024-01-18'),
      submittedBy: 'Alex Johnson',
      upvotes: 15,
      hasUserUpvoted: true,
      category: 'Cardio',
      tags: ['rowing', 'cardio', 'concept2'],
    },
    {
      id: '4',
      type: 'exercise',
      title: 'Tempo Push-ups',
      description:
        'Push-up variation with controlled tempo (3-1-3-1) to increase time under tension and muscle engagement.',
      status: 'rejected',
      submittedAt: new Date('2024-01-12'),
      submittedBy: 'Alex Johnson',
      upvotes: 5,
      hasUserUpvoted: false,
      reviewNotes:
        'Too similar to existing push-up variations. Consider submitting as a modification to standard push-ups.',
      reviewedAt: new Date('2024-01-16'),
      reviewedBy: 'Fitness Team',
      category: 'Chest',
      tags: ['tempo', 'bodyweight', 'upper body'],
    },
    {
      id: '5',
      type: 'gym',
      title: 'Planet Fitness - Westside',
      description:
        'Budget-friendly gym with cardio equipment, basic strength machines, and 24/7 access.',
      status: 'approved',
      submittedAt: new Date('2024-01-10'),
      submittedBy: 'Mike Wilson',
      upvotes: 12,
      hasUserUpvoted: false,
      reviewedAt: new Date('2024-01-14'),
      reviewedBy: 'Location Team',
      category: 'Commercial',
      tags: ['budget', 'chain', 'cardio'],
    },
  ]);

  const handleUpvote = (suggestionId: string) => {
    // In a real app, this would make an API call
    console.log('Upvoting suggestion:', suggestionId);
  };

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSearch =
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || suggestion.status === statusFilter;
    const matchesType = typeFilter === 'all' || suggestion.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: SuggestionStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'under_review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: SuggestionStatus) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'under_review':
        return 'Under Review';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: SuggestionType) => {
    switch (type) {
      case 'gym':
        return '🏢';
      case 'equipment':
        return '🏋️';
      case 'exercise':
        return '💪';
      default:
        return '📝';
    }
  };

  const SuggestionCard = ({ suggestion }: { suggestion: Suggestion }) => (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getTypeIcon(suggestion.type)}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs capitalize">
                {suggestion.type}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(suggestion.status)}`}>
                {getStatusLabel(suggestion.status)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUpvote(suggestion.id)}
            className={`h-8 ${
              suggestion.hasUserUpvoted ? 'text-blue-600 bg-blue-50' : ''
            }`}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            {suggestion.upvotes}
          </Button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {suggestion.description}
      </p>

      {suggestion.tags && suggestion.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {suggestion.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {suggestion.status === 'rejected' && suggestion.reviewNotes && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">
              Review Notes
            </span>
          </div>
          <p className="text-sm text-red-700">{suggestion.reviewNotes}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>Submitted {suggestion.submittedAt.toLocaleDateString()}</span>
          {suggestion.reviewedAt && (
            <span>Reviewed {suggestion.reviewedAt.toLocaleDateString()}</span>
          )}
        </div>
        {suggestion.category && (
          <span className="font-medium">{suggestion.category}</span>
        )}
      </div>
    </Card>
  );

  const getSummaryStats = () => {
    const total = suggestions.length;
    const pending = suggestions.filter(s => s.status === 'pending').length;
    const approved = suggestions.filter(s => s.status === 'approved').length;
    const rejected = suggestions.filter(s => s.status === 'rejected').length;

    return { total, pending, approved, rejected };
  };

  const stats = getSummaryStats();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Suggestions</h1>
          <p className="text-gray-500 mt-2">
            Track your submitted suggestions and their approval status
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push('/suggestions/exercise')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Suggest Exercise
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/suggestions/equipment')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Suggest Equipment
          </Button>
          <Button onClick={() => router.push('/suggestions/gym')}>
            <Plus className="w-4 h-4 mr-2" />
            Suggest Gym
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-500">Total Suggestions</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <div className="text-sm text-gray-500">Pending Review</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.approved}
          </div>
          <div className="text-sm text-gray-500">Approved</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {stats.rejected}
          </div>
          <div className="text-sm text-gray-500">Rejected</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search suggestions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="exercise">Exercises</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="gym">Gyms</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Suggestions List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            All ({filteredSuggestions.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending (
            {filteredSuggestions.filter(s => s.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved (
            {filteredSuggestions.filter(s => s.status === 'approved').length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected (
            {filteredSuggestions.filter(s => s.status === 'rejected').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map(suggestion => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))
          ) : (
            <div className="text-center py-16">
              <FileCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Suggestions Found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Start contributing to the community by suggesting new content.'}
              </p>
              {!searchQuery &&
                statusFilter === 'all' &&
                typeFilter === 'all' && (
                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={() => router.push('/suggestions/exercise')}
                      variant="outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Suggest Exercise
                    </Button>
                    <Button onClick={() => router.push('/suggestions/gym')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Suggest Gym
                    </Button>
                  </div>
                )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filteredSuggestions
            .filter(s => s.status === 'pending')
            .map(suggestion => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {filteredSuggestions
            .filter(s => s.status === 'approved')
            .map(suggestion => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {filteredSuggestions
            .filter(s => s.status === 'rejected')
            .map(suggestion => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
