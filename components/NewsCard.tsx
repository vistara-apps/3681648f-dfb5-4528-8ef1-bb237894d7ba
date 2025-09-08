'use client';

import { NewsArticle } from '@/lib/types';
import { formatDate, getSentimentColor, getSentimentLabel, truncateText } from '@/lib/utils';
import { ExternalLink, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'compact' | 'detailed';
  onClick?: () => void;
}

export function NewsCard({ article, variant = 'compact', onClick }: NewsCardProps) {
  const sentimentColor = getSentimentColor(article.sentimentScore);
  const sentimentLabel = getSentimentLabel(article.sentimentScore);
  
  const getSentimentIcon = () => {
    if (article.sentimentScore > 0.2) return <TrendingUp className="w-4 h-4" />;
    if (article.sentimentScore < -0.2) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  if (variant === 'compact') {
    return (
      <div className="news-card" onClick={onClick}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-medium text-white leading-tight flex-1 mr-2">
            {truncateText(article.title, 80)}
          </h3>
          <div className={`flex items-center space-x-1 ${sentimentColor} flex-shrink-0`}>
            {getSentimentIcon()}
            <span className="text-xs font-medium">{sentimentLabel}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-300 mb-3 leading-relaxed">
          {truncateText(article.summary, 120)}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{article.source}</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
        
        {article.relevantSymbols && article.relevantSymbols.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {article.relevantSymbols.slice(0, 3).map((symbol) => (
              <span
                key={symbol}
                className="px-2 py-1 bg-purple-500 bg-opacity-30 text-purple-200 text-xs rounded-full"
              >
                {symbol}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="news-card">
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg font-semibold text-white leading-tight flex-1 mr-3">
          {article.title}
        </h2>
        <div className={`flex items-center space-x-2 ${sentimentColor} flex-shrink-0`}>
          {getSentimentIcon()}
          <span className="text-sm font-medium">{sentimentLabel}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
        {article.summary}
      </p>
      
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-white mb-2">Key Takeaways:</h4>
          <ul className="space-y-1">
            {article.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <span>•</span>
          <span>{article.source}</span>
        </div>
        <button className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors duration-200">
          <span>Read Full Article</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      
      {article.relevantSymbols && article.relevantSymbols.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.relevantSymbols.map((symbol) => (
            <span
              key={symbol}
              className="px-3 py-1 bg-purple-500 bg-opacity-30 text-purple-200 text-sm rounded-full"
            >
              {symbol}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
