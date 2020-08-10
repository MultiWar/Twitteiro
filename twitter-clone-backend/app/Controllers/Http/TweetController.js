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

        const tweet = await Tweet.create({user_id: auth.user.id, body: data.body})

        var regex = /\W#(\w+)/gm
        const tag = [...data.body.matchAll(regex)]
        for (const ht of tag) {
            const hashtag = await Hashtag.findOrCreate({text: ht[1]})
            await queryHashTweet.insert({tweet_id: tweet.id, hashtag_id: hashtag.id})
        }
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
