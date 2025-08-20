# PeakHealth Code Splitting and Lazy Loading Standards

This document outlines the standard patterns for implementing code splitting and lazy loading in the PeakHealth codebase. Following these standards ensures optimal performance and user experience.

## Code Splitting Principles

1. **Performance First**: Prioritize performance and user experience
2. **Load on Demand**: Load code only when it's needed
3. **Optimize Initial Load**: Minimize the initial bundle size
4. **Measure Impact**: Measure the impact of code splitting
5. **Progressive Enhancement**: Ensure the application works without JavaScript

## Route-Based Code Splitting

### Next.js App Router

Next.js App Router provides automatic code splitting at the route level:

```
app/
├── page.tsx           # Home page
├── about/
│   └── page.tsx       # About page
├── dashboard/
│   └── page.tsx       # Dashboard page
```

Each page is automatically code-split and loaded on demand.

### Dynamic Imports

Use dynamic imports for route-based code splitting:

```tsx
// app/page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamically import the Dashboard component
const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  loading: () => <Loading />,
});

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
```

## Component-Level Code Splitting

### React.lazy and Suspense

Use React.lazy and Suspense for component-level code splitting:

```tsx
import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

// Lazy load components
const HeavyChart = lazy(() => import('@/components/HeavyChart'));
const DataTable = lazy(() => import('@/components/DataTable'));

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<Loading />}>
        <HeavyChart />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <DataTable />
      </Suspense>
    </div>
  );
};

export default Dashboard;
```

### Dynamic Imports with Next.js

Use Next.js dynamic imports for component-level code splitting:

```tsx
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Lazy load components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <Loading />,
});

const DataTable = dynamic(() => import('@/components/DataTable'), {
  loading: () => <Loading />,
});

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart />
      <DataTable />
    </div>
  );
};

export default Dashboard;
```

### Conditional Loading

Load components conditionally based on user interaction:

```tsx
import { useState, lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

// Lazy load the modal component
const Modal = lazy(() => import('@/components/Modal'));

const ProductPage = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <h1>Product Page</h1>
      <button onClick={() => setShowModal(true)}>Show Details</button>
      
      {showModal && (
        <Suspense fallback={<Loading />}>
          <Modal onClose={() => setShowModal(false)}>
            <h2>Product Details</h2>
            <p>Detailed information about the product...</p>
          </Modal>
        </Suspense>
      )}
    </div>
  );
};

export default ProductPage;
```

## Library Code Splitting

### Vendor Chunk Splitting

Configure webpack to split vendor chunks:

```js
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Only apply in the client build
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Split vendor chunks
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Get the package name
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              
              // Return a chunk name
              return `vendor.${packageName.replace('@', '')}`;
            },
            priority: 10,
            reuseExistingChunk: true,
          },
          // Split common chunks
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
};
```

### Import Cost

Use the "Import Cost" VS Code extension to visualize the size of imported packages:

```tsx
// Large import (avoid if possible)
import { format, addDays, subDays, isAfter, isBefore } from 'date-fns'; // 42.7K

// Better: Import only what you need
import format from 'date-fns/format'; // 7.5K
import addDays from 'date-fns/addDays'; // 1.8K
```

## Lazy Loading Patterns

### Lazy Loading Images

Use Next.js Image component for lazy loading images:

```tsx
import Image from 'next/image';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        loading="lazy"
        placeholder="blur"
        blurDataURL={product.blurDataUrl}
      />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
};
```

### Lazy Loading Iframes

Lazy load iframes:

```tsx
import { useState, useEffect, useRef } from 'react';

const LazyIframe = ({ src, title, ...props }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div ref={ref} className="iframe-container">
      {isIntersecting ? (
        <iframe src={src} title={title} {...props} />
      ) : (
        <div className="iframe-placeholder">Loading...</div>
      )}
    </div>
  );
};
```

### Lazy Loading Lists

Lazy load list items:

```tsx
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const LazyList = ({ items, renderItem, itemHeight = 50, windowSize = 20 }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, clientHeight } = containerRef.current;
      const newStartIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - windowSize / 2
      );
      
      setStartIndex(newStartIndex);
      
      const endIndex = Math.min(
        items.length,
        newStartIndex + windowSize * 2
      );
      
      setVisibleItems(items.slice(newStartIndex, endIndex));
    };
    
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [items, itemHeight, windowSize]);
  
  return (
    <div
      ref={containerRef}
      style={{
        height: '500px',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: `${items.length * itemHeight}px`,
          position: 'relative',
        }}
      >
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: `${(startIndex + index) * itemHeight}px`,
              left: 0,
              right: 0,
              height: `${itemHeight}px`,
            }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Prefetching

### Next.js Link Prefetching

Use Next.js Link component for prefetching:

```tsx
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <Link href="/" prefetch={false}>Home</Link>
      <Link href="/about">About</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
};
```

### Manual Prefetching

Manually prefetch components:

```tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProductList = ({ products }) => {
  const router = useRouter();
  
  // Prefetch the product detail page
  const prefetchProduct = (id) => {
    router.prefetch(`/products/${id}`);
  };
  
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li
            key={product.id}
            onMouseEnter={() => prefetchProduct(product.id)}
          >
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Performance Monitoring

### Lighthouse

Use Lighthouse to measure performance:

- Performance score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

### Web Vitals

Monitor Web Vitals:

```tsx
import { useEffect } from 'react';
import { getCLS, getFID, getLCP } from 'web-vitals';

const reportWebVitals = ({ name, delta, id }) => {
  // Send to analytics
  console.log(name, delta, id);
};

const App = () => {
  useEffect(() => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getLCP(reportWebVitals);
  }, []);
  
  return (
    <div>
      <h1>App</h1>
    </div>
  );
};
```

### Bundle Analyzer

Use the webpack bundle analyzer to visualize bundle size:

```bash
# Install the bundle analyzer
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Next.js config
});

# Run the analyzer
ANALYZE=true npm run build
```

## Best Practices

### Do's

- Use route-based code splitting
- Lazy load heavy components
- Optimize images and media
- Monitor bundle size
- Measure performance impact
- Use prefetching for critical resources
- Implement virtualization for long lists

### Don'ts

- Don't lazy load critical components
- Don't lazy load small components
- Don't lazy load components above the fold
- Don't lazy load without a loading indicator
- Don't over-split the code (too many small chunks)
- Don't ignore performance metrics

## Examples

### Lazy Loading a Modal

```tsx
import { useState, lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

// Lazy load the modal component
const Modal = lazy(() => import('@/components/Modal'));

const ProductPage = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <h1>Product Page</h1>
      <button onClick={() => setShowModal(true)}>Show Details</button>
      
      {showModal && (
        <Suspense fallback={<Loading />}>
          <Modal onClose={() => setShowModal(false)}>
            <h2>Product Details</h2>
            <p>Detailed information about the product...</p>
          </Modal>
        </Suspense>
      )}
    </div>
  );
};

export default ProductPage;
```

### Lazy Loading a Dashboard

```tsx
import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

// Lazy load dashboard components
const UserStats = lazy(() => import('@/components/dashboard/UserStats'));
const ActivityChart = lazy(() => import('@/components/dashboard/ActivityChart'));
const RecentActivity = lazy(() => import('@/components/dashboard/RecentActivity'));

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <div className="dashboard-grid">
        <Suspense fallback={<Loading />}>
          <UserStats />
        </Suspense>
        
        <Suspense fallback={<Loading />}>
          <ActivityChart />
        </Suspense>
        
        <Suspense fallback={<Loading />}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
```

### Lazy Loading Based on Screen Size

```tsx
import { lazy, Suspense, useEffect, useState } from 'react';
import Loading from '@/components/Loading';

// Lazy load components
const MobileView = lazy(() => import('@/components/MobileView'));
const DesktopView = lazy(() => import('@/components/DesktopView'));

const ResponsiveComponent = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  return (
    <Suspense fallback={<Loading />}>
      {isMobile ? <MobileView /> : <DesktopView />}
    </Suspense>
  );
};

export default ResponsiveComponent;
```

