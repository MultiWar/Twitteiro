'use strict'
const Tweet = use('App/Models/Tweet')
const Hashtag = use('App/Models/Hashtag')
const Database = use('Database')

class TweetController {

    async index() {
        const tweets = await Tweet.query().with('hashtag_tweets').fetch();
        return tweets
    }

    async store({request, auth}) {
        const queryHashTweet = Database.table('hashtag_tweets')
        const data = request.only(['body'])
        var regex = /\W#(\w+)/gm
        const tag = regex.exec(data.body)
        const hashtag = await Hashtag.findOrCreate({text: tag[1]})
        const tweet = await Tweet.create({user_id: auth.user.id, body: data.body})
        await queryHashTweet.insert({tweet_id: tweet.id, hashtag_id: hashtag.id})
        return tweet
    }

    async delete({params, auth, response}) {
        const tweetId = params.id
        const tweet = await Tweet.find(tweetId)
        if(tweet.user_id !== auth.user.id) {
            return response.status(401).send('Não autorizado')
        }
        await tweet.delete()
        return response.status(200).send('Tweet deletado')
    }
}

module.exports = TweetController
