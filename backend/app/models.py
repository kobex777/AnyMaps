"""Pydantic models for request/response validation."""
from typing import Optional, List
from pydantic import BaseModel, Field


# ============================================
# Planner Agent Models
# ============================================

class NodeSpec(BaseModel):
    """Specification for a single node in the mind map."""
    id: str = Field(..., description="Unique identifier for the node")
    label: str = Field(..., description="Display label for the node")
    description: Optional[str] = Field(None, description="Optional description")
    type: str = Field("default", description="Node type: 'central', 'primary', 'secondary'")
    icon: Optional[str] = Field(None, description="Material icon name")


class EdgeSpec(BaseModel):
    """Specification for a connection between nodes."""
    source: str = Field(..., description="Source node ID")
    target: str = Field(..., description="Target node ID")
    label: Optional[str] = Field(None, description="Edge label")
    style: str = Field("solid", description="Edge style: 'solid', 'dashed', 'dotted'")


class PlannerSpec(BaseModel):
    """Output from the Planner Agent - structured mind map specification."""
    title: str = Field(..., description="Title of the mind map")
    central_topic: str = Field(..., description="The main topic/theme")
    nodes: List[NodeSpec] = Field(default_factory=list, description="List of nodes")
    edges: List[EdgeSpec] = Field(default_factory=list, description="List of edges")
    summary: Optional[str] = Field(None, description="Brief summary of the map")


# ============================================
# API Request/Response Models
# ============================================

class GeneratePlanRequest(BaseModel):
    """Request body for /generate/plan endpoint."""
    user_prompt: str = Field(..., description="User's input prompt")
    image_base64: Optional[str] = Field(None, description="Optional base64 encoded image")


class GeneratePlanResponse(BaseModel):
    """Response from /generate/plan endpoint."""
    success: bool
    planner_spec: Optional[PlannerSpec] = None
    error: Optional[str] = None


class GenerateBuildRequest(BaseModel):
    """Request body for /generate/build endpoint."""
    planner_spec: PlannerSpec = Field(..., description="Planner specification to convert")


class GenerateBuildResponse(BaseModel):
    """Response from /generate/build endpoint."""
    success: bool
    mermaid_syntax: Optional[str] = None
    error: Optional[str] = None


class GenerateFullRequest(BaseModel):
    """Request body for /generate/full endpoint (chains plan + build)."""
    user_prompt: str = Field(..., description="User's input prompt")
    image_base64: Optional[str] = Field(None, description="Optional base64 encoded image")


class GenerateFullResponse(BaseModel):
    """Response from /generate/full endpoint."""
    success: bool
    planner_spec: Optional[PlannerSpec] = None
    mermaid_syntax: Optional[str] = None
    error: Optional[str] = None


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    version: str


# ============================================
# Enhance Map Models
# ============================================

class EnhanceMapRequest(BaseModel):
    """Request to enhance an existing mind map with new content."""
    current_spec: PlannerSpec = Field(..., description="The current diagram state")
    enhance_prompt: str = Field(..., description="What to add, change, or expand")
    enhance_mode: str = Field(
        "expand",
        description="Enhancement mode: 'expand' (add nodes), 'refine' (improve labels), 'focus' (dive deeper into a topic)"
    )


class EnhanceMapResponse(BaseModel):
    """Response with enhanced map."""
    success: bool
    planner_spec: Optional[PlannerSpec] = None
    changes_summary: Optional[str] = None  # e.g., "Added 3 nodes, modified 1"
    error: Optional[str] = None
