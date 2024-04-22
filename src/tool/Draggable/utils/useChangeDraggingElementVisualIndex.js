import React, { useContext } from 'react'
import DraggableContext from '../../DragDropProvider/contexts/DraggableContext';
export default function useChangeDraggingElementVisualIndex() {
  const { draggingState,draggableElementsRef,draggableElementsRect } = useContext(DraggableContext)
  return ({ elm: dragOverElement, rect: dragOverElmRect }) => {
    const oldTransformValue = /\d+/.exec(dragOverElement.style.getPropertyValue("transform"))
    const oldTranslateY = (oldTransformValue ? parseInt(oldTransformValue[0]) : 0)
    const dragOverElementVisualIndex = parseInt(dragOverElement.getAttribute("data-visual-index"))
    dragOverElement.style.setProperty("transform", `translateY(${draggingState.startRect.top - dragOverElmRect.top - (draggingState.visualIndex - dragOverElementVisualIndex === 1 ? oldTranslateY : -oldTranslateY)}px)`)
    dragOverElement.setAttribute("data-visual-index", draggingState.visualIndex)
    draggingState.visualIndex = dragOverElementVisualIndex
    draggingState.startRect = dragOverElmRect
    draggingState.updateNextPrevState(draggableElementsRef.current,draggableElementsRect)

  }
}

