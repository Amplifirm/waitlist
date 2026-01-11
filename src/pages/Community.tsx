import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Users, MessageCircle, BookOpen, Video, Github, Calendar, Star, ExternalLink, Heart, Zap, Code, Award, TrendingUp, Clock, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import SmoothScroll from '../components/SmoothScroll/SmoothScroll';
import SmoothCursor from '../components/SmoothCursor/SmoothCursor';

export default function Community() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'discussions' | 'questions' | 'showcase'>('discussions');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Live activity feed
  const activityFeed = [
    { user: 'Sarah C.', action: 'shared a project', item: 'HIPAA Voice Agent', time: '2m ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { user: 'Mike R.', action: 'answered a question', item: 'How to handle interruptions?', time: '5m ago', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { user: 'Emily W.', action: 'started a discussion', item: 'Best practices for lead qualification', time: '12m ago', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { user: 'David P.', action: 'earned a badge', item: 'Top Contributor', time: '18m ago', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
    { user: 'Lisa C.', action: 'joined the community', item: '', time: '25m ago', avatar: 'https://randomuser.me/api/portraits/women/90.jpg' },
  ];

  const discussions = [
    { title: 'How to build multi-language support?', replies: 23, views: 456, author: 'Alex Kim', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', hot: true },
    { title: 'Best practices for handling call transfers', replies: 15, views: 312, author: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', hot: false },
    { title: 'Integrating with custom CRM systems', replies: 31, views: 589, author: 'Tom Richards', avatar: 'https://randomuser.me/api/portraits/men/46.jpg', hot: true },
    { title: 'Voice cloning quality tips', replies: 8, views: 178, author: 'Sophie Brown', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', hot: false },
  ];

  const resources = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides and API references.',
      link: '#',
      cta: 'Read Docs',
      color: 'from-[#ff5005]/20 to-[#ff5005]/5',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides.',
      link: '#',
      cta: 'Watch Now',
      color: 'from-[#73bfc4]/20 to-[#73bfc4]/5',
    },
    {
      icon: Github,
      title: 'Open Source',
      description: 'SDKs and sample projects.',
      link: '#',
      cta: 'View GitHub',
      color: 'from-[#8da0ce]/20 to-[#8da0ce]/5',
    },
    {
      icon: Code,
      title: 'API Playground',
      description: 'Test APIs in your browser.',
      link: '#',
      cta: 'Try It',
      color: 'from-[#ff810a]/20 to-[#ff810a]/5',
    },
  ];

  const events = [
    {
      title: 'Voice AI Workshop',
      date: 'Jan 15',
      time: '2:00 PM EST',
      type: 'Workshop',
      description: 'Build your first voice agent from scratch.',
      attendees: 124,
      featured: true,
    },
    {
      title: 'Community Office Hours',
      date: 'Jan 18',
      time: '11:00 AM EST',
      type: 'Q&A',
      description: 'Live Q&A with the engineering team.',
      attendees: 89,
      featured: false,
    },
    {
      title: 'IVR Deep Dive',
      date: 'Jan 22',
      time: '1:00 PM EST',
      type: 'Webinar',
      description: 'Enterprise IVR modernization strategies.',
      attendees: 156,
      featured: false,
    },
  ];

  const showcases = [
    {
      company: 'TechStart',
      author: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: '24/7 Support Agent',
      description: 'Reduced response time by 80%',
      stars: 142,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    },
    {
      company: 'MedCare',
      author: 'Dr. James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      title: 'Patient Intake Bot',
      description: 'HIPAA-compliant scheduling',
      stars: 98,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    },
    {
      company: 'PropTech',
      author: 'Emily Watson',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      title: 'Lead Qualifier',
      description: '500+ leads qualified daily',
      stars: 87,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
    },
  ];

  const contributors = [
    { name: 'Alex Kim', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', contributions: 47, rank: 1 },
    { name: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', contributions: 35, rank: 2 },
    { name: 'Tom Richards', avatar: 'https://randomuser.me/api/portraits/men/46.jpg', contributions: 28, rank: 3 },
    { name: 'Sophie Brown', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', contributions: 24, rank: 4 },
    { name: 'Chris Lee', avatar: 'https://randomuser.me/api/portraits/men/62.jpg', contributions: 21, rank: 5 },
    { name: 'Anna Martinez', avatar: 'https://randomuser.me/api/portraits/women/21.jpg', contributions: 19, rank: 6 },
    { name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/85.jpg', contributions: 17, rank: 7 },
    { name: 'Lisa Chen', avatar: 'https://randomuser.me/api/portraits/women/90.jpg', contributions: 15, rank: 8 },
  ];

  const stats = [
    { value: '5,000+', label: 'Community Members', icon: Users },
    { value: '1,200+', label: 'Projects Built', icon: Code },
    { value: '50+', label: 'Countries', icon: TrendingUp },
    { value: '24/7', label: 'Active Support', icon: Clock },
  ];

  const faqs = [
    { q: 'How do I join the community?', a: 'Join our Discord for real-time discussions, or follow us on Twitter and GitHub. All platforms are free.' },
    { q: 'Can I contribute to the docs?', a: 'Yes! Our docs are open source on GitHub. Submit a PR and our team will review it.' },
    { q: 'Are events free?', a: 'All community events, workshops, and office hours are completely free to attend.' },
    { q: 'How can I showcase my project?', a: 'Share in our Discord #showcase channel or submit via the website. Great projects get featured here!' },
  ];

  return (
    <>
      <SmoothCursor />
      
      {/* NAVBAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-5">
          <img 
            src="/amplifirm.ai (9).svg" 
            alt="Amplifirm" 
            className={`h-8 cursor-pointer transition-all duration-500 hover:scale-105 ${scrolled ? '' : 'brightness-0 invert'}`}
            onClick={() => navigate('/')}
          />
          
          <nav 
            className="flex items-center gap-8"
            style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? 'none' : 'auto', transition: 'opacity 0.3s ease' }}
          >
            {['Solutions', 'Enterprise', 'Pricing', 'Community'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  if (item === 'Solutions') navigate('/solutions');
                  else if (item === 'Enterprise') navigate('/enterprise');
                  else if (item === 'Pricing') navigate('/pricing');
                }}
                className={`text-sm font-light tracking-wide transition-all duration-300 hover:translate-y-[-2px] ${
                  item === 'Community' ? 'text-white font-medium' : 'text-white/80 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <SignedOut>
              <button 
                onClick={() => navigate('/sign-in')} 
                className={`text-sm font-light px-5 py-2.5 transition-all duration-300 hover:scale-105 ${
                  scrolled ? 'opacity-0 pointer-events-none' : 'text-white/80 hover:text-white'
                }`}
              >
                Log in
              </button>
            </SignedOut>
            <SignedIn>
              <button 
                onClick={() => navigate('/dashboard')} 
                className={`text-sm font-light px-5 py-2.5 transition-all duration-300 hover:scale-105 ${
                  scrolled ? 'opacity-0 pointer-events-none' : 'text-white/80 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 transition-all duration-300 hover:scale-110"
              style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? 'auto' : 'none' }}
            >
              <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black my-1 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}></span>
            </button>
          </div>
        </div>

        {scrolled && menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-black/10 shadow-lg animate-slideDown">
            <div className="px-8 py-6 space-y-4">
              {['Solutions', 'Enterprise', 'Pricing', 'Community'].map((item) => (
                <button 
                  key={item}
                  onClick={() => { 
                    if (item === 'Solutions') navigate('/solutions');
                    else if (item === 'Enterprise') navigate('/enterprise');
                    else if (item === 'Pricing') navigate('/pricing');
                    setMenuOpen(false);
                  }}
                  className={`block text-sm font-light transition-all duration-300 hover:translate-x-2 ${
                    item === 'Community' ? 'text-black font-medium' : 'text-black/70 hover:text-black'
                  }`}
                >
                  {item}
                </button>
              ))}
              <div className="border-t border-black/10 pt-4">
                <SignedOut>
                  <button onClick={() => { navigate('/sign-in'); setMenuOpen(false); }} className="block text-black/60 hover:text-black text-sm font-light transition-all duration-300 hover:translate-x-2">Log in</button>
                </SignedOut>
                <SignedIn>
                  <button onClick={() => { navigate('/dashboard'); setMenuOpen(false); }} className="block text-black/60 hover:text-black text-sm font-light transition-all duration-300 hover:translate-x-2">Dashboard</button>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </header>

      <SmoothScroll>
        <div className="min-h-screen bg-white">
          {/* HERO SECTION */}
          <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <ShaderGradientCanvas style={{ position: 'absolute', width: '100%', height: '100%' }} fov={45}>
                <ShaderGradient
                  animate="on"
                  brightness={0.8}
                  cAzimuthAngle={270}
                  cDistance={0.5}
                  cPolarAngle={180}
                  cameraZoom={15.1}
                  color1="#73bfc4"
                  color2="#ff810a"
                  color3="#8da0ce"
                  envPreset="city"
                  grain="on"
                  lightType="env"
                  positionX={-0.1}
                  positionY={0}
                  positionZ={0}
                  reflection={0.4}
                  rotationX={0}
                  rotationY={130}
                  rotationZ={70}
                  type="sphere"
                  uAmplitude={3.2}
                  uDensity={0.8}
                  uFrequency={5.5}
                  uSpeed={0.3}
                  uStrength={0.3}
                  wireframe={false}
                />
              </ShaderGradientCanvas>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fadeInUp">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/90 text-sm font-light">5,247 developers online now</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.1] tracking-tight animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    Build with the <span className="text-[#ff5005] font-medium">community</span>
                  </h1>
                  
                  <p className="text-xl text-white/70 mb-10 leading-relaxed font-light animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    Connect with thousands of developers building the future of voice AI. 
                    Get help, share projects, and learn from the best.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    <a 
                      href="#"
                      className="group bg-[#ff5005] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#e64804] flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Join Discord
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <a 
                      href="#"
                      className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-base font-light hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                    >
                      <Github className="w-5 h-5" />
                      Star on GitHub
                    </a>
                  </div>

                  {/* Contributor Avatars */}
                  <div className="flex items-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <div className="flex -space-x-3">
                      {contributors.slice(0, 5).map((c, i) => (
                        <img 
                          key={i}
                          src={c.avatar}
                          alt={c.name}
                          className="w-10 h-10 rounded-full border-2 border-white/20 hover:scale-110 hover:z-10 transition-transform duration-300"
                        />
                      ))}
                      <div className="w-10 h-10 rounded-full bg-[#ff5005] border-2 border-white/20 flex items-center justify-center text-white text-xs font-medium">
                        +5k
                      </div>
                    </div>
                    <span className="text-white/60 text-sm font-light">Join our growing community</span>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="hidden lg:block animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 max-h-[500px] overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white font-medium">Live Activity</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-white/60 text-xs">Live</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {activityFeed.map((activity, i) => (
                        <div 
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <img src={activity.avatar} alt={activity.user} className="w-8 h-8 rounded-full" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white/90 text-sm">
                              <span className="font-medium">{activity.user}</span>
                              <span className="text-white/60"> {activity.action}</span>
                            </p>
                            {activity.item && (
                              <p className="text-[#ff5005] text-sm truncate">{activity.item}</p>
                            )}
                          </div>
                          <span className="text-white/40 text-xs whitespace-nowrap">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-white/60 rounded-full"></div>
              </div>
            </div>
          </section>

          {/* STATS BAR */}
          <section className="py-12 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="text-center group">
                      <Icon className="w-6 h-6 text-[#ff5005] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-3xl font-light text-white mb-1">{stat.value}</div>
                      <div className="text-white/50 text-sm font-light">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RESOURCES */}
          <section id="resources" data-animate className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('resources') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Resources</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Everything you need to <span className="text-[#ff5005] font-medium">learn</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((resource, i) => {
                  const Icon = resource.icon;
                  return (
                    <a 
                      key={i}
                      href={resource.link}
                      className={`group relative bg-gradient-to-br ${resource.color} rounded-3xl p-8 border border-black/5 hover:border-[#ff5005]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${visibleSections.has('resources') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="w-7 h-7 text-[#ff5005]" />
                        </div>
                        <h3 className="text-xl font-medium text-black mb-2">{resource.title}</h3>
                        <p className="text-black/50 font-light text-sm mb-6">{resource.description}</p>
                        <div className="flex items-center gap-2 text-[#ff5005] text-sm font-medium">
                          {resource.cta}
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* DISCUSSIONS HUB */}
          <section id="discussions" data-animate className="py-24 px-6 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="max-w-6xl mx-auto">
              <div className={`text-center mb-12 transition-all duration-700 ${visibleSections.has('discussions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Community Hub</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Join the <span className="text-[#ff5005] font-medium">conversation</span>
                </h2>
              </div>

              {/* Tabs */}
              <div className={`flex justify-center gap-2 mb-8 transition-all duration-700 ${visibleSections.has('discussions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {['discussions', 'questions', 'showcase'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-black text-white' 
                        : 'bg-black/5 text-black/60 hover:bg-black/10'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className={`bg-white rounded-3xl border border-black/10 overflow-hidden transition-all duration-700 ${visibleSections.has('discussions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {discussions.map((discussion, i) => (
                  <a 
                    key={i}
                    href="#"
                    className="flex items-center gap-4 p-6 hover:bg-black/[0.02] transition-colors duration-300 border-b border-black/5 last:border-0"
                  >
                    <img src={discussion.avatar} alt={discussion.author} className="w-10 h-10 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-black truncate">{discussion.title}</h3>
                        {discussion.hot && (
                          <span className="text-xs bg-[#ff5005]/10 text-[#ff5005] px-2 py-0.5 rounded-full">Hot</span>
                        )}
                      </div>
                      <p className="text-black/40 text-sm font-light">by {discussion.author}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm text-black/40">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {discussion.replies}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {discussion.views}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-black/20" />
                  </a>
                ))}
                <div className="p-6 bg-black/[0.02] text-center">
                  <a href="#" className="inline-flex items-center gap-2 text-[#ff5005] font-medium hover:gap-3 transition-all duration-300">
                    View all discussions
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* EVENTS */}
          <section id="events" data-animate className="py-24 px-6 bg-[#f8f9fa]">
            <div className="max-w-6xl mx-auto">
              <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('events') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Events</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Upcoming <span className="text-[#ff5005] font-medium">events</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {events.map((event, i) => (
                  <div 
                    key={i}
                    className={`group relative bg-white rounded-3xl p-8 border border-black/10 hover:border-[#ff5005]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${visibleSections.has('events') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    {event.featured && (
                      <div className="absolute top-0 right-0 bg-[#ff5005] text-white text-xs font-medium px-4 py-1 rounded-bl-xl">
                        Featured
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-[#ff5005]/10 rounded-2xl p-4 text-center min-w-[70px]">
                        <div className="text-2xl font-light text-[#ff5005]">{event.date.split(' ')[1]}</div>
                        <div className="text-xs text-black/40 uppercase">{event.date.split(' ')[0]}</div>
                      </div>
                      <div>
                        <span className="text-xs bg-black/5 text-black/60 px-2 py-1 rounded-full">{event.type}</span>
                        <h3 className="text-lg font-medium text-black mt-2">{event.title}</h3>
                      </div>
                    </div>
                    <p className="text-black/50 font-light text-sm mb-6">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-black/40 text-sm">
                        <Users className="w-4 h-4" />
                        {event.attendees} attending
                      </div>
                      <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-black/80 transition-all duration-300 flex items-center gap-2 hover:scale-105">
                        <Calendar className="w-4 h-4" />
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SHOWCASE */}
          <section id="showcase" data-animate className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('showcase') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Showcase</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Built by the <span className="text-[#ff5005] font-medium">community</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {showcases.map((showcase, i) => (
                  <div 
                    key={i}
                    className={`group bg-white rounded-3xl border border-black/10 overflow-hidden hover:border-[#ff5005]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('showcase') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={showcase.image} 
                        alt={showcase.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-medium text-white mb-1">{showcase.title}</h3>
                        <p className="text-white/70 text-sm font-light">{showcase.description}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={showcase.avatar} alt={showcase.author} className="w-10 h-10 rounded-full" />
                          <div>
                            <div className="font-medium text-black text-sm">{showcase.author}</div>
                            <div className="text-black/40 text-xs font-light">{showcase.company}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-black/40 text-sm">
                          <Star className="w-4 h-4 text-[#ff5005]" />
                          {showcase.stars}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LEADERBOARD */}
          <section id="leaderboard" data-animate className="py-24 px-6 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="max-w-4xl mx-auto">
              <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('leaderboard') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Leaderboard</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Top <span className="text-[#ff5005] font-medium">contributors</span>
                </h2>
              </div>
              
              <div className={`bg-white rounded-3xl border border-black/10 overflow-hidden transition-all duration-700 ${visibleSections.has('leaderboard') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {contributors.map((contributor, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-4 p-4 hover:bg-black/[0.02] transition-colors duration-300 border-b border-black/5 last:border-0"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      i === 0 ? 'bg-[#ffd700] text-black' :
                      i === 1 ? 'bg-[#c0c0c0] text-black' :
                      i === 2 ? 'bg-[#cd7f32] text-white' :
                      'bg-black/5 text-black/40'
                    }`}>
                      {contributor.rank}
                    </div>
                    <img src={contributor.avatar} alt={contributor.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="font-medium text-black">{contributor.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-black/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#ff5005] rounded-full"
                          style={{ width: `${(contributor.contributions / 47) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-black/40 w-12 text-right">{contributor.contributions}</span>
                    </div>
                    {i < 3 && <Award className="w-5 h-5 text-[#ff5005]" />}
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <a href="#" className="inline-flex items-center gap-2 bg-[#ff5005]/10 text-[#ff5005] px-6 py-3 rounded-full font-medium hover:bg-[#ff5005]/20 transition-all duration-300">
                  <Heart className="w-4 h-4" />
                  Become a contributor
                </a>
              </div>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="py-24 px-6 bg-black">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                Stay in the <span className="text-[#ff5005] font-medium">loop</span>
              </h2>
              <p className="text-lg text-white/60 font-light mb-8">
                Get weekly updates on new features, community highlights, and upcoming events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5005] transition-colors duration-300"
                />
                <button className="bg-[#ff5005] text-white px-8 py-4 rounded-full font-medium hover:bg-[#e64804] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </div>
              <p className="text-white/30 text-sm mt-4 font-light">No spam. Unsubscribe anytime.</p>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" data-animate className="py-24 px-6 bg-[#f8f9fa]">
            <div className="max-w-3xl mx-auto">
              <div className={`text-center mb-12 transition-all duration-700 ${visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-3xl lg:text-4xl font-light text-black mb-4">
                  Community <span className="text-[#ff5005] font-medium">FAQ</span>
                </h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className={`bg-white border border-black/10 rounded-2xl overflow-hidden hover:border-[#ff5005]/30 transition-all duration-300 ${visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-black/[0.02] transition-colors duration-200"
                    >
                      <span className="text-base font-medium text-black pr-4">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-[#ff5005] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                      <div className="px-6 pb-6 text-black/50 leading-relaxed font-light">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="relative py-32 px-6">
            <div className="absolute inset-0 pointer-events-none">
              <ShaderGradientCanvas style={{ position: 'absolute', width: '100%', height: '100%' }} fov={45}>
                <ShaderGradient
                  animate="on"
                  brightness={0.8}
                  cAzimuthAngle={270}
                  cDistance={0.5}
                  cPolarAngle={180}
                  cameraZoom={15.1}
                  color1="#73bfc4"
                  color2="#ff810a"
                  color3="#8da0ce"
                  envPreset="city"
                  grain="on"
                  lightType="env"
                  positionX={-0.1}
                  positionY={0}
                  positionZ={0}
                  reflection={0.4}
                  rotationX={0}
                  rotationY={130}
                  rotationZ={70}
                  type="sphere"
                  uAmplitude={3.2}
                  uDensity={0.8}
                  uFrequency={5.5}
                  uSpeed={0.3}
                  uStrength={0.3}
                  wireframe={false}
                />
              </ShaderGradientCanvas>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-6xl font-light text-white mb-6">
                Ready to <span className="text-[#ff5005] font-medium">join us</span>?
              </h2>
              <p className="text-xl text-white/70 font-light mb-10 max-w-2xl mx-auto">
                Connect with thousands of developers building the future of voice AI.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="#"
                  className="group bg-[#ff5005] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#e64804] flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Discord
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-base font-light hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  <Zap className="w-5 h-5" />
                  Start Building
                </button>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-white py-20 px-6 border-t border-black/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                <div>
                  <img src="/amplifirm.ai (9).svg" alt="Amplifirm" className="h-5 mb-4" />
                  <p className="text-black/40 text-sm font-light">AI voice agents for modern businesses</p>
                </div>
                <div>
                  <div className="text-black text-sm font-medium mb-4">Product</div>
                  <div className="space-y-3">
                    {['Solutions', 'Enterprise', 'Pricing', 'Community'].map((item) => (
                      <button key={item} onClick={() => navigate(`/${item.toLowerCase()}`)} className="block text-black/40 hover:text-black text-sm font-light transition-all duration-300 hover:translate-x-1">{item}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-black text-sm font-medium mb-4">Community</div>
                  <div className="space-y-3">
                    {['Discord', 'GitHub', 'Twitter', 'Events'].map((item) => (
                      <a key={item} href="#" className="block text-black/40 hover:text-black text-sm font-light transition-all duration-300 hover:translate-x-1">{item}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-black text-sm font-medium mb-4">Company</div>
                  <div className="space-y-3">
                    {['About', 'Careers', 'Contact', 'Partners'].map((item) => (
                      <a key={item} href="#" className="block text-black/40 hover:text-black text-sm font-light transition-all duration-300 hover:translate-x-1">{item}</a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-black/40 text-sm font-light">2025 Amplifirm. All rights reserved.</div>
                <div className="flex gap-6 text-black/40 text-sm font-light">
                  {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                    <a key={item} href="#" className="hover:text-black transition-colors duration-300">{item}</a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </SmoothScroll>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
      `}</style>
    </>
  );
}
