import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  avatar_url: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  //isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
  logout: () => Promise<void>
}

type SignInResponse = {
  token: string;
  user: User;
}



export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  //const isAuthenticated = true;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    
    if (token) {
      recoverUserInformation().then(response => {
        setUser(response.user)
      })
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password,
    })


    setCookie(undefined, 'nextauth.token', token, {
      path: '/',
      maxAge: 60 * 60 * 1, // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user)

    Router.push('/dashboard');
  }
  async function logout() {
    console.log('teste')
    destroyCookie({}, 'nextauth.token', {
      path: '/', // THE KEY IS TO SET THE SAME PATH
    })
    api.defaults.headers['Authorization'] = null;
    setUser(null)

    Router.push('/auth/login');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}