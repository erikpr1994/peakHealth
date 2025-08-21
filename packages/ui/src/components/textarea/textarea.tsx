import * as React from 'react';
import './textarea.css';

import { cn } from '../../utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Optional error state for the textarea
   */
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    const textareaClasses = cn(
      'peakhealth-textarea',
      error && 'peakhealth-textarea--error',
      className
    );

    return (
      <textarea className={textareaClasses} ref={ref} {...props} />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };

