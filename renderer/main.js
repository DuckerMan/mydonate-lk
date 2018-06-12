const {
	getCurrentWindow
} = require('electron').remote;
const Server = new(require('./js/server.js'))

const $ = q => document.querySelectorAll(q);
const showModalWindow = alert;
document.onreadystatechange = (r) => {
	if (document.readyState == 'complete') {

		$('#preloaderAuth')[0].style.display = 'none';
		$('#authButton')[0].onclick = async () => {
			let password = $('#passwordAuth')[0].value;
			let login = $('#loginAuth')[0].value;
			$('#form')[0].style.display = 'none';
			$('#preloaderAuth')[0].style.display = 'block';
			let r = await Server.signIn(login, password);
			if(!r){
				$('#form')[0].style.display = 'block';
				$('#preloaderAuth')[0].style.display = 'none';
				return showModalWindow('Вы ввели неверные данные', 'Аккаунт не найден');
			} 
			console.log(r);
		}

	}
}