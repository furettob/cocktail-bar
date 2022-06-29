import React, { useState } from 'react'
import { auth } from '../utils/firebase'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      //apiCall("createUser", {uid: user.uid, user})
    } catch(error) {
      alert(error.message)
    }
  }

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email || "undistratto@gmail.com", password || "wwwwww")
      //navigation.navigate("Home")
    } catch(error) {
      alert(error.message)
    }
  }

  const handleChange = (e, func) => {
    console.log("Changing to: ", e.target.value)
    func(e.target.value)
  }

  return (
    <div>

      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={ e => handleChange(e, setEmail)}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={ e => handleChange(e, setPassword)}
          secureTextEntry
        />
        <input type={"button"} onClick={handleLogin} value={"Login"}/>
        <input type={"button"} onClick={handleSignUp} value={"Signup"}/>
      </div>
    </div>
  )
}

export default LoginPage
