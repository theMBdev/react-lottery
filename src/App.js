import React, { useState } from 'react';
import './App.css';

 


function SelectNumbers({}) {
  const [userNumbers, setUserNumbers] = useState([]);

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

      if(userNumbers.length >= 4){
        console.log("max numbers selected")
      } else { 
        e.target.classList.add("buttonNumber--clicked");
        const newUserNumbers = [...userNumbers, parseInt(e.target.innerHTML) ];
        setUserNumbers(newUserNumbers);
      }      
    }
    // console.log(userNumbers);
    // console.log(e.target.innerHTML);  
    // console.log("classlist", e.target.classList);
  }

  const playClicked = () => {
    console.log("clicked");

    //generate 6 random numbers
    const lotteryNumbers = []

        while (lotteryNumbers.length < 6) {
          var randomNumber = Math.floor(Math.random() * 10) + 1;

          if (lotteryNumbers.includes(randomNumber)) {
            console.log('DUP')            
          } else {
            console.log('ADD')
            lotteryNumbers.push(randomNumber);            
          }          
        }     
      console.log(lotteryNumbers)
      console.log(userNumbers)

      //compare lotteryNumbers and userNumbers
      const intersection = userNumbers.filter(element => lotteryNumbers.includes(element));
        console.log("output", intersection);


    //switch to output if 1 match, 2 match, 3...   use intersection.length


  }
  

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

    <div className="test">
    {userNumbers.map((number, index) =>
  <li key={index}>{number}</li>
)}
    </div>

    <button disabled={userNumbers.length < 4} onClick={playClicked} id="playButton" className="playButton" >Play</button>

</>
  )}






function App() {


  
  return (
    <div className="App">
      <SelectNumbers />
    </div>
  );
}

export default App;
