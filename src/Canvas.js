import React from "react";
import { saveAs } from "file-saver";
import Picker from "./Picker";

const Canvas = (props) => {
  const canvasRef = React.useRef(null);
  const contextRef = React.useRef(null);
  const [color, setColor] = React.useState("#ff1354ff");
  const [size, setSize] = React.useState(8);
  const [drawing, setDrawing] = React.useState(false);
  const [showAside, setShowAside] = React.useState(true);
  const [showPicker, setShowPicker] = React.useState(false);
  const width = window.innerWidth * 2;
  const height = window.innerHeight * 2;
  const [undoList, setUndoList] = React.useState([]);
  const [redoList, setRedoList] = React.useState([]);
  let [previousColor, setPreviousColor] = React.useState("#ff1354ff");
  React.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    contextRef.current = context;
  }, [height, width]);

  React.useEffect(() => {
    contextRef.current.strokeStyle = color;
  }, [color]);

  React.useEffect(() => {
    contextRef.current.lineWidth = size;
  }, [size]);

  const start = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
    draw({ nativeEvent }, true);
    setShowPicker(false);
    setRedoList([]);
  };
  const end = ({ nativeEvent }) => {
    setDrawing(false);
    save();
  };

  const draw = ({ nativeEvent }, override = false) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    if (!drawing && !override) {
      return;
    }
    if (nativeEvent.type === "touchmove") {
      let touch = nativeEvent.targetTouches[0];
      contextRef.current.lineTo(touch.clientX, touch.clientY);
      contextRef.current.stroke();
      return;
    }
    const { clientX, clientY } = nativeEvent;
    contextRef.current.lineTo(clientX, clientY);
    contextRef.current.stroke();
  };

  const clear = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    save();
  };

  const changeColor = (c) => {
    setPreviousColor(color);
    setColor(c.hex);
  };
  const save = () => {
    setUndoList([
      contextRef.current.getImageData(0, 0, width, height),
      ...undoList
    ]);
  };
  const undo = () => {
    if (undoList.length < 1) return;
    clear();
    undoList.length > 1 && contextRef.current.putImageData(undoList[1], 0, 0);
    const copy = undoList;
    const step = undoList.shift();
    setRedoList([step, ...redoList]);
    setUndoList(copy);
  };
  const redo = () => {
    if (redoList.length < 1) return;
    contextRef.current.putImageData(redoList[0], 0, 0);
    const copy = redoList;
    const step = redoList.shift();
    setUndoList([step, ...undoList]);
    setRedoList(copy);
  };
  const saveFile = () => {
    canvasRef.current.toBlob((blob) => {
      saveAs(blob, `rassam-${Date.now()}.png`);
    });
  };
  return (
    <div>
      <input
        type="file"
        id="upload"
        style={{ opacity: 0, position: "absolute", top: "100px" }}
      />
      <canvas
        onMouseDown={start}
        onMouseUp={end}
        onMouseMove={draw}
        onTouchStartCapture={start}
        onTouchEnd={end}
        onTouchMove={draw}
        ref={canvasRef}
        id="canvas"
      />
      <aside id="aside">
        {showAside ? (
          <>
            <button className="button" onClick={() => setShowAside(false)}>
              <i className="fas fa-caret-up" />
            </button>
            <div id="glass" className="glassy">
              <button
                className="button"
                // eslint-disable-next-line no-restricted-globals
                onClick={() => confirm("Save?") && saveFile()}
              >
                <i className="fas fa-save" />
              </button>
              <button className="button" onClick={clear}>
                <i className="fas fa-trash" />
              </button>
              <button className="button" onClick={undo}>
                <i
                  className={`fas fa-undo ${undoList.length < 1 && "inactive"}`}
                />
              </button>
              <button className="button" onClick={redo}>
                <i
                  className={`fas fa-redo ${redoList.length < 1 && "inactive"}`}
                />
              </button>
              <button className="button" onClick={() => setColor("#ffffff")}>
                <i
                  className={`fas fa-eraser ${color === "#ffffff" && "active"}`}
                />
              </button>
              <button
                className="button"
                onClick={() => color === "#ffffff" && setColor(previousColor)}
              >
                <i
                  className={`fas fa-paint-brush ${
                    !(color === "#ffffff") && "active"
                  }`}
                />
              </button>
              <button
                className="button"
                onClick={() => (size < 20 ? setSize(size + 5) : setSize(8))}
              >
                <div id="size" style={{ width: size, height: size }} />
              </button>
              <button
                className="button"
                onClick={() => setShowPicker(!showPicker)}
              >
                <div id="color" style={{ background: color }} />
              </button>
            </div>
            {showPicker && (
              <div id="picker">
                <Picker
                  style={{ input: { borderRadius: "1rem" } }}
                  color={color}
                  onChange={changeColor}
                  close={() => setShowPicker(false)}
                />
              </div>
            )}
          </>
        ) : (
          <button className="button wide" onClick={() => setShowAside(true)}>
            <i className="fas fa-caret-down" />
          </button>
        )}
      </aside>
    </div>
  );
};

export default Canvas;
