'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.group('v1', function() {
	Route.post('/posts', 'PostController.create')
	Route.get('/posts', 'PostController.index')
	Route.get('/posts/:id', 'PostController.show').formats(['json', 'html'])
	Route.put('/posts/:id', 'PostController.update')
	Route.delete('/posts/:id', 'PostController.destroy')
})
.prefix('api/v1')

Route.post('/auth/:id', 'UserController.auth')
Route.post('/users', 'UserController.create')
Route.get('/secure', 'UserController.index').middleware('auth')

Route.get('/json/:name', 'JsonController.index')