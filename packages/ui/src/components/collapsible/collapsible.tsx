'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { forwardRef } from 'react';
import { cn } from '../../utils';
import './collapsible.css';

export interface CollapsibleProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
  className?: string;
  children?: React.ReactNode;
}

const Collapsible = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      className={cn('collapsible', className)}
      data-slot="collapsible"
      {...props}
    />
  );
});
Collapsible.displayName = 'Collapsible';

export interface CollapsibleTriggerProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> {
  className?: string;
  children?: React.ReactNode;
}

const CollapsibleTrigger = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      className={cn('collapsible__trigger', className)}
      data-slot="collapsible-trigger"
      {...props}
    />
  );
});
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export interface CollapsibleContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {
  className?: string;
  children?: React.ReactNode;
}

const CollapsibleContent = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn('collapsible__content', className)}
      data-slot="collapsible-content"
      {...props}
    />
  );
});
CollapsibleContent.displayName = 'CollapsibleContent';

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
