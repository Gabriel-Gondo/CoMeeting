import { api } from './api';
import { v4 as uuid } from 'uuid'

type SignInRequestData = {
  email: string;
  password: string;
}

type SignInResponseData = {
  token: string;
  user: string;
}



const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestData) {
  const response = await api.post('/auth/login',data)

  
  return {token: response?.data?.access_token, user: {name: 'string',email: 'string',avatar_url: 'string'}}
}

export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com.br',
      avatar_url: 'https://github.com/diego3g.png'
    }
  }
}