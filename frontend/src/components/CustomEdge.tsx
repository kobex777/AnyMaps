import {
    BaseEdge,
    EdgeLabelRenderer,
    type EdgeProps,
    useReactFlow,
} from '@xyflow/react';
import React, { useState, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style = {},
    markerEnd,
    data,
}: EdgeProps) {
    const updateEdge = useAppStore((state) => state.updateEdge);
    const { screenToFlowPosition } = useReactFlow();

    // Local state for smooth dragging without hitting store every frame
    const [isDragging, setIsDragging] = useState(false);
    const [optimisticControlPoint, setOptimisticControlPoint] = useState<{ x: number, y: number } | null>(null);

    // Control point logic:
    // 1. Use optimistic state if dragging
    // 2. Use data from store if available
    // 3. Default to midpoint
    const defaultX = (sourceX + targetX) / 2;
    const defaultY = (sourceY + targetY) / 2;

    const controlX = isDragging && optimisticControlPoint ? optimisticControlPoint.x : (data?.controlPointX as number ?? defaultX);
    const controlY = isDragging && optimisticControlPoint ? optimisticControlPoint.y : (data?.controlPointY as number ?? defaultY);

    // Quadratic Bezier path: M start Q control end
    const path = `M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`;

    // Calculate the point on the curve at t=0.5 (midpoint) to position the handle
    // Bezier formula: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
    // For t=0.5: 0.25*P0 + 0.5*P1 + 0.25*P2
    const labelX = 0.25 * sourceX + 0.5 * controlX + 0.25 * targetX;
    const labelY = 0.25 * sourceY + 0.5 * controlY + 0.25 * targetY;

    const onMouseDown = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            event.preventDefault();

            setIsDragging(true);
            setOptimisticControlPoint({ x: controlX, y: controlY });

            const onMouseMove = (moveEvent: MouseEvent) => {
                moveEvent.preventDefault();
                // Get mouse position in flow coords (this is where we want the midpoint to be)
                const mousePos = screenToFlowPosition({
                    x: moveEvent.clientX,
                    y: moveEvent.clientY,
                });

                // Reverse calculate Control Point (P1) so that the midpoint (t=0.5) lands on mousePos
                // P1 = 2 * M - 0.5 * P0 - 0.5 * P2
                const newControlX = 2 * mousePos.x - 0.5 * sourceX - 0.5 * targetX;
                const newControlY = 2 * mousePos.y - 0.5 * sourceY - 0.5 * targetY;

                setOptimisticControlPoint({ x: newControlX, y: newControlY });
            };

            const onMouseUp = (upEvent: MouseEvent) => {
                const mousePos = screenToFlowPosition({
                    x: upEvent.clientX,
                    y: upEvent.clientY,
                });

                // Final calculation
                const finalControlX = 2 * mousePos.x - 0.5 * sourceX - 0.5 * targetX;
                const finalControlY = 2 * mousePos.y - 0.5 * sourceY - 0.5 * targetY;

                // Save to store
                updateEdge(id, {
                    controlPointX: finalControlX,
                    controlPointY: finalControlY
                });

                setIsDragging(false);
                setOptimisticControlPoint(null);

                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        },
        [controlX, controlY, sourceX, sourceY, targetX, targetY, id, screenToFlowPosition, updateEdge]
    );

    return (
        <>
            <BaseEdge path={path} markerEnd={markerEnd} style={style} interactionWidth={20} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                        // Ensure it's above edges but maybe below nodes? Z-index logic handled by React Flow mostly
                        zIndex: 10,
                    }}
                    className="nodrag nopan"
                >
                    {/* Control Handle - Invisible but draggable */}
                    <div
                        className="w-6 h-6 bg-transparent rounded-full cursor-move flex items-center justify-center"
                        onMouseDown={onMouseDown}
                    />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
