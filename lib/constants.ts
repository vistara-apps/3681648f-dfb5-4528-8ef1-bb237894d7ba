import { SubscriptionTier } from './types';

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    name: 'free',
    price: 0,
    features: ['Limited insights', '5 articles per day', 'Basic news feed'],
    articlesPerDay: 5,
    hasUnlimitedInsights: false,
    hasSentimentAnalysis: false,
    hasEventPrediction: false,
  },
  {
    name: 'premium',
    price: 5,
    features: ['Unlimited insights', '20 articles per day', 'Sentiment analysis', 'Personalized feed'],
    articlesPerDay: 20,
    hasUnlimitedInsights: true,
    hasSentimentAnalysis: true,
    hasEventPrediction: false,
  },
  {
    name: 'pro',
    price: 15,
    features: ['All premium features', 'Unlimited articles', 'Event impact prediction', 'Priority support'],
    articlesPerDay: -1, // unlimited
    hasUnlimitedInsights: true,
    hasSentimentAnalysis: true,
    hasEventPrediction: true,
  },
];

export const MOCK_NEWS_ARTICLES = [
  {
    articleId: '1',
    title: 'Federal Reserve Signals Potential Rate Cut in Q2',
    url: 'https://example.com/fed-rate-cut',
    source: 'Financial Times',
    publishedAt: new Date('2024-01-15T10:30:00Z'),
    summary: 'The Federal Reserve indicated a possible interest rate reduction in the second quarter, citing cooling inflation and economic stabilization concerns.',
    sentimentScore: 0.3,
    keyTakeaways: ['Rate cut likely in Q2', 'Inflation cooling', 'Market optimism expected'],
    category: 'Monetary Policy',
    relevantSymbols: ['SPY', 'QQQ', 'TLT'],
  },
  {
    articleId: '2',
    title: 'Tech Earnings Season Shows Mixed Results',
    url: 'https://example.com/tech-earnings',
    source: 'Bloomberg',
    publishedAt: new Date('2024-01-15T08:15:00Z'),
    summary: 'Major technology companies reported varied quarterly results, with cloud services showing strength while consumer hardware segments faced headwinds.',
    sentimentScore: -0.1,
    keyTakeaways: ['Cloud services strong', 'Hardware segment weak', 'Mixed guidance for Q2'],
    category: 'Earnings',
    relevantSymbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN'],
  },
  {
    articleId: '3',
    title: 'Cryptocurrency Market Sees Institutional Adoption Surge',
    url: 'https://example.com/crypto-adoption',
    source: 'CoinDesk',
    publishedAt: new Date('2024-01-15T14:45:00Z'),
    summary: 'Major financial institutions are increasing their cryptocurrency holdings, with several announcing new digital asset services for clients.',
    sentimentScore: 0.7,
    keyTakeaways: ['Institutional adoption rising', 'New crypto services launched', 'Regulatory clarity improving'],
    category: 'Cryptocurrency',
    relevantSymbols: ['BTC', 'ETH', 'COIN'],
  },
];

export const MOCK_UPCOMING_EVENTS = [
  {
    eventId: '1',
    name: 'FOMC Meeting',
    date: new Date('2024-01-31T14:00:00Z'),
    potentialImpact: 'high' as const,
    description: 'Federal Open Market Committee meeting to discuss monetary policy',
    affectedSymbols: ['SPY', 'QQQ', 'TLT', 'DXY'],
  },
  {
    eventId: '2',
    name: 'Apple Earnings Call',
    date: new Date('2024-02-01T17:00:00Z'),
    potentialImpact: 'medium' as const,
    description: 'Q1 2024 earnings report and guidance',
    affectedSymbols: ['AAPL', 'QQQ'],
  },
];

export const PORTFOLIO_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'BTC', 'ETH'];
