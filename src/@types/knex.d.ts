// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    products: {
      id: string
      name: string
      price: number
      description: string
      created_at: string
    }
    users: {
      id: string
      name: string
      email: string
      password: string
      is_admin: boolean
      created_at: string
    }
  }
}
