export interface User {
  userId: string;
  farcasterId?: string;
  portfolioSymbols: string[];
  interests: string[];
  subscriptionTier: 'free' | 'premium' | 'pro';
  createdAt: Date;
}

export interface NewsArticle {
  articleId: string;
  title: string;
  url: string;
  source: string;
  publishedAt: Date;
  summary: string;
  sentimentScore: number; // -1 to 1
  keyTakeaways: string[];
  category?: string;
  relevantSymbols?: string[];
}

export interface UserPreference {
  preferenceId: string;
  userId: string;
  type: 'symbol' | 'category' | 'source' | 'notification';
  value: string;
}

export interface UpcomingEvent {
  eventId: string;
  name: string;
  date: Date;
  potentialImpact: 'low' | 'medium' | 'high';
  description?: string;
  affectedSymbols?: string[];
}

export interface SubscriptionTier {
  name: 'free' | 'premium' | 'pro';
  price: number;
  features: string[];
  articlesPerDay: number;
  hasUnlimitedInsights: boolean;
  hasSentimentAnalysis: boolean;
  hasEventPrediction: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
