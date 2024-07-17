type AccessTokenPayload = {
    access_token: string
}

type SetAccessToken = {
    type: "setAccessToken",
    payload: AccessTokenPayload
}

type UserPayload = {
  id?: string
  name?: string
  email?: string
  image?: string
}

type SetUser =  {
    type: "setUser",
    payload: UserPayload
}


export type Action = SetAccessToken | SetUser

