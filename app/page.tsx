"use client"
import Beams from "@/Backgrounds/Beams/Beams";
import ElegantExplodeText from "@/Components/ElegantExplodeText/ElegantExplodeText";
import BlurText from "@/TextAnimations/BlurText/BlurText";
import BlurButton from "@/Components/Buttons/blur";
import ActionButton from "@/Components/Buttons/action";
import { GoArrowUpRight } from "react-icons/go";
import AnimatedContent from "@/Animations/AnimatedContent/AnimatedContent";
import MagicBento from "@/Components/MagicBento/MagicBento";
import ScrollReveal from "@/TextAnimations/ScrollReveal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [elasticOffset, setElasticOffset] = useState(0);
  const router = useRouter();

  // Initialize Lenis on the client only
  useEffect(() => {
    let lenisInstance: any;
    let mounted = true;

    (async () => {
      const module = await import("lenis");
      const Lenis = module.default || module;
      if (!mounted) return;

      lenisInstance = new Lenis({ autoRaf: true });
      lenisInstance.on("scroll", (e: unknown) => {
        console.log(e);
      });
    })();

    return () => {
      mounted = false;
      if (lenisInstance && typeof lenisInstance.destroy === "function") {
        lenisInstance.destroy();
      }
    };
  }, []);

  // Beautiful scroll-triggered transition with elastic resistance
  useEffect(() => {
    // Reset body opacity on mount
    document.body.style.opacity = "1";
    document.body.style.transition = "";
    
    let lastScrollTime = Date.now();
    let scrollTimeout: NodeJS.Timeout;
    let animationFrame: number;
    
    const handleScroll = () => {
      const transitionSection = document.getElementById("scroll-transition");
      if (!transitionSection || isTransitioning) return;
      
      const rect = transitionSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      lastScrollTime = Date.now();
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Calculate progress based on how much of the transition section is visible
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const totalHeight = rect.height;
        let progress = visibleHeight / totalHeight;
        
        // Apply elastic resistance effect (stronger as you scroll further)
        const resistance = 0.3 + (progress * 0.4); // Resistance increases from 0.3 to 0.7
        progress = progress * resistance;
        
        setTransitionProgress(progress);
        setElasticOffset(progress * 20); // Visual offset for elastic effect
        
        // Set timeout to bounce back after user stops scrolling
        scrollTimeout = setTimeout(() => {
          const now = Date.now();
          if (now - lastScrollTime >= 300) {
            // Animate back to 0
            let currentOffset = elasticOffset;
            const bounceBack = () => {
              currentOffset *= 0.9;
              setElasticOffset(currentOffset);
              setTransitionProgress(prev => prev * 0.9);
              
              if (Math.abs(currentOffset) > 0.5) {
                animationFrame = requestAnimationFrame(bounceBack);
              } else {
                setElasticOffset(0);
                setTransitionProgress(0);
              }
            };
            bounceBack();
          }
        }, 300);
        
        // Trigger transition when 85% through the section (higher threshold due to resistance)
        if (progress > 0.6 && !isTransitioning) {
          setIsTransitioning(true);
          
          // Hide scrollbar during transition
          document.documentElement.classList.add('transitioning');
          
          // Add fade-out animation before navigation
          document.body.style.transition = "opacity 0.8s ease-out";
          document.body.style.opacity = "0";
          
          setTimeout(() => {
            // Scroll to top before navigating
            window.scrollTo(0, 0);
            router.push("/install");
          }, 800);
          
          // Restore scrollbar after 2 seconds
          setTimeout(() => {
            document.documentElement.classList.remove('transitioning');
          }, 2000);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [router, isTransitioning, elasticOffset]);

  return (
    <div className="overflow-x-hidden">
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div style={{ width: '100%', height: '100vh', position: 'absolute', inset: 0 }}>
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={0}
          />
        </div>
      {/* gradient overlay between background beams and content */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-b from-transparent to-[#0a0a0a]" />
        <div className="z-20 p-4 md:p-8 flex flex-col items-center justify-center text-center w-full max-w-full">
          <BlurText
            text="edosh"
            delay={300}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="text-6xl md:text-[192px] mb-4 font-black text-center"
          />
          <BlurText
            text="A beginner-friendly Linux shell built for learning."
            delay={300}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="text-xl md:text-5xl text-center max-w-6xl px-4"
          />
          <div>
            <AnimatedContent
              distance={30}
              direction="vertical"
              reverse={false}
              duration={1.2}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.2}
              delay={1}
              >
                <div className="mt-12 flex flex-row flex-wrap justify-center gap-3 md:gap-4">
                <a href="#showcase">
                  <BlurButton primaryColor="#ffffff" className="text-lg md:text-2xl">
                    Learn More
                  </BlurButton>
                </a>
                <a href="https://github.com/cataclysmnik/edoX-shell" target="blank">
                <ActionButton className="text-lg md:text-2xl">
                  Github
                  <GoArrowUpRight
                    aria-hidden="true"
                  />
                </ActionButton>
                </a>
                </div>
            </AnimatedContent>
          </div>
        </div>
      </section>
      <section id="showcase" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <AnimatedContent
          distance={30}
          direction="vertical"
          reverse={false}
          duration={1}
          ease="power3.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1}
          threshold={0.5}
          delay={.1}
        >
          <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="255, 101, 70"
          />
        </AnimatedContent>
      </section>
      
      {/* About Section */}
      <section id="about" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 flex items-center justify-center overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-12 w-full">
          <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0.2}
          >
            <div className="text-3xl md:text-5xl font-extrabold text-center text-zinc-100 mb-8">
              The command line is no longer intimidating.<br className="hidden md:inline" />
              <span className="text-orange-400">Edosh</span> transforms the terminal into a playground for curiosity and mastery.
            </div>
          </AnimatedContent>

          <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0.4}
          >
            <div className="text-xl md:text-3xl font-light text-center text-zinc-300">
              No more cryptic errors or trial-and-error. <span className="text-orange-400 font-semibold">Edosh</span> guides you with clarity, context, and confidence.<br className="hidden md:inline" />
              Understanding comes first, proficiency follows naturally.
            </div>
          </AnimatedContent>

          <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
            delay={0.6}
          >
            <div className="text-xl md:text-3xl font-light text-center text-zinc-300">
              Built for learners who want to master the terminal with <span className="text-orange-400 font-semibold">confidence</span>, not confusion.<br className="hidden md:inline" />
              <span className="text-orange-400">Explore. Experiment. Excel.</span>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section id="features" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32 w-full">
          
          {/* Feature 1 - Educational (gif left, text right) */}
          <AnimatedContent
            distance={60}
            direction="horizontal"
            reverse={false}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.3}
            delay={0.1}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1 group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:scale-[1.02]">
                  <img 
                    src="/gifs/educational.gif" 
                    alt="Educational features"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-101"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold text-[#FF6546]">
                  Built for Learning
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Interactive tutorials and guided lessons help you master command-line basics. 
                  Learn at your own pace with real-time feedback and helpful hints.
                </p>
              </div>
            </div>
          </AnimatedContent>

          {/* Feature 2 - Technical (text left, gif right) */}
          <AnimatedContent
            distance={60}
            direction="horizontal"
            reverse={true}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.3}
            delay={0.1}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold text-[#FF6546]">
                  Powerful Features
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Modern shell capabilities with tab completion, command history, and syntax highlighting. 
                  All the power you need, without the complexity.
                </p>
              </div>
              <div className="group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:scale-[1.02]">
                  <img 
                    src="/gifs/technical.gif" 
                    alt="Technical features"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-101"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* Feature 3 - Developer (gif left, text right) */}
          <AnimatedContent
            distance={60}
            direction="horizontal"
            reverse={false}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.3}
            delay={0.1}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1 group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:scale-[1.02]">
                  <img 
                    src="/gifs/developer.gif"
                    alt="Developer features"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-101"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold text-[#FF6546]">
                  Developer Friendly
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Extensible architecture with plugin support and customizable themes. 
                  Integrate seamlessly with your development workflow and favorite tools.
                </p>
              </div>
            </div>
          </AnimatedContent>

        </div>
      </section>
      {/* Transition to Getting Started */}
      <section 
        id="scroll-transition" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, transparent ${Math.max(0, 100 - transitionProgress * 100)}%, rgba(255, 101, 70, ${transitionProgress * 0.2}) 100%)`,
          maxWidth: '100vw',
          width: '100%'
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, #0a0a0a 100%)',
            opacity: transitionProgress * 0.6
          }}
        />
        <AnimatedContent 
          direction="vertical" 
          distance={60} 
          duration={1.2} 
          ease="power3.out" 
          initialOpacity={0} 
          animateOpacity 
          threshold={0.1}
        >
          <div 
            className="flex flex-col items-center justify-center gap-8 px-4"
            style={{
              opacity: 1 - transitionProgress * 0.5,
              transform: `translateY(${transitionProgress * -50}px)`,
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
            }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#FF6546] text-center">
              Ready to install?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl leading-relaxed">
              Scroll down to explore installation options and get edosh running on your system.
            </p>
            <a 
              href="/install" 
              className="inline-block px-10 py-5 rounded-2xl bg-[#FF6546] text-white font-bold text-xl shadow-2xl hover:scale-110 hover:shadow-[0_0_40px_rgba(255,101,70,0.6)] transition-all duration-300"
            >
              Install Now
            </a>
            <div className="flex flex-col items-center gap-4 mt-8">
              <p className="text-gray-500 text-sm">Keep scrolling to continue</p>
              <svg 
                className="w-6 h-6 text-[#FF6546] animate-bounce" 
                fill="none" 
                strokeWidth="2" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </AnimatedContent>
        
        {/* Transition overlay that grows as you scroll */}
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF6546 0%, #0a0a0a 100%)',
            opacity: Math.max(0, transitionProgress - 0.5) * 2,
            maxWidth: '100vw',
            width: '100%'
          }}
        />
      </section>
    </div>
  );
}
