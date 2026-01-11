import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import SmoothCursor from '../components/SmoothCursor/SmoothCursor';

export default function Landing() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      sessionStorage.setItem('initialPrompt', input);
      navigate('/dashboard');
    }
  };

  const handleSubmit = () => {
    if (input.trim()) {
      sessionStorage.setItem('initialPrompt', input);
      navigate('/dashboard');
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
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={3.6}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#ff5005"
            color2="#dbba95"
            color3="#d0bce1"
            grain="on"
            lightType="3d"
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            type="plane"
            uDensity={1.3}
            uFrequency={5.5}
            uSpeed={0.4}
            uStrength={4}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 animate-fade-in-down">
        <img src="/amplifirm.ai (9).svg" alt="Amplifirm" className="h-8" />
        <nav className="flex items-center gap-8">
          <button onClick={() => navigate('/solutions')} className="text-gray-700 hover:text-gray-900 text-base font-medium transition-colors">Solutions</button>
          <button onClick={() => navigate('/enterprise')} className="text-gray-700 hover:text-gray-900 text-base font-medium transition-colors">Enterprise</button>
          <button onClick={() => navigate('/pricing')} className="text-gray-700 hover:text-gray-900 text-base font-medium transition-colors">Pricing</button>
          <button onClick={() => navigate('/community')} className="text-gray-700 hover:text-gray-900 text-base font-medium transition-colors">Community</button>
        </nav>
        <div className="flex items-center gap-3">
          <SignedOut>
            <button onClick={() => navigate('/sign-in')} className="text-gray-700 hover:text-gray-900 text-base font-medium px-5 py-2.5 transition-colors">
              Log in
            </button>
            <button onClick={() => navigate('/sign-up')} className="bg-[#ff5005] text-white text-base font-medium px-5 py-2.5 rounded-full hover:bg-[#e64804] transition-colors">
              Sign up
            </button>
          </SignedOut>
          <SignedIn>
            <button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-gray-900 text-base font-medium px-5 py-2.5 transition-colors">
              Dashboard
            </button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 text-center mb-6 animate-fade-in-up">
          What can we automate for you?
        </h1>

        {/* Main Input Card */}
        <div className="w-full max-w-2xl animate-fade-in-up animation-delay-100">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Build a voice agent that handles customer support..."
                className="w-full bg-transparent text-gray-800 text-base placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between px-4 pb-4">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Attach
                </button>
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                  </svg>
                  Template
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
      `}</style>
    </div>
    </>
  );
}
