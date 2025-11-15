import { Role } from "../enums/role.enum"

export interface Payload {
  email: string
  userId: string
  roles: Role[]
}
