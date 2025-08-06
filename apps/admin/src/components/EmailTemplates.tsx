'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Mail, Settings } from 'lucide-react';

interface EmailTemplatesProps {
  scopeInfo: any;
}

export function EmailTemplates({ scopeInfo }: EmailTemplatesProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Badge variant={scopeInfo.color}>
            <Settings className="h-3 w-3 mr-1" />
            {scopeInfo.label}
          </Badge>
          <h1>Email Template Management</h1>
        </div>
        <div className="flex gap-2">
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      <div>
        <p className="text-muted-foreground">
          Create and manage email templates for automated communications and
          marketing campaigns.
        </p>
      </div>

      {/* Placeholder content */}
      <div className="text-center py-12">
        <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3>Email Templates</h3>
        <p className="text-sm text-muted-foreground">
          Email template management functionality coming soon.
        </p>
      </div>
    </div>
  );
}
