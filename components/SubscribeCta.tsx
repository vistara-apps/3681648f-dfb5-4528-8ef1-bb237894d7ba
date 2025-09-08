'use client';

import { SUBSCRIPTION_TIERS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { Crown, Check, Zap } from 'lucide-react';

interface SubscribeCtaProps {
  currentTier?: 'free' | 'premium' | 'pro';
  variant?: 'default';
}

export function SubscribeCta({ currentTier = 'free', variant = 'default' }: SubscribeCtaProps) {
  const handleUpgrade = (tierName: string) => {
    // In a real app, this would integrate with payment processing
    console.log(`Upgrading to ${tierName}`);
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-3">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Unlock Premium Insights
        </h2>
        <p className="text-sm text-gray-300">
          Get unlimited access to advanced financial analysis and predictions
        </p>
      </div>

      <div className="space-y-4">
        {SUBSCRIPTION_TIERS.filter(tier => tier.name !== currentTier).map((tier) => (
          <div
            key={tier.name}
            className={`glass-card p-4 border-2 transition-all duration-200 ${
              tier.name === 'pro' 
                ? 'border-purple-400 bg-purple-500 bg-opacity-10' 
                : 'border-transparent hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  tier.name === 'pro' 
                    ? 'bg-purple-500 bg-opacity-30' 
                    : 'bg-blue-500 bg-opacity-30'
                }`}>
                  {tier.name === 'pro' ? (
                    <Crown className="w-5 h-5 text-purple-300" />
                  ) : (
                    <Zap className="w-5 h-5 text-blue-300" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {formatCurrency(tier.price)}/month
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => handleUpgrade(tier.name)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  tier.name === 'pro'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                }`}
              >
                Upgrade
              </button>
            </div>
            
            <div className="space-y-2">
              {tier.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
            
            {tier.name === 'pro' && (
              <div className="mt-3 p-2 bg-purple-500 bg-opacity-20 rounded-lg">
                <p className="text-xs text-purple-200 text-center">
                  🔥 Most Popular Choice
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Cancel anytime • 7-day free trial • Secure payments
        </p>
      </div>
    </div>
  );
}
