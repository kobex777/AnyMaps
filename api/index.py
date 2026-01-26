import os
import sys

# Add the backend directory to the system path to allow imports
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

# Import the FastAPI application instance
from main import app as app

# This exposes the 'app' object to Vercel's serverless runtime
