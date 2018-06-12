class Client {
	constructor(server) {
		this._s = server;
		this._init();

	}
	_init() {
		console.log($('#enterForm'));
		$('#enterForm').on('submit', e => this._enterForm(e));
	}

	_enterForm(e = {
		preventDefault() {}
	}) {
		let that = this;
		e.preventDefault();

		that._s.isUserExists($('#enterForm #login').val()).then(response => {
			if (response == true) {
				// Форма входа
				console.log('Enter');
			} else {
				// Вхома регистрации
				console.log('Register');
			}
		})
	}
	_userExistsAction() {

	}
	_userIsntExistsAction() {

	}
}

module.exports = Client;