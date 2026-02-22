
import React from 'react';
import { SUITES, TOOLS, basicSuiteIds, creatorSuiteIds, proSuiteIds } from '../constants';
import type { Tool, PlanName } from '../types';
import { ListCheckIcon, LockIcon } from './Icons';

interface HomePageProps {
  onSelectTool: (tool: Tool) => void;
  activePlan: PlanName;
  setActivePlan: (plan: PlanName) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectTool, activePlan, setActivePlan }) => {
    const plans = [
        {
            name: 'Basic',
            price: '₹499',
            subtitle: 'Free for 15 days, then',
            features: [
                '15-day free trial',
                'Access to all Writing tools',
                '50 generations per month',
                'Standard support'
            ],
        },
        {
            name: 'Creator',
            price: '₹999',
            features: [
                'Everything in Basic, plus:',
                'Video & Social Media suites',
                '200 generations per month',
                'Priority email support',
            ],
            popular: true,
        },
        {
            name: 'Pro',
            price: '₹1999',
            features: [
                'Everything in Creator, plus:',
                'All Advanced & Unique tools',
                'Unlimited generations',
                'Dedicated 24/7 support',
            ],
        }
    ];

    const basicSuites = SUITES.filter(s => basicSuiteIds.includes(s.id));
    const creatorSuites = SUITES.filter(s => creatorSuiteIds.includes(s.id));
    const proSuites = SUITES.filter(s => proSuiteIds.includes(s.id));
    
    const isCreatorUnlocked = activePlan === 'Creator' || activePlan === 'Pro';
    const isProUnlocked = activePlan === 'Pro';

    return (
      <div className="p-8">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to CreatorOS</h1>
            <p className="text-lg text-gray-400 mb-8">Your AI-powered suite for content creation. Select a tool to get started.</p>
        </div>

        {/* Basic Tools */}
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Basic Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {basicSuites.map(suite => (
                    <div key={suite.id} className="bg-gray-900 p-6 rounded-lg flex flex-col">
                        <div className="flex items-center justify-center text-blue-400 mb-4">
                            {suite.icon}
                            <h2 className="text-xl font-semibold ml-3">{suite.name}</h2>
                        </div>
                        <div className="space-y-2">
                            {TOOLS.filter(t => t.suiteId === suite.id).map(tool => (
                                <button 
                                    key={tool.id} 
                                    onClick={() => onSelectTool(tool)}
                                    className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors duration-200"
                                >
                                    {tool.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Creator Tools */}
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Creator Tools {!isCreatorUnlocked && <span className="text-sm bg-purple-600 text-white px-2 py-1 rounded-full ml-2">Upgrade</span>}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creatorSuites.map(suite => (
                    <div key={suite.id} className="bg-gray-900 p-6 rounded-lg flex flex-col">
                        <div className="flex items-center justify-center text-purple-400 mb-4">
                            {suite.icon}
                            <h2 className="text-xl font-semibold ml-3">{suite.name}</h2>
                        </div>
                        <div className="space-y-2">
                            {TOOLS.filter(t => t.suiteId === suite.id).map(tool => (
                                <button 
                                    key={tool.id}
                                    disabled={!isCreatorUnlocked}
                                    onClick={() => isCreatorUnlocked && onSelectTool(tool)}
                                    className={`w-full text-left p-3 bg-gray-800 rounded-md flex items-center justify-between ${
                                        isCreatorUnlocked ? 'hover:bg-gray-700 transition-colors duration-200' : 'text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <span>{tool.name}</span>
                                    {!isCreatorUnlocked && <LockIcon />}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Pro Tools */}
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Pro Tools {!isProUnlocked && <span className="text-sm bg-indigo-600 text-white px-2 py-1 rounded-full ml-2">Upgrade</span>}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proSuites.map(suite => (
                    <div key={suite.id} className="bg-gray-900 p-6 rounded-lg flex flex-col">
                        <div className="flex items-center justify-center text-indigo-400 mb-4">
                            {suite.icon}
                            <h2 className="text-xl font-semibold ml-3">{suite.name}</h2>
                        </div>
                        <div className="space-y-2">
                            {TOOLS.filter(t => t.suiteId === suite.id).map(tool => (
                                <button 
                                    key={tool.id}
                                    disabled={!isProUnlocked}
                                    onClick={() => isProUnlocked && onSelectTool(tool)}
                                    className={`w-full text-left p-3 bg-gray-800 rounded-md flex items-center justify-between ${
                                        isProUnlocked ? 'hover:bg-gray-700 transition-colors duration-200' : 'text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <span>{tool.name}</span>
                                    {!isProUnlocked && <LockIcon />}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Upgrade Your Plan</h2>
            <p className="text-md text-gray-400 mb-10 max-w-2xl mx-auto">Unlock more powerful tools and features to supercharge your content creation workflow.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map(plan => {
                    const isCurrentPlan = activePlan === plan.name;
                    return (
                        <div key={plan.name} className={`relative bg-gray-900 p-8 rounded-xl border ${plan.popular ? 'border-purple-500' : 'border-gray-700'}`}>
                            {plan.popular && <div className="absolute top-0 -translate-y-1/2 px-3 py-1 text-sm font-semibold text-white bg-purple-600 rounded-full">Most Popular</div>}
                            <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                            <div className="mb-6 h-24 flex flex-col justify-center items-center">
                                {(plan as any).subtitle && (
                                    <p className="text-lg text-gray-400">{(plan as any).subtitle}</p>
                                )}
                                <div className="flex items-baseline justify-center">
                                    <span className="text-5xl font-bold">{plan.price}</span>
                                    {plan.price !== 'Free' && (
                                        <span className="text-gray-400">/month</span>
                                    )}
                                </div>
                            </div>
                            <ul className="space-y-3 text-left mb-8">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center">
                                        <ListCheckIcon />
                                        <span className="ml-3 text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => setActivePlan(plan.name as PlanName)}
                                disabled={isCurrentPlan}
                                className={`w-full py-3 font-semibold rounded-lg transition-colors ${isCurrentPlan ? 'bg-gray-700 text-gray-400 cursor-default' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                {isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    );
};

export default HomePage;
