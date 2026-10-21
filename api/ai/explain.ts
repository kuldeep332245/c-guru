// Vercel Serverless Function: AI C-Guru Tutor (Gemini 2.5 Flash)
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { topic, code, question, lang = 'hi' } = req.body || {};
    const isHi = lang === 'hi';

    const systemPrompt = `You are "C-Guru AI", an expert and friendly C Programming language tutor for Indian and global engineering students.
Your job is to explain C programming concepts with crystal-clear memory breakdown, pointer diagrams in ASCII, real-life analogies, and best practices.
Language: ${isHi ? 'Hindi mixed with clear English terms (Hinglish/Devanagari)' : 'Clear and friendly English'}.
Always provide clean ANSI C99/C11 code snippets with comments.`;

    const userPrompt = topic
      ? `Explain this C topic in detail with code examples: ${topic}. ${question ? `User specific question: ${question}` : ''}`
      : `Analyze this C code and explain how it works line by line: \n\`\`\`c\n${code}\n\`\`\`\n${question || ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.4
      }
    });

    return res.json({
      success: true,
      answer: response.text || 'No response generated.'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
