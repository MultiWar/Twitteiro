'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/do cs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.post('/cadastro', 'UserController.store')
Route.post('/login', 'UserController.login')
Route.get('/teste', 'UserController.index')
Route.group(() => {
    Route.get('/tweets', 'TweetController.index')
    Route.get('/tweets/:id', 'TweetController.show')
    Route.post('/tweets', 'TweetController.store')
    Route.post('/tweets/retweetNoBody/:id', 'TweetController.retweetNoBody')
    Route.post('/tweets/retweetBody/:id', 'TweetController.retweetWithBody')
    Route.post('/tweets/respond/:id', 'TweetController.respondTweet')
    Route.delete('/tweets/:id', 'TweetController.delete')
    Route.post('/likeTweet/:id', 'TweetController.like')
}).middleware('auth')

Route.post('/follow/:id', 'UserController.follow').middleware('auth')
Route.delete('/unfollow/:id', 'UserController.unfollow').middleware('auth')
