import React, { useContext, useState } from "react"
import {auth} from "../utils/firebase"
import { useHistory, useLocation } from "react-router-dom";
import Row from "../components/Row"
import { addUserCustomDataWithId, getUserCustomData } from "../utils/api"
import { AuthContext } from "../context/AuthContext"

const LoginPage = () => {

  let history = useHistory();
  let location = useLocation();

  const { user } = useContext(AuthContext)

  console.log("AUTHCONTEXT USER::: ", user)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

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
      const res = await auth.signInWithEmailAndPassword(email || "undistratto@gmail.com", password || "wwwwwwwww")
      redirect("/login")
    } catch (e) {
      console.error("ERROR AT LOGIN::: ", e)
    }
  }

  const handleSignup = async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      if (res?.user?.uid) {
        const uid = res?.user?.uid
        const userObj = await addUserCustomDataWithId(res?.user, {uid, email: email || "s" + Date.now() + "@email.it", username: username || "ciao"})
        res.user["customData"] = userObj
      }
      redirect("/login")
    } catch (e) {
      console.error("ERROR AT SIGNUP: ", e)
    }
  }

  // TODO: move the form in a specific component with state to avoid re-render of the whole page

  return (
    <div>
      {location?.state?.testo && (<Row intro={"Warning:"}>
        {location.state.testo}
      </Row>)}
      <Row>
        <input placeholder={"Email..."} value={email} name={"email"}
               onChange={e => handleChange(e, setEmail)}/>
        <input placeholder={"Password"} value={password} name={"password"}
               type={"password"}
               onChange={e => handleChange(e, setPassword)}/>
        <input placeholder={"Username"} value={username} name={"username"}
               onChange={e => handleChange(e, setUsername)}/>
      </Row>
      <div>
        <input type={"button"} onClick={handleLogin} value={"Login"}/>
        <input type={"button"} onClick={handleSignup} value={"Signup"}/>
      </div>
    </div>
  )
}

export default LoginPage
