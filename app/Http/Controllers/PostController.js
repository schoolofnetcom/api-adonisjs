'use strict'

class PostController {

	static get inject() {
		return [
			'App/Model/Post'
		]
	}

	constructor(Post) {
		this.Post = Post
	}

	* create(request, response) {
		const data = request.only('title', 'text')

		yield this.Post.create(data)

		response.status(201).json({
			data
		})
	}

	* index(request, response) {
		const posts = yield this.Post.all()

		response.json({
			posts
		})
	}

	* show(request, response) {
		const post = yield this.Post.find(request.param('id'))
		// const post = yield this.Post.findBy('id', request.param('id'))
		// const post = yield this.Post.query().where('id', request.param('id'))

		if(post) {
			if (request.format() == 'json') {
				response.json({
					post
				})

				return
			}

			if (request.format() == 'html') {
				// response.sendView('Hello')
				response.send('Hello')
				return 
			}

		}

		response.json({
			post: {}
		})
		return
	}

	* update(request, response) {
		const post = yield this.Post.find(request.param('id'))
		const data = request.only('title', 'text')

		post.fill(data)

		yield post.save()

		response.json({
			post
		})
	}

	* destroy(request, response) {
		const post = yield this.Post.find(request.param('id'))

		if (!post) {
			response.json({
				post
			})
			return
		}

		yield post.delete()

		response.noContent()
	}
}

module.exports = PostController
