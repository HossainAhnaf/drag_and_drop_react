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
  
  return (
    <DraggableItemsContainerContext.Provider value={{containerRef}}>
    <DraggableContext.Provider value={{draggingState,containerRef,draggableElementsRef,draggableElementsRect}}>
      {children}
    </DraggableContext.Provider>
    </DraggableItemsContainerContext.Provider>
  );

}