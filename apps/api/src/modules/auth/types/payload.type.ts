import { Role } from "@prisma/client"

export interface Payload {
  sub: string
  name: string
  email: string
  roles: Role[]
}
