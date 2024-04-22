import {useEffect, useRef, useState} from "react";
//contexts
import DraggableItemsContainerContext from "./contexts/DraggableItemsContainerContext";
import DraggableContext from "./contexts/DraggableContext";
//dragging state
import _draggingState from '../draggingState';
export default function DragDropProvider({ children }) {
  const draggingState = new _draggingState()
  const containerRef = useRef(null)

  const [draggableId, setDraggableId] = useState(0)
  const draggableElementsRef = useRef([])
  const [draggableElementsRect, setDraggableElementsRect] = useState([])
  const getDraggableId = () =>{
    console.log(draggableId);
    setDraggableId(prev => prev + 1)
    return draggableId
  } 

 useEffect(() => {
  const rectArray = []
  draggableElementsRef.current = Array.from(containerRef.current.children).filter(elm => {
   if (elm.getAttribute("data-draggable") == "true"){
    rectArray.push(elm.getBoundingClientRect())
    return true
   }
    setDraggableElementsRect(rectArray)
 })
 
},[containerRef])
  return (
    <DraggableItemsContainerContext.Provider value={{containerRef}}>
    <DraggableContext.Provider value={{getDraggableId,draggingState,containerRef,draggableElementsRef,draggableElementsRect}}>
      {children}
    </DraggableContext.Provider>
    </DraggableItemsContainerContext.Provider>
  );

}