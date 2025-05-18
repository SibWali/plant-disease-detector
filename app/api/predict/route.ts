import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Forward the request to the Python backend
    const pythonBackendUrl = 'http://localhost:8000/predict';
    const response = await fetch(pythonBackendUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Error processing image' },
      { status: 500 }
    );
  }
} 