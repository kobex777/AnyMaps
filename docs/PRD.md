# Product Requirements Document (PRD): AnyMaps

## 1. Executive Summary
AnyMaps is an AI-native platform designed to transform user inputs (text or images) into interactive diagrams and mental maps. The system leverages a dual-AI architecture: a Planner AI that converts raw intent into detailed specifications, and a Builder AI that generates the final visual product. The platform targets students and professionals, utilizing a sophisticated rendering pipeline to ensure structural integrity and interactivity.

## 2. Core User Flow & Logic
The application logic follows a "Solo Orchestrator" or "Agentic Loop" workflow, shifting from syntax generation to semantic intent management.

### 2.1. Input Phase
*   **User Interface**: A chat-based UI similar to ChatGPT or Gemini but styled with unique React components.
*   **Input Types**: Users may input natural language text or upload images.

### 2.2. The Dual AI Process (Logic Layer)
The core logic separates "planning" from "execution" to minimize hallucination and maximize structural integrity.

#### A. The Planner AI (Semantic Specification)
*   **Role**: Acts as a Product Manager or PRD generator.
*   **Function**: Analyzes the user's raw prompt and expands it into a detailed technical specification.
*   **Logic Steps**:
    1.  **Intent Analysis**: Deciphers the semantic meaning of the request.
    2.  **Task Decomposition**: Break the request down into "Atomic Tasks" (e.g., Define nodes, Define edges).
    3.  **Output**: A structured prompt passed to the Builder AI.

#### B. The Builder AI (Agentic Implementation)
*   **Role**: Acts as the Developer/Architect.
*   **Function**: Executes the construction of the diagram structure.
*   **Logic Steps**:
    1.  **Code Generation**: Generates the necessary Mermaid.js syntax.
    2.  **Visual Logic**: Ensures the node/link relationships are valid.
    3.  **Self-Correction**: Validates the output against the specs.

## 3. Functional Requirements: The 4-Step Rendering Pipeline
To bridge the gap between text-based AI output and interactive React components, AnyMaps implements a specific translation layer.

### 3.1. Step 1: AI Layer (The Writer)
*   **Input**: Planner AI specs.
*   **Action**: The Builder AI generates pure **Mermaid.js syntax** (e.g., `A --> B`).
*   **Rationale**: Mermaid is a standard, robust syntax for defining diagrams textually, which is optimal for LLM generation.

### 3.2. Step 2: Parser Layer (The Bridge)
*   **Action**: A parser (e.g., `mermaid-parser`) converts the raw Mermaid string into a structured JavaScript object containing `Nodes` and `Links`.
*   **Output**: JSON object representing the graph topology.

### 3.3. Step 3: Layout Engine (The Brain)
*   **Action**: The node/link objects are passed to a layout engine like **ELK.js** or **Dagre**.
*   **Function**: Since Mermaid syntax does not contain coordinate data ($x, y$), the engine calculates optimal positions to prevent overlap and ensure readability.
*   **Output**: Enriched Node/Edge objects with coordinate data.

### 3.4. Step 4: React Flow (The UI)
*   **Action**: The calculated positions are fed into **React Flow**.
*   **Result**: An interactive, draggable, and zoomable infinite canvas.

## 4. Technical Stack
*   **Frontend**: React (Vite).
*   **Backend / AI Orchestration**: **Python** using **OpenRouter** to handle Planner/Builder LLM chaining.
*   **Rendering**: Mermaid.js (Syntax) -> Mermaid Parser -> ELK.js (Layout) -> React Flow (Canvas).
