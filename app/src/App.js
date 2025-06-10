import './App.css';
import Buttons from './buttons/Buttons.js';
import Canvas from './canvas/canvas.js'
import { createContext, useState } from 'react';

export const OpenContext = createContext();
function App() {

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(0);
  const [size, setSize] = useState(7);
  const [drawing, setDrawing] = useState(false);

return (

    <div className="min-h-screen w-full bg-primary text-white flex"
      onClick={() => setOpen(false)}>
      <OpenContext.Provider value={{ mode, setMode, open, setOpen, size, setSize , drawing, setDrawing}}>
        <Buttons />
      </OpenContext.Provider>

      <div className=' absolute top-0 left-0'>
        <OpenContext.Provider value={{ mode, setMode, open, setOpen, size, setSize, drawing, setDrawing}} >
          <Canvas/>
        </OpenContext.Provider>
      </div>
    </div>
  );
}

export default App;
