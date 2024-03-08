/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      is_admin: z.boolean().default(false),
    })

    const user = userSchema.parse(request.body)

    const { name, email, password, is_admin } = user

    const registeredUser = await knex('users')
      .where('email', email)
      .select()
      .first()

    if (registeredUser) throw new Error('usuário cadastrado!')

    const encryptedPassword = await hash(password, 8)

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password: encryptedPassword,
      is_admin,
    })

    return {}
  })

  app.get('', async () => {
    const users = await knex('users').select()

    return { users }
  })
}
