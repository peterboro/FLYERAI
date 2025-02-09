import React from 'react';
import { Download, Edit2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PreviewProps {
  preferences: {
    eventType: string;
    theme: string;
    colors: string[];
    text: string;
  };
  imageUrl: string;
  onEdit: () => void;
  onBack: () => void;
}

export default function Preview({ preferences, imageUrl, onEdit, onBack }: PreviewProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `flyer-${preferences.eventType.toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Design
        </button>
        <div className="flex space-x-4">
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Edit2 className="h-5 w-5 mr-2" />
            Edit Design
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Download className="h-5 w-5 mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="aspect-[1/1.4] bg-gray-100 rounded-lg mb-6 overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Generated flyer design" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Loading preview...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}