import React, { useContext, useEffect, useRef } from 'react'
import DraggableContext from './DragDropProvider/contexts/DraggableContext';
function Draggable({children}) {
  const draggableRef = useRef(null)

  const {draggingState,getDraggableId} = useContext(DraggableContext)
  const dragStartHandler = (e) =>{
    draggingState.updateDraggingElement(draggableRef.current)
    draggableRef.current.style.setProperty("opacity", "0")    
    document.documentElement.style.setProperty("cursor", "grabbing")
    .appendChild(this.draggingState.dummyElement)
     this.draggableElements.forEach((item) => item.style.setProperty("user-select", "none"))
    // this.#updateNextPrevState()
     
    // this.startYOffset = e.clientY
    // document.onpointermove = this.#dragMoveHandler.bind(this)
    // document.onpointerup = this.#dragEndHandler.bind(this)
  }

  const init = () =>{
      draggableRef.current.setAttribute("data-visual-index", getDraggableId);
      draggableRef.current.setAttribute("data-draggable", "true");
      draggableRef.current.style.setProperty("transition", "transform 0.3s")
      draggableRef.current.style.setProperty("touch-action", "none")
      draggableRef.current.addEventListener("pointerdown", dragStartHandler)
      // this.draggableElementRects.push(draggableRef.current.getBoundingClientRect())
  }
  useEffect(init,[draggableRef])
  return (
    children(draggableRef)
  )
}

export default Draggable
