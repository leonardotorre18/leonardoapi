import { Payload } from "./payload.type"

export interface AuthResponse {
  user: Payload
  accessToken: string
}
