"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Bell, ChevronRight, Search, Plus, Send, Users, Smartphone } from "lucide-react";

interface NotificationManagementProps {
  scopeInfo: any;
}

export function NotificationManagement({ scopeInfo }: NotificationManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Badge variant={scopeInfo.color}>
            <scopeInfo.icon className="h-3 w-3 mr-1" />
            {scopeInfo.label}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <h1>Push Notifications</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Send Notification
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Sent Today</p>
                <p className="text-xl font-semibold">2,341</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
                <p className="text-xl font-semibold">89%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Open Rate</p>
                <p className="text-xl font-semibold">34%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-xl font-semibold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-12">
        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3>Push Notification Management</h3>
        <p className="text-sm text-muted-foreground">
          Create, schedule, and monitor push notifications to engage users across mobile and web platforms.
        </p>
      </div>
    </div>
  );
}