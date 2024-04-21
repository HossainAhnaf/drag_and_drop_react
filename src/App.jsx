import { useEffect, useRef } from 'react'
import './App.css'
import Card from './Card'
//tool
import useDragAndDrop from './tool/index'
function App() {
  const ref = useRef()
  const {initDragDrop} = useDragAndDrop()
 
  useEffect(() => {
    if (ref.current){
      initDragDrop(ref.current)
    }
      
  },[])
  return (
    <div className='app' ref={ref}>
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
