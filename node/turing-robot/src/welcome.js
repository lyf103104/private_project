const Color   = require('./color')

module.exports = function(welcomeMsg) {
	Array.prototype.forEach.call(welcomeMsg, o => {
		Color.log('----------', o, '----------')
	})
}