import { useState,useCallback, useEffect,useRef } from 'react'
import './index.css'
import './App.css'

function App() {
const [length,setlength]=useState(8);
const [number,setNumber]=useState(false)
const [character,setCharacter]=useState(false)
const [password,setpassword]=useState("")
const passwordRef = useRef("null")
const passwordGenerator = useCallback(()=>{
  let pass=""
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(number) str+="0123456789"
  if(character) str+="0123456789@!#$&~*^?/"

  for (let i = 1; i <=length; i++) {
    const char = Math.floor(Math.random()*str.length+1)
    pass += str.charAt(char)
   
   }
   setpassword(pass)
},[number,character,length,setpassword])
const copyto = useCallback(()=>{
  passwordRef.current?.select()
 window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{ //if re-renders and changes anything it will aplly directlt and smothlyy
   passwordGenerator()
},[length,number,character,setpassword])

  return (
    <>
    
    <div className='container'>
    <h1>Password Generator</h1>
      <div className='area'>
        <input type='text' value={password} placeholder='password' readOnly ref={passwordRef}></input> 
      <button onClick={copyto}>Copy</button> 
      </div>
      <div className='values'>
      <div className='lh'>
        <input type='range'
        min={8}
        max={100}
      
        value={length}
        onChange={(e)=>{setlength(e.target.value)}}/>
        <label>Length:{length}</label>
        
      </div>
      <div className='num'>
        <input type='checkbox'
        defaultChecked={number}
        onChange={()=>{setNumber((prev) => !prev)}}/>
        <label>Number</label>
      </div>
     

      <div className='ch'>
        <input type='checkbox'
        defaultChecked={character}
       
        onChange={()=>{
          setCharacter((prev) => !prev)
        }}/>
        <label>Character</label>
      </div>
      </div>
  </div>
   
      </>
  )
}

export default App
