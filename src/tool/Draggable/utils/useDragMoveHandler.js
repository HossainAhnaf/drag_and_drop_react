import React, { useContext} from 'react'
import DraggableContext from '../../DragDropProvider/contexts/DraggableContext';
//handlers
import useChangeDraggingElementVisualIndex from './useChangeDraggingElementVisualIndex';

export default function useDragMoveHandler(){
  const { draggingState} = useContext(DraggableContext)
  const changeDraggingElementVisualIndex = useChangeDraggingElementVisualIndex()
  return ({clientY}) => {
    const {
      dummyElement,
      startYOffset,
     minYOffset,
     maxYOffset,
     prevState,
     nextState
    } = draggingState
     const draggingDummyElmRect = dummyElement.getBoundingClientRect()
     const currentTranslateY = Math.min(minYOffset, Math.max(clientY, maxYOffset)) - startYOffset
     dummyElement.style.setProperty("transform", `translateY(${(currentTranslateY)}px)`)
     const isPrevElementDraggedOver = (prevState.rect && draggingDummyElmRect.top <= prevState.rect.top + prevState.rect.height / 2)
     const isNextElementDraggedOver = (nextState.rect && draggingDummyElmRect.top >= nextState.rect.top - nextState.rect.height / 2)
  
     if (isPrevElementDraggedOver || isNextElementDraggedOver)
       changeDraggingElementVisualIndex(isPrevElementDraggedOver ? prevState : nextState)
   }
  }
 