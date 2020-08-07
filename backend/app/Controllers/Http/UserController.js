'use strict'
const User = use('App/Models/User')
const Database = use('Database')
const query = Database.table('users')

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
}

module.exports = UserController
