'use strict'
const User = use('App/Models/User')
const Database = use('Database')
const query = Database.table('users')
const Follow = use('App/Models/FollowingRelation')

class UserController {
    async store({request}) {
        const data = request.only(['exhibitionName','password','email','handle'])
        const user = await User.create(data);
        return user
    }

    async login({request, auth}) {
        const {handle, inputPassword} = request.all()
        const [{salt}] = await query.select('salt').where('handle', '=', handle)
        
        const password = salt + inputPassword
        const token = await auth.attempt(handle, password);
        return token
    }

    async follow({params, auth}) {
        const followerId = auth.user.id;
        const followeeId = params.id;

        const follow = await Follow.create({followerId, followeeId})

        return follow
    }

    async unfollow({params, auth, response}) {
        const followerId = auth.user.id;
        const followeeId = params.id;

        const relationshipId = await Database.table('following_relations').first().select('id').where({
            followerId,
            followeeId
        })

        const follow = await Follow.find(relationshipId.id)

        await follow.delete()
        return response.status(200).send('Pronto')
        // return follow
    }

    async index() {
        const users = User.all()
        return users
    }
}

module.exports = UserController
