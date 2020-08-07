'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HashtagTweetSchema extends Schema {
  up () {
    this.create('hashtag_tweets', (table) => {
      table.increments()
      table.integer('tweet_id').unsigned().references('id').inTable('tweets').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('hashtag_id').unsigned().references('id').inTable('hashtags').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('hashtag_tweets')
  }
}

module.exports = HashtagTweetSchema
