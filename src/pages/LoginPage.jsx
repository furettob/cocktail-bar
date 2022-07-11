import React, { useContext, useState } from "react"
import {auth} from "../utils/firebase"
import { useHistory, useLocation } from "react-router-dom";
import Row from "../components/Row"
import { addUserWithId, addStudent } from "../utils/api"
import { AuthContext } from "../context/AuthContext"

const LoginPage = () => {

  let history = useHistory();
  let location = useLocation();

  const { user } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = (e, func) => {
    func(e.target.value)
  }

  const redirect = (customLocation) => {
    if (location?.state?.redirectTo) {
      history.push(location.state.redirectTo)
    } else {
      history.push(customLocation || "/")
    }
  }

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email || "undistratto@gmail.com", password || "wwwwww")
      redirect("/favourites")
    } catch (e) {
      console.error("ERRORE DI AUTENTICAZIONE AL LOGIN::: ", e)
    }
  }

  const handleSignup = async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      if (res?.user?.uid) {
        const uid = res?.user?.uid
        console.log("createUserWithEmailAndPassword -----> ", uid)
        addUserWithId(res?.user, {uid, email, username:"test"})
      }
      redirect("/favourites")
    } catch (e) {
      console.error("ERRORE DI AUTENTICAZIONE AL SIGNUP::: ", e)
    }
  }

  const handlePostSignup = async () => {
    try {
      console.log("USER IS: ", user.uid, email)
      if (user?.uid) {
        const uid = user?.uid
        addUserWithId(user, {uid, email:"stefano.spensieri@test.te", username:"test"})
      }
    } catch (e) {
      console.error("ERRORE DI AUTENTICAZIONE AL SIGNUP::: ", e)
    }
  }

  // TODO: move the form in a specific component with state to avoid re-render of th ewhole page

  return (
    <div>
      {location?.state?.testo && (<Row intro={"Warning:"}>
        {location.state.testo}
      </Row>)}
      <div>
        <input placeholder={"Email..."} value={email} name={"email"}
               onChange={e => handleChange(e, setEmail)}/>
        <input placeholder={"Password"} value={password} name={"password"}
               type={"password"}
               onChange={e => handleChange(e, setPassword)}/>
      </div>
      <div>
        <input type={"button"} onClick={handleLogin} value={"Login"}/>
        <input type={"button"} onClick={handleSignup} value={"Signup"}/>
        <input type={"button"} onClick={handlePostSignup} value={"Post Signup"}/>
      </div>
    </div>
  )
}

export default LoginPage
