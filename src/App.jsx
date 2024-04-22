import { useEffect, useRef } from 'react'
import './App.css'
import Card from './Card'
//tool
import useDragAndDrop from './tool/index'
function App() {
  const ref = useRef()
  const {dragAndDropContainerRef} = useDragAndDrop()
 
  useEffect(() => {

      
  },[])
  return (
    <div className='app' ref={dragAndDropContainerRef}>
      <Card className="draggable"/>
      <Card className="draggable"/>
      <Card className="draggable"/>
      <Card className="draggable"/>
      <Card className="draggable"/>
      <Card className="draggable"/>
      <Card className="draggable"/>
      <Card className="draggable"/>

    </div>
  )
}

export default App
