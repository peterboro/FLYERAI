import React from 'react';
import { Wand2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wand2 className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">FlyerAI</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              </li>
              <li>
                <a href="#templates" className="text-gray-600 hover:text-gray-900">Templates</a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}