// Vercel Serverless Function: AI C-Guru Debugger (Gemini 2.5 Flash)
import { GoogleGenAI } from '@google/genai';
import { applyCorsAndSecurityHeaders, sanitizeMongoInput } from '../../src/utils/serverSecurity';

const ai = new GoogleGenAI({});

export default async function handler(req: any, res: any) {
  applyCorsAndSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const body = sanitizeMongoInput(req.body || {});
    const { code, compilerOutput, lang = 'hi' } = body;

    if (!code) {
      return res.status(400).json({ success: false, error: 'C Code is required for debugging.' });
    }

    const isHi = lang === 'hi';
    const systemPrompt = `You are "C-Guru AI Code Debugger & Compiler Diagnostics Expert".
Analyze the user's C program and compiler error output.
Identify the exact line(s) causing the bug, explain WHY the error happened (segmentation fault, undefined behavior, buffer overflow, syntax error), provide the exact corrected code, and offer tips to avoid this bug in the future.
Language: ${isHi ? 'Friendly Hindi mixed with English C keywords' : 'Clear English'}.`;

    const userPrompt = `Here is my C code:
\`\`\`c
${code}
\`\`\`

Compiler output / Error message:
\`\`\`
${compilerOutput || 'None provided. Please inspect for logical bugs, memory leaks, and pointer errors.'}
\`\`\``;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3
      }
    });

    return res.json({
      success: true,
      debugAdvice: response.text || 'No diagnosis available.'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
