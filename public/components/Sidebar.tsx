
import React from 'react';
import type { Suite, Tool, PlanName, ToolSuiteId } from '../types';
import { HomeIcon, LockIcon } from './Icons';
import { basicSuiteIds, creatorSuiteIds, proSuiteIds } from '../constants';

interface SidebarProps {
  suites: Suite[];
  tools: Tool[];
  selectedTool: Tool | null;
  onSelectTool: (tool: Tool | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activePlan: PlanName;
}

const isToolAvailable = (suiteId: ToolSuiteId, plan: PlanName): boolean => {
    if (plan === 'Pro') return true;
    if (plan === 'Creator') return basicSuiteIds.includes(suiteId) || creatorSuiteIds.includes(suiteId);
    if (plan === 'Basic') return basicSuiteIds.includes(suiteId);
    return false;
};

const Sidebar: React.FC<SidebarProps> = ({ suites, tools, selectedTool, onSelectTool, isOpen, setIsOpen, activePlan }) => {
  return (
    <aside className={`bg-gray-900 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} p-4 border-b border-gray-700 h-16`}>
        {isOpen && (
            <div 
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer"
                onClick={() => onSelectTool(null)} // Reset to welcome screen
            >
                CreatorOS
            </div>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-4">
        {!isOpen && (
            <div className="text-center">
                <button
                    onClick={() => onSelectTool(null)}
                    className={`p-3 rounded-md transition-colors duration-150 ${
                        !selectedTool ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                    }`}
                    aria-label="Home"
                    title="Home"
                >
                    <HomeIcon />
                </button>
            </div>
        )}
        {suites.map((suite) => (
          <div key={suite.id}>
            <h3 className={`px-3 text-xs font-semibold uppercase text-gray-400 tracking-wider ${!isOpen ? 'text-center' : ''}`}>
              {isOpen ? suite.name : <div className="my-3">{suite.icon}</div>}
            </h3>
            {isOpen && <div className="mt-2 space-y-1">
              {tools
                .filter((tool) => tool.suiteId === suite.id)
                .map((tool) => {
                  const isLocked = !isToolAvailable(tool.suiteId, activePlan);
                  return (
                    <a
                      key={tool.id}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isLocked) {
                            onSelectTool(tool);
                        }
                      }}
                      className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                        isLocked 
                          ? 'text-gray-500 cursor-not-allowed'
                          : selectedTool?.id === tool.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{tool.name}</span>
                      {isLocked && <LockIcon />}
                    </a>
                  )
                })}
            </div>}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
