import React, { useContext, useEffect, useRef, useState } from 'react'
import DraggableContext from '../DragDropProvider/contexts/DraggableContext';
//utils
import useInitDraggableElement from './utils/useInitDraggableElement';

function Draggable({children}) {
  const draggableRef = useRef(null)
  const [startYOffset, setStartYOffset] = useState(0)
  useInitDraggableElement(draggableRef)
  return children(draggableRef)
}

export default Draggable
