import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Shield, Lock, Users, Building2, Headphones, Globe, Server, FileCheck, ChevronDown, Clock, Zap, BarChart3, Phone, Key, Laptop, HelpCircle, GitBranch, PhoneCall } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import SmoothScroll from '../components/SmoothScroll/SmoothScroll';
import SmoothCursor from '../components/SmoothCursor/SmoothCursor';
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid';

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted && startOnView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, hasStarted, startOnView]);

  return { count, ref };
}

// Skeleton component for bento grid
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#ff5005]/10 to-[#73bfc4]/10 ${className || ''}`}></div>
);

// Animated skeleton with icons
const IVRSkeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-black/5 to-black/10 items-center justify-center overflow-hidden relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-2 opacity-30">
        {[1,2,3,4,5,6,7,8,9].map((n) => (
          <div key={n} className="w-8 h-8 rounded bg-[#ff5005]/20 flex items-center justify-center text-xs font-medium text-black/40">
            {n}
          </div>
        ))}
      </div>
    </div>
    <PhoneCall className="w-12 h-12 text-[#ff5005]/60 relative z-10" />
  </div>
);

const HelpdeskSkeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#73bfc4]/10 to-[#8da0ce]/10 items-center justify-center">
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-lg bg-[#ff5005]/20 flex items-center justify-center">
        <Key className="w-5 h-5 text-[#ff5005]/60" />
      </div>
      <div className="w-10 h-10 rounded-lg bg-[#73bfc4]/20 flex items-center justify-center">
        <Lock className="w-5 h-5 text-[#73bfc4]/60" />
      </div>
      <div className="w-10 h-10 rounded-lg bg-[#8da0ce]/20 flex items-center justify-center">
        <Laptop className="w-5 h-5 text-[#8da0ce]/60" />
      </div>
    </div>
  </div>
);

const MigrationSkeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#ff810a]/10 to-[#ff5005]/10 items-center justify-center">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded bg-black/10 flex items-center justify-center text-xs">1</div>
      <ArrowRight className="w-4 h-4 text-[#ff5005]/40" />
      <div className="w-8 h-8 rounded bg-[#ff5005]/20 flex items-center justify-center text-xs">2</div>
      <ArrowRight className="w-4 h-4 text-[#ff5005]/40" />
      <div className="w-8 h-8 rounded bg-[#ff5005]/40 flex items-center justify-center text-xs text-white">3</div>
    </div>
  </div>
);

export default function Enterprise() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    employees: '',
    message: ''
  });

  // Animated counters for stats
  const uptimeCounter = useCountUp(99.99, 2000);
  const responseCounter = useCountUp(1, 1500);
  const clientsCounter = useCountUp(100, 2000);
  const callsCounter = useCountUp(50, 2000);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Bento grid items for enterprise solutions
  const bentoItems = [
    {
      title: "IVR Automation",
      description: "Layer intelligent AI on top of existing IVR infrastructure. No rip-and-replace required.",
      header: <IVRSkeleton />,
      icon: <Phone className="h-4 w-4 text-[#ff5005]" />,
    },
    {
      title: "Password Resets",
      description: "Verify identity via 2FA, reset password, confirm with user—all automated 24/7.",
      header: <Skeleton className="from-[#73bfc4]/10 to-[#8da0ce]/10" />,
      icon: <Key className="h-4 w-4 text-[#ff5005]" />,
    },
    {
      title: "Account Unlocks",
      description: "Detect locked accounts, verify user identity, unlock, and log action for audit compliance.",
      header: <Skeleton className="from-[#8da0ce]/10 to-[#73bfc4]/10" />,
      icon: <Lock className="h-4 w-4 text-[#ff5005]" />,
    },
    {
      title: "Internal Helpdesk",
      description: "Handle thousands of repetitive IT requests monthly. Integrates with Okta, Azure AD, Google Workspace.",
      header: <HelpdeskSkeleton />,
      icon: <HelpCircle className="h-4 w-4 text-[#ff5005]" />,
    },
    {
      title: "Software Access Requests",
      description: "Process access requests against policy, grant if approved, escalate if not—zero human intervention.",
      header: <Skeleton className="from-[#ff5005]/10 to-[#ff810a]/10" />,
      icon: <Laptop className="h-4 w-4 text-[#ff5005]" />,
    },
    {
      title: "VPN Troubleshooting",
      description: "Guided diagnosis, configuration verification, and smart escalation when needed.",
      header: <Skeleton className="from-[#73bfc4]/10 to-[#ff5005]/10" />,
      icon: <Globe className="h-4 w-4 text-[#ff5005]" />,
    },
    {
      title: "Phased IVR Replacement",
      description: "Rolling transition approach instead of risky big-bang replacements. Migrate progressively with zero downtime.",
      header: <MigrationSkeleton />,
      icon: <GitBranch className="h-4 w-4 text-[#ff5005]" />,
    },
  ];

  const securityBadges = [
    { name: 'SOC 2 Type II', icon: Shield },
    { name: 'HIPAA', icon: FileCheck },
    { name: 'GDPR', icon: Lock },
    { name: 'ISO 27001', icon: Shield },
    { name: 'CCPA', icon: FileCheck },
  ];

  const migrationPhases = [
    { phase: '01', title: 'Assessment', desc: 'Audit existing IVR flows, identify automation candidates, map integration points.' },
    { phase: '02', title: 'Pilot Deployment', desc: 'Deploy AI alongside existing system for low-risk call types. Validate accuracy and user satisfaction.' },
    { phase: '03', title: 'Progressive Rollout', desc: 'Expand AI handling to additional call types. Legacy system remains as fallback.' },
    { phase: '04', title: 'Full Transition', desc: 'Complete migration with legacy decommissioning. Continuous optimization based on analytics.' },
  ];

  const helpdeskCapabilities = [
    { icon: Key, title: 'Password Resets', desc: 'Verify identity via 2FA, reset password, confirm with user—all automated' },
    { icon: Lock, title: 'Account Unlocks', desc: 'Detect locked accounts, verify user, unlock, log action for audit' },
    { icon: Laptop, title: 'Software Access', desc: 'Process access requests against policy, grant if approved, escalate if not' },
    { icon: Globe, title: 'VPN Troubleshooting', desc: 'Guided diagnosis, configuration verification, escalation if needed' },
    { icon: FileCheck, title: 'Ticket Creation', desc: 'For issues requiring humans, create detailed tickets in Jira/ServiceNow with full context' },
  ];

  const faqs = [
    { 
      q: 'How does IVR layering work without replacing our existing system?', 
      a: 'Our AI sits in front of your existing IVR, intercepting calls and handling them intelligently. Calls that need the legacy system pass through seamlessly. No infrastructure changes required.' 
    },
    { 
      q: 'What identity systems do you integrate with?', 
      a: 'We natively integrate with Okta, Azure AD, Google Workspace, Ping Identity, and custom LDAP/SAML implementations. Our API allows connection to any identity provider.' 
    },
    { 
      q: 'How long does a phased IVR migration take?', 
      a: 'Typical migrations run 3-6 months depending on complexity. We start with quick wins (30-60 days for pilot) and expand progressively. You see ROI from day one of pilot.' 
    },
    { 
      q: 'What happens when the AI cannot resolve an issue?', 
      a: 'Smart escalation creates detailed tickets in your ITSM (Jira, ServiceNow, etc.) with full context, troubleshooting steps attempted, and relevant user data. No information is lost.' 
    },
    { 
      q: 'How do you ensure security and compliance?', 
      a: 'SOC 2 Type II certified, HIPAA compliant, GDPR ready. All actions are logged for audit. Role-based access controls. Data encrypted at rest and in transit.' 
    },
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
            {['Solutions', 'Enterprise', 'Pricing', 'Community'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  if (item === 'Solutions') navigate('/solutions');
                  else if (item === 'Pricing') navigate('/pricing');
                  else if (item === 'Community') navigate('/community');
                }}
                className={`text-sm font-light tracking-wide transition-all duration-300 hover:translate-y-[-2px] ${
                  item === 'Enterprise' ? 'text-white font-medium' : 'text-white/80 hover:text-white'
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
              {['Solutions', 'Enterprise', 'Pricing', 'Community'].map((item) => (
                <button 
                  key={item}
                  onClick={() => { 
                    if (item === 'Solutions') navigate('/solutions');
                    else if (item === 'Pricing') navigate('/pricing');
                    else if (item === 'Community') navigate('/community');
                    setMenuOpen(false);
                  }}
                  className={`block text-sm font-light transition-all duration-300 hover:translate-x-2 ${
                    item === 'Enterprise' ? 'text-black font-medium' : 'text-black/70 hover:text-black'
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
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fadeInUp">
                  <Building2 className="w-4 h-4 text-[#ff5005]" />
                  <span className="text-white/90 text-sm font-light">Enterprise Solutions</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.1] tracking-tight animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  IVR automation for <span className="text-[#ff5005] font-medium">enterprise</span> scale
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/70 mb-10 leading-relaxed font-light max-w-3xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  Full IVR automation, internal helpdesk deployment, and phased legacy system replacement—all delivered as a managed service.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <a
                    href="#contact"
                    className="group bg-[#ff5005] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#e64804] flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    Contact Sales
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <button 
                    onClick={() => navigate('/solutions')}
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-base font-light hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                  >
                    View Solutions
                  </button>
                </div>

                {/* Security badges */}
                <div className="flex flex-wrap items-center gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  {securityBadges.map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-light">{badge.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-white/60 rounded-full"></div>
              </div>
            </div>
          </section>

          {/* ANIMATED STATS */}
          <section className="py-20 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff5005]/5 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#73bfc4]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div ref={uptimeCounter.ref} className="text-center group">
                  <div className="text-5xl lg:text-6xl font-light text-black mb-2 group-hover:text-[#ff5005] transition-colors duration-500">
                    {uptimeCounter.count.toFixed(2)}%
                  </div>
                  <div className="text-black/50 font-light text-sm">Uptime SLA</div>
                  <div className="h-1 w-0 group-hover:w-full bg-[#ff5005] mx-auto mt-3 transition-all duration-500 rounded-full" />
                </div>
                
                <div ref={responseCounter.ref} className="text-center group">
                  <div className="text-5xl lg:text-6xl font-light text-black mb-2 group-hover:text-[#ff5005] transition-colors duration-500">
                    &lt;{responseCounter.count}hr
                  </div>
                  <div className="text-black/50 font-light text-sm">Support Response</div>
                  <div className="h-1 w-0 group-hover:w-full bg-[#ff5005] mx-auto mt-3 transition-all duration-500 rounded-full" />
                </div>
                
                <div ref={clientsCounter.ref} className="text-center group">
                  <div className="text-5xl lg:text-6xl font-light text-black mb-2 group-hover:text-[#ff5005] transition-colors duration-500">
                    {clientsCounter.count}+
                  </div>
                  <div className="text-black/50 font-light text-sm">Enterprise Clients</div>
                  <div className="h-1 w-0 group-hover:w-full bg-[#ff5005] mx-auto mt-3 transition-all duration-500 rounded-full" />
                </div>
                
                <div ref={callsCounter.ref} className="text-center group">
                  <div className="text-5xl lg:text-6xl font-light text-black mb-2 group-hover:text-[#ff5005] transition-colors duration-500">
                    {callsCounter.count}M+
                  </div>
                  <div className="text-black/50 font-light text-sm">Calls Handled</div>
                  <div className="h-1 w-0 group-hover:w-full bg-[#ff5005] mx-auto mt-3 transition-all duration-500 rounded-full" />
                </div>
              </div>
            </div>
          </section>

          {/* THE PROBLEM & SOLUTION */}
          <section id="problem" data-animate className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-20">
                {/* The Problem */}
                <div className={`transition-all duration-700 ${visibleSections.has('problem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <p className="text-black/40 text-sm font-medium uppercase tracking-widest mb-4">The Problem</p>
                  <h2 className="text-3xl lg:text-4xl font-light text-black mb-6 leading-tight">
                    Traditional IVR systems <span className="text-black/40">frustrate customers</span>
                  </h2>
                  <p className="text-lg text-black/60 mb-8 leading-relaxed font-light">
                    "Press 1 for Sales, Press 2 for Support..." creates bottlenecks and poor experiences. 
                    But replacing them requires massive investment and risk.
                  </p>
                  <div className="space-y-4">
                    {[
                      'High customer abandonment rates',
                      'Long wait times and call queues',
                      'Repetitive requests drain IT resources',
                      'Legacy systems too risky to replace',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-black/60">
                        <div className="w-2 h-2 bg-black/20 rounded-full" />
                        <span className="font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Our Solution */}
                <div className={`transition-all duration-700 ${visibleSections.has('problem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
                  <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Our Solution</p>
                  <h2 className="text-3xl lg:text-4xl font-light text-black mb-6 leading-tight">
                    Intelligent AI <span className="text-[#ff5005] font-medium">on top</span> of existing infrastructure
                  </h2>
                  <p className="text-lg text-black/60 mb-8 leading-relaxed font-light">
                    We layer intelligent AI on top of your existing IVR, progressively taking over functions 
                    without rip-and-replace. Start seeing ROI from day one.
                  </p>
                  <div className="space-y-4">
                    {[
                      'No infrastructure changes required',
                      'Progressive rollout, zero risk',
                      'Integrates with existing identity systems',
                      'Actually resolves issues, not just logs tickets',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-black/80">
                        <Check className="w-5 h-5 text-[#ff5005]" />
                        <span className="font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BENTO GRID - Enterprise Solutions */}
          <section id="solutions" data-animate className="py-32 px-6 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('solutions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Enterprise Solutions</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Everything you need at <span className="text-[#ff5005] font-medium">enterprise scale</span>
                </h2>
                <p className="text-xl text-black/50 max-w-3xl mx-auto font-light">
                  From IVR automation to internal helpdesk, we handle it all as a managed service.
                </p>
              </div>
              
              <BentoGrid className={`transition-all duration-700 ${visibleSections.has('solutions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {bentoItems.map((item, i) => (
                  <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  />
                ))}
              </BentoGrid>
            </div>
          </section>

          {/* INTERNAL HELPDESK */}
          <section id="helpdesk" data-animate className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className={`transition-all duration-700 ${visibleSections.has('helpdesk') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Internal Helpdesk Automation</p>
                  <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
                    Automate repetitive <span className="text-[#ff5005] font-medium">IT requests</span>
                  </h2>
                  <p className="text-xl text-black/60 mb-10 leading-relaxed font-light">
                    Enterprise IT helpdesks handle thousands of repetitive requests monthly: password resets, 
                    VPN issues, software access, account unlocks. Our AI handles these 24/7.
                  </p>
                  
                  <div className="space-y-6">
                    {helpdeskCapabilities.map((cap, i) => {
                      const Icon = cap.icon;
                      return (
                        <div key={i} className="flex gap-4 group hover:translate-x-2 transition-all duration-300">
                          <div className="w-12 h-12 bg-[#ff5005]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff5005]/20 transition-colors duration-300">
                            <Icon className="w-6 h-6 text-[#ff5005]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-black mb-1">{cap.title}</h3>
                            <p className="text-black/50 font-light">{cap.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className={`transition-all duration-700 ${visibleSections.has('helpdesk') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
                  <div className="bg-gradient-to-br from-[#f8f9fa] to-white rounded-3xl p-8 border border-black/10">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-[#ff5005] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Headphones className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-medium text-black mb-2">Identity System Integrations</h3>
                      <p className="text-black/50 font-light">Connects with your existing infrastructure</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'Okta', desc: 'SSO & IAM' },
                        { name: 'Azure AD', desc: 'Microsoft Identity' },
                        { name: 'Google Workspace', desc: 'Google Identity' },
                        { name: 'ServiceNow', desc: 'ITSM Platform' },
                        { name: 'Jira', desc: 'Issue Tracking' },
                        { name: 'Custom LDAP', desc: 'Enterprise Directory' },
                      ].map((integration, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-black/5 hover:border-[#ff5005]/30 hover:shadow-md transition-all duration-300">
                          <div className="font-medium text-black text-sm">{integration.name}</div>
                          <div className="text-black/40 text-xs font-light">{integration.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PHASED IVR REPLACEMENT */}
          <section className="relative py-32 px-6 overflow-hidden">
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
                  uSpeed={0.2}
                  uStrength={0.3}
                  wireframe={false}
                />
              </ShaderGradientCanvas>
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Phased Migration</p>
                <h2 className="text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
                  Rolling transition, <span className="text-[#ff5005] font-medium">zero risk</span>
                </h2>
                <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
                  Instead of risky "big bang" replacements, we offer a progressive approach that delivers ROI from day one.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {migrationPhases.map((phase, i) => (
                  <div 
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="text-4xl font-light text-[#ff5005] mb-4">{phase.phase}</div>
                    <h3 className="text-xl font-medium text-white mb-2">{phase.title}</h3>
                    <p className="text-white/60 font-light text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-white/50 font-light mb-6">Typical migration timeline: 3-6 months with ROI from pilot phase</p>
                <a href="#contact" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  Discuss Your Migration
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* SECURITY */}
          <section id="security" data-animate className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className={`transition-all duration-700 ${visibleSections.has('security') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Security First</p>
                  <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
                    Enterprise-grade <span className="text-[#ff5005] font-medium">security</span>
                  </h2>
                  <p className="text-xl text-black/60 mb-10 leading-relaxed font-light">
                    Your data security is our top priority. We implement industry-leading security measures 
                    and maintain the certifications you need for compliance.
                  </p>
                  
                  <ul className="space-y-5">
                    {[
                      { icon: Lock, text: 'End-to-end encryption for all data at rest and in transit' },
                      { icon: Shield, text: 'SOC 2 Type II certified with annual third-party audits' },
                      { icon: Server, text: 'Data residency options in US, EU, and APAC regions' },
                      { icon: FileCheck, text: 'HIPAA, GDPR, CCPA, and industry-specific compliance' },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <li key={i} className="flex items-center gap-4 hover:translate-x-2 transition-all duration-300">
                          <div className="w-10 h-10 bg-[#ff5005]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-[#ff5005]" />
                          </div>
                          <span className="text-black/70 font-light">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                <div className={`bg-gradient-to-br from-[#f8f9fa] to-white rounded-3xl p-8 border border-black/10 transition-all duration-700 ${visibleSections.has('security') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
                  <div className="text-center mb-8">
                    <Shield className="w-16 h-16 text-[#ff5005] mx-auto mb-4" />
                    <h3 className="text-2xl font-medium text-black mb-2">Security Certifications</h3>
                    <p className="text-black/50 font-light">Verified by independent auditors</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'SOC 2 Type II', status: 'Certified' },
                      { name: 'HIPAA', status: 'Compliant' },
                      { name: 'GDPR', status: 'Compliant' },
                      { name: 'ISO 27001', status: 'Certified' },
                      { name: 'CCPA', status: 'Compliant' },
                      { name: 'PCI DSS', status: 'Level 1' },
                    ].map((cert, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 border border-black/5 hover:border-[#ff5005]/30 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-2 mb-1">
                          <Check className="w-4 h-4 text-[#ff5005]" />
                          <span className="text-black font-medium text-sm">{cert.name}</span>
                        </div>
                        <span className="text-black/50 text-xs">{cert.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INTEGRATIONS */}
          <section className="py-24 px-6 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Integrations</p>
              <h2 className="text-3xl lg:text-4xl font-light text-black mb-4">
                Connects with your <span className="text-[#ff5005] font-medium">enterprise stack</span>
              </h2>
              <p className="text-lg text-black/50 font-light mb-12">
                Native integrations with the tools you already use, plus custom API access.
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-12">
                {[
                  { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1200px-Salesforce.com_logo.svg.png' },
                  { name: 'SAP', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg' },
                  { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
                  { name: 'ServiceNow', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg' },
                  { name: 'Workday', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Workday_logo.svg' },
                  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
                ].map((integration, i) => (
                  <img 
                    key={i}
                    src={integration.logo}
                    alt={integration.name}
                    className="h-10 object-contain opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" data-animate className="py-32 px-6 bg-[#f8f9fa]">
            <div className="max-w-3xl mx-auto">
              <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">FAQ</p>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                  Enterprise <span className="text-[#ff5005] font-medium">Questions</span>
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
                      <div className="px-6 pb-6 text-black/50 leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT FORM */}
          <section id="contact" className="relative py-32 px-6">
            <div className="absolute inset-0 pointer-events-none">
              <ShaderGradientCanvas style={{ position: 'absolute', width: '100%', height: '100%' }} fov={45}>
                <ShaderGradient
                  animate="on"
                  brightness={0.9}
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
                  uSpeed={0.2}
                  uStrength={0.3}
                  wireframe={false}
                />
              </ShaderGradientCanvas>
            </div>
            
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <p className="text-[#ff5005] text-sm font-medium uppercase tracking-widest mb-4">Contact Sales</p>
                  <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                    Let's discuss your <span className="text-[#ff5005] font-medium">IVR automation</span>
                  </h2>
                  <p className="text-xl text-white/60 mb-10 leading-relaxed font-light">
                    Talk to our enterprise team to discuss your requirements, get a custom demo, 
                    and explore how Amplifirm can modernise your voice infrastructure.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { icon: Clock, text: 'Response within 1 business hour' },
                      { icon: Users, text: 'Dedicated solutions engineer' },
                      { icon: BarChart3, text: 'Custom ROI analysis' },
                      { icon: Zap, text: 'Proof of concept in days, not months' },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#ff5005]" />
                          </div>
                          <span className="text-white/80 font-light">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black/70 mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#ff5005] focus:outline-none transition-colors"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black/70 mb-2">Work Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#ff5005] focus:outline-none transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black/70 mb-2">Company</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#ff5005] focus:outline-none transition-colors"
                          placeholder="Company Inc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black/70 mb-2">Company Size</label>
                        <select
                          value={formData.employees}
                          onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#ff5005] focus:outline-none transition-colors bg-white"
                        >
                          <option value="">Select...</option>
                          <option value="50-200">50-200 employees</option>
                          <option value="200-500">200-500 employees</option>
                          <option value="500-1000">500-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-black/70 mb-2">Tell us about your IVR/helpdesk needs</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#ff5005] focus:outline-none transition-colors resize-none"
                        placeholder="Describe your current IVR setup, call volumes, pain points..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-black/80 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-100"
                    >
                      Contact Enterprise Sales
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <p className="text-center text-black/40 text-sm font-light">
                      We'll get back to you within 1 business hour
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-white py-20 px-6 border-t border-black/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                <div>
                  <img src="/amplifirm.ai (9).svg" alt="Amplifirm" className="h-5 mb-4" />
                  <p className="text-black/40 text-sm font-light">Enterprise voice AI for modern businesses</p>
                </div>
                <div>
                  <div className="text-black text-sm font-medium mb-4">Product</div>
                  <div className="space-y-3">
                    {['Solutions', 'Enterprise', 'Integrations', 'Security'].map((item) => (
                      <a key={item} href="#" className="block text-black/40 hover:text-black text-sm font-light transition-all duration-300 hover:translate-x-1">{item}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-black text-sm font-medium mb-4">Resources</div>
                  <div className="space-y-3">
                    {['Documentation', 'API Reference', 'Case Studies', 'Support'].map((item) => (
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </>
  );
}
