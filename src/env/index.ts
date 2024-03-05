import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.number().default(3333),
  DATABASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)
