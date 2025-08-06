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
import { 
  HeadphonesIcon, 
  Search,
  Plus,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
  Tag,
  ArrowRight,
  Eye,
  Send
} from "lucide-react";

// Mock support tickets data
const supportTickets = [
  {
    id: "TKT-001",
    title: "Unable to sync workout data",
    description: "Workout data from Apple Health not syncing properly since yesterday",
    status: "open",
    priority: "high",
    category: "technical",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b96b61d4?w=150&h=150&fit=crop&crop=face",
      plan: "Premium"
    },
    assignedTo: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    createdAt: "2024-12-22T10:30:00Z",
    updatedAt: "2024-12-22T14:15:00Z",
    responseTime: "3h 45m",
    messages: 4
  },
  {
    id: "TKT-002", 
    title: "Billing question about trainer fees",
    description: "Confused about the additional charges for premium trainer sessions",
    status: "in_progress",
    priority: "medium",
    category: "billing",
    customer: {
      name: "David Wilson",
      email: "d.wilson@company.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      plan: "Corporate"
    },
    assignedTo: {
      name: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    createdAt: "2024-12-22T09:15:00Z",
    updatedAt: "2024-12-22T11:30:00Z",
    responseTime: "2h 15m",
    messages: 2
  },
  {
    id: "TKT-003",
    title: "Feature request: Dark mode for mobile app",
    description: "Would love to have a dark mode option in the mobile application",
    status: "pending",
    priority: "low",
    category: "feature_request",
    customer: {
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      plan: "Basic"
    },
    assignedTo: null,
    createdAt: "2024-12-21T16:45:00Z",
    updatedAt: "2024-12-21T16:45:00Z",
    responseTime: "18h 30m",
    messages: 1
  },
  {
    id: "TKT-004",
    title: "Login issues with corporate SSO",
    description: "Unable to login using company SSO credentials, getting authentication error",
    status: "open",
    priority: "high",
    category: "technical",
    customer: {
      name: "James Mitchell",
      email: "j.mitchell@techcorp.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      plan: "Corporate"
    },
    assignedTo: {
      name: "Alex Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    createdAt: "2024-12-22T08:00:00Z",
    updatedAt: "2024-12-22T12:45:00Z",
    responseTime: "4h 45m",
    messages: 6
  }
];

const ticketCategories = [
  { value: "all", label: "All Categories" },
  { value: "technical", label: "Technical Support" },
  { value: "billing", label: "Billing & Payments" },
  { value: "feature_request", label: "Feature Requests" },
  { value: "account", label: "Account Issues" },
  { value: "general", label: "General Inquiry" }
];

const priorities = [
  { value: "high", label: "High", color: "destructive" },
  { value: "medium", label: "Medium", color: "secondary" },
  { value: "low", label: "Low", color: "outline" }
];

const statuses = [
  { value: "open", label: "Open", color: "destructive" },
  { value: "in_progress", label: "In Progress", color: "secondary" },
  { value: "pending", label: "Pending Customer", color: "outline" },
  { value: "resolved", label: "Resolved", color: "default" }
];

interface SupportTicketingProps {
  scopeInfo: any;
}

const getStatusColor = (status: string) => {
  const statusObj = statuses.find(s => s.value === status);
  return statusObj?.color || 'outline';
};

const getPriorityColor = (priority: string) => {
  const priorityObj = priorities.find(p => p.value === priority);
  return priorityObj?.color || 'outline';
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else if (diffHours > 0) {
    return `${diffHours}h ago`;
  } else {
    return "Just now";
  }
};

export function SupportTicketing({ scopeInfo }: SupportTicketingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ticket.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Manage customer support tickets, track response times, and monitor support team performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Support Ticket</DialogTitle>
                <DialogDescription>
                  Create a new support ticket on behalf of a customer or for internal issues.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-title">Ticket Title</Label>
                    <Input id="ticket-title" placeholder="Brief description of the issue" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Customer Email</Label>
                    <Input id="customer-email" placeholder="customer@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {ticketCategories.slice(1).map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assign-to">Assign To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mike">Mike Chen</SelectItem>
                        <SelectItem value="lisa">Lisa Park</SelectItem>
                        <SelectItem value="alex">Alex Kim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Detailed description of the issue..." rows={4} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Create Ticket
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
            placeholder="Search tickets, customers, or ticket IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ticketCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
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
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Tickets ({filteredTickets.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({filteredTickets.filter(t => t.status === 'open').length})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({filteredTickets.filter(t => t.status === 'in_progress').length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filteredTickets.filter(t => t.status === 'pending').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Support Tickets List */}
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{ticket.title}</h3>
                      <Badge variant={getStatusColor(ticket.status)} className="text-xs">
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant={getPriorityColor(ticket.priority)} className="text-xs">
                        {ticket.priority} priority
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ticket.category.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>
                    
                    {/* Customer and Assignment Info */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ticket.customer.avatar} alt={ticket.customer.name} />
                          <AvatarFallback>
                            {ticket.customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{ticket.customer.name}</p>
                          <p className="text-xs text-muted-foreground">{ticket.customer.plan} Plan</p>
                        </div>
                      </div>
                      
                      {ticket.assignedTo && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} />
                            <AvatarFallback>
                              {ticket.assignedTo.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{ticket.assignedTo.name}</span>
                        </div>
                      )}
                      
                      {!ticket.assignedTo && (
                        <div className="flex items-center gap-2 text-orange-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Unassigned</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Created {formatTimeAgo(ticket.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Response time: {ticket.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{ticket.messages} messages</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Ticket #{ticket.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Other tab contents would filter by status */}
        <TabsContent value="open" className="space-y-4">
          {filteredTickets
            .filter(ticket => ticket.status === 'open')
            .map((ticket) => (
              <div key={ticket.id} className="text-center py-8">
                <p>Open tickets would be displayed here with the same layout as above</p>
              </div>
            ))}
        </TabsContent>
      </Tabs>

      {/* Support Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HeadphonesIcon className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-xl font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-xl font-semibold">2.5h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                <p className="text-xl font-semibold">4.8/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}