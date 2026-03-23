import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface CaptionRequest {
  platform: string;
  category: string;
  theme: string;
  tone: string;
  language: string;
  targetAudience: string;
  keywords: string;
  objective: string;
  length: string;
  count: number;
}

export interface CaptionResponse {
  captions: string[];
  hashtags: string[];
}

export async function generateCaptions(req: CaptionRequest): Promise<CaptionResponse> {
  const prompt = `
    Gere ${req.count} legendas para a plataforma ${req.platform}.
    Categoria: ${req.category}
    Tema: ${req.theme}
    Tom de voz: ${req.tone}
    Idioma: ${req.language}
    Público-alvo: ${req.targetAudience}
    Palavras-chave: ${req.keywords}
    Objetivo: ${req.objective}
    Comprimento: ${req.length}

    Para cada legenda, inclua emojis apropriados.
    Também sugira uma lista de hashtags relevantes no final.
    Retorne o resultado em formato JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          captions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista de legendas geradas"
          },
          hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista de hashtags sugeridas"
          }
        },
        required: ["captions", "hashtags"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Falha ao gerar legendas");
  
  return JSON.parse(text) as CaptionResponse;
}
