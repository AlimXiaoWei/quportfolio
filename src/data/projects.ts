export interface Project {
  id: string;
  name: string;
  type: 'dir' | 'sys';
  description: string;
  details: string;
  tech: string[];
  metrics: string[];
  role?: string;
  logs?: string[];
  status?: string;
}

export const projectsData: Record<string, Project> = {
  quvc: {
    id: 'quvc',
    name: 'QUVC_Studio',
    type: 'dir',
    description: 'Multi-Modal Generative AI Platform.',
    details: 'Use case: text generation (GPT), image generation (Stable Diffusion), RAG system.',
    tech: ['PyTorch', 'Diffusers', 'Stable Diffusion (v1.5/v2.1)', 'LoRA', 'ControlNet'],
    metrics: ['[Awaiting data]'],
    role: 'Lead ML Engineer (Training/Fine-tuning)',
    logs: [
      '[DEPRECATED] Project lifecycle ended after Adobe contract expiration.',
      '[STATUS]: Successfully fine-tuned models for VTuber/OC generation during the 2023 hype cycle.',
      '[INFO]: Optimized latent space for stylized character consistency.'
    ]
  },
  treeple: {
    id: 'treeple',
    name: 'Treeple_AI',
    type: 'dir',
    description: 'AI travel guide.',
    details: 'Use case: route optimization, multilingual support (20+ languages), Flight APIs integration.',
    tech: ['LangGraph', 'Skyscanner API', 'Amadeus API', 'Google Places API'],
    metrics: ['Retention growth', 'Increased Time on Site (users got hooked on planning)'],
    role: 'Full-cycle development (From idea to production)',
    logs: [
      '> Executing: langgraph_agent --target="optimized_travel_route"',
      '[METRIC]: Significant increase in User Session Duration via Treeple AI redirection.'
    ]
  },
  quhealth: {
    id: 'quhealth',
    name: 'QUHealth',
    type: 'dir',
    description: 'Medical Signal Detection.',
    details: 'Dynamic questionnaire (Daily body telemetry). Identifying patterns the user might not notice (Early warning system).',
    tech: ['Gemini API', 'Data Analytics'],
    metrics: ['50+ early health alerts'],
    role: 'Creator / Solo Developer'
  },
  jospar: {
    id: 'jospar',
    name: 'Jospar_AI',
    type: 'dir',
    description: 'Adaptive Life Planner.',
    details: 'Planner adjusting to individual rhythm (Adaptive Scheduling).',
    tech: ['Machine Learning', 'Predictive Modeling'],
    metrics: ['[Awaiting data]'],
    role: 'Creator / Solo Developer'
  },
  swift: {
    id: 'swift',
    name: 'Swift_Logistics',
    type: 'dir',
    description: 'AI-powered logistics.',
    details: 'Use case: Route optimization (+27% speed), Graph Neural Networks.',
    tech: ['Graph Neural Networks', 'Python', 'Route Optimization'],
    metrics: ['+27% routing speed'],
  },
  quperfume: {
    id: 'quperfume',
    name: 'QUPerfume',
    type: 'dir',
    description: 'Computer Vision app.',
    details: 'Zero-shot recognition + dynamic knowledge base expansion (if perfume is missing in DB, Gemini identifies it via photo and adds metadata).',
    tech: ['Gemini Multimodal', 'Computer Vision', 'OCR'],
    metrics: ['[Awaiting data]'],
    role: 'Full-cycle (from CV to frontend)',
    logs: [
      '[SCANNING]: bottle_image.raw ...',
      '[DB_UPDATE]: Unknown fragrance detected. Gemini_Engine: generating entry... DONE.'
    ]
  },
  quos: {
    id: 'quos',
    name: 'QUOS',
    type: 'sys',
    description: 'Operating System Interface (Core System).',
    details: 'Flagship project. Unix-style personal efficiency management interface.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Astro Islands Architecture'],
    metrics: ['100% Personal Efficiency Boost'],
    status: '[RUNNING] (Primary)'
  },
  quparser: {
    id: 'quparser',
    name: 'QUParser',
    type: 'sys',
    description: 'Data Extraction Engine.',
    details: 'Powerful parser for data collection. Optimizing data ingestion for ML pipelines.',
    tech: ['Python', 'BeautifulSoup', 'Scrapy', 'Data Ingestion'],
    metrics: ['[Awaiting data]'],
    status: '[READY] (Stable)'
  },
  qusillydevs: {
    id: 'qusillydevs',
    name: 'QUSillyDevs',
    type: 'sys',
    description: 'Creative Lab.',
    details: 'Incubator for creative ideas and aesthetic solutions.',
    tech: ['Creative Coding', 'Generative Art', 'UI/UX'],
    metrics: ['[Awaiting data]'],
    status: '[ACTIVE] (Experimental)'
  },
  firefly: {
    id: 'firefly',
    name: 'Firefly_AI',
    type: 'dir',
    description: 'Autonomous AI Agent.',
    details: 'Fully autonomous AI agent based on Gemma 4, deployed on VPS with n8n orchestration. Features include web research, content publishing, outreach, and self-reflection.',
    tech: ['Gemma 4', 'FastAPI', 'LangGraph', 'n8n', 'Qdrant', 'Playwright'],
    metrics: ['[Awaiting data]'],
    role: 'Creator / Solo Developer',
    logs: [
      '[INIT]: Booting Gemma 4 26B MoE...',
      '[ORCHESTRATION]: n8n workflows loaded.',
      '[STATUS]: Agent Core active.'
    ]
  }
};

export const projectsList = Object.values(projectsData).filter(p => p.type === 'dir');
export const systemComponentsList = Object.values(projectsData).filter(p => p.type === 'sys');
