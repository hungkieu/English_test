import React, { useState, useEffect } from "react";

const Question = ({ english, translate, next, onEsc }) => {
  const [finished, setFinished] = useState(false);

  const handleKeyDown = (e) => {
    if (e.ctrlKey) {
      if (e.keyCode === 13) {
        finished ? handleNext() : handleSubmit();
      }
    }

    if (e.keyCode === 27) {
      onEsc();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleNext = () => {
    setFinished(false);
    next();
  };

  const handleSubmit = () => {
    setFinished(true);
  };

  return (
    <>
      <div className="Question">
        <h2>{english}</h2>
        <b
          style={{
            color: "#32CD32",
            opacity: finished ? "1" : "0",
          }}
        >
          {translate}
        </b>
        <div>
          <textarea autoFocus tabIndex={1}></textarea>
        </div>

        <div>
          {finished ? (
            <button className="btn" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="btn" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>

        <div className="hint">
          <span>Ctrl + Enter</span>
          <br />
          <span>Esc để tạm dừng</span>
        </div>
      </div>
    </>
  );
};

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/questions.json"
    : "https://hungkieu.github.io/english_test/questions.json";

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Play = ({ onEsc }) => {
  const [questions, setQuestions] = useState([]);
  const [main, setMain] = useState({});

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setMain(randomElement(data));
      });
  }, []);

  const next = () => {
    setMain(randomElement(questions));
  };

  return (
    <div className="Play">
      <Question {...main} next={next} onEsc={onEsc} />
    </div>
  );
};

export default Play;
