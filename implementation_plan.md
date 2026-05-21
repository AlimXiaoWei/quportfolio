# 🔥 Firefly — Автономный AI-Агент

> Архитектурный план полностью автономного AI-агента на базе Gemma 4, развёрнутого на VPS с оркестрацией через n8n.

---

## 1. Обзор системы

**Firefly** — автономный AI-агент, способный:
- Выполнять исследовательские задачи (web research, анализ данных)
- Публиковать контент (соцсети, блоги, платформы)
- Отправлять персонализированные отклики (email, формы, jobs)
- Регистрироваться на сервисах через собственный Google-аккаунт
- Самостоятельно вести логи, отчёты и рефлексию

```mermaid
graph TB
    subgraph "🧠 Brain Layer"
        GEMMA["Gemma 4 26B MoE<br/>via Ollama"]
        AGENT["Agent Core<br/>FastAPI + LangGraph"]
    end

    subgraph "🔗 Orchestration Layer"
        N8N["n8n<br/>Workflow Engine"]
        REDIS["Redis<br/>Queue + Cache"]
    end

    subgraph "💾 Memory Layer"
        QDRANT["Qdrant<br/>Vector Memory"]
        PG["PostgreSQL<br/>Structured Data"]
    end

    subgraph "🌐 Integration Layer"
        GSHEET["Google Sheets<br/>Task Board"]
        GDRIVE["Google Drive<br/>Files & Reports"]
        GMAIL["Gmail<br/>Agent Email"]
        TG["Telegram Bot<br/>Notifications"]
        BROWSER["Playwright<br/>Browser Agent"]
    end

    GSHEET -->|tasks| N8N
    N8N -->|orchestrate| AGENT
    AGENT -->|think| GEMMA
    AGENT -->|remember| QDRANT
    AGENT -->|store| PG
    AGENT -->|browse| BROWSER
    AGENT -->|files| GDRIVE
    AGENT -->|email| GMAIL
    AGENT -->|notify| TG
    N8N -->|queue| REDIS
    GDRIVE -->|system prompts| AGENT
```

---

## 2. Технический стек

### 2.1 Мозг — Gemma 4

| Параметр | Решение |
|:---|:---|
| **Модель** | Gemma 4 26B MoE (оптимальный баланс качества и скорости) |
| **Runtime** | **Ollama** для разработки → **vLLM** для прода |
| **Fallback** | Gemma 4 E4B как лёгкий fallback для простых задач |
| **Embedding** | `nomic-embed-text` через Ollama (768d, быстрый) |

> [!IMPORTANT]
> **Gemma 4 26B MoE** — оптимальный выбор для VPS. Она активирует только часть параметров при инференсе (MoE архитектура), что даёт качество на уровне 26B при скорости 4B. Потребуется GPU с ~18GB+ VRAM (RTX 4090/5090 или A100).

#### Альтернатива без GPU
Если VPS будет только на CPU — используем **Gemma 4 E4B** (квантизованная, работает на 8GB RAM). Качество будет ниже, но достаточно для большинства задач.

---

### 2.2 Оркестрация — n8n

n8n — центральный хаб для всех workflow. Почему n8n:
- 400+ встроенных интеграций (Google Sheets, Drive, Gmail, Telegram)
- Визуальный редактор workflow
- Self-hosted, полный контроль над данными
- Нативная поддержка Ollama/LLM nodes
- Queue Mode для масштабирования

**Ключевые workflow:**

| Workflow | Триггер | Действие |
|:---|:---|:---|
| `task_dispatcher` | Cron (каждые 15 мин) | Чтение новых задач из Google Sheets → отправка в Agent Core |
| `content_publisher` | Webhook от Agent | Публикация готового контента на платформы |
| `email_sender` | Webhook от Agent | Отправка персонализированных писем через Gmail |
| `daily_report` | Cron (23:00) | Генерация ежедневного отчёта → Google Drive /mind |
| `notification_hub` | Internal events | Пересылка уведомлений в Telegram |
| `research_pipeline` | Task dispatcher | Веб-исследование → суммаризация → сохранение |

---

### 2.3 База данных — Qdrant + PostgreSQL

> [!TIP]
> **Мой совет: используй связку Qdrant + PostgreSQL вместо одного ChromaDB.** Вот почему:

| Компонент | Qdrant | PostgreSQL |
|:---|:---|:---|
| **Назначение** | Векторная память (семантический поиск) | Структурированные данные |
| **Данные** | Embeddings документов, контекст разговоров, knowledge base | Задачи, логи, метаданные, состояние агента |
| **Преимущества** | Rust-native, фильтрация при поиске, hybrid search (BM25 + vector) | ACID, joins, сложные запросы |
| **Масштаб** | До 100M+ векторов | Неограничен |

**Почему не ChromaDB?**
- ChromaDB хорош для прототипов, но не рекомендуется для продакшена >5M векторов
- Нет нормальной фильтрации при поиске
- Нет high-availability и мультитенантности

**Почему не только pgvector?**
- pgvector — хорошая альтернатива, но Qdrant значительно быстрее на частых записях (агент постоянно пишет в память)
- Qdrant поддерживает hybrid search из коробки

---

### 2.4 Браузерная автоматизация — Playwright + browser-use

Для задач, требующих взаимодействия с веб-сайтами:

```
Agent Core → Playwright (headless Chromium) → Websites
```

| Инструмент | Назначение |
|:---|:---|
| **Playwright** | Базовый движок браузерной автоматизации |
| **browser-use** | AI-агент поверх Playwright — навигация по natural language |
| **Stagehand** | Гибридный подход: AI + ручной контроль (для сложных кейсов) |

**Возможности:**
- Регистрация на сайтах через Google-аккаунт агента
- Заполнение форм (отклики на вакансии, заявки)
- Скрейпинг и извлечение данных
- Публикация контента на платформах без API

---

### 2.5 Коммуникации

#### Telegram Bot
- **Библиотека**: `python-telegram-bot` (async)
- **Функции**:
  - 📩 Уведомления о выполненных задачах
  - ⚠️ Алерты об ошибках
  - 📊 Дейли-отчёты с саммари
  - 🎛️ Быстрые команды (`/status`, `/pause`, `/tasks`, `/report`)
  - ✅ Human-in-the-loop: подтверждение критичных действий

#### Gmail
- Через Google API (OAuth2)
- Отправка персонализированных писем
- Чтение входящих (отклики, подтверждения регистрации)

---

## 3. Agent Core — архитектура

### 3.1 Технологии

| Компонент | Технология |
|:---|:---|
| **Framework** | FastAPI (async API server) |
| **Agent Framework** | LangGraph (stateful agent with cycles) |
| **Task Queue** | Redis + Celery (или arq для async) |
| **Config** | Pydantic Settings + `.env` |

> [!NOTE]
> **Почему LangGraph, а не просто LangChain?**
> LangGraph позволяет строить агентов с циклами, условными переходами и persistent state. Это критично для автономного агента, который должен планировать → выполнять → проверять → корректировать.

### 3.2 Цикл работы агента

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> FetchTask: n8n trigger / cron
    FetchTask --> Plan: New task found
    Plan --> Execute: Plan approved
    Execute --> Reflect: Task step done
    Reflect --> Execute: Need more steps
    Reflect --> Report: Task complete
    Report --> SaveMemory: Store results
    SaveMemory --> Idle: Ready for next
    
    Execute --> HumanReview: Critical action
    HumanReview --> Execute: Approved via Telegram
    HumanReview --> Idle: Rejected
    
    Execute --> ErrorHandler: Error occurred
    ErrorHandler --> Execute: Retry
    ErrorHandler --> Report: Max retries exceeded
```

### 3.3 Система памяти (Memory Architecture)

```mermaid
graph LR
    subgraph "Short-Term Memory"
        CONV["Conversation Buffer<br/>Last N messages"]
        CTX["Task Context<br/>Current task state"]
    end
    
    subgraph "Long-Term Memory"
        VEC["Qdrant<br/>Semantic Memory"]
        STRUCT["PostgreSQL<br/>Factual Memory"]
    end
    
    subgraph "External Memory"
        DRIVE["Google Drive<br/>Documents & Reports"]
        SHEET["Google Sheets<br/>Task History"]
    end
    
    CONV --> VEC
    CTX --> STRUCT
    VEC --> DRIVE
    STRUCT --> SHEET
```

| Тип памяти | Хранилище | Данные | TTL |
|:---|:---|:---|:---|
| **Working Memory** | Redis | Текущий контекст задачи, буфер диалога | Время жизни задачи |
| **Episodic Memory** | Qdrant | Опыт выполнения задач, lessons learned | Бессрочно |
| **Semantic Memory** | Qdrant | Knowledge base, исследования, факты | Бессрочно |
| **Procedural Memory** | PostgreSQL + Drive | Инструкции, шаблоны, навыки | Бессрочно |

---

## 4. Структура Google Drive

```
📂 Firefly/
├── 📁 system/
│   ├── 📄 system_prompt.md          # Основной системный промпт
│   ├── 📄 persona.md                # Личность и стиль агента
│   ├── 📄 rules.md                  # Правила и ограничения
│   ├── 📄 templates/                # Шаблоны писем, откликов
│   └── 📄 tools_config.yaml         # Конфигурация инструментов
│
├── 📁 mind/
│   ├── 📁 daily_reports/            # Ежедневные отчёты
│   │   └── 📄 2026-04-09.md
│   ├── 📁 reflections/              # Рефлексия и выводы
│   ├── 📁 logs/                     # Детальные логи выполнения
│   └── 📁 knowledge/                # Накопленные знания
│
├── 📁 workforge/
│   ├── 📄 cv.pdf                    # CV
│   ├── 📄 cv_tailored/              # Адаптированные версии CV
│   ├── 📁 portfolio/                # Портфолио проектов
│   ├── 📁 cover_letters/            # Сопроводительные письма
│   └── 📄 skills_matrix.md          # Матрица навыков
│
├── 📁 research/                     # Результаты исследований
│   ├── 📁 market/
│   ├── 📁 tech/
│   └── 📁 competitors/
│
├── 📁 content/                      # Готовый контент для публикации
│   ├── 📁 drafts/
│   ├── 📁 published/
│   └── 📁 assets/
│
└── 📁 outreach/                     # Данные для рассылок
    ├── 📁 templates/
    ├── 📁 sent/
    └── 📁 responses/
```

> [!TIP]
> Я добавил 3 дополнительные папки: `research/`, `content/`, `outreach/`. Они будут полезны для организации данных по основным задачам агента. Можем убрать или переименовать.

---

## 5. Структура Google Sheets (Task Board)

### Основная таблица `Tasks`

| Column | Type | Description |
|:---|:---|:---|
| `id` | Auto | Уникальный ID задачи |
| `status` | Enum | `pending` / `in_progress` / `done` / `failed` / `review` |
| `priority` | Enum | `critical` / `high` / `medium` / `low` |
| `type` | Enum | `research` / `content` / `outreach` / `registration` / `custom` |
| `title` | Text | Краткое название |
| `description` | Text | Подробное описание задачи |
| `deadline` | Date | Дедлайн |
| `result` | Text | Результат выполнения (заполняет агент) |
| `notes` | Text | Заметки агента |
| `created_at` | DateTime | Время создания |
| `completed_at` | DateTime | Время завершения |

### Лист `Recurring` — повторяющиеся задачи

| Column | Type | Description |
|:---|:---|:---|
| `id` | Auto | ID |
| `cron` | Text | Cron-выражение (`0 9 * * *`) |
| `type` | Enum | Тип задачи |
| `template` | Text | Шаблон задачи |
| `enabled` | Bool | Активна ли |

---

## 6. Структура проекта

```
firefly/
├── docker-compose.yml              # Весь стек в одном файле
├── .env                            # Секреты и конфигурация
├── .env.example                    # Пример конфигурации
│
├── agent/                          # 🧠 Agent Core (Python)
│   ├── Dockerfile
│   ├── pyproject.toml
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI entry point
│   │   ├── config.py               # Pydantic Settings
│   │   │
│   │   ├── core/                   # Ядро агента
│   │   │   ├── agent.py            # LangGraph agent definition
│   │   │   ├── planner.py          # Task planning & decomposition
│   │   │   ├── executor.py         # Task execution engine
│   │   │   ├── reflector.py        # Self-reflection & learning
│   │   │   └── memory.py           # Memory management
│   │   │
│   │   ├── tools/                  # Инструменты агента
│   │   │   ├── base.py             # Base tool interface
│   │   │   ├── browser.py          # Playwright + browser-use
│   │   │   ├── google_drive.py     # Google Drive operations
│   │   │   ├── google_sheets.py    # Google Sheets operations
│   │   │   ├── gmail.py            # Email operations
│   │   │   ├── web_search.py       # Web search (SearXNG / Serper)
│   │   │   └── content.py          # Content generation tools
│   │   │
│   │   ├── integrations/           # Внешние интеграции
│   │   │   ├── telegram.py         # Telegram bot
│   │   │   ├── n8n_client.py       # n8n webhook client
│   │   │   ├── ollama_client.py    # Ollama API wrapper
│   │   │   └── qdrant_client.py    # Qdrant operations
│   │   │
│   │   ├── models/                 # Data models
│   │   │   ├── task.py
│   │   │   ├── memory.py
│   │   │   └── report.py
│   │   │
│   │   └── api/                    # FastAPI routes
│   │       ├── router.py
│   │       ├── tasks.py            # /tasks endpoints
│   │       ├── health.py           # /health endpoint
│   │       └── webhooks.py         # Webhook handlers for n8n
│   │
│   └── tests/
│       ├── test_agent.py
│       ├── test_tools.py
│       └── test_memory.py
│
├── n8n/                            # 🔗 n8n workflows
│   ├── workflows/                  # Exported workflow JSONs
│   │   ├── task_dispatcher.json
│   │   ├── content_publisher.json
│   │   ├── daily_report.json
│   │   └── notification_hub.json
│   └── credentials/                # Credential configs (gitignored)
│
├── infra/                          # 🏗️ Infrastructure configs
│   ├── nginx/
│   │   └── nginx.conf              # Reverse proxy
│   ├── qdrant/
│   │   └── config.yaml
│   └── postgres/
│       └── init.sql                # Initial schema
│
├── scripts/                        # 🛠️ Utility scripts
│   ├── setup.sh                    # Initial setup
│   ├── backup.sh                   # Backup script
│   └── health_check.sh             # Health monitoring
│
└── docs/                           # 📚 Documentation
    ├── setup.md
    ├── architecture.md
    └── workflows.md
```

---

## 7. Docker Compose — полный стек

```yaml
# docker-compose.yml (preview)
services:
  # 🧠 Agent Core
  agent:
    build: ./agent
    ports: ["8000:8000"]
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
      - QDRANT_URL=http://qdrant:6333
      - POSTGRES_URL=postgresql://firefly:pass@postgres:5432/firefly
      - REDIS_URL=redis://redis:6379
    depends_on: [ollama, qdrant, postgres, redis]

  # 🤖 LLM Runtime
  ollama:
    image: ollama/ollama:latest
    ports: ["11434:11434"]
    volumes: ["ollama_data:/root/.ollama"]
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  # 🔗 n8n Orchestrator
  n8n:
    image: n8nio/n8n:latest
    ports: ["5678:5678"]
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - EXECUTIONS_MODE=queue
      - QUEUE_BULL_REDIS_HOST=redis
    volumes: ["n8n_data:/home/node/.n8n"]

  # 🧲 Vector Database
  qdrant:
    image: qdrant/qdrant:latest
    ports: ["6333:6333"]
    volumes: ["qdrant_data:/qdrant/storage"]

  # 🗃️ Relational Database
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: firefly
      POSTGRES_USER: firefly
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes: 
      - pg_data:/var/lib/postgresql/data
      - ./infra/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql

  # ⚡ Cache & Queue
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    volumes: ["redis_data:/data"]

  # 🌐 Reverse Proxy
  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./infra/nginx/nginx.conf:/etc/nginx/nginx.conf
      - certbot_data:/etc/letsencrypt
    depends_on: [agent, n8n]

volumes:
  ollama_data:
  n8n_data:
  qdrant_data:
  pg_data:
  redis_data:
  certbot_data:
```

---

## 8. Безопасность

> [!CAUTION]
> Автономный агент с доступом к email, браузеру и регистрациям — это серьёзный вектор рисков. Нужны строгие ограничения.

| Мера | Реализация |
|:---|:---|
| **Human-in-the-loop** | Критичные действия (email, регистрация, оплата) требуют ✅ в Telegram |
| **Rate Limiting** | Лимиты на количество действий в час/день |
| **Action Whitelist** | Список разрешённых доменов для регистрации |
| **Audit Log** | Все действия записываются в PostgreSQL |
| **Secrets Management** | Все ключи в `.env`, никогда не в коде |
| **Network Isolation** | Ollama и DB не доступны извне (только через Docker network) |
| **Backup** | Ежедневный бэкап PostgreSQL и Qdrant |

---

## 9. Мониторинг и Observability

| Компонент | Инструмент |
|:---|:---|
| **Metrics** | Prometheus + Grafana (опционально) |
| **Logs** | Structured logging → PostgreSQL + Google Drive `/mind/logs/` |
| **Health Checks** | `/health` endpoint + n8n health workflow |
| **Alerts** | Telegram Bot (ошибки, downtime, лимиты) |
| **Cost Tracking** | Логирование токенов и времени инференса |

---

## 10. User Review Required

> [!IMPORTANT]
> ### Вопросы, требующие твоего решения:

### Вопрос 1: Железо VPS
Какой VPS ты планируешь использовать? Это критично для выбора модели:
- **С GPU (RTX 4090 / A100)** → Gemma 4 26B MoE (лучшее качество)
- **Без GPU, мощный CPU + 32GB RAM** → Gemma 4 E4B quantized (Q4_K_M)
- **Минимальный VPS** → Стоит рассмотреть Gemini API как fallback (cloud, платный)

### Вопрос 2: Human-in-the-loop уровень
Насколько автономным должен быть агент?
- **Полная автономия**: агент сам принимает все решения, ты видишь только отчёты
- **Гибрид**: email/регистрация требуют подтверждения, остальное автономно
- **Осторожный**: каждое внешнее действие требует подтверждения в Telegram

### Вопрос 3: Web Search
Для исследований агенту нужен поиск. Варианты:
- **SearXNG** (self-hosted, бесплатный, медленнее) — ещё один контейнер в Docker
- **Serper API** ($50/мес за 10K запросов, быстрый)
- **Google Custom Search** (100 запросов/день бесплатно)
- Комбинация?

### Вопрос 4: Контент-платформы
На каких платформах агент будет публиковать контент? Это влияет на набор инструментов:
- LinkedIn? Twitter/X? Telegram-канал? Блог? Habr? Medium?

### Вопрос 5: Outreach / отклики
Куда агент будет отправлять отклики?
- hh.ru? LinkedIn Jobs? Upwork? Фриланс-площадки?
- Нужна ли интеграция с конкретными job-платформами?

---

## 11. План поэтапной реализации

### Phase 1: Foundation (1-2 дня)
- [ ] Инициализация проекта, Docker Compose
- [ ] Настройка Ollama + Gemma 4
- [ ] Базовый Agent Core на FastAPI
- [ ] PostgreSQL + Qdrant setup
- [ ] Redis для queue

### Phase 2: Brain (2-3 дня)
- [ ] LangGraph agent с Plan → Execute → Reflect циклом
- [ ] Система памяти (working + episodic + semantic)
- [ ] Базовые инструменты (web search, file operations)
- [ ] Интеграция с Ollama

### Phase 3: Integrations (2-3 дня)
- [ ] Google Drive API (чтение system prompts, запись отчётов)
- [ ] Google Sheets API (чтение задач, обновление статусов)
- [ ] Gmail API (отправка/чтение писем)
- [ ] Telegram Bot (уведомления + команды)

### Phase 4: Orchestration (2-3 дня)
- [ ] n8n workflows (task dispatcher, daily report, notifications)
- [ ] Связка n8n ↔ Agent Core через webhooks
- [ ] Cron-задачи и расписание
- [ ] Error workflows

### Phase 5: Browser Automation (2-3 дня)
- [ ] Playwright setup в Docker
- [ ] browser-use интеграция
- [ ] Инструменты: регистрация, заполнение форм, скрейпинг
- [ ] Anti-detection (proxy, fingerprinting)

### Phase 6: Polish & Security (1-2 дня)
- [ ] Human-in-the-loop через Telegram
- [ ] Rate limiting и action whitelist
- [ ] Audit logging
- [ ] Backup scripts
- [ ] Health monitoring

**Общая оценка: ~10-16 дней активной разработки**

---

## 12. Verification Plan

### Automated Tests
- Unit tests для каждого tool и core module
- Integration tests: Agent → Ollama → Qdrant цепочка
- E2E test: Google Sheets task → Agent execution → Drive report

### Manual Verification
- Создание тестовой задачи в Google Sheets → проверка полного цикла
- Отправка тестового email → проверка в Telegram
- Регистрация на тестовом сайте через Playwright
- Проверка daily report в Google Drive `/mind/`
