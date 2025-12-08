"use client";
import AnimatedContent from "@/Animations/AnimatedContent/AnimatedContent";
import { useEffect } from "react";

export default function GettingStarted() {
  // Reset body opacity on mount to fix blank screen after transition
  useEffect(() => {
    document.body.style.opacity = "1";
    document.body.style.transition = "";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FF6546]/10 to-black/80 px-4 py-20">
      <AnimatedContent direction="vertical" distance={60} duration={1.2} ease="power3.out" initialOpacity={0} animateOpacity threshold={0.2}>
        <h1 className="text-5xl md:text-7xl font-black text-[#FF6546] mb-8 text-center">Getting Started</h1>
        <p className="max-w-2xl text-lg md:text-2xl text-gray-300 text-center mb-8">
          Welcome to edosh! This guide will help you set up your environment and run your first commands. Whether you're new to Linux or just new to edosh, you'll be up and running in minutes.
        </p>
        <div className="bg-black/40 rounded-2xl p-8 shadow-xl max-w-xl mx-auto">
          <ol className="list-decimal list-inside space-y-4 text-left text-gray-200">
            <li>
              <span className="font-bold text-[#FF6546]">Install edosh:</span> Download the latest release from <a href="https://github.com/cataclysmnik/edoX-shell" className="underline hover:text-[#FF6546]">GitHub</a> and follow the instructions for your OS.
            </li>
            <li>
              <span className="font-bold text-[#FF6546]">Open your terminal:</span> Launch edosh from your terminal or command prompt.
            </li>
            <li>
              <span className="font-bold text-[#FF6546]">Try your first command:</span> Type <code className="bg-zinc-800 px-2 py-1 rounded">help</code> to see available commands and features.
            </li>
            <li>
              <span className="font-bold text-[#FF6546]">Explore:</span> Use <code className="bg-zinc-800 px-2 py-1 rounded">tutorial</code> to start an interactive walkthrough.
            </li>
          </ol>
        </div>
      </AnimatedContent>
    </div>
  );
}
