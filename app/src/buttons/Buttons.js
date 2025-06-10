import { useState, useContext } from 'react';
import { OpenContext } from '../App';

const Buttons = () => {

    const images = ['/images/pen.png', '/images/eraser.png'];
    const {mode, setMode, size, setSize, open, setOpen, drawing, setDrawing} = useContext(OpenContext)
    const sizeClasses = ['w-1 h-1', 'w-2 h-2', 'w-3 h-3', 'w-4 h-4', 'w-5 h-5', 'w-6 h-6', 'w-7 h-7', 'w-8 h-8'];
    const sizeConverter = {'w-1 h-1': 'w-1 h-1', 'w-2 h-2': 'w-2 h-2', 'w-3 h-3': 'w-4 h-4', 'w-4 h-4': 'w-6 h-6', 'w-5 h-5': 'w-8 h-8', 'w-6 h-6': 'w-[3rem] h-[3rem]', 'w-7 h-7': 'w-[4rem] h-[4rem]', 'w-8 h-8': 'w-[6rem] h-[6rem]'}

  return (
    <>
       <div className='flex flex-col ml-auto'>
            <ul className='flex flex-row gap-3 p-2 ml-auto'>
                {images.map((image, index) => (
                <li
                    key={index}
                    className={`flex justify-center items-center w-10 h-10 rounded-full z-10 select-none
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
                    setDrawing(false)
                    setOpen(true)}}>
                    {open?
                        <ul className='flex flex-row gap-3'>
                        {Array(8).fill(0).map((__, index) => (
                            <li className={`flex justify-center items-center w-10 h-10 rounded-full ${size === index+1?'bg-hover_col':'bg-secondary z-10'} `}
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSize(index + 1)}}>
                                <div className={`${sizeClasses[index]} bg-white rounded-full`}></div>
                            </li>
                        ))}
                        </ul> :
                        <div className='flex justify-center items-center w-10 h-10 rounded-full bg-secondary z-10'>
                            <div className={`${sizeClasses[size - 1]} bg-white rounded-full`}>
                            </div>
                        </div>
                    }
                </li>
            </ul>
            <div className='flex-1'></div>
            <ul className='flex flex-col p-2 ml-auto'>
                <li className='flex justify-center items-center w-10 h-10 rounded-full z-10 select-none bg-secondary hover:opacity-80 hover:rotate-180 transition-transform duration-100'
                    onClick={() => {
                        return (
                            <>
                                <div className='absolute top-0 left-0'>
                                    Hello
                                </div>
                            </>
                        )
                    }}>
                    <img src="/images/setting.png" alt="setting icon" className='w-5 h-5 object-contain'/>
                </li>
            </ul>
        </div>
    </>
  )
}

export default Buttons;