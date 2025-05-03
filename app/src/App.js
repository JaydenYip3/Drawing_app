import './App.css';
import Buttons from './buttons/Buttons.js';
import { createContext, useState } from 'react';


export const OpenContext = createContext();

function App() {

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-primary text-white flex"
      onClick={() => setOpen(false)}>
      <OpenContext.Provider value={{ open, setOpen }}>
        <Buttons />
      </OpenContext.Provider>



      <div className=' absolute top-0 left-0'>

      </div>
    </div>
  );
}


export default App;
