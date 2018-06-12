class Server {
	constructor(token) {
		this._token = token;
		this._reqRaw = require('request');
		this.querystring = require("querystring");
		this._req = this._reqRaw;
		this.myAccount = {};
		if (!localStorage.sessionCookie) {
			this.cookieJar = this._reqRaw.jar();
		} else {
			this.cookieJar = this._reqRaw.jar();
			let cookieObj = this._reqRaw.cookie(localStorage.sessionCookie);
			this._addCookie(cookieObj);
		}
	}
	_sendReq(method, params) {
		return new Promise((resolve, reject) => {
			params.method = method;
			this._req({
				uri: 'https://mydonate.su/server/api.php',
				jar: this.cookieJar,
				method: 'POST',
				json: true,
				qs: params
			}, (err, response, body) => {
				if (err) reject(err);
				this._magicWithCookie(response);
				resolve({
					response,
					body
				});
			});
		});

	}
	_addCookie(cookie) {
		this.cookieJar.setCookie(cookie, 'https://mydonate.su');
	}
	_magicWithCookie(response) {
		try {
			let cookie = response.headers['set-cookie'][0].split(' ')[0].replace(';', '');
			let cookieObj = this._reqRaw.cookie(cookie);
			this._addCookie(cookieObj);
			localStorage.sessionCookie = cookie;
		} catch (e) {

		}
	}
	async _getCsrf() {
		return (await this._sendReq('getMyCsrf', {})).body;
	}
	async signIn(login, password) {
		let authResponse = await this._signIn(login, password);
		console.log(authResponse.body);
		let info = (await this._sendReq('getMyInfo', {})).body;
		if(info) this.myAccount = info;
		return info;
	}
	_signIn(login, password) {
		return new Promise((resolve, reject) => {
			this._req.post({
				uri: 'https://mydonate.su/lk/index.php',
				method: 'POST',
				json: true,
				qs: {login,password}
			}, (err, response, body) => {
				if (err) reject(err);
				this._magicWithCookie(response);
				resolve({
					response,
					body
				});
			});
		});
	}
}
module.exports = Server;