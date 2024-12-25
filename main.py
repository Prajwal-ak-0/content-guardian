from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sys
import os

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

@app.post("/api/moderate", response_model=ModerateResponse)
async def moderate_content(request: ModerateRequest):
    try:
        result = moderator.moderate_content(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
