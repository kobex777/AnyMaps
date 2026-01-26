"""Application configuration loaded from environment variables."""
import os
import sys
from dotenv import load_dotenv

load_dotenv()

# OpenRouter Configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")

# Supabase Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")

# Model Configuration
PLANNER_MODEL = os.getenv("PLANNER_MODEL", "anthropic/claude-3.5-sonnet")
BUILDER_MODEL = os.getenv("BUILDER_MODEL", "anthropic/claude-3.5-sonnet")
VISION_MODEL = os.getenv("VISION_MODEL", "anthropic/claude-3.5-sonnet")

# Server Configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

# CORS Origins (Frontend URLs)
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]


# ============================================
# Startup Validation
# ============================================
def validate_config():
    """Validate required configuration on startup."""
    errors = []
    
    if not OPENROUTER_API_KEY:
        errors.append("OPENROUTER_API_KEY is required but not set!")
    elif not OPENROUTER_API_KEY.startswith("sk-or-"):
        errors.append("OPENROUTER_API_KEY appears invalid (should start with 'sk-or-')")
    
    if errors:
        print("\n❌ Configuration Errors:")
        for error in errors:
            print(f"   - {error}")
        print("\nPlease check your .env file and try again.\n")
        sys.exit(1)
    
    print("✅ Configuration validated successfully")
    print(f"   - Planner Model: {PLANNER_MODEL}")
    print(f"   - Builder Model: {BUILDER_MODEL}")
    print(f"   - Vision Model: {VISION_MODEL}")

