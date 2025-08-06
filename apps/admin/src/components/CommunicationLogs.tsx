"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Send, ChevronRight, Search, Filter, Mail, Bell, MessageSquare, Calendar } from "lucide-react";

const communicationLogs = [
  { id: 1, type: "email", recipient: "sarah.j@email.com", subject: "Welcome to Peak Health", status: "delivered", timestamp: "2024-12-22T10:30:00Z" },
  { id: 2, type: "push", recipient: "All Users", subject: "New Feature: Advanced Analytics", status: "sent", timestamp: "2024-12-22T09:15:00Z" },
  { id: 3, type: "sms", recipient: "+1234567890", subject: "Password Reset Code", status: "delivered", timestamp: "2024-12-21T16:45:00Z" }
];

interface CommunicationLogsProps {
  scopeInfo: any;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'email': return Mail;
    case 'push': return Bell;
    case 'sms': return MessageSquare;
    default: return Send;
  }
};

export function CommunicationLogs({ scopeInfo }: CommunicationLogsProps) {
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
          <h1>Communication Logs</h1>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-xl font-semibold">2,347</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Emails</p>
                <p className="text-xl font-semibold">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Push Notifications</p>
                <p className="text-xl font-semibold">892</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">SMS</p>
                <p className="text-xl font-semibold">221</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input placeholder="Search logs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="push">Push Notification</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {communicationLogs.map((log) => {
          const IconComponent = getTypeIcon(log.type);
          return (
            <Card key={log.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{log.subject}</p>
                      <p className="text-sm text-muted-foreground">To: {log.recipient}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={log.status === 'delivered' ? 'default' : 'secondary'}>
                      {log.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(log.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}