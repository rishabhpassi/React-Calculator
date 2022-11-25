import '../styles/App.css';
import {useState} from 'react';

function App() {

  const[calc,setCalc] = useState("");
  const[result,setResult] = useState("");
  const[memory,setMemory] = useState("");
  const ops = ['/','*','+','-'];
  const updateCalc = value =>{
    if(
      // eslint-disable-next-line no-mixed-operators
      ops.includes(value) && calc === ''  || ops.includes(value) && ops.includes(calc.slice(-1))){
        return;
      }
      if(value === '.' && calc.slice(-1) === '.'){
        return;
      }
      function countOccurrences(string, substring) {
        var n = 0;
        var position = 0;
        while (true) {
          position = string.indexOf(substring, position);
          if (position !== -1) {
            n++;
            position += substring.length;
          } else {
            break;
          }
        }
        return n;
      }
      console.log(countOccurrences(`${calc}`, ".")); 
      if((countOccurrences(`${calc}`, ".")) > 1){
        const value = calc.slice(0,-1);
        setCalc(value);
        
        
        return;
      }
      
      
   
    
    setCalc(calc + value);
    if(!ops.includes(value)){
      // eslint-disable-next-line no-eval
      setResult(eval(calc + value).toString())
    }
  }
  

  const createDigits = () =>{
    const digits = [];
    for(let i = 1; i< 10; i++){
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
      )
    }
    return digits;
  }
  const calculate = () => {
    // eslint-disable-next-line no-eval
    setCalc(eval(calc).toString());
  }
  const deleteLast = () => {
    if(calc === ''){
      return;
    }else{
      const value = calc.slice(0,-1);
      setCalc(value);
    }
  }
  const deleteAll = () => {
     if(calc === ''){
    return;
    }else{
      const value = calc.slice(1,1);
      setCalc(value);
    } 
  }
  const memorySave = () =>  {
    if(ops.includes(calc)){
      setMemory(result);

    }else{
  
      setMemory(calc);
    }

  }
  const memoryClear = () => {
    setMemory ("");
    
  }
  const memoryRead = () =>{
    if(memory === ""){
     
      return;

    }else{
    
      const lastDigit = calc.slice(-1);
      if(ops.indexOf(lastDigit) === -1){
        setCalc(memory);
        
      }else{
        setCalc(`${calc}${memory}`);

      }
    } 
    
    
  
  }
  const memoryAdd = () => {
    if(memory === ""){
      return;

    }else{
      setCalc(parseInt(calc) + parseInt(memory));
      setMemory(parseInt(calc) + parseInt(memory));
    } 

  } 
  const memorySubstract = () => {
    if(memory === ""){
      return;

    }else{
      setCalc(parseInt(calc) - parseInt(memory));
      setMemory(parseInt(calc) - parseInt(memory));
    } 



  }
  const symbol = () => {
    if(result.includes('')){

    
      setCalc(-`${calc}`);
      
      
    }
    

  }
  const percent = () =>{
    
    const percentage = result/100;
    const lastDigit = calc.slice();
    console.log(lastDigit);
    console.log(ops.indexOf(lastDigit));
   
    
    if((ops.includes(lastDigit)) === false){
      
      setCalc(percentage);
      setResult(percentage);
    }else{
      setCalc(result*100);
    }
  }
  const squareRoot = () => {
    const answer = Math.sqrt(result);
    setCalc(answer.toFixed(2));
    setResult(parseInt(calc));
    console.log(parseInt(calc));
   
    
    
  }
  
  return (
    
    <div className="App">
      <h1>React Calculator</h1>
      <div className='calculator'>
        <div className='display'>
          {/* {result ? <span>{result}</span>: ""}&nbsp; */}
          {calc || "0"}
        </div>
       
        <div className='memory'>
          <button onClick={memorySave}>MS</button>
          <button onClick={ memoryClear}>MC</button>
          <button onClick={memoryRead}>MR</button>
          <button onClick={memoryAdd}>M+</button>
          <button onClick={memorySubstract}>M-</button>
          <button className='symbol' onClick={symbol}>+/-</button>

        </div>
        
        <div className='operators'>
          

          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={percent}>%</button>
          <button onClick={squareRoot}>√ </button>
          
          <button className='abtn' onClick={deleteAll}>AC</button>
          <button className='cbtn' onClick={deleteLast}>C</button>
        </div>

        <div className='digits'>
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          
          <button className='eq' onClick={calculate}>=</button>


        </div>

      </div>
    </div>
  );
}

export default App;
