'use client';

import { NewsArticle } from '@/lib/types';
import { getSentimentColor, getSentimentLabel } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Lightbulb } from 'lucide-react';

interface InsightSummaryProps {
  articles: NewsArticle[];
  variant?: 'positive' | 'neutral' | 'negative';
}

export function InsightSummary({ articles, variant }: InsightSummaryProps) {
  const averageSentiment = articles.reduce((sum, article) => sum + article.sentimentScore, 0) / articles.length;
  const sentimentColor = getSentimentColor(averageSentiment);
  const sentimentLabel = getSentimentLabel(averageSentiment);
  
  const getSentimentIcon = () => {
    if (averageSentiment > 0.2) return <TrendingUp className="w-5 h-5" />;
    if (averageSentiment < -0.2) return <TrendingDown className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  const getTopCategories = () => {
    const categories = articles.reduce((acc, article) => {
      if (article.category) {
        acc[article.category] = (acc[article.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);
  };

  const getTopSymbols = () => {
    const symbols = articles.reduce((acc, article) => {
      if (article.relevantSymbols) {
        article.relevantSymbols.forEach(symbol => {
          acc[symbol] = (acc[symbol] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(symbols)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([symbol]) => symbol);
  };

  const topCategories = getTopCategories();
  const topSymbols = getTopSymbols();

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-purple-500 bg-opacity-30 rounded-lg">
          <Lightbulb className="w-6 h-6 text-purple-300" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Market Insights</h2>
          <p className="text-sm text-gray-300">Based on {articles.length} recent articles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Overall Sentiment</span>
            <div className={`flex items-center space-x-1 ${sentimentColor}`}>
              {getSentimentIcon()}
            </div>
          </div>
          <div className={`text-lg font-semibold ${sentimentColor}`}>
            {sentimentLabel}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Score: {averageSentiment.toFixed(2)}
          </div>
        </div>

        <div className="metric-card">
          <div className="text-sm text-gray-300 mb-2">Top Categories</div>
          <div className="space-y-1">
            {topCategories.map((category, index) => (
              <div key={category} className="text-sm text-white">
                {index + 1}. {category}
              </div>
            ))}
          </div>
        </div>

        <div className="metric-card">
          <div className="text-sm text-gray-300 mb-2">Most Mentioned</div>
          <div className="flex flex-wrap gap-1">
            {topSymbols.map((symbol) => (
              <span
                key={symbol}
                className="px-2 py-1 bg-blue-500 bg-opacity-30 text-blue-200 text-xs rounded-full"
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-blue-500 bg-opacity-20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-white mb-2">AI Summary</h3>
        <p className="text-sm text-gray-200 leading-relaxed">
          {averageSentiment > 0.2 
            ? "Market sentiment appears optimistic with positive developments across key sectors. Investors are showing confidence in current market conditions."
            : averageSentiment < -0.2
            ? "Market sentiment shows caution with some negative factors affecting investor confidence. Key areas of concern require monitoring."
            : "Market sentiment remains neutral with mixed signals across different sectors. Investors are taking a wait-and-see approach."
          }
        </p>
      </div>
    </div>
  );
}
