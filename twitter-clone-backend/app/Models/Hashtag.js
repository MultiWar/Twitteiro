'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hashtag extends Model {
    tweets () {
        return this.belongsToMany('App/Models/Tweet').pivotModel('App/Models/HashtagTweet')
    }
}

module.exports = Hashtag
