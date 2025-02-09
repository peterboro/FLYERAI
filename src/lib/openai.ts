import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateDesign(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a professional flyer design with the following details: ${prompt}. Make it visually appealing and suitable for professional use.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid"
    });

    if (!response.data[0]?.url) {
      throw new Error('No image URL returned from OpenAI');
    }

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating design:', error);
    throw new Error(`Failed to generate design: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}