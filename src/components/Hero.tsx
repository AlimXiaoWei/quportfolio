import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Main Terminal Window */}
      <div className="flex-1 bg-bg-base border border-bg-panel rounded-md overflow-hidden shadow-2xl flex flex-col">
        {/* Terminal Header */}
        <div className="h-8 bg-bg-panel flex items-center px-4 gap-2 border-b border-bg-panel">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-qu-pink"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-qu-green"></div>
          </div>
          <div className="flex-1 text-center text-xs text-text-muted font-mono tracking-widest">
            qu-terminal - bash - 132x40
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="p-4 md:p-6 font-mono text-sm flex flex-col gap-6 overflow-y-auto">
          {/* ASCII Logo */}
          <div className="text-qu-purple whitespace-pre font-bold leading-none tracking-tighter overflow-x-auto py-2" style={{ fontSize: 'min(2.5vw, 10px)', lineHeight: 'min(2.5vw, 10px)' }}>
{`
   █████╗ ██╗     ██╗███╗   ███╗███████╗██╗  ██╗█████╗ ███╗   ██╗
  ██╔══██╗██║     ██║████╗ ████║╚══███╔╝██║  ██║██╔══██╗████╗  ██║
  ███████║██║     ██║██╔████╔██║  ███╔╝ ███████║███████║██╔██╗ ██║
  ██╔══██║██║     ██║██║╚██╔╝██║ ███╔╝  ██╔══██║██╔══██║██║╚██╗██║
  ██║  ██║███████╗██║██║ ╚═╝ ██║███████╗██║  ██║██║  ██║██║ ╚████║
  ╚═╝  ╚═╝╚══════╝╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
`}
          </div>
          <div className="text-text-muted text-[10px] sm:text-xs">
            -- ALIMZHAN PORTFOLIO OS v2.5.1-stable --------------------------
          </div>

          {/* Terminal Commands */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <span className="text-qu-purple font-bold shrink-0">root@qu:~$</span>
                <span className="text-text-primary">whoami</span>
              </div>
              <div className="pl-4 mt-1">
                <span className="text-qu-cyan">&gt;</span> Senior ML/AI Engineer. 5+ years of runtime.
                <br />
                <span className="pl-4">Generative AI, LLMs, Computer Vision, NLP.</span>
                <br />
                <span className="pl-4">Ex-Adobe. Available for remote worldwide (B2B/EOR).</span>
              </div>
            </div>

            <div>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <span className="text-qu-purple font-bold shrink-0">root@qu:~$</span>
                <span className="text-text-primary">cat ~/.socials</span>
              </div>
              <div className="pl-4 mt-1 flex flex-col gap-1">
                <div className="flex gap-4 items-center">
                  <span className="text-qu-cyan">&gt;</span>
                  <span className="min-w-[70px] sm:w-20 text-text-muted text-xs sm:text-sm">EMAIL:</span>
                  <a href="mailto:alimxiaowei@gmail.com" className="text-qu-green hover:underline truncate">alimxiaowei@gmail.com</a>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-qu-cyan">&gt;</span>
                  <span className="min-w-[70px] sm:w-20 text-text-muted text-xs sm:text-sm">GITHUB:</span>
                  <a href="https://github.com/AlimXiaoWei" target="_blank" rel="noreferrer" className="text-qu-green hover:underline truncate">AlimXiaoWei</a>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-qu-cyan">&gt;</span>
                  <span className="min-w-[70px] sm:w-20 text-text-muted text-xs sm:text-sm">LINKEDIN:</span>
                  <a href="https://www.linkedin.com/in/alimzhanbekmurzin/" target="_blank" rel="noreferrer" className="text-qu-green hover:underline truncate">alimzhanbekmurzin</a>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-qu-cyan">&gt;</span>
                  <span className="min-w-[70px] sm:w-20 text-text-muted text-xs sm:text-sm">RESUME:</span>
                  <a href="/cv.pdf" download="Alimzhan_Bekmurzin_CV.pdf" target="_blank" rel="noreferrer" className="text-qu-green hover:underline bg-qu-green/10 px-2 py-0.5 rounded border border-qu-green/30 text-xs sm:text-sm">./download_cv.sh</a>
                </div>
              </div>
            </div>

            <div className="hidden xs:block">
              <div className="flex gap-2">
                <span className="text-qu-purple font-bold">root@qu:~$</span>
                <span className="text-text-primary">uname -r</span>
              </div>
              <div className="pl-4 mt-1">
                <span className="text-qu-cyan">&gt;</span> ALIMZHAN-OS-5.0.1-amd64-ml-kernel
              </div>
            </div>

            <div>
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <span className="text-qu-purple font-bold shrink-0">root@qu:~$</span>
                <span className="text-text-primary truncate">ps aux | grep [skills]</span>
              </div>
              <div className="pl-4 mt-1 flex flex-col gap-1">
                <div className="flex gap-2 sm:gap-4 flex-wrap">
                  <span className="text-qu-cyan">&gt;</span>
                  <span className="min-w-[40px] sm:w-16">PID 1</span>
                  <span className="min-w-[80px] sm:w-32">- QUOS</span>
                  <span className="text-qu-green">[RUNNING]</span>
                </div>
                <div className="flex gap-2 sm:gap-4 flex-wrap">
                  <span className="text-qu-cyan">&gt;</span>
                  <span className="min-w-[40px] sm:w-16">PID 42</span>
                  <span className="min-w-[80px] sm:w-32">- QUParser</span>
                  <span className="text-qu-green">[READY]</span>
                </div>
                <div className="flex gap-2 sm:gap-4 flex-wrap">
                  <span className="text-qu-cyan">&gt;</span>
                  <span className="min-w-[40px] sm:w-16">PID 1337</span>
                  <span className="min-w-[80px] sm:w-32">- QUSillyDevs</span>
                  <span className="text-yellow-500">[ACTIVE]</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 animate-pulse">
              <span className="text-qu-purple font-bold">root@qu:~$</span>
              <span className="w-2 h-4 bg-text-primary inline-block"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panels */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        {/* System Health Panel */}
        <div className="bg-bg-base border border-bg-panel rounded-md p-4 shadow-xl">
          <div className="flex justify-between items-center mb-4 border-b border-bg-panel pb-2">
            <h3 className="text-qu-purple text-[10px] sm:text-xs tracking-widest uppercase font-bold">System Health - tech_stack.monitor</h3>
            <div className="w-2 h-2 rounded-full bg-qu-cyan animate-pulse"></div>
          </div>
          
          <div className="text-[10px] text-text-muted mb-4 uppercase">
            RESOURCE USAGE -------------------
          </div>

          <div className="flex flex-col gap-3 text-xs sm:text-sm">
            {[
              { name: 'Python', value: 95, color: 'bg-qu-purple' },
              { name: 'PyTorch/TF', value: 90, color: 'bg-qu-cyan' },
              { name: 'LLMs/GenAI', value: 92, color: 'bg-qu-purple' },
              { name: 'Computer Vision', value: 88, color: 'bg-qu-cyan' },
              { name: 'NLP', value: 85, color: 'bg-qu-purple' },
              { name: 'LangChain/Graph', value: 85, color: 'bg-qu-cyan' },
              { name: 'MLOps/Ray', value: 80, color: 'bg-qu-purple' },
              { name: 'Docker/K8s', value: 75, color: 'bg-qu-cyan' },
              { name: 'AWS/Azure', value: 78, color: 'bg-qu-purple' },
              { name: 'SQL/VectorDB', value: 82, color: 'bg-qu-cyan' },
            ].map((skill) => (
              <div key={skill.name} className="flex items-center justify-between gap-2 sm:gap-4">
                <span className="min-w-[80px] sm:w-32 text-text-primary text-xs truncate">{skill.name}</span>
                <div className="flex-1 flex items-center gap-1 sm:gap-2">
                  <span className="text-text-muted hidden xs:inline">[</span>
                  <div className="flex-1 h-2 sm:h-3 bg-bg-panel relative overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full ${skill.color}`} 
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>
                  <span className="text-text-muted hidden xs:inline">]</span>
                </div>
                <span className="w-8 text-right text-qu-cyan text-[10px] sm:text-xs">{skill.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Info Panel */}
        <div className="bg-bg-base border border-bg-panel rounded-md p-4 shadow-xl">
          <div className="text-[10px] text-text-muted mb-4 uppercase">
            PROCESS INFO ---------------------
          </div>
          <div className="flex flex-col gap-2 text-xs sm:text-sm">
            <div className="flex justify-between sm:justify-start">
              <span className="w-20 sm:w-24 text-text-muted uppercase text-[10px]">UID</span>
              <span className="text-text-muted hidden sm:inline">:</span>
              <span className="sm:ml-4 text-qu-cyan">alimzhan</span>
            </div>
            <div className="flex justify-between sm:justify-start">
              <span className="w-20 sm:w-24 text-text-muted uppercase text-[10px]">ROLE</span>
              <span className="text-text-muted hidden sm:inline">:</span>
              <span className="sm:ml-4 text-qu-purple text-right sm:text-left">Senior ML/AI Eng</span>
            </div>
            <div className="flex justify-between sm:justify-start">
              <span className="w-20 sm:w-24 text-text-muted uppercase text-[10px]">RUNTIME</span>
              <span className="text-text-muted hidden sm:inline">:</span>
              <span className="sm:ml-4 text-qu-cyan">5+ years</span>
            </div>
            <div className="flex justify-between sm:justify-start">
              <span className="w-20 sm:w-24 text-text-muted uppercase text-[10px]">STATUS</span>
              <span className="text-text-muted hidden sm:inline">:</span>
              <span className="sm:ml-4 text-qu-green text-right sm:text-left">[AVAILABLE]</span>
            </div>
            <div className="flex justify-between sm:justify-start">
              <span className="w-20 sm:w-24 text-text-muted uppercase text-[10px]">LOC</span>
              <span className="text-text-muted hidden sm:inline">:</span>
              <span className="sm:ml-4 text-qu-cyan text-right sm:text-left">KAZAKHSTAN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
