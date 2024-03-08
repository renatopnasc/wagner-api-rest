import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import { env } from './env'
import { productsRoutes } from './routes/products'
import { usersRoutes } from './routes/users'

const app = fastify()

app.register(fastifyCors)

app.register(usersRoutes, {
  prefix: 'user',
})

app.register(productsRoutes, {
  prefix: 'product',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server is running!')
  })
