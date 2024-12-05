import React from 'react';
import { Users, MessageSquare, CheckSquare, TrendingUp } from 'lucide-react';
import { ContactMap } from '../components/ContactMap';

export function AnalyticsPage() {
  const stats = [
    {
      label: 'Total Contacts',
      value: '156',
      change: '+12%',
      icon: Users,
    },
    {
      label: 'Active Conversations',
      value: '28',
      change: '+5%',
      icon: MessageSquare,
    },
    {
      label: 'Tasks Completed',
      value: '64',
      change: '+18%',
      icon: CheckSquare,
    },
    {
      label: 'Engagement Rate',
      value: '72%',
      change: '+7%',
      icon: TrendingUp,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-6 h-6 text-blue-500" />
                <span className="text-green-500 text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mb-8">
        <ContactMap />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Contact Growth</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Task Completion Rate</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  );
}