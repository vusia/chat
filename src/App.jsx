import { useState, useRef } from 'react'
import './App.css'
import Auth from "./components/Auth.jsx"
import Chat from "./components/Chat.jsx"
import { signOut } from "firebase/auth"
import { auth } from "./firebase/firebase.js"

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    localStorage.clear()
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) { return (
    <div>
      <Auth setIsAuth={setIsAuth}/>
    </div>
  )
  }

  return (
    
    <div>
       <img src="/chatty.png" className="logo logo-spin" />
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
         <p>Hello! Welcome to Chatty</p>
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
          </div>
      )}
      <button onClick={signUserOut}>Sign Out</button>
    </div>
  )
      
}

export default App
