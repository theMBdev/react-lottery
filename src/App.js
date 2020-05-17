import React, { useState } from 'react';
import './App.css';

function useAsyncState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const setter = x =>
    new Promise(resolve => {
      setValue(x);
      resolve(x);
    });
  return [value, setter];
}


function SelectNumbers({ }) {
  const [userNumbers, setUserNumbers] = useAsyncState([]);
  const [winningMessage, setWinningMessage] = useAsyncState('');
  const [lotteryNumbers, setLotteryNumbers] = useAsyncState([]);
  const [lotteryNumbersDisplay, setLotteryNumbersDisplay] = useAsyncState([]);

  const clickFunc = e => {
    if (e.target.classList.contains('buttonNumber--clicked')) {
      console.log("found")
      e.target.classList.remove("buttonNumber--clicked");

      // find position and remove
      const newUserNumbers = [...userNumbers];
      var index = newUserNumbers.indexOf(parseInt(e.target.innerHTML))
      console.log("index", index);
      if (index !== -1) {
        newUserNumbers.splice(index, 1);
        setUserNumbers(newUserNumbers);
      }

    } else {
      console.log("Not found")

      if (userNumbers.length >= 4) {
        console.log("max numbers selected")
      } else {
        e.target.classList.add("buttonNumber--clicked");
        const newUserNumbers = [...userNumbers, parseInt(e.target.innerHTML)];
        setUserNumbers(newUserNumbers);
      }
    }

    setLotteryNumbers([]);
    setLotteryNumbersDisplay([]);
    setWinningMessage('');
  }

  const playClicked = () => {
    console.log("clicked");

      console.log("lotteryNumbers", lotteryNumbers);

      function gen6numbers() {
        
                //generate 6 random numbers
      while (lotteryNumbers.length < 6) {
        var randomNumber = Math.floor(Math.random() * 10) + 1;

        if (lotteryNumbers.includes(randomNumber)) {

        } else {
          lotteryNumbers.push(randomNumber);
        }
      }
      console.log(lotteryNumbers.sort(sorter))
      console.log(userNumbers.sort(sorter))

      //compare lotteryNumbers and userNumbers
      const intersection = userNumbers.filter(element => lotteryNumbers.includes(element));
      console.log("output", intersection);

      //switch to output if 1 match, 2 match, 3...   use intersection.length
      switch (intersection.length) {
        case 1:
          console.log("1 Number Matched");
          setWinningMessage("1 Number Matched");
          break;
        case 2:
          console.log("2 Numbers Matched");
          setWinningMessage("2 Numbers Matched");
          break;
        case 3:
          console.log("3 Numbers Matched");
          setWinningMessage("3 Numbers Matched");
          break;
        case 4:
          console.log("4 Numbers Matched");
          setWinningMessage("4 Numbers Matched");
          break;
        case 5:
          console.log("5 Numbers Matched");
          setWinningMessage("5 Numbers Matched");
          break;
        case 6:
          console.log("6 Numbers Matched");
          setWinningMessage("6 Numbers Matched");
          break;
        default:
          console.log("0 Numbers Matched");
          setWinningMessage(" Numbers Matched");
      }

      // fixed 10 being lower than 2,3,4...
      function sorter(a, b){
        return a - b;
      }      

      // this is because setting the lotterNumbers array to empty takes it away from displaying
      // on screen to the user
      setLotteryNumbersDisplay(lotteryNumbers.sort(sorter));
      }      

      for (var i = 0; i < 4; i++) {  
        // doesnt work
        // is ment to generate a new set of numbers each loop but 
        // is not setting numbers array to empty
        setLotteryNumbers([]).then(gen6numbers());

        console.log("loop", i + " " + lotteryNumbers)
      }
    
  }

  // try this sync answer is here
  // https://sung.codes/blog/2018/12/07/setting-react-hooks-states-in-a-sync-like-manner/
  // https://codesandbox.io/s/useasyncstate-thenable-cgc9p?file=/src/index.js

// i think using the above method we could set setLotteryNumbers to empty .then run the generator. 
// loop that peice of code as many times as needed

  // bit more complex 
  // https://codesandbox.io/s/8by2s?file=/src/index.js

  return (
    <>
      <div className="numbers">
        <button className="buttonNumber" onClick={e => clickFunc(e)} >1</button>
        <button className="buttonNumber" onClick={e => clickFunc(e)} >2</button>
        <button className="buttonNumber" onClick={e => clickFunc(e)} >3</button>
        <button className="buttonNumber" onClick={e => clickFunc(e)} >4</button>
        <button className="buttonNumber" onClick={e => clickFunc(e)} >5</button>
        <button className="buttonNumber" onClick={e => clickFunc(e)} >6</button>
        <button className="buttonNumber" onClick={e => clickFunc(e)} >7</button>
        <button className="buttonNumber" onClick={e => clickFunc(e)} >8</button>
        <button className="buttonNumber" onClick={e => clickFunc(e)} >9</button>
      </div>

      <div className="numbersContainer">
        {userNumbers.map((number, index) =>
          <li className="numberBall" key={index}>{number}</li>
        )}
      </div>

      <button disabled={userNumbers.length < 4} onClick={playClicked} id="playButton" className="playButton" >Play</button>

      <div className="numbersContainer">{lotteryNumbersDisplay.map((number, index) =>
          <li className="numberBall" key={index}>{number}</li>
        )}</div>
      <div className="message">{winningMessage}</div>

    </>
  )
}


function App() {
  return (
    <div className="App">
      <SelectNumbers />
    </div>
  );
}

export default App;
