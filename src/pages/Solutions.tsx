import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Phone, MessageSquare, Calendar, Headphones, TrendingUp, Shield, Zap, Globe, ChevronDown, Minus, Play, Sparkles, BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import SmoothScroll from '../components/SmoothScroll/SmoothScroll';
import SmoothCursor from '../components/SmoothCursor/SmoothCursor';

export default function Solutions() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ctaInput, setCtaInput] = useState('');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
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

  const handleCtaSubmit = () => {
    if (ctaInput.trim()) {
      sessionStorage.setItem('initialPrompt', ctaInput);
      navigate('/dashboard');
    }
  };

  const integrationLogos = [
    'https://ubwp.buffalo.edu/happe/wp-content/uploads/sites/92/2019/12/slack_logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1200px-Salesforce.com_logo.svg.png',
    'https://w7.pngwing.com/pngs/29/582/png-transparent-calendly-logo-tech-companies.png',
    'https://png.pngtree.com/png-clipart/20230916/original/pngtree-google-calendar-calendar-platform-icon-vector-png-image_12256724.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Microsoft_Office_Outlook_%282018%E2%80%932024%29.svg/1101px-Microsoft_Office_Outlook_%282018%E2%80%932024%29.svg.png',
    'https://cdn.prod.website-files.com/63be620d63863b897c02c28a/6477657755c46a6f4965855f_github_large.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/ZOHO_New.png',
    'https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/288474/Make-Logo-RGB_2x.png',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/N8n-logo-new.svg',
    'https://s3.amazonaws.com/awsmp-logos/0102622309_1485483969_aws-twilio-logo-large.png',
    'https://shop.telnyx.com/cdn/shop/files/Telnyx_Lockup_Primary_One-color_Green_Large_1_b22147ea-530b-40b3-9215-6e92a52a4197.png?v=1689041790',
  ];

  const comparisonFeatures = [
    { feature: 'Natural Human-like Voice', amplifirm: true, vapi: true, retell: false },
    { feature: 'Sub-400ms Response Time', amplifirm: true, vapi: false, retell: false },
    { feature: 'No-Code Agent Builder', amplifirm: true, vapi: false, retell: false },
    { feature: 'Real-time Analytics', amplifirm: true, vapi: true, retell: true },
    { feature: 'CRM Integrations', amplifirm: true, vapi: true, retell: false },
    { feature: 'Multi-language Support (50+)', amplifirm: true, vapi: false, retell: false },
    { feature: 'HIPAA Compliance', amplifirm: true, vapi: true, retell: true },
    { feature: 'Custom Voice Cloning', amplifirm: true, vapi: false, retell: true },
    { feature: 'Free Tier Available', amplifirm: true, vapi: false, retell: false },
    { feature: '24/7 Priority Support', amplifirm: true, vapi: false, retell: false },
  ];

  const howItWorks = [
    { 
      step: '01', 
      title: 'Describe Your Agent', 
      desc: 'Just tell us what you want in plain English. No technical jargon needed.',
      icon: MessageSquare,
      visual: '"I need an agent that books dental appointments..."'
    },
    { 
      step: '02', 
      title: 'AI Builds It Instantly', 
      desc: 'Watch as our AI generates your complete voice agent with smart conversation flows.',
      icon: Sparkles,
      visual: 'Agent created in 12 seconds'
    },
    { 
      step: '03', 
      title: 'Test With Real Calls', 
      desc: 'Make test calls, review transcripts, and refine behavior with simple feedback.',
      icon: Phone,
      visual: 'Call to test your agent live'
    },
    { 
      step: '04', 
      title: 'Deploy & Scale', 
      desc: 'Go live in one click. Handle thousands of calls simultaneously, 24/7.',
      icon: Globe,
      visual: '→ Connected & Live'
    },
  ];

  const features = [
    { icon: Zap, title: 'Sub-400ms Latency', desc: 'Responses so fast conversations feel completely natural.' },
    { icon: Globe, title: '50+ Languages', desc: 'Native-quality speech in over 50 languages worldwide.' },
    { icon: MessageSquare, title: 'Natural Conversations', desc: 'Understands context and handles interruptions.' },
    { icon: Calendar, title: 'Smart Scheduling', desc: 'Integrates with calendars to book appointments.' },
    { icon: TrendingUp, title: 'Lead Qualification', desc: 'Score leads and route hot prospects to sales.' },
    { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 Type II certified. HIPAA compliant.' },
  ];

  const useCases = [
    { icon: Headphones, industry: 'Healthcare', title: 'Patient Intake', desc: 'Automate appointments, refills, and follow-ups. HIPAA compliant.' },
    { icon: Phone, industry: 'Real Estate', title: 'Lead Qualification', desc: 'Answer property inquiries 24/7, qualify buyers, schedule showings.' },
    { icon: MessageSquare, industry: 'Legal', title: 'Client Intake', desc: 'Screen potential clients, gather case details, schedule consultations.' },
    { icon: Calendar, industry: 'Dental', title: 'AI Receptionist', desc: 'Handle calls, book appointments, send reminders, answer FAQs.' },
  ];

  const faqs = [
    { q: 'How long does it take to set up a voice agent?', a: 'Most customers have their first agent live within 5 minutes. Just describe what you want, and our AI builds it for you.' },
    { q: 'Can the AI handle complex conversations?', a: 'Yes. Our agents use advanced language models that understand context, handle interruptions, and adapt to unexpected topics.' },
    { q: 'What happens if the AI can\'t answer a question?', a: 'You can configure fallback behaviors: transfer to a human, take a message, schedule a callback, or provide alternative resources.' },
    { q: 'Is my data secure?', a: 'Absolutely. We\'re SOC 2 Type II certified and HIPAA compliant. All data is encrypted, and we never train on your conversations.' },
    { q: 'Can I use my own phone number?', a: 'Yes. You can port your existing number or use a new one we provide. We support local numbers in 100+ countries.' },
  ];

  const testimonials = [
    { quote: "Response time down 80%. Game changer.", author: "Sarah Chen", role: "CEO, TechStart", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { quote: "Customers can't tell it's not human.", author: "Michael R.", role: "VP Support, ScaleUp", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { quote: "Saved $200k annually. Best decision.", author: "Emily Watson", role: "COO, GrowthCo", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    { quote: "Setup took literally 5 minutes.", author: "David Park", role: "Founder, Nexus", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
    { quote: "24/7 coverage finally possible.", author: "Lisa Chen", role: "Director, MedCare", avatar: "https://randomuser.me/api/portraits/women/90.jpg" },
    { quote: "Our conversion rate doubled.", author: "James Wilson", role: "Sales Lead, PropTech", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
  ];

  const testimonials2 = [
    { quote: "Never going back to voicemail.", author: "Anna Martinez", role: "Owner, Dental Plus", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
    { quote: "Handles 500+ calls per day easily.", author: "Tom Richards", role: "CTO, CallFlow", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { quote: "The AI learns and improves daily.", author: "Sophie Brown", role: "PM, InsureTech", avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
    { quote: "ROI within the first week.", author: "Chris Lee", role: "CFO, FastBooks", avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
    { quote: "Finally, AI that actually works.", author: "Maria Garcia", role: "Ops, LegalEdge", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
    { quote: "Support team loves it.", author: "Alex Turner", role: "Head of CX, Retail+", avatar: "https://randomuser.me/api/portraits/men/85.jpg" },
  ];

  const stats = [
    { value: '10M+', label: 'Calls Handled' },
    { value: '99.9%', label: 'Uptime' },
    { value: '<400ms', label: 'Response Time' },
    { value: '50+', label: 'Languages' },
  ];

  return (
    <>
      <SmoothCursor />
      
      {/* NAVBAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
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
            style={{ 
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? 'none' : 'auto',
              transition: 'opacity 0.3s ease'
            }}
          >
            {['Solutions', 'Enterprise', 'Pricing', 'Community'].map((item, i) => (
              <a 
                key={item}
                href={item === 'Enterprise' || item === 'Pricing' || item === 'Community' ? undefined : item === 'Solutions' ? '#' : `#${item.toLowerCase()}`}
                onClick={item === 'Enterprise' ? () => navigate('/enterprise') : item === 'Pricing' ? () => navigate('/pricing') : item === 'Community' ? () => navigate('/community') : undefined}
                className="text-white/80 hover:text-white text-sm font-light tracking-wide transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {item}
              </a>
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
              style={{ 
                opacity: scrolled ? 1 : 0,
                pointerEvents: scrolled ? 'auto' : 'none',
              }}
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
              {['Solutions', 'Enterprise', 'Pricing', 'Community'].map((item, i) => (
                <a 
                  key={item}
                  href={item === 'Enterprise' || item === 'Pricing' || item === 'Community' ? undefined : item === 'Solutions' ? '#' : `#${item.toLowerCase()}`}
                  onClick={() => { 
                    if (item === 'Enterprise') navigate('/enterprise');
                    if (item === 'Pricing') navigate('/pricing');
                    if (item === 'Community') navigate('/community');
                    setMenuOpen(false);
                  }}
                  className="block text-black/70 hover:text-black text-sm font-light transition-all duration-300 hover:translate-x-2 cursor-pointer"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {item}
                </a>
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
          <section className="relative min-h-screen flex items-center">
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
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span className="text-white/90 text-sm font-light">AI-Powered Voice Agents</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.1] tracking-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    Convert <span className="text-[#ff5005] font-medium animate-shimmer">customers</span> with an AI-powered <span className="text-[#ff5005] font-medium">receptionist</span>
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-white/80 mb-10 leading-relaxed font-light animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    Handle thousands of calls simultaneously. Book appointments, qualify leads, and support customers 24/7.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="group bg-white text-black px-8 py-4 rounded-full text-base font-medium hover:bg-white/90 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100"
                    >
                      Start Free Trial
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-base font-light hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover:scale-105">
                      <Play className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="white" />
                      Watch Demo
                    </button>
                  </div>
                  
                  <p className="text-white/50 text-sm font-light animate-fadeInUp" style={{ animationDelay: '0.5s' }}>No credit card required • Set up in 5 minutes</p>
                </div>

                {/* Hero Visual */}
                <div className="relative hidden lg:block animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-500">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center animate-pulse-slow">
                            <BarChart3 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-black/50 font-light">Today's Calls</div>
                            <div className="text-2xl font-medium text-black">1,247</div>
                          </div>
                        </div>
                        <div className="text-[#ff5005] text-sm font-medium animate-bounce-subtle">+23% ↑</div>
                      </div>
                      
                      <div className="h-32 flex items-end gap-2 mb-6">
                        {[40, 65, 45, 80, 55, 90, 75, 60, 85, 70, 95, 80].map((h, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-gradient-to-t from-black to-black/60 rounded-t-sm animate-grow"
                            style={{ 
                              height: `${h}%`,
                              animationDelay: `${i * 0.05}s`
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: 'Answered', value: '98.5%' },
                          { label: 'Avg Duration', value: '2:34' },
                          { label: 'Converted', value: '67%' },
                        ].map((stat, i) => (
                          <div key={i} className="bg-black/5 rounded-xl p-3 hover:bg-black/10 transition-all duration-300 hover:scale-105">
                            <div className="text-xs text-black/50 font-light">{stat.label}</div>
                            <div className="text-lg font-medium text-black">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-black/5 animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#ff5005] rounded-full animate-pulse"></div>
                      <span className="text-sm font-light text-black">12 calls live now</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-black/5 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="text-xs text-black/50 font-light">Response time</div>
                    <div className="text-xl font-medium text-black">&lt;400ms</div>
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
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center group hover:scale-110 transition-all duration-300">
                    <div className="text-4xl lg:text-5xl font-light text-white mb-2 group-hover:text-[#ff5005] transition-colors duration-300">{stat.value}</div>
                    <div className="text-white/50 font-light text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LOGO SLIDER */}
          <section className="py-16 bg-white border-y border-black/5">
            <div className="text-center mb-8">
              <p className="text-black/40 text-sm font-light uppercase tracking-widest">Integrates with your favorite tools</p>
            </div>
            <div className="overflow-hidden">
              <div className="flex animate-scroll items-center">
                {[...integrationLogos, ...integrationLogos, ...integrationLogos].map((logo, i) => (
                  <img 
                    key={i} 
                    src={logo} 
                    alt="" 
                    className="h-8 mx-10 object-contain opacity-70 hover:opacity-100 flex-shrink-0 transition-all duration-300 hover:scale-110" 
                  />
                ))}
              </div>
            </div>
          </section>

          {/* PROBLEM SECTION */}
          <section id="problem" data-animate className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className={`transition-all duration-700 ${visibleSections.has('problem') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">The Problem</p>
                  <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
                    Your phone is ringing. <span className="text-[#ff5005] font-medium">Are you ready?</span>
                  </h2>
                  <p className="text-xl text-black/60 leading-relaxed mb-8 font-light">
                    Every missed call is a missed opportunity. Traditional receptionists can't handle high volume, and voicemail is a dead end.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { stat: '67%', text: 'of callers hang up if not answered immediately' },
                      { stat: '£1,200', text: 'average value per missed business call' },
                      { stat: '85%', text: 'of callers won\'t call back after going to voicemail' },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-4 hover:translate-x-2 transition-all duration-300"
                        style={{ transitionDelay: `${i * 0.1}s` }}
                      >
                        <div className="text-3xl font-light text-[#ff5005] w-24 flex-shrink-0">{item.stat}</div>
                        <div className="text-black/60 font-light">{item.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={`relative transition-all duration-700 delay-200 ${visibleSections.has('problem') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  <div className="bg-gradient-to-br from-[#ff5005]/10 to-[#ff5005]/5 rounded-3xl p-8">
                    <div className="space-y-4">
                      {[
                        { time: '2 min ago', opacity: 'opacity-90' },
                        { time: '5 min ago', opacity: 'opacity-70' },
                        { time: '8 min ago', opacity: 'opacity-50' },
                      ].map((call, i) => (
                        <div 
                          key={i} 
                          className={`bg-white rounded-xl p-4 shadow-sm border-l-4 border-[#ff5005] ${call.opacity} hover:opacity-100 hover:scale-105 transition-all duration-300 hover:shadow-lg`}
                          style={{ transform: `translateX(${i * 12}px)`, transitionDelay: `${i * 0.1}s` }}
                        >
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-[#ff5005] animate-shake" style={{ animationDelay: `${i * 0.5}s` }} />
                            <div>
                              <div className="font-medium text-black text-sm">Missed Call</div>
                              <div className="text-xs text-black/50 font-light">+44 7700 90012{i} • {call.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SOLUTION SECTION */}
          <section className="relative py-32 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <ShaderGradientCanvas style={{ position: 'absolute', width: '100%', height: '100%' }} fov={45}>
                <ShaderGradient
                  animate="on"
                  brightness={1.0}
                  cAzimuthAngle={0}
                  cDistance={7.1}
                  cPolarAngle={140}
                  cameraZoom={17.29}
                  color1="#1a1a1a"
                  color2="#ff7e33"
                  color3="#ff5005"
                  envPreset="city"
                  grain="off"
                  lightType="3d"
                  positionX={0}
                  positionY={0}
                  positionZ={0}
                  reflection={0.1}
                  rotationX={0}
                  rotationY={0}
                  rotationZ={0}
                  type="sphere"
                  uAmplitude={1.4}
                  uDensity={1.1}
                  uFrequency={5.5}
                  uSpeed={0.08}
                  uStrength={1}
                  wireframe={false}
                />
              </ShaderGradientCanvas>
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-[#ff5005] rounded-full animate-pulse"></div>
                    <span className="text-white/60 font-light text-sm">Live Conversation</span>
                    <span className="ml-auto text-white/40 text-sm font-light">0:42</span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { from: 'caller', text: '"Hi, I\'d like to book an appointment for next Tuesday"' },
                      { from: 'ai', text: '"Of course! I have availability at 10am, 2pm, and 4pm. Which works best for you?"' },
                      { from: 'caller', text: '"2pm sounds perfect"' },
                      { from: 'ai', text: '"Great! You\'re booked for Tuesday at 2pm. I\'ll send a confirmation."' },
                    ].map((msg, i) => (
                      <div 
                        key={i} 
                        className={`flex gap-3 ${msg.from === 'ai' ? 'flex-row-reverse' : ''} animate-fadeInUp`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-${msg.from === 'ai' ? 'medium' : 'light'} ${msg.from === 'ai' ? 'bg-[#ff5005]' : 'bg-white/20'}`}>
                          {msg.from === 'ai' ? 'AI' : 'C'}
                        </div>
                        <div className="flex-1">
                          <div className={`${msg.from === 'ai' ? 'bg-[#ff5005]/30 rounded-tr-sm' : 'bg-white/10 rounded-tl-sm'} rounded-2xl p-4 text-white${msg.from === 'ai' ? '' : '/90'} font-light`}>
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">The Solution</p>
                  <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                    Never miss another call with <span className="text-[#ff5005] font-medium">Amplifirm</span>
                  </h2>
                  <p className="text-xl text-white/60 mb-10 leading-relaxed font-light">
                    Our AI receptionist answers every call instantly, 24/7. It handles conversations naturally—booking appointments, answering questions, and qualifying leads.
                  </p>
                  
                  <ul className="space-y-5">
                    {[
                      'Answers in under 400ms—faster than any human',
                      'Handles 1000+ calls simultaneously',
                      'Works 24/7/365, no breaks or sick days',
                      'Costs 90% less than a human receptionist'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 hover:translate-x-2 transition-all duration-300" style={{ transitionDelay: `${i * 0.1}s` }}>
                        <div className="w-6 h-6 bg-[#ff5005] rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-slow">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-white/80 font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group mt-10 bg-white text-black px-8 py-4 rounded-full text-base font-medium hover:bg-white/90 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* COMPARISON TABLE */}
          <section id="compare" data-animate className="py-32 px-6 bg-gradient-to-b from-white to-black/5">
            <div className="max-w-5xl mx-auto">
              <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('compare') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Comparison</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Our Value vs. <span className="text-[#ff5005] font-medium">Competitor</span> Value
                </h2>
                <p className="text-xl text-black/50 max-w-2xl mx-auto font-light">
                  Compare Amplifirm to the competition and see why we're the best choice.
                </p>
              </div>
              
              <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border border-black/10 transition-all duration-700 delay-200 ${visibleSections.has('compare') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-4 bg-black/5 border-b border-black/10">
                  <div className="p-6 font-medium text-black/60 uppercase text-xs tracking-widest">Features</div>
                  <div className="p-6 bg-[#ff5005]/10 border-x border-[#ff5005]/20">
                    <div className="flex items-center justify-center">
                      <img src="/amplifirm.ai (9).svg" alt="Amplifirm" className="h-5" />
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-center">
                    <img src="https://vapi.ai/brand/img/va-square-5.svg" alt="Vapi" className="h-8" />
                  </div>
                  <div className="p-6 flex items-center justify-center">
                    <img src="https://cdn.prod.website-files.com/64ada0f2685b2d18caa5e699/6726f234dc6305cc1dee884c_Retell-mark-black.png" alt="Retell" className="h-8" />
                  </div>
                </div>
                
                {comparisonFeatures.map((row, i) => (
                  <div 
                    key={i} 
                    className={`grid grid-cols-4 hover:bg-black/5 transition-all duration-300 ${i !== comparisonFeatures.length - 1 ? 'border-b border-black/5' : ''}`}
                  >
                    <div className="p-5 text-black/70 font-light text-sm">{row.feature}</div>
                    <div className="p-5 bg-[#ff5005]/5 border-x border-[#ff5005]/10 flex items-center justify-center">
                      {row.amplifirm ? (
                        <div className="w-6 h-6 bg-[#ff5005] rounded-full flex items-center justify-center animate-scaleIn" style={{ animationDelay: `${i * 0.05}s` }}>
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      ) : (
                        <Minus className="w-4 h-4 text-black/20" />
                      )}
                    </div>
                    <div className="p-5 flex items-center justify-center">
                      {row.vapi ? (
                        <div className="w-6 h-6 bg-black/10 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-black/40" strokeWidth={3} />
                        </div>
                      ) : (
                        <Minus className="w-4 h-4 text-black/20" />
                      )}
                    </div>
                    <div className="p-5 flex items-center justify-center">
                      {row.retell ? (
                        <div className="w-6 h-6 bg-black/10 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-black/40" strokeWidth={3} />
                        </div>
                      ) : (
                        <Minus className="w-4 h-4 text-black/20" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group bg-black text-white px-8 py-4 rounded-full text-base font-medium hover:bg-black/80 transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-xl"
                >
                  Try Amplifirm Free
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS - Light background */}
          <section id="howitworks" data-animate className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-20 transition-all duration-700 ${visibleSections.has('howitworks') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">How It Works</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  From idea to <span className="text-[#ff5005] font-medium">live agent</span> in minutes
                </h2>
                <p className="text-xl text-black/50 font-light">No coding required. Just describe what you need.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorks.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={i} 
                      className={`group relative transition-all duration-500 ${visibleSections.has('howitworks') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      {i < 3 && (
                        <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-[#ff5005] to-transparent z-0"></div>
                      )}
                      
                      <div className="relative z-10 bg-white border border-black/10 rounded-2xl p-6 hover:border-[#ff5005]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#ff5005] to-[#ff8040] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#ff5005]/20">
                          <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                        </div>
                        <div className="text-sm font-medium text-[#ff5005] mb-2">{item.step}</div>
                        <h3 className="text-xl font-medium text-black mb-2">{item.title}</h3>
                        <p className="text-black/50 font-light text-sm mb-4">{item.desc}</p>
                        <div className="text-xs text-black/40 font-mono bg-black/5 rounded-lg p-2">
                          {item.visual}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FEATURES - Light background */}
          <section id="features" data-animate className="py-32 px-6 bg-gradient-to-b from-white to-black/5">
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-20 transition-all duration-700 ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Features</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Everything you need, <span className="text-[#ff5005] font-medium">nothing you don't</span>
                </h2>
                <p className="text-xl text-black/50 font-light">Enterprise-grade voice AI, ready in minutes</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div 
                      key={i}
                      className={`group bg-white rounded-2xl p-8 border border-black/10 hover:border-[#ff5005]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#ff5005] group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-medium text-black mb-2">{feature.title}</h3>
                      <p className="text-black/50 font-light">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* USE CASES - Light background */}
          <section id="usecases" data-animate className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-20 transition-all duration-700 ${visibleSections.has('usecases') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Use Cases</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Built for <span className="text-[#ff5005] font-medium">your industry</span>
                </h2>
                <p className="text-xl text-black/50 font-light">See how businesses like yours use Amplifirm</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {useCases.map((useCase, i) => {
                  const Icon = useCase.icon;
                  return (
                    <div 
                      key={i}
                      className={`group bg-gradient-to-br from-black/5 to-transparent rounded-2xl p-8 border border-black/10 hover:border-[#ff5005]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${visibleSections.has('usecases') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff5005] group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#ff5005] mb-1 uppercase tracking-wide">{useCase.industry}</div>
                          <h3 className="text-2xl font-medium text-black mb-2">{useCase.title}</h3>
                          <p className="text-black/50 font-light">{useCase.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="py-32 px-6 bg-gradient-to-b from-black/5 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Testimonials</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Loved by <span className="text-[#ff5005] font-medium">thousands</span>
                </h2>
              </div>
            </div>
            
            {/* Row 1 */}
            <div className="overflow-hidden mb-6">
              <div className="flex animate-scroll-left items-center">
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div key={i} className="flex-shrink-0 w-80 mx-3 bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ff5005]/20" />
                      <div>
                        <div className="font-medium text-black text-sm">{t.author}</div>
                        <div className="text-black/40 text-xs font-light">{t.role}</div>
                      </div>
                    </div>
                    <p className="text-black/70 font-light text-sm">"{t.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll-right items-center">
                {[...testimonials2, ...testimonials2].map((t, i) => (
                  <div key={i} className="flex-shrink-0 w-80 mx-3 bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ff5005]/20" />
                      <div>
                        <div className="font-medium text-black text-sm">{t.author}</div>
                        <div className="text-black/40 text-xs font-light">{t.role}</div>
                      </div>
                    </div>
                    <p className="text-black/70 font-light text-sm">"{t.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" data-animate className="py-32 px-6 bg-white">
            <div className="max-w-3xl mx-auto">
              <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">FAQ</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Frequently Asked <span className="text-[#ff5005] font-medium">Questions</span>
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
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-black/5 transition-colors duration-200"
                    >
                      <span className="text-base font-medium text-black pr-4">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-[#ff5005] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                      <div className="px-6 pb-6 text-black/50 leading-relaxed font-light">
                        {faq.a}
                      </div>
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
              <h2 className="text-4xl lg:text-6xl font-light text-white mb-6 animate-fadeInUp">
                What can we <span className="text-[#ff5005] font-medium">automate</span> for you?
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                Describe your ideal voice agent and watch AI build it in minutes.
              </p>
              
              <div className="w-full max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-shadow duration-500">
                  <div className="p-4">
                    <input
                      type="text"
                      value={ctaInput}
                      onChange={(e) => setCtaInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCtaSubmit()}
                      placeholder="Build a voice agent that handles customer support..."
                      className="w-full bg-transparent text-gray-800 text-base placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 pb-4">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        Attach
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                        </svg>
                        Template
                      </button>
                    </div>
                    <button
                      onClick={handleCtaSubmit}
                      className="bg-gray-900 hover:bg-gray-800 text-white p-2.5 rounded-lg transition-all duration-300 hover:scale-110 active:scale-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <p className="text-white/40 text-sm mt-6 font-light">No credit card required • Set up in 5 minutes</p>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-black py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                <div>
                  <img src="/amplifirm.ai (9).svg" alt="Amplifirm" className="h-5 mb-4 brightness-0 invert" />
                  <p className="text-white/40 text-sm font-light">AI voice agents for modern businesses</p>
                </div>
                <div>
                  <div className="text-white text-sm font-medium mb-4">Product</div>
                  <div className="space-y-3">
                    {['Features', 'Integrations', 'Changelog'].map((item) => (
                      <a key={item} href="#" className="block text-white/40 hover:text-white text-sm font-light transition-all duration-300 hover:translate-x-1">{item}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-white text-sm font-medium mb-4">Resources</div>
                  <div className="space-y-3">
                    {['Documentation', 'API Reference', 'Blog', 'Support'].map((item) => (
                      <a key={item} href="#" className="block text-white/40 hover:text-white text-sm font-light transition-all duration-300 hover:translate-x-1">{item}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-white text-sm font-medium mb-4">Company</div>
                  <div className="space-y-3">
                    {['About', 'Careers', 'Contact', 'Partners'].map((item) => (
                      <a key={item} href="#" className="block text-white/40 hover:text-white text-sm font-light transition-all duration-300 hover:translate-x-1">{item}</a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-white/40 text-sm font-light">© 2025 Amplifirm. All rights reserved.</div>
                <div className="flex gap-6 text-white/40 text-sm font-light">
                  {['Privacy', 'Terms', 'Cookies'].map((item) => (
                    <a key={item} href="#" className="hover:text-white transition-colors duration-300">{item}</a>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes grow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-grow { animation: grow 0.5s ease-out forwards; transform-origin: bottom; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
        .animate-scroll-left { animation: scroll-left 40s linear infinite; display: flex; width: fit-content; }
        .animate-scroll-right { animation: scroll-right 40s linear infinite; display: flex; width: fit-content; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
      `}</style>
    </>
  );
}
