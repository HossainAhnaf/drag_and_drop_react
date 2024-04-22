import {useRef, useState} from "react";
//contexts
import DraggableItemsContainerContext from "./contexts/DraggableItemsContainerContext";
import DraggableContext from "./contexts/DraggableContext";
//dragging state
import _draggingState from '../draggingState';
export default function DragDropProvider({ children }) {
  const draggingState = new _draggingState()
  const containerRef = useRef(null)
  const [draggableId, setDraggableId] = useState(0)
 
  const getDraggableId = () =>{
    setDraggableId(draggableId + 1)
    return draggableId
  } 

  return (
    <DraggableItemsContainerContext.Provider value={{containerRef}}>
    <DraggableContext.Provider value={{getDraggableId,draggingState}}>
      {children}
    </DraggableContext.Provider>
    </DraggableItemsContainerContext.Provider>
  );

}