'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model') 

class Tweet extends Model {
    users() {
        return this.belongsTo('App/Models/User')
    }

    hashtag_tweets() {
        return this.hasMany('App/Models/HashtagTweet')
    }
}

module.exports = Tweet
