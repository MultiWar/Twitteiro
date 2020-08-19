'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model') 

class Tweet extends Model {
    users() {
        return this.belongsTo('App/Models/User')
    }

    hashtags () {
        return this.belongsToMany('App/Models/Hashtag').pivotModel('App/Models/HashtagTweet');
    }
    
    likes () {
        return this.hasMany('App/Models/Like')
    }
}

module.exports = Tweet
