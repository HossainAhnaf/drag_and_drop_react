import { useState, useEffect, useRef, useCallback } from 'react'
//helper
import DraggingState from './draggingState'

function initDragDrop(draggableElements, setDraggableElementRects) {
  // window.addEventListener('load',this.#updateMinMaxYOffset.bind(this))
  //     window.addEventListener('resize',()=>{
  //       this.#updateMinMaxYOffset.bind(this)()
  //       this.#updateRects.bind(this)()
  //     })

}




export default function useDragAndDrop() {

  const draggingState = new DraggingState()
  const listContainerRef = useRef(null)
  const [nextState, setNextState] = useState({})
  const [prevState, setPrevState] = useState({})
  const draggableElementsRef = useRef([])
  const [draggableElementRects, setDraggableElementRects] = useState([])
  const [startYOffset, setStartYOffset] = useState(0)

  const updateNextPrevState = useCallback(()=> {
    setPrevState({})
    setNextState({})
    for (const elm of draggableElementsRef.current) {
      if (nextState.elm && prevState.elm)
        break;
      const visualIndex = parseInt(elm.getAttribute("data-visual-index"))
      if (visualIndex === draggingState.visualIndex - 1) {
       setPrevState({
        elm:elm,
        rect:draggableElementRects[visualIndex]
      })
      }
      else if (visualIndex === draggingState.visualIndex + 1) {
        setNextState({
          elm:elm,
          rect:draggableElementRects[visualIndex]
        })
      }
    }
  },[draggableElementsRef,prevState,nextState])

const dragMoveHandler = useCallback((e) =>{
  console.clear()
    
  },[draggableElementsRef.current,prevState,nextState])
   // const draggingDummyElmRect = this.draggingState.dummyElement.getBoundingClientRect()
    // const currentTranslateY = Math.min(this.minYOffset, Math.max(e.clientY, this.maxYOffset)) - this.startYOffset
    // draggingState.dummyElement.style.setProperty("transform", `translateY(${(currentTranslateY)}px)`)
    // const isPrevElementDraggedOver = (prevState.rect && draggingDummyElmRect.top <= prevState.rect.top + prevState.rect.height / 2)
    // const isNextElementDraggedOver = (nextState.rect && draggingDummyElmRect.top >= nextState.rect.top - nextState.rect.height / 2)

    // if (isPrevElementDraggedOver || isNextElementDraggedOver)
    // return null
      // this.#changeDraggingElementVisualIndex(isPrevElementDraggedOver ? this.prevState : this.nextState)
  const dragStartHandler = useCallback(({ currentTarget, clientY }) => {
    draggingState.elm = currentTarget
    draggingState.startRect = currentTarget.getBoundingClientRect()
    draggingState.updateDummyElement()
    draggingState.visualIndex = parseInt(currentTarget.getAttribute("data-visual-index"))
    draggingState.dummyElement.setAttribute("data-dragging", "true");
    currentTarget.style.setProperty("opacity", "0")
    draggingState.dummyElement.style.setProperty("cursor", "grabbing")
    document.documentElement.style.setProperty("cursor", "grabbing")
    listContainerRef.current.appendChild(draggingState.dummyElement)
    draggableElementsRef.current.forEach((item) => {
      item.style.setProperty("user-select", "none")
    })
    updateNextPrevState()
    setStartYOffset(clientY)

    document.onpointermove = dragMoveHandler.bind(this)
    // document.onpointerup = this.#dragEndHandler.bind(this)
  }, [draggableElementsRef])

  useEffect(() => {
    if (listContainerRef.current) {
      const draggableElements = Array.from(listContainerRef.current.querySelectorAll('.draggable'))
      const rectArray = []
      draggableElements.forEach((item, index) => {
        item.style.setProperty("transition", "transform 0.3s")
        item.style.setProperty("touch-action", "none")
        item.setAttribute("data-visual-index", index);

        item.addEventListener("pointerdown", dragStartHandler)
        rectArray.push(item.getBoundingClientRect())
      })
      draggableElementsRef.current = draggableElements
      setDraggableElementRects(rectArray)
    }
  }, [listContainerRef])


  return {
    dragAndDropContainerRef: listContainerRef
  }
}

// export default class useDragAndDrop {
//   constructor(element) {
//     this.listContainer = element;
//     this.draggableElements = Array.from(this.listContainer.querySelectorAll('.draggable'))
//     this.draggingState = new DraggingState()
//     this.nextState = {}
//     this.prevState = {}
//     this.draggableElementRects = []
//     this.init()
//   }

//   init() {
//     window.addEventListener('load',this.#updateMinMaxYOffset.bind(this))
//     window.addEventListener('resize',()=>{
//       this.#updateMinMaxYOffset.bind(this)()
//       this.#updateRects.bind(this)()
//     })

//     this.draggableElements.forEach((item, index) => {
//       item.style.setProperty("transition", "transform 0.3s")
//       item.style.setProperty("touch-action", "none")

//       item.setAttribute("data-visual-index", index);
//       item.addEventListener("pointerdown", this.#dragStartHandler.bind(this))
//       this.draggableElementRects.push(item.getBoundingClientRect())
//     })
//   }
//   #updateMinMaxYOffset() {
//     const { top, bottom } = this.listContainer.getBoundingClientRect();
//     this.maxYOffset = top;
//     this.minYOffset = bottom;
//   }
//   #updateRects() {
//     this.draggableElements.forEach((item, index) => {
//       this.draggableElementRects[index] = item.getBoundingClientRect();
//     })
//   }




//   #changeDraggingElementVisualIndex({ elm: dragOverElement, rect: dragOverElmRect }) {
//     const oldTransformValue = /\d+/.exec(dragOverElement.style.getPropertyValue("transform"))
//     const oldTranslateY = (oldTransformValue ? parseInt(oldTransformValue[0]) : 0)
//     const dragOverElementVisualIndex = parseInt(dragOverElement.getAttribute("data-visual-index"))
//     dragOverElement.style.setProperty("transform", `translateY(${this.draggingState.startRect.top - dragOverElmRect.top - (this.draggingState.visualIndex - dragOverElementVisualIndex === 1 ? oldTranslateY : -oldTranslateY)}px)`)
//     dragOverElement.setAttribute("data-visual-index", this.draggingState.visualIndex)
//     this.draggingState.visualIndex = dragOverElementVisualIndex
//     this.draggingState.startRect = dragOverElmRect
//     this.#updateNextPrevState()
//   }

//   #dragEndHandler() {
//     this.draggingState.elm.style.removeProperty("opacity")
//     this.draggingState.elm = null;
//     document.documentElement.style.removeProperty("cursor")
//     this.listContainer.removeChild(this.draggingState.dummyElement)
//     document.onpointermove = null;
//     document.onpointerup = null;
//     this.#updateSerialOfListContainerChilds();
//   }

//   #updateSerialOfListContainerChilds() {
//     Array.from(this.listContainer.children).forEach((elm) => elm.classList.contains("draggable") && this.listContainer.removeChild(elm))
//     this.draggableElements.sort((a, b) => a.getAttribute("data-visual-index") - b.getAttribute("data-visual-index"))
//     for (const elm of this.draggableElements) {
//       elm.style.removeProperty("user-select")
//       elm.style.removeProperty("transform")
//       this.listContainer.appendChild(elm);
//     }
//   }
// }

