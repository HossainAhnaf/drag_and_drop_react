import React, { useContext, useEffect, useRef, useState } from 'react'
import DraggableContext from '../DragDropProvider/contexts/DraggableContext';
//utils
import init from './utils/initDraggableElement'
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

  useEffect(init,[draggableRef])
  return children(draggableRef)
  
}

export default Draggable
