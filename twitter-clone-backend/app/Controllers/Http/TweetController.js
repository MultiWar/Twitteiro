'use strict'
const Tweet = use('App/Models/Tweet')
const Hashtag = use('App/Models/Hashtag')
const Like = use('App/Models/Like')
const Database = use('Database')

class TweetController {

    async index() {
        const tweets = await Tweet.query().with('hashtags').fetch();
        return tweets
    }

    async store({params, request, auth}) {
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

    async retweetNoBody({params, auth}) {
        const retweetedId = params.id
        const anexedTweet = await Tweet.find(retweetedId)
        const queryHashTweet = Database.table('hashtag_tweets')

        const tweet = await Tweet.create({user_id: auth.user.id, body: anexedTweet.body, isRetweet: true, hasCommentary: false, anexedUrl: `/tweets/${retweetedId}`})

        var regex = /\W#(\w+)/gm
        const tag = [...anexedTweet.body.matchAll(regex)]
        for (const ht of tag) {
            const hashtag = await Hashtag.findOrCreate({text: ht[1]})
            await queryHashTweet.insert({tweet_id: tweet.id, hashtag_id: hashtag.id})
        }
        return tweet
    }

    async retweetWithBody({params, auth, request}) {
        const retweetedId = params.id
        const queryHashTweet = Database.table('hashtag_tweets')
        const data = request.only(['body'])

        const tweet = await Tweet.create({user_id: auth.user.id, body: data.body, isRetweet: true, hasCommentary: true, anexedUrl: `/tweets/${retweetedId}`})

        var regex = /\W#(\w+)/gm
        const tag = [...data.body.matchAll(regex)]
        for (const ht of tag) {
            const hashtag = await Hashtag.findOrCreate({text: ht[1]})
            await queryHashTweet.insert({tweet_id: tweet.id, hashtag_id: hashtag.id})
        }
        return tweet
    }

    async respondTweet({params, auth, request}) {
        const responseId = params.id
        const queryHashTweet = Database.table('hashtag_tweets')
        const data = request.only(['body'])

        const tweet = await Tweet.create({user_id: auth.user.id, body: data.body, respondedId: responseId})

        var regex = /\W#(\w+)/gm
        const tag = [...data.body.matchAll(regex)]
        for (const ht of tag) {
            const hashtag = await Hashtag.findOrCreate({text: ht[1]})
            await queryHashTweet.insert({tweet_id: tweet.id, hashtag_id: hashtag.id})
        }
        return tweet
    }

    async show({params}) {
        const tweet = await Tweet.find(params.id)
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

    async like({params, auth, response}) {
        const tweet = await Tweet.find(params.id)
        const totalLikes = tweet.totalOfLikes
        await Like.create({postId: params.id, userId: auth.user.id})
        await tweet.merge({totalOfLikes: totalLikes + 1})
        // arrumar linha de baixo
        return await Tweet.query().where('id', '=', params.id).with('likes').fetch();
    }
}

module.exports = TweetController
