'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import {
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Tag,
  Calendar,
  TrendingUp,
  Users,
} from 'lucide-react';

// Mock knowledge base data
const knowledgeBaseArticles = [
  {
    id: 1,
    title: 'Getting Started with Peak Health',
    slug: 'getting-started-guide',
    content:
      'Complete guide to setting up your Peak Health account and getting the most out of our platform...',
    category: 'getting_started',
    status: 'published',
    author: 'Support Team',
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
    views: 15423,
    helpful: 1876,
    notHelpful: 134,
    tags: ['setup', 'beginner', 'account'],
    searchKeywords: ['setup', 'account', 'getting started', 'beginner'],
    relatedArticles: [2, 3],
  },
  {
    id: 2,
    title: 'How to Sync Your Fitness Tracker',
    slug: 'sync-fitness-tracker',
    content:
      'Step-by-step instructions for connecting and syncing data from popular fitness trackers including Apple Watch, Fitbit, Garmin...',
    category: 'integrations',
    status: 'published',
    author: 'Tech Team',
    createdAt: '2024-11-20T09:15:00Z',
    updatedAt: '2024-12-15T11:20:00Z',
    views: 8934,
    helpful: 756,
    notHelpful: 89,
    tags: ['sync', 'wearables', 'data'],
    searchKeywords: ['sync', 'tracker', 'apple watch', 'fitbit', 'garmin'],
    relatedArticles: [1, 4],
  },
  {
    id: 3,
    title: 'Billing and Subscription Management',
    slug: 'billing-subscription-guide',
    content:
      'Everything you need to know about managing your subscription, billing cycles, payment methods, and upgrades...',
    category: 'billing',
    status: 'published',
    author: 'Billing Team',
    createdAt: '2024-11-25T16:45:00Z',
    updatedAt: '2024-12-18T09:30:00Z',
    views: 6789,
    helpful: 634,
    notHelpful: 67,
    tags: ['billing', 'subscription', 'payment'],
    searchKeywords: ['billing', 'payment', 'subscription', 'upgrade', 'cancel'],
    relatedArticles: [1, 5],
  },
  {
    id: 4,
    title: 'Troubleshooting Common Login Issues',
    slug: 'login-troubleshooting',
    content:
      'Solutions for the most common login problems including password resets, account verification, and SSO issues...',
    category: 'troubleshooting',
    status: 'published',
    author: 'Support Team',
    createdAt: '2024-12-01T11:00:00Z',
    updatedAt: '2024-12-20T13:45:00Z',
    views: 4567,
    helpful: 523,
    notHelpful: 45,
    tags: ['login', 'password', 'troubleshooting'],
    searchKeywords: ['login', 'password', 'reset', 'verification', 'sso'],
    relatedArticles: [2, 6],
  },
  {
    id: 5,
    title: 'Corporate Wellness Program Setup',
    slug: 'corporate-wellness-setup',
    content:
      'Complete guide for corporate administrators to set up and manage employee wellness programs...',
    category: 'corporate',
    status: 'draft',
    author: 'Enterprise Team',
    createdAt: '2024-12-15T14:20:00Z',
    updatedAt: '2024-12-22T10:15:00Z',
    views: 0,
    helpful: 0,
    notHelpful: 0,
    tags: ['corporate', 'admin', 'setup'],
    searchKeywords: [
      'corporate',
      'enterprise',
      'admin',
      'wellness',
      'employee',
    ],
    relatedArticles: [1, 3],
  },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'getting_started', label: 'Getting Started', count: 12 },
  { value: 'integrations', label: 'Integrations', count: 8 },
  { value: 'billing', label: 'Billing & Payments', count: 6 },
  { value: 'troubleshooting', label: 'Troubleshooting', count: 15 },
  { value: 'corporate', label: 'Corporate Features', count: 4 },
  { value: 'privacy', label: 'Privacy & Security', count: 7 },
];

const statuses = [
  { value: 'published', label: 'Published', color: 'default' },
  { value: 'draft', label: 'Draft', color: 'secondary' },
  { value: 'review', label: 'Under Review', color: 'outline' },
  { value: 'archived', label: 'Archived', color: 'secondary' },
];

interface KnowledgeBaseProps {
  scopeInfo: any;
}

const getStatusColor = (status: string) => {
  const statusObj = statuses.find(s => s.value === status);
  return statusObj?.color || 'outline';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const calculateHelpfulRatio = (helpful: number, notHelpful: number) => {
  const total = helpful + notHelpful;
  return total > 0 ? Math.round((helpful / total) * 100) : 0;
};

export function KnowledgeBase({ scopeInfo }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredArticles = knowledgeBaseArticles.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' || article.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Manage help documentation, FAQs, and knowledge base articles to
            support users and reduce support tickets.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Knowledge Base Article</DialogTitle>
                <DialogDescription>
                  Create a new help article to assist users with platform
                  features and common questions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="article-title">Article Title</Label>
                    <Input
                      id="article-title"
                      placeholder="Enter article title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="article-slug">URL Slug</Label>
                    <Input id="article-slug" placeholder="url-friendly-slug" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(category => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="article-content">Article Content</Label>
                  <Textarea
                    id="article-content"
                    placeholder="Write your help article content here..."
                    rows={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" placeholder="setup, account, beginner" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">
                    Search Keywords (comma-separated)
                  </Label>
                  <Input
                    id="keywords"
                    placeholder="setup, getting started, account creation"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Save as Draft
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Publish Article
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search articles, content, or tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
                {category.count && ` (${category.count})`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="articles">
            All Articles ({filteredArticles.length})
          </TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          {/* Articles List */}
          {filteredArticles.map(article => (
            <Card
              key={article.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{article.title}</h3>
                      <Badge
                        variant={getStatusColor(article.status) as any}
                        className="text-xs"
                      >
                        {article.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {
                          categories.find(c => c.value === article.category)
                            ?.label
                        }
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {article.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Metrics */}
                    {article.status === 'published' && (
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          <span>{article.helpful}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                          <span>{article.notHelpful}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-green-600">
                            {calculateHelpfulRatio(
                              article.helpful,
                              article.notHelpful
                            )}
                            % helpful
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>By {article.author}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Created {formatDate(article.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Updated {formatDate(article.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Slug: /{article.slug}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          {filteredArticles
            .sort((a, b) => b.views - a.views)
            .slice(0, 10)
            .map(article => (
              <Card key={`popular-${article.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {article.views.toLocaleString()} views •{' '}
                        {calculateHelpfulRatio(
                          article.helpful,
                          article.notHelpful
                        )}
                        % helpful
                      </p>
                    </div>
                    <Badge variant="outline">
                      {
                        categories.find(c => c.value === article.category)
                          ?.label
                      }
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {filteredArticles
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .slice(0, 10)
            .map(article => (
              <Card key={`recent-${article.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Updated {formatDate(article.updatedAt)} by{' '}
                        {article.author}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getStatusColor(article.status) as any}
                        className="text-xs"
                      >
                        {article.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Knowledge Base Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Articles
                    </p>
                    <p className="text-xl font-semibold">
                      {knowledgeBaseArticles.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-xl font-semibold">
                      {knowledgeBaseArticles
                        .reduce((sum, a) => sum + a.views, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg Helpfulness
                    </p>
                    <p className="text-xl font-semibold">
                      {Math.round(
                        knowledgeBaseArticles.reduce(
                          (sum, a) =>
                            sum +
                            calculateHelpfulRatio(a.helpful, a.notHelpful),
                          0
                        ) / knowledgeBaseArticles.length
                      )}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Published Articles
                    </p>
                    <p className="text-xl font-semibold">
                      {
                        knowledgeBaseArticles.filter(
                          a => a.status === 'published'
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
