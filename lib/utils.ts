import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getSentimentColor(score: number): string {
  if (score > 0.2) return 'text-green-400';
  if (score < -0.2) return 'text-red-400';
  return 'text-yellow-400';
}

export function getSentimentLabel(score: number): string {
  if (score > 0.2) return 'Positive';
  if (score < -0.2) return 'Negative';
  return 'Neutral';
}

export function getImpactColor(impact: 'low' | 'medium' | 'high'): string {
  switch (impact) {
    case 'high': return 'text-red-400';
    case 'medium': return 'text-yellow-400';
    case 'low': return 'text-green-400';
    default: return 'text-gray-400';
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateMockSentiment(): number {
  return (Math.random() - 0.5) * 2; // Random number between -1 and 1
}

export function generateMockPrice(): number {
  return Math.floor(Math.random() * 1000) + 100;
}

export function generateMockChange(): number {
  return (Math.random() - 0.5) * 20; // Random change between -10 and 10
}
