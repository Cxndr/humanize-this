import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Placeholder: In a real application, you would add your text humanization logic here.
    // For now, we'll just return the original text with a slight modification.
    const humanizedText = `Humanized: ${text}`;

    return NextResponse.json({ humanizedText });
  } catch (error) {
    console.error('Error in humanize API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 