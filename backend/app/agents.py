"""AI Agent implementations using OpenRouter."""
import json
from typing import Optional
from openai import AsyncOpenAI

from .config import (
    OPENROUTER_API_KEY,
    OPENROUTER_BASE_URL,
    PLANNER_MODEL,
    BUILDER_MODEL,
    VISION_MODEL,
)
from .prompts import (
    PLANNER_SYSTEM_PROMPT,
    BUILDER_SYSTEM_PROMPT,
    VISION_SYSTEM_PROMPT,
    ENHANCE_SYSTEM_PROMPT,
)
from .models import PlannerSpec


# Initialize AsyncOpenAI client with OpenRouter endpoint
# Using async client for proper non-blocking API calls in FastAPI
client = AsyncOpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url=OPENROUTER_BASE_URL,
)


async def run_planner_agent(
    user_prompt: str,
    image_description: Optional[str] = None
) -> PlannerSpec:
    """
    Run the Planner Agent to generate a mind map specification.
    
    Args:
        user_prompt: The user's input prompt
        image_description: Optional description from vision analysis
        
    Returns:
        PlannerSpec object with the structured mind map
    """
    # Combine user prompt with image description if available
    full_prompt = user_prompt
    if image_description:
        full_prompt = f"{user_prompt}\n\nImage Analysis:\n{image_description}"
    
    response = await client.chat.completions.create(
        model=PLANNER_MODEL,
        messages=[
            {"role": "system", "content": PLANNER_SYSTEM_PROMPT},
            {"role": "user", "content": full_prompt}
        ],
        temperature=0.7,
        max_tokens=2000,
        extra_headers={
            "HTTP-Referer": "https://anymaps.app",
            "X-Title": "AnyMaps"
        }
    )
    
    # Parse the JSON response
    content = response.choices[0].message.content
    
    # Clean up potential markdown fences
    if "```" in content:
        # Extract content between markdown fences
        parts = content.split("```")
        for part in parts:
            part = part.strip()
            # Remove language specifier if present
            if part.startswith("json"):
                part = part[4:].strip()
            if part.startswith("{"):
                content = part
                break
    
    content = content.strip()
    
    # Try to extract JSON from the content if it starts with text
    if not content.startswith("{"):
        # Find the first { and last }
        start_idx = content.find("{")
        end_idx = content.rfind("}")
        if start_idx != -1 and end_idx != -1:
            content = content[start_idx:end_idx + 1]
    
    try:
        spec_dict = json.loads(content)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse AI response as JSON: {e}. Raw content: {content[:500]}")
    
    return PlannerSpec(**spec_dict)


async def run_builder_agent(planner_spec: PlannerSpec) -> str:
    """
    Run the Builder Agent to convert a PlannerSpec to Mermaid syntax.
    
    Args:
        planner_spec: The structured mind map specification
        
    Returns:
        Mermaid.js syntax string
    """
    spec_json = planner_spec.model_dump_json(indent=2)
    
    response = await client.chat.completions.create(
        model=BUILDER_MODEL,
        messages=[
            {"role": "system", "content": BUILDER_SYSTEM_PROMPT},
            {"role": "user", "content": f"Convert this specification to Mermaid syntax:\n\n{spec_json}"}
        ],
        temperature=0.3,
        max_tokens=2000,
        extra_headers={
            "HTTP-Referer": "https://anymaps.app",
            "X-Title": "AnyMaps"
        }
    )
    
    mermaid_syntax = response.choices[0].message.content.strip()
    
    # Clean up potential markdown fences
    if mermaid_syntax.startswith("```"):
        mermaid_syntax = mermaid_syntax.split("```")[1]
        if mermaid_syntax.startswith("mermaid"):
            mermaid_syntax = mermaid_syntax[7:]
    mermaid_syntax = mermaid_syntax.strip()
    
    return mermaid_syntax


async def analyze_image(image_base64: str) -> str:
    """
    Analyze an image using vision model to extract concepts.
    
    Args:
        image_base64: Base64 encoded image data
        
    Returns:
        Description of the image content for mind map generation
    """
    # Determine image type (assume PNG if not specified)
    if image_base64.startswith("data:"):
        image_url = image_base64
    else:
        image_url = f"data:image/png;base64,{image_base64}"
    
    response = await client.chat.completions.create(
        model=VISION_MODEL,
        messages=[
            {"role": "system", "content": VISION_SYSTEM_PROMPT},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Analyze this image for mind map creation:"},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]
            }
        ],
        temperature=0.5,
        max_tokens=1000,
        extra_headers={
            "HTTP-Referer": "https://anymaps.app",
            "X-Title": "AnyMaps"
        }
    )
    
    return response.choices[0].message.content.strip()


async def run_enhance_agent(
    current_spec: PlannerSpec,
    enhance_prompt: str,
    enhance_mode: str = "expand"
) -> PlannerSpec:
    """
    Run the Enhance Agent to expand/refine an existing mind map.
    
    Args:
        current_spec: The current mind map specification
        enhance_prompt: User's request for what to add/change
        enhance_mode: Mode - 'expand', 'refine', or 'focus'
        
    Returns:
        Updated PlannerSpec with enhancements applied
    """
    # Format the system prompt with current spec info
    current_spec_json = current_spec.model_dump_json(indent=2)
    
    system_prompt = ENHANCE_SYSTEM_PROMPT.format(
        current_spec_json=current_spec_json,
        enhance_mode=enhance_mode,
        enhance_prompt=enhance_prompt
    )
    
    response = await client.chat.completions.create(
        model=PLANNER_MODEL,  # Use same model as planner
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Please enhance the mind map: {enhance_prompt}"}
        ],
        temperature=0.7,
        max_tokens=3000,  # Higher limit for larger maps
        extra_headers={
            "HTTP-Referer": "https://anymaps.app",
            "X-Title": "AnyMaps"
        }
    )
    
    # Parse the JSON response
    content = response.choices[0].message.content
    
    # Clean up potential markdown fences
    if "```" in content:
        parts = content.split("```")
        for part in parts:
            part = part.strip()
            if part.startswith("json"):
                part = part[4:].strip()
            if part.startswith("{"):
                content = part
                break
    
    content = content.strip()
    
    # Extract JSON if wrapped in text
    if not content.startswith("{"):
        start_idx = content.find("{")
        end_idx = content.rfind("}")
        if start_idx != -1 and end_idx != -1:
            content = content[start_idx:end_idx + 1]
    
    try:
        spec_dict = json.loads(content)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse enhanced spec as JSON: {e}. Raw: {content[:500]}")
    
    return PlannerSpec(**spec_dict)


def calculate_changes(original: PlannerSpec, enhanced: PlannerSpec) -> str:
    """Calculate a summary of changes between original and enhanced specs."""
    original_node_ids = {n.id for n in original.nodes}
    enhanced_node_ids = {n.id for n in enhanced.nodes}
    
    added_nodes = len(enhanced_node_ids - original_node_ids)
    removed_nodes = len(original_node_ids - enhanced_node_ids)
    
    original_edge_count = len(original.edges)
    enhanced_edge_count = len(enhanced.edges)
    edge_diff = enhanced_edge_count - original_edge_count
    
    parts = []
    if added_nodes > 0:
        parts.append(f"Added {added_nodes} node{'s' if added_nodes != 1 else ''}")
    if removed_nodes > 0:
        parts.append(f"Removed {removed_nodes} node{'s' if removed_nodes != 1 else ''}")
    if edge_diff > 0:
        parts.append(f"Added {edge_diff} connection{'s' if edge_diff != 1 else ''}")
    elif edge_diff < 0:
        parts.append(f"Removed {abs(edge_diff)} connection{'s' if abs(edge_diff) != 1 else ''}")
    
    return ", ".join(parts) if parts else "No structural changes"
