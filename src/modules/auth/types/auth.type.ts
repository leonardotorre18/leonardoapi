import { UserPublic } from "src/modules/users/schemas/users.schema"

export interface AuthResponse {
  user: UserPublic
  accessToken: string
}
