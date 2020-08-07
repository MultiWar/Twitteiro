'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hashtag extends Model {
    hashtag_tweets() {
        this.hasMany('App/Models/Tweet')
    }
}

module.exports = Hashtag
