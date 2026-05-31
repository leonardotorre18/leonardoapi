import { Role } from "generated/prisma/client"

export interface Payload {
  sub: string
  name: string
  email: string
  roles: Role[]
}
