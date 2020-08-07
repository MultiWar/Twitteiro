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
Route.post('/tweets', 'TweetController.store').middleware('auth')
Route.get('/tweets', 'TweetController.index').middleware('auth')
Route.delete('/tweets/:id', 'TweetController.delete').middleware('auth')
