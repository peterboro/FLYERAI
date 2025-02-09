import React, { useState } from 'react';
import { Wand2, Download, Palette, Layout, Image as ImageIcon, Type, Eye } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import DesignForm from './components/DesignForm';
import Preview from './components/Preview';
import Editor from './components/Editor';
import { generateDesign } from './lib/openai';
import { supabase } from './lib/supabase';
import { useAuth } from './context/AuthContext';

function App() {
  const [currentStep, setCurrentStep] = useState<'home' | 'design' | 'preview' | 'edit'>('home');
  const [designPreferences, setDesignPreferences] = useState({
    eventType: '',
    theme: '',
    colors: [],
    text: '',
  });
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartDesigning = () => {
    setCurrentStep('design');
  };

  const handleGenerateDesign = async (preferences: typeof designPreferences) => {
    setIsGenerating(true);
    try {
      const prompt = `Create a ${preferences.theme} style flyer for a ${preferences.eventType} event. ${preferences.text}`;
      const imageUrl = await generateDesign(prompt);
      
      setGeneratedImageUrl(imageUrl);
      setDesignPreferences(preferences);
      setCurrentStep('preview');
    } catch (error) {
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      });
      alert(`Failed to generate design: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'home' && (
          <Hero onGetStarted={handleStartDesigning} />
        )}

        {currentStep === 'design' && (
          <DesignForm 
            onSubmit={handleGenerateDesign} 
            isGenerating={isGenerating}
          />
        )}

        {currentStep === 'preview' && (
          <Preview 
            preferences={designPreferences}
            imageUrl={generatedImageUrl}
            onEdit={() => setCurrentStep('edit')}
            onBack={() => setCurrentStep('design')}
          />
        )}

        {currentStep === 'edit' && (
          <Editor 
            preferences={designPreferences}
            onSave={() => setCurrentStep('preview')}
          />
        )}
      </main>
    </div>
  );
}

export default App;