import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  MessageSquare,
  Eye
} from "lucide-react";

const mockSuggestions = [
  {
    id: 1,
    type: "exercise",
    action: "modify",
    itemName: "Barbell Squat",
    submittedBy: "Mike Thompson",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
    description: "Suggest updating the instructions to include more safety details about proper form and breathing technique.",
    currentValue: "Stand with feet shoulder-width apart, lower into squat position...",
    suggestedValue: "Stand with feet shoulder-width apart, engage core, take a deep breath, then lower into squat position keeping knees aligned with toes...",
    category: "Safety Update",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    type: "equipment",
    action: "add",
    itemName: "Resistance Bands Set",
    submittedBy: "Sarah Wilson",
    submittedAt: "2024-01-14T14:20:00Z",
    status: "pending",
    description: "Request to add resistance bands as they're commonly used for rehabilitation and home workouts.",
    suggestedValue: "Elastic resistance bands set with multiple resistance levels - light, medium, heavy. Ideal for strength training, physical therapy, and home workouts.",
    category: "New Equipment",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b96b61d4?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    type: "gym",
    action: "modify",
    itemName: "Downtown Fitness",
    submittedBy: "Alex Rodriguez",
    submittedAt: "2024-01-13T09:15:00Z",
    status: "approved",
    description: "Update gym hours - they now stay open until midnight on weekends.",
    currentValue: "5AM - 11PM",
    suggestedValue: "5AM - 11PM (Mon-Fri), 5AM - 12AM (Sat-Sun)",
    category: "Hours Update",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    approvedBy: "John Doe",
    approvedAt: "2024-01-13T16:45:00Z"
  },
  {
    id: 4,
    type: "exercise",
    action: "add",
    itemName: "Turkish Get-Up",
    submittedBy: "Lisa Chen",
    submittedAt: "2024-01-12T11:00:00Z",
    status: "rejected",
    description: "Add Turkish Get-Up exercise for full-body functional training.",
    suggestedValue: "Complex full-body exercise starting from lying position with kettlebell, transitioning through multiple positions to standing.",
    category: "New Exercise",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rejectedBy: "John Doe",
    rejectedAt: "2024-01-12T18:30:00Z",
    rejectionReason: "Exercise already exists under 'Functional Training' category with different name."
  }
];

interface SuggestionsManagementProps {
  userRole: 'admin' | 'external_trainer';
}

export function SuggestionsManagement({ userRole }: SuggestionsManagementProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");

  const isAdmin = userRole === 'admin';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (suggestion: any) => {
    setSelectedSuggestion(suggestion);
    setIsDetailDialogOpen(true);
  };

  const handleApproveSuggestion = (suggestionId: number) => {
    // In a real app, this would make an API call
    console.log('Approving suggestion:', suggestionId);
    setIsDetailDialogOpen(false);
  };

  const handleRejectSuggestion = (suggestionId: number) => {
    // In a real app, this would make an API call
    console.log('Rejecting suggestion:', suggestionId);
    setIsDetailDialogOpen(false);
  };

  const SuggestionCard = ({ suggestion }: { suggestion: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={suggestion.avatar} alt={suggestion.submittedBy} />
              <AvatarFallback>
                {suggestion.submittedBy.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{suggestion.itemName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                by {suggestion.submittedBy} • {formatDate(suggestion.submittedAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(suggestion.status)}
            <Badge variant={getStatusBadgeVariant(suggestion.status)}>
              {suggestion.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">
            {suggestion.type}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {suggestion.action}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {suggestion.category}
          </Badge>
        </div>
        <p className="text-sm">{suggestion.description}</p>
        
        {suggestion.status === 'approved' && suggestion.approvedBy && (
          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
              <CheckCircle className="h-4 w-4" />
              Approved by {suggestion.approvedBy} on {formatDate(suggestion.approvedAt)}
            </div>
          </div>
        )}

        {suggestion.status === 'rejected' && suggestion.rejectedBy && (
          <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300 mb-1">
              <XCircle className="h-4 w-4" />
              Rejected by {suggestion.rejectedBy} on {formatDate(suggestion.rejectedAt)}
            </div>
            <p className="text-sm text-red-600 dark:text-red-400">{suggestion.rejectionReason}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => handleViewDetails(suggestion)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          {isAdmin && suggestion.status === 'pending' && (
            <>
              <Button 
                size="sm" 
                variant="outline"
                className="text-green-600"
                onClick={() => handleApproveSuggestion(suggestion.id)}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-red-600"
                onClick={() => handleRejectSuggestion(suggestion.id)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const pendingSuggestions = mockSuggestions.filter(s => s.status === 'pending');
  const approvedSuggestions = mockSuggestions.filter(s => s.status === 'approved');
  const rejectedSuggestions = mockSuggestions.filter(s => s.status === 'rejected');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Suggestions Management</h1>
        <p className="text-muted-foreground">
          {isAdmin 
            ? "Review and manage content suggestions from trainers" 
            : "View your submitted suggestions and their status"
          }
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingSuggestions.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedSuggestions.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedSuggestions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingSuggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {approvedSuggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {rejectedSuggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Suggestion Details</DialogTitle>
            <DialogDescription>
              Review the complete details of this content suggestion.
            </DialogDescription>
          </DialogHeader>
          {selectedSuggestion && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedSuggestion.avatar} alt={selectedSuggestion.submittedBy} />
                    <AvatarFallback>
                      {selectedSuggestion.submittedBy.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedSuggestion.submittedBy}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(selectedSuggestion.submittedAt)}</p>
                  </div>
                </div>
                <Badge variant={getStatusBadgeVariant(selectedSuggestion.status)}>
                  {selectedSuggestion.status}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Suggestion</h4>
                <p className="text-sm">{selectedSuggestion.description}</p>
              </div>

              {selectedSuggestion.currentValue && (
                <div>
                  <h4 className="font-medium mb-2">Current Value</h4>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{selectedSuggestion.currentValue}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Suggested Value</h4>
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm">{selectedSuggestion.suggestedValue}</p>
                </div>
              </div>

              {isAdmin && selectedSuggestion.status === 'pending' && (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Admin Response (Optional)</h4>
                    <Textarea 
                      placeholder="Add a note about your decision..."
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleApproveSuggestion(selectedSuggestion.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => handleRejectSuggestion(selectedSuggestion.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}