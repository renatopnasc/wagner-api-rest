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
  }
}
