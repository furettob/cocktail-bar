import React, {useState} from "react"
import {auth} from "../utils/firebase"
import { useHistory, useLocation } from "react-router-dom";
import Row from "../components/Row"

const LoginPage = () => {

  let history = useHistory();
  let location = useLocation();
  console.log("LOC::: ", location)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = (e, func) => {
    console.log(`Ùpdating ${e.target.name} to ${e.target.value}`)
    func(e.target.value)
  }

  const redirect = () => {
    if (location?.state?.redirectTo) {
      history.push(location.state.redirectTo)
    } else {
      history.push("/favourites")
    }
  }

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email || "undistratto@gmail.com", password || "wwwwww")
      redirect()
    } catch (e) {
      console.error("ERRORE DI AUTENTICAZIONE AL LOGIN::: ", e)
    }
  }

  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      redirect()
    } catch (e) {
      console.error("ERRORE DI AUTENTICAZIONE AL SIGNUP::: ", e)
    }
  }


  return (
    <div>
      {location?.state?.testo && (<Row intro={"Warning:"}>
        {location.state.testo}
      </Row>)}
      <div>
        <input placeholder={"Email"} value={email} name={"email"}
               onChange={e => handleChange(e, setEmail)}/>
        <input placeholder={"Password"} value={password} name={"password"}
               type={"password"}
               onChange={e => handleChange(e, setPassword)}/>
      </div>
      <div>
        <input type={"button"} onClick={handleLogin} value={"Login"}/>
        <input type={"button"} onClick={handleSignup} value={"Signup"}/>
      </div>
    </div>
  )
}

export default LoginPage
