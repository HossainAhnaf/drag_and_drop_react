import {useEffect, useRef, useState} from "react";
//contexts
import DraggableItemsContainerContext from "./contexts/DraggableItemsContainerContext";
import DraggableContext from "./contexts/DraggableContext";
//dragging state
import _draggingState from '../draggingState';
export default function DragDropProvider({ children }) {
  const draggingState = new _draggingState()
  const containerRef = useRef(null)
  const draggableElementsRef = useRef([])
  const draggableElementsRect = []
  useEffect(()=>draggingState.updateMinMaxYOffset(containerRef.current),[containerRef])
  useEffect(()=>{
      window.onresize = ()=>{
        draggingState.updateMinMaxYOffset(containerRef.current),[containerRef]
        for (let i = 0; i < draggableElementsRect.length; i++){
         draggableElementsRect[i] = draggableElementsRef.current[i].getBoundingClientRect()    
        }
    }
  return ()=> window.onresize = null
  
  },[])
 
  return (
    <DraggableItemsContainerContext.Provider value={{containerRef}}>
    <DraggableContext.Provider value={{draggingState,containerRef,draggableElementsRef,draggableElementsRect}}>
      {children}
    </DraggableContext.Provider>
    </DraggableItemsContainerContext.Provider>
  );

}