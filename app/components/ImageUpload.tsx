'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-nature-500 bg-nature-50' : 'border-nature-300 hover:border-nature-400'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center">
        <svg
          className={`w-12 h-12 mb-4 ${isDragActive ? 'text-nature-500' : 'text-nature-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg text-nature-700 mb-2">
          {isDragActive ? 'Drop the image here' : 'Drag & drop a plant leaf image here'}
        </p>
        <p className="text-sm text-nature-500">or click to select a file</p>
      </div>
    </div>
  );
} 