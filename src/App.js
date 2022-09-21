import React, { useState, useEffect } from 'react'
import Play from 'containers/Play';

const App = () => {
  // stop, start
  const [status, setStatus] = useState("stop");

  const handlePlay = () => {
    setStatus("start")
  }

  const handleEscape = () => {
    setStatus("stop")
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && status === "stop") {
      handlePlay()
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });



  return (
    <div className="App">
      {
        status === "start" ? <>
          <Play onEsc={handleEscape} />
        </> : <>
          <div>
            <button onClick={handlePlay} className="btn">Play</button>
          </div>
          <div className="hint">
            <span>
              Nhấn phím Enter
            </span>
          </div>
        </>
      }
      
    </div>
  );
}

export default App;
