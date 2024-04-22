import { useEffect, useRef } from 'react'
import './App.css'
import Card from './Card'
//tool
import { Draggable, DraggableItemsContainer } from './tool/index'
function App() {
  const ref = useRef()
  // const {dragAndDropContainerRef} = useDragAndDrop()

  useEffect(() => {


  }, [])
  return (

    <DraggableItemsContainer containerRef={ref}>
      {
        (containerRef) => (
          <div className='app' ref={containerRef}>
            <Draggable>
              {
                (draggableRef) => (
                  <Card className="draggable" ref={draggableRef}/>
                )
              }
            </Draggable>
            
          </div>
        )
      }

    </DraggableItemsContainer>
  )
}

export default App
