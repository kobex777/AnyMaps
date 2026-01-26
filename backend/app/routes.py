"""API route definitions."""
from fastapi import APIRouter, HTTPException

from .models import (
    GeneratePlanRequest,
    GeneratePlanResponse,
    GenerateBuildRequest,
    GenerateBuildResponse,
    GenerateFullRequest,
    GenerateFullResponse,
    EnhanceMapRequest,
    EnhanceMapResponse,
    HealthResponse,
)
from .agents import run_planner_agent, run_builder_agent, analyze_image, run_enhance_agent, calculate_changes


router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(status="healthy", version="1.0.0")


@router.post("/generate/plan", response_model=GeneratePlanResponse)
async def generate_plan(request: GeneratePlanRequest):
    """
    Generate a mind map plan from user prompt.
    
    Accepts an optional image for vision-based analysis.
    Returns a structured PlannerSpec.
    """
    try:
        # Process image if provided
        image_description = None
        if request.image_base64:
            image_description = await analyze_image(request.image_base64)
        
        # Run the planner agent
        planner_spec = await run_planner_agent(
            user_prompt=request.user_prompt,
            image_description=image_description
        )
        
        return GeneratePlanResponse(
            success=True,
            planner_spec=planner_spec
        )
    
    except Exception as e:
        return GeneratePlanResponse(
            success=False,
            error=str(e)
        )


@router.post("/generate/build", response_model=GenerateBuildResponse)
async def generate_build(request: GenerateBuildRequest):
    """
    Convert a PlannerSpec into Mermaid syntax.
    
    Takes a structured specification and returns Mermaid.js code.
    """
    try:
        mermaid_syntax = await run_builder_agent(request.planner_spec)
        
        return GenerateBuildResponse(
            success=True,
            mermaid_syntax=mermaid_syntax
        )
    
    except Exception as e:
        return GenerateBuildResponse(
            success=False,
            error=str(e)
        )


@router.post("/generate/full", response_model=GenerateFullResponse)
async def generate_full(request: GenerateFullRequest):
    """
    Full pipeline: Generate plan and build in one request.
    
    Chains the Planner and Builder agents for simpler UX.
    """
    try:
        # Process image if provided
        image_description = None
        if request.image_base64:
            image_description = await analyze_image(request.image_base64)
        
        # Step 1: Generate plan
        planner_spec = await run_planner_agent(
            user_prompt=request.user_prompt,
            image_description=image_description
        )
        
        # Step 2: Build Mermaid syntax
        mermaid_syntax = await run_builder_agent(planner_spec)
        
        return GenerateFullResponse(
            success=True,
            planner_spec=planner_spec,
            mermaid_syntax=mermaid_syntax
        )
    
    except Exception as e:
        return GenerateFullResponse(
            success=False,
            error=str(e)
        )


@router.post("/generate/enhance", response_model=EnhanceMapResponse)
async def enhance_map(request: EnhanceMapRequest):
    """
    Enhance an existing mind map with additional content.
    
    Takes the current map spec and a user prompt to expand, refine, or focus.
    Returns the updated spec with a summary of changes.
    """
    try:
        # Run the enhance agent
        enhanced_spec = await run_enhance_agent(
            current_spec=request.current_spec,
            enhance_prompt=request.enhance_prompt,
            enhance_mode=request.enhance_mode
        )
        
        # Calculate what changed
        changes_summary = calculate_changes(request.current_spec, enhanced_spec)
        
        return EnhanceMapResponse(
            success=True,
            planner_spec=enhanced_spec,
            changes_summary=changes_summary
        )
    
    except Exception as e:
        return EnhanceMapResponse(
            success=False,
            error=str(e)
        )
