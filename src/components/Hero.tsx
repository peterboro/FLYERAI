import React from 'react';
import { Wand2, Layout, Download } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Create Professional Flyers with AI
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Transform your ideas into stunning flyer designs in seconds. Powered by AI, designed by you.
      </p>
      <button
        onClick={onGetStarted}
        className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
      >
        <Wand2 className="h-5 w-5" />
        <span>Start Designing</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
          <Wand2 className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
          <p className="text-gray-600">Generate professional designs instantly with AI assistance</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
          <Layout className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Customizable</h3>
          <p className="text-gray-600">Fine-tune every aspect of your design with our editor</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
          <Download className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
          <p className="text-gray-600">Download your designs in multiple formats</p>
        </div>
      </div>
    </div>
  );
}