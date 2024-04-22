import React, { useContext, useEffect, useRef, useState } from 'react'
import DraggableContext from '../../DragDropProvider/contexts/DraggableContext';
//handlers
import useDragStartHandler from './useDragStartHandler';

export default function useInitDraggableElement(draggableRef){
 const {    
  draggableElementsRef,
  draggableElementsRect
} = useContext(DraggableContext)
const dragStartHandler = useDragStartHandler() 
useEffect(() => {
  draggableRef.current.setAttribute("data-visual-index", draggableElementsRef.current.length);
  draggableRef.current.setAttribute("data-draggable", "true");
  draggableRef.current.style.setProperty("transition", "transform 0.3s")
  draggableRef.current.style.setProperty("touch-action", "none")
  draggableRef.current.addEventListener("pointerdown", dragStartHandler)
  draggableElementsRef.current.push(draggableRef.current)
  draggableElementsRect.push(draggableRef.current.getBoundingClientRect()) 

},[draggableRef])
 }


