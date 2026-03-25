import React from 'react';

export const ExperienceView: React.FC = () => {
  const experiences = [
    {
      period: "2024.03 — PRESENT",
      role: "LEAD ML ENGINEER",
      company: "QU_SOLUTIONS",
      status: "RUNNING",
      highlights: [
        {
          title: "Agentic Health System",
          desc: "Led a team to build a mobile health consultant using LangGraph to reason over unstructured data. Resulted in 50+ early health alerts."
        },
        {
          title: "Adaptive Planner",
          desc: "Developed a cross-platform mobile planner with adaptive AI models. Achieved a 24% increase in user engagement through personalized coaching."
        },
        {
          title: "Computer Vision (QUPerfume)",
          desc: "Engineered a mobile app for perfume identification using CV & OCR. Boosted recommendation CTR by 13.5%."
        },
        {
          title: "Team Leadership",
          desc: "Managed 2-3 ML engineers and owned the full ML pipeline from data to monitoring."
        }
      ]
    },
    {
      period: "2023.03 — 2024.03",
      role: "ML ENGINEER",
      company: "ADOBE",
      status: "TERMINATED (Contract Completed)",
      highlights: [
        {
          title: "Core Contribution",
          desc: "Developed the core ML library for Adobe Generative Fill used by millions of users."
        },
        {
          title: "Optimization",
          desc: "Built production ML infrastructure and optimized inference pipelines (quantization/distillation). Improved image generation speed by 13.5%."
        },
        {
          title: "Architecture",
          desc: "Designed GenAI & NLP architecture for QUVC Studio (virtual character platform)."
        },
        {
          title: "Ecosystem Integration",
          desc: "Integrated models across Photoshop and Illustrator, enabling low-latency real-time AI features."
        }
      ]
    },
    {
      period: "2020.01 — 2023.01",
      role: "ML ENGINEER",
      company: "TREEPLE_AI",
      status: "COMPLETED",
      highlights: [
        {
          title: "Route Optimization",
          desc: "Engineered route optimization and NLP models. Reduced planning time by 27.5%."
        },
        {
          title: "Multilingual Agent",
          desc: "Built a real-time virtual guide (NLP chatbot) with streaming responses. Increased user satisfaction by 22%."
        },
        {
          title: "Recommender Systems",
          desc: "Developed systems that increased conversion by 12.2%."
        },
        {
          title: "Promotion",
          desc: "Promoted from Data Scientist to ML Engineer after delivering 3 production systems as a sole developer."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6 p-4 h-full">
      <div className="flex-1 bg-bg-base border border-bg-panel rounded-md overflow-hidden shadow-2xl flex flex-col">
        {/* Terminal Header */}
        <div className="h-8 bg-bg-panel flex items-center px-4 gap-2 border-b border-bg-panel shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-qu-pink"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-qu-green"></div>
          </div>
          <div className="flex-1 text-center text-xs text-text-muted font-mono tracking-widest">
            experience.log - tail - 132x40
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm flex flex-col gap-4 overflow-y-auto">
          <div className="flex gap-2">
            <span className="text-qu-purple font-bold">root@qu:~/experience$</span>
            <span className="text-text-primary">cat EXECUTION_LOGS.md</span>
          </div>

          <div className="border border-bg-panel bg-bg-panel/30 p-4 rounded-sm mt-2">
            <h1 className="text-2xl font-display text-qu-cyan mb-8 uppercase tracking-wider">
              # EXECUTION_LOGS (Professional Experience)
            </h1>
            
            <div className="flex flex-col gap-10 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[7.5px] top-2 bottom-2 w-[1px] bg-bg-panel"></div>

              {experiences.map((exp, idx) => {
                const isRunning = exp.status === 'RUNNING';
                const isTerminated = exp.status.includes('TERMINATED');
                const statusColor = isRunning ? 'text-qu-green border-qu-green/30 bg-qu-green/10' : 
                                   isTerminated ? 'text-qu-pink border-qu-pink/30 bg-qu-pink/10' : 
                                   'text-qu-cyan border-qu-cyan/30 bg-qu-cyan/10';
                
                return (
                  <div key={idx} className="relative pl-8">
                    {/* Timeline node */}
                    <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-bg-base ${isRunning ? 'bg-qu-green animate-pulse' : 'bg-bg-panel'}`}></div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-bg-panel pb-2">
                        <div>
                          <span className="text-text-muted text-xs tracking-widest">[{exp.period}]</span>
                          <h2 className="text-lg font-bold text-qu-purple mt-1">
                            {exp.role} <span className="text-text-muted font-normal">@</span> <span className="text-text-primary">{exp.company}</span>
                          </h2>
                        </div>
                        <div className={`px-2 py-1 text-xs font-bold rounded-sm border ${statusColor} self-start`}>
                          Status: {exp.status}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        {exp.highlights.map((hl, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-qu-cyan mt-0.5">&gt;</span>
                            <div>
                              <span className="text-qu-cyan font-bold">{hl.title}: </span>
                              <span className="text-text-muted">{hl.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 pt-8 border-t border-bg-panel border-dashed relative">
              <h2 className="text-xl font-display text-qu-cyan mb-8 uppercase tracking-wider">
                # EDUCATION_LOGS
              </h2>
              
              <div className="flex flex-col gap-8 relative">
                <div className="absolute left-[7.5px] top-2 bottom-2 w-[1px] bg-bg-panel"></div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-bg-base bg-bg-panel"></div>
                  <div className="flex flex-col gap-2">
                    <span className="text-text-muted text-xs tracking-widest">[2023 - 2025]</span>
                    <h3 className="text-lg font-bold text-qu-purple">
                      Master <span className="text-text-muted font-normal">|</span> <span className="text-text-primary">Eurasian National University, Astana</span>
                    </h3>
                    <div className="flex items-start gap-2 mt-1">
                      <span className="text-qu-cyan mt-0.5">&gt;</span>
                      <span className="text-text-muted">Artificial Intelligence Technologies</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-bg-base bg-bg-panel"></div>
                  <div className="flex flex-col gap-2">
                    <span className="text-text-muted text-xs tracking-widest">[2019 - 2023]</span>
                    <h3 className="text-lg font-bold text-qu-purple">
                      Bachelor <span className="text-text-muted font-normal">|</span> <span className="text-text-primary">Eurasian National University, Astana</span>
                    </h3>
                    <div className="flex items-start gap-2 mt-1">
                      <span className="text-qu-cyan mt-0.5">&gt;</span>
                      <span className="text-text-muted">Computer and Software Engineering</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 animate-pulse mt-4">
            <span className="text-qu-purple font-bold">root@qu:~/experience$</span>
            <span className="w-2 h-4 bg-text-primary inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
