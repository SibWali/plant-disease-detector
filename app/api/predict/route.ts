import { NextRequest, NextResponse } from 'next/server';
import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel | null = null;

async function loadModel() {
  if (!model) {
    try {
      console.log('Loading model...');
      // Initialize backend
      await tf.ready();
      
      // Load model directly from the public directory
      model = await tf.loadLayersModel('/model/model.json');
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }
  }
  return model;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Received prediction request');
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      console.error('No image provided');
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    console.log('Converting image to tensor');
    // Convert the image file to an array buffer
    const buffer = await (image as File).arrayBuffer();
    
    // Create a blob from the buffer and convert it to an image element
    const blob = new Blob([buffer]);
    const imageUrl = URL.createObjectURL(blob);
    const img = new Image();
    
    // Wait for the image to load
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = (e) => reject(new Error('Failed to load image: ' + e));
      img.src = imageUrl;
    });

    console.log('Processing image');
    // Convert the image to a tensor
    const tensor = tf.tidy(() => {
      const pixels = tf.browser.fromPixels(img);
      // Resize to match the model's expected input size
      const resized = tf.image.resizeBilinear(pixels, [128, 128]);
      // Normalize the image
      const normalized = tf.div(resized, 255.0);
      // Add batch dimension
      return normalized.expandDims(0);
    });

    console.log('Loading model');
    // Load the model if not already loaded
    const loadedModel = await loadModel();
    if (!loadedModel) {
      throw new Error('Failed to load model');
    }
    
    console.log('Making prediction');
    // Make prediction
    const predictions = await loadedModel.predict(tensor) as tf.Tensor;
    const data = await predictions.data();
    
    console.log('Raw prediction data:', Array.from(data));
    
    // Get the class with highest probability
    const maxProbability = Math.max(...Array.from(data));
    const predictedClass = Array.from(data).indexOf(maxProbability);

    // Clean up
    tensor.dispose();
    predictions.dispose();
    URL.revokeObjectURL(imageUrl);

    // Disease classes
    const diseases = [
      'Healthy',
      'Bacterial Leaf Blight',
      'Brown Spot',
      'Leaf Blast'
    ];

    const result = {
      prediction: diseases[predictedClass],
      confidence: maxProbability,
      allProbabilities: Array.from(data)
    };
    
    console.log('Prediction result:', result);
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Error processing image: ' + (error as Error).message },
      { status: 500 }
    );
  }
}