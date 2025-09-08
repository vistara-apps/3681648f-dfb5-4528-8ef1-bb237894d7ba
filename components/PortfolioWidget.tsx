'use client';

import { useState, useEffect } from 'react';
import { PORTFOLIO_SYMBOLS } from '@/lib/constants';
import { generateMockPrice, generateMockChange, formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface PortfolioHolding {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export function PortfolioWidget() {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Generate mock portfolio data
    const mockHoldings = PORTFOLIO_SYMBOLS.slice(0, 4).map(symbol => {
      const price = generateMockPrice();
      const change = generateMockChange();
      const changePercent = (change / price) * 100;
      
      return {
        symbol,
        price,
        change,
        changePercent,
      };
    });
    
    setHoldings(mockHoldings);
    setTotalValue(mockHoldings.reduce((sum, holding) => sum + holding.price * 10, 0)); // Assume 10 shares each
  }, []);

  const totalChange = holdings.reduce((sum, holding) => sum + holding.change * 10, 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Portfolio</h3>
        </div>
        <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200">
          View All
        </button>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-bold text-white">
          {formatCurrency(totalValue)}
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          totalChange >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {totalChange >= 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>
            {totalChange >= 0 ? '+' : ''}{formatCurrency(totalChange)} ({totalChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {holdings.map((holding) => (
          <div key={holding.symbol} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {holding.symbol.slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {holding.symbol}
                </div>
                <div className="text-xs text-gray-400">
                  10 shares
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-white">
                {formatCurrency(holding.price)}
              </div>
              <div className={`text-xs flex items-center space-x-1 ${
                holding.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {holding.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>
                  {holding.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
