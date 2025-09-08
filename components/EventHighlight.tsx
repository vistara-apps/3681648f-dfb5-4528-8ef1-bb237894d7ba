'use client';

import { UpcomingEvent } from '@/lib/types';
import { formatDate, getImpactColor } from '@/lib/utils';
import { Calendar, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

interface EventHighlightProps {
  event: UpcomingEvent;
  variant?: 'default';
}

export function EventHighlight({ event, variant = 'default' }: EventHighlightProps) {
  const impactColor = getImpactColor(event.potentialImpact);
  
  const getImpactIcon = () => {
    switch (event.potentialImpact) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <TrendingUp className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTimeUntilEvent = () => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const diffInHours = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.ceil(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

  return (
    <div className="glass-card p-4 hover:bg-opacity-15 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="p-2 bg-orange-500 bg-opacity-30 rounded-lg flex-shrink-0">
            <Calendar className="w-5 h-5 text-orange-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">
              {event.name}
            </h3>
            {event.description && (
              <p className="text-xs text-gray-300 leading-relaxed">
                {event.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-1 flex-shrink-0">
          <div className={`flex items-center space-x-1 ${impactColor}`}>
            {getImpactIcon()}
            <span className="text-xs font-medium capitalize">
              {event.potentialImpact}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            in {getTimeUntilEvent()}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{formatDate(event.date)}</span>
        </div>
      </div>
      
      {event.affectedSymbols && event.affectedSymbols.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {event.affectedSymbols.slice(0, 4).map((symbol) => (
            <span
              key={symbol}
              className="px-2 py-1 bg-orange-500 bg-opacity-30 text-orange-200 text-xs rounded-full"
            >
              {symbol}
            </span>
          ))}
          {event.affectedSymbols.length > 4 && (
            <span className="px-2 py-1 bg-gray-500 bg-opacity-30 text-gray-300 text-xs rounded-full">
              +{event.affectedSymbols.length - 4} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
