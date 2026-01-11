import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { UserButton } from '@clerk/clerk-react';
import SmoothCursor from '../components/SmoothCursor/SmoothCursor';

type Project = {
  id: string;
  name: string;
  type: string;
  lastEdited: string;
  status: 'live' | 'draft';
};

type Lead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  stage: 'new' | 'contacted' | 'qualified' | 'meeting-scheduled' | 'proposal-sent' | 'closed-won' | 'closed-lost';
  source: string;
  lastContact: string;
  notes: string;
};

type ViewMode = 'home' | 'crm';
type CRMViewStyle = 'grid' | 'kanban';

export default function AgentDashboard() {
  const [input, setInput] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [crmViewStyle, setCrmViewStyle] = useState<CRMViewStyle>('grid');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const navigate = useNavigate();

  const recentProjects: Project[] = [
    { id: '1', name: 'Dental Practice Receptionist', type: 'Inbound', lastEdited: '2 hours ago', status: 'live' },
    { id: '2', name: 'Real Estate Lead Qualifier', type: 'Outbound', lastEdited: '1 day ago', status: 'draft' },
    { id: '3', name: 'Legal Intake Assistant', type: 'Inbound', lastEdited: '3 days ago', status: 'live' },
  ];

  const leads: Lead[] = [
    { id: '1', name: 'Sarah Mitchell', company: 'TechCorp Solutions', phone: '+44 7700 900123', email: 'sarah.m@techcorp.com', stage: 'meeting-scheduled', source: 'Real Estate Lead Qualifier', lastContact: '2 hours ago', notes: 'Interested in commercial property. Meeting set for Friday 2pm.' },
    { id: '2', name: 'James Wilson', company: 'Wilson & Associates', phone: '+44 7700 900456', email: 'james@wilsonassoc.co.uk', stage: 'qualified', source: 'Real Estate Lead Qualifier', lastContact: '5 hours ago', notes: 'Looking for office space in central London. Budget: £500k-£1M' },
    { id: '3', name: 'Emily Chen', company: 'Startup Labs', phone: '+44 7700 900789', email: 'emily.chen@startuplabs.io', stage: 'proposal-sent', source: 'Real Estate Lead Qualifier', lastContact: '1 day ago', notes: 'Sent proposal for co-working space lease. Awaiting response.' },
    { id: '4', name: 'Michael Brown', company: 'Brown Industries', phone: '+44 7700 900321', email: 'm.brown@brownindustries.com', stage: 'contacted', source: 'Real Estate Lead Qualifier', lastContact: '1 day ago', notes: 'Left voicemail. Expressed interest in warehouse properties.' },
    { id: '5', name: 'Lisa Anderson', company: 'Anderson Consulting', phone: '+44 7700 900654', email: 'l.anderson@andersonconsult.com', stage: 'new', source: 'Real Estate Lead Qualifier', lastContact: '2 days ago', notes: 'New lead from outbound campaign. Not yet contacted.' },
    { id: '6', name: 'David Thompson', company: 'Thompson Ventures', phone: '+44 7700 900987', email: 'david@thompsonvc.com', stage: 'closed-won', source: 'Real Estate Lead Qualifier', lastContact: '3 days ago', notes: 'Deal closed! Purchased 3-story building in Shoreditch.' },
    { id: '7', name: 'Rachel Green', company: 'Green Marketing Ltd', phone: '+44 7700 900135', email: 'rachel@greenmarketing.co.uk', stage: 'closed-lost', source: 'Real Estate Lead Qualifier', lastContact: '1 week ago', notes: 'Decided to go with competitor. Price too high.' },
    { id: '8', name: 'Tom Harris', company: 'Harris & Partners', phone: '+44 7700 900246', email: 't.harris@harrispartners.com', stage: 'qualified', source: 'Real Estate Lead Qualifier', lastContact: '3 hours ago', notes: 'Qualified lead. Needs retail space for new location.' },
  ];

  const stages = [
    { id: 'all', label: 'All Leads', count: leads.length, color: 'bg-white/10' },
    { id: 'new', label: 'New', count: leads.filter(l => l.stage === 'new').length, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'contacted', label: 'Contacted', count: leads.filter(l => l.stage === 'contacted').length, color: 'bg-purple-500/20 text-purple-400' },
    { id: 'qualified', label: 'Qualified', count: leads.filter(l => l.stage === 'qualified').length, color: 'bg-cyan-500/20 text-cyan-400' },
    { id: 'meeting-scheduled', label: 'Meeting Scheduled', count: leads.filter(l => l.stage === 'meeting-scheduled').length, color: 'bg-orange-500/20 text-orange-400' },
    { id: 'proposal-sent', label: 'Proposal Sent', count: leads.filter(l => l.stage === 'proposal-sent').length, color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'closed-won', label: 'Closed Won', count: leads.filter(l => l.stage === 'closed-won').length, color: 'bg-green-500/20 text-green-400' },
    { id: 'closed-lost', label: 'Closed Lost', count: leads.filter(l => l.stage === 'closed-lost').length, color: 'bg-red-500/20 text-red-400' },
  ];

  const filteredLeads = selectedStage === 'all'
    ? leads
    : leads.filter(lead => lead.stage === selectedStage);

  const handleSubmit = () => {
    if (input.trim()) {
      sessionStorage.setItem('initialPrompt', input);
      navigate('/builder');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <SmoothCursor />
      <div className="min-h-screen relative overflow-hidden">
      {/* Shader Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <ShaderGradientCanvas
          style={{ position: 'absolute', inset: 0 }}
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            animate="on"
            brightness={1}
            cAzimuthAngle={0}
            cDistance={2.8}
            cPolarAngle={140}
            cameraZoom={17.3}
            color1="#806663"
            color2="#ca8b5b"
            color3="#212121"
            grain="on"
            lightType="3d"
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.5}
            uFrequency={0}
            uSpeed={0.3}
            uStrength={1.5}
            envPreset="city"
            reflection={0.1}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-56 bg-[#1a1a1a]/95 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <img src="/amplifirm.ai (10).svg" alt="Amplifirm" className="h-6" />
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          <button
            onClick={() => setViewMode('home')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              viewMode === 'home' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>
          <button
            onClick={() => setViewMode('crm')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              viewMode === 'crm' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Leads & CRM
          </button>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </a>

          <div className="pt-5 pb-2">
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider px-3">Projects</span>
          </div>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            All projects
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Starred
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Shared with me
          </a>

          <div className="pt-5 pb-2">
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider px-3">Resources</span>
          </div>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Discover
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
            </svg>
            Templates
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Learn
          </a>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Amplifirm
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm border border-white/10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Upgrade to Pro
          </button>
          <div className="flex items-center gap-3 px-3 py-2">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  rootBox: 'flex items-center',
                  avatarBox: 'w-7 h-7',
                }
              }}
            />
            <span className="text-white/60 text-sm">Account</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-56 min-h-screen px-8 py-12">
        {viewMode === 'home' ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
            <div className="w-full max-w-2xl">
              <h1 className="text-4xl font-medium text-white text-center mb-8">
                What would you like to build?
              </h1>

              {/* Main Input Card */}
              <div className="bg-[#1a1a1a]/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden mb-10">
                <div className="p-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Build an AI receptionist for my dental practice..."
                    className="w-full bg-transparent text-white text-sm placeholder-white/40 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between px-4 pb-3">
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      Attach
                    </button>
                    <button className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                      </svg>
                      Template
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Chat
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-white hover:bg-white/90 text-gray-900 p-2 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Projects */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <button className="text-xs font-medium text-white px-3 py-1.5 bg-white/10 rounded-lg">Recently viewed</button>
                  <button className="text-xs font-medium text-white/50 hover:text-white px-3 py-1.5 hover:bg-white/5 rounded-lg transition-colors">My projects</button>
                  <button className="text-xs font-medium text-white/50 hover:text-white px-3 py-1.5 hover:bg-white/5 rounded-lg transition-colors">Templates</button>
                  <div className="flex-1"></div>
                  <button className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                    Browse all
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {recentProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => navigate('/builder')}
                      className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-[#1a1a1a] transition-all border border-white/5 hover:border-white/10 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          <svg className="w-4 h-4 text-white/50 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        {project.status === 'live' && (
                          <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-full">
                            <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                            Live
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-white text-sm mb-1">{project.name}</h3>
                      <p className="text-xs text-white/40">{project.type} • {project.lastEdited}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* CRM View */
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-medium text-white mb-2">Leads & CRM</h1>
              <p className="text-white/50 text-sm">Manage leads captured by your AI voice agents</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50 text-xs uppercase tracking-wider">Total Leads</span>
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-white">{leads.length}</div>
              </div>
              <div className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50 text-xs uppercase tracking-wider">Active</span>
                  <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-white">{leads.filter(l => ['new', 'contacted', 'qualified', 'meeting-scheduled', 'proposal-sent'].includes(l.stage)).length}</div>
              </div>
              <div className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50 text-xs uppercase tracking-wider">Won</span>
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-white">{leads.filter(l => l.stage === 'closed-won').length}</div>
              </div>
              <div className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50 text-xs uppercase tracking-wider">Conversion</span>
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-white">{Math.round((leads.filter(l => l.stage === 'closed-won').length / leads.length) * 100)}%</div>
              </div>
            </div>

            {/* View Toggle & Stage Pills */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-1">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      selectedStage === stage.id
                        ? `${stage.color} border border-white/20`
                        : 'bg-[#1a1a1a]/40 text-white/60 hover:text-white hover:bg-[#1a1a1a]/60 border border-white/5'
                    }`}
                  >
                    {stage.label}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedStage === stage.id ? 'bg-white/10' : 'bg-white/5'
                    }`}>
                      {stage.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Toggle Buttons */}
              <div className="flex items-center gap-1 bg-[#1a1a1a]/40 p-1 rounded-lg border border-white/5 ml-4">
                <button
                  onClick={() => setCrmViewStyle('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    crmViewStyle === 'grid'
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                  title="Grid View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setCrmViewStyle('kanban')}
                  className={`p-2 rounded-md transition-colors ${
                    crmViewStyle === 'kanban'
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                  title="Kanban View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Grid View */}
            {crmViewStyle === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
                  >
                    {/* Header with avatar and status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center text-white text-base font-semibold">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-base mb-0.5">{lead.name}</h3>
                          <p className="text-white/50 text-sm">{lead.company}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.stage === 'new' ? 'bg-blue-500/20 text-blue-400' :
                        lead.stage === 'contacted' ? 'bg-purple-500/20 text-purple-400' :
                        lead.stage === 'qualified' ? 'bg-cyan-500/20 text-cyan-400' :
                        lead.stage === 'meeting-scheduled' ? 'bg-orange-500/20 text-orange-400' :
                        lead.stage === 'proposal-sent' ? 'bg-yellow-500/20 text-yellow-400' :
                        lead.stage === 'closed-won' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {lead.stage.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-center gap-3 text-white/60 text-sm">
                        <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/60 text-sm">
                        <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{lead.email}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    <p className="text-white/50 text-sm mb-4 line-clamp-2 leading-relaxed">{lead.notes}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {lead.lastContact}
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Kanban View */}
            {crmViewStyle === 'kanban' && (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {stages.filter(s => s.id !== 'all').map((stage) => {
                  const stageLeads = leads.filter(l => l.stage === stage.id);
                  return (
                    <div key={stage.id} className="flex-shrink-0 w-80">
                      {/* Column Header */}
                      <div className="mb-4">
                        <div className={`flex items-center justify-between px-4 py-3 rounded-xl ${stage.color} border border-white/10`}>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-sm">{stage.label}</h3>
                            <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">
                              {stageLeads.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Cards */}
                      <div className="space-y-3">
                        {stageLeads.map((lead) => (
                          <div
                            key={lead.id}
                            className="bg-[#1a1a1a]/60 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                          >
                            {/* Card Header */}
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium text-sm mb-0.5 truncate">{lead.name}</h4>
                                <p className="text-white/50 text-xs truncate">{lead.company}</p>
                              </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center gap-2 text-white/50 text-xs">
                                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="truncate">{lead.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/50 text-xs">
                                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate">{lead.email}</span>
                              </div>
                            </div>

                            {/* Notes */}
                            <p className="text-white/40 text-xs mb-3 line-clamp-2 leading-relaxed">{lead.notes}</p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                              <div className="flex items-center gap-1.5 text-white/30 text-xs">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs">{lead.lastContact}</span>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <button className="p-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded transition-colors">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
    </>
  );
}
