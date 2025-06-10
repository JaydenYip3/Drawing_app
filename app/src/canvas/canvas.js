import {useEffect, useRef, useState, useContext} from 'react'
import { OpenContext } from '../App';

const Canvas = () => {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const historyRef = useRef([]);
    const redoRef = useRef([]);
    const {mode, setMode, size, setSize, open, setOpen, drawing, setDrawing} = useContext(OpenContext)
    const sizes = [1,3,5,10,15,25,50,100]

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke()
        setDrawing(true)
        redoRef.current = [];
    }

    const finishDrawing = () => {
        contextRef.current.closePath();
        setDrawing(false);
        const current_canvas = canvasRef.current;
        const dataURL = current_canvas.toDataURL();

        add_current_dataURL(dataURL);
   }
   const add_current_dataURL = (dataURL) => {
        if (dataURL === historyRef.current[historyRef.current.length - 1]){
            console.log("nothing happens")
        }
        else{
            historyRef.current.push(dataURL)
        }
   }

    const draw = ({nativeEvent}) => {
        if (!drawing){
            return
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke()
    }

    const undo = () => {
        console.log("Clicked");
        console.log(historyRef)
        if (historyRef.current.length === 0){
            return;
        }
        else if (historyRef.current.length === 1){
            redoRef.current.push(historyRef.current.pop());
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            return;
        }
        else {
            redoRef.current.push(historyRef.current.pop());
            const prev = historyRef.current[historyRef.current.length - 1]
            if (!prev)
                return;
            const image = new Image();
            image.onload = () => {
                const previousMode = contextRef.current.globalCompositeOperation;
                contextRef.current.globalCompositeOperation = 'source-over';
                contextRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
                contextRef.current.drawImage(image, 0, 0);
                contextRef.current.globalCompositeOperation = previousMode;
            }
            image.src =prev
        }
    }

    const redo = () => {
        console.log("redo")
        if (redoRef.current.length === 0){
            return
        }
        else{
            const prev = redoRef.current[redoRef.current.length - 1]
            historyRef.current.push(redoRef.current.pop());
            if (!prev)
                return;
            const image = new Image();
            image.onload = () => {
                const previousMode = contextRef.current.globalCompositeOperation;
                contextRef.current.globalCompositeOperation = 'source-over';
                contextRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height)
                contextRef.current.drawImage(image, 0, 0)
                contextRef.current.globalCompositeOperation = previousMode;
            }
            image.src =prev
        }
   }

    useEffect(() => {
        const canvas = canvasRef.current;
        const setCanvasSize = () => {
          const dataURL = canvasRef.current.toDataURL();
          const img = new Image();
          img.onload = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const context = canvas.getContext("2d");
                context.scale(1,1);
                context.lineCap = "round";
                context.strokeStyle = "white"
                contextRef.current.lineWidth = sizes[size - 1];
                contextRef.current = context;
                contextRef.current.drawImage(img, 0, 0);
            }
                img.src = dataURL;
        };

        const handleKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z'){
                redo();
            }
            else if ((e.metaKey || e.ctrlKey) && e.key === 'z'){
                undo();
            }
            else if((Array.from({length: 8}, (__, i) => (i + 1).toString() )).includes(e.key)){
                setSize(parseInt(e.key));
            }
            else if(e.key === 'w'){
                setMode(0);
            }
            else if (e.key === 'e'){
                setMode(1);
            }
        };

        setCanvasSize();
        window.addEventListener("keydown", handleKey);
        window.addEventListener("resize", setCanvasSize)
        const context = canvas.getContext("2d");
        context.scale(1,1);
        context.lineCap = "round";
        context.strokeStyle = "white"
        contextRef.current = context;

        return () => {
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("resize", setCanvasSize);
        }
      }, []);

    useEffect(() => {
        contextRef.current.lineWidth = sizes[size - 1];
    }, [size])

    useEffect(() => {
        if (mode === 0){
            contextRef.current.globalCompositeOperation = 'source-over';
        }
        else if(mode === 1) {
            contextRef.current.globalCompositeOperation = 'destination-out';
        }
    }, [mode])

    return (
        <>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}>

            </canvas>
        </>
    )
}

export default Canvas;