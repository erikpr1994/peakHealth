"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  ThumbsUp, 
  Search,
  Star,
  MessageSquare,
  TrendingUp,
  Calendar,
  Filter,
  BarChart3,
  Smile,
  Meh,
  Frown
} from "lucide-react";

const userFeedback = [
  {
    id: 1,
    user: { name: "Sarah Johnson", plan: "Premium", avatar: "https://images.unsplash.com/photo-1494790108755-2616b96b61d4?w=150&h=150&fit=crop&crop=face" },
    rating: 5,
    title: "Amazing workout tracking features!",
    content: "The new analytics dashboard is incredibly helpful for tracking my progress. Love the detailed insights and the ability to see trends over time.",
    sentiment: "positive",
    createdAt: "2024-12-22T14:30:00Z"
  },
  {
    id: 2,
    user: { name: "Mike Chen", plan: "Corporate", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    rating: 4,
    title: "Add dark mode to mobile app",
    content: "Would really appreciate a dark mode option for the mobile app, especially for evening workouts.",
    sentiment: "neutral",
    createdAt: "2024-12-21T16:45:00Z"
  },
  {
    id: 3,
    user: { name: "Emma Rodriguez", plan: "Basic", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
    rating: 2,
    title: "Sync issues with Apple Health",
    content: "My workout data from Apple Health hasn't been syncing properly for the past week. Already tried disconnecting and reconnecting but the issue persists.",
    sentiment: "negative",
    createdAt: "2024-12-20T11:20:00Z"
  },
  {
    id: 4,
    user: { name: "David Park", plan: "Premium", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    rating: 5,
    title: "Excellent trainer matching",
    content: "The algorithm for matching with trainers is spot on! Found the perfect trainer for my goals and the virtual sessions work flawlessly.",
    sentiment: "positive",
    createdAt: "2024-12-19T09:15:00Z"
  },
  {
    id: 5,
    user: { name: "Lisa Chang", plan: "Corporate", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    rating: 3,
    title: "Need better mobile notifications",
    content: "The desktop notifications work great but mobile notifications are inconsistent. Sometimes I miss workout reminders.",
    sentiment: "neutral",
    createdAt: "2024-12-18T15:30:00Z"
  }
];

const feedbackMetrics = {
  totalFeedback: 1247,
  averageRating: 4.2,
  positivePercentage: 68,
  neutralPercentage: 24,
  negativePercentage: 8,
  responseRate: 85
};

interface UserFeedbackProps {
  scopeInfo: any;
}

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return Smile;
    case 'neutral': return Meh;
    case 'negative': return Frown;
    default: return MessageSquare;
  }
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return 'text-green-600';
    case 'neutral': return 'text-yellow-600';
    case 'negative': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const renderStars = (rating: number) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
      ))}
    </div>
  );
};

export function UserFeedback({ scopeInfo }: UserFeedbackProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("all");

  const filteredFeedback = userFeedback.filter(feedback => {
    const matchesSearch = feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSentiment = selectedSentiment === "all" || feedback.sentiment === selectedSentiment;
    return matchesSearch && matchesSentiment;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Monitor user feedback, ratings, and suggestions to improve platform features and user satisfaction.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Feedback Report
          </Button>
        </div>
      </div>

      {/* Feedback Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
                <p className="text-xl font-semibold">{feedbackMetrics.totalFeedback}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-xl font-semibold">{feedbackMetrics.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Positive</p>
                <p className="text-xl font-semibold">{feedbackMetrics.positivePercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-xl font-semibold">{feedbackMetrics.responseRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input 
            placeholder="Search feedback, users, or content..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="pl-9" 
          />
        </div>
        <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Sentiments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sentiments</SelectItem>
            <SelectItem value="positive">Positive</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="negative">Negative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Feedback ({filteredFeedback.length})</TabsTrigger>
          <TabsTrigger value="positive">Positive ({filteredFeedback.filter(f => f.sentiment === 'positive').length})</TabsTrigger>
          <TabsTrigger value="neutral">Neutral ({filteredFeedback.filter(f => f.sentiment === 'neutral').length})</TabsTrigger>
          <TabsTrigger value="negative">Negative ({filteredFeedback.filter(f => f.sentiment === 'negative').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Feedback List */}
          {filteredFeedback.map((feedback) => {
            const SentimentIcon = getSentimentIcon(feedback.sentiment);
            return (
              <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={feedback.user.avatar} />
                        <AvatarFallback>{feedback.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{feedback.user.name}</p>
                          <Badge variant="outline" className="text-xs">{feedback.user.plan} Plan</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(feedback.rating)}
                          <span className="text-sm text-muted-foreground">({feedback.rating}/5)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <SentimentIcon className={`h-4 w-4 ${getSentimentColor(feedback.sentiment)}`} />
                      <Badge variant="outline" className="text-xs capitalize">
                        {feedback.sentiment}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">{feedback.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{feedback.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(feedback.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        Mark Helpful
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="positive" className="space-y-4">
          {filteredFeedback
            .filter(feedback => feedback.sentiment === 'positive')
            .map((feedback) => {
              const SentimentIcon = getSentimentIcon(feedback.sentiment);
              return (
                <Card key={`positive-${feedback.id}`} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={feedback.user.avatar} />
                          <AvatarFallback>{feedback.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{feedback.user.name}</p>
                            <Badge variant="outline" className="text-xs">{feedback.user.plan} Plan</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(feedback.rating)}
                            <span className="text-sm text-muted-foreground">({feedback.rating}/5)</span>
                          </div>
                        </div>
                      </div>
                      <SentimentIcon className={`h-4 w-4 ${getSentimentColor(feedback.sentiment)}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-2">{feedback.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{feedback.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>

        <TabsContent value="neutral" className="space-y-4">
          {filteredFeedback
            .filter(feedback => feedback.sentiment === 'neutral')
            .map((feedback) => {
              const SentimentIcon = getSentimentIcon(feedback.sentiment);
              return (
                <Card key={`neutral-${feedback.id}`} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={feedback.user.avatar} />
                          <AvatarFallback>{feedback.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{feedback.user.name}</p>
                            <Badge variant="outline" className="text-xs">{feedback.user.plan} Plan</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(feedback.rating)}
                            <span className="text-sm text-muted-foreground">({feedback.rating}/5)</span>
                          </div>
                        </div>
                      </div>
                      <SentimentIcon className={`h-4 w-4 ${getSentimentColor(feedback.sentiment)}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-2">{feedback.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{feedback.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>

        <TabsContent value="negative" className="space-y-4">
          {filteredFeedback
            .filter(feedback => feedback.sentiment === 'negative')
            .map((feedback) => {
              const SentimentIcon = getSentimentIcon(feedback.sentiment);
              return (
                <Card key={`negative-${feedback.id}`} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={feedback.user.avatar} />
                          <AvatarFallback>{feedback.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{feedback.user.name}</p>
                            <Badge variant="outline" className="text-xs">{feedback.user.plan} Plan</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(feedback.rating)}
                            <span className="text-sm text-muted-foreground">({feedback.rating}/5)</span>
                          </div>
                        </div>
                      </div>
                      <SentimentIcon className={`h-4 w-4 ${getSentimentColor(feedback.sentiment)}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium mb-2">{feedback.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{feedback.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>
      </Tabs>

      {/* Sentiment Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Smile className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Positive Feedback</p>
                <p className="text-xl font-semibold">{feedbackMetrics.positivePercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Meh className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Neutral Feedback</p>
                <p className="text-xl font-semibold">{feedbackMetrics.neutralPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Frown className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Negative Feedback</p>
                <p className="text-xl font-semibold">{feedbackMetrics.negativePercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}