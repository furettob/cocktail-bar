import React, { useEffect, useState } from "react";
import {app} from "../utils/firebase";

export const AuthContext = React.createContext({ user: null });

const useAuth = () => {
  const [state, setState] = useState(() => {
    const user = app.auth().currentUser;
    return { initializing: !user, user };
  });

  function onChange(user) {
    console.log("onChange AuthContext.js::: ", user)
    setState({ initializing: false, user });
  }

  useEffect(() => {
    // You pass in the function to call when the auth state changes
    // You get as answer a "pointer" to unsubscribe
    const unsubscribe = app.auth().onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  return state;
};

export const AuthProvider = ({ children }) => {
  const { initializing, user } = useAuth();
  if (initializing) return <div>Auth loading</div>;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
