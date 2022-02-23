import React, { useState, useEffect, useRef } from "react";

const Trivia = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState("");
  const answerEl = useRef("");

  const fadeEffect = () => {
    setTimeout(() => {
      setMessage("");
      setRefresh(!refresh);
    }, 3000);
  };

  const handleClick = () => {
    if (answerEl.current.value === "") {
      setMessage("Invalid");
    } else if (answerEl.current.value === answer) {
      setMessage("Correct");
      fadeEffect();
    } else {
      setMessage("Incorrect");
      fadeEffect();
    }
    answerEl.current.value = "";
  };

  useEffect(() => {
    fetch(`https://jservice.io/api/random`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data[0].question);
        setAnswer(data[0].answer);
      });
  }, [refresh]);

  return (
    <div className="trivia-container">
      <h1>TRIVIA GAME</h1>
      <h3>{question}</h3>
      <div>
        <input type="text" ref={answerEl} />
        <button onClick={handleClick}>Submit</button>
      </div>
      <div>
        {message === "Invalid" ? (
          <InvalidAns />
        ) : message === "Correct" ? (
          <CorrectAns answer={answer} />
        ) : message === "Incorrect" ? (
          <IncorrectAns answer={answer} />
        ) : null}
      </div>
    </div>
  );
};

export function CorrectAns(props) {
  return (
    <h3 style={{ color: "green" }}>
      Perfect !!!, {props.answer} is the Correct Answer
    </h3>
  );
}

export function IncorrectAns(props) {
  return (
    <h3 style={{ color: "red" }}>
      Wrong Answer, Correct Answer is {props.answer}
    </h3>
  );
}

export function InvalidAns() {
  return (
    <h3 style={{ color: "royalblue" }}>Please Enter the Valid Answer !!</h3>
  );
}

export default Trivia;
