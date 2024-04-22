import React from 'react'
import DragDropProvider from './DragDropProvider';
function DragDropContext({children}) {
  return (
     <DragDropProvider>
      {children}
    </DragDropProvider>
  )
}

export default DragDropContext
 