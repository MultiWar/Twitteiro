'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hashtag extends Model {
    hashtag_tweets() {
        return this.hasMany('App/Models/HashtagTweet')
    }
}

module.exports = Hashtag
