import React, { useContext} from 'react'
import DraggableContext from '../../DragDropProvider/contexts/DraggableContext';
//handlers
import useDragMoveHandler from './useDragMoveHandler';
import useDragEndHandler from './useDragEndHandler';
export default function useDragStartHandler() {
  const {
    draggingState,
    containerRef,
    draggableElementsRef,
    draggableElementsRect
  } = useContext(DraggableContext)
  const dragMoveHandler = useDragMoveHandler()
  const dragEndHandler = useDragEndHandler()
 return ({currentTarget,clientY}) =>{
  draggingState.updateDraggingElement(currentTarget)
  draggingState.updateNextPrevState(draggableElementsRef.current,draggableElementsRect)
  draggingState.startYOffset = clientY
  containerRef.current.appendChild(draggingState.dummyElement)
  currentTarget.style.setProperty("opacity", "0")    
  document.documentElement.style.setProperty("cursor", "grabbing")
   draggableElementsRef.current.forEach(draggableElement => draggableElement.style.setProperty("user-select", "none"))
  document.onpointermove = dragMoveHandler
  document.onpointerup = dragEndHandler
}
}
