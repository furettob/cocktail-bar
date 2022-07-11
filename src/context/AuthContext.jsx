import React, {useState, useEffect} from "react";
import {app, auth} from "../utils/firebase";
import { getUserCustomData } from "../utils/api"

export const AuthContext = React.createContext({user: null});

const useAuth = () => {
  const [authState, setAuthState] = useState( () => {
    const user = app.auth().currentUser
    return {inizializing: !user, user}
  })

  async function onChange(user) {
    // console.log("The current user is: ", user)
    if (user?.uid && !user.customData) {
      const uid = user?.uid
      const userObj = await getUserCustomData(user, {uid})
      user["customData"] = userObj
    }
    setAuthState({initializing: false, user})
  }

  useEffect(() => {
    // You pass in the function to call when the auth state changes
    // You get as answer a "pointer" to unsubscribe
    const unsubscribe = auth.onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  return authState
}


export const AuthProvider = ({ children }) => {
  const { initializing, user } = useAuth();
  if (initializing) return <div>Auth loading</div>;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
