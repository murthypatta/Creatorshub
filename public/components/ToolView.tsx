
import React, { useState, useEffect, useCallback } from 'react';
import type { Tool } from '../types';
import { runGeneration } from '../services/geminiService';
import { CopyIcon, CheckIcon, SparklesIcon, BackArrowIcon } from './Icons';

interface ToolViewProps {
  selectedTool: Tool;
  onGoBack: () => void;
}

const ToolView: React.FC<ToolViewProps> = ({ selectedTool, onGoBack }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setPrompt('');
    setResult('');
    setError(null);
    setIsLoading(false);
  }, [selectedTool]);

  const handleGenerate = useCallback(async () => {
    if (!selectedTool || !prompt.trim()) return;

    setIsLoading(true);
    setResult('');
    setError(null);

    const response = await runGeneration(selectedTool.systemInstruction, prompt);
    
    if (response.startsWith('An error occurred:')) {
      setError(response);
    } else {
      setResult(response);
    }

    setIsLoading(false);
  }, [prompt, selectedTool]);
  
  const handleCopy = () => {
    if(result) {
        navigator.clipboard.writeText(result);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
       <button onClick={onGoBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 self-start transition-colors">
            <BackArrowIcon />
            Back to all tools
        </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">{selectedTool.name}</h1>
        <p className="text-gray-400 mt-1">{selectedTool.description}</p>
      </div>

      <div className="flex-grow flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="prompt" className="mb-2 font-semibold text-gray-300">{selectedTool.promptLabel}</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={selectedTool.promptPlaceholder}
            className="w-full h-40 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-gray-200 resize-none"
            disabled={isLoading}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full sm:w-auto self-start flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon />
              Generate
            </>
          )}
        </button>

        {(error || result || isLoading) && (
            <div className="relative flex-grow min-h-[200px] bg-gray-900 border border-gray-700 rounded-lg p-4 text-gray-200 overflow-y-auto">
                 {result && (
                     <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                         {isCopied ? <CheckIcon /> : <CopyIcon />}
                     </button>
                 )}
                 {isLoading && !result && (
                     <div className="flex items-center justify-center h-full text-gray-400">
                        Thinking...
                    </div>
                 )}
                {error && <pre className="whitespace-pre-wrap font-sans text-red-400">{error}</pre>}
                <pre className="whitespace-pre-wrap font-sans">{result}</pre>
            </div>
        )}
      </div>
    </div>
  );
};

export default ToolView;
