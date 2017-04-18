'use strict'

class JsonController {
	* index(request, response) {
		response.json({
			name: request.param('name')
		})
	}
}

module.exports = JsonController
