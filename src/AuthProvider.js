import React, { createContext, useContext, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./firebase";

const AuthContext = createContext(null);

/**
 * @returns {{ user: firebase.User, initializing: boolean, error: firebase.auth.Error}}
 */
export function useUser() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, initializing, error] = useAuthState(firebase.auth());

  const value = useMemo(
    () => ({
      user,
      initializing,
      error,
    }),
    [user, initializing, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
