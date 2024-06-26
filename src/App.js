import React, { useState, useEffect } from 'react';
import Button from './components/Button'
import Input from './components/Input'
import Darkmode from './components/Darkmode'
import * as math from 'mathjs';

function App() {

  const [val, setVal] = useState(0);

  let status__number = false;
  let last_char = val[val.length - 1];
  try { if (val.toString().includes('=')) status__number = true } catch (err) { }

  if (last_char === '/' || last_char === '*' || last_char === '-' || last_char === '+' || last_char === '=') {
    last_char = true;

  } else {
    last_char = false;
  }
  
  
  function ButtonClk(e) {
    return (
      val === 0 ? setVal(e.target.innerText) : status__number ? setVal(val.toString().replace(val.slice(val.indexOf('='),), "" + e.target.innerText)) : setVal(val + "" + e.target.innerText)
    )
  }
  function Operation(e) {
    return (
      !last_char ? !status__number ? setVal(val + "" + e.target.innerText) : setVal(val.toString().replace(val.slice(val.indexOf('='),), "" + e.target.innerText)) : setVal(val.slice(0, -1) + e.target.innerText)
    )
  }
  let result;
  let status = false;

  function Enter(e) {
    try {
      if (val.length) {
        result = math.evaluate(val);
        status = true;
      }
    } catch (ex) { }
    return (
      status ? !last_char ? setVal(val + "" + e.target.innerText + result) : setVal(0) : setVal(0)
    )
  }
  
 
  function Clear() {
    setVal(0)
  }

  function BackCR() {
    if (val.length > 1) 
    { 
      setVal(val.slice(0, -1)) 
    }
    else 
    {
      setVal(0)
    }
    
  }

  useEffect(() => {
    document.getElementById("display").focus();
  });  
  
  return (
    <>

      <div className="minHe">
        < div className="Calculator" >
          <Darkmode />
          <div className="padd__box"><Input value={val} /></div>
          <div className="Operations">

            <div className="parent">
              <Button onClick={BackCR} cls="cls">←</Button>

              <Button cls="buttons__si" onClick={Operation}>/</Button>
              <Button cls="buttons__si" onClick={Operation}>*</Button>
            </div>


            <div className="parent">
              <Button onClick={ButtonClk}>1</Button>
              <Button onClick={ButtonClk}>2</Button>
              <Button onClick={ButtonClk}>3</Button>
              <Button cls="buttons__si" onClick={Operation}>-</Button>
            </div >


            <div className="parent">
              <Button onClick={ButtonClk}>4</Button>
              <Button onClick={ButtonClk}>5</Button>
              <Button onClick={ButtonClk}>6</Button>
              <Button cls="buttons__si" onClick={Operation}>+</Button>
            </div >

            <div className="parent">
              <Button onClick={ButtonClk}>7</Button>
              <Button onClick={ButtonClk}>8</Button>
              <Button onClick={ButtonClk}>9</Button>
              <Button onClick={Enter} cls="buttons__si equals">=</Button>
            </div>
            <div className="parent last__pa">
              <Button onClick={Clear} cls="cls">C</Button>
              <Button onClick={ButtonClk} cls="dot" >0</Button>
              <Button onClick={ButtonClk}>.</Button>
              <Button cls='noneBtn'>=</Button>

            </div>
          </div>
        </div >
      </div >
    </>
  );
}

export default App;
