import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { 
  Megaphone, 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  Clock,
  Users,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  Globe,
  Smartphone
} from "lucide-react";

// Mock announcements data
const announcements = [
  {
    id: 1,
    title: "New Advanced Analytics Dashboard Now Available",
    content: "We're excited to announce the launch of our new Advanced Analytics Dashboard with enhanced insights, custom reports, and predictive analytics for both trainers and users.",
    type: "feature",
    status: "published",
    priority: "high",
    targetAudience: ["all_users"],
    channels: ["in_app", "email", "push"],
    scheduling: {
      publishedAt: "2024-12-22T10:00:00Z",
      scheduledFor: null
    },
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b96b61d4?w=150&h=150&fit=crop&crop=face"
    },
    engagement: {
      views: 15234,
      clicks: 2341,
      dismissals: 234
    },
    isSticky: true,
    expiresAt: null
  },
  {
    id: 2,
    title: "Scheduled Maintenance: December 25, 2024",
    content: "Our platform will undergo scheduled maintenance on December 25th from 2:00 AM to 6:00 AM EST. During this time, some features may be temporarily unavailable.",
    type: "maintenance",
    status: "scheduled",
    priority: "medium",
    targetAudience: ["all_users"],
    channels: ["in_app", "email"],
    scheduling: {
      publishedAt: null,
      scheduledFor: "2024-12-25T07:00:00Z"
    },
    author: {
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    engagement: {
      views: 0,
      clicks: 0,
      dismissals: 0
    },
    isSticky: false,
    expiresAt: "2024-12-26T00:00:00Z"
  },
  {
    id: 3,
    title: "New Corporate Wellness Program Features",
    content: "Enhanced corporate dashboard with team challenges, group analytics, and admin controls for better employee wellness program management.",
    type: "feature",
    status: "draft",
    priority: "medium",
    targetAudience: ["corporate_admins"],
    channels: ["email"],
    scheduling: {
      publishedAt: null,
      scheduledFor: "2024-12-28T09:00:00Z"
    },
    author: {
      name: "Lisa Wong",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    engagement: {
      views: 0,
      clicks: 0,
      dismissals: 0
    },
    isSticky: false,
    expiresAt: null
  },
  {
    id: 4,
    title: "Holiday Pricing: 50% Off Premium Plans",
    content: "Limited time offer! Get 50% off all Premium and Pro plans through January 15th. Upgrade now to access advanced features and personalized training programs.",
    type: "promotion",
    status: "published",
    priority: "high",
    targetAudience: ["basic_users"],
    channels: ["in_app", "email", "push"],
    scheduling: {
      publishedAt: "2024-12-20T00:00:00Z",
      scheduledFor: null
    },
    author: {
      name: "Marketing Team",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
    },
    engagement: {
      views: 28567,
      clicks: 5234,
      dismissals: 892
    },
    isSticky: true,
    expiresAt: "2025-01-15T23:59:59Z"
  }
];

const announcementTypes = [
  { value: "feature", label: "Feature Update", color: "blue" },
  { value: "maintenance", label: "Maintenance", color: "orange" },
  { value: "promotion", label: "Promotion", color: "green" },
  { value: "policy", label: "Policy Update", color: "purple" },
  { value: "alert", label: "Alert", color: "red" }
];

const audiences = [
  { value: "all_users", label: "All Users", count: 18456 },
  { value: "basic_users", label: "Basic Users", count: 12234 },
  { value: "premium_users", label: "Premium Users", count: 4567 },
  { value: "trainers", label: "Trainers", count: 48 },
  { value: "corporate_admins", label: "Corporate Admins", count: 23 }
];

const channels = [
  { value: "in_app", label: "In-App Notification", icon: Smartphone },
  { value: "email", label: "Email", icon: Users },
  { value: "push", label: "Push Notification", icon: Send },
  { value: "sms", label: "SMS", icon: Target }
];

interface PlatformAnnouncementsProps {
  scopeInfo: any;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'default';
    case 'scheduled':
      return 'secondary';
    case 'draft':
      return 'outline';
    case 'expired':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getTypeColor = (type: string) => {
  const typeObj = announcementTypes.find(t => t.value === type);
  return typeObj?.color || 'gray';
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'secondary';
    case 'low':
      return 'outline';
    default:
      return 'outline';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function PlatformAnnouncements({ scopeInfo }: PlatformAnnouncementsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || announcement.type === selectedType;
    const matchesStatus = selectedStatus === "all" || announcement.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Create and manage platform-wide announcements, notifications, and communications to keep users informed.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Mode
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Create a new platform-wide announcement to communicate with users.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="announcement-title">Title</Label>
                      <Input id="announcement-title" placeholder="Announcement title..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="announcement-type">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {announcementTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="announcement-content">Content</Label>
                    <Textarea 
                      id="announcement-content" 
                      placeholder="Announcement content..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="low">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-audience">Target Audience</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          {audiences.map((audience) => (
                            <SelectItem key={audience.value} value={audience.value}>
                              {audience.label} ({audience.count.toLocaleString()})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Delivery Channels</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {channels.map((channel) => {
                        const IconComponent = channel.icon;
                        return (
                          <div key={channel.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                            <Switch id={channel.value} />
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              <Label htmlFor={channel.value} className="text-sm">
                                {channel.label}
                              </Label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="sticky" />
                      <Label htmlFor="sticky">Make sticky (pin to top)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="schedule" />
                      <Label htmlFor="schedule">Schedule for later</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
                    <Input 
                      id="expiry-date" 
                      type="datetime-local"
                      placeholder="Select expiry date..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Save as Draft
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Schedule
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Publish Now
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
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {announcementTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
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
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Announcements</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Announcements List */}
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{announcement.title}</h3>
                      {announcement.isSticky && (
                        <Badge variant="outline" className="text-xs">
                          Sticky
                        </Badge>
                      )}
                      <Badge variant={getStatusColor(announcement.status)} className="text-xs">
                        {announcement.status}
                      </Badge>
                      <Badge variant={getPriorityColor(announcement.priority)} className="text-xs">
                        {announcement.priority} priority
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {announcementTypes.find(t => t.value === announcement.type)?.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {announcement.content}
                    </p>
                    
                    {/* Author and Targeting Info */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={announcement.author.avatar} alt={announcement.author.name} />
                          <AvatarFallback>
                            {announcement.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>By {announcement.author.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {announcement.targetAudience.map(audience => 
                            audiences.find(a => a.value === audience)?.label
                          ).join(", ")}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {announcement.channels.map(channel => {
                          const channelObj = channels.find(c => c.value === channel);
                          const IconComponent = channelObj?.icon || Globe;
                          return (
                            <IconComponent key={channel} className="h-4 w-4 text-muted-foreground" />
                          );
                        })}
                      </div>
                    </div>
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
                    {announcement.scheduling.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Published {formatDate(announcement.scheduling.publishedAt)}</span>
                      </div>
                    )}
                    {announcement.scheduling.scheduledFor && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Scheduled for {formatDate(announcement.scheduling.scheduledFor)}</span>
                      </div>
                    )}
                    {announcement.expiresAt && (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Expires {formatDate(announcement.expiresAt)}</span>
                      </div>
                    )}
                  </div>
                  
                  {announcement.status === 'published' && (
                    <div className="flex items-center gap-4">
                      <span>{announcement.engagement.views.toLocaleString()} views</span>
                      <span>{announcement.engagement.clicks.toLocaleString()} clicks</span>
                      <span>{announcement.engagement.dismissals.toLocaleString()} dismissed</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Announcement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Announcements</p>
                <p className="text-xl font-semibold">{announcements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-xl font-semibold">
                  {announcements.filter(a => a.status === 'published').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-xl font-semibold">
                  {announcements.filter(a => a.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-xl font-semibold">
                  {announcements.reduce((sum, a) => sum + a.engagement.views, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}