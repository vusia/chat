import { auth, provider } from "../firebase/firebase.js"
import { signInWithPopup } from "firebase/auth"


export default function Auth(props) {
    const { setIsAuth } = props

    const signInWithGoogle = async () => {
       const result = await signInWithPopup(auth, provider)
       console.log(result)
       const name = result.user.displayName
            const email = result.user.email
            const profilPhoto = result.user.photoURL
            localStorage.setItem("isAuth", true)
            localStorage.setItem("name", name)
            localStorage.setItem("email", email)
            localStorage.setItem("profilPhoto", profilPhoto)
            setIsAuth(true)
    }
    return (
    <div>
        <img src="/chatty.png" className="logo" />
       <div><button onClick={signInWithGoogle}>Sign In With Google</button></div> 
    </div>
    )
}