import * as React from 'react';
import './avatar.css';

import { cn } from '../../utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional size of the avatar
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'peakhealth-avatar',
          `peakhealth-avatar--size-${size}`,
          className
        )}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = '', ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={cn('peakhealth-avatar__image', className)}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = 'AvatarImage';

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('peakhealth-avatar__fallback', className)}
        {...props}
      />
    );
  }
);

AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
