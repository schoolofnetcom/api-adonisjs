'use strict'

class UserController {

	static get inject() {
		return [
			'App/Model/User'
		]
	}

	constructor(User) {
		this.User = User
	}

	* create(request, response) {
		const data = request.only('username', 'email', 'password')	
		
		const user = yield this.User.create(data)
		const token = yield request.auth.generate(user)

		response.json({
			user,
			token
		})
	}

	* auth(request, response) {
		const user = this.User.find(request.param('id'))
		const token = yield request.auth.generate(user)

		response.json({
			token
		})
	}

	* index(request, response) {
		response.json({
			msg: 'Hello from auth area'
		})
	}

}

module.exports = UserController
