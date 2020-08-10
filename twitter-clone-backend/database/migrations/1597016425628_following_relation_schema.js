'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowingRelationSchema extends Schema {
  up () {
    this.create('following_relations', (table) => {
      table.increments()
      table.integer("followerId").unsigned().references('id').inTable('users');
      table.integer("followeeId").unsigned().references('id').inTable('users');
      table.timestamps()
    })
  }

  down () {
    this.drop('following_relations')
  }
}

module.exports = FollowingRelationSchema
