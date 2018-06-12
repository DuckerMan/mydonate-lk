const path = require('path');
class Database {
	constructor(file) {
		this._init(file);
	}
	async _init(file) {
		const PATH = path.join(__dirname, '..', '.cache', file);
		let db;
		if (!fs.existsSync(PATH)) fs.writeFileSync(PATH, '{}', {
			flag: 'wx'
		});
		try {
			var dbText = await fs.readFile(PATH);
			db = JSON.parse(dbText);
		} catch (e) {
			db = {};
		}
		this._cache = {};
		this._path = PATH;
	}

	async setParams(id, value) {
		let file = await this._readFile();
		file[id] = value;
		this._save(file);

	}

	async getParams(id) {
		return (await this._readFile())[id];
	}
	async _save(data) {
		return fs.writeFile(this._path, JSON.stringify(data));
	}
	async _readFile() {
		let file = await fs.readFile(this._path);
		return JSON.parse(file);

	}
}

module.exports = Database;