import React from 'react';

export const SkillsView: React.FC = () => {
  const modules = [
    {
      name: "Perception & CV",
      items: [
        "Object Detection: YOLO, Faster R-CNN",
        "Image Processing: OpenCV, Image Segmentation",
        "OCR: Gemini Vision, EasyOCR, Tesseract",
        "Face Recognition",
        "Workflow: Image processing for QUPerfume"
      ]
    },
    {
      name: "Reasoning & NLP",
      items: [
        "LLMs: Gemini, GPT-4, Llama 3, Mistral",
        "Generative AI: Stable Diffusion, LoRA, ControlNet, Diffusers",
        "NLP Fundamentals: Hugging Face, BERT",
        "Advanced LLM: LLM Evaluation, Context Engineering",
        "RAG Pipelines: Vector DB (ChromaDB, Pinecone)",
        "Agentic Workflows: LangChain, LangGraph",
        "Multi-modal analysis: QUHealth"
      ]
    },
    {
      name: "Infrastructure & Tools",
      items: [
        "Languages: Python (Master), TypeScript, SQL",
        "Frameworks: FastAPI, Flask, Node.js, PyTorch, TensorFlow",
        "Frontend: Astro, React, Tailwind CSS",
        "DevOps & MLOps: Docker, Git, CI/CD, GCP, Kubernetes, MLflow",
        "Distributed Computing: Ray (Serve/Train/Tune)",
        "Cloud ML: AWS SageMaker, Azure ML Studio"
      ]
    },
    {
      name: "Database & Storage",
      items: [
        "Relational/NoSQL: PostgreSQL, MongoDB",
        "Caching & Storage: Redis, AWS S3",
        "Vector DB: Pinecone, ChromaDB"
      ]
    },
    {
      name: "System Metadata",
      items: [
        "Languages: English (Professional), Chinese (HSK-4), Russian (Native), Kazakh",
        "Capabilities: End-to-end Product Development (Idea-to-Production)"
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
            system_capabilities - vim - 132x40
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm flex flex-col gap-4 overflow-y-auto">
          <div className="flex gap-2">
            <span className="text-qu-purple font-bold">root@qu:~/skills$</span>
            <span className="text-text-primary">cat SYSTEM_CAPABILITIES.md</span>
          </div>

          <div className="border border-bg-panel bg-bg-panel/30 p-4 rounded-sm mt-2">
            <h1 className="text-2xl font-display text-qu-cyan mb-6 uppercase tracking-wider">
              # SYSTEM_CAPABILITIES (Skills)
            </h1>
            
            <div className="flex flex-col gap-8">
              {modules.map((mod, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <h2 className="text-qu-purple font-bold text-lg">
                    <span className="text-qu-green">##</span> Module: {mod.name}
                  </h2>
                  <ul className="list-none flex flex-col gap-2 pl-4 border-l border-bg-panel ml-2">
                    {mod.items.map((item, i) => {
                      const parts = item.split(':');
                      if (parts.length > 1) {
                        return (
                          <li key={i} className="flex items-start gap-2 text-text-primary">
                            <span className="text-qu-cyan mt-0.5">├─</span>
                            <div>
                              <span className="text-qu-cyan font-bold">{parts[0]}:</span>
                              <span className="text-text-muted">{parts.slice(1).join(':')}</span>
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li key={i} className="flex items-start gap-2 text-text-muted">
                          <span className="text-qu-cyan mt-0.5">├─</span>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 animate-pulse mt-4">
            <span className="text-qu-purple font-bold">root@qu:~/skills$</span>
            <span className="w-2 h-4 bg-text-primary inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
