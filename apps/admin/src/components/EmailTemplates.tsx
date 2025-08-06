import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Mail, ChevronRight, Search, Plus, Edit, Eye } from "lucide-react";

const emailTemplates = [
  { id: 1, name: "Welcome Email", subject: "Welcome to Peak Health!", category: "onboarding", lastModified: "2024-12-20" },
  { id: 2, name: "Password Reset", subject: "Reset Your Password", category: "system", lastModified: "2024-12-15" },
  { id: 3, name: "Monthly Progress", subject: "Your Fitness Progress This Month", category: "engagement", lastModified: "2024-12-18" }
];

interface EmailTemplatesProps {
  scopeInfo: any;
}

export function EmailTemplates({ scopeInfo }: EmailTemplatesProps) {
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
          <h1>Email Templates</h1>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="relative">
        <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
        <Input placeholder="Search templates..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emailTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.subject}</p>
                </div>
                <Badge variant="outline">{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Modified {template.lastModified}</p>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}