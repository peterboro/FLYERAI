import React, { useState } from 'react';
import { Save, Layout, Image as ImageIcon, Type, Palette } from 'lucide-react';

interface EditorProps {
  preferences: {
    eventType: string;
    theme: string;
    colors: string[];
    text: string;
  };
  onSave: () => void;
}

export default function Editor({ preferences, onSave }: EditorProps) {
  const [layout, setLayout] = useState('layout1');
  const [elements, setElements] = useState<Array<{ type: string; content: string }>>([]);
  const [activeElement, setActiveElement] = useState<number | null>(null);
  const [colors, setColors] = useState(preferences.colors);

  const addTextElement = () => {
    setElements([...elements, { type: 'text', content: 'New Text' }]);
  };

  const addImageElement = () => {
    setElements([...elements, { type: 'image', content: 'https://via.placeholder.com/150' }]);
  };

  const updateElement = (index: number, content: string) => {
    const newElements = [...elements];
    newElements[index].content = content;
    setElements(newElements);
  };

  const handleSave = () => {
    // Here you would typically save the edited design
    console.log('Saving design with:', { layout, elements, colors });
    onSave();
  };

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      <div className="w-80 bg-white border-r border-gray-200 p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Layout</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setLayout('layout1')}
                className={`p-2 border rounded ${
                  layout === 'layout1' ? 'border-purple-600' : 'border-gray-200'
                } hover:border-purple-600`}
              >
                <Layout className="h-5 w-5 mx-auto" />
              </button>
              <button 
                onClick={() => setLayout('layout2')}
                className={`p-2 border rounded ${
                  layout === 'layout2' ? 'border-purple-600' : 'border-gray-200'
                } hover:border-purple-600`}
              >
                <Layout className="h-5 w-5 mx-auto" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Elements</h3>
            <div className="space-y-2">
              <button 
                onClick={addTextElement}
                className="w-full flex items-center p-2 text-left border border-gray-200 rounded hover:border-purple-600"
              >
                <Type className="h-5 w-5 mr-2" />
                Add Text
              </button>
              <button 
                onClick={addImageElement}
                className="w-full flex items-center p-2 text-left border border-gray-200 rounded hover:border-purple-600"
              >
                <ImageIcon className="h-5 w-5 mr-2" />
                Add Image
              </button>
              <button 
                onClick={() => setColors([...colors].reverse())}
                className="w-full flex items-center p-2 text-left border border-gray-200 rounded hover:border-purple-600"
              >
                <Palette className="h-5 w-5 mr-2" />
                Change Colors
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div 
            className="aspect-[1/1.4] bg-white rounded-lg shadow-sm p-4"
            style={{ backgroundColor: colors[1], color: colors[0] }}
          >
            {elements.map((element, index) => (
              <div 
                key={index}
                className={`mb-4 ${activeElement === index ? 'ring-2 ring-purple-600' : ''}`}
                onClick={() => setActiveElement(index)}
              >
                {element.type === 'text' ? (
                  <input
                    type="text"
                    value={element.content}
                    onChange={(e) => updateElement(index, e.target.value)}
                    className="w-full bg-transparent focus:outline-none"
                    style={{ color: colors[0] }}
                  />
                ) : (
                  <img 
                    src={element.content} 
                    alt="Uploaded" 
                    className="w-full h-auto"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="fixed bottom-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
      >
        <Save className="h-5 w-5" />
        <span>Save Changes</span>
      </button>
    </div>
  );
}