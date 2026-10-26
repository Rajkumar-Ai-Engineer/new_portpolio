# P003: E_mail_assistant_(deep_agents)

**Category:** Agentic AI  
**Tier:** Standard  
**Primary Language:** Jupyter Notebook  
**Repository:** [https://github.com/Rajkumar-Ai-Engineer/email_assistant_updated](https://github.com/Rajkumar-Ai-Engineer/email_assistant_updated)  
**Verification Status:** Verified via source code inspection  

---

## 1. Project Overview

DeepAgents multi-agent email triage and automation system over Gmail and Google Calendar APIs with human-in-the-loop safeguards.

E_mail_assistant_(deep_agents) was developed by Rajkumar V. as part of an extensive portfolio of production-grade AI systems, demonstrating practical implementation of Agentic AI architectures and modern software engineering principles.

---

## 2. Problem Statement

Knowledge workers spend hours manually categorizing emails, extracting meeting invites, and drafting standard replies, with risks of prompt injection in unvetted emails.

---

## 3. Objectives & Features

- **Automated Workflow Execution:** Eliminates manual overhead by providing structured, automated execution routines.
- **Robust Component Architecture:** Implements modular design separating data ingestion, processing, and output delivery.
- **Error Handling & Resilience:** Integrates parameter validation and informative exception management.
- **Evidence-Based Design:** Built directly from verified algorithms, models, and reproducible pipelines.

---

## 4. Architecture Diagram

```
+-------------------------------------------------------------+
|                      User / Client                          |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|               Input Validation & Configuration              |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|           Core Processing Engine (Agentic AI)               |
|      - Specialized Agents / Algorithms / Model Inference    |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|           Output Validation & Presentation Layer            |
+-------------------------------------------------------------+
```

*Associated Architecture Asset:* `email-assistant-architecture.webp`  
*Associated Cover Asset:* `email-assistant-architecture.webp`  

---

## 5. Component Responsibilities

1. **Central Triage Orchestrator:** Responsible for isolation of task boundaries and modular data transformations.
2. **Inbox Reader & Prompt Injection Detector:** Responsible for isolation of task boundaries and modular data transformations.
3. **Mail Searcher & Evidence Citation Agent:** Responsible for isolation of task boundaries and modular data transformations.
4. **Calendar Free-Slot Finder:** Responsible for isolation of task boundaries and modular data transformations.
5. **Draft Writer (No Fabrication):** Responsible for isolation of task boundaries and modular data transformations.

---

## 6. End-to-End Data Flow

User inbox fetch -> Injection detector scans message content -> Triage orchestrator routes request -> Searcher/Calendar subagents execute read-only queries -> Draft writer compiles reply -> Human confirms send.

---

## 7. Technology Stack

- **Core Runtime:** Jupyter Notebook
- **Category:** Agentic AI
- **Dependencies & Libraries:**
```text
langchain
langgraph
deepagents
python-dotenv
langchain-groq
ipykernel
streamlit
pyyaml
pydantic
google-api-python-client
google-auth-oauthlib
structlog
```

---

## 8. Setup & Installation

```bash
# Clone the verified repository
git clone https://github.com/Rajkumar-Ai-Engineer/email_assistant_updated
cd email_assistant_updated

# Create and activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## 9. Configuration Requirements

Create a `.env` file in the project root with the required environment parameters (use placeholders only):

```env
# Runtime Configuration (Placeholders)
ENVIRONMENT=development
API_ENDPOINT=https://api.example.com
MODEL_NAME=default-model
LOG_LEVEL=INFO
```

> **Security Note:** Never commit live API keys or credentials to version control.

---

## 10. How to Run & Test

```bash
# Execute primary runner or application entry point
python app.py
# Or for CLI runners:
python main.py
```

### Running Tests
```bash
python -m unittest discover -s tests -p "*test*.py"
```

---

## 11. Verified Outputs & Evaluation Results

Evaluated on standard executive inbox scenarios; prompt injection detection rules successfully catch indirect injection payloads.

---

## 12. Limitations & Known Issues

- Requires OAuth tokens for Gmail and Google Calendar; human approval is required for all outbound communications.
- Environment-specific dependencies must be configured according to host hardware (GPU/CPU).

---

## 13. Proposed Future Improvements

*Note: The following are design proposals and not yet implemented in the current baseline.*

1. **Distributed Scalability:** Introduce containerized microservice deployment with horizontal auto-scaling.
2. **Enhanced Observability:** Add OpenTelemetry tracing and structured JSON metrics for telemetry monitoring.
3. **Automated Benchmark Suite:** Implement continuous regression benchmarks across diverse test sets.
