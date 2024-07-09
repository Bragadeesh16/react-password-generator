import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {

  const [length , setlength] = useState(8)
  const [numallowed, setnumallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password,setpassowrd] = useState('')

  const passwordref = useRef(null)

  const generatepassword = useCallback(()=>{
    let pass = ''
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numallowed) string +='1234567890'
    if (charallowed) string +='!@#$%^&*()_+'

    for (let i = 1; i < length ; i++){
      let char = Math.floor(Math.random() * string.length + 1)
      pass += string.charAt(char)
    }

    setpassowrd(pass)

  } , [length,numallowed,charallowed])

  useEffect(()=>{
    generatepassword()
  },[length,numallowed,charallowed])

  const copypassword = () =>{
    window.navigator.clipboard.writeText(password)
    passwordref.current.select()
  }

  return (
    <div className='main-div'>
      <div>
        <input type="text" value={password} readOnly ref={passwordref} />
        <button onClick={copypassword}> copy </button>
      </div>

      <div>
        <input 
        type="range" 
        name="" 
        min={8}
        max={20}
        value={length}
        onChange={(e) => setlength(e.target.value)}
        id="" />

        <label htmlFor="">{length}</label>
      </div>

      <div>
        <input type="checkbox" 
        name="" 
        id=""
        defaultChecked = {numallowed}
        onChange={() => {
          setnumallowed((prev) => !prev)
        }}
         />
        <label htmlFor="number">number</label>
      </div>

      <div>
        <input type="checkbox" 
        name="" 
        id=""
        defaultChecked = {charallowed}
        onChange={() => setcharallowed((prev)=> !prev )}
         />
        <label htmlFor="char">characeter</label>
      </div>

    </div>
  )
}

export default App
