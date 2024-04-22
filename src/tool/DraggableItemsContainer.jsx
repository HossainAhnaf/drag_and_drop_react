import React, { useEffect, useRef, useContext } from 'react'
import DraggableItemsContainerContext from './DragDropProvider/contexts/DraggableItemsContainerContext';

function DraggableItemsContainer({children}) {
  const {containerRef} = useContext(DraggableItemsContainerContext)

  return children(containerRef)
}

export default DraggableItemsContainer
