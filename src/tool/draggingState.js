export default class DraggingState{
  constructor(){
  this.elm = null
  this.startRect = null
  this.dummyElement = null
  this._visualIndex = NaN
  }
  get visualIndex() {
    return this._visualIndex
  }
  set visualIndex(val) {
    this._visualIndex = val
    this.elm?.setAttribute("data-visual-index", val)
    this.dummyElement?.setAttribute("data-visual-index", val)
  }
  updateDummyElement(top){
    const dummyElement = this.elm?.cloneNode(true)
    const { width } = getComputedStyle(this.elm)
    dummyElement.style.removeProperty("transition")
    dummyElement.style.setProperty("width", width)
    dummyElement.style.setProperty("position", "fixed")
    dummyElement.style.setProperty("top", top + "px")
    this.dummyElement = dummyElement
  }
}
