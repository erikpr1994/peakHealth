'use client';

import { Calendar, Edit, Loader2, Target, Trash2 } from 'lucide-react';
import React from 'react';

import { FeatureFlag } from '../types';

import { categories, formatDate } from '../utils';

import EnvironmentStatusGrid from './EnvironmentStatusGrid';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type Props = {
  flag: FeatureFlag;
  onEdit: (flag: FeatureFlag) => void;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
};

export const FeatureFlagCard: React.FC<Props> = ({
  flag,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-medium">{flag.display_name}</h3>
              <Badge variant="outline" className="text-xs">
                {flag.is_public ? 'Public' : 'Private'}
              </Badge>
              {flag.is_global && (
                <Badge variant="secondary" className="text-xs">
                  Global
                </Badge>
              )}
              {flag.category && (
                <Badge variant="outline" className="text-xs">
                  {categories.find(c => c.value === flag.category)?.label ||
                    flag.category}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {flag.description}
            </p>
            <div className="flex items-center gap-6 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {flag.name}
                </span>
              </div>
            </div>
            <EnvironmentStatusGrid flag={flag} />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="sm" onClick={() => onEdit(flag)}>
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Feature Flag</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{flag.display_name}"? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(flag.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Delete'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created {formatDate(flag.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Updated {formatDate(flag.updated_at)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureFlagCard;
