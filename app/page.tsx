"use client"
import Beams from "@/Backgrounds/Beams/Beams";
import BlurText from "@/TextAnimations/BlurText/BlurText";
import BlurButton from "@/Components/Buttons/blur";
import ActionButton from "@/Components/Buttons/action";
import { GoArrowUpRight } from "react-icons/go";
import AnimatedContent from "@/Animations/AnimatedContent/AnimatedContent";
import MagicBento from "@/Components/MagicBento/MagicBento";
import ScrollReveal from "@/TextAnimations/ScrollReveal";
import { useEffect } from "react";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

export default function Home() {
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
  return (
    <div>
      <section id="home" className="relative min-h-screen flex items-center justify-center">
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
      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-b from-transparent to-black" />
        <div className="z-20 p-8 flex flex-col items-center justify-center text-center">
          <BlurText
            text="edosh"
            delay={300}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="md:text-[192px] text-7xl mb-4 font-black text-center"
          />
          <BlurText
            text="A beginner-friendly Linux shell built for learning."
            delay={300}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="md:text-5xl text-2xl text-center max-w-6xl"
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
                <div className="mt-12 flex flex-row gap-4">
                <a href="#showcase">
                  <BlurButton primaryColor="#ffffff" className="md:text-2xl">
                    Learn More
                  </BlurButton>
                </a>
                <a href="https://github.com/cataclysmnik/edoX-shell" target="blank">
                <ActionButton className="md:text-2xl">
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
      <section id="showcase" className="relative min-h-screen flex flex-col items-center justify-center">
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
      <section id="about" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 flex items-center justify-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={0}
            blurStrength={6}
            containerClassName="text-center"
            textClassName="text-zinc-400 font-light"
          >
            The command line doesn't have to be intimidating. edosh reimagines the terminal experience 
            for those just starting their journey into Linux and system administration.
          </ScrollReveal>

          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={0}
            blurStrength={6}
            containerClassName="text-center"
            textClassName="text-zinc-400 font-light"
          >
            Instead of cryptic error messages and trial-and-error learning, edosh provides clear guidance 
            and context at every step. Understanding comes first, proficiency follows naturally.
          </ScrollReveal>

          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            baseRotation={0}
            blurStrength={6}
            containerClassName="text-center"
            textClassName="text-zinc-400 font-light"
          >
            Built for learners who want to master the terminal with confidence, not confusion.
          </ScrollReveal>
        </div>
      </section>

      <section id="features" className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-32">
          
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
    </div>
  );
}
