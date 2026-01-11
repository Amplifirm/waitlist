import { useState, useEffect } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { supabase } from '../lib/supabase';
import { Check, Zap, Shield, ArrowRight, Loader2, Mic, Phone, TrendingDown, Users } from 'lucide-react';
import SmoothCursor from '../components/SmoothCursor/SmoothCursor';
import SmoothScroll from '../components/SmoothScroll/SmoothScroll';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [totalSignups, setTotalSignups] = useState<number>(0);

  const FAKE_SIGNUPS_BASE = 347;

  useEffect(() => {
    fetchWaitlistStats();
  }, []);

  const fetchWaitlistStats = async () => {
    try {
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      if (!error && count !== null) {
        const totalWithFake = count + FAKE_SIGNUPS_BASE;
        setTotalSignups(totalWithFake);
      } else {
        setTotalSignups(FAKE_SIGNUPS_BASE);
      }
    } catch (err) {
      console.error('Error fetching waitlist stats:', err);
      setTotalSignups(FAKE_SIGNUPS_BASE);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: existing } = await supabase
        .from('waitlist')
        .select('position')
        .eq('email', email.toLowerCase())
        .single();

      if (existing) {
        setWaitlistPosition(existing.position + FAKE_SIGNUPS_BASE);
        setIsSubmitted(true);
        setIsSubmitting(false);
        return;
      }

      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      const position = (count || 0) + 1 + FAKE_SIGNUPS_BASE;

      const { error: insertError } = await supabase
        .from('waitlist')
        .insert({
          email: email.toLowerCase(),
          name: name.trim(),
          position: (count || 0) + 1,
          is_early_access: true,
          created_at: new Date().toISOString()
        });

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already on the waitlist');
        } else {
          throw insertError;
        }
        setIsSubmitting(false);
        return;
      }

      setWaitlistPosition(position);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error joining waitlist:', err);
      setError('Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <SmoothCursor />

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex items-center justify-center px-4 sm:px-8 py-4 sm:py-5">
          <img
            src="/amplifirm.ai (9).svg"
            alt="Amplifirm"
            className="h-6 sm:h-8 brightness-0 invert"
          />
        </div>
      </header>

      {/* Fixed ShaderGradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
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

      <SmoothScroll>
        <div className="min-h-screen relative z-10">
          {!isSubmitted ? (
            <>
              {/* HERO SECTION */}
              <section className="relative min-h-screen flex items-center pt-16 sm:pt-0">

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 w-full">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div className="order-2 lg:order-1">
                      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 animate-fadeInUp">
                          <Mic className="w-3 h-3 sm:w-4 sm:h-4 text-[#ff5005]" />
                          <span className="text-white/90 text-xs sm:text-sm font-light">First Prompt-Based Voice AI</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                          <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                          <span className="text-white/90 text-xs sm:text-sm font-light">95% Cheaper</span>
                        </div>
                      </div>

                      <h1 className="text-3xl sm:text-5xl lg:text-7xl font-light text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        Build voice agents <span className="text-[#ff5005] font-medium">with just a prompt</span>
                      </h1>

                      <p className="text-base sm:text-xl lg:text-2xl text-white/70 mb-6 sm:mb-8 leading-relaxed font-light animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        The world's first prompt-based voicebot maker. Inbound or outbound, deploy in minutes.
                      </p>

                      {/* Price comparison */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
                        <span className="text-white/40 text-xs sm:text-sm font-light line-through">$0.15/min</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/40" />
                        <span className="text-white font-medium text-xs sm:text-sm">$0.0075/min</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">95% OFF</span>
                      </div>

                      {/* Stats - Hidden on mobile, shown on desktop */}
                      <div className="hidden sm:grid grid-cols-2 gap-8 mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                        <div>
                          <div className="text-3xl font-light text-white">{totalSignups}+</div>
                          <div className="text-white/40 text-sm font-light">On waitlist</div>
                        </div>
                        <div>
                          <div className="text-3xl font-light text-[#ff5005]">50%</div>
                          <div className="text-white/40 text-sm font-light">Early bird discount</div>
                        </div>
                      </div>

                      {/* Features - Hidden on mobile */}
                      <div className="hidden sm:flex flex-wrap gap-6 animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
                        <div className="flex items-center gap-2 text-white/60">
                          <Phone className="w-4 h-4 text-[#ff5005]" />
                          <span className="text-sm font-light">Inbound & Outbound</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <Zap className="w-4 h-4 text-[#ff5005]" />
                          <span className="text-sm font-light">Deploy in Minutes</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <Shield className="w-4 h-4 text-[#ff5005]" />
                          <span className="text-sm font-light">Enterprise Ready</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Form Card */}
                    <div className="animate-fadeInUp order-1 lg:order-2" style={{ animationDelay: '0.4s' }}>
                      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl">
                        <div className="text-center mb-5 sm:mb-8">
                          <h2 className="text-xl sm:text-2xl font-light text-black mb-1 sm:mb-2">Get Early Access</h2>
                          <p className="text-black/50 font-light text-sm sm:text-base">Join {totalSignups}+ others on the waitlist</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                          <div>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your name"
                              className="w-full bg-black/5 border border-black/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-black placeholder-black/30 focus:outline-none focus:border-[#ff5005] transition-all text-base font-light"
                            />
                          </div>

                          <div>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@company.com"
                              className="w-full bg-black/5 border border-black/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-black placeholder-black/30 focus:outline-none focus:border-[#ff5005] transition-all text-base font-light"
                            />
                          </div>

                          {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-600 text-sm font-light">
                              {error}
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#ff5005] hover:bg-[#e64804] text-white font-medium py-3 sm:py-4 rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                Joining...
                              </>
                            ) : (
                              <>
                                Join the Waitlist
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </form>

                        {/* Benefits */}
                        <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-black/10">
                          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                            <div>
                              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5005] mx-auto mb-1 sm:mb-2" />
                              <span className="text-black/40 text-[10px] sm:text-xs font-light">Priority Access</span>
                            </div>
                            <div>
                              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5005] mx-auto mb-1 sm:mb-2" />
                              <span className="text-black/40 text-[10px] sm:text-xs font-light">50% Off Forever</span>
                            </div>
                            <div>
                              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5005] mx-auto mb-1 sm:mb-2" />
                              <span className="text-black/40 text-[10px] sm:text-xs font-light">Direct Support</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden sm:block">
                  <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white/60 rounded-full"></div>
                  </div>
                </div>
              </section>

              {/* WHY JOIN EARLY */}
              <section className="py-16 sm:py-32 px-4 sm:px-6 bg-white/95 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                    <div>
                      <p className="text-[#ff5005] text-xs sm:text-sm font-medium uppercase tracking-widest mb-3 sm:mb-4">Early Access</p>
                      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-black mb-6 sm:mb-10 leading-tight">
                        Why join the <span className="text-[#ff5005] font-medium">early access</span>?
                      </h2>

                      <div className="space-y-5 sm:space-y-8">
                        <div className="flex gap-3 sm:gap-5 group">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#ff5005] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-base sm:text-xl">1</span>
                          </div>
                          <div>
                            <h4 className="text-base sm:text-xl font-medium text-black mb-1 sm:mb-2">Lock in 50% Off Forever</h4>
                            <p className="text-black/50 font-light leading-relaxed text-sm sm:text-base">Early members get permanent pricing that never increases.</p>
                          </div>
                        </div>

                        <div className="flex gap-3 sm:gap-5 group">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#ff5005] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-base sm:text-xl">2</span>
                          </div>
                          <div>
                            <h4 className="text-base sm:text-xl font-medium text-black mb-1 sm:mb-2">Shape the Product</h4>
                            <p className="text-black/50 font-light leading-relaxed text-sm sm:text-base">Your feedback directly influences our roadmap.</p>
                          </div>
                        </div>

                        <div className="flex gap-3 sm:gap-5 group">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#ff5005] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-base sm:text-xl">3</span>
                          </div>
                          <div>
                            <h4 className="text-base sm:text-xl font-medium text-black mb-1 sm:mb-2">First Mover Advantage</h4>
                            <p className="text-black/50 font-light leading-relaxed text-sm sm:text-base">Automate before competitors know it's possible.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Code mockup - Hidden on small mobile */}
                    <div className="bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl hidden sm:block">
                      <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27ca40]" />
                        <span className="text-white/20 text-xs ml-2 sm:ml-3 font-mono">voicebot.ts</span>
                      </div>
                      <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
                        <div className="text-white/30">// That's literally it.</div>
                        <div className="mt-3 sm:mt-4">
                          <span className="text-purple-400">const</span>
                          <span className="text-white"> agent </span>
                          <span className="text-white/40">=</span>
                          <span className="text-blue-400"> amplifirm</span>
                          <span className="text-white/40">.</span>
                          <span className="text-yellow-400">voice</span>
                          <span className="text-white/40">(</span>
                        </div>
                        <div className="pl-3 sm:pl-4">
                          <span className="text-green-400">"Handle inbound support calls.</span>
                        </div>
                        <div className="pl-3 sm:pl-4">
                          <span className="text-green-400"> Be friendly and book appointments."</span>
                        </div>
                        <div><span className="text-white/40">)</span></div>
                        <div className="mt-3 sm:mt-4">
                          <span className="text-white">agent</span>
                          <span className="text-white/40">.</span>
                          <span className="text-yellow-400">deploy</span>
                          <span className="text-white/40">()</span>
                        </div>
                        <div className="mt-4 sm:mt-5 flex items-center gap-2 pt-3 sm:pt-4 border-t border-white/10">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                          <span className="text-green-400 text-xs sm:text-sm">Live on +1 (555) 123-4567</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* STATS */}
              <section className="py-12 sm:py-20 px-4 sm:px-6 bg-black/90 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
                    <div className="group">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-light text-white mb-1 sm:mb-2">95%</div>
                      <div className="text-white/50 font-light text-xs sm:text-sm">Cost Savings</div>
                    </div>
                    <div className="group">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-light text-white mb-1 sm:mb-2">2min</div>
                      <div className="text-white/50 font-light text-xs sm:text-sm">To Deploy</div>
                    </div>
                    <div className="group">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#ff5005] mb-1 sm:mb-2">{totalSignups}+</div>
                      <div className="text-white/50 font-light text-xs sm:text-sm">Waitlist</div>
                    </div>
                    <div className="group">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-light text-white mb-1 sm:mb-2">24/7</div>
                      <div className="text-white/50 font-light text-xs sm:text-sm">AI Availability</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FINAL CTA */}
              <section className="relative py-16 sm:py-32 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-2xl sm:text-4xl lg:text-6xl font-light text-white mb-4 sm:mb-6">
                    Ready to build your <span className="text-[#ff5005] font-medium">voice AI</span>?
                  </h2>
                  <p className="text-base sm:text-xl text-white/70 font-light mb-6 sm:mb-10 max-w-2xl mx-auto">
                    Join {totalSignups}+ others on the waitlist.
                  </p>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="group bg-[#ff5005] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-[#e64804] flex items-center gap-2 transition-all duration-300 active:scale-95 mx-auto text-sm sm:text-base"
                  >
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>

              {/* FOOTER */}
              <footer className="bg-white/95 backdrop-blur-sm py-8 sm:py-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto flex items-center justify-center">
                  <p className="text-black/40 text-xs sm:text-sm font-light">© 2025 Amplifirm. All rights reserved.</p>
                </div>
              </footer>
            </>
          ) : (
            /* SUCCESS STATE - Simple confirmation */
            <section className="relative min-h-screen flex items-center justify-center px-4">
              <div className="max-w-md mx-auto text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ff5005] flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-fadeInUp">
                  <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  You're in, {name.split(' ')[0]}!
                </h1>

                <p className="text-white/60 font-light text-base sm:text-lg mb-6 sm:mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  You're #{waitlistPosition} on the waitlist. We'll email you when it's your turn.
                </p>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <p className="text-white/40 text-xs sm:text-sm font-light uppercase tracking-widest mb-2">Your position</p>
                  <div className="text-5xl sm:text-6xl font-light text-white">#{waitlistPosition}</div>
                </div>
              </div>
            </section>
          )}
        </div>
      </SmoothScroll>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
      `}</style>
    </>
  );
}
