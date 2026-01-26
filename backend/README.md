# AnyMaps Backend

FastAPI backend for the AnyMaps AI-powered mind mapping application.

## Features

- **Dual-AI Generation Pipeline**: Planner + Builder agents for structured mind map creation
- **Vision Support**: Analyze images to extract concepts for mind mapping
- **OpenRouter Integration**: Uses Claude 3.5 Sonnet via OpenRouter API
- **CORS Enabled**: Ready for frontend integration

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Copy the example environment file and fill in your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_KEY=your_supabase_service_role_key_here
```

### 3. Run the Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Generate Plan
```
POST /api/generate/plan
Content-Type: application/json

{
  "user_prompt": "Map the Renaissance period",
  "image_base64": "optional_base64_image"
}
```

### Generate Build
```
POST /api/generate/build
Content-Type: application/json

{
  "planner_spec": { ... }
}
```

### Generate Full (Recommended)
```
POST /api/generate/full
Content-Type: application/json

{
  "user_prompt": "Map the Renaissance period",
  "image_base64": "optional_base64_image"
}
```

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Architecture

```
backend/
├── main.py              # FastAPI app entry point
├── app/
│   ├── config.py        # Environment configuration
│   ├── models.py        # Pydantic request/response models
│   ├── prompts.py       # AI system prompts
│   ├── agents.py        # Planner, Builder, Vision handlers
│   └── routes.py        # API endpoint definitions
└── requirements.txt     # Python dependencies
```

## Development

### Testing with curl

```bash
# Health check
curl http://localhost:8000/api/health

# Generate a mind map
curl -X POST http://localhost:8000/api/generate/full \
  -H "Content-Type: application/json" \
  -d '{"user_prompt": "Map the key concepts of quantum physics"}'
```

### Model Configuration

You can change the AI models in `.env`:

```env
PLANNER_MODEL=anthropic/claude-3.5-sonnet
BUILDER_MODEL=anthropic/claude-3.5-sonnet
VISION_MODEL=anthropic/claude-3.5-sonnet
```

Available models on OpenRouter:
- `anthropic/claude-3.5-sonnet`
- `openai/gpt-4-turbo`
- `google/gemini-pro-1.5`

## Troubleshooting

### CORS Errors
Make sure your frontend URL is in the `CORS_ORIGINS` list in `app/config.py`

### API Key Issues
Verify your OpenRouter API key is valid and has credits

### Import Errors
Ensure you're running from the `backend/` directory or adjust Python path
