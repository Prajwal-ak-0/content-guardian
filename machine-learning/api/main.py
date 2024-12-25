from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sys
import os
import time

# Add parent directory to path to import ContentModerator
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from machine_learning import ContentModerator

app = FastAPI(title="Content Moderation API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize content moderator
moderator = ContentModerator()

class ModerateRequest(BaseModel):
    text: str

class CategoryDetail(BaseModel):
    category: str
    description: str

class ModerateResponse(BaseModel):
    input: str
    status: str
    timestamp: str
    violated_categories: Optional[List[str]] = None
    details: Optional[List[CategoryDetail]] = None
    confidence_score: float = 0.0  # Added for UI enhancement

@app.post("/api/moderate", response_model=ModerateResponse)
async def moderate_content(request: ModerateRequest):
    try:
        # Add artificial delay for loading state demonstration
        time.sleep(1)
        
        result = moderator.moderate_content(request.text)
        
        # Add confidence score (mock value for demonstration)
        result["confidence_score"] = 0.92 if result["status"] == "safe" else 0.85
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
