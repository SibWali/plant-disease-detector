'use client';

import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
  const [prediction, setPrediction] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setPrediction('');

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error processing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8 text-nature-800">
          Plant Disease Detector
        </h1>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <ImageUpload onUpload={handleImageUpload} />
          
          {isLoading && (
            <div className="mt-8 flex justify-center">
              <LoadingSpinner />
            </div>
          )}
          
          {prediction && (
            <div className="mt-8 p-4 bg-nature-100 rounded-lg">
              <h2 className="text-xl font-semibold text-nature-800 mb-2">
                Prediction Result:
              </h2>
              <p className="text-nature-700">{prediction}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 