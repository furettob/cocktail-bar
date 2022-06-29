import React, {useState, useEffect} from "react";
import {app} from "../utils/firebase";

export const AuthContext = React.createContext({user: null});

const useAuth = () => {
  const [state, setState] = useState( () => {
    const user = app.auth().currentUser
    return {inizializing: !user, user}

  })

  function onChange(user) {
    console.log("The current user is: ", user)
    setState({initializing: false, user})
  }

  useEffect(() => {
    // You pass in the function to call when the auth state changes
    // You get as answer a "pointer" to unsubscribe
    const unsubscribe = app.auth().onAuthStateChanged(onChange); // TODO: cambia app.auth() con auth (oggetto)
    return () => unsubscribe();
  }, []);

  return state // TODO::: rename to authState
}


export const AuthProvider = ({ children }) => {
  const { initializing, user } = useAuth();
  if (initializing) return <div>Auth loading</div>;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
