# Update Careers, Contact, and Feedback Pages Design

## Overview
This PR updates the design of the careers, contact, and feedback pages in the landing app to match the main landing page's design patterns and improve visual consistency across the site.

## Changes Made

### 🎨 Design Improvements
- **Consistent Design Language**: All pages now use the same gradient background, typography scale, and visual hierarchy
- **CSS Modules**: Replaced Tailwind classes with proper CSS modules following the project's established patterns
- **Visual Hierarchy**: Improved spacing, shadows, and hover effects for better user experience
- **Responsive Design**: Enhanced mobile responsiveness with proper breakpoints

### 📄 Page Updates

#### Careers Page (`/careers`)
- Simplified content by removing "What We're Looking For" and "Our Culture" sections
- Added gradient background with subtle grid pattern
- Improved card layout with hover effects
- Enhanced typography and spacing
- Maintained focus on current status and application process

#### Contact Page (`/contact`)
- Complete redesign to match landing page patterns
- Added gradient background and visual hierarchy
- Improved card-based layout for contact information
- Enhanced email container with hover effects
- Better categorization of contact types

#### Feedback Page (`/feedback`)
- Redesigned to match contact page structure
- Added feedback-specific categories (Feature Requests, Bug Reports, Vote & Discuss)
- Improved "Coming Soon" messaging with better visual presentation
- Consistent styling with other landing pages

### 🛠️ Technical Improvements
- **CSS Modules**: All pages now use `.module.css` files with CSS custom properties
- **Consistent Styling**: Uses the same design tokens and variables as the main landing page
- **Performance**: Optimized CSS with proper scoping and minimal redundancy
- **Accessibility**: Maintained proper contrast ratios and semantic HTML structure

### 📱 Responsive Design
- Mobile-first approach with proper breakpoints
- Optimized layouts for tablet and mobile devices
- Consistent spacing and typography across all screen sizes

## Files Changed
- `apps/landing/src/app/careers/page.tsx`
- `apps/landing/src/app/careers/CareersPage.module.css`
- `apps/landing/src/app/contact/page.tsx`
- `apps/landing/src/app/contact/ContactPage.module.css`
- `apps/landing/src/app/feedback/page.tsx`
- `apps/landing/src/app/feedback/FeedbackPage.module.css`

## Testing
- ✅ All pages render correctly with new design
- ✅ Responsive design works on mobile, tablet, and desktop
- ✅ Hover effects and interactions function properly
- ✅ CSS modules are properly scoped and don't conflict
- ✅ Email links are functional and accessible

## Screenshots
The updated pages now have a consistent, professional appearance that matches the main landing page design, with improved visual hierarchy and user experience.

