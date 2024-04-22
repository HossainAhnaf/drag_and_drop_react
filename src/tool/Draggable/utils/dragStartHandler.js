export default function dragStartHandler(e){
  draggingState.updateDraggingElement(draggableRef.current)
  draggingState.updateNextPrevState(draggableElementsRef.current,draggableElementsRect)
  containerRef.current.appendChild(draggingState.dummyElement)
  draggableRef.current.style.setProperty("opacity", "0")    
  document.documentElement.style.setProperty("cursor", "grabbing")
   draggableElementsRef.current.forEach(draggableElement => draggableElement.style.setProperty("user-select", "none"))
  setStartYOffset(e.clientY)
  document.onpointermove = dragMoveHandler
  // document.onpointerup = this.#dragEndHandler.bind(this)
}
