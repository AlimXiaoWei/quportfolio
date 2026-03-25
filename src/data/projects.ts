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
    details: 'Кейс: генерация текста (GPT), изображений (Stable Diffusion), RAG система.',
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
    details: 'Кейс: оптимизация маршрутов, мультиязычность (20+ языков), интеграция Flight APIs.',
    tech: ['LangGraph', 'Skyscanner API', 'Amadeus API', 'Google Places API'],
    metrics: ['Рост Retention', 'Увеличение Time on Site (пользователи «залипали» на планировании)'],
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
    details: 'Динамический опросник (Daily body telemetry). Выявление паттернов, которые пользователь мог не заметить (Early warning system).',
    tech: ['Gemini API', 'Data Analytics'],
    metrics: ['50+ early health alerts'],
    role: 'Creator / Solo Developer'
  },
  jospar: {
    id: 'jospar',
    name: 'Jospar_AI',
    type: 'dir',
    description: 'Adaptive Life Planner.',
    details: 'Планнер, подстраивающийся под индивидуальный ритм (Adaptive Scheduling).',
    tech: ['Machine Learning', 'Predictive Modeling'],
    metrics: ['[Awaiting data]'],
    role: 'Creator / Solo Developer'
  },
  swift: {
    id: 'swift',
    name: 'Swift_Logistics',
    type: 'dir',
    description: 'AI-powered logistics.',
    details: 'Кейс: Route optimization (+27% speed), Graph Neural Networks.',
    tech: ['Graph Neural Networks', 'Python', 'Route Optimization'],
    metrics: ['+27% routing speed'],
  },
  quperfume: {
    id: 'quperfume',
    name: 'QUPerfume',
    type: 'dir',
    description: 'Computer Vision app.',
    details: 'Zero-shot recognition + динамическое пополнение базы знаний (если парфюма нет в БД, Gemini идентифицирует его по фото и добавляет метаданные).',
    tech: ['Gemini Multimodal', 'Computer Vision', 'OCR'],
    metrics: ['[Awaiting data]'],
    role: 'Full-cycle (от CV-части до фронтенда)',
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
    details: 'Флагманский проект. Интерфейс управления личной эффективностью в стиле Unix.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Astro Islands Architecture'],
    metrics: ['100% Personal Efficiency Boost'],
    status: '[RUNNING] (Primary)'
  },
  quparser: {
    id: 'quparser',
    name: 'QUParser',
    type: 'sys',
    description: 'Data Extraction Engine.',
    details: 'Мощный парсер для сбора данных. Optimizing data ingestion for ML pipelines.',
    tech: ['Python', 'BeautifulSoup', 'Scrapy', 'Data Ingestion'],
    metrics: ['[Awaiting data]'],
    status: '[READY] (Stable)'
  },
  qusillydevs: {
    id: 'qusillydevs',
    name: 'QUSillyDevs',
    type: 'sys',
    description: 'Creative Lab.',
    details: 'Инкубатор креативных идей и эстетичных решений.',
    tech: ['Creative Coding', 'Generative Art', 'UI/UX'],
    metrics: ['[Awaiting data]'],
    status: '[ACTIVE] (Experimental)'
  }
};

export const projectsList = Object.values(projectsData).filter(p => p.type === 'dir');
export const systemComponentsList = Object.values(projectsData).filter(p => p.type === 'sys');
