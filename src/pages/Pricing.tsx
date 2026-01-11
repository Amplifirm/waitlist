import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ChevronDown, Zap, Users, Building2, Phone, MessageSquare, Globe, Shield, Headphones, BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import SmoothScroll from '../components/SmoothScroll/SmoothScroll';
import SmoothCursor from '../components/SmoothCursor/SmoothCursor';

export default function Pricing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 20 : 16,
      agents: '2 live agents',
      description: 'Perfect for small businesses getting started with AI voice agents.',
      features: [
        '2 concurrent live agents',
        '500 minutes included',
        'Basic analytics dashboard',
        'Email support',
        'Standard voice quality',
        '5 integrations',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 40 : 32,
      agents: '3-5 live agents',
      description: 'For growing teams that need more capacity and features.',
      features: [
        '3-5 concurrent live agents',
        '2,000 minutes included',
        'Advanced analytics & reporting',
        'Priority email support',
        'HD voice quality',
        'Unlimited integrations',
        'Custom voice personas',
        'Call recording & transcripts',
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Business',
      price: billingCycle === 'monthly' ? 100 : 80,
      agents: '5+ live agents',
      description: 'For businesses that need scale and advanced capabilities.',
      features: [
        '5+ concurrent live agents',
        '5,000 minutes included',
        'Real-time analytics',
        'Phone & email support',
        'Premium voice quality',
        'Unlimited integrations',
        'Custom voice cloning',
        'Call recording & transcripts',
        'API access',
        'Dedicated success manager',
      ],
      cta: 'Get Started',
      popular: false,
    },
  ];

  const faqs = [
    { 
      q: 'What happens after I use my included minutes?', 
      a: 'After your included minutes, you pay just $0.02 per minute. This applies to all plans and is billed at the end of each billing cycle based on your usage.' 
    },
    { 
      q: 'Can I change plans at any time?', 
      a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate your billing accordingly.' 
    },
    { 
      q: 'What counts as a "live agent"?', 
      a: 'A live agent is a concurrent voice AI that can handle calls simultaneously. With 2 live agents, you can handle 2 calls at the same time.' 
    },
    { 
      q: 'Do you offer a free trial?', 
      a: 'Yes, all plans come with a 14-day free trial. No credit card required to start. You can test all features before committing.' 
    },
    { 
      q: 'What about enterprise pricing?', 
      a: 'For larger organizations needing custom solutions, dedicated infrastructure, or volume discounts, please contact our sales team for a custom quote.' 
    },
    { 
      q: 'Are there any hidden fees?', 
      a: 'No hidden fees. You pay your plan price plus any overage minutes at $0.02/min. Phone numbers are included. No setup fees.' 
    },
  ];

  const comparisonFeatures = [
    { feature: 'Concurrent Agents', starter: '2', professional: '3-5', business: '5+' },
    { feature: 'Included Minutes', starter: '500', professional: '2,000', business: '5,000' },
    { feature: 'Overage Rate', starter: '$0.02/min', professional: '$0.02/min', business: '$0.02/min' },
    { feature: 'Voice Quality', starter: 'Standard', professional: 'HD', business: 'Premium' },
    { feature: 'Integrations', starter: '5', professional: 'Unlimited', business: 'Unlimited' },
    { feature: 'Analytics', starter: 'Basic', professional: 'Advanced', business: 'Real-time' },
    { feature: 'Support', starter: 'Email', professional: 'Priority Email', business: 'Phone & Email' },
    { feature: 'Custom Voice', starter: '-', professional: 'Personas', business: 'Voice Cloning' },
    { feature: 'API Access', starter: '-', professional: '-', business: 'Full Access' },
    { feature: 'Success Manager', starter: '-', professional: '-', business: 'Dedicated' },
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
                  else if (item === 'Enterprise') navigate('/enterprise');
                  else if (item === 'Community') navigate('/community');
                }}
                className={`text-sm font-light tracking-wide transition-all duration-300 hover:translate-y-[-2px] ${
                  item === 'Pricing' ? 'text-white font-medium' : 'text-white/80 hover:text-white'
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
                    else if (item === 'Enterprise') navigate('/enterprise');
                    else if (item === 'Community') navigate('/community');
                    setMenuOpen(false);
                  }}
                  className={`block text-sm font-light transition-all duration-300 hover:translate-x-2 ${
                    item === 'Pricing' ? 'text-black font-medium' : 'text-black/70 hover:text-black'
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
          <section className="relative min-h-[70vh] flex items-center">
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
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fadeInUp">
                <Zap className="w-4 h-4 text-[#ff5005]" />
                <span className="text-white/90 text-sm font-light">Simple, transparent pricing</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.1] tracking-tight animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                Pay for what you <span className="text-[#ff5005] font-medium">use</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/70 mb-10 leading-relaxed font-light max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                Start with a plan that fits your needs. Scale up as you grow. 
                Just $0.02/minute after included minutes.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <span className={`text-sm font-light ${billingCycle === 'monthly' ? 'text-white' : 'text-white/50'}`}>Monthly</span>
                <button 
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative w-14 h-7 bg-white/20 rounded-full transition-colors duration-300"
                >
                  <div className={`absolute top-1 w-5 h-5 bg-[#ff5005] rounded-full transition-all duration-300 ${billingCycle === 'annual' ? 'left-8' : 'left-1'}`} />
                </button>
                <span className={`text-sm font-light ${billingCycle === 'annual' ? 'text-white' : 'text-white/50'}`}>
                  Annual <span className="text-[#ff5005]">(-20%)</span>
                </span>
              </div>
            </div>
          </section>

          {/* PRICING CARDS */}
          <section className="py-20 px-6 bg-white -mt-20 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan, i) => (
                  <div 
                    key={i}
                    className={`relative bg-white rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                      plan.popular 
                        ? 'border-[#ff5005] shadow-xl shadow-[#ff5005]/10' 
                        : 'border-black/10 hover:border-[#ff5005]/50'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff5005] text-white text-xs font-medium px-4 py-1.5 rounded-full">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-medium text-black mb-1">{plan.name}</h3>
                      <p className="text-black/40 text-sm font-light">{plan.agents}</p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-light text-black">${plan.price}</span>
                        <span className="text-black/40 font-light">/month</span>
                      </div>
                      {billingCycle === 'annual' && (
                        <p className="text-[#ff5005] text-sm mt-1">Billed annually</p>
                      )}
                    </div>
                    
                    <p className="text-black/60 font-light text-sm mb-8 leading-relaxed">
                      {plan.description}
                    </p>
                    
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className={`w-full py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-100 ${
                        plan.popular 
                          ? 'bg-[#ff5005] text-white hover:bg-[#e64804]' 
                          : 'bg-black text-white hover:bg-black/80'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <div className="mt-8 pt-8 border-t border-black/10">
                      <p className="text-sm font-medium text-black mb-4">What's included:</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-black/60 font-light">
                            <Check className="w-4 h-4 text-[#ff5005] flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Overage pricing note */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-3 bg-[#ff5005]/5 border border-[#ff5005]/20 rounded-full px-6 py-3">
                  <Phone className="w-5 h-5 text-[#ff5005]" />
                  <span className="text-black/70 font-light">
                    After included minutes: <span className="text-[#ff5005] font-medium">$0.02 per minute</span> on all plans
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ENTERPRISE CTA */}
          <section className="py-20 px-6 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="max-w-4xl mx-auto">
              <div className="bg-black rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5005]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#73bfc4]/20 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <Building2 className="w-12 h-12 text-[#ff5005] mx-auto mb-6" />
                  <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                    Need enterprise scale?
                  </h2>
                  <p className="text-lg text-white/60 font-light mb-8 max-w-2xl mx-auto">
                    Get custom pricing, dedicated infrastructure, SLAs, and white-glove support 
                    for large-scale deployments and IVR automation.
                  </p>
                  <button 
                    onClick={() => navigate('/enterprise')}
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
                  >
                    Contact Enterprise Sales
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURE COMPARISON */}
          <section className="py-20 px-6 bg-[#f8f9fa]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-light text-black mb-4">
                  Compare <span className="text-[#ff5005] font-medium">plans</span>
                </h2>
                <p className="text-lg text-black/50 font-light">
                  See what's included in each plan
                </p>
              </div>
              
              <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="text-left p-6 text-black font-medium">Feature</th>
                      <th className="text-center p-6 text-black font-medium">Starter</th>
                      <th className="text-center p-6 text-black font-medium bg-[#ff5005]/5">Professional</th>
                      <th className="text-center p-6 text-black font-medium">Business</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, i) => (
                      <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors">
                        <td className="p-6 text-black/70 font-light">{row.feature}</td>
                        <td className="p-6 text-center text-black/60 font-light">
                          {row.starter === '-' ? <span className="text-black/20">-</span> : row.starter}
                        </td>
                        <td className="p-6 text-center text-black/60 font-light bg-[#ff5005]/5">
                          {row.professional === '-' ? <span className="text-black/20">-</span> : row.professional}
                        </td>
                        <td className="p-6 text-center text-black/60 font-light">
                          {row.business === '-' ? <span className="text-black/20">-</span> : row.business}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* WHAT'S INCLUDED */}
          <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-light text-black mb-4">
                  Everything you need to <span className="text-[#ff5005] font-medium">succeed</span>
                </h2>
                <p className="text-lg text-black/50 font-light">
                  All plans include these powerful features
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: MessageSquare, title: 'Natural Conversations', desc: 'Human-like voice AI that understands context and nuance' },
                  { icon: Globe, title: '50+ Languages', desc: 'Speak to customers in their native language' },
                  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track calls, measure performance, optimize results' },
                  { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 Type II certified, HIPAA compliant' },
                  { icon: Phone, title: 'Phone Numbers', desc: 'Local numbers included in 100+ countries' },
                  { icon: Zap, title: 'Instant Setup', desc: 'Go live in minutes, not weeks' },
                  { icon: Headphones, title: 'Call Recording', desc: 'Review and learn from every conversation' },
                  { icon: Users, title: '14-Day Trial', desc: 'Try everything free, no credit card required' },
                ].map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="group p-6 rounded-2xl border border-black/10 hover:border-[#ff5005]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="w-12 h-12 bg-[#ff5005]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#ff5005]/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[#ff5005]" />
                      </div>
                      <h3 className="text-lg font-medium text-black mb-2">{feature.title}</h3>
                      <p className="text-black/50 font-light text-sm">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 px-6 bg-gradient-to-b from-white to-[#f8f9fa]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-light text-black mb-4">
                  Pricing <span className="text-[#ff5005] font-medium">FAQ</span>
                </h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className="bg-white border border-black/10 rounded-2xl overflow-hidden hover:border-[#ff5005]/30 transition-all duration-300"
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
                Ready to get <span className="text-[#ff5005] font-medium">started</span>?
              </h2>
              <p className="text-xl text-white/70 font-light mb-10 max-w-2xl mx-auto">
                Start your 14-day free trial today. No credit card required. 
                Build your first voice agent in minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="group bg-[#ff5005] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#e64804] flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button 
                  onClick={() => navigate('/solutions')}
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-base font-light hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  View Demo
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
                    {['Solutions', 'Enterprise', 'Pricing', 'Integrations'].map((item) => (
                      <a key={item} href="#" className="block text-black/40 hover:text-black text-sm font-light transition-all duration-300 hover:translate-x-1">{item}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-black text-sm font-medium mb-4">Resources</div>
                  <div className="space-y-3">
                    {['Documentation', 'API Reference', 'Blog', 'Support'].map((item) => (
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

