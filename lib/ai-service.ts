import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateNewsSummary(title: string, content: string): Promise<{
  summary: string;
  keyTakeaways: string[];
  sentimentScore: number;
}> {
  try {
    const prompt = `
    Analyze this financial news article and provide:
    1. A concise 2-sentence summary
    2. 3 key takeaways as bullet points
    3. A sentiment score from -1 (very negative) to 1 (very positive)
    
    Title: ${title}
    Content: ${content}
    
    Respond in JSON format:
    {
      "summary": "...",
      "keyTakeaways": ["...", "...", "..."],
      "sentimentScore": 0.0
    }
    `;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from AI service');

    return JSON.parse(response);
  } catch (error) {
    console.error('AI service error:', error);
    // Fallback to mock data
    return {
      summary: 'Market analysis shows mixed signals with potential for volatility. Investors should monitor key indicators closely.',
      keyTakeaways: ['Market volatility expected', 'Key indicators to watch', 'Mixed market signals'],
      sentimentScore: Math.random() * 2 - 1,
    };
  }
}

export async function generateEventImpactPrediction(eventName: string, eventDate: Date): Promise<{
  prediction: string;
  potentialImpact: 'low' | 'medium' | 'high';
  affectedSectors: string[];
}> {
  try {
    const prompt = `
    Analyze this upcoming financial event and predict its market impact:
    
    Event: ${eventName}
    Date: ${eventDate.toISOString()}
    
    Provide:
    1. A brief prediction of market impact
    2. Impact level (low/medium/high)
    3. List of affected sectors
    
    Respond in JSON format:
    {
      "prediction": "...",
      "potentialImpact": "medium",
      "affectedSectors": ["...", "...", "..."]
    }
    `;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from AI service');

    return JSON.parse(response);
  } catch (error) {
    console.error('AI service error:', error);
    // Fallback to mock data
    return {
      prediction: 'This event may cause moderate market movement based on historical patterns.',
      potentialImpact: 'medium',
      affectedSectors: ['Technology', 'Financial Services', 'Healthcare'],
    };
  }
}
