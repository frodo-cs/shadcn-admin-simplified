export interface Credentials {
  identifier: string
  password: string
}

export interface AuthUser {
  username: string
  email: string
  role: string[]
}

export interface IAuthAdapter {
  login(credentials: Credentials): Promise<AuthUser>
  logout(): Promise<{ success: boolean }>
}
