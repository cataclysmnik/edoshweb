"use client"
import Beams from "@/Backgrounds/Beams/Beams";
import BlurText from "@/TextAnimations/BlurText/BlurText";
import BlurButton from "@/Components/Buttons/blur";
import ActionButton from "@/Components/Buttons/action";
import { GoArrowUpRight } from "react-icons/go";
import AnimatedContent from "@/Animations/AnimatedContent/AnimatedContent";
import MagicBento from "@/Components/MagicBento/MagicBento";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

export default function Home() {
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
  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent to-black" />
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
                <BlurButton primaryColor="#ffffff" className="md:text-2xl">
                  Learn More
                </BlurButton>
                <ActionButton className="md:text-2xl">
                  Github
                  <GoArrowUpRight
                    aria-hidden="true"
                  />
                </ActionButton>
                </div>
            </AnimatedContent>
          </div>
        </div>
      </section>
      <section id="showcase" className="relative min-h-screen flex items-center justify-center">
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
      </section>
    </div>
  );
}
