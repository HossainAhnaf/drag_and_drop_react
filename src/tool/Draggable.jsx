import React, { useContext, useEffect, useRef, useState } from 'react'
import DraggableContext from './DragDropProvider/contexts/DraggableContext';
function Draggable({children}) {
  const draggableRef = useRef(null)
  const {
    draggingState,
    containerRef,
    draggableElementsRef,
    draggableElementsRect,
    getDraggableId
  } = useContext(DraggableContext)

  const [startYOffset, setStartYOffset] = useState(0)
  
  const dragMoveHandler = (e)=> {
 console.log(draggingState.prevState);
    // const draggingDummyElmRect = this.draggingState.dummyElement.getBoundingClientRect()
    // const currentTranslateY = Math.min(this.minYOffset, Math.max(e.clientY, this.maxYOffset)) - this.startYOffset
    // this.draggingState.dummyElement.style.setProperty("transform", `translateY(${(currentTranslateY)}px)`)
    // const isPrevElementDraggedOver = (this.prevState.rect && draggingDummyElmRect.top <= this.prevState.rect.top + this.prevState.rect.height / 2)
    // const isNextElementDraggedOver = (this.nextState.rect && draggingDummyElmRect.top >= this.nextState.rect.top - this.nextState.rect.height / 2)

    // if (isPrevElementDraggedOver || isNextElementDraggedOver)
    //   this.#changeDraggingElementVisualIndex(isPrevElementDraggedOver ? this.prevState : this.nextState)
  }

  const dragStartHandler = (e) =>{
    draggingState.updateDraggingElement(draggableRef.current)
    draggingState.updateNextPrevState(draggableElementsRef.current,draggableElementsRect)
    containerRef.current.appendChild(draggingState.dummyElement)
    draggableRef.current.style.setProperty("opacity", "0")    
    document.documentElement.style.setProperty("cursor", "grabbing")
     draggableElementsRef.current.forEach(draggableElement => draggableElement.style.setProperty("user-select", "none"))
    setStartYOffset(e.clientY)
    document.onpointermove = dragMoveHandler
    // document.onpointerup = this.#dragEndHandler.bind(this)
  }

  const init = () =>{
      draggableRef.current.setAttribute("data-visual-index", getDraggableId());
      draggableRef.current.setAttribute("data-draggable", "true");
      draggableRef.current.style.setProperty("transition", "transform 0.3s")
      draggableRef.current.style.setProperty("touch-action", "none")
      draggableRef.current.addEventListener("pointerdown", dragStartHandler)
      // this.draggableElementRects.push(draggableRef.current.getBoundingClientRect())
  }
  useEffect(init,[draggableRef])
  return children(draggableRef)
  
}

export default Draggable
