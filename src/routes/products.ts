/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'

export async function productsRoutes(app: FastifyInstance) {
  app.get('/:id', async (request) => {
    const productParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = productParamsSchema.parse(request.params)

    const product = await knex('products').where('id', id).first()

    return { product }
  })

  app.get('/', async () => {
    const products = await knex('products').select()

    return { products }
  })

  app.post('/', async (request, reply) => {
    const productSchema = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      image_url: z.string(),
    })

    const product = productSchema.parse(request.body)

    const { name, description, price, image_url } = product

    await knex('products').insert({
      id: randomUUID(),
      name,
      description,
      price,
      image_url,
    })

    return reply.status(201).send()
  })
}
