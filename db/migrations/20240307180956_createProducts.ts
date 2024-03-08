import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.uuid('id')
    table.text('name')
    table.decimal('price', 2)
    table.text('description')
    table.uuid('user_id').references('id').inTable('users')
    table.uuid('category_id').references('id').inTable('categories')
    table.text('image_url')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products')
}
