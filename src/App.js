import React, { useState } from 'react';
import './App.css';

function SelectNumbers({ }) {
  const [userNumbers, setUserNumbers] = useState([]);
  const [winningMessage, setWinningMessage] = useState('');
  const [lotteryNumbers, setLotteryNumbers] = useState([]);
  const [lotteryNumbersDisplay, setLotteryNumbersDisplay] = useState([]);
  const [lotteryNumbersMatch, setlotteryNumbersMatch] = useState([]);

  const clickFunc = e => {
    if (e.target.classList.contains('buttonNumber--clicked')) {
      // console.log("found")
      e.target.classList.remove("buttonNumber--clicked");

      // find position and remove
      const newUserNumbers = [...userNumbers];
      var index = newUserNumbers.indexOf(parseInt(e.target.innerHTML))
      // console.log("index", index);
      if (index !== -1) {
        newUserNumbers.splice(index, 1);
        setUserNumbers(newUserNumbers);
      }

    } else {
      // console.log("Not found")

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
      while (lotteryNumbers.length < 4) {
        var randomNumber = Math.floor(Math.random() * 9) + 1;

        if (lotteryNumbers.includes(randomNumber)) {

        } else {
          lotteryNumbers.push(randomNumber);
        }
      }
      console.log(lotteryNumbers.sort(sorter))
      console.log(userNumbers.sort(sorter))

      //compare lotteryNumbers and userNumbers
      const intersection = userNumbers.filter(element => 
        lotteryNumbers.includes(element));
       
      console.log("output", intersection);
      setlotteryNumbersMatch(intersection);

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
        default:
          console.log("0 Numbers Matched");
          setWinningMessage("0 Numbers Matched");
      }

      // fixed 10 being lower than 2,3,4...
      function sorter(a, b){
        return a - b;
      }      

      // this is because setting the lotterNumbers array to empty takes it away from displaying
      // on screen to the user
      setLotteryNumbersDisplay(lotteryNumbers.sort(sorter));
      } 

      setLotteryNumbers([]);
      gen6numbers();
    
  }

  return (
    <>
    
    <h3>Mini Lottery</h3>
    <p className="text">Select 4 numbers</p>
    <p className="text">When you press play the computer will randomly select 4 numbers from 1 to 9.</p>

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

      {/* if(lotteryNumbersMatch.includes(number)) {
        console.log("testing number found");
      }  */}

      <div className="numbersContainer">
      {lotteryNumbersDisplay.map((number, index) => 
        
        <li className={lotteryNumbersMatch.includes(number) ? 'numberBall--match' : "numberBall"} key={index}>{number}</li>   

        )
        
      }        
      </div>

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
