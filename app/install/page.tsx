"use client"

import { useEffect, useState } from "react";
import AnimatedContent from "@/Animations/AnimatedContent/AnimatedContent";
import ScrollReveal from "@/TextAnimations/ScrollReveal";
import BlurText from "@/TextAnimations/BlurText/BlurText";

interface InstallMethod {
  title: string;
  description: string;
  steps: string[];
  code: string;
}

export default function InstallPage() {
  const [activeTab, setActiveTab] = useState<"quick" | "manual" | "docker">("quick");
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Scroll to top of page on mount
    window.scrollTo(0, 0);
    
    // Remove transitioning class and show scrollbar after 2 seconds
    const showScrollbarTimeout = setTimeout(() => {
      document.documentElement.classList.remove('transitioning');
      document.documentElement.classList.remove('scrolling-hidden');
      document.documentElement.classList.add('scrolling');
    }, 2000);
    
    // Initialize Lenis for smooth scroll
    let lenisInstance: any;
    
    (async () => {
      const module = await import("lenis");
      const Lenis = module.default || module;
      lenisInstance = new Lenis({ autoRaf: true });
    })();

    return () => {
      if (lenisInstance?.destroy) lenisInstance.destroy();
      clearTimeout(showScrollbarTimeout);
    };
  }, []);

  const installMethods: Record<string, InstallMethod> = {
    quick: {
      title: "Quick Install",
      description: "One-command installation (Recommended)",
      steps: [
        "Clones the repository",
        "Builds the shell binary",
        "Copies to system bin",
        "Makes it accessible globally",
      ],
      code: `git clone https://github.com/cataclysmnik/edoX-shell.git && \\
cd edoX-shell && \\
make && \\
sudo cp edosh /usr/local/bin/ && \\
echo "EDOSH installed successfully! Run 'edosh' to start."`,
    },
    manual: {
      title: "Manual Installation",
      description: "Step-by-step installation for full control",
      steps: [
        "Clone repository",
        "Verify source files",
        "Compile shell",
        "Test binary",
        "Install system-wide (optional)",
      ],
      code: `# Step 1: Clone
git clone https://github.com/cataclysmnik/edoX-shell.git
cd edoX-shell

# Step 2: Verify
ls src/

# Step 3: Compile
make

# Step 4: Test
./edosh

# Step 5: Install (optional)
sudo cp edosh /usr/local/bin/`,
    },
    docker: {
      title: "Docker Installation",
      description: "Containerized installation for portability",
      steps: [
        "Ensure Docker is installed",
        "Create Dockerfile",
        "Build container image",
        "Run container",
      ],
      code: `# Build
docker build -t edosh .

# Run
docker run -it edosh`,
    },
  };

  const requirements = [
    {
      category: "Operating Systems",
      items: ["Ubuntu 18.04+", "Debian 10+", "Fedora 30+", "Arch Linux", "CentOS 7+"],
    },
    {
      category: "Essential Build Tools",
      items: ["gcc/clang (C compiler)", "make (Build automation)", "git (Version control)"],
    },
    {
      category: "Optional Dependencies",
      items: ["g++ (C++ support)", "python3 (Python support)", "openjdk-11-jdk (Java support)"],
    },
  ];

  const features = [
    {
      title: "Educational Mode",
      description: "Built-in tutorials and contextual tips help students learn",
    },
    {
      title: "Smart Autocomplete",
      description: "Tab completion for commands, files, and directories",
    },
    {
      title: "Git Integration",
      description: "Real-time repository info in your prompt",
    },
    {
      title: "Code Runner",
      description: "Compile & run C/C++, Python, Java directly",
    },
    {
      title: "Error Suggestions",
      description: "Smart typo detection and helpful messages",
    },
    {
      title: "Command History",
      description: "Navigate history with arrow keys, view with 'history'",
    },
  ];

  const troubleshootSteps = [
    {
      problem: "gcc: command not found",
      solution: "sudo apt install build-essential",
      os: "Ubuntu/Debian",
    },
    {
      problem: "edosh: command not found",
      solution: "echo 'export PATH=\"$HOME/.local/bin:$PATH\"' >> ~/.bashrc",
      os: "All",
    },
    {
      problem: "Permission denied",
      solution: "chmod +x edosh",
      os: "All",
    },
    {
      problem: "Tab autocomplete not working",
      solution: "export TERM=xterm-256color",
      os: "Linux",
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installMethods[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAccordion = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  if (!mounted) return null;

  return (
    <div className="overflow-x-hidden bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
          >
            <BlurText
              text="Installation Guide"
              delay={200}
              animateBy="words"
              direction="bottom"
              className="text-5xl md:text-7xl font-black"
            />
          </AnimatedContent>

          <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            delay={0.2}
            threshold={0.2}
          >
            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-3xl mx-auto">
              Get started with EDOSH in minutes. Choose the installation method that works best for you.
            </p>
          </AnimatedContent>

          <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            duration={1.4}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            delay={0.4}
            threshold={0.2}
          >
            <div className="flex justify-center gap-4 flex-wrap pt-8">
              <div className="px-6 py-3 rounded-lg border border-zinc-700 text-sm text-zinc-400">
                ~5 minutes to install
              </div>
              <div className="px-6 py-3 rounded-lg border border-zinc-700 text-sm text-zinc-400">
                Multiple OS support
              </div>
              <div className="px-6 py-3 rounded-lg border border-zinc-700 text-sm text-zinc-400">
                Simple requirements
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* System Requirements */}
      <section id="requirements" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            containerClassName="mb-16"
            textClassName="text-4xl md:text-5xl font-black"
          >
            System Requirements
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {requirements.map((req, idx) => (
              <AnimatedContent
                key={idx}
                distance={30}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                delay={idx * 0.1}
                threshold={0.3}
              >
                <div className="p-6 rounded-xl border border-zinc-700 hover:border-orange-500/50 transition-colors duration-300 bg-zinc-900/50 hover:bg-zinc-900/80 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-4 text-orange-500">{req.category}</h3>
                  <ul className="space-y-2 flex-1">
                    {req.items.map((item, i) => (
                      <li key={i} className="text-zinc-400 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Methods */}
      <section id="methods" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            containerClassName="mb-16"
            textClassName="text-4xl md:text-5xl font-black"
          >
            Installation Methods
          </ScrollReveal>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-zinc-700 overflow-x-auto">
            {(["quick", "manual", "docker"] as const).map((method) => (
              <button
                key={method}
                onClick={() => setActiveTab(method)}
                className={`px-6 py-3 font-semibold capitalize transition-colors duration-300 border-b-2 flex-1 min-w-max ${
                  activeTab === method
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-zinc-500 hover:text-zinc-400"
                }`}
              >
                {method}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Description & Steps */}
            <AnimatedContent
              distance={30}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.3}
            >
              <div className="p-8 rounded-xl border-2 border-orange-500/30 bg-linear-to-br from-orange-500/10 to-red-500/10 h-full flex flex-col">
                <h3 className="text-3xl font-bold mb-2">{installMethods[activeTab].title}</h3>
                <p className="text-zinc-400 mb-6">{installMethods[activeTab].description}</p>

                <div className="space-y-3 flex-1">
                  <h4 className="text-sm font-semibold text-zinc-500 uppercase">What happens:</h4>
                  {installMethods[activeTab].steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-xs font-bold text-orange-500 shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-zinc-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContent>

            {/* Right Side - Code Block */}
            <AnimatedContent
              distance={30}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              delay={0.1}
              threshold={0.3}
            >
              <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-700 overflow-auto h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-zinc-500 font-mono">terminal</span>
                  <div className="relative">
                    <button
                      onClick={handleCopy}
                      className="relative text-xs px-5 py-2 rounded bg-orange-500/30 hover:bg-orange-500/50 text-orange-100 font-bold shadow-lg transition-all duration-300 backdrop-blur-md border border-orange-500/40 overflow-hidden"
                      style={{ minWidth: '90px' }}
                    >
                      <span
                        className={`absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-400 ${copied ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                        aria-hidden={copied}
                      >Copy</span>
                      <span
                        className={`absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-400 ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                        aria-hidden={!copied}
                      >Copied!</span>
                    </button>
                  </div>
                </div>
                <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap break-words flex-1 no-scrollbar" style={{overflowX: 'hidden'}}>
                  {installMethods[activeTab].code}
                </pre>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            containerClassName="mb-16"
            textClassName="text-4xl md:text-5xl font-black"
          >
            What You Get
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <AnimatedContent
                key={idx}
                distance={30}
                direction="vertical"
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                delay={idx * 0.08}
                threshold={0.3}
              >
                <div className="p-6 rounded-xl bg-linear-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 h-full flex flex-col">
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm flex-1">{feature.description}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="setup" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            containerClassName="mb-16"
            textClassName="text-4xl md:text-5xl font-black"
          >
            First-Time Setup
          </ScrollReveal>

          <div className="space-y-6">
            {[
              { cmd: "edosh", desc: "Start the shell" },
              { cmd: "learning on", desc: "Enable educational mode for beginners" },
              { cmd: "tutorial", desc: "Start interactive tutorial" },
              { cmd: "ls <TAB>", desc: "Try autocomplete with Tab key" },
              { cmd: "explain ls", desc: "View detailed command explanations" },
              { cmd: "history", desc: "Check command history" },
            ].map((item, idx) => (
              <AnimatedContent
                key={idx}
                distance={20}
                direction="vertical"
                duration={0.6}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                delay={idx * 0.08}
                threshold={0.3}
              >
                <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-700 hover:border-zinc-600 transition-colors">
                  <code className="text-orange-500 font-mono font-bold text-sm whitespace-nowrap">
                    ${item.cmd}
                  </code>
                  <p className="text-zinc-400 text-sm flex-1">{item.desc}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.1}
            containerClassName="mb-16"
            textClassName="text-4xl md:text-5xl font-black"
          >
            Troubleshooting
          </ScrollReveal>

          <div className="space-y-3">
            {troubleshootSteps.map((item, idx) => (
              <AnimatedContent
                key={idx}
                distance={20}
                direction="vertical"
                duration={0.6}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                delay={idx * 0.08}
                threshold={0.3}
              >
                <div className="rounded-xl border border-zinc-700 bg-zinc-900/30 overflow-hidden">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-6 flex items-center justify-between hover:bg-zinc-900/60 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-red-500">{item.problem}</h4>
                    </div>
                    <div className="ml-4 shrink-0">
                      <svg
                        className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                          expandedItem === idx ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: expandedItem === idx ? "500px" : "0px",
                    }}
                  >
                    <div className="px-6 pb-6 pt-4 border-t border-zinc-700">
                      <p className="text-zinc-400 text-sm mb-3">
                        <span className="font-semibold text-zinc-300">Solution:</span> {item.solution}
                      </p>
                      <span className="inline-block px-3 py-1 text-xs bg-zinc-800 text-zinc-400 rounded">
                        {item.os}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <AnimatedContent
            distance={30}
            direction="vertical"
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.3}
          >
            <h2 className="text-4xl md:text-5xl font-black">Ready to get started?</h2>
            <p className="text-xl text-zinc-400">
              Choose your preferred installation method above and follow the steps. You'll be running EDOSH in minutes.
            </p>
          </AnimatedContent>

          <AnimatedContent
            distance={30}
            direction="vertical"
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            delay={0.2}
            threshold={0.3}
          >
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="https://github.com/cataclysmnik/edoX-shell"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
              >
                View on GitHub
              </a>
              <a
                href="/#features"
                className="px-8 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-white font-semibold transition-colors"
              >
                Learn More
              </a>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </div>
  );
}
