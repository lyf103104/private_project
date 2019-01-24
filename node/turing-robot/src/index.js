const http = require('http')
const rl   = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

const Color   = require('./color')
const Welcome = require('./welcome')

module.exports = function() {
	Welcome('欢迎您我的主人')

	let username = ''
	let turingKey = '98ee2334cb1c433bab31948dee5773d6'
	let options = {
		hostname: 'www.tuling123.com',
		path: '/openapi/api',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}
	}

	rl.question('> 阁下尊姓大名：', answer => {
		username = answer
		Color.log('请提问!')
		chat()
	})

	function chat() {
		rl.question('> 请输入您的问题：', query => {
			if (!query) {
				Color.log('主人请慢走')
				process.exit(0)
			}
			let req = http.request(options, callback)

			req.on('error', (e) => {
				console.error(`请求遇到问题: ${e.message}`)
			});

			req.write(JSON.stringify({
				key: turingKey,
				info: query,
				userid: username
			}))

			req.end()
		})

		function callback(res) {
			let data = ''
			res.on('data', chunk => {
				data += chunk
			})
			res.on('end', () => {
				Color.log(handleResponse(JSON.parse(data)));
				chat()
			})
		}
	}

	function handleResponse(res) {
		switch (res.code) {
			case 100000:
				return res.text;
			case 200000:
				return `${res.text} : ${res.url}`;
			case 302000:
				let listInfo = '';
				(res.list || []).forEach((it) => {
					listInfo += `\n\n文章: ${it.article}\n来源: ${it.source}\n链接: ${it.detailurl}`;
				});
				return `${res.text}\n${listInfo}`;
			default:
				return res.text;
		}
	}
}