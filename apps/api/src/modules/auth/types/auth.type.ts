import { Payload } from "./payload.type"

export interface Auth {
  user: Payload
  accessToken: string
}
