import React, { useEffect, useRef, useContext } from 'react'
import DragDropProvider from './DragDropProvider/index';
import DraggableContext from './DragDropProvider/contexts/DraggableContext';
import DraggableItemsContainerContext from './DragDropProvider/contexts/DraggableItemsContainerContext';
function DraggableItemsContainer({children}) {
  const ctx = useContext(DraggableContext)
  const containerRef = useRef(null)
  useEffect(() => {
     console.log(ctx);
   },[containerRef])

  return (
    <DragDropProvider>
    {children(containerRef)}
    </DragDropProvider>
  )
}

export default DraggableItemsContainer
