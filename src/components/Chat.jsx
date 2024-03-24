import { useState, useEffect} from 'react'
import { addDoc, collection, onSnapshot, serverTimestamp, where,
    query, orderBy, } from "firebase/firestore"
import { auth, db } from "../firebase/firebase.js"

const Chat = (props) => {
    const {room} = props
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    
    const messageRef = collection(db, "messages")

    useEffect(() => {
        const queryMessages = query(messageRef, where("room", "==", room), orderBy("createdAt"))
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages)
        })
        return() => unsuscribe()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (newMessage === "") return
        
        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.email,
            room,
        })
        setNewMessage()
    }

    return (
        
    <div className="chat-app">
        <div>
            <h2>Hello, {auth.currentUser.displayName}! Welcome to {room}</h2>
        </div>
        <div className="chat">
        <div>
            {messages.map((message) => (
                <div className="message" key={message.id}>
            <span className="user">{message.user}: </span>{message.text}
            </div>
            ))}
        </div>
        <form onSubmit={handleSubmit}>
            <input
            placeholder="Type your message here" 
            onChange={(e) => {setNewMessage(e.target.value), e.preventDefault()}} 
             />

            <button type="submit">Send</button>
        </form>
        </div>
    </div>
    )
}

export default Chat