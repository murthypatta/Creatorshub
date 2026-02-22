
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ToolView from './components/ToolView';
import HomePage from './components/HomePage';
import { SUITES, TOOLS } from './constants';
import type { Tool, PlanName } from './types';

function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activePlan, setActivePlan] = useState<PlanName>('Basic');

  return (
    <div className="flex h-screen bg-gray-800 text-gray-100 font-sans">
      <Sidebar
        suites={SUITES}
        tools={TOOLS}
        selectedTool={selectedTool}
        onSelectTool={setSelectedTool}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        activePlan={activePlan}
      />
      <main className="flex-1 flex flex-col transition-all duration-300 overflow-y-auto">
        {selectedTool ? (
          <ToolView selectedTool={selectedTool} onGoBack={() => setSelectedTool(null)} />
        ) : (
          <HomePage onSelectTool={setSelectedTool} activePlan={activePlan} setActivePlan={setActivePlan} />
        )}
      </main>
    </div>
  );
}

export default App;
