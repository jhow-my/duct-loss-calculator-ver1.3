import React from 'react';
import { FittingCalculator } from './components/FittingCalculator';
import { Calculator } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Duct Loss Calculator</h1>
          </div>
          
          <div className="hidden md:flex items-center text-sm text-slate-500 gap-6">
            <span>ASHRAE-based estimations</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <FittingCalculator />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-slate-400">
          <p>Developed by J.H.WONG</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
