import React, { useContext} from 'react'
import DraggableContext from '../../DragDropProvider/contexts/DraggableContext';
//handlers
import useChangeDraggingElementVisualIndex from './useChangeDraggingElementVisualIndex';

export default function useDragEndHandler(){
  const { draggingState,containerRef,draggableElementsRef} = useContext(DraggableContext)
  const changeDraggingElementVisualIndex = useChangeDraggingElementVisualIndex()
  return () => {
    //cleaning up
    draggingState.elm.style.removeProperty("opacity")
    draggingState.elm = null;
    document.documentElement.style.removeProperty("cursor")
    containerRef.current.removeChild(draggingState.dummyElement)
    document.onpointermove = null;
    document.onpointerup = null;

    //updating serial of list container childs
    draggableElementsRef.current.forEach((elm) =>{ 
    containerRef.current.removeChild(elm)
  })
  draggableElementsRef.current.sort((a, b) => a.getAttribute("data-visual-index") - b.getAttribute("data-visual-index"))
    for (const elm of draggableElementsRef.current) {
      elm.style.removeProperty("user-select")
      elm.style.removeProperty("transform")
      containerRef.current.appendChild(elm);
    }
  }
}
 
