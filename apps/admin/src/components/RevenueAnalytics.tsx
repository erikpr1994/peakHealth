'use client';

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RevenueAnalyticsProps {
  scopeInfo: {
    scope: string;
    label: string;
    color: string;
  };
}

export const RevenueAnalytics = ({ scopeInfo }: RevenueAnalyticsProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Revenue Analytics</h1>
          <Badge variant="outline">{scopeInfo.label}</Badge>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Revenue Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$124,567</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Recurring Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$89,234</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                +156 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-green-500" />
                -0.8% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Subscription Tier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Premium</span>
                  </div>
                  <span className="text-sm font-medium">$67,890 (54.5%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Pro</span>
                  </div>
                  <span className="text-sm font-medium">$34,567 (27.8%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Basic</span>
                  </div>
                  <span className="text-sm font-medium">$22,110 (17.7%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="text-sm font-medium text-green-600">
                    +12.5%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Month</span>
                  <span className="text-sm font-medium text-green-600">
                    +8.3%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">3 Months Ago</span>
                  <span className="text-sm font-medium text-red-600">
                    -2.1%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">6 Months Ago</span>
                  <span className="text-sm font-medium text-green-600">
                    +15.7%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analytics Description */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Comprehensive revenue tracking and analytics for the platform.
              Monitor subscription revenue, user growth, churn rates, and
              revenue trends across different subscription tiers and time
              periods.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
