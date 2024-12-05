import React from 'react';
import { Wallet, Infinity, Sparkles, Gift } from 'lucide-react';

export function PremiumPage() {
  const features = [
    {
      icon: Infinity,
      title: 'Unlimited Contacts',
      description: 'Remove the contacts limit and manage your entire network efficiently',
    },
    {
      icon: Sparkles,
      title: 'AI Analytics and Messaging',
      description: 'Leverage AI to analyze conversations and get smart suggestions to revive old contacts',
    },
    {
      icon: Gift,
      title: 'Future Airdrop Rewards',
      description: 'Earn Rolod3x tokens through active participation and engagement',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upgrade to Premium</h1>
        <p className="text-gray-600">Unlock powerful features to supercharge your networking</p>
      </div>

      <div className="grid gap-8 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto font-medium">
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </button>
      </div>
    </div>
  );
}