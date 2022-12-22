import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  let [data, setData] = useState({
    previousGuess: [],
    guessCount: 10,
    lowOrHigh: "",
  });
  let inputRef = useRef();
  let submitRef = useRef()
  const [randomNumber, setRandomnumber] = useState(
    Math.floor(Math.random() * 101)
  );
  console.log(randomNumber);

  let handleGuess = () => {
    let value = Number(inputRef.current.value);
    if (value == 0 || value > 100) {
      setData({ ...data, lowOrHigh: "input number within range" });
      inputRef.current.value = "";
    } else if (randomNumber == value) {
      setData({
        ...data,
        previousGuess: [...data.previousGuess, value],
        lowOrHigh: "Correct!",
      });
      inputRef.current.disabled = true
      inputRef.current.value = "";
      submitRef.current.style.display = 'none'
    } else if (randomNumber > value) {
      setData({
        ...data,
        previousGuess: [...data.previousGuess, value],
        lowOrHigh: "Number is too low try again!",
        guessCount: data.guessCount - 1,
      });
      inputRef.current.value = "";
    } else if (randomNumber < value) {
      setData({
        ...data,
        previousGuess: [...data.previousGuess, value],
        lowOrHigh: "Number is too high try again!",
        guessCount: data.guessCount - 1,
      });
      inputRef.current.value = "";
    }
    console.log(data.guessCount);
    if (data.guessCount == 0) {
      setData({
        ...data,
        lowOrHigh: "You have reached your limit!",
        guessCount: "",
      });
      inputRef.current.value = "";
      // console.log(inputRef.current.disabled);
      inputRef.current.disabled = true;
    }
  };
  let reset = () => {
    setData({ ...data, previousGuess: [], guessCount: 10, lowOrHigh: "" });
    inputRef.current.disabled = false;
    inputRef.current.value = "";
    submitRef.current.style.display = 'inline'

    setRandomnumber(Math.floor(Math.random()* 101))
  };
  return (
    <div className="App">
      <div className="main-con">
        <p className="header-con">Number guessing game</p>
        <p className="writeup-con">
          Try and guess a random number between 1 and 100, you have 10 attempts
          to guess the right number.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("working");
          }}
          className="result-con"
        >
          <h2>Guess a number</h2>
          <input ref={inputRef} type="text" placeholder="Enter Number" />
          <button ref={submitRef} onClick={handleGuess} className="submit-btn">
            Submit guess
          </button>
          <button onClick={reset} className="reset-btn">
            Reset
          </button>
          <div className="guess-con">
            {data.previousGuess.map((eachGuess) => {
              return <span>{eachGuess},</span>;
            })}
          </div>
          <p>{data.guessCount}</p>
          <p className="loworhigh">{data.lowOrHigh}</p>
        </form>
      </div>
    </div>
  );
}

export default App;
