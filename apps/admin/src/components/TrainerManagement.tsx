import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { 
  User,
  Edit,
  Plus,
  Trash2,
  DollarSign,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Target,
  Zap,
  CheckCircle,
  Star,
  Users,
  BookOpen,
  ChevronRight,
  Save,
  X,
  Camera,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Video,
  Monitor,
  Package,
  Repeat,
  Wifi,
  FileText,
  Smartphone
} from "lucide-react";

// Mock trainer data
const mockTrainer = {
  id: 1,
  name: "John Doe",
  email: "john.doe@peakhealth.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  title: "Senior Personal Trainer",
  bio: "Certified personal trainer with over 8 years of experience helping clients achieve their fitness goals. Specializing in strength training, weight loss, and functional movement.",
  location: "New York, NY",
  experience: "8 years",
  rating: 4.9,
  totalClients: 127,
  activeClients: 45,
  completedSessions: 2340,
  socialMedia: {
    website: "https://johndoe-fitness.com",
    instagram: "@johndoe_trainer",
    facebook: "John Doe Fitness",
    twitter: "@johndoetrainer"
  },
  availability: {
    monday: { enabled: true, start: "06:00", end: "20:00" },
    tuesday: { enabled: true, start: "06:00", end: "20:00" },
    wednesday: { enabled: true, start: "06:00", end: "20:00" },
    thursday: { enabled: true, start: "06:00", end: "20:00" },
    friday: { enabled: true, start: "06:00", end: "18:00" },
    saturday: { enabled: true, start: "08:00", end: "16:00" },
    sunday: { enabled: false, start: "", end: "" }
  }
};

const mockServices = [
  {
    id: 1,
    name: "1-on-1 Virtual Training",
    description: "Live personal training session via video call",
    duration: 60,
    price: 75,
    packagePrice: { sessions: 4, price: 280, discount: 7 },
    category: "Personal Training",
    deliveryMethod: "live_video",
    platform: "zoom",
    maxCapacity: 1,
    enabled: true,
    subscriptionOption: false
  },
  {
    id: 2,
    name: "Small Group Virtual Class",
    description: "Interactive group fitness session (2-8 people)",
    duration: 45,
    price: 25,
    packagePrice: { sessions: 8, price: 180, discount: 10 },
    category: "Group Training",
    deliveryMethod: "live_video",
    platform: "zoom",
    maxCapacity: 8,
    enabled: true,
    subscriptionOption: true,
    subscriptionPrice: 89
  },
  {
    id: 3,
    name: "Nutrition Coaching Call",
    description: "Personalized nutrition consultation and meal planning",
    duration: 30,
    price: 50,
    packagePrice: { sessions: 3, price: 135, discount: 10 },
    category: "Nutrition",
    deliveryMethod: "live_video",
    platform: "zoom",
    maxCapacity: 1,
    enabled: true,
    subscriptionOption: false
  },
  {
    id: 4,
    name: "Virtual Fitness Assessment",
    description: "Comprehensive fitness evaluation via video call",
    duration: 90,
    price: 85,
    packagePrice: null,
    category: "Assessment",
    deliveryMethod: "live_video",
    platform: "zoom",
    maxCapacity: 1,
    enabled: true,
    subscriptionOption: false
  },
  {
    id: 5,
    name: "Custom Program Design",
    description: "Personalized workout program with video demos",
    duration: null,
    price: 125,
    packagePrice: null,
    category: "Programming",
    deliveryMethod: "digital_delivery",
    platform: "email",
    maxCapacity: null,
    enabled: true,
    subscriptionOption: false
  },
  {
    id: 6,
    name: "Monthly Coaching Package",
    description: "Complete monthly fitness coaching with weekly check-ins",
    duration: null,
    price: 199,
    packagePrice: null,
    category: "Coaching",
    deliveryMethod: "hybrid",
    platform: "multiple",
    maxCapacity: null,
    enabled: true,
    subscriptionOption: true,
    subscriptionPrice: 199
  }
];

const mockCertifications = [
  {
    id: 1,
    name: "NASM Certified Personal Trainer",
    issuer: "National Academy of Sports Medicine",
    issueDate: "2020-03-15",
    expirationDate: "2024-03-15",
    credentialId: "NASM-CPT-12345"
  },
  {
    id: 2,
    name: "Precision Nutrition Level 1",
    issuer: "Precision Nutrition",
    issueDate: "2021-06-20",
    expirationDate: "2025-06-20",
    credentialId: "PN1-67890"
  },
  {
    id: 3,
    name: "Functional Movement Screen",
    issuer: "Functional Movement Systems",
    issueDate: "2022-01-10",
    expirationDate: "2026-01-10",
    credentialId: "FMS-54321"
  }
];

const specializations = [
  "Weight Loss", "Muscle Building", "Strength Training", "Cardio Training",
  "Functional Movement", "Sports Performance", "Injury Rehabilitation", 
  "Nutrition Coaching", "Senior Fitness", "Youth Training", "Powerlifting",
  "CrossFit", "Yoga", "Pilates", "HIIT Training"
];

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: any;
  onSave: (service: any) => void;
}

function ServiceDialog({ open, onOpenChange, service, onSave }: ServiceDialogProps) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    duration: service?.duration || 60,
    price: service?.price || 0,
    category: service?.category || '',
    deliveryMethod: service?.deliveryMethod || 'live_video',
    platform: service?.platform || 'zoom',
    maxCapacity: service?.maxCapacity || 1,
    enabled: service?.enabled ?? true,
    subscriptionOption: service?.subscriptionOption ?? false,
    subscriptionPrice: service?.subscriptionPrice || 0,
    packageSessions: service?.packagePrice?.sessions || 4,
    packagePrice: service?.packagePrice?.price || 0,
    packageDiscount: service?.packagePrice?.discount || 0
  });

  const handleSubmit = () => {
    const serviceData = {
      ...service,
      ...formData,
      packagePrice: formData.packageSessions && formData.packagePrice ? {
        sessions: formData.packageSessions,
        price: formData.packagePrice,
        discount: formData.packageDiscount
      } : null,
      id: service?.id || Date.now()
    };
    onSave(serviceData);
    onOpenChange(false);
  };

  const categories = ["Personal Training", "Group Training", "Nutrition", "Assessment", "Programming", "Coaching", "Specialty"];
  const deliveryMethods = [
    { value: "live_video", label: "Live Video Call", icon: Video },
    { value: "digital_delivery", label: "Digital Delivery", icon: FileText },
    { value: "hybrid", label: "Hybrid (Video + Digital)", icon: Monitor }
  ];
  const platforms = [
    { value: "zoom", label: "Zoom" },
    { value: "google_meet", label: "Google Meet" },
    { value: "skype", label: "Skype" },
    { value: "teams", label: "Microsoft Teams" },
    { value: "email", label: "Email" },
    { value: "app", label: "Peak Health App" },
    { value: "multiple", label: "Multiple Platforms" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Online Service' : 'Add New Online Service'}</DialogTitle>
          <DialogDescription>
            Configure your online service offering with pricing, delivery method, and package options.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., 1-on-1 Virtual Training"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Detailed description of your online service"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryMethod">Delivery Method</Label>
              <Select value={formData.deliveryMethod} onValueChange={(value) => setFormData({...formData, deliveryMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="How do you deliver this service?" />
                </SelectTrigger>
                <SelectContent>
                  {deliveryMethods.map(method => (
                    <SelectItem key={method.value} value={method.value}>
                      <div className="flex items-center gap-2">
                        <method.icon className="h-4 w-4" />
                        {method.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select value={formData.platform} onValueChange={(value) => setFormData({...formData, platform: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map(platform => (
                    <SelectItem key={platform.value} value={platform.value}>{platform.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration || ''}
                onChange={(e) => setFormData({...formData, duration: e.target.value ? parseInt(e.target.value) : null})}
                placeholder="60 (leave blank for ongoing)"
              />
            </div>
            <div>
              <Label htmlFor="price">Session Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                placeholder="75"
              />
            </div>
            <div>
              <Label htmlFor="maxCapacity">Max Capacity</Label>
              <Input
                id="maxCapacity"
                type="number"
                value={formData.maxCapacity || ''}
                onChange={(e) => setFormData({...formData, maxCapacity: e.target.value ? parseInt(e.target.value) : null})}
                placeholder="1 (leave blank for unlimited)"
              />
            </div>
          </div>

          <Separator />

          {/* Package Pricing */}
          <div>
            <h4 className="font-medium mb-3">Package Options</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="packageSessions">Package Sessions</Label>
                <Input
                  id="packageSessions"
                  type="number"
                  value={formData.packageSessions}
                  onChange={(e) => setFormData({...formData, packageSessions: parseInt(e.target.value)})}
                  placeholder="4"
                />
              </div>
              <div>
                <Label htmlFor="packagePrice">Package Price ($)</Label>
                <Input
                  id="packagePrice"
                  type="number"
                  step="0.01"
                  value={formData.packagePrice}
                  onChange={(e) => setFormData({...formData, packagePrice: parseFloat(e.target.value)})}
                  placeholder="280"
                />
              </div>
              <div>
                <Label htmlFor="packageDiscount">Discount (%)</Label>
                <Input
                  id="packageDiscount"
                  type="number"
                  value={formData.packageDiscount}
                  onChange={(e) => setFormData({...formData, packageDiscount: parseInt(e.target.value)})}
                  placeholder="7"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Subscription Option */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Switch 
                id="subscriptionOption"
                checked={formData.subscriptionOption}
                onCheckedChange={(checked) => setFormData({...formData, subscriptionOption: checked})}
              />
              <Label htmlFor="subscriptionOption">Offer Monthly Subscription</Label>
            </div>
            {formData.subscriptionOption && (
              <div className="w-48">
                <Label htmlFor="subscriptionPrice">Monthly Price ($)</Label>
                <Input
                  id="subscriptionPrice"
                  type="number"
                  step="0.01"
                  value={formData.subscriptionPrice}
                  onChange={(e) => setFormData({...formData, subscriptionPrice: parseFloat(e.target.value)})}
                  placeholder="89"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Switch 
              id="enabled"
              checked={formData.enabled}
              onCheckedChange={(checked) => setFormData({...formData, enabled: checked})}
            />
            <Label htmlFor="enabled">Service Available for Booking</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.name || !formData.category}>
              {service ? 'Update Service' : 'Add Service'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CertificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certification?: any;
  onSave: (certification: any) => void;
}

function CertificationDialog({ open, onOpenChange, certification, onSave }: CertificationDialogProps) {
  const [formData, setFormData] = useState({
    name: certification?.name || '',
    issuer: certification?.issuer || '',
    issueDate: certification?.issueDate || '',
    expirationDate: certification?.expirationDate || '',
    credentialId: certification?.credentialId || ''
  });

  const handleSubmit = () => {
    onSave({ ...certification, ...formData, id: certification?.id || Date.now() });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{certification ? 'Edit Certification' : 'Add New Certification'}</DialogTitle>
          <DialogDescription>
            Add your professional certifications and credentials.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="cert-name">Certification Name</Label>
            <Input
              id="cert-name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., NASM Certified Personal Trainer"
            />
          </div>

          <div>
            <Label htmlFor="issuer">Issuing Organization</Label>
            <Input
              id="issuer"
              value={formData.issuer}
              onChange={(e) => setFormData({...formData, issuer: e.target.value})}
              placeholder="e.g., National Academy of Sports Medicine"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="issue-date">Issue Date</Label>
              <Input
                id="issue-date"
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="exp-date">Expiration Date</Label>
              <Input
                id="exp-date"
                type="date"
                value={formData.expirationDate}
                onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="credential-id">Credential ID</Label>
            <Input
              id="credential-id"
              value={formData.credentialId}
              onChange={(e) => setFormData({...formData, credentialId: e.target.value})}
              placeholder="Optional credential ID number"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.name || !formData.issuer}>
              {certification ? 'Update Certification' : 'Add Certification'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface TrainerManagementProps {
  trainerId?: number;
  onBack?: () => void;
  scopeInfo: any;
  userRole: string;
}

export function TrainerManagement({ trainerId, onBack, scopeInfo, userRole }: TrainerManagementProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [services, setServices] = useState(mockServices);
  const [certifications, setCertifications] = useState(mockCertifications);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [selectedSpecializations, setSelectedSpecializations] = useState([
    "Weight Loss", "Strength Training", "Functional Movement", "Nutrition Coaching"
  ]);
  // Load trainer data based on trainerId, default to mockTrainer for demo
  const [trainerData, setTrainerData] = useState(() => {
    if (trainerId) {
      // In a real app, you would fetch trainer data by ID
      // For demo, we'll use the mockTrainer but could customize based on ID
      return { ...mockTrainer, id: trainerId };
    }
    return mockTrainer;
  });

  const handleSaveService = (service: any) => {
    if (editingService) {
      setServices(services.map(s => s.id === service.id ? service : s));
    } else {
      setServices([...services, service]);
    }
    setEditingService(null);
  };

  const handleSaveCertification = (cert: any) => {
    if (editingCert) {
      setCertifications(certifications.map(c => c.id === cert.id ? cert : c));
    } else {
      setCertifications([...certifications, cert]);
    }
    setEditingCert(null);
  };

  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter(s => s.id !== serviceId));
  };

  const handleDeleteCertification = (certId: number) => {
    setCertifications(certifications.filter(c => c.id !== certId));
  };

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations(prev => 
      prev.includes(spec) 
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    );
  };

  const totalEarnings = services
    .filter(s => s.enabled)
    .reduce((total, service) => total + service.price, 0);

  const averagePrice = services.length > 0 
    ? services.reduce((total, service) => total + service.price, 0) / services.length 
    : 0;

  const subscriptionRevenue = services
    .filter(s => s.enabled && s.subscriptionOption)
    .reduce((total, service) => total + (service.subscriptionPrice || 0), 0);

  const totalPackageDeals = services.filter(s => s.enabled && s.packagePrice).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
          )}
          <h1>{userRole === 'admin' ? 'Trainer Profile Management' : 'My Profile Management'}</h1>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div>
        <p className="text-muted-foreground">
          {userRole === 'admin' 
            ? 'Manage trainer profile, services, pricing, and availability settings.' 
            : 'Manage your profile, services, pricing, and availability settings.'}
        </p>
      </div>

      {/* Trainer Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={trainerData.avatar} alt={trainerData.name} />
                <AvatarFallback>
                  {trainerData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold">{trainerData.name}</h2>
                <Badge variant="default">{trainerData.title}</Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{trainerData.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>{trainerData.totalClients} Total Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <span>{trainerData.activeClients} Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>{trainerData.completedSessions} Sessions</span>
                </div>
              </div>
              
              <p className="text-muted-foreground">{trainerData.bio}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Experience</p>
              <p className="font-semibold">{trainerData.experience}</p>
              <p className="text-sm text-muted-foreground mt-2">Location</p>
              <p className="font-semibold">{trainerData.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Video className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Services</p>
                <p className="text-2xl font-semibold">{services.filter(s => s.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Session Price</p>
                <p className="text-2xl font-semibold">${averagePrice.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Repeat className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-semibold">${subscriptionRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Package Deals</p>
                <p className="text-2xl font-semibold">{totalPackageDeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="services">Services & Pricing</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="specializations">Specializations</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={trainerData.name}
                    onChange={(e) => setTrainerData({...trainerData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={trainerData.title}
                    onChange={(e) => setTrainerData({...trainerData, title: e.target.value})}
                    placeholder="e.g., Senior Personal Trainer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={trainerData.email}
                      onChange={(e) => setTrainerData({...trainerData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={trainerData.phone}
                      onChange={(e) => setTrainerData({...trainerData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={trainerData.location}
                    onChange={(e) => setTrainerData({...trainerData, location: e.target.value})}
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={trainerData.experience}
                    onChange={(e) => setTrainerData({...trainerData, experience: e.target.value})}
                    placeholder="e.g., 8 years"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Bio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={trainerData.bio}
                    onChange={(e) => setTrainerData({...trainerData, bio: e.target.value})}
                    rows={6}
                    placeholder="Tell clients about your background, expertise, and training philosophy..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {trainerData.bio.length}/500 characters
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Social Media Links</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={trainerData.socialMedia.website}
                        onChange={(e) => setTrainerData({
                          ...trainerData, 
                          socialMedia: {...trainerData.socialMedia, website: e.target.value}
                        })}
                        placeholder="https://your-website.com"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={trainerData.socialMedia.instagram}
                        onChange={(e) => setTrainerData({
                          ...trainerData, 
                          socialMedia: {...trainerData.socialMedia, instagram: e.target.value}
                        })}
                        placeholder="@your_instagram"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Facebook className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={trainerData.socialMedia.facebook}
                        onChange={(e) => setTrainerData({
                          ...trainerData, 
                          socialMedia: {...trainerData.socialMedia, facebook: e.target.value}
                        })}
                        placeholder="Your Facebook Page"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <Video className="h-5 w-5" />
                Online Service Offerings
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage your virtual services, pricing packages, and subscription options
              </p>
            </div>
            <Button onClick={() => {
              setEditingService(null);
              setServiceDialogOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Online Service
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {services.map((service) => {
              const getDeliveryIcon = (method: string) => {
                switch (method) {
                  case 'live_video': return Video;
                  case 'digital_delivery': return FileText;
                  case 'hybrid': return Monitor;
                  default: return Video;
                }
              };

              const DeliveryIcon = getDeliveryIcon(service.deliveryMethod);

              return (
                <Card key={service.id} className={!service.enabled ? 'opacity-60' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">
                            {service.category}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <DeliveryIcon className="h-3 w-3" />
                            {service.deliveryMethod === 'live_video' ? 'Live Video' : 
                             service.deliveryMethod === 'digital_delivery' ? 'Digital' : 'Hybrid'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!service.enabled && (
                          <Badge variant="secondary" className="text-xs">Disabled</Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingService(service);
                            setServiceDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    
                    {/* Main pricing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {service.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{service.duration} min</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-lg font-semibold">${service.price}</span>
                        </div>
                        {service.maxCapacity && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Max {service.maxCapacity}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Platform info */}
                    <div className="flex items-center gap-2 text-sm">
                      <Wifi className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Platform:</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {service.platform.replace('_', ' ')}
                      </Badge>
                    </div>

                    {/* Package pricing */}
                    {service.packagePrice && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Package Deal</span>
                          </div>
                          <Badge variant="default" className="text-xs">
                            Save {service.packagePrice.discount}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {service.packagePrice.sessions} sessions for ${service.packagePrice.price}
                        </p>
                      </div>
                    )}

                    {/* Subscription option */}
                    {service.subscriptionOption && (
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Repeat className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Monthly Subscription</span>
                          <span className="text-sm font-semibold">${service.subscriptionPrice}/month</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Certifications & Credentials</h3>
              <p className="text-sm text-muted-foreground">
                Showcase your professional qualifications
              </p>
            </div>
            <Button onClick={() => {
              setEditingCert(null);
              setCertDialogOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingCert(cert);
                          setCertDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteCertification(cert.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issue Date:</span>
                      <span>{new Date(cert.issueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires:</span>
                      <span>{new Date(cert.expirationDate).toLocaleDateString()}</span>
                    </div>
                    {cert.credentialId && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID:</span>
                        <span className="font-mono">{cert.credentialId}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specializations" className="space-y-6">
          <div>
            <h3 className="font-semibold">Areas of Specialization</h3>
            <p className="text-sm text-muted-foreground">
              Select your areas of expertise to help clients find the right trainer
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {specializations.map((spec) => (
              <div
                key={spec}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedSpecializations.includes(spec)
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => toggleSpecialization(spec)}
              >
                <div className="flex items-center gap-2">
                  {selectedSpecializations.includes(spec) && (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm">{spec}</span>
                </div>
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Selected Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedSpecializations.map((spec) => (
                  <Badge key={spec} variant="default" className="flex items-center gap-1">
                    {spec}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => toggleSpecialization(spec)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <div>
            <h3 className="font-semibold">Weekly Availability</h3>
            <p className="text-sm text-muted-foreground">
              Set your available hours for each day of the week
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {Object.entries(trainerData.availability).map(([day, schedule]) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-20">
                      <Label className="capitalize">{day}</Label>
                    </div>
                    <Switch
                      checked={schedule.enabled}
                      onCheckedChange={(checked) => 
                        setTrainerData({
                          ...trainerData,
                          availability: {
                            ...trainerData.availability,
                            [day]: { ...schedule, enabled: checked }
                          }
                        })
                      }
                    />
                    {schedule.enabled && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={schedule.start}
                          onChange={(e) =>
                            setTrainerData({
                              ...trainerData,
                              availability: {
                                ...trainerData.availability,
                                [day]: { ...schedule, start: e.target.value }
                              }
                            })
                          }
                          className="w-32"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={schedule.end}
                          onChange={(e) =>
                            setTrainerData({
                              ...trainerData,
                              availability: {
                                ...trainerData.availability,
                                [day]: { ...schedule, end: e.target.value }
                              }
                            })
                          }
                          className="w-32"
                        />
                      </div>
                    )}
                    {!schedule.enabled && (
                      <span className="text-muted-foreground text-sm">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <ServiceDialog 
        open={serviceDialogOpen}
        onOpenChange={setServiceDialogOpen}
        service={editingService}
        onSave={handleSaveService}
      />
      
      <CertificationDialog 
        open={certDialogOpen}
        onOpenChange={setCertDialogOpen}
        certification={editingCert}
        onSave={handleSaveCertification}
      />
    </div>
  );
}