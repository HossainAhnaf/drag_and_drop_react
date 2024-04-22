import React, { useContext, useEffect, useRef, useState } from 'react'
import DraggableContext from '../../DragDropProvider/contexts/DraggableContext';
//handlers
// import useDragMoveHandler from './useDragMoveHandler';

export default function useDragMoveHandler(){
  const { draggingState} = useContext(DraggableContext)
  return (e) => {
     const draggingDummyElmRect = this.draggingState.dummyElement.getBoundingClientRect()
     const currentTranslateY = Math.min(this.minYOffset, Math.max(e.clientY, this.maxYOffset)) - this.startYOffset
     this.draggingState.dummyElement.style.setProperty("transform", `translateY(${(currentTranslateY)}px)`)
     const isPrevElementDraggedOver = (this.prevState.rect && draggingDummyElmRect.top <= this.prevState.rect.top + this.prevState.rect.height / 2)
     const isNextElementDraggedOver = (this.nextState.rect && draggingDummyElmRect.top >= this.nextState.rect.top - this.nextState.rect.height / 2)
 
     // if (isPrevElementDraggedOver || isNextElementDraggedOver)
     //   this.#changeDraggingElementVisualIndex(isPrevElementDraggedOver ? this.prevState : this.nextState)
   }
  }
 