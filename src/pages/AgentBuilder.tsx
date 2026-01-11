import { useState, useEffect } from 'react';
import { UserButton } from '@clerk/clerk-react';
import SmoothCursor from '../components/SmoothCursor/SmoothCursor';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinkingTime?: number;
  suggestions?: string[];
};

type ViewMode = 'preview' | 'flow' | 'config' | 'logs' | 'integrations';

export default function AgentBuilder() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [agentName, setAgentName] = useState('New Voice Agent');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    const initialPrompt = sessionStorage.getItem('initialPrompt') || 'Build me an AI receptionist';

    if (initialPrompt.toLowerCase().includes('dental')) {
      setAgentName('Dental Practice Receptionist');
    } else if (initialPrompt.toLowerCase().includes('real estate')) {
      setAgentName('Real Estate Lead Qualifier');
    } else if (initialPrompt.toLowerCase().includes('receptionist')) {
      setAgentName('AI Receptionist');
    }

    setMessages([
      { id: '1', role: 'user', content: initialPrompt },
    ]);

    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, {
        id: '2',
        role: 'assistant',
        content: `I'll help you build a voice agent! Let me ask a few questions to configure it properly. What type of calls will this agent handle?`,
        thinkingTime: 4,
        suggestions: [
          'Inbound Support',
          'Appointment Booking',
          'Lead Qualification',
          'Outbound Sales'
        ]
      }]);
    }, 1500);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: input }]);
    setInput('');

    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I've updated your agent configuration. You can test it in the Preview tab or check the Conversation Flow to see the call logic.",
        thinkingTime: 2
      }]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: suggestion }]);

    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Perfect! I've configured your agent for ${suggestion.toLowerCase()}. Your voice agent is now ready to test. Click "Start Test Call" in the Preview panel to hear it in action.`,
        thinkingTime: 3
      }]);
    }, 1500);
  };

  const handleTestCall = () => {
    setIsCalling(true);
    setTimeout(() => setIsCalling(false), 5000);
  };

  const tabs = [
    { id: 'preview', label: 'Preview', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )},
    { id: 'flow', label: 'Flow', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )},
    { id: 'config', label: 'Config', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { id: 'logs', label: 'Logs', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )},
    { id: 'integrations', label: 'Integrations', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    )},
  ];

  const renderContent = () => {
    switch (viewMode) {
      case 'preview':
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCalling ? 'bg-green-500/20 animate-pulse' : 'bg-[#1a1a1a] border border-white/10'
              }`}>
                <svg className={`w-12 h-12 ${isCalling ? 'text-green-400' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>

              {isCalling ? (
                <>
                  <h3 className="text-xl font-semibold text-white mb-2">Call in Progress</h3>
                  <p className="text-white/50 text-sm mb-6">Testing your voice agent...</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1 bg-green-400 rounded-full animate-pulse" style={{ height: `${Math.random() * 24 + 8}px`, animationDelay: `${i * 0.1}s` }}></div>
                      ))}
                    </div>
                    <span className="text-green-400 text-sm font-mono">00:03</span>
                  </div>
                  <button
                    onClick={() => setIsCalling(false)}
                    className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all"
                  >
                    End Call
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-white mb-2">Test Your Agent</h3>
                  <p className="text-white/50 text-sm mb-6">Make a test call to hear your AI voice agent in action</p>
                  <button
                    onClick={handleTestCall}
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Test Call
                  </button>
                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                      <div className="text-2xl font-semibold text-white mb-1">&lt;400ms</div>
                      <div className="text-white/40 text-xs">Response Time</div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                      <div className="text-2xl font-semibold text-green-400 mb-1">~1.5p</div>
                      <div className="text-white/40 text-xs">Per Minute</div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                      <div className="text-2xl font-semibold text-white mb-1">93%</div>
                      <div className="text-white/40 text-xs">Cost Savings</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 'flow':
        return (
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-white font-medium mb-6 text-sm">Conversation Flow</h3>
              <div className="space-y-4">
                {[
                  { title: 'Incoming Call', desc: 'Play greeting and identify caller intent', color: 'bg-green-500/20 text-green-400', status: 'active' },
                  { title: 'Intent Classification', desc: 'AI determines: booking, inquiry, or transfer', color: 'bg-blue-500/20 text-blue-400', status: 'ready' },
                  { title: 'Information Gathering', desc: 'Collect required details for the request', color: 'bg-purple-500/20 text-purple-400', status: 'ready' },
                  { title: 'Action Execution', desc: 'Book appointment, answer FAQ, or route call', color: 'bg-orange-500/20 text-orange-400', status: 'ready' },
                  { title: 'Confirmation', desc: 'Summarize and confirm with caller', color: 'bg-teal-500/20 text-teal-400', status: 'ready' },
                ].map((step, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center text-sm font-medium shrink-0`}>
                        {i + 1}
                      </div>
                      <div className="flex-1 bg-[#1a1a1a] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-white text-sm font-medium">{step.title}</div>
                          {step.status === 'active' && (
                            <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                        <div className="text-white/40 text-xs">{step.desc}</div>
                      </div>
                    </div>
                    {i < 4 && <div className="w-px h-4 bg-white/10 ml-5"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'config':
        return (
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="text-white font-medium mb-4 text-sm">Voice Settings</h3>
                <div className="bg-[#1a1a1a] border border-white/5 rounded-xl divide-y divide-white/5">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <div className="text-white text-sm">Voice Model</div>
                      <div className="text-white/40 text-xs">ElevenLabs Turbo v2</div>
                    </div>
                    <button className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <div className="text-white text-sm">Voice Style</div>
                      <div className="text-white/40 text-xs">Professional Female (UK)</div>
                    </div>
                    <button className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <span className="text-white text-sm">Speaking Rate</span>
                    <div className="flex items-center gap-3">
                      <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-24 accent-white" />
                      <span className="text-white/50 text-xs w-8">1.0x</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-4 text-sm">Greeting Message</h3>
                <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
                  <textarea
                    defaultValue="Hello, thank you for calling. How can I help you today?"
                    className="w-full bg-transparent text-white text-sm focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-4 text-sm">Business Hours</h3>
                <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Monday - Friday</span>
                    <span className="text-white text-sm">9:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-white font-medium mb-6 text-sm">Recent Calls</h3>
              <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 text-xs text-white/40">
                  <span>Time</span>
                  <span>Duration</span>
                  <span>Type</span>
                  <span>Outcome</span>
                  <span>Cost</span>
                </div>
                {[
                  { time: '2 min ago', duration: '3:42', type: 'Booking', outcome: 'Completed', cost: '5.6p' },
                  { time: '15 min ago', duration: '1:18', type: 'Inquiry', outcome: 'Answered', cost: '2.0p' },
                  { time: '1 hour ago', duration: '5:21', type: 'Booking', outcome: 'Transferred', cost: '8.0p' },
                  { time: '2 hours ago', duration: '0:45', type: 'Inquiry', outcome: 'Answered', cost: '1.1p' },
                ].map((log, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] cursor-pointer transition-colors">
                    <span className="text-white/60 text-sm">{log.time}</span>
                    <span className="text-white text-sm font-mono">{log.duration}</span>
                    <span className="text-white/60 text-sm">{log.type}</span>
                    <span className={`text-sm ${log.outcome === 'Completed' ? 'text-green-400' : log.outcome === 'Transferred' ? 'text-orange-400' : 'text-blue-400'}`}>{log.outcome}</span>
                    <span className="text-white/40 text-sm">{log.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-white font-medium mb-6 text-sm">Connected Services</h3>
              <div className="space-y-3">
                {[
                  { name: 'Google Calendar', desc: 'Sync appointments automatically', connected: true, icon: '📅' },
                  { name: 'Salesforce', desc: 'Log calls to CRM', connected: false, icon: '☁️' },
                  { name: 'Slack', desc: 'Get call notifications', connected: true, icon: '💬' },
                  { name: 'Zapier', desc: 'Connect to 5000+ apps', connected: false, icon: '⚡' },
                  { name: 'HubSpot', desc: 'Sync contacts and deals', connected: false, icon: '🔗' },
                ].map((integration, i) => (
                  <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-xl">
                        {integration.icon}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{integration.name}</div>
                        <div className="text-white/40 text-xs">{integration.desc}</div>
                      </div>
                    </div>
                    <button className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                      integration.connected
                        ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                        : 'text-white/50 hover:text-white border border-white/10 hover:bg-white/5'
                    }`}>
                      {integration.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <SmoothCursor />
      <div className="h-screen bg-[#0f0f0f] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-[#0f0f0f] border-b border-white/[0.08] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/amplifirm.ai (10).svg" alt="Amplifirm" className="h-5 opacity-90" />
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-white/90 text-sm font-medium">{agentName}</span>
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span className="text-white/30 text-xs ml-1">Draft</span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center bg-[#1a1a1a] rounded-lg p-1">
            {tabs.map((tab) => (
              <div key={tab.id} className="relative">
                <button
                  onClick={() => setViewMode(tab.id as ViewMode)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-2 ${
                    viewMode === tab.id
                      ? 'bg-[#2a2a2a] text-white'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {tab.icon}
                  {viewMode === tab.id && <span className="text-xs font-medium">{tab.label}</span>}
                </button>
                {hoveredTab === tab.id && viewMode !== tab.id && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-gray-900 text-xs rounded whitespace-nowrap z-50 shadow-lg">
                    {tab.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                rootBox: 'flex items-center',
                avatarBox: 'w-6 h-6',
              }
            }}
          />
          <button className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-[10px] text-white font-medium">A</div>
            Share
          </button>
          <button className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Upgrade
          </button>
          <button className="bg-white hover:bg-white/90 text-gray-900 text-xs font-medium px-4 py-1.5 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
            Publish
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Chat */}
        <div className="w-[400px] border-r border-white/[0.08] flex flex-col bg-[#0f0f0f]">
          <div className="flex-1 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="px-5 py-4">
                {message.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-[#2a2a2a] text-white px-4 py-2.5 rounded-2xl text-sm max-w-[85%]">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {message.thinkingTime && (
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Thought for {message.thinkingTime}s
                      </div>
                    )}
                    <div className="text-white/80 text-[15px] leading-relaxed">
                      {message.content}
                    </div>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1.5 text-xs text-white/70 bg-[#1a1a1a] border border-white/10 rounded-full hover:border-white/20 hover:text-white transition-all"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl px-3 py-2.5 border border-white/[0.08]">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Amplifirm..."
                className="flex-1 bg-transparent text-white text-sm placeholder-white/30 focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="p-1.5 bg-white text-gray-900 rounded-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 bg-[#161616] flex flex-col">
          {renderContent()}
        </div>
      </div>
    </div>
    </>
  );
}
