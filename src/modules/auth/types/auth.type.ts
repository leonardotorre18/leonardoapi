import { UserPublic } from "../../users/schemas/users.schema"

export interface AuthResponse {
  user: UserPublic
  accessToken: string
}
