import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';

interface DesignFormProps {
  onSubmit: (preferences: {
    eventType: string;
    theme: string;
    colors: string[];
    text: string;
  }) => void;
  isGenerating: boolean;
}

export default function DesignForm({ onSubmit, isGenerating }: DesignFormProps) {
  const [preferences, setPreferences] = useState({
    eventType: '',
    theme: 'modern',
    colors: ['#6D28D9', '#ffffff'],
    text: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-6">Design Preferences</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <input
            type="text"
            value={preferences.eventType}
            onChange={(e) => setPreferences({ ...preferences, eventType: e.target.value })}
            placeholder="e.g., Concert, Workshop, Conference"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme Style
          </label>
          <select
            value={preferences.theme}
            onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
          >
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="bold">Bold</option>
            <option value="elegant">Elegant</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={preferences.text}
            onChange={(e) => setPreferences({ ...preferences, text: e.target.value })}
            placeholder="Describe your event and any specific design preferences..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent h-32"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
            isGenerating 
              ? 'bg-purple-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white transition-colors`}
        >
          <Wand2 className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating...' : 'Generate Designs'}</span>
        </button>
      </form>
    </div>
  );
}