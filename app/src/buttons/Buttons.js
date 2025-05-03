import { useState, useContext } from 'react';
import { OpenContext } from '../App';

const Buttons = () => {


    const images = ['/images/pen.png', '/images/eraser.png'];

    const [mode, setMode] = useState(0);


    const [size, setSize] = useState(2);

    const  {open, setOpen} = useContext(OpenContext)

  return (
    <>
       <div className='flex flex-col ml-auto'>
        <ul className='flex flex-row gap-3 p-2 ml-auto'>
            {images.map((image, index) => (
            <li
                key={index}
                className={`flex justify-center items-center w-10 h-10 rounded-full z-10
                 ${mode===index?'bg-hover_col':'bg-secondary hover:opacity-80 hover:bg-slate-600'}`}
                 onClick={() => {setMode(index)}}>
                <img src={image} alt="pen" className='w-5 h-5 object-contain'
                />
            </li>
            ))}
        </ul>
        <ul className='flex flex-col pr-2 ml-auto'>
            <li className='flex flex-row' onClick={(e) => {
                e.stopPropagation();
                setOpen(true)}}>
                {open?
                    <ul className='flex flex-row gap-3'>
                       {Array(8).fill(0).map((__, index) => (
                        <li className={`flex justify-center items-center w-10 h-10 rounded-full ${size === index+1?'bg-hover_col':'bg-secondary z-10'} `}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSize(index + 1)}}>
                            <div className={`w-${index + 1} h-${index + 1} bg-white rounded-full`}></div>
                        </li>
                       ))}
                    </ul> :
                    <div className='flex justify-center items-center w-10 h-10 rounded-full bg-secondary z-10'>
                        <div className={`w-${size} h-${size} bg-white rounded-full`}>

                        </div>
                    </div>

                    }

            </li>
        </ul>
        </div>

    </>

  )
}

export default Buttons;