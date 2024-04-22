export default class DraggingState{
  constructor(){
  this.elm = null
  this.dummyElement = null
  this.startRect = null
  this.startYOffset = undefined
  this.minYOffset = undefined
  this.maxYOffset = undefined
  this._visualIndex = undefined
  this.prevState = {}
  this.nextState = {}

  }
  get visualIndex() {
    return this._visualIndex
  }
  set visualIndex(val) {
    this._visualIndex = val
    this.elm?.setAttribute("data-visual-index", val)
    this.dummyElement?.setAttribute("data-visual-index", val)
  }
  updateDraggingElement(element){
   this.elm = element
   this.startRect = element.getBoundingClientRect()
   this.updateDummyElement(this.startRect.top)
   this.visualIndex = parseInt(element.getAttribute("data-visual-index"))
   this.dummyElement.setAttribute("data-dragging", "true");
  }
  updateDummyElement(top){
    const dummyElement = this.elm?.cloneNode(true)
    const { width } = getComputedStyle(this.elm)
    dummyElement.style.removeProperty("transition")
    dummyElement.style.setProperty("width", width)
    dummyElement.style.setProperty("position", "fixed")
    dummyElement.style.setProperty("top", this.startRect.top + "px")
    dummyElement.style.setProperty("cursor", "grabbing")
    this.dummyElement = dummyElement
  }
  updateNextPrevState(draggableElements, draggableElementsRect) {
    this.prevState = {}
    this.nextState = {}
    for (const elm of draggableElements) {
      if (this.nextElement && this.prevElement)
        break;
      const visualIndex = parseInt(elm.getAttribute("data-visual-index"))
      if (visualIndex === this.visualIndex - 1) {
        this.prevState.elm = elm
        this.prevState.rect = draggableElementsRect[visualIndex]
      }
      else if (visualIndex === this.visualIndex + 1) {
        this.nextState.elm = elm
        this.nextState.rect = draggableElementsRect[visualIndex]
      }
    }
  }
  updateMinMaxYOffset(container) {
    const { top, bottom } = container.getBoundingClientRect();
    this.maxYOffset = top;
    this.minYOffset = bottom;
  }
}
